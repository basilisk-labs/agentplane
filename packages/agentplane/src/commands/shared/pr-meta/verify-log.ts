import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import type { Readable } from "node:stream";

import { startProcess } from "@agentplaneorg/core/process";
import { isDotEnvLoadedKey } from "../../../shared/env.js";
import { resolveDeclaredTaskCheck } from "../declared-check.js";

export { resolveCommandInvocation as resolveShellInvocation } from "../declared-check.js";

const VERIFY_OUTPUT_TAIL_BYTES = 1024 * 1024;
const VERIFY_RUNTIME_ENV_KEYS = [
  "AGENTPLANE_CLI_ALIAS",
  "AGENTPLANE_AGENT_MODE",
  "AGENTPLANE_RUNTIME_ACTIVE_BIN",
  "AGENTPLANE_RUNTIME_MODE",
  "AGENTPLANE_RUNTIME_HANDOFF_FROM",
  "AGENTPLANE_REPO_LOCAL_HANDOFF",
  "AGENTPLANE_DEV_AUTO_BOOTSTRAPPED",
  "AGENTPLANE_FRAMEWORK_BUILD_LOCK_PATH",
] as const;

export function verificationChildEnv(source: NodeJS.ProcessEnv = process.env): NodeJS.ProcessEnv {
  const env = { ...source };
  for (const key of VERIFY_RUNTIME_ENV_KEYS) delete env[key];
  for (const key of Object.keys(env)) {
    if (key === "AGENTPLANE_DOTENV_LOADED_KEYS" || isDotEnvLoadedKey(key, source)) delete env[key];
  }
  return env;
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
  const resolved = resolveDeclaredTaskCheck(command);
  if (!resolved.ok) {
    return {
      code: 1,
      output: `verify command is not supported: ${resolved.reason}`,
    };
  }
  const invocation = resolved.check;
  const env = verificationChildEnv();
  try {
    const child = startProcess({
      command: invocation.executable,
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
