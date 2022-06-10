import { object, string, number, ValidationError } from "yup";
import { Request, Response } from "express";
import prisma from "../client";
import { validateAuthorization } from "./user";

const goalsSchema = object({
  userId: string().required().uuid(),
  calories: number().required().positive(),
  proteins: number().required().positive(),
  carbs: number().required().positive(),
  fats: number().required().positive(),
  fiber: number().required().positive(),
  salt: number().required().positive(),
});
const goalsUpdateSchema = object({
  userId: string().required().uuid(),
  calories: number().optional().positive(),
  proteins: number().optional().positive(),
  carbs: number().optional().positive(),
  fats: number().optional().positive(),
  fiber: number().optional().positive(),
  salt: number().optional().positive(),
});

export const store = async (data: any, userId: string) => {
  data.userId = userId;
  const goals = await goalsSchema.validate(data);
  await prisma.userGoals.create({
    data: {
      ...goals,
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
    req.body.goals.userId = req.body.userId;
    const data = await goalsUpdateSchema.validate(req.body.goals);
    const result = await prisma.userGoals.update({
      where: {
        userId: data.userId,
      },
      data: {
        ...data,
      },
    });
    return res.status(200).send({
      status: "success",
      data: result,
      message: "Goals updated successfully",
    });
  } catch (e: any) {
    // TODO add response for validationError
    return res.status(500).send({
      status: "error",
      data: {},
      message: e.message,
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
    const result = await prisma.userGoals.findUnique({
      where: {
        userId: req.body.userId,
      },
    });
    return res.status(200).send({
      status: "success",
      data: result,
      message: "Goals retrieved successfully",
    });
  } catch (e) {
    return res.status(500).send({
      status: "error",
      data: {},
      message: "internal server error",
    });
  }
};
