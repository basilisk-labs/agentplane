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
      project("fast", {
        include: ["packages/**/src/**/*.test.ts"],
        exclude: ["**/cli-smoke.test.ts", "**/run-cli*.test.ts"],
      }),
      project("precommit", {
        include: [
          "packages/agentplane/src/commands/shared/network-approval.test.ts",
          "packages/agentplane/src/commands/shared/approval-requirements.test.ts",
          "packages/agentplane/src/commands/task/shared.unit.test.ts",
          "packages/agentplane/src/commands/task/shared.verify-steps.test.ts",
          "packages/agentplane/src/commands/task/warn-owner.unit.test.ts",
          "packages/agentplane/src/shared/comment-format.test.ts",
          "packages/agentplane/src/shared/errors.test.ts",
          "packages/agentplane/src/shared/agent-emoji.unit.test.ts",
          "packages/agentplane/src/cli/spec/parse.test.ts",
          "packages/agentplane/src/cli/spec/help-render.test.ts",
          "packages/agentplane/src/cli/spec/registry.test.ts",
          "packages/agentplane/src/cli/spec/suggest.test.ts",
          "packages/agentplane/src/cli/output.test.ts",
          "packages/agentplane/src/cli/prompts.test.ts",
          "packages/agentplane/src/cli/error-map.test.ts",
          "packages/agentplane/src/backends/task-backend/redmine/env.test.ts",
          "packages/core/src/config/execution-profile.test.ts",
          "packages/core/src/config/config.test.ts",
        ],
      }),
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
      project("cli", {
        include: [
          "packages/agentplane/src/cli/run-cli.core*.test.ts",
          "packages/agentplane/src/cli/run-cli.recipes*.test.ts",
          "packages/agentplane/src/cli/run-cli.scenario.test.ts",
        ],
        hookTimeout: 60_000,
        testTimeout: 60_000,
      }),
      project("cli-core", {
        include: ["packages/agentplane/src/cli/run-cli.core*.test.ts"],
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
      project("cli-unit", {
        include: [
          "packages/agentplane/src/cli/run-cli.core*.test.ts",
          "packages/agentplane/src/cli/run-cli.recipes*.test.ts",
        ],
        hookTimeout: 60_000,
        testTimeout: 60_000,
      }),
      project("cli-smoke", {
        include: ["packages/agentplane/src/cli/cli-smoke.test.ts"],
        hookTimeout: 60_000,
        testTimeout: 60_000,
      }),
      project("cli-slow", {
        include: [
          "packages/agentplane/src/cli/run-cli.scenario.test.ts",
          "packages/agentplane/src/cli/cli-smoke.test.ts",
        ],
        hookTimeout: 60_000,
        testTimeout: 60_000,
      }),
      project("critical", {
        include: ["packages/agentplane/src/cli/run-cli.critical.*.test.ts"],
        hookTimeout: 60_000,
        testTimeout: 60_000,
      }),
      project("platform-critical", {
        include: [
          "packages/agentplane/src/commands/shared/pr-meta.test.ts",
          "packages/agentplane/src/commands/scenario/impl/commands.test.ts",
          "packages/agentplane/src/cli/run-cli.core.init*.test.ts",
          "packages/agentplane/src/cli/run-cli.core.upgrade.test.ts",
        ],
        hookTimeout: 60_000,
        testTimeout: 60_000,
      }),
      project("backend-critical", {
        include: [
          "packages/agentplane/src/backends/task-backend.test.ts",
          "packages/agentplane/src/backends/task-backend.local.test.ts",
          "packages/agentplane/src/backends/task-backend.redmine.cache.test.ts",
          "packages/agentplane/src/backends/task-backend.redmine.docs.test.ts",
          "packages/agentplane/src/backends/task-backend.redmine.mapping.test.ts",
          "packages/agentplane/src/backends/task-backend.redmine.remote.test.ts",
          "packages/agentplane/src/backends/task-backend.redmine.write.test.ts",
          "packages/agentplane/src/backends/task-backend.load.test.ts",
          "packages/agentplane/src/backends/task-backend/redmine/env.test.ts",
          "packages/agentplane/src/commands/backend.test.ts",
          "packages/agentplane/src/commands/shared/task-backend.test.ts",
          "packages/agentplane/src/commands/task/export.unit.test.ts",
          "packages/agentplane/src/commands/task/migrate-doc.test.ts",
          "packages/agentplane/src/commands/doctor.fast.test.ts",
          "packages/agentplane/src/cli/run-cli.core.backend-sync.test.ts",
          "packages/agentplane/src/cli/run-cli.core.tasks.create.test.ts",
          "packages/agentplane/src/cli/run-cli.core.tasks.incidents.test.ts",
          "packages/agentplane/src/cli/run-cli.core.tasks.lifecycle.test.ts",
          "packages/agentplane/src/cli/run-cli.core.tasks.update-scrub.test.ts",
        ],
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
      project("release-ci-base", {
        include: ["packages/**/src/**/*.test.ts"],
        exclude: [
          "**/cli-smoke.test.ts",
          "**/release-recovery-script.test.ts",
          "**/run-cli.core.init*.test.ts",
          "**/run-cli.core.upgrade.test.ts",
          "**/run-cli.core.backend-sync.test.ts",
        ],
      }),
      project("release-critical", {
        include: [
          "packages/agentplane/src/cli/release-recovery-script.test.ts",
          "packages/agentplane/src/cli/release-smoke.test.ts",
          "packages/agentplane/src/cli/cli-smoke.test.ts",
        ],
        hookTimeout: 120_000,
        testTimeout: 120_000,
      }),
      project("release-recovery", {
        include: ["packages/agentplane/src/cli/release-recovery-script.test.ts"],
        hookTimeout: 60_000,
        testTimeout: 60_000,
      }),
      project("release-smoke", {
        include: ["packages/agentplane/src/cli/release-smoke.test.ts"],
        hookTimeout: 120_000,
        testTimeout: 120_000,
      }),
      project("workflow-coverage", {
        include: [
          "packages/agentplane/src/workflow-runtime/*.test.ts",
          "packages/agentplane/src/harness/*.test.ts",
        ],
      }),
      project("significant-coverage", {
        include: [
          "packages/agentplane/src/commands/guard/impl/allow.test.ts",
          "packages/agentplane/src/commands/guard/impl/close-message.test.ts",
          "packages/agentplane/src/commands/guard/impl/commands.unit.test.ts",
          "packages/agentplane/src/commands/guard/impl/policy.test.ts",
          "packages/agentplane/src/commands/guard/impl/comment-commit.test.ts",
          "packages/agentplane/src/cli/run-cli.core.guard.test.ts",
          "packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.test.ts",
        ],
      }),
    ],
  },
});
