import { execFile } from "node:child_process";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

import { atomicWriteFile, resolveProject } from "@agentplaneorg/core";

import { type CommandHandler, type CommandSpec } from "../cli/spec/spec.js";
import { mapCoreError } from "../cli/error-map.js";

const execFileAsync = promisify(execFile);

const AGENTPLANE_BIN = fileURLToPath(new URL("../../bin/agentplane.js", import.meta.url));
const MAX_LOG_CHARS = 8000;

type WorkflowPlaybookMode = "debug" | "sync" | "land";

type WorkflowPlaybookCommand = {
  kind: "agentplane" | "git";
  args: string[];
};

type WorkflowPlaybookEvidenceCommand = {
  display: string;
  started_at: string;
  ended_at: string;
  duration_ms: number;
  exit_code: number;
  stdout_tail: string;
  stderr_tail: string;
};

type WorkflowPlaybookEvidence = {
  schema_version: 1;
  mode: WorkflowPlaybookMode;
  status: "success" | "failed";
  started_at: string;
  ended_at: string;
  repo_root: string;
  evidence_path: string;
  commands: WorkflowPlaybookEvidenceCommand[];
};

type WorkflowPlaybookParsed = Record<string, never>;

function truncate(text: string): string {
  if (text.length <= MAX_LOG_CHARS) return text;
  const rest = text.length - MAX_LOG_CHARS;
  return `${text.slice(0, MAX_LOG_CHARS)}\n...[truncated ${rest} chars]`;
}

function toSafeToken(value: string): string {
  return value.replaceAll(/[^a-zA-Z0-9._-]/g, "_");
}

function buildEvidencePath(
  repoRoot: string,
  mode: WorkflowPlaybookMode,
  startedAt: string,
): string {
  const token = toSafeToken(startedAt);
  return path.join(repoRoot, ".agentplane", "workflows", "evidence", `${mode}-${token}.json`);
}

function buildPlaybookCommands(opts: {
  mode: WorkflowPlaybookMode;
  repoRoot: string;
}): WorkflowPlaybookCommand[] {
  const ap = (...args: string[]): WorkflowPlaybookCommand => ({
    kind: "agentplane",
    args: [...args, "--root", opts.repoRoot],
  });
  if (opts.mode === "debug") {
    return [
      ap("preflight", "--json", "--mode", "quick"),
      ap("doctor"),
      { kind: "git", args: ["status", "--short", "--untracked-files=no"] },
    ];
  }
  if (opts.mode === "sync") {
    return [
      ap("task", "list"),
      ap("task", "export"),
      { kind: "git", args: ["status", "--short", "--untracked-files=no"] },
    ];
  }
  return [
    ap("preflight", "--json", "--mode", "full"),
    ap("doctor"),
    { kind: "git", args: ["status", "--short", "--untracked-files=no"] },
  ];
}

async function runWorkflowPlaybookCommand(opts: {
  command: WorkflowPlaybookCommand;
  repoRoot: string;
}): Promise<WorkflowPlaybookEvidenceCommand> {
  const startedMs = Date.now();
  const startedAt = new Date(startedMs).toISOString();

  let command = "";
  let args: string[] = [];
  if (opts.command.kind === "agentplane") {
    command = process.execPath;
    args = [AGENTPLANE_BIN, ...opts.command.args];
  } else {
    command = "git";
    args = [...opts.command.args];
  }

  let exitCode = 0;
  let stdout = "";
  let stderr = "";

  try {
    const result = await execFileAsync(command, args, {
      cwd: opts.repoRoot,
      env: {
        ...process.env,
        AGENTPLANE_NO_UPDATE_CHECK: process.env.AGENTPLANE_NO_UPDATE_CHECK ?? "1",
      },
      encoding: "utf8",
      maxBuffer: 10 * 1024 * 1024,
    });
    stdout = String(result.stdout ?? "");
    stderr = String(result.stderr ?? "");
  } catch (err) {
    const failed = err as { code?: number | string; stdout?: unknown; stderr?: unknown };
    exitCode = typeof failed.code === "number" ? failed.code : 1;
    stdout = typeof failed.stdout === "string" ? failed.stdout : "";
    stderr = typeof failed.stderr === "string" ? failed.stderr : "";
    if (!stderr && typeof failed.code === "string") {
      stderr = failed.code;
    }
  }

  const endedMs = Date.now();
  return {
    display: `${command} ${args.join(" ")}`.trim(),
    started_at: startedAt,
    ended_at: new Date(endedMs).toISOString(),
    duration_ms: Math.max(0, endedMs - startedMs),
    exit_code: exitCode,
    stdout_tail: truncate(stdout),
    stderr_tail: truncate(stderr),
  };
}

async function runWorkflowPlaybook(opts: {
  cwd: string;
  rootOverride?: string;
  mode: WorkflowPlaybookMode;
}): Promise<number> {
  try {
    const resolved = await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const startedAt = new Date().toISOString();
    const evidencePath = buildEvidencePath(resolved.gitRoot, opts.mode, startedAt);
    const commands = buildPlaybookCommands({ mode: opts.mode, repoRoot: resolved.gitRoot });
    const results: WorkflowPlaybookEvidenceCommand[] = [];
    let failed = false;

    for (const command of commands) {
      const result = await runWorkflowPlaybookCommand({
        command,
        repoRoot: resolved.gitRoot,
      });
      results.push(result);
      if (result.stdout_tail) process.stdout.write(`${result.stdout_tail}\n`);
      if (result.stderr_tail) process.stderr.write(`${result.stderr_tail}\n`);
      if (result.exit_code !== 0) failed = true;
    }

    await mkdir(path.dirname(evidencePath), { recursive: true });
    const evidence: WorkflowPlaybookEvidence = {
      schema_version: 1,
      mode: opts.mode,
      status: failed ? "failed" : "success",
      started_at: startedAt,
      ended_at: new Date().toISOString(),
      repo_root: resolved.gitRoot,
      evidence_path: evidencePath,
      commands: results,
    };
    await atomicWriteFile(evidencePath, `${JSON.stringify(evidence, null, 2)}\n`);
    process.stdout.write(`Evidence: ${path.relative(resolved.gitRoot, evidencePath)}\n`);
    return failed ? 1 : 0;
  } catch (err) {
    throw mapCoreError(err, {
      command: `workflow ${opts.mode}`,
      root: opts.rootOverride ?? null,
    });
  }
}

export const workflowDebugSpec: CommandSpec<WorkflowPlaybookParsed> = {
  id: ["workflow", "debug"],
  group: "Workflow",
  summary: "Run built-in debug checks and capture workflow evidence.",
  parse: () => ({}),
  examples: [{ cmd: "agentplane workflow debug", why: "Collect debug readiness evidence." }],
};

export const workflowSyncSpec: CommandSpec<WorkflowPlaybookParsed> = {
  id: ["workflow", "sync"],
  group: "Workflow",
  summary: "Run built-in sync checks and capture workflow evidence.",
  parse: () => ({}),
  examples: [{ cmd: "agentplane workflow sync", why: "Collect sync-state evidence." }],
};

export const workflowLandSpec: CommandSpec<WorkflowPlaybookParsed> = {
  id: ["workflow", "land"],
  group: "Workflow",
  summary: "Run built-in pre-land checks and capture workflow evidence.",
  parse: () => ({}),
  examples: [{ cmd: "agentplane workflow land", why: "Collect land-readiness evidence." }],
};

export const runWorkflowDebug: CommandHandler<WorkflowPlaybookParsed> = async (ctx) => {
  return await runWorkflowPlaybook({ cwd: ctx.cwd, rootOverride: ctx.rootOverride, mode: "debug" });
};

export const runWorkflowSync: CommandHandler<WorkflowPlaybookParsed> = async (ctx) => {
  return await runWorkflowPlaybook({ cwd: ctx.cwd, rootOverride: ctx.rootOverride, mode: "sync" });
};

export const runWorkflowLand: CommandHandler<WorkflowPlaybookParsed> = async (ctx) => {
  return await runWorkflowPlaybook({ cwd: ctx.cwd, rootOverride: ctx.rootOverride, mode: "land" });
};
