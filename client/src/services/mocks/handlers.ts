import type { Client, Project, Entry } from "../../types.server";
import { rest } from "msw";
import { parseDuration } from "../../../../server/src/routes/entries";

const entries = [
  {
    id: 1,
    description: "Entry description.",
    seconds: 3600,
    projectId: 1,
    date: "2022-06-01T07:00:00Z",
  },
];

const clients = [
  { id: 1, name: "First Client", projects: [1, 2] },
  { id: 2, name: "Second Client", projects: [3] },
];

const projects = [
  { id: 1, code: "FIRST", name: "First Project", clientId: 1 },
  { id: 2, code: "SECOND", name: "Second Project", clientId: 1 },
  { id: 3, code: "THIRD", name: "Third Project", clientId: 2 },
];

export const handlers = [
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
