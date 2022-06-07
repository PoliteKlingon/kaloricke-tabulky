import { object, string, number, ValidationError, date } from 'yup';
import { Request, Response } from 'express'
import prisma from "../client";

const createUserSchema = object({
  username: string().required(),
  name: string().optional().required(),
  surname: string().optional().required(),
  height: number().required().positive(),
  weight: number().required().positive(),
  birthdate: date().required().min("1940-01-01T00:00:00.000Z"),
  sex: number().required().min(0).max(1),
  email: string().email().required()
})


export const store = async (req: Request, res: Response) => {
  try {
    const data = await createUserSchema.validate(req.body);
    
    const result = await prisma.userDetails.create({
      data: {
        ...data
      }
    })
    console.log("Kokot");
    return res.status(201).send({
      status: "success",
      data: result,
      message: "User created successfully"
    })
  } catch (e:any) {
    if (e instanceof ValidationError) {
      return res.status(400).send({
        status: "error",
        message: "Invalid data",
        data: e.errors
      })
    }

    return res.status(500).send({
      status: "error",
      data: {},
      message: e.message
    })
  }
}

export const update = async (req: Request, res: Response) => {
  const userId = req.params['id']!;
  try {
    const data = req.body;
    if (data.username) {
      await string().trim().required().validate(data.username);
    }
    if (data.surname) {
      await string().trim().required().validate(data.surname);
    }
    if (data.name) {
      await string().trim().required().validate(data.name);
    }
    if (data.weight) {
      await number().positive().validate(data.weight);
    }
    if (data.height) {
      await number().positive().validate(data.height);
    }
    if (data.year_born) {
      await date().min("1940-01-01T00:00:00.000Z").validate(data.year_born);
    }
    if (data.sex) {
      await number().min(0).max(1).validate(data.sex);
    }
    if (data.email) {
      await string().email().validate(data.string);
    }

    const result = await prisma.userDetails.update({
      where: {
        id: userId
      },
      data: {
        ...data
      }
    })
    return res.status(200).send({
      status: "success",
      data: result,
      message: "User data updated successfully"
    })
  } catch (e) {
    if (e instanceof ValidationError) {
      return res.status(400).send({
        status: "error",
        message: "Invalid data",
        data: e.errors
      })
    }

    return res.status(500).send({
      status: "error",
      data: {},
      message: "Internal server error"
    })
  }
}

export const get = async (req: Request, res: Response) => {
  const userId = req.params['id']!;
  try {
    const user = await prisma.userDetails.findUnique({
      where: {
        id: userId
      }
    })
    return res.status(200).send({
      status: "success",
      data: user,
      message: "User data retrieved successfully"
    })
  } catch (error) {
    return res.status(500).send({
      status: "error",
      data: {},
      message: "Internal server error"
    });
  }
}
