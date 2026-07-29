import { runProcess } from "@agentplaneorg/core/process";
import { mkdir } from "node:fs/promises";
import path from "node:path";

import type { TaskData } from "../../backends/task-backend.js";
import { writeJsonStableIfChanged } from "../../shared/write-if-changed.js";
import type { CommandContext } from "../shared/task-backend.js";

const CHECK_TIMEOUT_MS = 10 * 60_000;
const CHECK_OUTPUT_LIMIT = 4000;
const SAFE_BUN_SCRIPT = /^[A-Za-z0-9][A-Za-z0-9:_-]*$/u;

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

export function parseDirectTaskCheck(command: string): { script: string } | null {
  const tokens = command.trim().split(/\s+/u);
  if (tokens.length !== 3 || tokens[0] !== "bun" || tokens[1] !== "run") return null;
  const script = tokens[2] ?? "";
  return SAFE_BUN_SCRIPT.test(script) ? { script } : null;
}

function parseTrustedDirectTaskCheck(command: string): ParsedDirectTaskCheck | null {
  const bun = parseDirectTaskCheck(command);
  if (bun) return { executable: "bun", args: ["run", bun.script], script: bun.script };
  if (command === "node .agentplane/policy/check-routing.mjs") {
    return {
      executable: "node",
      args: [".agentplane/policy/check-routing.mjs"],
      script: null,
    };
  }
  if (command === "agentplane doctor") {
    return { executable: "agentplane", args: ["doctor"], script: null };
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
 * passes arbitrary task text to a shell: each command is a safe `bun run`
 * script or a fixed docs-policy check through the structured process boundary.
 */
export async function runDirectTaskVerification(opts: {
  command: CommandContext;
  task: Pick<TaskData, "verify" | "task_kind" | "mutation_scope">;
  task_id: string;
  cwd: string;
}): Promise<DirectTaskVerificationResult> {
  const checks: DirectTaskCheck[] = [];
  for (const command of directTaskVerificationCommands(opts.task)) {
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
      const executed = await runProcess({
        command: parsed.executable,
        args: parsed.args,
        cwd: opts.cwd,
        timeoutMs: CHECK_TIMEOUT_MS,
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
