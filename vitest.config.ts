import { defineConfig } from "vitest/config";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "@agentplane/testkit": path.join(__dirname, "packages/testkit/src/index.ts"),
      "@agentplane/testkit/cli": path.join(__dirname, "packages/testkit/src/cli.ts"),
      // In-repo tests should run against source, not stale built artifacts.
      "@agentplaneorg/core/fs": path.join(__dirname, "packages/core/src/fs/index.ts"),
      "@agentplaneorg/core/git": path.join(__dirname, "packages/core/src/git/index.ts"),
      "@agentplaneorg/core/logger": path.join(__dirname, "packages/core/src/logger.ts"),
      "@agentplaneorg/core/process": path.join(__dirname, "packages/core/src/process/index.ts"),
      "@agentplaneorg/core/schemas": path.join(__dirname, "packages/core/src/schemas/index.ts"),
      "@agentplaneorg/core/tasks": path.join(__dirname, "packages/core/src/tasks/index.ts"),
      "@agentplaneorg/core": path.join(__dirname, "packages/core/src/index.ts"),
    },
  },
  test: {
    include: ["packages/**/src/**/*.test.ts"],
    environment: "node",
    // Many integration-style tests interact with git and the filesystem. Coverage adds
    // non-trivial overhead, so keep a higher default timeout to avoid CI flakiness.
    testTimeout: 30_000,
    hookTimeout: 30_000,
    coverage: {
      provider: "v8",
      include: ["packages/**/src/**/*.ts"],
      exclude: [
        "**/*.test.ts",
        // Thin command entrypoints are exercised indirectly via spec/run handlers and
        // are not meaningful to include in coverage thresholds.
        "**/*.command.ts",
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
