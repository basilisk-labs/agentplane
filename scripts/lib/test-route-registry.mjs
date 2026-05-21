import { readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const TEST_ROUTE_REGISTRY_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);

export const VITEST_WORKSPACE_PROJECTS = [
  {
    name: "agentplane",
    test: {
      include: ["packages/agentplane/src/**/*.test.ts"],
      exclude: ["**/cli-smoke.test.ts", "**/run-cli*.test.ts"],
    },
  },
  {
    name: "core",
    test: {
      include: ["packages/core/src/**/*.test.ts"],
    },
  },
  {
    name: "recipes",
    test: {
      include: ["packages/recipes/src/**/*.test.ts"],
    },
  },
  {
    name: "testkit",
    test: {
      include: ["packages/testkit/src/**/*.test.ts"],
    },
  },
  {
    name: "cli-core",
    test: {
      include: [
        "packages/agentplane/src/cli/run-cli.core*.test.ts",
        "packages/agentplane/src/cli/run-cli.test-helpers.test.ts",
      ],
      hookTimeout: 60_000,
      testTimeout: 60_000,
    },
  },
  {
    name: "cli-recipes",
    test: {
      include: ["packages/agentplane/src/cli/run-cli.recipes*.test.ts"],
      hookTimeout: 60_000,
      testTimeout: 60_000,
    },
  },
  {
    name: "cli-scenario",
    test: {
      include: ["packages/agentplane/src/cli/run-cli.scenario.test.ts"],
      hookTimeout: 60_000,
      testTimeout: 60_000,
    },
  },
  {
    name: "cli-smoke",
    test: {
      include: ["packages/agentplane/src/cli/cli-smoke.test.ts"],
      hookTimeout: 120_000,
      testTimeout: 120_000,
    },
  },
  {
    name: "critical",
    test: {
      include: ["packages/agentplane/src/cli/run-cli.critical.*.test.ts"],
      hookTimeout: 60_000,
      testTimeout: 60_000,
    },
  },
  {
    name: "guard",
    test: {
      include: [
        "packages/agentplane/src/commands/guard/index.test.ts",
        "packages/agentplane/src/commands/guard/impl/allow.test.ts",
        "packages/agentplane/src/commands/guard/impl/comment-commit.test.ts",
        "packages/agentplane/src/commands/guard/impl/commands.commit-close.unit.test.ts",
        "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts",
        "packages/agentplane/src/commands/guard/impl/commands.guard.unit.test.ts",
        "packages/agentplane/src/commands/guard/impl/policy.test.ts",
        "packages/agentplane/src/commands/guard/impl/close-message.test.ts",
      ],
    },
  },
];

export const PRIMARY_TEST_ROUTES = VITEST_WORKSPACE_PROJECTS.map((route) => route.name);

const GUARD_WORKSPACE_ROUTE = VITEST_WORKSPACE_PROJECTS.find((route) => route.name === "guard");
if (!GUARD_WORKSPACE_ROUTE) {
  throw new Error("test route registry must define the guard workspace route");
}
const GUARD_WORKSPACE_FILES = new Set(GUARD_WORKSPACE_ROUTE.test.include);

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

function cloneTestConfig(test) {
  return {
    ...test,
    include: test.include ? [...test.include] : undefined,
    exclude: test.exclude ? [...test.exclude] : undefined,
  };
}

export function getVitestWorkspaceProjects() {
  return VITEST_WORKSPACE_PROJECTS.map((route) => ({
    name: route.name,
    test: cloneTestConfig(route.test),
  }));
}

export function getPrimaryTestRouteRules() {
  return PRIMARY_ROUTE_RULES.map((route) => ({ ...route }));
}

export function normalizeRepoPath(value) {
  return String(value).split(path.sep).join("/");
}

export function listRepoFiles(relativeDir, options = {}) {
  const repoRoot = options.repoRoot ?? TEST_ROUTE_REGISTRY_ROOT;
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

export function discoverTests(relativeDirs, predicate, options = {}) {
  const files = new Set();
  for (const relativeDir of relativeDirs) {
    for (const filePath of listRepoFiles(relativeDir, options)) {
      if (predicate(filePath)) files.add(filePath);
    }
  }
  return [...files].toSorted((a, b) => a.localeCompare(b));
}

export function discoverTestFiles(relativeDirs, patterns, options = {}) {
  return discoverTests(
    relativeDirs,
    (filePath) => patterns.some((pattern) => pattern.test(filePath)),
    options,
  );
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

const PRECOMMIT_FILES = [
  "packages/agentplane/src/commands/shared/network-approval.test.ts",
  "packages/agentplane/src/commands/shared/approval-requirements.test.ts",
  "packages/agentplane/src/commands/task/shared.unit.test.ts",
  "packages/agentplane/src/commands/task/shared.verify-steps.test.ts",
  "packages/agentplane/src/commands/task/warn-owner.unit.test.ts",
  "packages/agentplane/src/commands/shared/comment-format.test.ts",
  "packages/agentplane/src/shared/errors.test.ts",
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
];

const PLATFORM_CRITICAL_FILES = [
  "packages/agentplane/src/commands/shared/pr-meta.test.ts",
  "packages/agentplane/src/commands/scenario/impl/commands.test.ts",
  "packages/agentplane/src/cli/run-cli.core.init.test.ts",
  "packages/agentplane/src/cli/run-cli.core.init.branch-pr.test.ts",
  "packages/agentplane/src/cli/run-cli.core.init.validation-conflicts.test.ts",
  "packages/agentplane/src/cli/run-cli.core.upgrade.test.ts",
];

const BACKEND_CRITICAL_FILES = [
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
  "packages/agentplane/src/commands/task/migrate-doc.test.ts",
  "packages/agentplane/src/commands/doctor.fast.test.ts",
  "packages/agentplane/src/cli/run-cli.core.backend-sync.test.ts",
  "packages/agentplane/src/cli/run-cli.core.tasks.create.test.ts",
  "packages/agentplane/src/cli/run-cli.core.tasks.incidents.test.ts",
  "packages/agentplane/src/cli/run-cli.core.tasks.lifecycle.test.ts",
  "packages/agentplane/src/cli/run-cli.core.tasks.update-scrub.test.ts",
];

const RELEASE_CRITICAL_FILES = [
  "packages/agentplane/src/cli/release-critical-lifecycle.test.ts",
  "packages/agentplane/src/cli/release-recovery-script.test.ts",
  "packages/agentplane/src/cli/release-smoke.test.ts",
  "packages/agentplane/src/cli/cli-smoke.test.ts",
];

const SIGNIFICANT_COVERAGE_FILES = [
  "packages/agentplane/src/commands/guard/impl/allow.test.ts",
  "packages/agentplane/src/commands/guard/impl/close-message.test.ts",
  "packages/agentplane/src/commands/guard/impl/commands.commit-close.unit.test.ts",
  "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts",
  "packages/agentplane/src/commands/guard/impl/commands.guard.unit.test.ts",
  "packages/agentplane/src/commands/guard/impl/policy.test.ts",
  "packages/agentplane/src/commands/guard/impl/comment-commit.test.ts",
  "packages/agentplane/src/cli/run-cli.core.guard.test.ts",
  "packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.close.test.ts",
  "packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.env.test.ts",
  "packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.policy.test.ts",
  "packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.refresh.test.ts",
];

const WORKFLOW_COVERAGE_FILES = discoverTests(
  ["packages/agentplane/src/workflow-runtime", "packages/agentplane/src/harness"],
  (filePath) => filePath.endsWith(".test.ts"),
);

const RELEASE_CI_BASE_FILES = discoverTests(["packages"], (filePath) => {
  if (!filePath.endsWith(".test.ts")) return false;
  if (!filePath.includes("/src/")) return false;
  return ![
    /\/cli-smoke\.test\.ts$/,
    /\/release-recovery-script\.test\.ts$/,
    /\/run-cli\.core\.init(?:\..+)?\.test\.ts$/,
    /\/run-cli\.core\.upgrade\.test\.ts$/,
    /\/run-cli\.core\.backend-sync\.test\.ts$/,
  ].some((pattern) => pattern.test(filePath));
});

const CRITICAL_CLI_SUITE = {
  chunkSize: 1,
  config: "vitest.config.ts",
  files: discoverTestFiles(
    ["packages/agentplane/src/cli"],
    [/^packages\/agentplane\/src\/cli\/run-cli\.critical\..+\.test\.ts$/],
  ),
  maxWorkers: "4",
  pool: "forks",
  testTimeout: "120000",
  hookTimeout: "120000",
};

export const VITEST_SUITES = {
  "backend-critical": {
    files: BACKEND_CRITICAL_FILES,
    maxWorkers: "4",
    pool: "forks",
  },
  "critical-cli": CRITICAL_CLI_SUITE,
  "platform-critical": {
    files: PLATFORM_CRITICAL_FILES,
    maxWorkers: "4",
    pool: "forks",
  },
  precommit: {
    files: PRECOMMIT_FILES,
    maxWorkers: "4",
    pool: "threads",
  },
  "release-ci-base": {
    chunkSize: 10,
    files: RELEASE_CI_BASE_FILES,
    isolatedPatterns: [/\/run-cli\.core\.pr-flow\./],
    maxWorkers: "4",
    pool: "forks",
  },
  "release-critical": {
    files: RELEASE_CRITICAL_FILES,
    maxWorkers: "4",
    pool: "forks",
    testTimeout: "120000",
    hookTimeout: "120000",
  },
  "significant-coverage": {
    files: SIGNIFICANT_COVERAGE_FILES,
    maxWorkers: "4",
    pool: "threads",
  },
  "workflow-coverage": {
    files: WORKFLOW_COVERAGE_FILES,
    maxWorkers: "4",
    pool: "threads",
  },
};

export const AGGREGATE_TEST_ROUTES = Object.keys(VITEST_SUITES).toSorted((a, b) =>
  a.localeCompare(b),
);

export const LEGACY_AGGREGATE_TEST_ROUTES = [
  "cli",
  "cli-slow",
  "cli-unit",
  "fast",
  "release-recovery",
  "release-smoke",
];

export const DISALLOWED_WORKSPACE_TEST_ROUTES = [
  ...AGGREGATE_TEST_ROUTES,
  ...LEGACY_AGGREGATE_TEST_ROUTES,
].toSorted((a, b) => a.localeCompare(b));

export function getVitestSuites() {
  return VITEST_SUITES;
}

export function listVitestSuiteFiles() {
  return Object.fromEntries(
    Object.entries(VITEST_SUITES)
      .map(([suiteName, suite]) => [
        suiteName,
        [...suite.files].toSorted((a, b) => a.localeCompare(b)),
      ])
      .toSorted(([a], [b]) => a.localeCompare(b)),
  );
}

const TASK_TEST_FILES = [
  "packages/agentplane/src/commands/task/shared.unit.test.ts",
  "packages/agentplane/src/commands/task/shared.verify-steps.test.ts",
  "packages/agentplane/src/commands/task/warn-owner.unit.test.ts",
  "packages/agentplane/src/commands/task/finish.close-tail.unit.test.ts",
  "packages/agentplane/src/commands/task/finish.state.unit.test.ts",
  "packages/agentplane/src/commands/task/finish.validation.unit.test.ts",
  "packages/agentplane/src/commands/task/verify-record.unit.test.ts",
  "packages/agentplane/src/commands/task/plan.unit.test.ts",
];

const DOCTOR_TEST_FILES = ["packages/agentplane/src/commands/doctor.fast.test.ts"];

const HOOKS_TEST_FILES = [
  "packages/agentplane/src/cli/local-ci-selection.test.ts",
  "packages/agentplane/src/cli/run-cli.core.hooks.hook-run.test.ts",
  "packages/agentplane/src/cli/run-cli.core.hooks.install.test.ts",
  "packages/agentplane/src/cli/run-cli.core.hooks.runtime-shim.test.ts",
  "packages/agentplane/src/cli/run-cli.core.hooks.uninstall.test.ts",
  "packages/agentplane/src/cli/pre-commit-staged-files.test.ts",
  "packages/agentplane/src/cli/pre-commit-test-fast-script.test.ts",
];

const CLI_HELP_DISCOVERY_PATTERNS = [
  /^packages\/agentplane\/src\/cli\/run-cli\.core\.(?:docs-cli|help-contract|help-snap)\.test\.ts$/,
];

const CLI_CORE_DISCOVERY_PATTERNS = [
  /^packages\/agentplane\/src\/cli\/run-cli\.core\.test\.ts$/,
  /^packages\/agentplane\/src\/cli\/run-cli\.core\.(?:boot|branch-meta(?:\..+)?|misc|pr-flow(?:\..+)?)\.test\.ts$/,
  /^packages\/agentplane\/src\/cli\/run-cli\.core\.lifecycle(?:\..+)?\.test\.ts$/,
  /^packages\/agentplane\/src\/cli\/run-cli\.core\.tasks(?:\..+)?\.test\.ts$/,
];

const PR_FLOW_DISCOVERY_PATTERNS = [
  /^packages\/agentplane\/src\/cli\/run-cli\.core\.pr-flow(?:\..+)?\.test\.ts$/,
];

const GUARD_DISCOVERY_PATTERNS = [
  /^packages\/agentplane\/src\/commands\/guard\/.+\.test\.ts$/,
  /^packages\/agentplane\/src\/cli\/run-cli\.core\.guard(?:\..+)?\.test\.ts$/,
];

const CLI_HELP_TEST_FILES = [
  "packages/agentplane/src/cli/command-guide.test.ts",
  "packages/agentplane/src/cli/cli-contract.test.ts",
  "packages/agentplane/src/cli/help.all-commands.contract.test.ts",
  "packages/agentplane/src/cli/output.test.ts",
  "packages/agentplane/src/cli/error-map.test.ts",
  "packages/agentplane/src/cli/prompts.test.ts",
  "packages/agentplane/src/cli/spec/parse.test.ts",
  "packages/agentplane/src/cli/spec/help-render.test.ts",
  "packages/agentplane/src/cli/spec/registry.test.ts",
  "packages/agentplane/src/cli/spec/suggest.test.ts",
  "packages/agentplane/src/shared/ansi.test.ts",
  ...discoverTestFiles(["packages/agentplane/src/cli"], CLI_HELP_DISCOVERY_PATTERNS),
];

const CLI_CORE_TEST_FILES = [
  ...discoverTestFiles(["packages/agentplane/src/cli"], CLI_CORE_DISCOVERY_PATTERNS),
  "packages/agentplane/src/cli/run-cli/commands/core.unit.test.ts",
];

const PR_TEST_FILES = [
  "packages/agentplane/src/commands/pr/input-validation.test.ts",
  ...discoverTestFiles(["packages/agentplane/src/cli"], PR_FLOW_DISCOVERY_PATTERNS),
];

const CLI_RUNTIME_TEST_FILES = [
  "packages/agentplane/src/cli/runtime-context.test.ts",
  "packages/agentplane/src/cli/runtime-watch.test.ts",
  "packages/agentplane/src/cli/dist-guard.test.ts",
  "packages/agentplane/src/cli/stale-dist-policy.test.ts",
  "packages/agentplane/src/cli/stale-dist-readonly.test.ts",
  "packages/agentplane/src/cli/repo-local-handoff.test.ts",
  "packages/agentplane/src/cli/verify-global-install-script.test.ts",
];

const RELEASE_TEST_FILES = [
  "packages/agentplane/src/commands/release/plan.test.ts",
  "packages/agentplane/src/commands/release/release-check-script.test.ts",
  "packages/agentplane/src/commands/release/check-release-parity-script.test.ts",
  "packages/agentplane/src/commands/release/check-release-version-script.test.ts",
  "packages/agentplane/src/commands/release/task-registry-ready-script.test.ts",
  "packages/agentplane/src/commands/release/apply.apply-flow.test.ts",
  "packages/agentplane/src/commands/release/apply.mutation.unit.test.ts",
  "packages/agentplane/src/commands/release/apply.preflight.test.ts",
  "packages/agentplane/src/commands/release/apply.push-recovery.test.ts",
  "packages/agentplane/src/commands/release/apply.version-mutation.test.ts",
  "packages/agentplane/src/cli/release-recovery-script.test.ts",
];

const UPGRADE_TEST_FILES = [
  "packages/agentplane/src/commands/upgrade.agent-mode.test.ts",
  "packages/agentplane/src/commands/upgrade.cleanup.test.ts",
  "packages/agentplane/src/commands/upgrade.json-merge.stability.test.ts",
  "packages/agentplane/src/commands/upgrade.merge.test.ts",
  "packages/agentplane/src/commands/upgrade.release-assets.unit.test.ts",
  "packages/agentplane/src/commands/upgrade.safety.test.ts",
  "packages/agentplane/src/commands/upgrade.spec-parse.test.ts",
  "packages/agentplane/src/commands/upgrade.tarball-url.unit.test.ts",
  "packages/agentplane/src/commands/upgrade.unit.test.ts",
  "packages/agentplane/src/cli/run-cli.core.upgrade.test.ts",
];

const GUARD_TEST_FILES = discoverTestFiles(
  ["packages/agentplane/src/commands/guard", "packages/agentplane/src/cli"],
  GUARD_DISCOVERY_PATTERNS,
);

const CONTEXT_TEST_FILES = [
  "packages/agentplane/src/commands/context/release-readiness.test.ts",
  "packages/agentplane/src/commands/context/sqlite.unit.test.ts",
  "packages/agentplane/src/commands/context/harvest-tasks.test.ts",
  "packages/agentplane/src/blueprints/validate.test.ts",
];

export const LOCAL_CI_TARGET_TEST_FILES = {
  backend: BACKEND_CRITICAL_FILES,
  "cli-core": CLI_CORE_TEST_FILES,
  "cli-help": CLI_HELP_TEST_FILES,
  "cli-runtime": CLI_RUNTIME_TEST_FILES,
  context: CONTEXT_TEST_FILES,
  doctor: DOCTOR_TEST_FILES,
  guard: GUARD_TEST_FILES,
  hooks: HOOKS_TEST_FILES,
  pr: PR_TEST_FILES,
  release: RELEASE_TEST_FILES,
  task: TASK_TEST_FILES,
  upgrade: UPGRADE_TEST_FILES,
  workflow: [],
};

export function listLocalCiTargetTestFiles() {
  return Object.fromEntries(
    Object.entries(LOCAL_CI_TARGET_TEST_FILES)
      .map(([bucket, files]) => [bucket, [...files].toSorted((a, b) => a.localeCompare(b))])
      .toSorted(([a], [b]) => a.localeCompare(b)),
  );
}
