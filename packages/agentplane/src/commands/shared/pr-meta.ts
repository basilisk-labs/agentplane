import { mkdir, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { validateTaskPrMeta, type TaskPrMeta } from "@agentplaneorg/core";

import { execFileAsync } from "./git.js";

export type PrMeta = TaskPrMeta;
export type PrArtifactTextState = {
  diffstatText: string | null;
  verifyLogText: string | null;
  reviewText: string | null;
};

export type PrArtifactState = PrArtifactTextState & {
  meta: PrMeta;
};

function nowOrExisting(value: string | undefined, fallback: string): string {
  const trimmed = value?.trim() ?? "";
  return trimmed || fallback;
}

export function buildOpenedPrMeta(opts: {
  taskId: string;
  branch: string;
  at: string;
  previousMeta: PrMeta | null;
  base?: string | null;
  headSha?: string | null;
}): PrMeta {
  const nextBase = opts.base ?? opts.previousMeta?.base;
  const nextHeadSha = opts.headSha ?? opts.previousMeta?.head_sha;
  const changed =
    opts.previousMeta === null ||
    (opts.previousMeta.branch ?? null) !== opts.branch ||
    (opts.previousMeta.base ?? null) !== (nextBase ?? null) ||
    (opts.previousMeta.head_sha ?? null) !== (nextHeadSha ?? null);
  return {
    schema_version: 1,
    task_id: opts.taskId,
    branch: opts.branch,
    pr_number: opts.previousMeta?.pr_number,
    pr_url: opts.previousMeta?.pr_url,
    created_at: opts.previousMeta?.created_at ?? opts.at,
    updated_at: changed ? opts.at : (opts.previousMeta?.updated_at ?? opts.at),
    last_verified_sha: opts.previousMeta?.last_verified_sha ?? null,
    last_verified_at: opts.previousMeta?.last_verified_at ?? null,
    verify: opts.previousMeta?.verify ?? { status: "skipped" },
    base: nextBase,
    head_sha: nextHeadSha,
  };
}

export function buildUpdatedPrMeta(opts: {
  meta: PrMeta;
  branch: string;
  at: string;
  base?: string | null;
  headSha?: string | null;
}): PrMeta {
  const nextBase = opts.base ?? opts.meta.base;
  const nextHeadSha = opts.headSha ?? opts.meta.head_sha;
  const changed =
    (opts.meta.branch ?? null) !== opts.branch ||
    (opts.meta.base ?? null) !== (nextBase ?? null) ||
    (opts.meta.head_sha ?? null) !== (nextHeadSha ?? null);
  return {
    ...opts.meta,
    branch: opts.branch,
    base: nextBase,
    head_sha: nextHeadSha,
    updated_at: changed ? opts.at : opts.meta.updated_at,
    last_verified_sha: opts.meta.last_verified_sha ?? null,
    last_verified_at: opts.meta.last_verified_at ?? null,
  };
}

export function buildVerifiedPrMeta(opts: {
  meta: PrMeta;
  at: string;
  state: "pass" | "fail";
}): PrMeta {
  const verifiedSha = opts.meta.head_sha ?? null;
  return {
    ...opts.meta,
    updated_at: opts.meta.updated_at,
    last_verified_sha: verifiedSha,
    last_verified_at: opts.at,
    verify: opts.meta.verify ? { ...opts.meta.verify, status: opts.state } : { status: opts.state },
  };
}

export function buildIntegratedPrMeta(opts: {
  meta: PrMeta;
  branch: string;
  base: string;
  mergeStrategy: "squash" | "merge" | "rebase";
  mergeHash: string;
  branchHeadSha: string;
  at: string;
  verifyCommands: string[];
  shouldRunVerify: boolean;
  alreadyVerifiedSha: string | null;
}): PrMeta {
  const nextMeta: PrMeta = {
    ...opts.meta,
    branch: opts.branch,
    base: opts.base,
    merge_strategy: opts.mergeStrategy,
    status: "MERGED",
    merged_at: nowOrExisting(opts.meta.merged_at, opts.at),
    merge_commit: opts.mergeHash,
    head_sha: opts.branchHeadSha,
    updated_at: opts.at,
  };

  if (opts.verifyCommands.length > 0 && (opts.shouldRunVerify || opts.alreadyVerifiedSha)) {
    nextMeta.last_verified_sha = opts.branchHeadSha;
    nextMeta.last_verified_at = opts.at;
    nextMeta.verify = opts.meta.verify
      ? { ...opts.meta.verify, status: "pass" }
      : { status: "pass", command: opts.verifyCommands.join(" && ") };
  }

  return nextMeta;
}

export type ShellInvocation = {
  command: string;
  args: string[];
};

export function resolveShellInvocation(command: string): ShellInvocation {
  if (os.platform() === "win32") {
    const rawComspec = process.env.ComSpec ?? process.env.COMSPEC;
    const shellCommand =
      rawComspec && rawComspec !== "undefined" && rawComspec !== "null" ? rawComspec : "cmd.exe";
    return { command: shellCommand, args: ["/d", "/s", "/c", command] };
  }
  return { command: "sh", args: ["-lc", command] };
}

export function parsePrMeta(raw: string, taskId: string): PrMeta {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw) as unknown;
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(`JSON Parse error: ${message}`);
  }
  const meta = validateTaskPrMeta(parsed);
  if (meta.task_id !== taskId) throw new Error("pr/meta.json task_id mismatch");
  return meta;
}

export function extractLastVerifiedSha(logText: string): string | null {
  const regex = /verified_sha=([0-9a-f]{7,40})/gi;
  let match: RegExpExecArray | null = null;
  let last: string | null = null;
  while ((match = regex.exec(logText))) {
    last = match[1] ?? null;
  }
  return last;
}

export async function appendVerifyLog(
  logPath: string,
  header: string,
  content: string,
): Promise<void> {
  await mkdir(path.dirname(logPath), { recursive: true });
  const lines = [header.trimEnd()];
  if (content) lines.push(content.trimEnd());
  lines.push("");
  await writeFile(logPath, `${lines.join("\n")}\n`, { flag: "a" });
}

export async function runShellCommand(
  command: string,
  cwd: string,
): Promise<{
  code: number;
  output: string;
}> {
  const invocation = resolveShellInvocation(command);
  try {
    const { stdout, stderr } = await execFileAsync(invocation.command, invocation.args, {
      cwd,
      env: process.env,
      maxBuffer: 10 * 1024 * 1024,
    });
    let output = "";
    if (stdout) output += stdout;
    if (stderr) output += (output && !output.endsWith("\n") ? "\n" : "") + stderr;
    return { code: 0, output };
  } catch (err) {
    const error = err as { code?: number | string; stdout?: string; stderr?: string };
    let output = "";
    if (error.stdout) output += String(error.stdout);
    if (error.stderr)
      output += (output && !output.endsWith("\n") ? "\n" : "") + String(error.stderr);
    const code = typeof error.code === "number" ? error.code : 1;
    return { code, output };
  }
}
