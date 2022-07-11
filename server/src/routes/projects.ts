import type { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { Router } from "express";
import { errorHandler } from "../prisma";

export default function (prisma: PrismaClient) {
  const router: Router = Router();

  router.get("/", async (request: Request, response: Response) => {
    const projects = await prisma.project.findMany();

    return response.json({
      success: true,
      projects,
    });
  });

  router.get("/:id", async (request: Request, response: Response) => {
    const id = Number(request.params.id);

    if (isNaN(id) === true) {
      return response.status(400).json({
        success: false,
      });
    }

    const project = await prisma.project.findUnique({
      where: {
        id: Number(request.params.id),
      },
    });

    if (project === null) {
      return response.status(404).json({
        success: false,
      });
    }

    return response.json({
      success: true,
      project,
    });
  });

  router.post("/", async (request: Request, response: Response) => {
    const errors = ["code", "name", "clientId"].reduce(
      (errors: string[], key: string) => {
        if (request.body[key] === undefined) {
          return [...errors, `Must include ${key}`];
        }

        return errors;
      },
      []
    );

    if (
      request.body.code === "" ||
      (request.body.code && request.body.code.length < 3)
    ) {
      errors.push("Project code must be at least 3 characters");
    }

    if (
      request.body.code === "" ||
      (request.body.name && request.body.name.length < 3)
    ) {
      errors.push("Project name must be at least 3 characters");
    }

    if (errors.length > 0) {
      return response.json({
        success: false,
        errors,
      });
    }

    const data = {
      code: request.body.code,
      name: request.body.name,
      clientId: Number(request.body.clientId),
    };

    try {
      const project = await prisma.project.create({
        data,
      });

      return response.status(201).json({
        success: true,
        project,
      });
    } catch (error) {
      return errorHandler(error as Error, response);
    }
  });

  return router;
}
