import { runProcess } from "@agentplaneorg/core/process";
import { mkdir } from "node:fs/promises";
import path from "node:path";

import type { TaskData } from "../../backends/task-backend.js";
import { resolveAgentplaneBinPath } from "../../shared/package-paths.js";
import { writeJsonStableIfChanged } from "../../shared/write-if-changed.js";
import { resolveShellInvocation } from "../shared/pr-meta/verify-log.js";
import type { CommandContext } from "../shared/task-backend.js";

const DEFAULT_CHECK_TIMEOUT_MS = 30 * 60_000;
const CHECK_TIMEOUT_MS_BY_SCRIPT: Readonly<Record<string, number>> = Object.freeze({
  "e2e:v0.7.1:gate": 150 * 60_000,
});
const CHECK_OUTPUT_LIMIT = 4000;
const SAFE_BUN_SCRIPT = /^[A-Za-z0-9][A-Za-z0-9:._-]*$/u;
const AGENTPLANE_BIN = resolveAgentplaneBinPath();

type DirectTaskCheck = {
  command: string;
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

function tail(value: string): string {
  return value.length <= CHECK_OUTPUT_LIMIT ? value : value.slice(-CHECK_OUTPUT_LIMIT);
}

function repositoryBoundArg(value: string): boolean {
  const candidates = [value];
  const separator = value.indexOf("=");
  if (separator !== -1) candidates.push(value.slice(separator + 1));
  return candidates.every((candidate) => {
    if (!candidate || candidate.startsWith("-")) return true;
    const normalized = candidate.replaceAll("\\", "/");
    return (
      !path.isAbsolute(candidate) &&
      !path.win32.isAbsolute(candidate) &&
      !normalized.split("/").includes("..")
    );
  });
}

export function parseDirectTaskCheck(command: string): ParsedDirectTaskCheck | null {
  let invocation: ReturnType<typeof resolveShellInvocation>;
  try {
    invocation = resolveShellInvocation(command);
  } catch {
    return null;
  }
  if (invocation.command !== "bun") return null;
  const [subcommand, target] = invocation.args;
  if (!invocation.args.slice(1).every((argument) => repositoryBoundArg(argument))) return null;
  if (subcommand === "test") {
    return { executable: "bun", args: invocation.args, script: null };
  }
  if (subcommand !== "run" || !target || !SAFE_BUN_SCRIPT.test(target)) return null;
  return { executable: "bun", args: invocation.args, script: target };
}

function directTaskCheckTimeoutMs(script: string | null): number {
  return script === null
    ? DEFAULT_CHECK_TIMEOUT_MS
    : (CHECK_TIMEOUT_MS_BY_SCRIPT[script] ?? DEFAULT_CHECK_TIMEOUT_MS);
}

function parseTrustedDirectTaskCheck(command: string): ParsedDirectTaskCheck | null {
  const bun = parseDirectTaskCheck(command);
  if (bun) return bun;
  if (command === "node .agentplane/policy/check-routing.mjs") {
    return {
      executable: "node",
      args: [".agentplane/policy/check-routing.mjs"],
      script: null,
    };
  }
  if (command === "agentplane doctor") {
    // Re-enter through the active package binary rather than PATH. The
    // supervised CLI may be launched repo-locally without a global installation.
    return { executable: process.execPath, args: [AGENTPLANE_BIN, "doctor"], script: null };
  }
  return null;
}

function directTaskVerificationCommands(
  task: Pick<TaskData, "verify" | "task_kind" | "mutation_scope">,
): string[] {
  const commands = [...(task.verify ?? [])];
  if (task.task_kind !== "docs" && task.mutation_scope !== "docs") return commands;
  for (const required of ["node .agentplane/policy/check-routing.mjs", "agentplane doctor"]) {
    if (!commands.includes(required)) commands.push(required);
  }
  return commands;
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
  await writeJsonStableIfChanged(absolute, {
    schema_version: 1,
    kind: "direct_task_declared_checks",
    task_id: opts.task_id,
    status: opts.result.status,
    reason: opts.result.reason,
    checks: opts.result.checks,
  });
  return relative;
}

/**
 * Executes only the intentionally narrow task-verify grammar. The CLI never
 * passes arbitrary task text to a shell: each command is a repository-bound
 * `bun run`/`bun test` argv or a fixed docs-policy check through the structured
 * process boundary.
 */
export async function runDirectTaskVerification(opts: {
  command: CommandContext;
  task: Pick<TaskData, "verify" | "task_kind" | "mutation_scope">;
  task_id: string;
  cwd: string;
  run_process?: typeof runProcess;
}): Promise<DirectTaskVerificationResult> {
  const checks: DirectTaskCheck[] = [];
  const commands = directTaskVerificationCommands(opts.task);
  if (commands.length === 0) {
    const result = {
      status: "unsupported" as const,
      checks,
      reason: "No executable declared verification checks are configured for this task.",
    };
    return { ...result, artifact_path: await writeCheckArtifact({ ...opts, result }) };
  }
  for (const command of commands) {
    const parsed = parseTrustedDirectTaskCheck(command);
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
        timeoutMs: directTaskCheckTimeoutMs(parsed.script),
        maxBuffer: 1024 * 1024,
        reject: false,
      });
      checks.push({
        command,
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
    } catch (error) {
      checks.push({
        command,
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
