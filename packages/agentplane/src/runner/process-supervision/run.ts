import { startProcess } from "@agentplaneorg/core/process";

import {
  appendRunnerEvent,
  evolveRunnerRunState,
  readRunnerRunState,
  writeRunnerRunState,
} from "../artifacts.js";
import { finalizeTraceArtifact } from "../trace-artifacts.js";
import type {
  RunnerInvocation,
  RunnerProcessSignal,
  RunnerProcessTreeObservation,
  RunnerSupervisionState,
  RunnerTimeoutReason,
} from "../types.js";
import {
  cleanupSupervisedProcessGroup,
  isPosixProcessGroupSupported,
  supervisedProcessSignalTarget,
} from "./process-tree.js";
import { createCancellationController } from "./cancellation-controller.js";
import { createSupervisionClock, type SupervisionClock } from "./clock.js";
import { normalizeSignal, readObservedProcessIdentity } from "./signals.js";
import {
  buildInvocationEventData,
  mergeSupervisionState,
  renderInvocationCommand,
} from "./state.js";
import { createTraceSession } from "./trace-session.js";
import { createTimeoutController } from "./timeout-controller.js";
import { createRunnerTerminationArbiter } from "./termination-arbiter.js";

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
  process_tree: RunnerProcessTreeObservation;
  heartbeat_at: string;
  trace_artifact_path: string | null;
  trace_archive_path: string | null;
  stderr_artifact_path: string | null;
  stderr_archive_path: string | null;
};

export class SupervisedProcessExecutionError extends Error {
  constructor(
    readonly primary_error: Error,
    readonly process_result: SupervisedProcessResult,
  ) {
    super(primary_error.message, { cause: primary_error });
    this.name = "SupervisedProcessExecutionError";
  }
}

function errorFromUnknown(error: unknown): Error {
  return error instanceof Error ? error : new Error(String(error));
}

export async function runSupervisedProcess(opts: {
  invocation: RunnerInvocation;
  stdin_text: string;
  start_message: string;
  observe_stdout_line?: (rawLine: string) => void;
  read_cancellation_intent?: () => Promise<{
    requested_at: string;
    signal?: "SIGTERM";
  } | null>;
  assert_artifact_boundary?: (phase: string) => Promise<void>;
  max_output_bytes?: number;
  clock?: SupervisionClock;
}): Promise<SupervisedProcessResult> {
  if (
    opts.max_output_bytes !== undefined &&
    (!Number.isSafeInteger(opts.max_output_bytes) || opts.max_output_bytes < 1)
  ) {
    throw new Error("Runner max_output_bytes must be a positive integer.");
  }
  await opts.assert_artifact_boundary?.("immediately before spawning child process");
  const clock = opts.clock ?? createSupervisionClock();
  return await new Promise((resolve, reject) => {
    const [command, ...args] = opts.invocation.argv;
    if (!command) {
      reject(new Error("Runner invocation is missing the executable command"));
      return;
    }

    const child = startProcess({
      command,
      args,
      cwd: opts.invocation.repository_root,
      env: { ...process.env, ...opts.invocation.env },
      stdin: "pipe",
      stdout: "pipe",
      stderr: "pipe",
      detached: isPosixProcessGroupSupported(),
    });

    const pid = typeof child.pid === "number" ? child.pid : null;
    const started_at = clock.nowIso();
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
    let cancelRequestedAt: string | null = null;
    let cancelSignal: RunnerProcessSignal | null = null;
    let processGroupCleanupPromise: Promise<RunnerProcessTreeObservation> | null = null;
    let cancellationController: ReturnType<typeof createCancellationController> | null = null;
    let runningStateReady: Promise<void> = Promise.resolve();
    let stateWriteTail: Promise<void> = Promise.resolve();
    let acceptsSupervisionPatches = true;
    const terminationArbiter = createRunnerTerminationArbiter();
    const controlEffects = new Set<Promise<void>>();
    const trackControlEffect = (effect: Promise<void>): void => {
      controlEffects.add(effect);
      void effect.finally(() => controlEffects.delete(effect)).catch(() => null);
    };
    const drainControlEffects = async (): Promise<void> => {
      while (controlEffects.size > 0) {
        await Promise.allSettled(controlEffects);
      }
    };
    const serializeStateWrite = async <T>(write: () => Promise<T>): Promise<T> => {
      const previous = stateWriteTail;
      let release!: () => void;
      stateWriteTail = new Promise<void>((resolve) => {
        release = resolve;
      });
      await previous;
      try {
        return await write();
      } finally {
        release();
      }
    };
    const writeRunningSupervisionPatch = async (
      patch: Partial<RunnerSupervisionState>,
      source: "cancellation" | "timeout",
    ): Promise<void> => {
      if (!acceptsSupervisionPatches) return;
      await serializeStateWrite(async () => {
        await opts.assert_artifact_boundary?.(`before writing ${source} state`);
        const currentState = await readRunnerRunState(opts.invocation.state_path);
        if (currentState?.status !== "running") return;
        await writeRunnerRunState({
          state_path: opts.invocation.state_path,
          state: evolveRunnerRunState({
            state: currentState,
            status: "running",
            updated_at: clock.nowIso(),
            supervision: mergeSupervisionState(currentState.supervision, patch),
          }),
        });
        await opts.assert_artifact_boundary?.(`after writing ${source} state`);
      });
    };
    const startProcessGroupCleanup = (): Promise<RunnerProcessTreeObservation> => {
      processGroupCleanupPromise ??= cleanupSupervisedProcessGroup({
        pid,
        child,
        terminate_grace_ms: timeoutPolicy.terminate_grace_ms,
        now_iso: clock.nowIso,
        monotonic_now_ms: clock.monotonicNowMs,
      });
      return processGroupCleanupPromise;
    };
    const updateRunningState = async () => {
      await opts.assert_artifact_boundary?.("before recording process start");
      const initialState = await readRunnerRunState(opts.invocation.state_path);
      if (!initialState) return;
      if (initialState.status !== "prepared") {
        throw new Error(
          `Runner process start cannot overwrite state=${initialState.status} ` +
            `for run_id=${opts.invocation.run_id}.`,
        );
      }
      clock.advanceToIso(initialState.updated_at);
      const observedIdentity =
        pid === null ? null : await readObservedProcessIdentity(pid).catch(() => null);
      const processIdentity =
        observedIdentity?.command && observedIdentity.started_at
          ? {
              pid: observedIdentity.pid,
              command: observedIdentity.command,
              started_at: observedIdentity.started_at,
              observed_at: clock.nowIso(),
            }
          : null;
      const runningStateAt = clock.nowIso();
      const supervision = mergeSupervisionState(initialState.supervision, {
        pid,
        command: renderInvocationCommand(opts.invocation),
        started_at,
        process_identity: processIdentity,
        heartbeat_at,
        exit_signal: null,
        timeout_reason: null,
      });
      await writeRunnerRunState({
        state_path: opts.invocation.state_path,
        state: evolveRunnerRunState({
          state: initialState,
          status: "running",
          updated_at: runningStateAt,
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
      await opts.assert_artifact_boundary?.("after recording process start");
    };

    const finishWithError = (err: unknown) => {
      if (settled) return;
      acceptsSupervisionPatches = false;
      timeoutController.clearTimers();
      cancellationController?.clearTimers();
      settled = true;
      void rejectAfterBufferedFlush(err);
    };

    const rejectAfterBufferedFlush = async (err: unknown) => {
      const primaryError = errorFromUnknown(err);
      try {
        await runningStateReady;
      } catch {
        // The original running-state failure remains the primary error.
      }
      await stateWriteTail;
      await drainControlEffects();
      let processGroupObservation: RunnerProcessTreeObservation;
      try {
        processGroupObservation = await startProcessGroupCleanup();
      } catch (cleanupError) {
        const completedAt = clock.nowIso();
        processGroupObservation = {
          scope:
            isPosixProcessGroupSupported() && pid !== null
              ? "posix_process_group"
              : "direct_child_only",
          group_id: isPosixProcessGroupSupported() ? pid : null,
          cleanup_state: "failed",
          terminate_sent_at: terminateSentAt,
          kill_sent_at: killSentAt,
          completed_at: completedAt,
          residual_alive: null,
          error: `process cleanup observation failed: ${errorFromUnknown(cleanupError).message}`,
          containment_state: "limited",
          containment_limitation:
            "The supervisor could not complete its process-tree cleanup observation.",
        };
      }
      try {
        traceSession.flushPendingLines();
      } catch {
        // The original supervision error remains primary.
      }
      await traceSession.flushWritersSettled();
      ({ stdout_tail, stderr_tail, stdout_bytes, stderr_bytes } = traceSession.getResult());
      let traceArtifactPath: string | null = null;
      let traceArchivePath: string | null = null;
      let stderrArtifactPath: string | null = null;
      let stderrArchivePath: string | null = null;
      try {
        const traceArtifact = await finalizeTraceArtifact({
          file_path: opts.invocation.trace_path,
          policy: tracePolicy,
          run_status: "failed",
          defer_removal: true,
        });
        traceArtifactPath = traceArtifact.artifact_path;
        traceArchivePath = traceArtifact.archive_path;
      } catch {
        // The original supervision error remains primary.
      }
      try {
        const stderrArtifact = await finalizeTraceArtifact({
          file_path: opts.invocation.stderr_path,
          policy: tracePolicy,
          run_status: "failed",
          defer_removal: true,
        });
        stderrArtifactPath = stderrArtifact.artifact_path;
        stderrArchivePath = stderrArtifact.archive_path;
      } catch {
        // The original supervision error remains primary.
      }
      let currentState: Awaited<ReturnType<typeof readRunnerRunState>> = null;
      try {
        currentState = await readRunnerRunState(opts.invocation.state_path);
      } catch {
        // The original supervision error remains primary.
      }
      const supervision = currentState?.supervision;
      const endedAt = processGroupObservation.completed_at;
      const processResult: SupervisedProcessResult = {
        exit_code: typeof child.exitCode === "number" ? child.exitCode : null,
        exit_signal: normalizeSignal(child.signalCode),
        stdout_tail,
        stderr_tail,
        stdout_bytes,
        stderr_bytes,
        pid,
        started_at,
        ended_at: endedAt,
        cancel_requested_at: supervision?.cancel_requested_at ?? cancelRequestedAt,
        cancel_signal: supervision?.cancel_signal ?? cancelSignal,
        timeout_reason: supervision?.timeout_reason ?? timeoutReason,
        timeout_requested_at: supervision?.timeout_requested_at ?? timeoutRequestedAt,
        terminate_sent_at:
          supervision?.terminate_sent_at ??
          terminateSentAt ??
          processGroupObservation.terminate_sent_at,
        kill_sent_at:
          supervision?.kill_sent_at ?? killSentAt ?? processGroupObservation.kill_sent_at,
        force_killed:
          supervision?.force_killed === true ||
          killSentAt !== null ||
          processGroupObservation.kill_sent_at !== null,
        process_tree: processGroupObservation,
        heartbeat_at: heartbeat_at || endedAt,
        trace_artifact_path: traceArtifactPath,
        trace_archive_path: traceArchivePath,
        stderr_artifact_path: stderrArtifactPath,
        stderr_archive_path: stderrArchivePath,
      };
      reject(new SupervisedProcessExecutionError(primaryError, processResult));
    };
    const traceSession = createTraceSession({
      adapter_id: opts.invocation.adapter_id,
      trace_path: opts.invocation.trace_path,
      stderr_path: opts.invocation.stderr_path,
      trace_mode: tracePolicy.mode,
      capture_stderr: tracePolicy.capture_stderr,
      max_tail_bytes: tracePolicy.max_tail_bytes,
      ...(opts.max_output_bytes === undefined ? {} : { max_output_bytes: opts.max_output_bytes }),
      redact_patterns: redactPatterns,
      on_error: finishWithError,
      on_activity: () => {
        heartbeat_at = clock.nowIso();
        timeoutController.resetIdleTimer();
      },
      on_stdout_line: opts.observe_stdout_line,
      assert_artifact_boundary: async () =>
        await opts.assert_artifact_boundary?.("before writing process trace"),
      now_iso: clock.nowIso,
    });
    const controllerMutableState = {
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
      get cancelRequestedAt() {
        return cancelRequestedAt;
      },
      set cancelRequestedAt(value: string | null) {
        cancelRequestedAt = value;
      },
      get cancelSignal() {
        return cancelSignal;
      },
      set cancelSignal(value: RunnerProcessSignal | null) {
        cancelSignal = value;
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
    };
    const timeoutController = createTimeoutController({
      pid,
      signal_pid: supervisedProcessSignalTarget(pid),
      events_path: opts.invocation.events_path,
      state_path: opts.invocation.state_path,
      timeout_policy: timeoutPolicy,
      mutable: controllerMutableState,
      is_settled: () => settled,
      finish_with_error: finishWithError,
      assert_artifact_boundary: async () =>
        await opts.assert_artifact_boundary?.("before writing timeout state"),
      write_supervision_patch: async (patch) =>
        await writeRunningSupervisionPatch(patch, "timeout"),
      reserve_termination: (cause) => terminationArbiter.reserve(cause),
      commit_termination: (cause) => terminationArbiter.commit(cause),
      release_termination: (cause) => terminationArbiter.release(cause),
      track_effect: trackControlEffect,
      now_iso: clock.nowIso,
    });
    cancellationController = createCancellationController({
      child,
      pid,
      events_path: opts.invocation.events_path,
      terminate_grace_ms: timeoutPolicy.terminate_grace_ms,
      read_intent: opts.read_cancellation_intent,
      mutable: controllerMutableState,
      is_settled: () => settled,
      finish_with_error: finishWithError,
      assert_artifact_boundary: async () =>
        await opts.assert_artifact_boundary?.("before handling cancellation intent"),
      write_supervision_patch: async (patch) =>
        await writeRunningSupervisionPatch(patch, "cancellation"),
      reserve_termination: (cause) => terminationArbiter.reserve(cause),
      commit_termination: (cause) => terminationArbiter.commit(cause),
      release_termination: (cause) => terminationArbiter.release(cause),
      track_effect: trackControlEffect,
      now_iso: clock.nowIso,
      advance_to_iso: clock.advanceToIso,
    });

    runningStateReady = serializeStateWrite(updateRunningState);
    void runningStateReady.catch(finishWithError);

    child.stdout?.on("data", (chunk: Buffer | string) => {
      traceSession.onStdoutData(chunk);
      ({ stdout_tail, stderr_tail, stdout_bytes, stderr_bytes } = traceSession.getResult());
    });
    child.stderr?.on("data", (chunk: Buffer | string) => {
      traceSession.onStderrData(chunk);
      ({ stdout_tail, stderr_tail, stdout_bytes, stderr_bytes } = traceSession.getResult());
    });
    void child.on("error", finishWithError);
    void child.on("exit", () => {
      terminationArbiter.claimExit();
      timeoutController.clearTimers();
      cancellationController?.clearTimers();
      void startProcessGroupCleanup();
    });
    void child.on("close", (code, signal) => {
      void (async () => {
        try {
          await runningStateReady;
        } catch {
          return;
        }
        if (settled) return;
        acceptsSupervisionPatches = false;
        timeoutController.clearTimers();
        cancellationController?.clearTimers();
        await stateWriteTail;
        await drainControlEffects();
        const processGroupObservation = await startProcessGroupCleanup();
        const ended_at = processGroupObservation.completed_at;
        traceSession.flushPendingLines();
        await traceSession.flushWriters();
        if (settled) return;
        await opts.assert_artifact_boundary?.("before finalizing process artifacts");
        const normalizedSignal = normalizeSignal(signal);
        const currentState = await readRunnerRunState(opts.invocation.state_path);
        const supervision = currentState?.supervision;
        const terminationCause = terminationArbiter.cause();
        const finalCancelRequestedAt =
          terminationCause === "cancel"
            ? (supervision?.cancel_requested_at ?? cancelRequestedAt ?? null)
            : null;
        const finalCancelSignal = supervision?.cancel_signal ?? cancelSignal ?? null;
        const finalTimeoutReason =
          terminationCause === "timeout" ? (supervision?.timeout_reason ?? timeoutReason) : null;
        const runStatus: "success" | "failed" | "cancelled" =
          terminationCause === "cancel"
            ? "cancelled"
            : terminationCause === "timeout"
              ? "failed"
              : code === 0
                ? "success"
                : "failed";
        const [traceArtifact, stderrArtifact] = await Promise.all([
          finalizeTraceArtifact({
            file_path: opts.invocation.trace_path,
            policy: tracePolicy,
            run_status: runStatus,
            defer_removal: true,
          }),
          finalizeTraceArtifact({
            file_path: opts.invocation.stderr_path,
            policy: tracePolicy,
            run_status: runStatus,
            defer_removal: true,
          }),
        ]);
        await opts.assert_artifact_boundary?.("after finalizing process artifacts");
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
          cancel_requested_at: finalCancelRequestedAt,
          cancel_signal: finalCancelSignal,
          timeout_reason: finalTimeoutReason,
          timeout_requested_at: supervision?.timeout_requested_at ?? timeoutRequestedAt,
          terminate_sent_at: supervision?.terminate_sent_at ?? terminateSentAt,
          kill_sent_at: supervision?.kill_sent_at ?? killSentAt,
          force_killed: supervision?.force_killed === true || killSentAt !== null,
          process_tree: processGroupObservation,
          heartbeat_at: heartbeat_at || ended_at,
          trace_artifact_path: traceArtifact.artifact_path,
          trace_archive_path: traceArtifact.archive_path,
          stderr_artifact_path: stderrArtifact.artifact_path,
          stderr_archive_path: stderrArtifact.archive_path,
        });
      })().catch(finishWithError);
    });
    void runningStateReady
      .then(() => {
        if (settled) return null;
        timeoutController.startWallClockTimer();
        timeoutController.resetIdleTimer();
        cancellationController?.start();
        child.stdin?.end(opts.stdin_text);
        return null;
      })
      .catch(() => null);
  });
}
