import { runProcess } from "@agentplaneorg/core/process";

import type { RunnerProcessSignal } from "../types.js";

const SUPPORTED_SIGNALS = new Set<RunnerProcessSignal>([
  "SIGHUP",
  "SIGINT",
  "SIGQUIT",
  "SIGTERM",
  "SIGKILL",
]);

export type ObservedProcessIdentity = {
  pid: number;
  command: string | null;
  started_at: string | null;
};

export function normalizeSignal(signal: NodeJS.Signals | null): RunnerProcessSignal | null {
  if (!signal) return null;
  return SUPPORTED_SIGNALS.has(signal as RunnerProcessSignal)
    ? (signal as RunnerProcessSignal)
    : null;
}

export function exitCodeForSignal(signal: RunnerProcessSignal | null): number | null {
  if (signal === "SIGINT") return 130;
  if (signal === "SIGTERM") return 143;
  if (signal === "SIGKILL") return 137;
  if (signal === "SIGHUP") return 129;
  if (signal === "SIGQUIT") return 131;
  return null;
}

export function isProcessAlive(pid: number): boolean {
  try {
    process.kill(pid, 0);
    return true;
  } catch (err) {
    const code = (err as NodeJS.ErrnoException | null)?.code;
    if (code === "ESRCH") return false;
    if (code === "EPERM") return true;
    throw err;
  }
}

export async function readObservedProcessIdentity(
  pid: number,
): Promise<ObservedProcessIdentity | null> {
  try {
    const { stdout } = await runProcess({
      command: "ps",
      args: ["-o", "lstart=,command=", "-p", String(pid)],
      encoding: "utf8",
    });
    const line = String(stdout)
      .split("\n")
      .map((entry: string) => entry.trim())
      .find((entry: string) => entry.length > 0);
    if (!line) return null;
    const match =
      /^([A-Z][a-z]{2}\s+[A-Z][a-z]{2}\s+\d{1,2}\s+\d\d:\d\d:\d\d\s+\d{4})\s+(.*)$/u.exec(line);
    const startedAtRaw = match?.[1]?.trim() ?? null;
    const command = match?.[2]?.trim() ?? null;
    const parsedStartedAt =
      startedAtRaw && !Number.isNaN(Date.parse(startedAtRaw))
        ? new Date(startedAtRaw).toISOString()
        : null;
    return {
      pid,
      command,
      started_at: parsedStartedAt,
    };
  } catch (err) {
    const errno = (err as NodeJS.ErrnoException | null)?.code;
    const exitCode = (err as { code?: number } | null)?.code;
    const message = err instanceof Error ? err.message : "";
    if (errno === "ESRCH" || exitCode === 1) return null;
    if (message.includes("process id too large")) return null;
    throw err;
  }
}

export async function waitForProcessExit(opts: {
  pid: number;
  timeout_ms: number;
  poll_ms?: number;
}): Promise<boolean> {
  const started = Date.now();
  const poll_ms = opts.poll_ms ?? 100;
  while (Date.now() - started < opts.timeout_ms) {
    if (!isProcessAlive(opts.pid)) return true;
    await new Promise((resolve) => setTimeout(resolve, poll_ms));
  }
  return !isProcessAlive(opts.pid);
}
