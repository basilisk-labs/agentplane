import { defineConfig } from "vitest/config";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: [
      {
        find: /^@agentplane\/testkit\/cli-core-lifecycle$/,
        replacement: path.join(__dirname, "packages/testkit/src/cli-core-lifecycle.ts"),
      },
      {
        find: /^@agentplane\/testkit\/cli-core-pr-flow$/,
        replacement: path.join(__dirname, "packages/testkit/src/cli-core-pr-flow.ts"),
      },
      {
        find: /^@agentplane\/testkit\/cli-core-tasks-query$/,
        replacement: path.join(__dirname, "packages/testkit/src/cli-core-tasks-query.ts"),
      },
      {
        find: /^@agentplane\/testkit\/cli$/,
        replacement: path.join(__dirname, "packages/testkit/src/cli.ts"),
      },
      {
        find: /^@agentplane\/testkit\/recipes$/,
        replacement: path.join(__dirname, "packages/testkit/src/recipes.ts"),
      },
      {
        find: /^@agentplane\/testkit\/release$/,
        replacement: path.join(__dirname, "packages/testkit/src/release.ts"),
      },
      {
        find: /^@agentplane\/testkit\/runner$/,
        replacement: path.join(__dirname, "packages/testkit/src/runner.ts"),
      },
      {
        find: /^@agentplane\/testkit\/task$/,
        replacement: path.join(__dirname, "packages/testkit/src/task.ts"),
      },
      {
        find: /^@agentplane\/testkit$/,
        replacement: path.join(__dirname, "packages/testkit/src/index.ts"),
      },
      {
        find: "agentplane/internal/testing",
        replacement: path.join(__dirname, "packages/agentplane/src/testing/index.ts"),
      },
      // In-repo tests should run against source, not stale built artifacts.
      {
        find: "@agentplaneorg/core/commit",
        replacement: path.join(__dirname, "packages/core/src/commit/index.ts"),
      },
      {
        find: "@agentplaneorg/core/config",
        replacement: path.join(__dirname, "packages/core/src/config/index.ts"),
      },
      {
        find: "@agentplaneorg/core/fs",
        replacement: path.join(__dirname, "packages/core/src/fs/index.ts"),
      },
      {
        find: "@agentplaneorg/core/git",
        replacement: path.join(__dirname, "packages/core/src/git/index.ts"),
      },
      {
        find: "@agentplaneorg/core/logger",
        replacement: path.join(__dirname, "packages/core/src/logger.ts"),
      },
      {
        find: "@agentplaneorg/core/process",
        replacement: path.join(__dirname, "packages/core/src/process/index.ts"),
      },
      {
        find: "@agentplaneorg/core/project",
        replacement: path.join(__dirname, "packages/core/src/project/index.ts"),
      },
      {
        find: "@agentplaneorg/core/schemas",
        replacement: path.join(__dirname, "packages/core/src/schemas/index.ts"),
      },
      {
        find: "@agentplaneorg/core/tasks",
        replacement: path.join(__dirname, "packages/core/src/tasks/index.ts"),
      },
      {
        find: "@agentplaneorg/core",
        replacement: path.join(__dirname, "packages/core/src/index.ts"),
      },
    ],
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
