import prisma from "../../client";
import { Result } from "@badrap/result";
import type SeedFileStructure from "../../types/data-transfer-objects";

const seedDB = async (yamlParsed: SeedFileStructure): Promise<Result<boolean>> => {
  try {
    prisma.$transaction([
      ...yamlParsed.userCredentials.map((single) => {
        return prisma.userCredentials.create({
          data: {
            ...single,
          },
        });
      }),
       ...yamlParsed.userGoals.map((single) => {
         return prisma.userGoals.create({
           data: {
             ...single,
           }
         })
       }),
      ...yamlParsed.userDetails.map((single) => {
        return prisma.userDetails.create({
          data: {
            ...single,
          }
        })
      }),

      ...yamlParsed.food.map((single) => {
        return prisma.food.create({
          data: { 
            ...single,
          }
        })
      }),

      ...yamlParsed.eaten.map((single) => {
        return prisma.eaten.create({
          data: {
            ...single,
            foodId: single.foodId
          }
        })
      }),

      ...yamlParsed.meal.map((single) => {
        return prisma.meal.create({
          data: {
            ...single,
            food: {
              connect: single.food.map((singleFood) => ({
                id: singleFood.id
              }))
            }
          },
        })
      })
    ])
    return Result.ok(true);
  } catch (e) {
    return Result.err(e as Error);
  }
}

export default seedDB;