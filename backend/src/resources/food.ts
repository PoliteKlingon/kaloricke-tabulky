import { object, string, number, ValidationError } from "yup";
import { Request, Response } from "express";
import prisma from "../client";
import {
  sendAuthorizationError,
  sendCreatedSuccessfully,
  sendDuplicateError,
  sendInternalServerError,
  sendNotFound,
  sendSuccess,
  sendValidationError,
} from "./universalResponses";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

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
    // TODO add authorization check
    const data = await foodSchema.validate(req.body);

    const food = await prisma.food.create({
      data: { ...data, id: data.name.toLowerCase() },
    });
    return sendCreatedSuccessfully(res, "Food created successfully", food);
  } catch (e: any) {
    if (e instanceof ValidationError) {
      return sendValidationError(res, e);
    }

    if (e instanceof PrismaClientKnownRequestError && e.code === "P2002")
      return sendDuplicateError(res, "Food with given name already exists");

    return sendInternalServerError(res);
  }
};

export const getAll = async (_: Request, res: Response) => {
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

export const get = async (req: Request, res: Response) => {
  try {
    const id = req.params["name"]?.toLowerCase();
    const food = await prisma.food.findFirst({
      where: {
        AND: [{ deleted: false }, { id: id }],
      },
      rejectOnNotFound: true,
    });

    return sendSuccess(res, "Foods retreived successfully", food);
  } catch (e: any) {
    if (e.name === "NotFoundError") return sendNotFound(res, "Food not found");

    return sendInternalServerError(res);
  }
};

export const searchByName = async (req: Request, res: Response) => {
  try {
    const partOfId = req.params["name"]!.toLowerCase();
    const foods = await prisma.food.findMany({
      where: {
        AND: [{ deleted: false }, { id: { contains: partOfId } }],
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

    const result = await prisma.food.update({
      data: { ...data },
      where: { id: data.id },
    });

    return sendSuccess(res, "Food updated successfully", result);
  } catch (e: any) {
    if (e instanceof ValidationError) {
      return sendValidationError(res, e);
    }

    if (e instanceof PrismaClientKnownRequestError && e.code === "P2002")
      return sendDuplicateError(res, "Food with given name already exists");

    if (e.name === "NotFoundError") return sendAuthorizationError(res);

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
