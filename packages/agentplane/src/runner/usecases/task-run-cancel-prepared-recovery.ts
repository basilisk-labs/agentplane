import type { RunnerPreSpawnDecision } from "../adapters/execution-control.js";
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
import { finalizeOrphanedPreparedStart } from "./task-run-cancel-prepared.js";
import type { LoadedRunnerExecution } from "./task-run-lifecycle-shared.js";
import {
  createTaskRunnerRecoveryAuthorityError,
  runTaskRunnerRecoveryLeaseAction,
} from "./task-run-recovery-lease-runtime.js";

function preparedRecoveryError(opts: {
  loaded: LoadedRunnerExecution;
  reason: string;
  context?: Record<string, unknown>;
}) {
  return createTaskRunnerRecoveryAuthorityError({
    ...opts,
    authority: "prepared-run recovery authority",
  });
}

async function readMatchingStaleClaim(opts: {
  loaded: LoadedRunnerExecution;
  task_id: string;
  expected?: TaskRunnerActiveClaim;
}): Promise<TaskRunnerActiveClaim | null> {
  const claim = await readTaskRunnerActiveClaim({
    git_root: opts.loaded.bundle.repository.git_root,
    workflow_dir: opts.loaded.bundle.repository.workflow_dir,
    task_id: opts.task_id,
    run_id: opts.loaded.invocation.run_id,
  });
  if (!claim) return null;
  if (claim.run_id !== opts.loaded.invocation.run_id) {
    throw preparedRecoveryError({
      loaded: opts.loaded,
      reason: "prepared_active_claim_run_mismatch",
      context: { active_run_id: claim.run_id },
    });
  }
  if (opts.expected && claim.generation !== opts.expected.generation) {
    throw preparedRecoveryError({
      loaded: opts.loaded,
      reason: "prepared_active_claim_generation_changed",
      context: {
        expected_generation: opts.expected.generation,
        active_generation: claim.generation,
      },
    });
  }
  return (await inspectTaskRunnerActiveClaimOwner(claim)) === "stale" ? claim : null;
}

export async function recoverOrphanedPreparedCancellation(opts: {
  loaded: LoadedRunnerExecution;
  task_id: string;
  decision: RunnerPreSpawnDecision;
}): Promise<RunnerRunState | null> {
  if (opts.loaded.repository.storage !== "supervisor") return null;
  const observedClaim = await readMatchingStaleClaim(opts);
  if (!observedClaim) return null;
  const acquisition = await acquireTaskRunnerActiveClaimRecoveryLease({
    git_root: opts.loaded.bundle.repository.git_root,
    workflow_dir: opts.loaded.bundle.repository.workflow_dir,
    task_id: opts.task_id,
    target_generation: observedClaim.generation,
  });
  if (acquisition.status === "busy") {
    throw preparedRecoveryError({
      loaded: opts.loaded,
      reason: "prepared_recovery_election_busy",
      context: { recovery_lease_owner_status: acquisition.owner_status },
    });
  }

  return await runTaskRunnerRecoveryLeaseAction({
    lease: acquisition.lease,
    release_failure_operation: "prepared_recovery_lease_release",
    action: async (): Promise<RunnerRunState | null> => {
      const currentClaim = await readMatchingStaleClaim({
        ...opts,
        expected: observedClaim,
      });
      if (!currentClaim) {
        throw preparedRecoveryError({
          loaded: opts.loaded,
          reason: "prepared_active_claim_owner_not_stale",
        });
      }
      const terminal = await finalizeOrphanedPreparedStart({
        repository: opts.loaded.repository,
        invocation: opts.loaded.invocation,
        decision: opts.decision,
        recovery_lease: acquisition.lease,
        active_claim_generation: currentClaim.generation,
      });
      if (!terminal || terminal.status === "prepared" || terminal.status === "running") {
        return terminal;
      }
      await persistRunnerOutcomeToTask({
        ctx: opts.loaded.ctx,
        task_id: opts.task_id,
        bundle: opts.loaded.bundle,
        state: terminal,
        ordering_authority: "current_active_claim",
      });
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
        throw preparedRecoveryError({
          loaded: opts.loaded,
          reason: `prepared_active_claim_recovery_${recovery.status}`,
        });
      }
      const completed = await completeTaskRunnerActiveClaimRecovery(recovery.token);
      if (completed.status !== "recovered" && completed.status !== "absent") {
        throw preparedRecoveryError({
          loaded: opts.loaded,
          reason: `prepared_active_claim_completion_${completed.reason}`,
        });
      }
      return terminal;
    },
  });
}
