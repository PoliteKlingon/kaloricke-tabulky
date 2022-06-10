import { object, string, number, ValidationError } from "yup";
import { Request, Response } from "express";
import prisma from "../client";
import {
  sendCreatedSuccessfully,
  sendDuplicateError,
  sendInternalServerError,
  sendNotFound,
  sendSuccess,
  sendValidationError,
} from "./universalResponses";

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
    if (duplicate) {
      return sendDuplicateError(
        res,
        `Food with name '${data.name}' already exists`
      );
    }

    const food = await prisma.food.create({ data });
    return sendCreatedSuccessfully(res, "Food created successfully", food);
  } catch (e: any) {
    if (e instanceof ValidationError) {
      return sendValidationError(res, e);
    }

    return sendInternalServerError(res);
  }
};

export const get = async (_: Request, res: Response) => {
  try {
    const foods = await prisma.food.findMany({ where: { deleted: false } });
    return sendSuccess(res, "Foods retreived successfully", foods);
  } catch (e) {
    return sendInternalServerError(res);
  }
};

export const getById = async (req: Request, res: Response) => {
  const id = req.params["id"]!;
  try {
    const food = await prisma.food.findUnique({
      where: { id: id },
    });
    if (food === null || food.deleted)
      return sendNotFound(res, `Food with id ${id} not found`);

    return sendSuccess(res, "Food retreived successfully", food);
  } catch (e) {
    return sendInternalServerError(res);
  }
};

export const getByName = async (req: Request, res: Response) => {
  try {
    const name = req.params["name"]!.toLowerCase();
    const foods = await prisma.food.findMany({
      where: {
        AND: [{ deleted: false }, { name: { contains: name } }],
      },
    });
    return sendSuccess(res, "Foods retreived successfully", foods);
  } catch (e) {
    return sendInternalServerError(res);
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
        return sendDuplicateError(res, "Food with given name already exists");
      }
    }

    const result = await prisma.food.update({
      data: { ...data },
      where: { id: data.id },
    });

    return sendSuccess(res, "Food updated successfully", result);
  } catch (e) {
    if (e instanceof ValidationError) {
      return sendValidationError(res, e);
    }

    return sendInternalServerError(res);
  }
};

export const deleteFood = async (req: Request, res: Response) => {
  const id = req.params["id"]!;
  try {
    const result = await prisma.food.update({
      where: { id: id },
      data: { deleted: true },
    });
    return sendSuccess(res, "Food deleted successfully", result);
  } catch (e) {
    return sendInternalServerError(res);
  }
};
