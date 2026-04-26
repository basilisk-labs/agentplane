import { startProcess } from "@agentplaneorg/core/process";

import {
  appendRunnerEvent,
  evolveRunnerRunState,
  readRunnerRunState,
  writeRunnerRunState,
} from "../artifacts.js";
import { finalizeTraceArtifact } from "../trace-artifacts.js";
import type { RunnerInvocation, RunnerProcessSignal, RunnerTimeoutReason } from "../types.js";
import { isProcessAlive, normalizeSignal } from "./signals.js";
import {
  buildInvocationEventData,
  mergeSupervisionState,
  renderInvocationCommand,
} from "./state.js";
import { createTraceSession } from "./trace-session.js";
import { createTimeoutController } from "./timeout-controller.js";

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

    const child = startProcess({
      command,
      args,
      cwd: opts.invocation.run_dir,
      env: { ...process.env, ...opts.invocation.env },
      stdin: "pipe",
      stdout: "pipe",
      stderr: "pipe",
    });

    const pid = typeof child.pid === "number" ? child.pid : null;
    const started_at = new Date().toISOString();
    let heartbeat_at = started_at;
    let stdout_tail = "";
    let stderr_tail = "";
    let stdout_bytes = 0;
    let stderr_bytes = 0;
    let settled = false;
    const tracePolicy = opts.invocation.trace_policy;
    const timeoutPolicy = opts.invocation.timeout_policy;
    const redactPatterns = tracePolicy.redact_patterns ?? [];
    let timeoutReason: RunnerTimeoutReason | null = null;
    let timeoutRequestedAt: string | null = null;
    let terminateSentAt: string | null = null;
    let killSentAt: string | null = null;
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
      timeoutController.clearTimers();
      settled = true;
      void rejectAfterBufferedFlush(err);
    };

    const rejectAfterBufferedFlush = async (err: unknown) => {
      await traceSession.flushWritersSettled();
      reject(err instanceof Error ? err : new Error(String(err)));
    };
    const traceSession = createTraceSession({
      adapter_id: opts.invocation.adapter_id,
      trace_path: opts.invocation.trace_path,
      stderr_path: opts.invocation.stderr_path,
      trace_mode: tracePolicy.mode,
      capture_stderr: tracePolicy.capture_stderr,
      max_tail_bytes: tracePolicy.max_tail_bytes,
      redact_patterns: redactPatterns,
      on_error: finishWithError,
      on_activity: () => {
        heartbeat_at = new Date().toISOString();
        timeoutController.resetIdleTimer();
      },
    });
    const timeoutController = createTimeoutController({
      pid,
      events_path: opts.invocation.events_path,
      state_path: opts.invocation.state_path,
      timeout_policy: timeoutPolicy,
      mutable: {
        get heartbeat_at() {
          return heartbeat_at;
        },
        set heartbeat_at(value: string) {
          heartbeat_at = value;
        },
        get timeoutReason() {
          return timeoutReason;
        },
        set timeoutReason(value: RunnerTimeoutReason | null) {
          timeoutReason = value;
        },
        get timeoutRequestedAt() {
          return timeoutRequestedAt;
        },
        set timeoutRequestedAt(value: string | null) {
          timeoutRequestedAt = value;
        },
        get terminateSentAt() {
          return terminateSentAt;
        },
        set terminateSentAt(value: string | null) {
          terminateSentAt = value;
        },
        get killSentAt() {
          return killSentAt;
        },
        set killSentAt(value: string | null) {
          killSentAt = value;
        },
      },
      is_settled: () => settled,
      finish_with_error: finishWithError,
    });

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

    child.stdout?.on("data", (chunk: Buffer | string) => {
      traceSession.onStdoutData(chunk);
      ({ stdout_tail, stderr_tail, stdout_bytes, stderr_bytes } = traceSession.getResult());
    });
    child.stderr?.on("data", (chunk: Buffer | string) => {
      traceSession.onStderrData(chunk);
      ({ stdout_tail, stderr_tail, stdout_bytes, stderr_bytes } = traceSession.getResult());
    });
    void child.on("error", finishWithError);
    void child.on("close", (code, signal) => {
      void (async () => {
        if (settled) return;
        timeoutController.clearTimers();
        const ended_at = new Date().toISOString();
        traceSession.flushPendingLines();
        await traceSession.flushWriters();
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
      })().catch(finishWithError);
    });
    timeoutController.startWallClockTimer();
    timeoutController.resetIdleTimer();
    child.stdin?.end(opts.stdin_text);
  });
}
