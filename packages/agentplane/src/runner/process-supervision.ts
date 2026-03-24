import { execFile, spawn } from "node:child_process";
import { appendFile } from "node:fs/promises";
import { promisify } from "node:util";

import {
  appendRunnerEvent,
  evolveRunnerRunState,
  readRunnerRunState,
  writeRunnerRunState,
} from "./artifacts.js";
import { finalizeTraceArtifact, redactTraceText } from "./trace-artifacts.js";
import type {
  RunnerInvocation,
  RunnerProcessSignal,
  RunnerRunState,
  RunnerSupervisionState,
  RunnerTimeoutReason,
} from "./types.js";
import { createRunnerTraceEvent, serializeRunnerTraceEvent } from "./trace.js";

const SUPPORTED_SIGNALS = new Set<RunnerProcessSignal>([
  "SIGHUP",
  "SIGINT",
  "SIGQUIT",
  "SIGTERM",
  "SIGKILL",
]);

const execFileAsync = promisify(execFile);

export type SupervisedProcessResult = {
  exit_code: number | null;
  exit_signal: RunnerProcessSignal | null;
  stdout_tail: string;
  stderr_tail: string;
  stdout_bytes: number;
  stderr_bytes: number;
  pid: number | null;
  started_at: string;
  ended_at: string;
  cancel_requested_at: string | null;
  cancel_signal: RunnerProcessSignal | null;
  timeout_reason: RunnerTimeoutReason | null;
  timeout_requested_at: string | null;
  terminate_sent_at: string | null;
  kill_sent_at: string | null;
  force_killed: boolean;
  heartbeat_at: string;
  trace_artifact_path: string | null;
  trace_archive_path: string | null;
  stderr_artifact_path: string | null;
  stderr_archive_path: string | null;
};

export type ObservedProcessIdentity = {
  pid: number;
  command: string | null;
  started_at: string | null;
};

function renderInvocationCommand(invocation: RunnerInvocation): string | null {
  const commandLine = invocation.argv
    .map((part) => part.trim())
    .filter((part) => part.length > 0)
    .join(" ");
  return commandLine.length > 0 ? commandLine : null;
}

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
    has_trace_path:
      typeof invocation.trace_path === "string" && invocation.trace_path.trim().length > 0,
    has_stderr_path:
      typeof invocation.stderr_path === "string" && invocation.stderr_path.trim().length > 0,
    trace_policy: invocation.trace_policy,
    timeout_policy: invocation.timeout_policy,
    pid,
  };
}

function appendTail(current: string, incoming: string, maxBytes: number): string {
  const combined = Buffer.from(`${current}${incoming}`, "utf8");
  if (combined.length <= maxBytes) return combined.toString("utf8");
  return combined.subarray(combined.length - maxBytes).toString("utf8");
}

function splitCompletedLines(buffer: string): { lines: string[]; remainder: string } {
  const lines: string[] = [];
  let start = 0;
  while (start < buffer.length) {
    const newlineIndex = buffer.indexOf("\n", start);
    if (newlineIndex === -1) {
      return { lines, remainder: buffer.slice(start) };
    }
    let line = buffer.slice(start, newlineIndex);
    if (line.endsWith("\r")) {
      line = line.slice(0, -1);
    }
    lines.push(line);
    start = newlineIndex + 1;
  }
  return { lines, remainder: "" };
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
    const { stdout } = await execFileAsync("ps", ["-o", "lstart=,command=", "-p", String(pid)], {
      encoding: "utf8",
    });
    const line = stdout
      .split("\n")
      .map((entry) => entry.trim())
      .find((entry) => entry.length > 0);
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
    if (errno === "ESRCH" || exitCode === 1) return null;
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
    let stdout_tail = "";
    let stderr_tail = "";
    let stdout_bytes = 0;
    let stderr_bytes = 0;
    let stdout_buffer = "";
    let stderr_buffer = "";
    let trace_seq = 0;
    let settled = false;
    const tracePolicy = opts.invocation.trace_policy;
    const timeoutPolicy = opts.invocation.timeout_policy;
    const traceMode = tracePolicy.mode;
    const captureStderr = tracePolicy.capture_stderr;
    const maxTailBytes = tracePolicy.max_tail_bytes;
    const redactPatterns = tracePolicy.redact_patterns ?? [];
    let timeoutReason: RunnerTimeoutReason | null = null;
    let timeoutRequestedAt: string | null = null;
    let terminateSentAt: string | null = null;
    let killSentAt: string | null = null;
    let traceWriteChain = Promise.resolve();
    let stderrWriteChain = Promise.resolve();
    let idleTimer: NodeJS.Timeout | null = null;
    let wallTimer: NodeJS.Timeout | null = null;
    let killTimer: NodeJS.Timeout | null = null;

    const queueAppend = (kind: "trace" | "stderr", text: string) => {
      if (kind === "trace" && traceMode !== "raw") return;
      if (kind === "stderr" && !captureStderr) return;
      const chain = kind === "trace" ? traceWriteChain : stderrWriteChain;
      const path = kind === "trace" ? opts.invocation.trace_path : opts.invocation.stderr_path;
      const next: Promise<void> = chain.then(() => appendFile(path, text, "utf8"));
      void next.catch(finishWithError);
      if (kind === "trace") {
        traceWriteChain = next;
      } else {
        stderrWriteChain = next;
      }
    };

    const writeTraceLine = (stream: "stdout" | "stderr", raw: string) => {
      trace_seq += 1;
      queueAppend(
        "trace",
        serializeRunnerTraceEvent(
          createRunnerTraceEvent({
            ts: new Date().toISOString(),
            seq: trace_seq,
            stream,
            adapter_id: opts.invocation.adapter_id,
            raw,
          }),
        ),
      );
    };

    const flushTraceBuffer = (buffer: string, stream: "stdout" | "stderr"): string => {
      const { lines, remainder } = splitCompletedLines(buffer);
      for (const line of lines) {
        writeTraceLine(stream, line);
      }
      return remainder;
    };

    const clearTimers = () => {
      if (idleTimer) clearTimeout(idleTimer);
      if (wallTimer) clearTimeout(wallTimer);
      if (killTimer) clearTimeout(killTimer);
      idleTimer = null;
      wallTimer = null;
      killTimer = null;
    };

    const patchRunningSupervision = async (patch: Partial<RunnerSupervisionState>) => {
      const currentState = await readRunnerRunState(opts.invocation.state_path);
      if (!currentState) return;
      await writeRunnerRunState({
        state_path: opts.invocation.state_path,
        state: evolveRunnerRunState({
          state: currentState,
          status: currentState.status,
          updated_at: new Date().toISOString(),
          supervision: mergeSupervisionState(currentState.supervision, patch),
        }),
      });
    };

    const requestTimeout = (reason: RunnerTimeoutReason) => {
      if (settled || timeoutReason) return;
      timeoutReason = reason;
      timeoutRequestedAt = new Date().toISOString();
      terminateSentAt = timeoutRequestedAt;
      void patchRunningSupervision({
        timeout_reason: reason,
        timeout_requested_at: timeoutRequestedAt,
        terminate_sent_at: terminateSentAt,
        heartbeat_at: timeoutRequestedAt,
      }).catch(finishWithError);
      void appendRunnerEvent({
        events_path: opts.invocation.events_path,
        event: {
          at: timeoutRequestedAt,
          type: "runner_timeout_requested",
          message: `runner timeout requested (${reason})`,
          data: {
            reason,
            pid,
            timeout_policy: timeoutPolicy,
          },
        },
      }).catch(finishWithError);
      if (pid && isProcessAlive(pid)) {
        try {
          process.kill(pid, "SIGTERM");
        } catch (err) {
          const code = (err as NodeJS.ErrnoException | null)?.code;
          if (code !== "ESRCH") {
            finishWithError(err);
            return;
          }
        }
      }
      const graceMs = timeoutPolicy.terminate_grace_ms;
      if (graceMs <= 0) {
        killSentAt = new Date().toISOString();
        void patchRunningSupervision({
          timeout_reason: reason,
          timeout_requested_at: timeoutRequestedAt,
          terminate_sent_at: terminateSentAt,
          kill_sent_at: killSentAt,
          force_killed: true,
          heartbeat_at: killSentAt,
        }).catch(finishWithError);
        if (pid && isProcessAlive(pid)) {
          try {
            process.kill(pid, "SIGKILL");
          } catch (err) {
            const code = (err as NodeJS.ErrnoException | null)?.code;
            if (code !== "ESRCH") {
              finishWithError(err);
            }
          }
        }
        return;
      }
      killTimer = setTimeout(() => {
        if (settled || !timeoutReason) return;
        killSentAt = new Date().toISOString();
        void patchRunningSupervision({
          timeout_reason: timeoutReason,
          timeout_requested_at: timeoutRequestedAt,
          terminate_sent_at: terminateSentAt,
          kill_sent_at: killSentAt,
          force_killed: true,
          heartbeat_at: killSentAt,
        }).catch(finishWithError);
        void appendRunnerEvent({
          events_path: opts.invocation.events_path,
          event: {
            at: killSentAt,
            type: "runner_timeout_force_kill",
            message: `runner force-killed after timeout (${timeoutReason})`,
            data: {
              reason: timeoutReason,
              pid,
              timeout_policy: timeoutPolicy,
            },
          },
        }).catch(finishWithError);
        if (pid && isProcessAlive(pid)) {
          try {
            process.kill(pid, "SIGKILL");
          } catch (err) {
            const code = (err as NodeJS.ErrnoException | null)?.code;
            if (code !== "ESRCH") {
              finishWithError(err);
            }
          }
        }
      }, graceMs);
    };

    const resetIdleTimer = () => {
      if (timeoutPolicy.idle_ms <= 0 || settled || timeoutReason) return;
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        requestTimeout("idle");
      }, timeoutPolicy.idle_ms);
    };

    const updateRunningState = async () => {
      const initialState = await readRunnerRunState(opts.invocation.state_path);
      if (!initialState) return;
      const supervision = mergeSupervisionState(initialState.supervision, {
        pid,
        command: renderInvocationCommand(opts.invocation),
        started_at,
        heartbeat_at,
        exit_signal: null,
        timeout_reason: null,
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
      clearTimers();
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
      const text = chunk.toString();
      const persistedText = redactTraceText(text, redactPatterns);
      heartbeat_at = new Date().toISOString();
      resetIdleTimer();
      stdout_bytes += Buffer.byteLength(text, "utf8");
      stdout_tail = appendTail(stdout_tail, persistedText, maxTailBytes);
      stdout_buffer = flushTraceBuffer(`${stdout_buffer}${persistedText}`, "stdout");
    });
    child.stderr.on("data", (chunk: Buffer | string) => {
      const text = chunk.toString();
      const persistedText = redactTraceText(text, redactPatterns);
      heartbeat_at = new Date().toISOString();
      resetIdleTimer();
      stderr_bytes += Buffer.byteLength(text, "utf8");
      stderr_tail = appendTail(stderr_tail, persistedText, maxTailBytes);
      stderr_buffer = flushTraceBuffer(`${stderr_buffer}${persistedText}`, "stderr");
      queueAppend("stderr", persistedText);
    });
    child.on("error", finishWithError);
    child.on("close", async (code, signal) => {
      if (settled) return;
      clearTimers();
      const ended_at = new Date().toISOString();
      if (stdout_buffer) {
        writeTraceLine("stdout", stdout_buffer);
      }
      if (stderr_buffer) {
        writeTraceLine("stderr", stderr_buffer);
      }
      await Promise.all([traceWriteChain, stderrWriteChain]);
      if (settled) return;
      const normalizedSignal = normalizeSignal(signal);
      const currentState = await readRunnerRunState(opts.invocation.state_path);
      const supervision = currentState?.supervision;
      const runStatus: "success" | "failed" | "cancelled" = supervision?.cancel_requested_at
        ? "cancelled"
        : timeoutReason
          ? "failed"
          : code === 0
            ? "success"
            : "failed";
      const [traceArtifact, stderrArtifact] = await Promise.all([
        finalizeTraceArtifact({
          file_path: opts.invocation.trace_path,
          policy: tracePolicy,
          run_status: runStatus,
        }),
        finalizeTraceArtifact({
          file_path: opts.invocation.stderr_path,
          policy: tracePolicy,
          run_status: runStatus,
        }),
      ]);
      settled = true;
      resolve({
        exit_code: code,
        exit_signal: normalizedSignal,
        stdout_tail,
        stderr_tail,
        stdout_bytes,
        stderr_bytes,
        pid,
        started_at,
        ended_at,
        cancel_requested_at: supervision?.cancel_requested_at ?? null,
        cancel_signal: supervision?.cancel_signal ?? null,
        timeout_reason: supervision?.timeout_reason ?? timeoutReason,
        timeout_requested_at: supervision?.timeout_requested_at ?? timeoutRequestedAt,
        terminate_sent_at: supervision?.terminate_sent_at ?? terminateSentAt,
        kill_sent_at: supervision?.kill_sent_at ?? killSentAt,
        force_killed: supervision?.force_killed === true || killSentAt !== null,
        heartbeat_at: heartbeat_at || ended_at,
        trace_artifact_path: traceArtifact.artifact_path,
        trace_archive_path: traceArtifact.archive_path,
        stderr_artifact_path: stderrArtifact.artifact_path,
        stderr_archive_path: stderrArtifact.archive_path,
      });
    });
    if (timeoutPolicy.wall_clock_ms > 0) {
      wallTimer = setTimeout(() => {
        requestTimeout("wall_clock");
      }, timeoutPolicy.wall_clock_ms);
    }
    resetIdleTimer();
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
