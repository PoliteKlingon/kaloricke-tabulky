import {
  headersSchema,
  loginSchema,
  passwordUpdateSchema,
  registerSchema,
  updateRequestSchema,
} from "./user-shemas";
import { Request, Response } from "express";
import sha256 from "crypto-js/sha256";
import { ValidationError } from "yup";
import {
  sendAuthorizationError,
  sendCreatedSuccessfully,
  sendDuplicateError,
  sendInternalServerError,
  sendNotFound,
  sendSuccess,
  sendValidationError,
} from "./universalResponses";
import prisma from "../client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

export const register = async (req: Request, res: Response) => {
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
  try {
    const {
      headers: { authorization: sessionId },
      body: data,
    } = await updateRequestSchema.validate(req);

    const { id: userId } = await getUserBySessionId(sessionId);

    await prisma.$transaction(async (prisma) => {
      await prisma.userDetails.update({
        where: { userId: userId },
        data: { ...data.details },
      });
      await prisma.userGoals.update({
        where: { userId: userId },
        data: { ...data.goals },
      });
      // TODO vyresit aby se nemusel email ukladat duplicitne
      if (data.details.email)
        await prisma.userCredentials.update({
          where: { userId: userId },
          data: { email: data.details.email },
        });
    });

    const user = await prisma.user.findUnique({ where: { id: userId } });
    return sendSuccess(res, "User data successfully updated", user);
  } catch (e: any) {
    if (e instanceof ValidationError) {
      return sendValidationError(res, e);
    }

    if (e instanceof PrismaClientKnownRequestError && e.code === "P2002")
      return sendDuplicateError(res, "User with given email already exists");

    if (e.name === "NotFoundError") return sendAuthorizationError(res);

    console.log(e);
    return sendInternalServerError(res);
  }
};

export const get = async (req: Request, res: Response) => {
  try {
    const { authorization: sessionId } = await headersSchema.validate(
      req.headers
    );

    const user = await getUserBySessionId(sessionId);

    return sendSuccess(res, "User successfully retreived", user);
  } catch (e: any) {
    if (e instanceof ValidationError) {
      return sendValidationError(res, e);
    }

    if (e.name === "NotFoundError") return sendAuthorizationError(res);

    console.log(e);
    return sendInternalServerError(res);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { password, email } = await loginSchema.validate(req.body);

    const { userId } = await prisma.userCredentials.findFirst({
      where: {
        AND: [{ email: email }, { passwordHash: String(sha256(password)) }],
      },
      rejectOnNotFound: true,
    });

    const { id: sessionId } = await prisma.sessions.create({
      data: { userId: userId },
    });

    return sendSuccess(res, "Login successfull", { sessionId });
  } catch (e: any) {
    if (e instanceof ValidationError) {
      return sendValidationError(res, e);
    }

    if (e.name === "NotFoundError")
      return sendAuthorizationError(res, "Email and password does not match");

    console.log(e);
    return sendInternalServerError(res);
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const { authorization: sessionId } = await headersSchema.validate(
      req.headers
    );

    await prisma.sessions.delete({ where: { id: sessionId } });

    return sendSuccess(res, "User logged out successfully", {});
  } catch (e: any) {
    if (e instanceof ValidationError) {
      return sendValidationError(res, e);
    }

    if (e.name === "NotFoundError")
      return sendNotFound(res, "Sessin with given id not found");

    console.log(e);
    return sendInternalServerError(res);
  }
};

export async function updatePassword(req: Request, res: Response) {
  try {
    const { authorization: sessionId } = await headersSchema.validate(
      req.headers
    );
    const { oldPassword, newPassword } = await passwordUpdateSchema.validate(
      req.body
    );

    const { id: userId } = await getUserBySessionId(sessionId);

    const { passwordHash } = await prisma.userCredentials.findUnique({
      where: { userId: userId },
      rejectOnNotFound: true,
    });

    if (passwordHash !== String(sha256(oldPassword)))
      return sendAuthorizationError(res, "Old user password does not match");

    await prisma.userCredentials.update({
      where: { userId: userId },
      data: { passwordHash: String(sha256(newPassword)) },
    });

    return sendSuccess(res, "User password changed successfully", {});
  } catch (e: any) {
    if (e instanceof ValidationError) {
      return sendValidationError(res, e);
    }

    if (e.name === "NotFoundError")
      return sendNotFound(res, "Sessin with given id not found");

    console.log(e);
    return sendInternalServerError(res);
  }
}

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

export const getUserBySessionId = async (sessionId: string | undefined) => {
  const session = await prisma.sessions.findUnique({
    where: { id: sessionId },
    include: { user: { include: { details: true, goals: true } } },
    rejectOnNotFound: true,
  });
  return session.user;
};
