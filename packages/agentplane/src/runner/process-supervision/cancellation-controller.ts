import { appendRunnerEvent } from "../artifacts.js";
import type { RunnerProcessSignal, RunnerSupervisionState } from "../types.js";
import { createSupervisionClock } from "./clock.js";

type SignalableChildProcess = {
  kill: (signal?: NodeJS.Signals | number) => boolean;
};

type CancellationMutableState = {
  heartbeat_at: string;
  cancelRequestedAt: string | null;
  cancelSignal: RunnerProcessSignal | null;
  terminateSentAt: string | null;
  killSentAt: string | null;
};

export function createCancellationController(opts: {
  child: SignalableChildProcess;
  pid: number | null;
  events_path: string;
  terminate_grace_ms: number;
  read_intent?: () => Promise<{ requested_at: string; signal?: "SIGTERM" } | null>;
  mutable: CancellationMutableState;
  is_settled: () => boolean;
  finish_with_error: (error: unknown) => void;
  assert_artifact_boundary?: () => Promise<void>;
  write_supervision_patch?: (patch: Partial<RunnerSupervisionState>) => Promise<void>;
  poll_ms?: number;
  reserve_termination?: (cause: "cancel") => boolean;
  commit_termination?: (cause: "cancel") => boolean;
  release_termination?: (cause: "cancel") => void;
  track_effect?: (effect: Promise<void>) => void;
  now_iso?: () => string;
  advance_to_iso?: (timestamp: string) => void;
}) {
  let pollTimer: NodeJS.Timeout | null = null;
  let killTimer: NodeJS.Timeout | null = null;
  let polling = false;
  const nowIso = opts.now_iso ?? createSupervisionClock().nowIso;

  const appendSignalEvent = async (
    at: string,
    type: "runner_cancel_signal_sent" | "runner_cancel_force_kill_sent",
    signal: "SIGTERM" | "SIGKILL",
  ) => {
    await opts.assert_artifact_boundary?.();
    await appendRunnerEvent({
      events_path: opts.events_path,
      event: {
        at,
        type,
        message: `runner supervisor sent ${signal} to its owned child process`,
        data: {
          pid: opts.pid,
          signal,
          cancellation_requested_at: opts.mutable.cancelRequestedAt,
        },
      },
    });
    await opts.assert_artifact_boundary?.();
  };

  const forceKill = () => {
    if (opts.is_settled() || opts.mutable.killSentAt) return;
    const sentAt = nowIso();
    try {
      if (!opts.child.kill("SIGKILL")) return;
    } catch (error) {
      if ((error as NodeJS.ErrnoException | null)?.code === "ESRCH") return;
      opts.finish_with_error(error);
      return;
    }
    opts.mutable.killSentAt = sentAt;
    opts.mutable.cancelSignal = "SIGKILL";
    opts.mutable.heartbeat_at = sentAt;
    const patchEffect =
      opts.write_supervision_patch?.({
        cancel_requested_at: opts.mutable.cancelRequestedAt,
        cancel_signal: "SIGKILL",
        terminate_sent_at: opts.mutable.terminateSentAt,
        kill_sent_at: sentAt,
        force_killed: true,
        heartbeat_at: sentAt,
      }) ?? Promise.resolve();
    opts.track_effect?.(patchEffect);
    void patchEffect.catch(opts.finish_with_error);
    const eventEffect = appendSignalEvent(sentAt, "runner_cancel_force_kill_sent", "SIGKILL");
    opts.track_effect?.(eventEffect);
    void eventEffect.catch(opts.finish_with_error);
  };

  const requestCancellation = (requestedAt: string) => {
    if (opts.is_settled() || opts.mutable.cancelRequestedAt) return;
    if (opts.reserve_termination && !opts.reserve_termination("cancel")) return;
    opts.advance_to_iso?.(requestedAt);
    const sentAt = nowIso();
    try {
      if (!opts.child.kill("SIGTERM")) {
        opts.release_termination?.("cancel");
        return;
      }
    } catch (error) {
      opts.release_termination?.("cancel");
      if ((error as NodeJS.ErrnoException | null)?.code === "ESRCH") return;
      opts.finish_with_error(error);
      return;
    }
    if (opts.commit_termination && !opts.commit_termination("cancel")) {
      opts.release_termination?.("cancel");
      return;
    }
    opts.mutable.cancelRequestedAt = requestedAt;
    opts.mutable.cancelSignal = "SIGTERM";
    opts.mutable.terminateSentAt = sentAt;
    opts.mutable.heartbeat_at = sentAt;
    const patchEffect =
      opts.write_supervision_patch?.({
        cancel_requested_at: requestedAt,
        cancel_signal: "SIGTERM",
        terminate_sent_at: sentAt,
        heartbeat_at: sentAt,
      }) ?? Promise.resolve();
    opts.track_effect?.(patchEffect);
    void patchEffect.catch(opts.finish_with_error);
    const eventEffect = appendSignalEvent(sentAt, "runner_cancel_signal_sent", "SIGTERM");
    opts.track_effect?.(eventEffect);
    void eventEffect.catch(opts.finish_with_error);
    if (opts.terminate_grace_ms <= 0) {
      forceKill();
      return;
    }
    killTimer = setTimeout(forceKill, opts.terminate_grace_ms);
  };

  const poll = async () => {
    if (polling || opts.is_settled() || !opts.read_intent) return;
    polling = true;
    try {
      const intent = await opts.read_intent();
      if (intent) requestCancellation(intent.requested_at);
    } finally {
      polling = false;
    }
  };

  return {
    clearTimers() {
      if (pollTimer) clearInterval(pollTimer);
      if (killTimer) clearTimeout(killTimer);
      pollTimer = null;
      killTimer = null;
    },

    start() {
      if (!opts.read_intent || opts.is_settled()) return;
      void poll().catch(opts.finish_with_error);
      pollTimer = setInterval(() => void poll().catch(opts.finish_with_error), opts.poll_ms ?? 50);
    },

    async pollNow() {
      await poll();
    },
  };
}
