import type { ComponentStory } from "@storybook/react";
import { initialize, mswDecorator } from "msw-storybook-addon";
import { BrowserRouter } from "react-router-dom";
import CacheProvider from "../src/context/cache";

import handlers from "../fixtures/handlers";

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
    handlers,
  },
};
