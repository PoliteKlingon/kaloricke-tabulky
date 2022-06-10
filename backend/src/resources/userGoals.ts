import { object, string, number, ValidationError } from "yup";
import { Request, Response } from "express";
import prisma from "../client";
import { validateAuthorization } from "./user";
import {
  sendAuthorizationError,
  sendInternalServerError,
  sendSuccess,
  sendValidationError,
} from "./universalResponses";

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

/* This is used only by `user` module in method `register` */
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
    return sendAuthorizationError(res);

  try {
    req.body.goals.userId = req.body.userId;
    const data = await goalsUpdateSchema.validate(req.body.goals);
    const result = await prisma.userGoals.update({
      where: { userId: data.userId },
      data: { ...data },
    });

    return sendSuccess(res, "Goals updated successfully", result);
  } catch (e: any) {
    if (e instanceof ValidationError) return sendValidationError(res, e);
    return sendInternalServerError(res);
  }
};

export const get = async (req: Request, res: Response) => {
  if (!(await validateAuthorization(req.body.sessionId, req.body.userId)))
    return sendAuthorizationError(res);

  try {
    const result = await prisma.userGoals.findUnique({
      where: { userId: req.body.userId },
    });

    return sendSuccess(res, "Goals retreived successfully", result);
  } catch (e) {
    return sendInternalServerError(res);
  }
};
