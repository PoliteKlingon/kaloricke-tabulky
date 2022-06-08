import { object, string, number, ValidationError, date } from "yup";
import { Request, Response } from "express";
import prisma from "../client";

const userCredentialsSchema = object({
  passwordHash: string().required(),
  email: string().required(),
});

const userDetailsSchema = object({
  username: string().required().trim(),
  name: string().required().trim(),
  surname: string().required().trim(),
  height: number().required().positive(),
  weight: number().required().positive(),
  birthdate: date().required().min("1940-01-01T00:00:00.000Z"),
  sex: number().required().min(0).max(1),
  email: string().email().required().trim(),
  userId: string().required(),
});

export const store = async (req: Request, res: Response) => {
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
    // TODO check whether credentials created successfully

    const details = await userDetailsSchema.validate(req.body);

    const result = await prisma.userDetails.create({
      data: {
        ...details,
      },
    });
    // TODO check whether userDetails created successfully

    const session = await prisma.sessions.create({
      data: {
        userId: user.id,
      },
    });

    return res.status(201).send({
      status: "success",
      data: { sessionId: session.id },
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

export const updateDetails = async (req: Request, res: Response) => {
  if (!(await validateAuthorization(req.body.sessionId, req.body.userId)))
    return res.status(401).send({
      status: "error",
      message: "User is not authorized for that change",
      data: {},
    });

  try {
    const details = await userDetailsSchema.validate(req.body);

    const result = await prisma.userDetails.update({
      where: {
        userId: details.userId,
      },
      data: {
        ...details,
      },
    });
    return res.status(200).send({
      status: "success",
      data: result,
      message: "User data updated successfully",
    });
  } catch (e) {
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
      message: "Internal server error",
    });
  }
};

export const get = async (req: Request, res: Response) => {
  if (!(await validateAuthorization(req.body.sessionId, req.body.userId)))
    return res.status(401).send({
      status: "error",
      message: "User is not authorized for that change",
      data: {},
    });

  try {
    const user = await prisma.userDetails.findUnique({
      where: {
        userId: req.body.userId,
      },
    });
    return res.status(200).send({
      status: "success",
      data: user,
      message: "User data retrieved successfully",
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      data: {},
      message: "Internal server error",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  const data = req.body;
  const credentials = await prisma.userCredentials.findUnique({
    where: { email: data.email },
  });
  if (credentials?.passwordHash === data.passwordHash)
    return res.status(200).send({
      status: "success",
      data: { sessionToken: randomBytes(16).toString("base64") },
      message: "Login success",
    });
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

const validateAuthorization = async (sessionId: string, userId: string) => {
  const session = await prisma.sessions.findUnique({
    where: { id: sessionId },
  });
  return session?.userId === userId;
};
