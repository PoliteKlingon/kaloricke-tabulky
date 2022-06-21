import {
  detailsSchema,
  goalsSchema,
  passwordSchema,
  registerSchema,
  updateRequestSchema,
} from "./user-shemas";
import { Request, Response } from "express";
import sha256 from "crypto-js/sha256";
import { ValidationError } from "yup";
import {
  sendCreatedSuccessfully,
  sendDuplicateError,
  sendInternalServerError,
  sendValidationError,
} from "./universalResponses";
import prisma from "../client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

export const register = async (req: Request, res: Response) => {
  // FIXME send sessionId in response
  try {
    const data = await registerSchema.validate(req.body);

    const user = await prisma.user.create({
      data: {
        details: {
          create: { ...data.details },
        },
        goals: {
          create: {
            ...(data.goals ||
              calculateGoals(
                data.details.birthdate,
                data.details.height,
                data.details.sex,
                data.details.weight
              )),
          },
        },
        credentials: {
          create: {
            email: data.details.email,
            passwordHash: String(sha256(data.password)),
          },
        },
      },
      include: { details: true, goals: true },
    });

    const { id: sessionId } = await prisma.sessions.create({
      data: { userId: user.id },
    });

    return sendCreatedSuccessfully(res, "User created successfully", {
      sessionId,
      user,
    });
  } catch (e: any) {
    if (e instanceof ValidationError) {
      return sendValidationError(res, e);
    }
    if (e instanceof PrismaClientKnownRequestError && e.code === "P2002")
      return sendDuplicateError(res, "User with given email already exists");

    console.log(e);
    return sendInternalServerError(res);
  }
};

export const update = async (req: Request, res: Response) => {
  /*
1. Validovat data
1.a. Ziskat usera ze sessionId
2. Zavolat transakci, do ktere nacpu vsechny zmeny
3. poslat response
*/
  try {
    const {
      headers: { authorization: sessionId },
      body: data,
    } = await updateRequestSchema.validate(req);
    console.log(`sessionId: ${sessionId}, data:${data}`);
  } catch (e: any) {
    if (e instanceof ValidationError) {
      return sendValidationError(res, e);
    }
    if (e instanceof PrismaClientKnownRequestError && e.code === "P2002")
      return sendDuplicateError(res, "User with given email already exists");

    console.log(e);
    return sendInternalServerError(res);
  }
};

export const get = async (req: Request, res: Response) => {};

export const login = async (req: Request, res: Response) => {};

export const logout = async (req: Request, res: Response) => {};

export async function updatePassword(req: Request, res: Response) {}

const calculateGoals = (
  birthDate: Date,
  height: number,
  sex: number,
  weight: number
) => {
  // FIXME calculate values istead of static data
  const age = Math.floor(
    (new Date().getTime() - new Date(birthDate).getTime()) / 3.15576e10
  );

  return {
    calories: 2300,
    proteins: 150,
    carbs: 230,
    fats: 79,
    fiber: 18,
    salt: 5,
  };
};
