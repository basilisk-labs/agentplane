import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { execFileAsync } from "@agentplaneorg/core/process";

type ShellInvocation = {
  command: string;
  args: string[];
};

export function resolveShellInvocation(command: string): ShellInvocation {
  const tokens = parseCommandLine(command);
  const executable = tokens[0];
  if (!executable) {
    throw new Error("verify command must be non-empty");
  }
  return { command: executable, args: tokens.slice(1) };
}

function parseCommandLine(command: string): string[] {
  const tokens: string[] = [];
  let current = "";
  let quote: "'" | '"' | null = null;

  for (let index = 0; index < command.length; index += 1) {
    const char = command[index] ?? "";
    if (char === "\0" || char === "\r" || char === "\n") {
      throw new Error("verify command contains invalid characters");
    }

    if (quote) {
      if (char === quote) {
        quote = null;
      } else if (char === "\\" && quote === '"' && index + 1 < command.length) {
        index += 1;
        current += command[index] ?? "";
      } else {
        current += char;
      }
      continue;
    }

    if (char === "'" || char === '"') {
      quote = char;
      continue;
    }

    if (char === "\\" && index + 1 < command.length) {
      index += 1;
      current += command[index] ?? "";
      continue;
    }

    if (/\s/u.test(char)) {
      if (current) {
        tokens.push(current);
        current = "";
      }
      continue;
    }

    if ("|&;<>()`$".includes(char)) {
      throw new Error("verify command must use argv syntax without shell metacharacters");
    }

    current += char;
  }

  if (quote) throw new Error("verify command contains an unterminated quote");
  if (current) tokens.push(current);
  return tokens;
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
