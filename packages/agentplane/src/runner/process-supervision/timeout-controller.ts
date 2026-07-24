import { appendRunnerEvent } from "../artifacts.js";
import type { RunnerSupervisionState, RunnerTimeoutReason } from "../types.js";
import { createSupervisionClock } from "./clock.js";

type TimeoutRefState = {
  heartbeat_at: string;
  timeoutReason: RunnerTimeoutReason | null;
  timeoutRequestedAt: string | null;
  terminateSentAt: string | null;
  killSentAt: string | null;
};

export function createTimeoutController(opts: {
  pid: number | null;
  signal_pid: number | null;
  events_path: string;
  state_path: string;
  timeout_policy: {
    wall_clock_ms: number;
    idle_ms: number;
    terminate_grace_ms: number;
  };
  mutable: TimeoutRefState;
  is_settled: () => boolean;
  finish_with_error: (err: unknown) => void;
  assert_artifact_boundary?: () => Promise<void>;
  write_supervision_patch: (patch: Partial<RunnerSupervisionState>) => Promise<void>;
  reserve_termination?: (cause: "timeout") => boolean;
  commit_termination?: (cause: "timeout") => boolean;
  release_termination?: (cause: "timeout") => void;
  track_effect?: (effect: Promise<void>) => void;
  now_iso?: () => string;
}) {
  let idleTimer: NodeJS.Timeout | null = null;
  let wallTimer: NodeJS.Timeout | null = null;
  let killTimer: NodeJS.Timeout | null = null;
  const nowIso = opts.now_iso ?? createSupervisionClock().nowIso;

  const patchRunningSupervision = async (patch: Partial<RunnerSupervisionState>) =>
    await opts.write_supervision_patch(patch);

  const requestTimeout = (reason: RunnerTimeoutReason) => {
    if (opts.is_settled() || opts.mutable.timeoutReason) return;
    if (!opts.signal_pid) return;
    if (opts.reserve_termination && !opts.reserve_termination("timeout")) return;
    const requestedAt = nowIso();
    try {
      process.kill(opts.signal_pid, "SIGTERM");
    } catch (err) {
      opts.release_termination?.("timeout");
      if ((err as NodeJS.ErrnoException | null)?.code !== "ESRCH") {
        opts.finish_with_error(err);
      }
      return;
    }
    if (opts.commit_termination && !opts.commit_termination("timeout")) {
      opts.release_termination?.("timeout");
      return;
    }
    opts.mutable.timeoutReason = reason;
    opts.mutable.timeoutRequestedAt = requestedAt;
    opts.mutable.terminateSentAt = requestedAt;
    const timeoutRequestedAt = opts.mutable.timeoutRequestedAt;
    const patchEffect = patchRunningSupervision({
      timeout_reason: reason,
      timeout_requested_at: opts.mutable.timeoutRequestedAt,
      terminate_sent_at: opts.mutable.terminateSentAt,
      heartbeat_at: opts.mutable.timeoutRequestedAt,
    });
    opts.track_effect?.(patchEffect);
    void patchEffect.catch(opts.finish_with_error);
    const eventEffect = (async () => {
      await opts.assert_artifact_boundary?.();
      await appendRunnerEvent({
        events_path: opts.events_path,
        event: {
          at: timeoutRequestedAt,
          type: "runner_timeout_requested",
          message: `runner timeout requested (${reason})`,
          data: {
            reason,
            pid: opts.pid,
            timeout_policy: opts.timeout_policy,
          },
        },
      });
      await opts.assert_artifact_boundary?.();
    })();
    opts.track_effect?.(eventEffect);
    void eventEffect.catch(opts.finish_with_error);
    const graceMs = opts.timeout_policy.terminate_grace_ms;
    if (graceMs <= 0) {
      try {
        process.kill(opts.signal_pid, "SIGKILL");
      } catch (err) {
        if ((err as NodeJS.ErrnoException | null)?.code !== "ESRCH") opts.finish_with_error(err);
        return;
      }
      opts.mutable.killSentAt = nowIso();
      const killPatchEffect = patchRunningSupervision({
        timeout_reason: reason,
        timeout_requested_at: opts.mutable.timeoutRequestedAt,
        terminate_sent_at: opts.mutable.terminateSentAt,
        kill_sent_at: opts.mutable.killSentAt,
        force_killed: true,
        heartbeat_at: opts.mutable.killSentAt,
      });
      opts.track_effect?.(killPatchEffect);
      void killPatchEffect.catch(opts.finish_with_error);
      return;
    }
    killTimer = setTimeout(() => {
      if (opts.is_settled() || !opts.mutable.timeoutReason) return;
      try {
        process.kill(opts.signal_pid!, "SIGKILL");
      } catch (err) {
        if ((err as NodeJS.ErrnoException | null)?.code !== "ESRCH") opts.finish_with_error(err);
        return;
      }
      const killSentAt = nowIso();
      opts.mutable.killSentAt = killSentAt;
      const timeoutReason = opts.mutable.timeoutReason;
      const killPatchEffect = patchRunningSupervision({
        timeout_reason: opts.mutable.timeoutReason,
        timeout_requested_at: opts.mutable.timeoutRequestedAt,
        terminate_sent_at: opts.mutable.terminateSentAt,
        kill_sent_at: opts.mutable.killSentAt,
        force_killed: true,
        heartbeat_at: opts.mutable.killSentAt,
      });
      opts.track_effect?.(killPatchEffect);
      void killPatchEffect.catch(opts.finish_with_error);
      const killEventEffect = (async () => {
        await opts.assert_artifact_boundary?.();
        await appendRunnerEvent({
          events_path: opts.events_path,
          event: {
            at: killSentAt,
            type: "runner_timeout_force_kill",
            message: `runner force-killed after timeout (${timeoutReason})`,
            data: {
              reason: timeoutReason,
              pid: opts.pid,
              timeout_policy: opts.timeout_policy,
            },
          },
        });
        await opts.assert_artifact_boundary?.();
      })();
      opts.track_effect?.(killEventEffect);
      void killEventEffect.catch(opts.finish_with_error);
    }, graceMs);
  };

  return {
    clearTimers() {
      if (idleTimer) clearTimeout(idleTimer);
      if (wallTimer) clearTimeout(wallTimer);
      if (killTimer) clearTimeout(killTimer);
      idleTimer = null;
      wallTimer = null;
      killTimer = null;
    },

    requestTimeout,

    resetIdleTimer() {
      if (opts.timeout_policy.idle_ms <= 0 || opts.is_settled() || opts.mutable.timeoutReason) {
        return;
      }
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        requestTimeout("idle");
      }, opts.timeout_policy.idle_ms);
    },

    startWallClockTimer() {
      if (opts.timeout_policy.wall_clock_ms <= 0) return;
      wallTimer = setTimeout(() => {
        requestTimeout("wall_clock");
      }, opts.timeout_policy.wall_clock_ms);
    },
  };
}
