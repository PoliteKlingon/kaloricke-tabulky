import prisma from "../client";
import { Request, Response } from "express";
import { date, number, object, string, ValidationError } from "yup";
import { validateAuthorization } from "./user";

const userDetailsSchema = object({
  username: string().required().trim(),
  name: string().required().trim(),
  surname: string().required().trim(),
  height: number().required().positive(),
  weight: number().required().positive(),
  birthdate: date().required().min("1940-01-01T00:00:00.000Z"),
  sex: number().required().min(0).max(1),
  email: string().email().required().trim(),
  userId: string().required(),
});

export const store = async (data: any, userId: string) => {
  data.userId = userId;
  const details = await userDetailsSchema.validate(data);
  return await prisma.userDetails.create({
    data: {
      ...details,
    },
  });
};

export const update = async (req: Request, res: Response) => {
  if (!(await validateAuthorization(req.body.sessionId, req.body.userId)))
    return res.status(401).send({
      status: "error",
      message: "User is not authorized for that change",
      data: {},
    });

  try {
    req.body.details.userId = req.body.userId;

    if (data.email) {
      const duplicate = await prisma.userDetails.findUnique({
        where: { email: data.email },
      });
      if (duplicate && duplicate.userId != data.userId) {
        return res.status(409).send({
          status: "error",
          message: "User with given email already exists",
          data: {},
        });
      }
    }

    const result = await prisma.userDetails.update({
      where: {
        userId: details.userId,
      },
      data: {
        ...details,
      },
    });
    return res.status(200).send({
      status: "success",
      data: result,
      message: "User data updated successfully",
    });
  } catch (e) {
    if (e instanceof ValidationError) {
      return res.status(400).send({
        status: "error",
        message: "Invalid data",
        data: e.errors,
      });
    }

    return res.status(500).send({
      status: "error",
      data: {},
      message: "Internal server error",
    });
  }
};

export const get = async (req: Request, res: Response) => {
  if (!(await validateAuthorization(req.body.sessionId, req.body.userId)))
    return res.status(401).send({
      status: "error",
      message: "User is not authorized for that change",
      data: {},
    });

  try {
    const user = await prisma.userDetails.findUnique({
      where: {
        userId: req.body.userId,
      },
    });
    return res.status(200).send({
      status: "success",
      data: user,
      message: "User data retrieved successfully",
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      data: {},
      message: "Internal server error",
    });
  }
};
