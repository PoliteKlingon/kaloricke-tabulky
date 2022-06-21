import { object, string, ValidationError } from "yup";
import { Request, response, Response } from "express";
import prisma from "../client";
import { userDetails, userGoals } from "../resources";
import {
  sendAuthorizationError,
  sendCreatedSuccessfully,
  sendDuplicateError,
  sendInternalServerError,
  sendNotFound,
  sendSuccess,
  sendValidationError,
} from "./universalResponses";
import { UserDetails, UserGoals } from "@prisma/client";

const updatePasswordSchema = object({
  oldPassword: string().required(),
  newPassword: string().required(),
});
const userCredentialsSchema = object({
  passwordHash: string().required(),
  email: string().required(),
});

export const register = async (req: Request, res: Response) => {
  try {
    const credentialsReq = {
      email: req.body.details?.email,
      passwordHash: req.body.details?.passwordHash,
    };
    const credentailsData = await userCredentialsSchema.validate(
      credentialsReq
    );

    const duplicate = await prisma.userCredentials.findUnique({
      where: { email: credentailsData.email },
    });
    if (duplicate) {
      return sendDuplicateError(res, "User with given email already exists");
    }

    const user = await prisma.user.create({ data: {} });
    await prisma.userCredentials.create({
      data: { ...credentailsData, userId: user.id },
    });

    delete req.body.details.passwordHash;

    const details = await userDetails.store(req.body.details, user.id);

    // TODO udelat goals podle Notionu
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

    return sendInternalServerError(res);
  }
};

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
    return sendSuccess(res, "User data retrieved successfully", user);
  } catch (e: any) {
    if (e.name === "NotFoundError")
      return sendNotFound(res, "Sessin with given id not found");
    console.log(e);
    return sendInternalServerError(res);
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

export const getUserIdFromSessionId = async (sessionId: string) => {
  const session = await prisma.sessions.findUnique({
    where: { id: sessionId },
  });
  return session ? session.userId : null;
};

export const getUserBySessionId = async (sessionId: string | undefined) => {
  const session = await prisma.sessions.findUnique({
    where: { id: sessionId },
    include: { user: { include: { details: true, goals: true } } },
    rejectOnNotFound: true,
  });
  return session.user;
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

// TODO test updates
export const update = async (req: Request, res: Response) => {
  try {
    const userId = await getUserIdFromSessionId(req.body.sessionId);
    if (!userId) return sendNotFound(res, "User not found");

    if (req.body.details?.email) {
      const duplicate = await prisma.userDetails.findUnique({
        where: { email: req.body.details.email },
      });
      if (duplicate && duplicate.userId != userId) {
        return sendDuplicateError(res, "User with given email already exists");
      }
    }

    interface ResponseData {
      details?: UserDetails;
      goals?: UserGoals;
    }

    const passwordHash = req.body.details.passwordHash || undefined;
    const responseData: ResponseData = {};

    if (req.body.details) {
      if (req.body.details.passwordHash) delete req.body.details.passwordHash;
      responseData.details = await userDetails.update(userId, req.body.details);
    }

    if (req.body.goals)
      responseData.goals = await userGoals.update(userId, req.body.goals);

    if (passwordHash || req.body.details?.email) {
      await prisma.userCredentials.update({
        where: { userId: userId },
        data: {
          passwordHash: passwordHash,
          email: req.body.details.email || undefined,
        },
      });
    }

    return sendSuccess(res, "User data updated successfully", responseData);
  } catch (e) {
    if (e instanceof ValidationError) return sendValidationError(res, e);
    return sendInternalServerError(res);
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const sessionId = await string().required().validate(req.body.sessionId);
    const session = await prisma.sessions.findUnique({
      where: { id: sessionId },
    });
    if (!session)
      return sendNotFound(res, "User with entered sessionId does not exist");
    await prisma.sessions.delete({ where: { id: sessionId } });
    return sendSuccess(res, "User successfully logged out", {});
  } catch (e) {
    if (e instanceof ValidationError) return sendValidationError(res, e);
    return sendInternalServerError(res);
  }
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

export async function updatePassword(req: Request, res: Response) {
  try {
    if (!req.headers.authorization)
      return sendAuthorizationError(
        res,
        "Authorization header must not be empty"
      );

    const data = await updatePasswordSchema.validate(req.body);
    const user = await getUserBySessionId(req.headers.authorization);

    const credentials = await prisma.userCredentials.findUnique({
      where: { userId: user.id },
      rejectOnNotFound: true,
    });
    if (credentials.passwordHash !== data.oldPassword)
      return sendAuthorizationError(res, "Old password does not match");

    const newPasswordHash = data.newPassword; //FIXME create hash instead of plain value
    await prisma.userCredentials.update({
      where: { userId: user.id },
      data: {
        passwordHash: newPasswordHash,
      },
    });

    return sendSuccess(res, "Password successfully updated", {});
  } catch (e) {
    if (e instanceof ValidationError) return sendValidationError(res, e);

    return sendInternalServerError(res);
  }
}
