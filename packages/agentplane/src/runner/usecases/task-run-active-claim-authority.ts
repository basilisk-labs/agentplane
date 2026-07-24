import { isProcessAlive, readObservedProcessIdentity } from "../process-supervision/signals.js";
import { RunnerRunRepository } from "../run-repository.js";
import { readRunnerChildSpawnClaim } from "../adapters/execution-control.js";
import type { RunnerProcessTreeObservation } from "../types.js";

import type { TaskRunnerActiveClaim } from "./task-run-active-claim.js";

export type TaskRunnerActiveClaimOwnerStatus = "active" | "stale" | "unverified";

export type TaskRunnerClaimedRunAuthority =
  | "absent"
  | "terminal"
  | "terminal_cleanup_unverified"
  | "incomplete_pre_provider"
  | "prepared"
  | "spawn_authorized_but_unconfirmed"
  | "running_child_active"
  | "running_child_dead"
  | "running_child_mismatch"
  | "running_child_unverified";

export type TaskRunnerActiveClaimAuthorityPaths = {
  git_root: string;
  workflow_dir: string;
  task_id: string;
};

function isManagedScopeCleanupConfirmed(
  processTree: RunnerProcessTreeObservation | undefined,
): boolean {
  return (
    processTree?.residual_alive === false &&
    processTree.error === null &&
    (processTree.cleanup_state === "not_needed" ||
      processTree.cleanup_state === "terminated" ||
      processTree.cleanup_state === "force_killed") &&
    (processTree.scope === "posix_process_group"
      ? typeof processTree.group_id === "number" && processTree.group_id > 0
      : processTree.group_id === null)
  );
}

export async function inspectTaskRunnerActiveClaimOwner(
  claim: TaskRunnerActiveClaim,
): Promise<TaskRunnerActiveClaimOwnerStatus> {
  return await inspectTaskRunnerOwnerIdentity(claim);
}

export async function inspectTaskRunnerOwnerIdentity(identity: {
  owner_pid: number;
  owner_command: string | null;
  owner_started_at: string | null;
}): Promise<TaskRunnerActiveClaimOwnerStatus> {
  let observed: Awaited<ReturnType<typeof readObservedProcessIdentity>>;
  try {
    observed = await readObservedProcessIdentity(identity.owner_pid);
  } catch {
    return isProcessAlive(identity.owner_pid) ? "unverified" : "stale";
  }
  if (!observed) {
    return isProcessAlive(identity.owner_pid) ? "unverified" : "stale";
  }
  if (!identity.owner_command || !identity.owner_started_at) return "unverified";
  if (!observed.command || !observed.started_at) return "unverified";
  return observed.command === identity.owner_command &&
    observed.started_at === identity.owner_started_at
    ? "active"
    : "stale";
}

export async function inspectTaskRunnerClaimedRunAuthority(
  paths: TaskRunnerActiveClaimAuthorityPaths,
  claim: TaskRunnerActiveClaim,
): Promise<TaskRunnerClaimedRunAuthority> {
  const repository = await RunnerRunRepository.openTaskRunIfPresent({
    git_root: paths.git_root,
    workflow_dir: paths.workflow_dir,
    task_id: paths.task_id,
    run_id: claim.run_id,
    storage: "supervisor",
  });
  if (!repository) return "absent";
  const state = await repository.readState();
  if (!state) return "incomplete_pre_provider";
  if (state.status === "prepared") {
    await repository.assertBoundary("before reading runner child spawn claim authority");
    const spawnClaim = await readRunnerChildSpawnClaim({
      run_dir: repository.paths.run_dir,
      run_id: claim.run_id,
    });
    await repository.assertBoundary("after reading runner child spawn claim authority");
    return spawnClaim ? "spawn_authorized_but_unconfirmed" : "incomplete_pre_provider";
  }
  if (state.status !== "running") {
    const processTree = state.supervision?.process_tree;
    if (processTree?.residual_alive === true || processTree?.cleanup_state === "failed") {
      return "terminal_cleanup_unverified";
    }
    await repository.assertBoundary("before reading terminal runner child spawn claim authority");
    const spawnClaim = await readRunnerChildSpawnClaim({
      run_dir: repository.paths.run_dir,
      run_id: claim.run_id,
    });
    await repository.assertBoundary("after reading terminal runner child spawn claim authority");
    if (!spawnClaim) return "terminal";
    const cleanupConfirmed = isManagedScopeCleanupConfirmed(processTree);
    return cleanupConfirmed ? "terminal" : "terminal_cleanup_unverified";
  }
  const expected = state.supervision?.process_identity;
  const pid = state.supervision?.pid;
  if (!expected || typeof pid !== "number" || pid !== expected.pid) {
    return "running_child_unverified";
  }
  let observed: Awaited<ReturnType<typeof readObservedProcessIdentity>>;
  try {
    observed = await readObservedProcessIdentity(pid);
  } catch {
    return isProcessAlive(pid) ? "running_child_unverified" : "running_child_dead";
  }
  if (!observed) {
    return isProcessAlive(pid) ? "running_child_unverified" : "running_child_dead";
  }
  return observed.pid === expected.pid &&
    observed.command === expected.command &&
    observed.started_at === expected.started_at
    ? "running_child_active"
    : "running_child_mismatch";
}

export function isExplicitlyRecoverableClaimedRun(
  authority: TaskRunnerClaimedRunAuthority,
): boolean {
  return (
    authority === "absent" || authority === "terminal" || authority === "incomplete_pre_provider"
  );
}
