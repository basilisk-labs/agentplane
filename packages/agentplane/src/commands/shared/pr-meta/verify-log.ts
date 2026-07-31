import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import type { Readable } from "node:stream";

import { startProcess } from "@agentplaneorg/core/process";

const VERIFY_OUTPUT_TAIL_BYTES = 1024 * 1024;
const VERIFY_EXECUTABLES = new Set([
  "bash",
  "bun",
  "cat",
  "chmod",
  "gh",
  "git",
  "node",
  "npm",
  "ps",
  "sh",
  "tar",
  "unzip",
  "zip",
]);

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
  if (!VERIFY_EXECUTABLES.has(invocation.command)) {
    return {
      code: 1,
      output: `verify command executable is not allowed: ${invocation.command}`,
    };
  }
  const env = { ...process.env };
  delete env.AGENTPLANE_CLI_ALIAS;
  delete env.AGENTPLANE_AGENT_MODE;
  try {
    const child = startProcess({
      command: invocation.command,
      args: invocation.args,
      cwd,
      env,
      buffer: false,
      stdout: "pipe",
      stderr: "pipe",
      reject: false,
    }) as unknown as StreamingProcess;
    const stdout = captureOutputTail(child.stdout);
    const stderr = captureOutputTail(child.stderr);
    const result = await child;
    await Promise.all([stdout.done, stderr.done]);
    return {
      code: Number.isInteger(result.exitCode) ? result.exitCode : 1,
      output: combineOutput(stdout.render(), stderr.render()),
    };
  } catch (err) {
    const error = err as {
      code?: number | string;
      exitCode?: number;
      stdout?: string;
      stderr?: string;
      message?: string;
    };
    const output = combineOutput(
      error.stdout ? String(error.stdout) : "",
      error.stderr ? String(error.stderr) : (error.message ?? ""),
    );
    const code = typeof error.code === "number" ? error.code : 1;
    return { code: error.exitCode ?? code, output };
  }
}

type StreamingProcess = Promise<{ exitCode: number }> & {
  stdout?: Readable | null;
  stderr?: Readable | null;
};

function combineOutput(stdout: string, stderr: string): string {
  if (!stdout) return stderr;
  if (!stderr) return stdout;
  return `${stdout}${stdout.endsWith("\n") ? "" : "\n"}${stderr}`;
}

function captureOutputTail(stream: Readable | null | undefined): {
  done: Promise<void>;
  render: () => string;
} {
  const chunks: Buffer[] = [];
  let byteLength = 0;
  let truncated = false;

  const append = (value: string | Buffer): void => {
    const chunk = Buffer.isBuffer(value) ? value : Buffer.from(value);
    if (chunk.byteLength >= VERIFY_OUTPUT_TAIL_BYTES) {
      chunks.length = 0;
      chunks.push(chunk.subarray(chunk.byteLength - VERIFY_OUTPUT_TAIL_BYTES));
      byteLength = VERIFY_OUTPUT_TAIL_BYTES;
      truncated = true;
      return;
    }

    chunks.push(chunk);
    byteLength += chunk.byteLength;
    while (byteLength > VERIFY_OUTPUT_TAIL_BYTES && chunks.length > 0) {
      const first = chunks[0];
      if (!first) break;
      const overflow = byteLength - VERIFY_OUTPUT_TAIL_BYTES;
      if (first.byteLength <= overflow) {
        chunks.shift();
        byteLength -= first.byteLength;
      } else {
        chunks[0] = first.subarray(overflow);
        byteLength -= overflow;
      }
      truncated = true;
    }
  };

  const done = stream
    ? new Promise<void>((resolve) => {
        let settled = false;
        const finish = (): void => {
          if (settled) return;
          settled = true;
          resolve();
        };
        stream.on("data", append);
        stream.once("end", finish);
        stream.once("close", finish);
        stream.once("error", finish);
      })
    : Promise.resolve();

  return {
    done,
    render: () => {
      const tail = Buffer.concat(chunks, byteLength).toString("utf8");
      return truncated
        ? `[output truncated; showing last ${VERIFY_OUTPUT_TAIL_BYTES} bytes]\n${tail}`
        : tail;
    },
  };
}
