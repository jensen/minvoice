import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
import postcssNesting from "postcss-nesting";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [postcssNesting],
    },
  },
  plugins: [tsconfigPaths(), react(), eslint()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3001",
      },
    },
  },
});
