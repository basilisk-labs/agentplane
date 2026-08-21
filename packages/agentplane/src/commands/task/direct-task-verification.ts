import { runProcess } from "@agentplaneorg/core/process";
import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";

import type { TaskData } from "../../backends/task-backend.js";
import { writeJsonStableIfChanged } from "../../shared/write-if-changed.js";
import { parseDeclaredTaskCheck } from "../shared/declared-check.js";
import { verificationChildEnv } from "../shared/pr-meta/verify-log.js";
import type { CommandContext } from "../shared/task-backend.js";

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
  command: string;
  declared_command?: string;
  script: string | null;
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

export function renderDirectTaskVerificationDetails(opts: {
  task: Pick<TaskData, "execution_contract">;
  taskId: string;
  workflow: "direct" | "branch_pr";
  result: DirectTaskVerificationResult;
}): string {
  const checks = opts.result.checks;
  const selectedChecks = opts.task.execution_contract?.verification.contract?.selected_checks ?? [];
  if (opts.result.status === "passed" && selectedChecks.length > 0) {
    const commands = checks.map(({ command }) => command).join(" && ");
    return selectedChecks
      .map((checkId) =>
        [
          `Check: ${checkId}`,
          `Command: ${commands}`,
          "Result: pass",
          `Evidence: ${opts.result.artifact_path}#checks`,
          `Scope: ${opts.workflow} task ${opts.taskId} Verification Contract check ${checkId}`,
        ].join("\n"),
      )
      .join("\n\n");
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

export function parseDirectTaskCheck(command: string): ParsedDirectTaskCheck | null {
  return parseDeclaredTaskCheck(command);
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
): string[] {
  const commands = [...(task.verify ?? [])];
  const declaresDocs = task.execution_contract
    ? task.execution_contract.authority.allowed_repository_effects.includes("documentation")
    : task.task_kind === "docs" || task.mutation_scope === "docs";
  if (!declaresDocs) return commands;
  for (const required of ["node .agentplane/policy/check-routing.mjs", "agentplane doctor"]) {
    if (!commands.includes(required)) commands.push(required);
  }
  return commands;
}

function hasPlannerFallbackVerifySteps(task: Pick<TaskData, "sections">): boolean {
  return task.sections?.["Verify Steps"]?.includes("PLANNER fallback scaffold") === true;
}

async function readRootPackageScripts(gitRoot: string): Promise<Set<string> | null> {
  try {
    const parsed = JSON.parse(await readFile(path.join(gitRoot, "package.json"), "utf8")) as {
      scripts?: unknown;
    };
    if (!parsed.scripts || typeof parsed.scripts !== "object" || Array.isArray(parsed.scripts)) {
      return null;
    }
    return new Set(Object.keys(parsed.scripts));
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
  if (artifact.status === "passed") {
    const previous = await readFile(absolute, "utf8")
      .then((value) => JSON.parse(value) as unknown)
      .catch(() => null);
    if (
      previous &&
      typeof previous === "object" &&
      !Array.isArray(previous) &&
      (previous as { status?: unknown }).status === "passed"
    ) {
      const stableChecks = (value: unknown) => {
        if (!Array.isArray(value)) return null;
        return value.map((entry) => {
          if (!entry || typeof entry !== "object" || Array.isArray(entry)) return null;
          const check = entry as Record<string, unknown>;
          return {
            command: check.command,
            declared_command: check.declared_command,
            script: check.script,
            exit_code: check.exit_code,
          };
        });
      };
      const previousRecord = previous as Record<string, unknown>;
      const previousIdentity = {
        schema_version: previousRecord.schema_version,
        kind: previousRecord.kind,
        task_id: previousRecord.task_id,
        status: previousRecord.status,
        reason: previousRecord.reason,
        checks: stableChecks(previousRecord.checks),
      };
      const currentIdentity = {
        schema_version: artifact.schema_version,
        kind: artifact.kind,
        task_id: artifact.task_id,
        status: artifact.status,
        reason: artifact.reason,
        checks: stableChecks(artifact.checks),
      };
      if (JSON.stringify(previousIdentity) === JSON.stringify(currentIdentity)) return relative;
    }
  }
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
  run_process?: typeof runProcess;
}): Promise<DirectTaskVerificationResult> {
  const checks: DirectTaskCheck[] = [];
  const commands = directTaskVerificationCommands(opts.task);
  const packageScripts = hasPlannerFallbackVerifySteps(opts.task)
    ? await readRootPackageScripts(opts.command.resolvedProject.gitRoot)
    : null;
  if (commands.length === 0) {
    const result = {
      status: "unsupported" as const,
      checks,
      reason: "No executable declared verification checks are configured for this task.",
    };
    return { ...result, artifact_path: await writeCheckArtifact({ ...opts, result }) };
  }
  for (const declaredCommand of commands) {
    const command = hasPlannerFallbackVerifySteps(opts.task)
      ? resolvePlannerFallbackCommand({
          command: declaredCommand,
          declared_commands: commands,
          package_scripts: packageScripts,
        })
      : declaredCommand;
    const parsed = parseDirectTaskCheck(command);
    if (!parsed) {
      const result = {
        status: "unsupported" as const,
        checks,
        reason: `Unsupported declared check: ${command}`,
      };
      return { ...result, artifact_path: await writeCheckArtifact({ ...opts, result }) };
    }
    const started = Date.now();
    try {
      const executed = await (opts.run_process ?? runProcess)({
        command: parsed.executable,
        args: parsed.args,
        cwd: opts.cwd,
        env: verificationChildEnv(),
        timeoutMs: directTaskCheckTimeoutMs(parsed.script),
        maxBuffer: 1024 * 1024,
        reject: false,
      });
      checks.push({
        command,
        ...(command === declaredCommand ? {} : { declared_command: declaredCommand }),
        script: parsed.script,
        exit_code: executed.exitCode,
        duration_ms: Math.max(0, Date.now() - started),
        stdout_tail: tail(executed.stdout),
        stderr_tail: tail(executed.stderr),
      });
      if (executed.exitCode !== 0) {
        const result = {
          status: "failed" as const,
          checks,
          reason: `Declared check failed: ${command}`,
        };
        return { ...result, artifact_path: await writeCheckArtifact({ ...opts, result }) };
      }
      if (bunTestReportedZeroTests({ parsed, stdout: executed.stdout, stderr: executed.stderr })) {
        const result = {
          status: "failed" as const,
          checks,
          reason: `Declared bun test check executed zero tests: ${command}`,
        };
        return { ...result, artifact_path: await writeCheckArtifact({ ...opts, result }) };
      }
    } catch (error) {
      checks.push({
        command,
        ...(command === declaredCommand ? {} : { declared_command: declaredCommand }),
        script: parsed.script,
        exit_code: null,
        duration_ms: Math.max(0, Date.now() - started),
        stdout_tail: "",
        stderr_tail: error instanceof Error ? tail(error.message) : "unknown process failure",
      });
      const result = {
        status: "failed" as const,
        checks,
        reason: `Declared check could not run: ${command}`,
      };
      return { ...result, artifact_path: await writeCheckArtifact({ ...opts, result }) };
    }
  }
  const result = { status: "passed" as const, checks, reason: null };
  return { ...result, artifact_path: await writeCheckArtifact({ ...opts, result }) };
}
