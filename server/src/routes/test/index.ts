import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";
import { Router } from "express";
import { errorHandler } from "../../prisma";

export default function (prisma: PrismaClient) {
  const router: Router = Router();

  router.post("/reset", async (request: Request, response: Response) => {
    await prisma.$queryRaw`TRUNCATE TABLE clients CASCADE;`;

    return response.json({});
  });

  router.post("/seed", async (request: Request, response: Response) => {
    const { id: clientId } = await prisma.client.create({
      data: {
        name: "First Client",
      },
    });

    const { id: projectId } = await prisma.project.create({
      data: {
        code: "FIRST",
        name: "First Project",
        clientId,
      },
    });

    await prisma.entry.create({
      data: {
        description: "First description.",
        date: new Date("2022-06-01T07:00:00Z"),
        seconds: 3600,
        projectId,
      },
    });

    return response.json({});
  });

  return router;
}
