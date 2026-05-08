import { expect } from "vitest";

import { runCli } from "../agentplane-internal.js";

const originalStdoutWrite = process.stdout.write.bind(process.stdout);
const originalStderrWrite = process.stderr.write.bind(process.stderr);
let stdioSilenceDepth = 0;

export type AgentJsonEnvelope = {
  schema_version?: number;
  mode?: string;
  command?: string;
  ok?: boolean;
  exit_code?: number;
  stdout?: string;
  stderr?: string;
  data?: unknown;
};

export function captureStdIO() {
  let stdout = "";
  let stderr = "";

  const origStdoutWrite = process.stdout.write.bind(process.stdout);
  const origStderrWrite = process.stderr.write.bind(process.stderr);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (process.stdout.write as any) = (chunk: unknown) => {
    stdout += String(chunk);
    return true;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (process.stderr.write as any) = (chunk: unknown) => {
    stderr += String(chunk);
    return true;
  };

  return {
    get stdout() {
      return stdout;
    },
    get stderr() {
      return stderr;
    },
    restore() {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (process.stdout.write as any) = origStdoutWrite;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (process.stderr.write as any) = origStderrWrite;
    },
  };
}

export function splitOutputLines(text: string): string[] {
  return text
    .trim()
    .split(/\r?\n/)
    .map((line) => line.trimEnd())
    .filter(Boolean);
}

export function parseAgentJsonEnvelope(stdout: string): AgentJsonEnvelope {
  return JSON.parse(stdout) as AgentJsonEnvelope;
}

export function expectAgentJsonEnvelope(
  payload: AgentJsonEnvelope,
  opts: {
    command: string;
    ok: boolean;
    exitCode: number;
    hasData?: boolean;
  },
): void {
  expect(payload.schema_version).toBe(1);
  expect(payload.mode).toBe("agent_json_v1");
  expect(payload.command).toBe(opts.command);
  expect(payload.ok).toBe(opts.ok);
  expect(payload.exit_code).toBe(opts.exitCode);
  expect(Object.keys(payload)).toEqual(
    opts.hasData
      ? ["schema_version", "mode", "command", "ok", "exit_code", "stdout", "stderr", "data"]
      : ["schema_version", "mode", "command", "ok", "exit_code", "stdout", "stderr"],
  );
  expect(Object.hasOwn(payload, "data")).toBe(opts.hasData ?? false);
}

export function silenceStdIO(): () => void {
  if (stdioSilenceDepth === 0) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (process.stdout.write as any) = () => true;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (process.stderr.write as any) = () => true;
  }
  stdioSilenceDepth += 1;
  return () => {
    stdioSilenceDepth -= 1;
    if (stdioSilenceDepth <= 0) {
      stdioSilenceDepth = 0;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (process.stdout.write as any) = originalStdoutWrite;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (process.stderr.write as any) = originalStderrWrite;
    }
  };
}

export async function runCliSilent(args: string[]): Promise<number> {
  const io = captureStdIO();
  try {
    return await runCli(args);
  } finally {
    io.restore();
  }
}
