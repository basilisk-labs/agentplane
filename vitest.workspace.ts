import { configDefaults, defineConfig, type UserWorkspaceConfig } from "vitest/config";

import baseConfig from "./vitest.config";

function project(
  name: string,
  test: NonNullable<UserWorkspaceConfig["test"]>,
): UserWorkspaceConfig {
  const { test: baseTest, ...baseProjectConfig } = baseConfig as UserWorkspaceConfig;
  const baseExclude = Array.isArray(baseTest?.exclude) ? baseTest.exclude : [];
  const projectExclude = Array.isArray(test.exclude) ? test.exclude : [];

  return {
    ...baseProjectConfig,
    test: {
      ...baseTest,
      ...test,
      exclude: [...configDefaults.exclude, ...baseExclude, ...projectExclude],
      name,
    },
  };
}

export default defineConfig({
  test: {
    projects: [
      project("agentplane", {
        include: ["packages/agentplane/src/**/*.test.ts"],
        exclude: ["**/cli-smoke.test.ts", "**/run-cli*.test.ts"],
      }),
      project("core", {
        include: ["packages/core/src/**/*.test.ts"],
      }),
      project("recipes", {
        include: ["packages/recipes/src/**/*.test.ts"],
      }),
      project("testkit", {
        include: ["packages/testkit/src/**/*.test.ts"],
      }),
      project("cli-core", {
        include: [
          "packages/agentplane/src/cli/run-cli.core*.test.ts",
          "packages/agentplane/src/cli/run-cli.test-helpers.test.ts",
        ],
        hookTimeout: 60_000,
        testTimeout: 60_000,
      }),
      project("cli-recipes", {
        include: ["packages/agentplane/src/cli/run-cli.recipes*.test.ts"],
        hookTimeout: 60_000,
        testTimeout: 60_000,
      }),
      project("cli-scenario", {
        include: ["packages/agentplane/src/cli/run-cli.scenario.test.ts"],
        hookTimeout: 60_000,
        testTimeout: 60_000,
      }),
      project("cli-smoke", {
        include: ["packages/agentplane/src/cli/cli-smoke.test.ts"],
        hookTimeout: 120_000,
        testTimeout: 120_000,
      }),
      project("critical", {
        include: ["packages/agentplane/src/cli/run-cli.critical.*.test.ts"],
        hookTimeout: 60_000,
        testTimeout: 60_000,
      }),
      project("guard", {
        include: [
          "packages/agentplane/src/commands/guard/index.test.ts",
          "packages/agentplane/src/commands/guard/impl/allow.test.ts",
          "packages/agentplane/src/commands/guard/impl/comment-commit.test.ts",
          "packages/agentplane/src/commands/guard/impl/commands.unit.test.ts",
          "packages/agentplane/src/commands/guard/impl/policy.test.ts",
          "packages/agentplane/src/commands/guard/impl/close-message.test.ts",
        ],
      }),
    ],
  },
});
