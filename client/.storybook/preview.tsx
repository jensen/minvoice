import { rest } from "msw";
import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { initialize, mswDecorator } from "msw-storybook-addon";
import { BrowserRouter } from "react-router-dom";
import CacheProvider from "../src/context/cache";

import "../src/styles/index.css";

const providerDecorator = (Story: ComponentStory<any>) => (
  <BrowserRouter>
    <CacheProvider>
      <Story />
    </CacheProvider>
  </BrowserRouter>
);

initialize({
  onUnhandledRequest: "bypass",
});

export const decorators = [mswDecorator, providerDecorator];
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  msw: {
    handlers: [
      rest.get("/api/entries", (request, response, context) =>
        response(
          context.json({
            success: true,
            entries: [
              {
                id: 1,
                name: "First Entry",
                description: "Entry description.",
                seconds: 3600,
                projectId: 1,
                date: "2022-06-01T07:00:00Z",
              },
            ],
          })
        )
      ),
      rest.get("/api/projects", (request, response, context) =>
        response(
          context.json({
            success: true,
            projects: [
              { id: 1, code: "FIRST", name: "First Project", clientId: 1 },
              { id: 2, code: "SECOND", name: "Second Project", clientId: 1 },
              { id: 3, code: "THIRD", name: "Third Project", clientId: 2 },
            ],
          })
        )
      ),
      rest.get("/api/clients", (request, response, context) =>
        response(
          context.json({
            success: true,
            clients: [
              { id: 1, name: "First Client", projects: [1, 2] },
              { id: 2, name: "Second Client", projects: [3] },
            ],
          })
        )
      ),
    ],
  },
};
