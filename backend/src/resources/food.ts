import { object, string, number, ValidationError } from "yup";
import { Request, Response } from "express";
import prisma from "../client";

const foodSchema = object({
  name: string().required().trim(),
  description: string().default("Food").trim(),
  calories: number().required(),
  proteins: number().required(),
  carbs: number().required(),
  fats: number().required(),
  fiber: number().required(),
  salt: number().required(),
});

const foodUpdateSchema = object({
  name: string().optional().trim(),
  description: string().optional().trim(),
  calories: number().optional(),
  proteins: number().optional(),
  carbs: number().optional(),
  fats: number().optional(),
  fiber: number().optional(),
  salt: number().optional(),
  id: string().required(),
});

export const store = async (req: Request, res: Response) => {
  try {
    const data = await foodSchema.validate(req.body);
    const duplicate = await prisma.food.findUnique({
      where: { name: data.name },
    });
    if (duplicate != null) {
      return res.status(401).send({
        status: "error",
        message: `Food with name '${data.name}' already exists`,
        data: {},
      });
    }
    const food = await prisma.food.create({ data });

    return res.status(201).send({
      status: "success",
      data: food,
      message: "Food created successfully",
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
      message: "internal server error",
    });
  }
};

export const get = async (_: Request, res: Response) => {
  try {
    const foods = await prisma.food.findMany({ where: { deleted: false } });
    return res.status(200).send({
      status: "success",
      data: foods,
      message: "Foods retrieved successfully",
    });
  } catch (e) {
    return res.status(500).send({
      status: "error",
      data: {},
      message: "Internal server error",
    });
  }
};

export const getById = async (req: Request, res: Response) => {
  const id = req.params["id"]!;
  try {
    const food = await prisma.food.findUnique({
      where: {
        id: id,
      },
    });
    if (food === null || food.deleted)
      return res.status(404).send({
        status: "error",
        data: {},
        message: `Food with id ${id} not found`,
      });

    return res.status(200).send({
      status: "success",
      data: food,
      message: "Foods retrieved successfully",
    });
  } catch (e) {
    return res.status(500).send({
      status: "error",
      data: {},
      message: "Internal server error",
    });
  }
};

export const getByName = async (req: Request, res: Response) => {
  try {
    const name = req.params["name"]!.toLowerCase();
    const foods = await prisma.food.findMany({
      where: {
        AND: [
          { deleted: false },
          {
            name: {
              contains: name,
            },
          },
        ],
      },
    });
    return res.status(200).send({
      status: "success",
      data: foods,
      message: "Foods retrieved successfully",
    });
  } catch (e) {
    return res.status(500).send({
      status: "error",
      data: {},
      message: "Internal server error",
    });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const data = await foodUpdateSchema.validate(req.body);

    if (data.name) {
      const duplicate = await prisma.food.findUnique({
        where: { name: data.name },
      });
      if (duplicate && duplicate.id != data.id) {
        return res.status(409).send({
          status: "error",
          message: "Food with given name already exists",
          data: {},
        });
      }
    }

    const request = await prisma.food.update({
      data: {
        ...data,
      },
      where: {
        id: data.id,
      },
    });
    return res.send({
      status: "sucess",
      data: request,
      message: "Request updated",
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

export const deleteFood = async (req: Request, res: Response) => {
  const id = req.params["id"]!;
  try {
    const request = await prisma.food.update({
      where: {
        id: id,
      },
      data: {
        deleted: true,
      },
    });
    return res.send({
      status: "sucess",
      data: request,
      message: "Request updated",
    });
  } catch (e) {
    return res.status(500).send({
      status: "error",
      data: {},
      message: "Internal server error",
    });
  }
};
