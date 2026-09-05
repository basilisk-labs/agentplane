import { runProcess } from "@agentplaneorg/core/process";
import type { AgentWorkOrderV2 } from "@agentplaneorg/core/schemas";
import { taskCentricAggregateFromExtensions } from "@agentplaneorg/core/tasks";
import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";

import type { TaskData } from "../../backends/task-backend.js";
import { writeJsonStableIfChanged } from "../../shared/write-if-changed.js";
import { parseDeclaredTaskCheck } from "../shared/declared-check.js";
import {
  localRuntimeEvidence,
  isRuntimeInfrastructureError,
  type LocalRuntimeEvidence,
} from "../../shared/runtime-env.js";
import { verificationChildEnv } from "../shared/pr-meta/verify-log.js";
import type { CommandContext, loadTaskFromContext } from "../shared/task-backend.js";

import { CliError } from "../../shared/errors.js";
import { cmdVerifyParsed } from "./verify-record.js";
import { resolveImplementationVerificationTask } from "./external-agent-implementation-recovery.js";

const DEFAULT_CHECK_TIMEOUT_MS = 30 * 60_000;
const CHECK_TIMEOUT_MS_BY_SCRIPT: Readonly<Record<string, number>> = Object.freeze({
  "e2e:v0.7.1:gate": 150 * 60_000,
});
const CHECK_OUTPUT_LIMIT = 4000;
const BUN_UNMATCHED_FILTER_PATTERN = /following filters did not match any test files/iu;
const BUN_ZERO_TEST_PATTERNS = [
  /\bno tests? (?:found|matched|ran|were run)\b/iu,
  /\bran 0 tests?\b/iu,
] as const;

type DirectTaskCheck = {
  runtime?: LocalRuntimeEvidence;
  failure_kind?: "infrastructure";
  command: string;
  declared_command?: string;
  script: string | null;
  check_ids: string[];
  exit_code: number | null;
  duration_ms: number;
  stdout_tail: string;
  stderr_tail: string;
};

type ParsedDirectTaskCheck = {
  executable: string;
  args: string[];
  script: string | null;
};

export type DirectTaskVerificationResult = {
  status: "passed" | "failed" | "unsupported";
  artifact_path: string;
  checks: DirectTaskCheck[];
  reason: string | null;
};

type AdditionalDirectTaskCommand = Readonly<{
  command: string;
  timeout_ms?: number;
  check_ids?: readonly string[];
}>;

export function blockingWorkItemCommands(validation: {
  checks: readonly {
    id: string;
    required: boolean;
    command?: string;
    timeout_ms?: number;
  }[];
  criteria: readonly { required: boolean; check_ids: readonly string[] }[];
}): AdditionalDirectTaskCommand[] {
  const criterionCheckIds = new Set(
    validation.criteria.filter((criterion) => criterion.required).flatMap((item) => item.check_ids),
  );
  return validation.checks
    .filter(
      (check): check is typeof check & { command: string } =>
        typeof check.command === "string" && (check.required || criterionCheckIds.has(check.id)),
    )
    .map(({ id, command, timeout_ms }) => ({
      command,
      check_ids: [id],
      ...(timeout_ms === undefined ? {} : { timeout_ms }),
    }));
}

export function isTaskLevelVerificationReworkState(opts: {
  work_item_id: string | null;
  has_plan_refinement: boolean;
  task_verification_state: string | undefined;
  has_current_plan: boolean;
  all_required_work_items_completed: boolean;
}): boolean {
  return (
    !opts.work_item_id &&
    !opts.has_plan_refinement &&
    opts.has_current_plan &&
    opts.all_required_work_items_completed
  );
}

export async function recordDirectTaskVerification(opts: {
  command: CommandContext;
  checkout: string;
  task: Awaited<ReturnType<typeof loadTaskFromContext>>;
  work_order: AgentWorkOrderV2;
  workflow: "direct" | "branch_pr";
}): Promise<DirectTaskVerificationResult> {
  const verificationTask = await resolveImplementationVerificationTask(opts);
  const aggregate = taskCentricAggregateFromExtensions(opts.task.extensions);
  const selectedWorkItem = aggregate?.current_plan?.proposal.work_items.work_items.find(
    (item) => item.id === opts.work_order.task.work_item_id,
  );
  const additionalCommands = selectedWorkItem
    ? blockingWorkItemCommands(selectedWorkItem.validation)
    : [];
  const checks = await runDirectTaskVerification({
    command: opts.command,
    task: verificationTask,
    task_id: opts.task.id,
    cwd: opts.checkout,
    additional_commands: additionalCommands,
    additional_only: selectedWorkItem !== undefined,
    allow_empty: selectedWorkItem !== undefined,
  });
  if (selectedWorkItem) {
    // WorkItem validation is projected by recordTaskCentricExternalResult.
    // Task-level verification remains pending until every required WorkItem is complete.
    return checks;
  }
  const exitCode = await cmdVerifyParsed({
    ctx: opts.command,
    cwd: opts.checkout,
    rootOverride: undefined,
    taskId: opts.task.id,
    state: checks.status === "passed" ? "ok" : "needs_rework",
    by: "SUPERVISOR",
    note:
      checks.status === "passed"
        ? "Verified: CLI-owned checks passed before independent EVALUATOR review."
        : `Rework: ${checks.reason ?? "Declared implementation verification did not pass."}`,
    details: renderDirectTaskVerificationDetails({
      task: verificationTask,
      taskId: opts.task.id,
      workflow: opts.workflow,
      result: checks,
    }),
    localOnly: false,
    repoFixable: checks.status !== "passed",
    incidentTags: [],
    incidentMatch: [],
    quiet: true,
  });
  if (exitCode !== 0) {
    throw new CliError({
      code: "E_RUNTIME",
      message: `External-agent implementation verification exited with ${exitCode}.`,
    });
  }
  return checks;
}

export function renderDirectTaskVerificationDetails(opts: {
  task: Pick<TaskData, "execution_contract">;
  taskId: string;
  workflow: "direct" | "branch_pr";
  result: DirectTaskVerificationResult;
}): string {
  const checks = opts.result.checks;
  const selectedChecks = (
    opts.task.execution_contract?.verification.contract?.selected_checks ?? []
  ).filter((checkId) => checkId !== "hosted_integration");
  if (opts.result.status === "passed" && selectedChecks.length > 0) {
    const contractDetails = selectedChecks
      .map((checkId) => {
        const matching = checks.filter((check) => check.check_ids.includes(checkId));
        if (matching.length === 0) return null;
        return matching
          .map((check, index) =>
            [
              `Check: ${checkId}`,
              `Command: ${check.command}`,
              "Result: pass",
              `Evidence: ${opts.result.artifact_path}#check-${String(checks.indexOf(check) + 1)}`,
              `Scope: ${opts.workflow} task ${opts.taskId} Verification Contract check ${checkId}${matching.length > 1 ? ` (${String(index + 1)}/${String(matching.length)})` : ""}`,
            ].join("\n"),
          )
          .join("\n\n");
      })
      .filter((details): details is string => details !== null)
      .join("\n\n");
    if (contractDetails) return contractDetails;
  }
  return checks
    .map((check, index) =>
      [
        `Command: ${check.command}`,
        `Result: ${check.exit_code === 0 ? "pass" : "fail"}`,
        `Evidence: ${opts.result.artifact_path}#check-${String(index + 1)}`,
        `Scope: ${opts.workflow} task ${opts.taskId} declared verification`,
      ].join("\n"),
    )
    .join("\n\n");
}

function tail(value: string): string {
  return value.length <= CHECK_OUTPUT_LIMIT ? value : value.slice(-CHECK_OUTPUT_LIMIT);
}

function mergedOutput(values: readonly string[]): string {
  return tail(values.filter(Boolean).join("\n"));
}

export function parseDirectTaskCheck(command: string): ParsedDirectTaskCheck | null {
  return parseDeclaredTaskCheck(command);
}

function parseDirectTaskCheckSequence(command: string): ParsedDirectTaskCheck[] | null {
  const parsed: ParsedDirectTaskCheck[] = [];
  let segmentStart = 0;
  let quote: "'" | '"' | null = null;
  for (let index = 0; index < command.length; index += 1) {
    const char = command[index] ?? "";
    if (quote) {
      if (char === quote) quote = null;
      else if (char === "\\" && quote === '"' && index + 1 < command.length) index += 1;
      continue;
    }
    if (char === "'" || char === '"') {
      quote = char;
      continue;
    }
    if (char === "\\" && index + 1 < command.length) {
      index += 1;
      continue;
    }
    if (char !== "&" || command[index + 1] !== "&") continue;
    const before = command[index - 1] ?? "";
    const after = command[index + 2] ?? "";
    if (!/\s/u.test(before) || !/\s/u.test(after)) return null;
    const check = parseDirectTaskCheck(command.slice(segmentStart, index).trim());
    if (!check) return null;
    parsed.push(check);
    index += 1;
    segmentStart = index + 1;
  }
  const finalCheck = parseDirectTaskCheck(command.slice(segmentStart).trim());
  return finalCheck ? [...parsed, finalCheck] : null;
}

function directTaskCheckTimeoutMs(script: string | null): number {
  return script === null
    ? DEFAULT_CHECK_TIMEOUT_MS
    : (CHECK_TIMEOUT_MS_BY_SCRIPT[script] ?? DEFAULT_CHECK_TIMEOUT_MS);
}

function bunTestReportedZeroTests(opts: {
  parsed: ParsedDirectTaskCheck;
  stdout: string;
  stderr: string;
}): boolean {
  if (opts.parsed.executable !== "bun" || opts.parsed.args[0] !== "test") return false;
  const output = `${opts.stdout}\n${opts.stderr}`;
  if (BUN_UNMATCHED_FILTER_PATTERN.test(output)) return true;
  const passCounts = [...output.matchAll(/\b(\d+)\s+pass\b/giu)].map((match) => Number(match[1]));
  if (passCounts.some((count) => count > 0)) return false;
  return passCounts.includes(0) || BUN_ZERO_TEST_PATTERNS.some((pattern) => pattern.test(output));
}

function directTaskVerificationCommands(
  task: Pick<
    TaskData,
    "verify" | "task_kind" | "mutation_scope" | "execution_contract" | "sections"
  >,
  additionalCommands: readonly AdditionalDirectTaskCommand[] = [],
): string[] {
  const commands = [...(task.verify ?? [])];
  for (const { command } of additionalCommands) {
    if (!commands.includes(command)) commands.push(command);
  }
  const declaresDocs = task.execution_contract
    ? task.execution_contract.authority.allowed_repository_effects.includes("documentation")
    : task.task_kind === "docs" || task.mutation_scope === "docs";
  if (!declaresDocs) return commands;
  for (const required of ["node .agentplane/policy/check-routing.mjs", "agentplane doctor"]) {
    if (!commands.includes(required)) commands.push(required);
  }
  return commands;
}

function selectedLocalChecks(task: Pick<TaskData, "execution_contract">): string[] {
  return (task.execution_contract?.verification.contract?.selected_checks ?? []).filter(
    (checkId) => checkId !== "hosted_integration",
  );
}

function isFullRegressionCheck(parsed: ParsedDirectTaskCheck): boolean {
  if (parsed.script === "ci:local:full") return true;
  if (
    ["npm", "pnpm", "yarn"].includes(parsed.executable) &&
    (parsed.args.length === 1 || parsed.args[0] === "run") &&
    parsed.script === "test"
  ) {
    return true;
  }
  if (parsed.executable === "bun" && parsed.args.length === 1 && parsed.args[0] === "test") {
    return true;
  }
  if (parsed.executable === "pytest") {
    return parsed.args.every((argument) => argument.startsWith("-"));
  }
  if (parsed.executable === "python" && parsed.args[0] === "-m" && parsed.args[1] === "pytest") {
    return parsed.args.slice(2).every((argument) => argument.startsWith("-"));
  }
  return parsed.executable === "go" && parsed.args[0] === "test" && parsed.args.includes("./...");
}

function isFullRegressionCommand(command: string): boolean {
  return (
    parseDirectTaskCheckSequence(command)?.some((parsed) => isFullRegressionCheck(parsed)) ?? false
  );
}

function checkIdsForCommand(command: string, selectedChecks: readonly string[]): string[] {
  if (isFullRegressionCommand(command)) return [...selectedChecks];
  return selectedChecks.filter((checkId) => checkId !== "full_regression");
}

function hasPlannerFallbackVerifySteps(task: Pick<TaskData, "sections">): boolean {
  return task.sections?.["Verify Steps"]?.includes("PLANNER fallback scaffold") === true;
}

type RootPackageInfo = {
  scripts: Set<string>;
  runner: "bun" | "npm" | "pnpm" | "yarn";
};

async function readRootPackageInfo(gitRoot: string): Promise<RootPackageInfo | null> {
  try {
    const parsed = JSON.parse(await readFile(path.join(gitRoot, "package.json"), "utf8")) as {
      scripts?: unknown;
      packageManager?: unknown;
    };
    if (!parsed.scripts || typeof parsed.scripts !== "object" || Array.isArray(parsed.scripts)) {
      return null;
    }
    const configuredRunner =
      typeof parsed.packageManager === "string" ? parsed.packageManager.split("@")[0] : null;
    const runner = ["bun", "npm", "pnpm", "yarn"].includes(configuredRunner ?? "")
      ? (configuredRunner as RootPackageInfo["runner"])
      : "npm";
    return { scripts: new Set(Object.keys(parsed.scripts)), runner };
  } catch {
    return null;
  }
}

function resolvePlannerFallbackCommand(opts: {
  command: string;
  declared_commands: readonly string[];
  package_scripts: Set<string> | null;
}): string {
  const parsed = parseDirectTaskCheck(opts.command);
  if (
    !opts.package_scripts ||
    parsed?.executable !== "bun" ||
    parsed.args[0] !== "run" ||
    !parsed.script ||
    opts.package_scripts.has(parsed.script)
  ) {
    return opts.command;
  }
  const alreadyDeclared = new Set(
    opts.declared_commands.map((command) => parseDirectTaskCheck(command)?.script).filter(Boolean),
  );
  const replacement = [
    "check",
    "test:critical",
    "test:fast",
    "test",
    "typecheck",
    "ci:local:fast",
  ].find((script) => opts.package_scripts?.has(script) && !alreadyDeclared.has(script));
  return replacement ? `bun run ${replacement}` : opts.command;
}

async function writeCheckArtifact(opts: {
  command: CommandContext;
  task_id: string;
  result: Omit<DirectTaskVerificationResult, "artifact_path">;
}): Promise<string> {
  const relative = path.join(
    opts.command.config.paths.workflow_dir,
    opts.task_id,
    "supervision",
    "declared-checks.json",
  );
  const absolute = path.join(opts.command.resolvedProject.gitRoot, relative);
  await mkdir(path.dirname(absolute), { recursive: true });
  const artifact = {
    schema_version: 1,
    kind: "direct_task_declared_checks",
    task_id: opts.task_id,
    status: opts.result.status,
    reason: opts.result.reason,
    checks: opts.result.checks,
  };
  // Equal commands and exit codes do not identify an equal execution or implementation.
  // Persist this run's observations. The writer already avoids byte-identical rewrites.
  await writeJsonStableIfChanged(absolute, artifact);
  return relative;
}

/**
 * Executes the same deterministic task-verify grammar enforced at mutation
 * boundaries. The CLI never passes task text to a shell: every command is
 * parsed into repository-bound argv and crosses the structured process boundary.
 */
export async function runDirectTaskVerification(opts: {
  command: CommandContext;
  task: Pick<
    TaskData,
    "verify" | "task_kind" | "mutation_scope" | "execution_contract" | "sections"
  >;
  task_id: string;
  cwd: string;
  additional_commands?: readonly AdditionalDirectTaskCommand[];
  additional_only?: boolean;
  allow_empty?: boolean;
  run_process?: typeof runProcess;
  now?: () => number;
}): Promise<DirectTaskVerificationResult> {
  const checks: DirectTaskCheck[] = [];
  const commands = opts.additional_only
    ? [...new Set((opts.additional_commands ?? []).map(({ command }) => command))]
    : directTaskVerificationCommands(opts.task, opts.additional_commands);
  const additionalTimeouts = new Map<string, number>();
  const additionalCheckIds = new Map<string, Set<string>>();
  for (const additional of opts.additional_commands ?? []) {
    const ids = additionalCheckIds.get(additional.command) ?? new Set<string>();
    for (const checkId of additional.check_ids ?? []) ids.add(checkId);
    additionalCheckIds.set(additional.command, ids);
    if (additional.timeout_ms === undefined) continue;
    additionalTimeouts.set(
      additional.command,
      Math.min(additionalTimeouts.get(additional.command) ?? Infinity, additional.timeout_ms),
    );
  }
  const selectedChecks = opts.additional_only ? [] : selectedLocalChecks(opts.task);
  const requiresFullRegression = selectedChecks.includes("full_regression");
  const rootPackage =
    hasPlannerFallbackVerifySteps(opts.task) || requiresFullRegression
      ? await readRootPackageInfo(opts.command.resolvedProject.gitRoot)
      : null;
  let missingRequiredCheckReason: string | null = null;
  const hasFullRegressionCommand = commands.some((command) => isFullRegressionCommand(command));
  if (requiresFullRegression && !hasFullRegressionCommand) {
    if (rootPackage?.scripts.has("ci:local:full")) {
      commands.push(`${rootPackage.runner} run ci:local:full`);
    } else {
      missingRequiredCheckReason =
        "Verification Contract requires full_regression, but package.json does not define ci:local:full.";
    }
  }
  if (commands.length === 0) {
    const result = {
      status: opts.allow_empty ? ("passed" as const) : ("unsupported" as const),
      checks,
      reason: opts.allow_empty
        ? null
        : "No executable declared verification checks are configured for this task.",
    };
    return { ...result, artifact_path: await writeCheckArtifact({ ...opts, result }) };
  }
  for (const declaredCommand of commands) {
    const command = hasPlannerFallbackVerifySteps(opts.task)
      ? resolvePlannerFallbackCommand({
          command: declaredCommand,
          declared_commands: commands,
          package_scripts: rootPackage?.scripts ?? null,
        })
      : declaredCommand;
    const parsedSequence = parseDirectTaskCheckSequence(command);
    if (!parsedSequence) {
      const result = {
        status: "unsupported" as const,
        checks,
        reason: `Unsupported declared check: ${command}`,
      };
      return { ...result, artifact_path: await writeCheckArtifact({ ...opts, result }) };
    }
    const now = opts.now ?? Date.now;
    const started = now();
    const timeoutBudgetMs =
      additionalTimeouts.get(declaredCommand) ??
      Math.max(...parsedSequence.map((parsed) => directTaskCheckTimeoutMs(parsed.script)));
    const deadline = started + timeoutBudgetMs;
    const env = verificationChildEnv();
    let runtime = localRuntimeEvidence(parsedSequence[0]!.executable, env);
    const stdout: string[] = [];
    const stderr: string[] = [];
    let exitCode: number | null = 0;
    let zeroTests = false;
    let infrastructureFailure = false;
    const completedCheck = (error?: unknown): DirectTaskCheck => ({
      runtime,
      ...(infrastructureFailure || (error && isRuntimeInfrastructureError(error))
        ? { failure_kind: "infrastructure" as const }
        : {}),
      command,
      ...(command === declaredCommand ? {} : { declared_command: declaredCommand }),
      script: parsedSequence.length === 1 ? (parsedSequence[0]?.script ?? null) : null,
      check_ids: [
        ...new Set([
          ...(additionalCheckIds.get(declaredCommand) ?? []),
          ...checkIdsForCommand(command, selectedChecks),
        ]),
      ],
      exit_code: error ? null : exitCode,
      duration_ms: Math.max(0, now() - started),
      stdout_tail: mergedOutput(stdout),
      stderr_tail: mergedOutput([
        ...stderr,
        ...(error ? [error instanceof Error ? error.message : "unknown process failure"] : []),
      ]),
    });
    try {
      for (const parsed of parsedSequence) {
        const remainingTimeoutMs = parsedSequence.length === 1 ? timeoutBudgetMs : deadline - now();
        if (remainingTimeoutMs <= 0) {
          throw new Error(
            `Declared check exhausted its ${String(timeoutBudgetMs)}ms timeout budget.`,
          );
        }
        const segmentRuntime = localRuntimeEvidence(parsed.executable, env);
        const executed = await (opts.run_process ?? runProcess)({
          command: parsed.executable,
          args: parsed.args,
          cwd: opts.cwd,
          env,
          timeoutMs: remainingTimeoutMs,
          maxBuffer: 1024 * 1024,
          reject: false,
        });
        stdout.push(executed.stdout);
        stderr.push(executed.stderr);
        exitCode = Number.isInteger(executed.exitCode) ? executed.exitCode : null;
        zeroTests = bunTestReportedZeroTests({
          parsed,
          stdout: executed.stdout,
          stderr: executed.stderr,
        });
        infrastructureFailure =
          segmentRuntime.status === "unavailable" || isRuntimeInfrastructureError(executed);
        if (infrastructureFailure || exitCode !== 0 || zeroTests) {
          runtime = segmentRuntime;
          break;
        }
      }
      checks.push(completedCheck());
      if (infrastructureFailure || exitCode !== 0 || zeroTests) {
        const result = {
          status: infrastructureFailure ? ("unsupported" as const) : ("failed" as const),
          checks,
          reason: zeroTests
            ? `Declared bun test check executed zero tests: ${command}`
            : `Declared check failed: ${command}`,
        };
        return { ...result, artifact_path: await writeCheckArtifact({ ...opts, result }) };
      }
    } catch (error) {
      checks.push(completedCheck(error));
      const result = {
        status: isRuntimeInfrastructureError(error)
          ? ("unsupported" as const)
          : ("failed" as const),
        checks,
        reason: `Declared check could not run: ${command}`,
      };
      return { ...result, artifact_path: await writeCheckArtifact({ ...opts, result }) };
    }
  }
  if (missingRequiredCheckReason) {
    const result = {
      status: "unsupported" as const,
      checks,
      reason: missingRequiredCheckReason,
    };
    return { ...result, artifact_path: await writeCheckArtifact({ ...opts, result }) };
  }
  const result = { status: "passed" as const, checks, reason: null };
  return { ...result, artifact_path: await writeCheckArtifact({ ...opts, result }) };
}
