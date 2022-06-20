import prisma from "../client";
import { Request, Response } from "express";
import { date, number, object, string, ValidationError } from "yup";
import {
  sendAuthorizationError,
  sendInternalServerError,
  sendNotFound,
  sendSuccess,
} from "./universalResponses";
import { getUserBySessionId } from "./user";

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
  try {
    if (!req.headers.authorization)
      return sendAuthorizationError(
        res,
        "Authorization header must not be empty"
      );
    const user = await getUserBySessionId(
      req.headers.authorization.split(" ")[1]
    );
    return sendSuccess(res, "User data retrieved successfully", user.details);
  } catch (e: any) {
    if (e.name === "NotFoundError")
      return sendNotFound(res, "Sessin with given id not found");
    console.log(e);
    return sendInternalServerError(res);
  }
};
