import { spawn } from "node:child_process";

import {
  appendRunnerEvent,
  evolveRunnerRunState,
  readRunnerRunState,
  writeRunnerRunState,
} from "./artifacts.js";
import type {
  RunnerInvocation,
  RunnerProcessSignal,
  RunnerRunState,
  RunnerSupervisionState,
} from "./types.js";

const SUPPORTED_SIGNALS = new Set<RunnerProcessSignal>([
  "SIGHUP",
  "SIGINT",
  "SIGQUIT",
  "SIGTERM",
  "SIGKILL",
]);

export type SupervisedProcessResult = {
  exit_code: number | null;
  exit_signal: RunnerProcessSignal | null;
  stdout: string;
  stderr: string;
  pid: number | null;
  started_at: string;
  ended_at: string;
  cancel_requested_at: string | null;
  cancel_signal: RunnerProcessSignal | null;
  force_killed: boolean;
  heartbeat_at: string;
};

function normalizeSignal(signal: NodeJS.Signals | null): RunnerProcessSignal | null {
  if (!signal) return null;
  return SUPPORTED_SIGNALS.has(signal as RunnerProcessSignal)
    ? (signal as RunnerProcessSignal)
    : null;
}

function mergeSupervisionState(
  current: RunnerSupervisionState | undefined,
  patch: Partial<RunnerSupervisionState>,
): RunnerSupervisionState {
  return {
    ...current,
    ...Object.fromEntries(Object.entries(patch).filter(([, value]) => value !== undefined)),
  };
}

function buildInvocationEventData(
  invocation: RunnerInvocation,
  pid: number | null,
): Record<string, unknown> {
  return {
    executable: invocation.argv[0] ?? null,
    argv_count: invocation.argv.length,
    cwd: invocation.run_dir,
    env_keys: Object.keys(invocation.env).toSorted(),
    has_bootstrap_path:
      typeof invocation.bootstrap_path === "string" && invocation.bootstrap_path.trim().length > 0,
    has_output_last_message_path:
      typeof invocation.output_last_message_path === "string" &&
      invocation.output_last_message_path.trim().length > 0,
    pid,
  };
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

export async function runSupervisedProcess(opts: {
  invocation: RunnerInvocation;
  stdin_text: string;
  start_message: string;
}): Promise<SupervisedProcessResult> {
  return await new Promise((resolve, reject) => {
    const [command, ...args] = opts.invocation.argv;
    if (!command) {
      reject(new Error("Runner invocation is missing the executable command"));
      return;
    }

    const child = spawn(command, args, {
      cwd: opts.invocation.run_dir,
      env: { ...process.env, ...opts.invocation.env },
      stdio: ["pipe", "pipe", "pipe"],
    });

    const pid = typeof child.pid === "number" ? child.pid : null;
    const started_at = new Date().toISOString();
    let heartbeat_at = started_at;
    let stdout = "";
    let stderr = "";
    let settled = false;

    const updateRunningState = async () => {
      const initialState = await readRunnerRunState(opts.invocation.state_path);
      if (!initialState) return;
      const supervision = mergeSupervisionState(initialState.supervision, {
        pid,
        command,
        started_at,
        heartbeat_at,
        exit_signal: null,
      });
      await writeRunnerRunState({
        state_path: opts.invocation.state_path,
        state: evolveRunnerRunState({
          state: initialState,
          status: "running",
          updated_at: started_at,
          supervision,
        }),
      });
      await appendRunnerEvent({
        events_path: opts.invocation.events_path,
        event: {
          at: started_at,
          type: "runner_execute_start",
          message: opts.start_message,
          data: buildInvocationEventData(opts.invocation, pid),
        },
      });
    };

    const finishWithError = (err: unknown) => {
      if (settled) return;
      settled = true;
      reject(err instanceof Error ? err : new Error(String(err)));
    };

    void updateRunningState().catch((err) => {
      if (pid && isProcessAlive(pid)) {
        try {
          process.kill(pid, "SIGKILL");
        } catch {
          // best effort
        }
      }
      finishWithError(err);
    });

    child.stdout.on("data", (chunk: Buffer | string) => {
      heartbeat_at = new Date().toISOString();
      stdout += chunk.toString();
    });
    child.stderr.on("data", (chunk: Buffer | string) => {
      heartbeat_at = new Date().toISOString();
      stderr += chunk.toString();
    });
    child.on("error", finishWithError);
    child.on("close", async (code, signal) => {
      if (settled) return;
      settled = true;
      const ended_at = new Date().toISOString();
      const currentState = await readRunnerRunState(opts.invocation.state_path);
      const supervision = currentState?.supervision;
      resolve({
        exit_code: code,
        exit_signal: normalizeSignal(signal),
        stdout,
        stderr,
        pid,
        started_at,
        ended_at,
        cancel_requested_at: supervision?.cancel_requested_at ?? null,
        cancel_signal: supervision?.cancel_signal ?? null,
        force_killed: supervision?.force_killed === true,
        heartbeat_at: heartbeat_at || ended_at,
      });
    });
    child.stdin.end(opts.stdin_text);
  });
}

export async function waitForRunnerStateStop(opts: {
  state_path: string;
  timeout_ms: number;
  poll_ms?: number;
}): Promise<RunnerRunState | null> {
  const started = Date.now();
  const poll_ms = opts.poll_ms ?? 100;
  while (Date.now() - started < opts.timeout_ms) {
    const state = await readRunnerRunState(opts.state_path);
    if (state && state.status !== "running") return state;
    await new Promise((resolve) => setTimeout(resolve, poll_ms));
  }
  const state = await readRunnerRunState(opts.state_path);
  return state && state.status !== "running" ? state : null;
}
