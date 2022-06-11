import prisma from "../client";
import { Request, Response } from "express";
import { date, number, object, string, ValidationError } from "yup";
import { getUserIdFromSessionId, validateAuthorization } from "./user";
import { sendInternalServerError, sendSuccess } from "./universalResponses";

// TODO fix validation not accepting "yyyy-dd-mm" format
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
// .strict();

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
// .strict();

/* This is used only by `user` module in method `register` */
export const store = async (data: any, userId: string) => {
  data.userId = userId;
  const details = await detailsSchema.validate(data);

  return await prisma.userDetails.create({
    data: { ...details },
  });
};

export const update = async (userId: string, reqData: any) => {
  const data = await detailsUpdateSchema.validate(reqData);
  return await prisma.userDetails.update({
    where: { userId: userId },
    data: { ...data },
  });
};

// export const update = async (req: Request, res: Response) => {
//   const userId = await getUserIdFromSessionId(req.body.sessionId);
//   if (!userId) return sendNotFound(res, "User not found");

//   try {
//     if (req.body.details?.email) {
//       const duplicate = await prisma.userDetails.findUnique({
//         where: { email: req.body.details.email },
//       });
//       if (duplicate && duplicate.userId != userId) {
//         return sendDuplicateError(res, "User with given email already exists");
//       }
//     }

//     const result = updateOnly(userId, req.body.details);

//     if (req.body.details?.email) {
//       prisma.userCredentials.update({
//         where: { userId: userId },
//         data: { email: req.body.details.email },
//       });
//     }

//     return sendSuccess(res, "User data updated successfully", result);
//   } catch (e) {
//     if (e instanceof ValidationError) return sendValidationError(res, e);

//     return sendInternalServerError(res);
//   }
// };

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
