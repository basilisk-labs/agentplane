import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { execFileAsync } from "./git.js";

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function isIsoDate(value: unknown): boolean {
  return typeof value === "string" && !Number.isNaN(Date.parse(value));
}

export type PrMeta = {
  schema_version: 1;
  task_id: string;
  branch?: string;
  created_at: string;
  updated_at: string;
  last_verified_sha: string | null;
  last_verified_at: string | null;
  verify?: { status?: "pass" | "fail" | "skipped"; command?: string };
};

export function parsePrMeta(raw: string, taskId: string): PrMeta {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw) as unknown;
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(`JSON Parse error: ${message}`);
  }
  if (!isRecord(parsed)) throw new Error("pr/meta.json must be an object");
  if (parsed.schema_version !== 1) throw new Error("pr/meta.json schema_version must be 1");
  if (parsed.task_id !== taskId) throw new Error("pr/meta.json task_id mismatch");
  if (!isIsoDate(parsed.created_at)) throw new Error("pr/meta.json created_at must be ISO");
  if (!isIsoDate(parsed.updated_at)) throw new Error("pr/meta.json updated_at must be ISO");
  return parsed as PrMeta;
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
  try {
    const { stdout, stderr } = await execFileAsync("sh", ["-lc", command], {
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
