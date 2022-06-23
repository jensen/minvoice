import { response } from "express";
import { Prisma } from "@prisma/client";

export const errorHandler = (error: Error) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      return response.json({
        success: false,
        error:
          "There is a unique constraint violation, a client cannot be created with this name",
      });
    }
  }

  return response.json({
    success: false,
    error: "Unknown error",
  });
};
