export {
  AGGREGATE_TEST_ROUTES,
  PRIMARY_TEST_ROUTES,
  TEST_ROUTE_REGISTRY_ROOT as TEST_INVENTORY_ROOT,
  buildTestInventory,
  classifyPrimaryTestRoutes,
  discoverPackageTestFiles,
  listRepoFiles,
  normalizeRepoPath,
  summarizeTestInventory,
} from "./test-route-registry.mjs";

export const SIGNIFICANT_COVERAGE_TARGETS = [
  {
    source: "packages/agentplane/src/cli/run-cli/commands/init/orchestrate.ts",
    tests: [
      "packages/agentplane/src/cli/run-cli.core.init.test.ts",
      "packages/agentplane/src/cli/run-cli.core.init.branch-pr.test.ts",
      "packages/agentplane/src/cli/run-cli.core.init.validation-conflicts.test.ts",
    ],
  },
  {
    source: "packages/agentplane/src/cli/run-cli/commands/init/parsers.ts",
    tests: [
      "packages/agentplane/src/cli/run-cli.core.init.test.ts",
      "packages/agentplane/src/cli/run-cli.core.init.branch-pr.test.ts",
      "packages/agentplane/src/cli/run-cli.core.init.validation-conflicts.test.ts",
    ],
  },
  {
    source: "packages/agentplane/src/cli/run-cli/commands/init/presets.ts",
    tests: [
      "packages/agentplane/src/cli/run-cli.core.init.test.ts",
      "packages/agentplane/src/cli/run-cli.core.init.branch-pr.test.ts",
      "packages/agentplane/src/cli/run-cli.core.init.validation-conflicts.test.ts",
    ],
  },
  {
    source: "packages/agentplane/src/commands/task/finish-command.ts",
    tests: [
      "packages/agentplane/src/commands/task/finish.close-tail.unit.test.ts",
      "packages/agentplane/src/commands/task/finish.state.unit.test.ts",
      "packages/agentplane/src/commands/task/finish.validation.unit.test.ts",
      "packages/agentplane/src/cli/run-cli.core.lifecycle.block-finish.test.ts",
      "packages/agentplane/src/cli/run-cli.core.lifecycle.finish-branch-pr.test.ts",
      "packages/agentplane/src/cli/run-cli.core.lifecycle.finish-close-commit.test.ts",
      "packages/agentplane/src/cli/run-cli.core.lifecycle.finish-validation.test.ts",
    ],
  },
  {
    source: "packages/agentplane/src/commands/task/finish-execute.ts",
    tests: [
      "packages/agentplane/src/commands/task/finish.close-tail.unit.test.ts",
      "packages/agentplane/src/commands/task/finish.state.unit.test.ts",
      "packages/agentplane/src/commands/task/finish.validation.unit.test.ts",
    ],
  },
  {
    source: "packages/agentplane/src/commands/task/finish-plan.ts",
    tests: [
      "packages/agentplane/src/commands/task/finish.close-tail.unit.test.ts",
      "packages/agentplane/src/commands/task/finish.state.unit.test.ts",
      "packages/agentplane/src/commands/task/finish.validation.unit.test.ts",
    ],
  },
  {
    source: "packages/agentplane/src/commands/task/hosted-merge-sync.ts",
    tests: ["packages/agentplane/src/commands/task/hosted-merge-sync.test.ts"],
  },
  {
    source: "packages/agentplane/src/commands/task/hosted-merge-sync/builders.ts",
    tests: ["packages/agentplane/src/commands/task/hosted-merge-sync.test.ts"],
  },
  {
    source: "packages/agentplane/src/commands/task/hosted-merge-sync/github.ts",
    tests: ["packages/agentplane/src/commands/task/hosted-merge-sync.test.ts"],
  },
  {
    source: "packages/agentplane/src/commands/task/hosted-merge-sync/local-branch.ts",
    tests: ["packages/agentplane/src/commands/task/hosted-merge-sync.test.ts"],
  },
  {
    source: "packages/agentplane/src/commands/task/hosted-merge-sync/pr-meta.ts",
    tests: ["packages/agentplane/src/commands/task/hosted-merge-sync.test.ts"],
  },
  {
    source: "packages/agentplane/src/commands/guard/impl/allow.ts",
    tests: ["packages/agentplane/src/commands/guard/impl/allow.test.ts"],
  },
  {
    source: "packages/agentplane/src/commands/guard/impl/commit.ts",
    tests: [
      "packages/agentplane/src/commands/guard/impl/commands.commit-close.unit.test.ts",
      "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts",
      "packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.close.test.ts",
      "packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.env.test.ts",
      "packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.policy.test.ts",
      "packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.refresh.test.ts",
    ],
  },
  {
    source: "packages/agentplane/src/commands/guard/impl/comment-commit.ts",
    tests: [
      "packages/agentplane/src/commands/guard/impl/comment-commit.test.ts",
      "packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.close.test.ts",
      "packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.env.test.ts",
    ],
  },
  {
    source: "packages/agentplane/src/commands/guard/impl/env.ts",
    tests: ["packages/agentplane/src/commands/guard/impl/env.test.ts"],
  },
  {
    source: "packages/agentplane/src/commands/guard/impl/policy.ts",
    tests: ["packages/agentplane/src/commands/guard/impl/policy.test.ts"],
  },
  {
    source: "packages/agentplane/src/commands/guard/impl/suggest.ts",
    tests: ["packages/agentplane/src/commands/guard/impl/commands.guard.unit.test.ts"],
  },
];

export const WORKFLOW_HARNESS_TARGETS = [
  {
    source: "packages/agentplane/src/workflow-runtime/validate.ts",
    tests: ["packages/agentplane/src/workflow-runtime/validate.test.ts"],
  },
  {
    source: "packages/agentplane/src/workflow-runtime/file-ops.ts",
    tests: ["packages/agentplane/src/workflow-runtime/file-ops.test.ts"],
  },
  {
    source: "packages/agentplane/src/harness/state-machine.ts",
    tests: ["packages/agentplane/src/harness/state-machine.test.ts"],
  },
  {
    source: "packages/agentplane/src/harness/retry-policy.ts",
    tests: ["packages/agentplane/src/harness/retry-policy.test.ts"],
  },
  {
    source: "packages/agentplane/src/harness/scheduler.ts",
    tests: ["packages/agentplane/src/harness/scheduler.test.ts"],
  },
];
