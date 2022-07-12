import { defineConfig } from "cypress";
import * as coverageTask from "@cypress/code-coverage/task";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      coverageTask(on, config);
      return config;
    },
  },
  video: false,
  trashAssetsBeforeRuns: true,
});
