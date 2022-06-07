import { object, string, number, ValidationError } from 'yup';
import { Request, Response } from 'express'
import prisma from "../client";

const createGoalsSchema = object({
  userId: string().required().uuid(),
  calories: number().required().positive(),
  proteins: number().required().positive(),
  carbs: number().required().positive(),
  fats: number().required().positive(),
  fiber: number().required().positive(),
  salt: number().required().positive(),
})

export const store = async (req: Request, res: Response) => {
  const userId = req.params['userId']!;
  try {
    const data = await createGoalsSchema.validate(req.body);
    const result = await prisma.userGoals.create({
      data: {
        ...data,
        userId: userId
      }
    })
    return res.status(200).send({
      status: "success",
      data: result,
      message: "Goals created successfully"
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
      message: "internal server error"
    })
  }
}

export const update = async (req: Request, res: Response) => {
  const userId = req.params['userId']!;
  const data = req.body;
  try {
    if (data.carbs) {
      await number().positive().validate(data.carbs)
    }
    if (data.proteins) {
      await number().positive().validate(data.proteins)
    }
    if (data.fats) {
      await number().positive().validate(data.fats)
    }
    if (data.fiber) {
      await number().positive().validate(data.fiber)
    }
    if (data.salt) {
      await number().positive().validate(data.salt)
    }
    if (data.calories) {
      await number().positive().validate(data.calories)
    }
    const result = await prisma.userGoals.update({
      where: {
        userId: userId
      },
      data: {
        ...data
      }
    })
    return res.status(200).send({
      status: "success",
      data: result,
      message: "Goals updated successfully"
    })
  } catch (e: any) {
    return res.status(500).send({
      status: "error",
      data: {},
      message: e.message
    })
  }
}

export const get = async (req: Request, res: Response) => {
  const userId = req.params['userId']!;
  try {
    const result = await prisma.userGoals.findUnique({
      where: {
        userId: userId
      }
    })
    return res.status(200).send({
      status: "success",
      data: result,
      message: "Goals retrieved successfully"
    })
  } catch (e) {
    return res.status(500).send({
      status: "error",
      data: {},
      message: "internal server error"
    })
  }
}
