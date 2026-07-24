import type { RunnerProcessSignal, RunnerProcessTreeObservation } from "../types.js";
import { createSupervisionClock, monotonicNowMs } from "./clock.js";

const PROCESS_GROUP_POLL_MS = 20;
const PROCESS_GROUP_KILL_DRAIN_MS = 1000;
const POSIX_CONTAINMENT_LIMITATION =
  "POSIX process-group cleanup cannot observe or terminate descendants that create a new session or process group.";
const WINDOWS_CONTAINMENT_LIMITATION =
  "Direct-child supervision on Windows does not provide bounded descendant containment.";
const DIRECT_CHILD_CONTAINMENT_LIMITATION =
  "Direct-child cleanup does not provide bounded descendant containment.";

export type SupervisedDirectChild = {
  exitCode?: number | null;
  signalCode?: NodeJS.Signals | null;
  kill(this: void, signal?: NodeJS.Signals | number): boolean;
};

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

function isMissingProcess(error: unknown): boolean {
  return (error as NodeJS.ErrnoException | null)?.code === "ESRCH";
}

function processGroupTarget(groupId: number): number {
  return -Math.abs(groupId);
}

export function isPosixProcessGroupSupported(): boolean {
  return process.platform !== "win32";
}

export function supervisedProcessSignalTarget(pid: number | null): number | null {
  if (pid === null) return null;
  return isPosixProcessGroupSupported() ? processGroupTarget(pid) : pid;
}

function isProcessGroupAlive(groupId: number): boolean {
  try {
    process.kill(processGroupTarget(groupId), 0);
    return true;
  } catch (error) {
    if (isMissingProcess(error)) return false;
    if ((error as NodeJS.ErrnoException | null)?.code === "EPERM") return true;
    throw error;
  }
}

function signalProcessGroup(groupId: number, signal: RunnerProcessSignal): boolean {
  try {
    process.kill(processGroupTarget(groupId), signal);
    return true;
  } catch (error) {
    if (isMissingProcess(error)) return false;
    throw error;
  }
}

async function waitForProcessGroupExit(
  groupId: number,
  timeoutMs: number,
  readMonotonicNowMs: () => number,
): Promise<boolean> {
  const deadline = readMonotonicNowMs() + Math.max(0, timeoutMs);
  while (isProcessGroupAlive(groupId) && readMonotonicNowMs() < deadline) {
    const remaining = deadline - readMonotonicNowMs();
    await new Promise((resolve) =>
      setTimeout(resolve, Math.min(PROCESS_GROUP_POLL_MS, Math.max(1, remaining))),
    );
  }
  return !isProcessGroupAlive(groupId);
}

function isDirectChildExited(child: SupervisedDirectChild): boolean {
  return child.exitCode !== null && child.exitCode !== undefined
    ? true
    : child.signalCode !== null && child.signalCode !== undefined;
}

async function waitForDirectChildExit(
  child: SupervisedDirectChild,
  timeoutMs: number,
  readMonotonicNowMs: () => number,
): Promise<boolean> {
  const deadline = readMonotonicNowMs() + Math.max(0, timeoutMs);
  while (!isDirectChildExited(child) && readMonotonicNowMs() < deadline) {
    const remaining = deadline - readMonotonicNowMs();
    await new Promise((resolve) =>
      setTimeout(resolve, Math.min(PROCESS_GROUP_POLL_MS, Math.max(1, remaining))),
    );
  }
  return isDirectChildExited(child);
}

export async function cleanupSupervisedDirectChild(opts: {
  child: SupervisedDirectChild | null;
  terminate_grace_ms: number;
  containment_limitation?: string;
  now_iso?: () => string;
  monotonic_now_ms?: () => number;
}): Promise<RunnerProcessTreeObservation> {
  const nowIso = opts.now_iso ?? createSupervisionClock().nowIso;
  const readMonotonicNowMs = opts.monotonic_now_ms ?? monotonicNowMs;
  const completed = (patch: Partial<RunnerProcessTreeObservation>) => ({
    scope: "direct_child_only" as const,
    group_id: null,
    cleanup_state: "failed" as const,
    terminate_sent_at: null,
    kill_sent_at: null,
    completed_at: nowIso(),
    residual_alive: null,
    error: null,
    containment_state: "limited" as const,
    containment_limitation: opts.containment_limitation ?? DIRECT_CHILD_CONTAINMENT_LIMITATION,
    ...patch,
  });
  if (!opts.child) {
    return completed({
      error: "runner process did not expose a direct-child handle",
    });
  }
  if (isDirectChildExited(opts.child)) {
    return completed({
      cleanup_state: "not_needed",
      residual_alive: false,
    });
  }

  let terminateSentAt: string | null = null;
  let killSentAt: string | null = null;
  try {
    const terminateAttemptedAt = nowIso();
    if (!opts.child.kill("SIGTERM")) {
      const exited = await waitForDirectChildExit(opts.child, 0, readMonotonicNowMs);
      return completed({
        cleanup_state: exited ? "not_needed" : "failed",
        residual_alive: exited ? false : null,
        error: exited ? null : "direct child rejected SIGTERM",
      });
    }
    terminateSentAt = terminateAttemptedAt;
    if (await waitForDirectChildExit(opts.child, opts.terminate_grace_ms, readMonotonicNowMs)) {
      return completed({
        cleanup_state: "terminated",
        terminate_sent_at: terminateSentAt,
        residual_alive: false,
      });
    }

    const killAttemptedAt = nowIso();
    if (!opts.child.kill("SIGKILL")) {
      const exited = await waitForDirectChildExit(opts.child, 0, readMonotonicNowMs);
      return completed({
        cleanup_state: exited ? "terminated" : "failed",
        terminate_sent_at: terminateSentAt,
        residual_alive: exited ? false : null,
        error: exited ? null : "direct child rejected SIGKILL",
      });
    }
    killSentAt = killAttemptedAt;
    const exited = await waitForDirectChildExit(
      opts.child,
      PROCESS_GROUP_KILL_DRAIN_MS,
      readMonotonicNowMs,
    );
    return completed({
      cleanup_state: exited ? "force_killed" : "failed",
      terminate_sent_at: terminateSentAt,
      kill_sent_at: killSentAt,
      residual_alive: !exited,
      error: exited ? null : "direct child remained alive after SIGKILL drain timeout",
    });
  } catch (error) {
    if (isMissingProcess(error) || isDirectChildExited(opts.child)) {
      return completed({
        cleanup_state: terminateSentAt ? "terminated" : "not_needed",
        terminate_sent_at: terminateSentAt,
        kill_sent_at: killSentAt,
        residual_alive: false,
      });
    }
    return completed({
      terminate_sent_at: terminateSentAt,
      kill_sent_at: killSentAt,
      residual_alive: isDirectChildExited(opts.child) ? false : null,
      error: errorMessage(error),
    });
  }
}

export async function cleanupSupervisedProcessGroup(opts: {
  pid: number | null;
  child?: SupervisedDirectChild | null;
  terminate_grace_ms: number;
  now_iso?: () => string;
  monotonic_now_ms?: () => number;
}): Promise<RunnerProcessTreeObservation> {
  const nowIso = opts.now_iso ?? createSupervisionClock().nowIso;
  const readMonotonicNowMs = opts.monotonic_now_ms ?? monotonicNowMs;
  if (!isPosixProcessGroupSupported()) {
    return await cleanupSupervisedDirectChild({
      child: opts.child ?? null,
      terminate_grace_ms: opts.terminate_grace_ms,
      containment_limitation: WINDOWS_CONTAINMENT_LIMITATION,
      now_iso: nowIso,
      monotonic_now_ms: readMonotonicNowMs,
    });
  }
  if (opts.pid === null) {
    return await cleanupSupervisedDirectChild({
      child: opts.child ?? null,
      terminate_grace_ms: opts.terminate_grace_ms,
      now_iso: nowIso,
      monotonic_now_ms: readMonotonicNowMs,
    });
  }

  const groupId = opts.pid;
  let terminateSentAt: string | null = null;
  let killSentAt: string | null = null;
  try {
    if (!isProcessGroupAlive(groupId)) {
      return {
        scope: "posix_process_group",
        group_id: groupId,
        cleanup_state: "not_needed",
        terminate_sent_at: null,
        kill_sent_at: null,
        completed_at: nowIso(),
        residual_alive: false,
        error: null,
        containment_state: "limited",
        containment_limitation: POSIX_CONTAINMENT_LIMITATION,
      };
    }

    const terminateAttemptedAt = nowIso();
    if (!signalProcessGroup(groupId, "SIGTERM")) {
      return {
        scope: "posix_process_group",
        group_id: groupId,
        cleanup_state: "not_needed",
        terminate_sent_at: null,
        kill_sent_at: null,
        completed_at: nowIso(),
        residual_alive: false,
        error: null,
        containment_state: "limited",
        containment_limitation: POSIX_CONTAINMENT_LIMITATION,
      };
    }
    terminateSentAt = terminateAttemptedAt;
    if (await waitForProcessGroupExit(groupId, opts.terminate_grace_ms, readMonotonicNowMs)) {
      return {
        scope: "posix_process_group",
        group_id: groupId,
        cleanup_state: "terminated",
        terminate_sent_at: terminateSentAt,
        kill_sent_at: null,
        completed_at: nowIso(),
        residual_alive: false,
        error: null,
        containment_state: "limited",
        containment_limitation: POSIX_CONTAINMENT_LIMITATION,
      };
    }

    const killAttemptedAt = nowIso();
    if (!signalProcessGroup(groupId, "SIGKILL")) {
      return {
        scope: "posix_process_group",
        group_id: groupId,
        cleanup_state: "terminated",
        terminate_sent_at: terminateSentAt,
        kill_sent_at: null,
        completed_at: nowIso(),
        residual_alive: false,
        error: null,
        containment_state: "limited",
        containment_limitation: POSIX_CONTAINMENT_LIMITATION,
      };
    }
    killSentAt = killAttemptedAt;
    const exited = await waitForProcessGroupExit(
      groupId,
      PROCESS_GROUP_KILL_DRAIN_MS,
      readMonotonicNowMs,
    );
    return {
      scope: "posix_process_group",
      group_id: groupId,
      cleanup_state: exited ? "force_killed" : "failed",
      terminate_sent_at: terminateSentAt,
      kill_sent_at: killSentAt,
      completed_at: nowIso(),
      residual_alive: !exited,
      error: exited ? null : "process group remained alive after SIGKILL drain timeout",
      containment_state: "limited",
      containment_limitation: POSIX_CONTAINMENT_LIMITATION,
    };
  } catch (error) {
    if (opts.child) {
      const fallback = await cleanupSupervisedDirectChild({
        child: opts.child,
        terminate_grace_ms: opts.terminate_grace_ms,
        now_iso: nowIso,
        monotonic_now_ms: readMonotonicNowMs,
      });
      let residualAlive: true | null = null;
      try {
        residualAlive = isProcessGroupAlive(groupId) ? true : null;
      } catch {
        // The group cleanup failure remains authoritative and the residual is unknown.
      }
      const fallbackSummary =
        `direct-child fallback ended in ${fallback.cleanup_state}` +
        ` with residual_alive=${String(fallback.residual_alive)}` +
        (fallback.error ? ` (${fallback.error})` : "");
      return {
        scope: "posix_process_group",
        group_id: groupId,
        cleanup_state: "failed",
        terminate_sent_at: terminateSentAt,
        kill_sent_at: killSentAt,
        completed_at: fallback.completed_at,
        residual_alive: residualAlive,
        error: `process-group cleanup failed (${errorMessage(error)}); ${fallbackSummary}`,
        containment_state: "limited",
        containment_limitation: POSIX_CONTAINMENT_LIMITATION,
      };
    }
    let residualAlive: boolean | null = null;
    try {
      residualAlive = isProcessGroupAlive(groupId);
    } catch {
      // Preserve the primary cleanup failure.
    }
    return {
      scope: "posix_process_group",
      group_id: groupId,
      cleanup_state: "failed",
      terminate_sent_at: terminateSentAt,
      kill_sent_at: killSentAt,
      completed_at: nowIso(),
      residual_alive: residualAlive,
      error: errorMessage(error),
      containment_state: "limited",
      containment_limitation: POSIX_CONTAINMENT_LIMITATION,
    };
  }
}
