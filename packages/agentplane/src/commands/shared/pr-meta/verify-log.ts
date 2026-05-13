import { mkdir, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { execFileAsync } from "@agentplaneorg/core/process";

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
