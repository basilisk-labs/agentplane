import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";

import {
  parseChangedFilesEnv,
  selectFastCiPlan,
  shouldRunCliDocsCheck,
} from "../lib/local-ci-selection.mjs";

function sanitizeGitProcessEnv(env) {
  const nextEnv = { ...env };
  delete nextEnv.GIT_DIR;
  delete nextEnv.GIT_WORK_TREE;
  delete nextEnv.GIT_COMMON_DIR;
  delete nextEnv.GIT_INDEX_FILE;
  delete nextEnv.GIT_OBJECT_DIRECTORY;
  delete nextEnv.GIT_ALTERNATE_OBJECT_DIRECTORIES;
  delete nextEnv.GIT_PREFIX;
  delete nextEnv.AGENTPLANE_TASK_ID;
  delete nextEnv.AGENTPLANE_ALLOW_BASE;
  delete nextEnv.AGENTPLANE_ALLOW_TASKS;
  delete nextEnv.AGENTPLANE_ALLOW_POLICY;
  delete nextEnv.AGENTPLANE_ALLOW_CONFIG;
  delete nextEnv.AGENTPLANE_ALLOW_HOOKS;
  delete nextEnv.AGENTPLANE_ALLOW_CI;
  delete nextEnv.AGENTPLANE_ALLOW_UPGRADE;
  return nextEnv;
}

const baseEnv = sanitizeGitProcessEnv(process.env);
const testEnv = {
  ...baseEnv,
  GIT_AUTHOR_NAME: "agentplane-ci",
  GIT_AUTHOR_EMAIL: "agentplane-ci@example.com",
  GIT_COMMITTER_NAME: "agentplane-ci",
  GIT_COMMITTER_EMAIL: "agentplane-ci@example.com",
};
const VITEST_TIMEOUT_MS = "60000";
const LOCAL_FAST_VITEST_MAX_WORKERS =
  String(baseEnv.AGENTPLANE_FAST_VITEST_MAX_WORKERS ?? "").trim() || "4";
const FAST_TEST_EXCLUDES = ["**/cli-smoke.test.ts", "**/run-cli*.test.ts"];

function run(cmd, args, env = baseEnv) {
  execFileSync(cmd, args, { stdio: "inherit", env });
}

function runStep(label, fn) {
  process.stdout.write(`\n== ${label} ==\n`);
  fn();
}

function runCommand(cmd, args, env = baseEnv) {
  run(cmd, args, env);
}

function buildVitestRunArgs({
  testFiles = [],
  pool,
  excludes = [],
  maxWorkers = LOCAL_FAST_VITEST_MAX_WORKERS,
}) {
  const args = ["vitest", "run"];
  if (testFiles.length > 0) {
    args.push(...testFiles);
  } else {
    for (const pattern of excludes) {
      args.push("--exclude", pattern);
    }
  }
  if (pool) {
    args.push(`--pool=${pool}`);
  }
  if (maxWorkers) {
    args.push("--maxWorkers", maxWorkers);
  }
  args.push("--testTimeout", VITEST_TIMEOUT_MS, "--hookTimeout", VITEST_TIMEOUT_MS);
  return args;
}

function runVitestSuite(options, env = baseEnv) {
  runCommand("bunx", buildVitestRunArgs(options), env);
}

function existingLintTargets(targets) {
  return targets.filter((target) => existsSync(target));
}

function createBaselineStepEntries({ includeBuild }) {
  return [
    ["Format (check)", () => runCommand("bun", ["run", "format:check"])],
    ["Schemas (check)", () => runCommand("bun", ["run", "schemas:check"])],
    ["Agent templates (check)", () => runCommand("bun", ["run", "agents:check"])],
    ["Policy routing (check)", () => runCommand("bun", ["run", "policy:routing:check"])],
    ["Release parity (check)", () => runCommand("bun", ["run", "release:parity"])],
    ...(includeBuild
      ? [
          [
            "CLI cold-start baseline (check)",
            () => runCommand("bun", ["run", "bench:cli:cold:check"]),
          ],
        ]
      : []),
    ...(includeBuild
      ? [
          [
            "Build",
            () => {
              runCommand("bun", ["run", "--filter=@agentplaneorg/core", "build"]);
              runCommand("bun", ["run", "--filter=agentplane", "build"]);
              runCommand("bun", ["run", "build"]);
            },
          ],
        ]
      : []),
    ["CLI docs freshness (check)", () => runCliDocsFreshnessStep()],
    ["Recipes inventory freshness (check)", () => runCommand("bun", ["run", "docs:recipes:check"])],
    ["Scripts README freshness (check)", () => runCommand("bun", ["run", "docs:scripts:check"])],
    [
      "Agent onboarding scenario (check)",
      () => runCommand("bun", ["run", "docs:onboarding:check"]),
    ],
    ["Hotspot threshold (check)", () => runCommand("bun", ["run", "hotspots:check"])],
    ["Vitest projects (check)", () => runCommand("bun", ["run", "vitest:projects:check"])],
  ];
}

function runStepEntries(stepEntries) {
  for (const [label, fn] of stepEntries) {
    runStep(label, fn);
  }
}

const modeFlagIndex = process.argv.indexOf("--mode");
const inlineModeArg = process.argv.find((arg) => arg.startsWith("--mode="));
const mode =
  modeFlagIndex === -1
    ? inlineModeArg
      ? inlineModeArg.slice("--mode=".length)
      : "full"
    : (process.argv[modeFlagIndex + 1] ?? "full");
if (mode !== "smoke" && mode !== "fast" && mode !== "full") {
  throw new Error(`Unsupported ci mode: ${mode}`);
}

const fastSteps = [
  ...createBaselineStepEntries({ includeBuild: true }),
  ["Lint (core)", () => run("bun", ["run", "lint:core"])],
  [
    "Unit tests (fast)",
    () => runVitestSuite({ excludes: FAST_TEST_EXCLUDES, pool: "forks" }, testEnv),
  ],
  ["CLI E2E (critical)", () => run("bun", ["run", "test:critical"], testEnv)],
];

const fullOnlySteps = [
  [
    "Docs site pipeline (generate + typecheck + build + design)",
    () => run("bun", ["run", "docs:site:check"]),
  ],
  ["Workflows lint (actionlint)", () => run("bun", ["run", "workflows:lint"])],
  ["Windows platform-critical tests", () => run("bun", ["run", "test:platform-critical"], testEnv)],
  [
    "Significant file coverage (guard)",
    () =>
      run("bunx", [
        "vitest",
        "run",
        "packages/agentplane/src/commands/guard/impl/allow.test.ts",
        "packages/agentplane/src/commands/guard/impl/close-message.test.ts",
        "packages/agentplane/src/commands/guard/impl/commands.commit-close.unit.test.ts",
        "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts",
        "packages/agentplane/src/commands/guard/impl/commands.guard.unit.test.ts",
        "packages/agentplane/src/commands/guard/impl/policy.test.ts",
        "packages/agentplane/src/commands/guard/impl/comment-commit.test.ts",
        "packages/agentplane/src/cli/run-cli.core.guard.test.ts",
        "--coverage",
        "--coverage.reporter=json",
        "--coverage.include=packages/agentplane/src/commands/guard/**",
      ]),
  ],
  ["Coverage threshold (significant)", () => run("bun", ["run", "coverage:significant"])],
];

const changedFiles = parseChangedFilesEnv(baseEnv.AGENTPLANE_FAST_CHANGED_FILES);
const fastPlan = selectFastCiPlan(changedFiles);
const runCliDocsCheck = shouldRunCliDocsCheck(changedFiles);

function runCliDocsFreshnessStep() {
  if (!runCliDocsCheck) {
    process.stdout.write("Skipping CLI docs freshness check for this changed-file bucket.\n");
    return;
  }
  runCommand("bun", ["run", "docs:cli:check"]);
}

function runDocsOnlyFastPath() {
  runStepEntries(createBaselineStepEntries({ includeBuild: false }));
}

function runDocsOnlySmokePath() {
  runStep("Format (check)", () => runCommand("bun", ["run", "format:check"]));
}

function runTargetedFastPath(plan) {
  runStepEntries(createBaselineStepEntries({ includeBuild: true }));
  runTargetedPlanSteps(plan);
}

function runTargetedSmokePath(plan) {
  runStep("Format (check)", () => runCommand("bun", ["run", "format:check"]));
  runTargetedPlanSteps(plan);
}

function runTargetedPlanSteps(plan) {
  const includesWorkflow = plan.bucket === "workflow" || plan.buckets?.includes("workflow");
  if (includesWorkflow) {
    const scriptLintTargets = existingLintTargets(
      plan.lintTargets.filter(
        (target) => !target.startsWith(".github/workflows/") && !target.endsWith(".yml"),
      ),
    );
    if (scriptLintTargets.length > 0) {
      runStep(`Lint (targeted:${plan.bucket})`, () =>
        runCommand("bunx", ["eslint", ...scriptLintTargets]),
      );
    }
    runStep("Workflow lint + command contract", () => runCommand("bun", ["run", "workflows:lint"]));
    if (plan.testFiles.length === 0) return;
  } else {
    const lintTargets = existingLintTargets(plan.lintTargets);
    if (lintTargets.length > 0) {
      runStep(`Lint (targeted:${plan.bucket})`, () =>
        runCommand("bunx", ["eslint", ...lintTargets]),
      );
    }
  }
  runStep(`Unit tests (targeted:${plan.bucket})`, () =>
    runVitestSuite({ testFiles: plan.testFiles, pool: plan.vitestPool }, testEnv),
  );
}

function runSmokeFallbackPath() {
  runStep("Format (check)", () => runCommand("bun", ["run", "format:check"]));
  runStep("Vitest projects (check)", () => runCommand("bun", ["run", "vitest:projects:check"]));
  runStep("Lint (core)", () => run("bun", ["run", "lint:core"]));
  runStep("Unit tests (precommit)", () => run("bun", ["run", "test:precommit"], testEnv));
}

process.stdout.write(`Local CI mode: ${mode}\n`);
if (mode === "smoke" || mode === "fast") {
  process.stdout.write(
    `Fast CI selector: ${fastPlan.kind}${fastPlan.bucket ? ` (${fastPlan.bucket}${fastPlan.buckets ? `:${fastPlan.buckets.join("+")}` : ""})` : ""} [${fastPlan.reason}]\n`,
  );
}

if (mode === "smoke" && fastPlan.kind === "docs-only") {
  runDocsOnlySmokePath();
} else if (mode === "smoke" && fastPlan.kind === "targeted") {
  runTargetedSmokePath(fastPlan);
} else if (mode === "smoke") {
  runSmokeFallbackPath();
} else if (mode === "fast" && fastPlan.kind === "docs-only") {
  runDocsOnlyFastPath();
} else if (mode === "fast" && fastPlan.kind === "targeted") {
  runTargetedFastPath(fastPlan);
} else {
  runStepEntries(fastSteps);
}
if (mode === "full") {
  runStepEntries(fullOnlySteps);
}
