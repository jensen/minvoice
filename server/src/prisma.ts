import type { Response } from "express";
import { Prisma } from "@prisma/client";

export const errorHandler = (error: Error, response: Response) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002" && error.meta) {
      return response.json({
        success: false,
        errors: (error.meta.target as string[]).map(
          (name) => `The '${name}' must be unique`
        ),
      });
    }
  }

  return response.json({
    success: false,
    error: "Unknown error",
  });
};
