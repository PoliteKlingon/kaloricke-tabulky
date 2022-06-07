import { object, string, number,ValidationError } from 'yup';
import { Request, Response } from 'express'
import prisma from "../client";

const foodSchema = object({
  name: string().required(),
  description: string().default("Food"),
  calories: number().required(),
  proteins: number().required(),
  carbs: number().required(),
  fats: number().required(),
  fiber: number().required(),
  salt: number().required(),
})

export const store = async (req: Request, res: Response) => {
  try {
    const data = await foodSchema.validate(req.body);
    data.name = data.name.toLowerCase();
    const food = await prisma.food.create({ data });

    return res.status(201).send({
      status: "success",
      data: food,
      message: "Food created successfully"
    })
  } catch (e: any) {
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

export const get = async (_: Request, res: Response) => {
  try {
    const foods = await prisma.food.findMany();
    return res.status(200).send({
      status: "success",
      data: foods,
      message: "Foods retrieved successfully"
    })
  } catch (e) {
    return res.status(500).send({
      status: "error",
      data: {},
      message: "Internal server error"
    })
  }
}

export const getById = async (req: Request, res: Response) => {
  const id = req.params['id']!;
  try {
    const foods = await prisma.food.findUnique({
      where: {
        id: id
      }
    })
    return res.status(200).send({
      status: "success",
      data: foods,
      message: "Foods retrieved successfully"
    })
  } catch (e) {
    return res.status(500).send({
      status: "error",
      data: {},
      message: "Internal server error"
    })
  }
}

export const getByName = async (req: Request, res: Response) => {
  try {
    const name = req.params['name']!.toLowerCase();
    const foods = await prisma.food.findMany({
      where: {
        name: {
          contains: name
        }
      }
    })
    return res.status(200).send({
      status: "success",
      data: foods,
      message: "Foods retrieved successfully"
    })
  } catch (e) {
    return res.status(500).send({
      status: "error",
      data: {},
      message: "Internal server error"
    })
  }
}


export const update = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    
    await string().uuid().validate(data.id)
    console.log("kurva kokot")
    if (data.name) {
      data.name = data.name.toLowerCase();
    }
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

    const request = await prisma.food.update({
      data: {
        ...data,
      },
      where: {
        id: data.id
      }
    })
    return res.send({
      status: "sucess",
      data: request,
      message: "Request updated"
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

export const deleteFood = async (req: Request, res: Response) => {
  const id = req.params['id']!;
  try {
    const request = await prisma.food.update({
      where: {
        id: id
      },
      data: {
        deleted: true
      }
    })
    return res.send({
      status: "sucess",
      data: request,
      message: "Request updated"
    })
  } catch (e) {
    return res.status(500).send({
      status: "error",
      data: {},
      message: "Internal server error"
    })
  }
}