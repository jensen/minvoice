import path from "path";
import express from "express";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";

import clientRoutes from "./routes/clients";
import projectRoutes from "./routes/projects";
import profileRoutes from "./routes/profiles";
import entryRoutes from "./routes/entries";
import testRoutes from "./routes/test";

const PORT = 3001;
const application = express();

const prisma = new PrismaClient();

if (process.env.CLIENT_BUILD === undefined) {
  throw new Error("Must declare the CLIENT_BUILD");
}

const indexPath = path.resolve(process.env.CLIENT_BUILD, "index.html");

application.use(bodyParser.json());
application.use(bodyParser.urlencoded({ extended: false }));

application.use(express.static(process.env.CLIENT_BUILD));

application.use("/api/clients", clientRoutes(prisma));
application.use("/api/projects", projectRoutes(prisma));
application.use("/api/entries", entryRoutes(prisma));
application.use("/api/profiles", profileRoutes(prisma));

if (process.env.NODE_ENV === "test") {
  application.use("/api/test", testRoutes(prisma));
}

application.use("*", (request, response) => response.sendFile(indexPath));

application.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
