import { rest } from "msw";
import { setupServer } from "msw/node";
import { handlers } from "./handlers";

export const server = setupServer(...handlers);

const mock = (method: "get" | "post") => (path: string) => ({
  response: (data: unknown) => {
    if (typeof data === "object") {
      server.use(
        rest[method](path, (request, response, context) =>
          response(context.json({ success: true, ...data }))
        )
      );
    }
  },
  error: (errors: string[]) =>
    server.use(
      rest[method](path, (request, response, context) =>
        response(context.json({ success: false, errors }))
      )
    ),
});

export const mockGet = mock("get");
export const mockPost = mock("post");
