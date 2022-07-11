import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./test/setup.ts"],
    coverage: {
      all: true,
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/types.server.ts",
        "src/vite-env.d.ts",
        "src/stories/**",
        "src/services/mocks",
        "src/**/*.test.{ts,tsx}",
      ],
    },
  },
  plugins: [tsconfigPaths(), react()],
});
