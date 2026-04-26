import {
  appendRunnerEvent,
  evolveRunnerRunState,
  readRunnerRunState,
  writeRunnerRunState,
} from "../artifacts.js";
import type { RunnerSupervisionState, RunnerTimeoutReason } from "../types.js";
import { isProcessAlive } from "./signals.js";
import { mergeSupervisionState } from "./state.js";

type TimeoutRefState = {
  heartbeat_at: string;
  timeoutReason: RunnerTimeoutReason | null;
  timeoutRequestedAt: string | null;
  terminateSentAt: string | null;
  killSentAt: string | null;
};

export function createTimeoutController(opts: {
  pid: number | null;
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
}) {
  let idleTimer: NodeJS.Timeout | null = null;
  let wallTimer: NodeJS.Timeout | null = null;
  let killTimer: NodeJS.Timeout | null = null;

  const patchRunningSupervision = async (patch: Partial<RunnerSupervisionState>) => {
    const currentState = await readRunnerRunState(opts.state_path);
    if (!currentState) return;
    await writeRunnerRunState({
      state_path: opts.state_path,
      state: evolveRunnerRunState({
        state: currentState,
        status: currentState.status,
        updated_at: new Date().toISOString(),
        supervision: mergeSupervisionState(currentState.supervision, patch),
      }),
    });
  };

  const requestTimeout = (reason: RunnerTimeoutReason) => {
    if (opts.is_settled() || opts.mutable.timeoutReason) return;
    opts.mutable.timeoutReason = reason;
    opts.mutable.timeoutRequestedAt = new Date().toISOString();
    opts.mutable.terminateSentAt = opts.mutable.timeoutRequestedAt;
    void patchRunningSupervision({
      timeout_reason: reason,
      timeout_requested_at: opts.mutable.timeoutRequestedAt,
      terminate_sent_at: opts.mutable.terminateSentAt,
      heartbeat_at: opts.mutable.timeoutRequestedAt,
    }).catch(opts.finish_with_error);
    void appendRunnerEvent({
      events_path: opts.events_path,
      event: {
        at: opts.mutable.timeoutRequestedAt,
        type: "runner_timeout_requested",
        message: `runner timeout requested (${reason})`,
        data: {
          reason,
          pid: opts.pid,
          timeout_policy: opts.timeout_policy,
        },
      },
    }).catch(opts.finish_with_error);
    if (opts.pid && isProcessAlive(opts.pid)) {
      try {
        process.kill(opts.pid, "SIGTERM");
      } catch (err) {
        const code = (err as NodeJS.ErrnoException | null)?.code;
        if (code !== "ESRCH") {
          opts.finish_with_error(err);
          return;
        }
      }
    }
    const graceMs = opts.timeout_policy.terminate_grace_ms;
    if (graceMs <= 0) {
      opts.mutable.killSentAt = new Date().toISOString();
      void patchRunningSupervision({
        timeout_reason: reason,
        timeout_requested_at: opts.mutable.timeoutRequestedAt,
        terminate_sent_at: opts.mutable.terminateSentAt,
        kill_sent_at: opts.mutable.killSentAt,
        force_killed: true,
        heartbeat_at: opts.mutable.killSentAt,
      }).catch(opts.finish_with_error);
      if (opts.pid && isProcessAlive(opts.pid)) {
        try {
          process.kill(opts.pid, "SIGKILL");
        } catch (err) {
          const code = (err as NodeJS.ErrnoException | null)?.code;
          if (code !== "ESRCH") {
            opts.finish_with_error(err);
          }
        }
      }
      return;
    }
    killTimer = setTimeout(() => {
      if (opts.is_settled() || !opts.mutable.timeoutReason) return;
      opts.mutable.killSentAt = new Date().toISOString();
      void patchRunningSupervision({
        timeout_reason: opts.mutable.timeoutReason,
        timeout_requested_at: opts.mutable.timeoutRequestedAt,
        terminate_sent_at: opts.mutable.terminateSentAt,
        kill_sent_at: opts.mutable.killSentAt,
        force_killed: true,
        heartbeat_at: opts.mutable.killSentAt,
      }).catch(opts.finish_with_error);
      void appendRunnerEvent({
        events_path: opts.events_path,
        event: {
          at: opts.mutable.killSentAt,
          type: "runner_timeout_force_kill",
          message: `runner force-killed after timeout (${opts.mutable.timeoutReason})`,
          data: {
            reason: opts.mutable.timeoutReason,
            pid: opts.pid,
            timeout_policy: opts.timeout_policy,
          },
        },
      }).catch(opts.finish_with_error);
      if (opts.pid && isProcessAlive(opts.pid)) {
        try {
          process.kill(opts.pid, "SIGKILL");
        } catch (err) {
          const code = (err as NodeJS.ErrnoException | null)?.code;
          if (code !== "ESRCH") {
            opts.finish_with_error(err);
          }
        }
      }
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
