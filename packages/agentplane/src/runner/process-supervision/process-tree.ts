import type { RunnerProcessSignal, RunnerProcessTreeObservation } from "../types.js";

const PROCESS_GROUP_POLL_MS = 20;
const PROCESS_GROUP_KILL_DRAIN_MS = 1000;
const POSIX_CONTAINMENT_LIMITATION =
  "POSIX process-group cleanup cannot observe or terminate descendants that create a new session or process group.";
const WINDOWS_CONTAINMENT_LIMITATION =
  "Direct-child supervision on Windows does not provide bounded descendant containment.";

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

async function waitForProcessGroupExit(groupId: number, timeoutMs: number): Promise<boolean> {
  const deadline = Date.now() + Math.max(0, timeoutMs);
  while (isProcessGroupAlive(groupId) && Date.now() < deadline) {
    const remaining = deadline - Date.now();
    await new Promise((resolve) =>
      setTimeout(resolve, Math.min(PROCESS_GROUP_POLL_MS, Math.max(1, remaining))),
    );
  }
  return !isProcessGroupAlive(groupId);
}

export async function cleanupSupervisedProcessGroup(opts: {
  pid: number | null;
  terminate_grace_ms: number;
}): Promise<RunnerProcessTreeObservation> {
  if (!isPosixProcessGroupSupported()) {
    return {
      scope: "direct_child_only",
      group_id: null,
      cleanup_state: "unsupported",
      terminate_sent_at: null,
      kill_sent_at: null,
      completed_at: new Date().toISOString(),
      residual_alive: null,
      error: "process-group cleanup is not supported on Windows",
      containment_state: "limited",
      containment_limitation: WINDOWS_CONTAINMENT_LIMITATION,
    };
  }
  if (opts.pid === null) {
    return {
      scope: "posix_process_group",
      group_id: null,
      cleanup_state: "failed",
      terminate_sent_at: null,
      kill_sent_at: null,
      completed_at: new Date().toISOString(),
      residual_alive: null,
      error: "runner process did not expose a process-group id",
      containment_state: "limited",
      containment_limitation: POSIX_CONTAINMENT_LIMITATION,
    };
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
        completed_at: new Date().toISOString(),
        residual_alive: false,
        error: null,
        containment_state: "limited",
        containment_limitation: POSIX_CONTAINMENT_LIMITATION,
      };
    }

    const terminateAttemptedAt = new Date().toISOString();
    if (!signalProcessGroup(groupId, "SIGTERM")) {
      return {
        scope: "posix_process_group",
        group_id: groupId,
        cleanup_state: "not_needed",
        terminate_sent_at: null,
        kill_sent_at: null,
        completed_at: new Date().toISOString(),
        residual_alive: false,
        error: null,
        containment_state: "limited",
        containment_limitation: POSIX_CONTAINMENT_LIMITATION,
      };
    }
    terminateSentAt = terminateAttemptedAt;
    if (await waitForProcessGroupExit(groupId, opts.terminate_grace_ms)) {
      return {
        scope: "posix_process_group",
        group_id: groupId,
        cleanup_state: "terminated",
        terminate_sent_at: terminateSentAt,
        kill_sent_at: null,
        completed_at: new Date().toISOString(),
        residual_alive: false,
        error: null,
        containment_state: "limited",
        containment_limitation: POSIX_CONTAINMENT_LIMITATION,
      };
    }

    const killAttemptedAt = new Date().toISOString();
    if (!signalProcessGroup(groupId, "SIGKILL")) {
      return {
        scope: "posix_process_group",
        group_id: groupId,
        cleanup_state: "terminated",
        terminate_sent_at: terminateSentAt,
        kill_sent_at: null,
        completed_at: new Date().toISOString(),
        residual_alive: false,
        error: null,
        containment_state: "limited",
        containment_limitation: POSIX_CONTAINMENT_LIMITATION,
      };
    }
    killSentAt = killAttemptedAt;
    const exited = await waitForProcessGroupExit(groupId, PROCESS_GROUP_KILL_DRAIN_MS);
    return {
      scope: "posix_process_group",
      group_id: groupId,
      cleanup_state: exited ? "force_killed" : "failed",
      terminate_sent_at: terminateSentAt,
      kill_sent_at: killSentAt,
      completed_at: new Date().toISOString(),
      residual_alive: !exited,
      error: exited ? null : "process group remained alive after SIGKILL drain timeout",
      containment_state: "limited",
      containment_limitation: POSIX_CONTAINMENT_LIMITATION,
    };
  } catch (error) {
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
      completed_at: new Date().toISOString(),
      residual_alive: residualAlive,
      error: errorMessage(error),
      containment_state: "limited",
      containment_limitation: POSIX_CONTAINMENT_LIMITATION,
    };
  }
}
