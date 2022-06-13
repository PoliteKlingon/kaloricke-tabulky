import prisma from "../client";
import { Request, Response } from "express";
import { date, number, object, string, ValidationError } from "yup";
import { validateAuthorization } from "./user";
import { sendInternalServerError, sendSuccess } from "./universalResponses";

const detailsSchema = object({
  username: string().required().trim(),
  name: string().required().trim(),
  surname: string().required().trim(),
  height: number().required().positive(),
  weight: number().required().positive(),
  birthdate: date().required().min("1940-01-01"),
  sex: number().required().min(0).max(1),
  email: string().email().required().trim(),
  userId: string().required(),
}).noUnknown(true);

const detailsUpdateSchema = object({
  username: string().optional().trim(),
  name: string().optional().trim(),
  surname: string().optional().trim(),
  height: number().optional().positive(),
  weight: number().optional().positive(),
  birthdate: date().optional().min("1940-01-01"),
  sex: number().optional().min(0).max(1),
  email: string().email().optional().trim(),
}).noUnknown(true);

/* This should not be used directly as endpoint method */
export const store = async (data: any, userId: string) => {
  data.userId = userId;
  const details = await detailsSchema.validate(data);

  return await prisma.userDetails.create({
    data: { ...details },
  });
};

/* This should not be used directly as endpoint method */
export const update = async (userId: string, reqData: any) => {
  const data = await detailsUpdateSchema.validate(reqData);
  console.log("Successfully parsed");
  return await prisma.userDetails.update({
    where: { userId: userId },
    data: { ...data },
  });
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
