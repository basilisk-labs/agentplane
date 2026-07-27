import { isProcessAlive, readObservedProcessIdentity } from "../process-supervision/signals.js";
import { RunnerRunRepository } from "../run-repository.js";
import { readRunnerChildSpawnClaim } from "../adapters/execution-control.js";
import type { RunnerProcessTreeObservation, RunnerRunState } from "../types.js";

import type { TaskRunnerActiveClaim } from "./task-run-active-claim.js";
import { inspectTaskRunnerMissingStateAuthority } from "./task-run-missing-state-authority.js";

export type TaskRunnerActiveClaimOwnerStatus = "active" | "stale" | "unverified";

export type TaskRunnerClaimedRunAuthority =
  | "absent"
  | "effect_in_doubt"
  | "effect_resolution_pending_retirement"
  | "terminal"
  | "terminal_cleanup_unverified"
  | "incomplete_pre_provider"
  | "missing_state_unverified"
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

export function isRunnerEffectInDoubt(
  state: Pick<RunnerRunState, "state_fingerprint" | "effect_resolution">,
): boolean {
  const uncertain =
    state.state_fingerprint?.outcome === "effect_started" ||
    state.state_fingerprint?.outcome === "effect_unknown" ||
    state.state_fingerprint?.outcome === "post_state_unknown";
  return uncertain && state.effect_resolution === undefined;
}

function isTimestamp(value: string | null): value is string {
  return typeof value === "string" && Number.isFinite(Date.parse(value));
}

function isTimestampAtOrBefore(left: string | null, right: string): boolean {
  return (
    isTimestamp(left) && Number.isFinite(Date.parse(right)) && Date.parse(left) <= Date.parse(right)
  );
}

export function isRunnerManagedScopeCleanupConfirmed(
  processTree: RunnerProcessTreeObservation | undefined,
): boolean {
  const scopeIdentityConfirmed =
    processTree?.scope === "posix_process_group"
      ? typeof processTree.group_id === "number" && processTree.group_id > 0
      : processTree?.scope === "direct_child_only" && processTree.group_id === null;
  const containmentConfirmed =
    processTree?.scope === "direct_child_only"
      ? processTree.containment_state === "limited" &&
        typeof processTree.containment_limitation === "string" &&
        processTree.containment_limitation.length > 0
      : (processTree?.containment_state === "bounded" &&
          processTree.containment_limitation === null) ||
        (processTree?.containment_state === "limited" &&
          typeof processTree.containment_limitation === "string" &&
          processTree.containment_limitation.length > 0);
  const cleanupEvidenceConfirmed =
    processTree?.cleanup_state === "not_needed"
      ? processTree.terminate_sent_at === null && processTree.kill_sent_at === null
      : processTree?.cleanup_state === "terminated"
        ? isTimestampAtOrBefore(processTree.terminate_sent_at, processTree.completed_at) &&
          processTree.kill_sent_at === null
        : processTree?.cleanup_state === "force_killed"
          ? isTimestampAtOrBefore(processTree.terminate_sent_at, processTree.kill_sent_at ?? "") &&
            isTimestampAtOrBefore(processTree.kill_sent_at, processTree.completed_at)
          : false;
  return (
    processTree?.residual_alive === false &&
    processTree.error === null &&
    cleanupEvidenceConfirmed &&
    scopeIdentityConfirmed &&
    containmentConfirmed
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
  let state = await repository.readState();
  if (!state) {
    return await inspectTaskRunnerMissingStateAuthority({
      repository,
      run_id: claim.run_id,
    });
  }
  const record = await repository.readRequiredRecord({
    task_id: paths.task_id,
    run_id: claim.run_id,
  });
  state = record.state;
  const uncertainEffect =
    state.state_fingerprint?.outcome === "effect_started" ||
    state.state_fingerprint?.outcome === "effect_unknown" ||
    state.state_fingerprint?.outcome === "post_state_unknown";
  if (uncertainEffect && state.effect_resolution) return "effect_resolution_pending_retirement";
  if (isRunnerEffectInDoubt(state)) return "effect_in_doubt";
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
    if (!spawnClaim) {
      const acceptedProviderOutcomeWithoutSpawn =
        state.state_fingerprint?.outcome === "accepted" &&
        (state.status === "success" || state.status === "blocked");
      return acceptedProviderOutcomeWithoutSpawn ? "effect_in_doubt" : "terminal";
    }
    const cleanupConfirmed = isRunnerManagedScopeCleanupConfirmed(processTree);
    if (!cleanupConfirmed) return "terminal_cleanup_unverified";
    const fingerprintOutcome = state.state_fingerprint?.outcome;
    return fingerprintOutcome === undefined || fingerprintOutcome === "accepted"
      ? "terminal"
      : "effect_in_doubt";
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
