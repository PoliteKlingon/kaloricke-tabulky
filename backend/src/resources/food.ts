import { object, string, number, ValidationError } from 'yup';
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
  const name = req.params['name']!.toLowerCase();
  try {
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


const updateFoodSchema = object({
  id: string().required(),
  name: string(),
  description: string(),
  calories: number(),
  proteins: number(),
  carbs: number(),
  fats: number(),
  fiber: number(),
  salt: number(),
})

export const update = async (req: Request, res: Response) => {
  try {
    const data = await updateFoodSchema.validate(req.body);
    const original = await prisma.food.findUnique({
      where: {
        id: data.id
      }
    })

    const request = await prisma.food.update({
      data: {
        name: data.name != null ? data.name.toLowerCase() : original!.name,
        description: data.description || original!.description,
        calories: data.calories || original!.calories,
        proteins: data.proteins || original!.proteins,
        carbs: data.carbs || original!.carbs,
        fats: data.fats || original!.fats,
        fiber: data.fiber || original!.fiber,
        salt: data.salt || original!.salt,
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
  } catch (error) {
    return res.status(500).send({
      status: "error",
      data: {},
      message: "Internal server error"
    })
  }
    
}