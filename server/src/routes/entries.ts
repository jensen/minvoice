import type { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";
import { Router } from "express";

export const parseDuration = (input: string) => {
  const [hours, minutes] = input.split(":");

  return Number(hours) * 3600 + Number(minutes) * 60;
};

export default function (prisma: PrismaClient) {
  const router: Router = Router();

  router.get("/", async (request: Request, response: Response) => {
    const entries = await prisma.entry.findMany();

    return response.json({
      success: true,
      entries,
    });
  });

  router.post("/", async (request: Request, response: Response) => {
    const errors = ["date", "description", "duration", "projectId"].reduce(
      (errors: string[], key: string) => {
        if (request.body[key] === undefined) {
          return [...errors, `Must include ${key}`];
        }

        return errors;
      },
      []
    );

    if (errors.length > 0) {
      return response.json({
        success: false,
        errors,
      });
    }

    const seconds = parseDuration(request.body.duration);
    const data = {
      date: request.body.date,
      description: request.body.description,
      project: {
        connect: { id: Number(request.body.projectId) },
      },
      seconds,
    };

    const entry = await prisma.entry.create({
      data,
    });

    return response.status(201).json({
      success: true,
      entry,
    });
  });

  router.put("/:id", async (request: Request, response: Response) => {
    const errors = ["date", "description", "duration", "projectId"].reduce(
      (errors: string[], key: string) => {
        if (request.body[key] === undefined) {
          return [...errors, `Must include ${key}`];
        }

        return errors;
      },
      []
    );

    if (errors.length > 0) {
      return response.json({
        success: false,
        errors,
      });
    }

    const seconds = parseDuration(request.body.duration);
    const data = {
      date: request.body.date,
      description: request.body.description,
      project: {
        connect: { id: Number(request.body.projectId) },
      },
      seconds,
    };

    const entry = await prisma.entry.update({
      where: {
        id: Number(request.params.id),
      },
      data,
    });

    return response.status(200).json({
      success: true,
      entry,
    });
  });

  router.delete("/:id", async (request: Request, response: Response) => {
    const entry = await prisma.entry.delete({
      where: {
        id: Number(request.params.id),
      },
    });

    return response.json({
      success: true,
      entry,
    });
  });

  return router;
}
