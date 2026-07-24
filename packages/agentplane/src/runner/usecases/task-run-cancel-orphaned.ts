import { isProcessAlive, readObservedProcessIdentity } from "../process-supervision/signals.js";
import { persistRunnerOutcomeToTask } from "../task-state.js";
import type { RunnerRunState } from "../types.js";

import {
  completeTaskRunnerActiveClaimRecovery,
  prepareTaskRunnerActiveClaimRecovery,
  readTaskRunnerActiveClaim,
  type TaskRunnerActiveClaim,
} from "./task-run-active-claim.js";
import { inspectTaskRunnerActiveClaimOwner } from "./task-run-active-claim-authority.js";
import { acquireTaskRunnerActiveClaimRecoveryLease } from "./task-run-active-claim-recovery-lease.js";
import { buildCancelledState } from "./task-run-cancel-prepared.js";
import type { LoadedRunnerExecution } from "./task-run-lifecycle-shared.js";
import {
  createTaskRunnerRecoveryAuthorityError,
  runTaskRunnerRecoveryLeaseAction,
} from "./task-run-recovery-lease-runtime.js";

function orphanRecoveryError(opts: {
  loaded: LoadedRunnerExecution;
  reason: string;
  context?: Record<string, unknown>;
}) {
  return createTaskRunnerRecoveryAuthorityError({
    ...opts,
    authority: "orphan recovery authority",
  });
}

async function childIsConfirmedGone(state: RunnerRunState): Promise<boolean> {
  const pid = state.supervision?.pid;
  if (typeof pid !== "number" || !Number.isInteger(pid) || pid <= 0) return false;
  if (!isProcessAlive(pid)) return true;

  const expected = state.supervision?.process_identity ?? null;
  if (expected?.pid !== pid) return false;
  const observed = await readObservedProcessIdentity(pid).catch(() => null);
  if (!observed?.command || !observed.started_at) return false;
  return observed.command !== expected.command || observed.started_at !== expected.started_at;
}

async function writeOrphanedRunningCancellation(opts: {
  loaded: LoadedRunnerExecution;
  task_id: string;
  expected_state: RunnerRunState;
}): Promise<RunnerRunState | null> {
  const current = await opts.loaded.repository.readState();
  if (current?.status !== "running") return current;
  if (JSON.stringify(current) !== JSON.stringify(opts.expected_state)) return null;
  if (!(await childIsConfirmedGone(current))) return null;

  const updatedAt = new Date().toISOString();
  const next = buildCancelledState({
    state: current,
    reason: "Runner supervisor ownership ended after its child process was confirmed absent.",
    summary: "Runner execution was cancelled during orphan recovery.",
    updated_at: updatedAt,
  });
  await opts.loaded.repository.writeState(next);
  const observed = await opts.loaded.repository.readState();
  if (observed?.status !== "cancelled") {
    throw orphanRecoveryError({
      loaded: opts.loaded,
      reason: "orphan_terminal_write_not_observed",
      context: { observed_status: observed?.status ?? null },
    });
  }
  await persistRunnerOutcomeToTask({
    ctx: opts.loaded.ctx,
    task_id: opts.task_id,
    bundle: opts.loaded.bundle,
    state: observed,
    ordering_authority: "current_active_claim",
  });
  await opts.loaded.repository.appendEvent({
    at: updatedAt,
    type: "runner_orphaned_running_cancelled",
    message: "runner terminalized only after its supervised child was confirmed absent",
    data: {
      previous_status: current.status,
      pid: current.supervision?.pid ?? null,
      external_signal_sent: false,
    },
  });
  return observed;
}

async function recoverWithStaleClaim(opts: {
  loaded: LoadedRunnerExecution;
  task_id: string;
  state: RunnerRunState;
  claim: TaskRunnerActiveClaim;
}): Promise<RunnerRunState | null> {
  if ((await inspectTaskRunnerActiveClaimOwner(opts.claim)) !== "stale") return null;
  const acquisition = await acquireTaskRunnerActiveClaimRecoveryLease({
    git_root: opts.loaded.bundle.repository.git_root,
    workflow_dir: opts.loaded.bundle.repository.workflow_dir,
    task_id: opts.task_id,
    target_generation: opts.claim.generation,
  });
  if (acquisition.status === "busy") {
    throw orphanRecoveryError({
      loaded: opts.loaded,
      reason: "orphan_recovery_election_busy",
      context: { recovery_lease_owner_status: acquisition.owner_status },
    });
  }

  return await runTaskRunnerRecoveryLeaseAction({
    lease: acquisition.lease,
    release_failure_operation: "orphan_recovery_lease_release",
    action: async (): Promise<RunnerRunState | null> => {
      const currentClaim = await readTaskRunnerActiveClaim({
        git_root: opts.loaded.bundle.repository.git_root,
        workflow_dir: opts.loaded.bundle.repository.workflow_dir,
        task_id: opts.task_id,
        run_id: opts.loaded.invocation.run_id,
      });
      if (
        currentClaim?.run_id !== opts.loaded.invocation.run_id ||
        currentClaim.generation !== opts.claim.generation ||
        (await inspectTaskRunnerActiveClaimOwner(currentClaim)) !== "stale"
      ) {
        throw orphanRecoveryError({
          loaded: opts.loaded,
          reason: "orphan_active_claim_changed",
        });
      }
      const terminal = await writeOrphanedRunningCancellation({
        loaded: opts.loaded,
        task_id: opts.task_id,
        expected_state: opts.state,
      });
      if (!terminal) return null;
      const recovery = await prepareTaskRunnerActiveClaimRecovery({
        git_root: opts.loaded.bundle.repository.git_root,
        workflow_dir: opts.loaded.bundle.repository.workflow_dir,
        task_id: opts.task_id,
        run_id: currentClaim.run_id,
        expected_generation: currentClaim.generation,
        expected_owner: currentClaim,
        recovery_lease: acquisition.lease,
      });
      if (recovery.status !== "ready") {
        throw orphanRecoveryError({
          loaded: opts.loaded,
          reason: `orphan_active_claim_recovery_${recovery.status}`,
        });
      }
      const completed = await completeTaskRunnerActiveClaimRecovery(recovery.token);
      if (completed.status !== "recovered" && completed.status !== "absent") {
        throw orphanRecoveryError({
          loaded: opts.loaded,
          reason: `orphan_active_claim_completion_${completed.reason}`,
        });
      }
      return terminal;
    },
  });
}

export async function finalizeOrphanedRunningCancellation(opts: {
  loaded: LoadedRunnerExecution;
  task_id: string;
}): Promise<RunnerRunState | null> {
  if (opts.loaded.repository.storage !== "supervisor") return null;
  const state = await opts.loaded.repository.readState();
  if (state?.status !== "running" || !(await childIsConfirmedGone(state))) return null;

  const claim = await readTaskRunnerActiveClaim({
    git_root: opts.loaded.bundle.repository.git_root,
    workflow_dir: opts.loaded.bundle.repository.workflow_dir,
    task_id: opts.task_id,
    run_id: opts.loaded.invocation.run_id,
  });
  if (claim && claim.run_id !== opts.loaded.invocation.run_id) {
    throw orphanRecoveryError({
      loaded: opts.loaded,
      reason: "orphan_active_claim_run_mismatch",
      context: { active_run_id: claim.run_id },
    });
  }
  return claim ? await recoverWithStaleClaim({ ...opts, state, claim }) : null;
}
