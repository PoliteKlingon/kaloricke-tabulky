import { object, string, ValidationError } from "yup";
import { Request, Response } from "express";
import prisma from "../client";
import { userDetails, userGoals } from "../resources";
import {
  sendAuthorizationError,
  sendCreatedSuccessfully,
  sendDuplicateError,
  sendInternalServerError,
  sendSuccess,
  sendValidationError,
} from "./universalResponses";

const userCredentialsSchema = object({
  passwordHash: string().required(),
  email: string().required(),
});

export const register = async (req: Request, res: Response) => {
  try {
    const data = await userCredentialsSchema.validate(req.body.credentials);
    const duplicate = await prisma.userCredentials.findUnique({
      where: { email: data.email },
    });
    if (duplicate) {
      return sendDuplicateError(res, "User with given email already exists");
    }

    const user = await prisma.user.create({ data: {} });

    const credentials = await prisma.userCredentials.create({
      data: { ...data, userId: user.id },
    });

    const details = await userDetails.store(req.body.details, user.id);

    const age = getAge(new Date(details.birthdate));
    let goalsData =
      req.body.goals ||
      calculateGoals(age, details.height, details.sex, details.weight);
    const goals = await userGoals.store(goalsData, user.id);

    const session = await prisma.sessions.create({ data: { userId: user.id } });

    const responseData = {
      sessionId: session.id,
      userId: user.id,
      details: details,
      goals: goals,
    };

    return sendCreatedSuccessfully(
      res,
      "User created successfully",
      responseData
    );
  } catch (e: any) {
    if (e instanceof ValidationError) {
      return sendValidationError(res, e);
    }

    return sendInternalServerError;
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const data = await userCredentialsSchema.validate(req.body);

    const credentials = await prisma.userCredentials.findUnique({
      where: { email: data.email },
    });

    if (credentials === null || credentials.passwordHash != data.passwordHash)
      return sendAuthorizationError(res, "Login failed");

    const session = await prisma.sessions.create({
      data: { userId: credentials.userId },
    });

    const responseData = { sessionId: session.id, userId: credentials.userId };
    return sendSuccess(res, "Login success", responseData);
  } catch (e) {
    if (e instanceof ValidationError) return sendValidationError(res, e);

    return sendInternalServerError(res);
  }
};

export const validateAuthorization = async (
  sessionId: string,
  userId: string
) => {
  const session = await prisma.sessions.findUnique({
    where: { id: sessionId },
  });
  return session != null && session.userId === userId;
};

const calculateGoals = (
  age: number,
  height: number,
  sex: number,
  weight: number
) => {
  // FIXME calculate values istead of static data
  return {
    calories: 2300,
    proteins: 150,
    carbs: 230,
    fats: 79,
    fiber: 18,
    salt: 5,
  };
};

const getAge = (birthDate: Date) =>
  Math.floor(
    (new Date().getTime() - new Date(birthDate).getTime()) / 3.15576e10
  );
