import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";
import { Router } from "express";
import { errorHandler } from "../prisma";

export default function (prisma: PrismaClient) {
  const router: Router = Router();

  router.get("/", async (request: Request, response: Response) => {
    const clients = await prisma.client.findMany({
      include: {
        projects: true,
      },
    });

    return response.json({
      success: true,
      clients: clients.map((client) => ({
        ...client,
        projects: client.projects.map((project) => project.id),
      })),
    });
  });

  router.post("/", async (request: Request, response: Response) => {
    const errors = ["name"].reduce((errors: string[], key: string) => {
      if (request.body[key] === undefined) {
        return [...errors, `Must include ${key}`];
      }

      return errors;
    }, []);

    if (errors.length > 0) {
      return response.json({
        success: false,
        errors,
      });
    }

    const data = {
      name: request.body.name,
    };

    try {
      const client = await prisma.client.create({
        data,
        include: {
          projects: true,
        },
      });

      return response.status(201).json({
        success: true,
        client: {
          ...client,
          projects: client.projects.map((project) => project.id),
        },
      });
    } catch (error: unknown) {
      return errorHandler(error as Error);
    }
  });

  return router;
}
