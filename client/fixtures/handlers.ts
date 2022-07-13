import type { Client, Project, Entry } from "../src/types.server";

import { parseDuration } from "../../server/src/utils/time";
import { rest } from "msw";

import clients from "./clients";
import projects from "./projects";
import entries from "./entries";

export default [
  rest.get("/api/entries", (request, response, context) =>
    response(
      context.json({
        success: true,
        entries,
      })
    )
  ),
  rest.post("/api/entries", (request, response, context) => {
    if (request.body === undefined) {
      return;
    }

    const { duration, ...rest } = request.body as Omit<Entry, "seconds"> & {
      duration: string;
    };

    const entry = {
      ...rest,
      id: entries[entries.length - 1].id + 1,
      seconds: parseDuration(duration),
    };

    return response(
      context.json({
        success: true,
        entry,
      })
    );
  }),
  rest.get("/api/projects", (request, response, context) =>
    response(
      context.json({
        success: true,
        projects,
      })
    )
  ),
  rest.post("/api/projects", (request, response, context) => {
    if (request.body === undefined) {
      return;
    }

    const project = {
      ...(request.body as Project),
      id: clients[clients.length - 1].id + 1,
    };

    return response(
      context.json({
        success: true,
        project,
      })
    );
  }),
  rest.get("/api/clients", (request, response, context) =>
    response(
      context.json({
        success: true,
        clients,
      })
    )
  ),
  rest.post("/api/clients", (request, response, context) => {
    if (request.body === undefined) {
      return;
    }

    const client = {
      ...(request.body as Client),
      id: clients[clients.length - 1].id + 1,
      projects: [],
    };

    return response(
      context.json({
        success: true,
        client,
      })
    );
  }),
];
