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
      })
    ])
    return Result.ok(true);
  } catch (e) {
    return Result.err(e as Error);
  }
}

export default seedDB;