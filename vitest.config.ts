import { defineConfig } from "vitest/config";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      // In-repo tests should run against source, not stale built artifacts.
      "@agentplaneorg/core": path.join(__dirname, "packages/core/src/index.ts"),
    },
  },
  test: {
    include: ["packages/**/src/**/*.test.ts"],
    environment: "node",
    coverage: {
      provider: "v8",
      include: ["packages/**/src/**/*.ts"],
      exclude: [
        "**/*.test.ts",
        "**/dist/**",
        "**/node_modules/**",
        ".agentplane/**",
        "packages/**/src/cli.ts",
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 72,
        statements: 80,
      },
    },
  },
});
