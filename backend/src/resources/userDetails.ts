import prisma from "../client";
import { Request, Response } from "express";
import { date, number, object, string, ValidationError } from "yup";
import { validateAuthorization } from "./user";
import {
  sendAuthorizationError,
  sendDuplicateError,
  sendInternalServerError,
  sendSuccess,
  sendValidationError,
} from "./universalResponses";

const detailsSchema = object({
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

const detailsUpdateSchema = object({
  username: string().optional().trim(),
  name: string().optional().trim(),
  surname: string().optional().trim(),
  height: number().optional().positive(),
  weight: number().optional().positive(),
  birthdate: date().optional().min("1940-01-01T00:00:00.000Z"),
  sex: number().optional().min(0).max(1),
  email: string().email().optional().trim(),
  userId: string().required(),
});

/* This is used only by `user` module in method `register` */
export const store = async (data: any, userId: string) => {
  data.userId = userId;
  const details = await detailsSchema.validate(data);

  return await prisma.userDetails.create({
    data: { ...details },
  });
};

export const update = async (req: Request, res: Response) => {
  if (!(await validateAuthorization(req.body.sessionId, req.body.userId)))
    return sendAuthorizationError(res);
  try {
    req.body.details.userId = req.body.userId;
    const data = await detailsUpdateSchema.validate(req.body.details);

    if (data.email) {
      const duplicate = await prisma.userDetails.findUnique({
        where: { email: data.email },
      });
      if (duplicate && duplicate.userId != data.userId) {
        return sendDuplicateError(res, "User with given email already exists");
      }
    }

    const result = await prisma.userDetails.update({
      where: { userId: data.userId },
      data: { ...data },
    });

    if (data.email) {
      prisma.userCredentials.update({
        where: { userId: data.userId },
        data: { email: data.email },
      });
    }

    return sendSuccess(res, "User data updated successfully", result);
  } catch (e) {
    if (e instanceof ValidationError) {
      return sendValidationError(res, e);
    }

    return sendInternalServerError(res);
  }
};

export const get = async (req: Request, res: Response) => {
  if (!(await validateAuthorization(req.body.sessionId, req.body.userId)))
    return sendInternalServerError(res);

  try {
    const user = await prisma.userDetails.findUnique({
      where: {
        userId: req.body.userId,
      },
    });
    return sendSuccess(res, "User data retrieved successfully", user);
  } catch (error) {
    return sendInternalServerError(res);
  }
};
