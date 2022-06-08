import { object, string, ValidationError } from "yup";
import { Request, Response } from "express";
import prisma from "../client";
import { userDetails, userGoals } from "../resources";

const userCredentialsSchema = object({
  passwordHash: string().required(),
  email: string().required(),
});

export const register = async (req: Request, res: Response) => {
  const credentialsReq = await userCredentialsSchema.validate(
    req.body.credentials
  );
  try {
    const duplicate = await prisma.userCredentials.findUnique({
      where: { email: credentialsReq.email },
    });
    if (duplicate != null) {
      return res.status(409).send({
        status: "error",
        message: "User with given email already exists",
        data: {},
      });
    }

    const user = await prisma.user.create({
      data: {},
    });
    const credentials = await prisma.userCredentials.create({
      data: {
        ...credentialsReq,
        userId: user.id,
      },
    });

    const details = await userDetails.store(req.body.details, user.id);

    const age = getAge(new Date(details.birthdate));
    let goals =
      req.body.goals ||
      calculateGoals(age, details.height, details.sex, details.weight);
    await userGoals.store(goals, user.id);

    const session = await prisma.sessions.create({
      data: {
        userId: user.id,
      },
    });

    return res.status(201).send({
      status: "success",
      data: { sessionId: session.id, userId: user.id },
      message: "User created successfully",
    });
  } catch (e: any) {
    if (e instanceof ValidationError) {
      return res.status(400).send({
        status: "error",
        message: "Invalid data",
        data: e.errors,
      });
    }

    return res.status(500).send({
      status: "error",
      data: {},
      message: e.message,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  const data = req.body;
  const credentials = await prisma.userCredentials.findUnique({
    where: { email: data.email },
  });
  if (credentials === null || !credentials.passwordHash === data.passwordHash)
    return res.status(401).send({
      status: "failed",
      data: {},
      message: "Login unsuccessfull",
    });
  const session = await prisma.sessions.create({
    data: {
      userId: credentials.userId,
    },
  });

  return res.status(200).send({
    status: "success",
    data: { sessionId: session.id, userId: credentials.userId },
    message: "Login successfull",
  });
};

export const validateAuthorization = async (
  sessionId: string,
  userId: string
) => {
  const session = await prisma.sessions.findUnique({
    where: { id: sessionId },
  });
  return session?.userId === userId;
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

// TODO check whether working
const getAge = (birthDate: Date) =>
  Math.floor(
    (new Date().getTime() - new Date(birthDate).getTime()) / 3.15576e10
  );
