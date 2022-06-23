import type { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";
import { Router } from "express";

export default function (prisma: PrismaClient) {
  const router: Router = Router();

  router.get("/", async (request: Request, response: Response) => {
    const profiles = await prisma.profile.findMany();

    return response.json({
      success: true,
      profiles,
    });
  });

  return router;
}
