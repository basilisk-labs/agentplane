import { readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const TEST_INVENTORY_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);

export const PRIMARY_TEST_ROUTES = [
  "agentplane",
  "cli-core",
  "cli-recipes",
  "cli-scenario",
  "cli-smoke",
  "core",
  "critical",
  "guard",
  "recipes",
  "testkit",
];

export const AGGREGATE_TEST_ROUTES = [
  "backend-critical",
  "platform-critical",
  "precommit",
  "release-ci-base",
  "release-critical",
  "significant-coverage",
  "workflow-coverage",
];

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
      "packages/agentplane/src/commands/guard/impl/commands.unit.test.ts",
      "packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.test.ts",
    ],
  },
  {
    source: "packages/agentplane/src/commands/guard/impl/comment-commit.ts",
    tests: [
      "packages/agentplane/src/commands/guard/impl/comment-commit.test.ts",
      "packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.test.ts",
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
    tests: ["packages/agentplane/src/commands/guard/impl/commands.unit.test.ts"],
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

const GUARD_WORKSPACE_FILES = new Set([
  "packages/agentplane/src/commands/guard/index.test.ts",
  "packages/agentplane/src/commands/guard/impl/allow.test.ts",
  "packages/agentplane/src/commands/guard/impl/comment-commit.test.ts",
  "packages/agentplane/src/commands/guard/impl/commands.unit.test.ts",
  "packages/agentplane/src/commands/guard/impl/policy.test.ts",
  "packages/agentplane/src/commands/guard/impl/close-message.test.ts",
]);

const PRIMARY_ROUTE_RULES = [
  {
    name: "core",
    matches: (filePath) => /^packages\/core\/src\/.+\.test\.ts$/.test(filePath),
  },
  {
    name: "recipes",
    matches: (filePath) => /^packages\/recipes\/src\/.+\.test\.ts$/.test(filePath),
  },
  {
    name: "testkit",
    matches: (filePath) => /^packages\/testkit\/src\/.+\.test\.ts$/.test(filePath),
  },
  {
    name: "cli-core",
    matches: (filePath) =>
      /^packages\/agentplane\/src\/cli\/run-cli\.core(?:\..+)?\.test\.ts$/.test(filePath) ||
      filePath === "packages/agentplane/src/cli/run-cli.test-helpers.test.ts",
  },
  {
    name: "cli-recipes",
    matches: (filePath) =>
      /^packages\/agentplane\/src\/cli\/run-cli\.recipes(?:\..+)?\.test\.ts$/.test(filePath),
  },
  {
    name: "cli-scenario",
    matches: (filePath) => filePath === "packages/agentplane/src/cli/run-cli.scenario.test.ts",
  },
  {
    name: "cli-smoke",
    matches: (filePath) => filePath === "packages/agentplane/src/cli/cli-smoke.test.ts",
  },
  {
    name: "critical",
    matches: (filePath) =>
      /^packages\/agentplane\/src\/cli\/run-cli\.critical\..+\.test\.ts$/.test(filePath),
  },
  {
    name: "guard",
    matches: (filePath) => GUARD_WORKSPACE_FILES.has(filePath),
  },
  {
    name: "agentplane",
    matches: (filePath) =>
      /^packages\/agentplane\/src\/.+\.test\.ts$/.test(filePath) &&
      !/\/cli-smoke\.test\.ts$/.test(filePath) &&
      !/\/run-cli[^/]*\.test\.ts$/.test(filePath) &&
      !GUARD_WORKSPACE_FILES.has(filePath),
  },
];

export function normalizeRepoPath(value) {
  return String(value).split(path.sep).join("/");
}

export function listRepoFiles(relativeDir, options = {}) {
  const repoRoot = options.repoRoot ?? TEST_INVENTORY_ROOT;
  const root = path.join(repoRoot, relativeDir);
  const files = [];
  const pending = [root];

  while (pending.length > 0) {
    const current = pending.pop();
    if (!current) continue;
    for (const entry of readdirSync(current, { withFileTypes: true })) {
      const absolute = path.join(current, entry.name);
      if (entry.isDirectory()) {
        pending.push(absolute);
        continue;
      }
      if (!entry.isFile()) continue;
      files.push(normalizeRepoPath(path.relative(repoRoot, absolute)));
    }
  }

  return files.toSorted((a, b) => a.localeCompare(b));
}

export function discoverPackageTestFiles(options = {}) {
  return listRepoFiles("packages", options).filter(
    (filePath) => filePath.includes("/src/") && filePath.endsWith(".test.ts"),
  );
}

export function classifyPrimaryTestRoutes(filePath) {
  const normalized = normalizeRepoPath(filePath);
  return PRIMARY_ROUTE_RULES.filter((route) => route.matches(normalized)).map(
    (route) => route.name,
  );
}

export function buildTestInventory(options = {}) {
  return discoverPackageTestFiles(options).map((filePath) => ({
    filePath,
    primaryRoutes: classifyPrimaryTestRoutes(filePath),
    aggregateRoutes: [],
  }));
}

export function summarizeTestInventory(entries) {
  const summary = new Map();
  for (const route of PRIMARY_TEST_ROUTES) {
    summary.set(route, 0);
  }

  for (const entry of entries) {
    for (const route of entry.primaryRoutes) {
      summary.set(route, (summary.get(route) ?? 0) + 1);
    }
  }

  return Object.fromEntries([...summary.entries()].toSorted(([a], [b]) => a.localeCompare(b)));
}
