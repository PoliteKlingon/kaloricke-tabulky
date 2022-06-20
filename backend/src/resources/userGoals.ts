import { object, string, number, ValidationError } from "yup";
import { Request, Response } from "express";
import prisma from "../client";
import { getUserBySessionId, validateAuthorization } from "./user";
import {
  sendAuthorizationError,
  sendInternalServerError,
  sendNotFound,
  sendSuccess,
} from "./universalResponses";

const goalsSchema = object({
  userId: string().required().uuid(),
  calories: number().required().positive(),
  proteins: number().required().positive(),
  carbs: number().required().positive(),
  fats: number().required().positive(),
  fiber: number().required().positive(),
  salt: number().required().positive(),
})
  .noUnknown(true)
  .strict();
const goalsUpdateSchema = object({
  calories: number().optional().positive(),
  proteins: number().optional().positive(),
  carbs: number().optional().positive(),
  fats: number().optional().positive(),
  fiber: number().optional().positive(),
  salt: number().optional().positive(),
})
  .noUnknown(true)
  .strict();
/* This is used only by `user` module in method `register` */
export const store = async (data: any, userId: string) => {
  data.userId = userId;
  const goals = await goalsSchema.validate(data);
  await prisma.userGoals.create({
    data: { ...goals },
  });
};

// export const update = async (req: Request, res: Response) => {
//   if (!(await validateAuthorization(req.body.sessionId, req.body.userId)))
//     return sendAuthorizationError(res);

//   try {
//     req.body.goals.userId = req.body.userId;
//     const data = await goalsUpdateSchema.validate(req.body.goals);
//     const result = await prisma.userGoals.update({
//       where: { userId: data.userId },
//       data: { ...data },
//     });

//     return sendSuccess(res, "Goals updated successfully", result);
//   } catch (e: any) {
//     if (e instanceof ValidationError) return sendValidationError(res, e);
//     return sendInternalServerError(res);
//   }
// };

export const get = async (req: Request, res: Response) => {
  if (!req.headers.authorization)
    return sendAuthorizationError(
      res,
      "Authorization header must not be empty"
    );
  try {
    const user = await getUserBySessionId(
      req.headers.authorization.split(" ")[1]
    );
    return sendSuccess(res, "User data retrieved successfully", user.goals);
  } catch (e: any) {
    if (e.name === "NotFoundError")
      return sendNotFound(res, "Sessin with given id not found");
    console.log(e);
    return sendInternalServerError(res);
  }
};

export async function update(userId: string, reqData: any) {
  const data = await goalsUpdateSchema.validate(reqData);

  return await prisma.userGoals.update({
    where: { id: userId },
    data: { ...data },
  });
}
