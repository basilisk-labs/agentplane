import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";

import { buildLocalCiExecutionPlan, parseChangedFilesEnv } from "../lib/local-ci-selection.mjs";
import { withFrameworkBuildLock } from "../lib/framework-build-lock.mjs";
import { runVerificationGroups } from "../lib/verification-scheduler.mjs";
import { writeLocalVerificationReceipt } from "../lib/local-verification-receipt.mjs";
import {
  evaluateLifecycleControlBudget,
  readLifecycleControlEvents,
  recordLifecycleControlCommand,
} from "../lib/lifecycle-control-metrics.mjs";

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
  delete nextEnv.AGENTPLANE_CLOUD_ENDPOINT;
  delete nextEnv.AGENTPLANE_CLOUD_TOKEN;
  delete nextEnv.AGENTPLANE_CLOUD_PROJECT_ID;
  delete nextEnv.AGENTPLANE_CLOUD_PROVIDER;
  delete nextEnv.AGENTPLANE_CLOUD_REMOTE_CREATE_POLICY;
  delete nextEnv.AGENTPLANE_CLOUD_AUTO_PUSH_ON_MUTATION;
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
const DEFAULT_LOCAL_VITEST_SUITE_TIMEOUT_MS = 15 * 60 * 1000;
const LOCAL_VITEST_SUITE_TIMEOUT_MS = parsePositiveIntegerEnv(
  baseEnv.AGENTPLANE_LOCAL_VITEST_SUITE_TIMEOUT_MS,
  DEFAULT_LOCAL_VITEST_SUITE_TIMEOUT_MS,
);
const LOCAL_FAST_VITEST_MAX_WORKERS =
  String(baseEnv.AGENTPLANE_FAST_VITEST_MAX_WORKERS ?? "").trim() || "4";
const LOCAL_CI_GROUP_CONCURRENCY = parsePositiveIntegerEnv(
  baseEnv.AGENTPLANE_LOCAL_CI_GROUP_CONCURRENCY,
  2,
);
function parsePositiveIntegerEnv(rawValue, fallback) {
  const value = Number.parseInt(String(rawValue ?? "").trim(), 10);
  return Number.isInteger(value) && value > 0 ? value : fallback;
}

function parseListValue(rawValue) {
  return String(rawValue ?? "")
    .split(/[\n,]/u)
    .map((line) => line.trim())
    .filter(Boolean);
}

function parseArgs(argv) {
  const parsed = {
    changedFiles: [],
    explain: false,
    json: false,
    lifecycleEventLog: null,
    mode: "full",
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--explain") {
      parsed.explain = true;
      continue;
    }
    if (arg === "--json") {
      parsed.json = true;
      parsed.explain = true;
      continue;
    }
    if (arg === "--mode") {
      parsed.mode = argv[index + 1] ?? "full";
      index += 1;
      continue;
    }
    if (arg.startsWith("--mode=")) {
      parsed.mode = arg.slice("--mode=".length);
      continue;
    }
    if (arg === "--changed-files") {
      parsed.changedFiles.push(...parseListValue(argv[index + 1]));
      index += 1;
      continue;
    }
    if (arg.startsWith("--changed-files=")) {
      parsed.changedFiles.push(...parseListValue(arg.slice("--changed-files=".length)));
      continue;
    }
    if (arg === "--lifecycle-event-log") {
      parsed.lifecycleEventLog = argv[index + 1] ?? "";
      index += 1;
      if (parsed.lifecycleEventLog.trim() === "") {
        throw new Error("--lifecycle-event-log requires a path");
      }
      continue;
    }
    if (arg.startsWith("--lifecycle-event-log=")) {
      parsed.lifecycleEventLog = arg.slice("--lifecycle-event-log=".length);
      if (parsed.lifecycleEventLog.trim() === "") {
        throw new Error("--lifecycle-event-log requires a path");
      }
      continue;
    }
    throw new Error(`Unsupported local CI argument: ${arg}`);
  }

  return parsed;
}

function renderExecutionPlan(report) {
  process.stdout.write(`Local CI mode: ${report.mode}\n`);
  process.stdout.write(
    `Fast CI selector: ${report.selector.kind}${report.selector.bucket ? ` (${report.selector.bucket}${report.selector.buckets ? `:${report.selector.buckets.join("+")}` : ""})` : ""} [${report.selector.reason}]\n`,
  );
  process.stdout.write(`Execution route: ${report.route}\n`);
  process.stdout.write(`Changed files: ${report.changed_files.length}\n`);
  if (report.changed_files.length > 0) {
    process.stdout.write(`${report.changed_files.map((filePath) => `- ${filePath}`).join("\n")}\n`);
  }
  process.stdout.write("Planned steps:\n");
  for (const step of report.steps) {
    const suffix = step.skipped ? ` (skipped: ${step.reason})` : "";
    process.stdout.write(`- ${step.label}: ${step.command}${suffix}\n`);
  }
}

function formatCommand(cmd, args) {
  return [cmd, ...args].join(" ");
}

function isTimeoutFailure(error) {
  return error?.code === "ETIMEDOUT" || (error?.killed === true && error?.signal);
}

function run(cmd, args, env = baseEnv, options = {}) {
  try {
    execFileSync(cmd, args, {
      stdio: "inherit",
      env,
      ...(options.timeoutMs ? { timeout: options.timeoutMs } : {}),
    });
  } catch (error) {
    if (options.timeoutMs && isTimeoutFailure(error)) {
      const label = options.timeoutLabel ?? "Command";
      process.stderr.write(
        `${label} timed out after ${options.timeoutMs}ms: ${formatCommand(cmd, args)}\n` +
          "Set AGENTPLANE_LOCAL_VITEST_SUITE_TIMEOUT_MS to adjust the local Vitest process timeout.\n",
      );
    }
    throw error;
  }
}

function runStep(label, fn) {
  process.stdout.write(`\n== ${label} ==\n`);
  fn();
}

function runCommand(cmd, args, env = baseEnv, options = {}) {
  run(cmd, args, env, options);
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
  runCommand("bunx", buildVitestRunArgs(options), env, {
    timeoutLabel: "Vitest suite",
    timeoutMs: LOCAL_VITEST_SUITE_TIMEOUT_MS,
  });
}

function existingLintTargets(targets) {
  return targets.filter((target) => existsSync(target));
}

function createBaselineStepEntries({ includeBuild, includeRecipesInventory = true }) {
  return [
    ["Format (check)", () => runCommand("bun", ["run", "format:check"])],
    ["Schemas (check)", () => runCommand("bun", ["run", "schemas:check"])],
    ["Agent templates (check)", () => runCommand("bun", ["run", "agents:check"])],
    ["Policy routing (check)", () => runCommand("bun", ["run", "policy:routing:check"])],
    ["Release parity (check)", () => runCommand("bun", ["run", "release:parity"])],
    ...(includeBuild
      ? [
          [
            "Build",
            () => {
              withFrameworkBuildLock(process.cwd(), "local-ci-build", () => {
                runCommand("bun", ["run", "build"]);
              });
            },
          ],
        ]
      : []),
    ...(includeBuild
      ? [
          [
            "CLI cold-start baseline (check)",
            () => runCommand("bun", ["run", "bench:cli:cold:check"]),
          ],
        ]
      : []),
    ["CLI docs freshness (check)", () => runCliDocsFreshnessStep()],
    ...(includeRecipesInventory
      ? [
          [
            "Recipes inventory freshness (check)",
            () => runCommand("bun", ["run", "docs:recipes:check"]),
          ],
        ]
      : []),
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

const parsedArgs = parseArgs(process.argv.slice(2));
const mode = parsedArgs.mode;
if (mode !== "smoke" && mode !== "fast" && mode !== "full") {
  throw new Error(`Unsupported ci mode: ${mode}`);
}
if (parsedArgs.lifecycleEventLog) {
  const observedArgv = [];
  for (let index = 0; index < process.argv.slice(2).length; index += 1) {
    const arg = process.argv.slice(2)[index];
    if (arg === "--lifecycle-event-log") {
      index += 1;
      continue;
    }
    if (arg.startsWith("--lifecycle-event-log=")) continue;
    observedArgv.push(arg);
  }
  recordLifecycleControlCommand(parsedArgs.lifecycleEventLog, {
    command: "ci:local",
    phase: parsedArgs.explain ? "plan" : "execute",
    mode,
    argv: observedArgv,
  });
}

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

const changedFiles =
  parsedArgs.changedFiles.length > 0
    ? [...new Set(parsedArgs.changedFiles)].toSorted((a, b) => a.localeCompare(b))
    : parseChangedFilesEnv(baseEnv.AGENTPLANE_FAST_CHANGED_FILES);
const executionPlan = buildLocalCiExecutionPlan({ mode, changedFiles });
const fastPlan = executionPlan.selector;
const runCliDocsCheck = executionPlan.verification_contract.selector.run_cli_docs_check;
const shouldExecuteChecks = !parsedArgs.explain;

if (parsedArgs.explain) {
  if (parsedArgs.json) {
    process.stdout.write(`${JSON.stringify(executionPlan, null, 2)}\n`);
  } else {
    renderExecutionPlan(executionPlan);
  }
}

function runCliDocsFreshnessStep() {
  if (!runCliDocsCheck) {
    process.stdout.write("Skipping CLI docs freshness check for this changed-file bucket.\n");
    return;
  }
  runCommand("bun", ["run", "docs:cli:check"]);
}

function runDocsOnlyFastPath() {
  runStepEntries(
    createBaselineStepEntries({ includeBuild: false, includeRecipesInventory: false }),
  );
}

function runDocsOnlySmokePath() {
  runStep("Format (check)", () => runCommand("bun", ["run", "format:check"]));
}

async function runTargetedFastPath(plan) {
  const startedAt = performance.now();
  const includesWorkflow = plan.bucket === "workflow" || plan.buckets?.includes("workflow");
  const lintTargets = existingLintTargets(
    plan.lintTargets.filter(
      (target) => !target.startsWith(".github/workflows/") && !target.endsWith(".yml"),
    ),
  );
  const buildResult = await runVerificationGroups(
    [{ id: "build", command: "bun", args: ["run", "build"] }],
    { concurrency: 1, cwd: process.cwd(), env: baseEnv },
  );
  for (const group of buildResult.results) {
    process.stdout.write(`\n== ${group.id} (${group.duration_ms}ms) ==\n`);
    if (group.stdout) process.stdout.write(group.stdout);
    if (group.stderr) process.stderr.write(group.stderr);
  }
  if (!buildResult.ok) throw new Error("Targeted verification build prerequisite failed.");
  const groups = [
    ...(lintTargets.length > 0
      ? [
          {
            id: "format",
            command: "bunx",
            args: ["prettier", ...lintTargets, "--check"],
          },
          {
            id: "lint",
            command: "bunx",
            args: ["eslint", ...lintTargets],
          },
        ]
      : []),
    ...(includesWorkflow
      ? [{ id: "workflow", command: "bun", args: ["run", "workflows:lint"] }]
      : []),
    ...(plan.testFiles.length > 0
      ? [
          {
            id: "tests",
            command: "bunx",
            args: buildVitestRunArgs({
              testFiles: plan.testFiles,
              pool: plan.vitestPool,
            }),
            env: testEnv,
          },
        ]
      : []),
    {
      id: "critical-paths",
      command: "bun",
      args: ["run", "test:precommit"],
      env: testEnv,
    },
  ];
  const result = await runVerificationGroups(groups, {
    concurrency: Math.min(3, groups.length),
    cwd: process.cwd(),
    env: baseEnv,
  });
  for (const group of result.results) {
    process.stdout.write(`\n== ${group.id} (${group.duration_ms}ms) ==\n`);
    if (group.stdout) process.stdout.write(group.stdout);
    if (group.stderr) process.stderr.write(group.stderr);
  }
  const wallClockMs = Math.round(performance.now() - startedAt);
  const lifecycleControl = parsedArgs.lifecycleEventLog
    ? evaluateLifecycleControlBudget(readLifecycleControlEvents(parsedArgs.lifecycleEventLog), 3)
    : {
        provenance: "not_observed",
        call_count: null,
        maximum: 3,
        commands: [],
        ok: null,
      };
  process.stdout.write(
    `${JSON.stringify({
      schema_version: 1,
      kind: "verification_metrics",
      route: `targeted:${plan.bucket}`,
      wall_clock_ms: wallClockMs,
      selected_groups: groups.length + 1,
      executed_groups: result.results.length + buildResult.results.length,
      verification_amplification: Number(
        (
          (result.results.length + buildResult.results.length) /
          Math.max(1, groups.length + 1)
        ).toFixed(2),
      ),
      lifecycle_control_commands: lifecycleControl.call_count,
      lifecycle_control: lifecycleControl,
      build_invocations: buildResult.results.filter((group) => group.id === "build").length,
      ok: result.ok,
    })}\n`,
  );
  if (!result.ok) throw new Error("Targeted verification group failed.");
}

async function runFullFastPath() {
  const startedAt = performance.now();
  const buildResult = await runVerificationGroups(
    [{ id: "build", command: "bun", args: ["run", "build"] }],
    { concurrency: 1, cwd: process.cwd(), env: baseEnv },
  );
  renderVerificationGroupResults(buildResult.results);
  if (!buildResult.ok) throw new Error("Full verification build prerequisite failed.");

  const groupEnv = {
    ...testEnv,
    AGENTPLANE_LOCAL_CI_RUN_CLI_DOCS: runCliDocsCheck ? "1" : "0",
    AGENTPLANE_LOCAL_VITEST_SUITE_TIMEOUT_MS: String(LOCAL_VITEST_SUITE_TIMEOUT_MS),
    AGENTPLANE_FAST_VITEST_MAX_WORKERS: LOCAL_FAST_VITEST_MAX_WORKERS,
  };
  const groups = executionPlan.execution_groups.map((id) => ({
    id,
    command: process.execPath,
    args: ["scripts/checks/run-local-ci-group.mjs", id],
    env: groupEnv,
    timeoutMs: LOCAL_VITEST_SUITE_TIMEOUT_MS,
  }));
  // Isolate lifecycle-heavy runtime and CLI checks from the core worker pool.
  const runtimeWave = groups.filter(({ id }) => id === "runtime");
  const coreWave = groups.filter(({ id }) => id !== "runtime" && id !== "cli");
  const cliWave = groups.filter(({ id }) => id === "cli");
  const runtimeConcurrency = Math.min(LOCAL_CI_GROUP_CONCURRENCY, runtimeWave.length);
  const coreConcurrency = Math.min(LOCAL_CI_GROUP_CONCURRENCY, coreWave.length);
  const cliConcurrency = Math.min(LOCAL_CI_GROUP_CONCURRENCY, cliWave.length);
  const runtimeResult = await runVerificationGroups(runtimeWave, {
    concurrency: runtimeConcurrency,
    cwd: process.cwd(),
    env: baseEnv,
  });
  const coreResult = await runVerificationGroups(coreWave, {
    concurrency: coreConcurrency,
    cwd: process.cwd(),
    env: baseEnv,
  });
  const cliResult = await runVerificationGroups(cliWave, {
    concurrency: cliConcurrency,
    cwd: process.cwd(),
    env: baseEnv,
  });
  const results = [...runtimeResult.results, ...coreResult.results, ...cliResult.results];
  const ok = runtimeResult.ok && coreResult.ok && cliResult.ok;
  renderVerificationGroupResults(results);
  process.stdout.write(
    `${JSON.stringify({
      schema_version: 1,
      kind: "verification_metrics",
      route: "full-fast",
      wall_clock_ms: Math.round(performance.now() - startedAt),
      selected_groups: groups.length + 1,
      executed_groups: results.length + buildResult.results.length,
      parallel_group_concurrency: Math.max(runtimeConcurrency, coreConcurrency, cliConcurrency),
      build_invocations: 1,
      ok,
    })}\n`,
  );
  if (!ok) throw new Error("Full verification group failed.");
}

function renderVerificationGroupResults(results) {
  for (const group of results) {
    process.stdout.write(`\n== ${group.id} (${group.duration_ms}ms) ==\n`);
    if (group.stdout) process.stdout.write(group.stdout);
    if (group.stderr) process.stderr.write(group.stderr);
  }
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

if (shouldExecuteChecks) {
  const executionMode = executionPlan.verification_contract.selector.execution_mode;
  process.stdout.write(`Local CI mode: ${executionMode}\n`);
  if (executionMode === "smoke" || executionMode === "fast") {
    process.stdout.write(
      `Fast CI selector: ${fastPlan.kind}${fastPlan.bucket ? ` (${fastPlan.bucket}${fastPlan.buckets ? `:${fastPlan.buckets.join("+")}` : ""})` : ""} [${fastPlan.reason}]\n`,
    );
  }

  switch (executionPlan.route) {
    case "docs-only-smoke": {
      runDocsOnlySmokePath();
      break;
    }
    case "targeted-smoke": {
      runTargetedSmokePath(fastPlan);
      break;
    }
    case "fallback-smoke": {
      runSmokeFallbackPath();
      break;
    }
    case "docs-only-fast": {
      runDocsOnlyFastPath();
      break;
    }
    case "targeted-fast": {
      await runTargetedFastPath(fastPlan);
      break;
    }
    case "full-fast":
    case "full": {
      await runFullFastPath();
      break;
    }
    default: {
      throw new Error(`Unsupported local CI route: ${executionPlan.route}`);
    }
  }
  if (executionMode === "full") {
    runStepEntries(fullOnlySteps);
  }
  const receipt = writeLocalVerificationReceipt({
    mode,
    changedFiles,
    route: executionPlan.route,
    contractDigest: executionPlan.verification_contract.digest,
  });
  if (receipt) {
    process.stdout.write(
      `Reusable local verification receipt recorded for ${receipt.head_sha.slice(0, 12)}.\n`,
    );
  }
}
