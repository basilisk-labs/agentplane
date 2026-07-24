import type { CommandContext } from "../../commands/shared/task-backend.js";
import { CliError } from "../../shared/errors.js";
import { RunnerRunRepository } from "../run-repository.js";
import { persistRunnerOutcomeToTask } from "../task-state.js";
import { assertSafeRunnerRunId } from "../task-run-paths.js";
import type { RunnerContextBundle } from "../types.js";

import {
  completeTaskRunnerActiveClaimRecovery,
  prepareTaskRunnerActiveClaimRecovery,
  readTaskRunnerActiveClaim,
  recoverTaskRunnerActiveClaim,
  type TaskRunnerActiveClaim,
  type TaskRunnerActiveClaimOwnerIdentity,
} from "./task-run-active-claim.js";
import {
  inspectTaskRunnerActiveClaimOwner,
  inspectTaskRunnerClaimedRunAuthority,
  isRunnerEffectInDoubt,
  type TaskRunnerClaimedRunAuthority,
} from "./task-run-active-claim-authority.js";
import {
  acquireTaskRunnerActiveClaimRecoveryLease,
  releaseTaskRunnerActiveClaimRecoveryLease,
} from "./task-run-active-claim-recovery-lease.js";
import { assertNoOrphanedRunnerEffectInDoubt } from "./task-run-orphaned-effect-guard.js";

export type TaskRunnerActiveClaimCleanupDiagnostic = {
  status: "cleanup_failed";
  code: string;
  message: string;
  context?: Record<string, unknown>;
  event_recorded: boolean;
  event_error?: string;
};

export type TaskRunnerReconcileResult =
  | {
      status: "no_active_claim";
      task_id: string;
      run_id: null;
      claimed_run_authority: null;
    }
  | {
      status: "recovered";
      task_id: string;
      run_id: string;
      claimed_run_authority: "absent" | "incomplete_pre_provider" | "terminal";
    };

function cleanupDiagnostic(error: unknown): TaskRunnerActiveClaimCleanupDiagnostic {
  return {
    status: "cleanup_failed",
    code:
      error instanceof CliError
        ? error.code
        : (((error as { code?: unknown } | null)?.code as string | undefined) ?? "E_RUNTIME"),
    message: error instanceof Error ? error.message : String(error),
    ...(error instanceof CliError && error.context ? { context: error.context } : {}),
    event_recorded: false,
  };
}

export async function recordActiveClaimCleanupFailure(opts: {
  bundle: RunnerContextBundle | null;
  error: unknown;
}): Promise<TaskRunnerActiveClaimCleanupDiagnostic> {
  const diagnostic = cleanupDiagnostic(opts.error);
  const taskId =
    opts.bundle?.task?.task_id ??
    (opts.bundle?.target.kind === "task" ? opts.bundle.target.task_id : null);
  if (!opts.bundle || !taskId) return diagnostic;
  try {
    const repository = await RunnerRunRepository.openExistingTaskRun({
      git_root: opts.bundle.repository.git_root,
      workflow_dir: opts.bundle.repository.workflow_dir,
      task_id: taskId,
      run_id: opts.bundle.execution.run_id,
      storage: "supervisor",
    });
    await repository.appendEvent({
      at: new Date().toISOString(),
      type: "runner_active_claim_cleanup_failed",
      message: diagnostic.message,
      data: { code: diagnostic.code, ...(diagnostic.context ?? {}) },
    });
    return { ...diagnostic, event_recorded: true };
  } catch (eventError) {
    return {
      ...diagnostic,
      event_error: eventError instanceof Error ? eventError.message : String(eventError),
    };
  }
}

export function attachSuppressedActiveClaimCleanup(
  primaryError: unknown,
  diagnostic: TaskRunnerActiveClaimCleanupDiagnostic,
): void {
  if (
    (typeof primaryError !== "object" && typeof primaryError !== "function") ||
    primaryError === null ||
    !Object.isExtensible(primaryError)
  ) {
    return;
  }
  if (Object.hasOwn(primaryError, "agentplane_suppressed")) {
    const existing = (primaryError as { agentplane_suppressed?: unknown }).agentplane_suppressed;
    if (Array.isArray(existing)) existing.push(diagnostic);
    return;
  }
  Object.defineProperty(primaryError, "agentplane_suppressed", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: [diagnostic],
  });
}

export async function assertTaskRunnerActiveClaimCurrent(opts: {
  git_root: string;
  workflow_dir: string;
  expected: TaskRunnerActiveClaim;
}): Promise<void> {
  const observed = await readTaskRunnerActiveClaim({
    git_root: opts.git_root,
    workflow_dir: opts.workflow_dir,
    task_id: opts.expected.task_id,
    run_id: opts.expected.run_id,
  });
  if (
    observed?.claim_id === opts.expected.claim_id &&
    observed.generation === opts.expected.generation &&
    observed.run_id === opts.expected.run_id &&
    observed.owner_pid === opts.expected.owner_pid &&
    observed.owner_command === opts.expected.owner_command &&
    observed.owner_started_at === opts.expected.owner_started_at
  ) {
    return;
  }
  throw new CliError({
    exitCode: 8,
    code: "E_RUNTIME",
    message:
      `Runner active claim ownership violation for ` +
      `${opts.expected.task_id}:${opts.expected.run_id}: ` +
      `the shared claim no longer matches the acquired lease`,
    context: {
      task_id: opts.expected.task_id,
      run_id: opts.expected.run_id,
      claim_id: opts.expected.claim_id,
      generation: opts.expected.generation,
      observed_claim_id: observed?.claim_id ?? null,
      observed_generation: observed?.generation ?? null,
    },
  });
}

function terminalClaimRecoveryError(opts: {
  task_id: string;
  claim: TaskRunnerActiveClaim;
  reason: string;
  owner_status?: string;
}): CliError {
  return new CliError({
    exitCode: 8,
    code: "E_RUNTIME",
    message:
      `Runner terminal active-claim reconciliation could not obtain exclusive recovery ` +
      `authority for ${opts.task_id}:${opts.claim.run_id}.`,
    context: {
      reason: opts.reason,
      task_id: opts.task_id,
      run_id: opts.claim.run_id,
      generation: opts.claim.generation,
      ...(opts.owner_status ? { recovery_lease_owner_status: opts.owner_status } : {}),
    },
  });
}

function attachSuppressedRecoveryLeaseRelease(primaryError: unknown, releaseError: unknown): void {
  if (
    (typeof primaryError !== "object" && typeof primaryError !== "function") ||
    primaryError === null ||
    !Object.isExtensible(primaryError)
  ) {
    return;
  }
  const existing = Object.hasOwn(primaryError, "agentplane_suppressed")
    ? (primaryError as { agentplane_suppressed?: unknown }).agentplane_suppressed
    : undefined;
  const suppressed: unknown[] = Array.isArray(existing) ? [...(existing as unknown[])] : [];
  suppressed.push({
    operation: "active_claim_recovery_lease_release",
    message: releaseError instanceof Error ? releaseError.message : String(releaseError),
  });
  Object.defineProperty(primaryError, "agentplane_suppressed", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: suppressed,
  });
}

export async function reconcileTerminalTaskRunnerActiveClaim(opts: {
  ctx: CommandContext;
  task_id: string;
  claim: TaskRunnerActiveClaim;
  expected_owner?: TaskRunnerActiveClaimOwnerIdentity;
  require_recovery?: boolean;
}): Promise<"absent" | "recovered" | "retained"> {
  const requireRecovery = opts.require_recovery ?? true;
  const leaseAcquisition = await acquireTaskRunnerActiveClaimRecoveryLease({
    git_root: opts.ctx.resolvedProject.gitRoot,
    workflow_dir: opts.ctx.config.paths.workflow_dir,
    task_id: opts.task_id,
    target_generation: opts.claim.generation,
  });
  if (leaseAcquisition.status === "busy") {
    if (!requireRecovery) return "retained";
    throw terminalClaimRecoveryError({
      task_id: opts.task_id,
      claim: opts.claim,
      reason: "recovery_election_busy",
      owner_status: leaseAcquisition.owner_status,
    });
  }

  let result: "absent" | "recovered" | "retained";
  try {
    result = await (async (): Promise<"absent" | "recovered" | "retained"> => {
      const recovery = await prepareTaskRunnerActiveClaimRecovery({
        git_root: opts.ctx.resolvedProject.gitRoot,
        workflow_dir: opts.ctx.config.paths.workflow_dir,
        task_id: opts.task_id,
        run_id: opts.claim.run_id,
        expected_generation: opts.claim.generation,
        expected_owner: opts.expected_owner ?? opts.claim,
        recovery_lease: leaseAcquisition.lease,
      });
      if (recovery.status === "absent") return "absent";
      if (recovery.status === "refused") {
        if (!requireRecovery) return "retained";
        throw terminalClaimRecoveryError({
          task_id: opts.task_id,
          claim: opts.claim,
          reason: recovery.reason,
        });
      }

      const repository = await RunnerRunRepository.openExistingTaskRun({
        git_root: opts.ctx.resolvedProject.gitRoot,
        workflow_dir: opts.ctx.config.paths.workflow_dir,
        task_id: opts.task_id,
        run_id: opts.claim.run_id,
        storage: "supervisor",
      });
      const record = await repository.readRequiredRecord({
        task_id: opts.task_id,
        run_id: opts.claim.run_id,
      });
      if (isRunnerEffectInDoubt(record.state)) {
        throw terminalClaimRecoveryError({
          task_id: opts.task_id,
          claim: opts.claim,
          reason: "runner_effect_in_doubt",
        });
      }
      if (record.state.status === "prepared" || record.state.status === "running") {
        throw terminalClaimRecoveryError({
          task_id: opts.task_id,
          claim: opts.claim,
          reason: `run_nonterminal:${record.state.status}`,
        });
      }
      await persistRunnerOutcomeToTask({
        ctx: opts.ctx,
        task_id: opts.task_id,
        bundle: record.bundle,
        state: record.state,
        ordering_authority: "current_active_claim",
      });
      const current = await repository.readState();
      if (!current || JSON.stringify(current) !== JSON.stringify(record.state)) {
        throw terminalClaimRecoveryError({
          task_id: opts.task_id,
          claim: opts.claim,
          reason: "terminal_state_changed_during_projection",
        });
      }
      await repository.appendEvent({
        at: new Date().toISOString(),
        type: "runner_terminal_claim_reconciled",
        message: "terminal supervisor outcome projected before stale active claim retirement",
        data: {
          task_id: opts.task_id,
          run_id: opts.claim.run_id,
          status: record.state.status,
          generation: opts.claim.generation,
        },
      });
      const completed = await completeTaskRunnerActiveClaimRecovery(recovery.token);
      if (completed.status !== "recovered" && completed.status !== "absent") {
        throw terminalClaimRecoveryError({
          task_id: opts.task_id,
          claim: opts.claim,
          reason: completed.reason,
        });
      }
      return completed.status;
    })();
  } catch (primaryError) {
    try {
      await releaseTaskRunnerActiveClaimRecoveryLease({
        lease: leaseAcquisition.lease,
        succeeded: false,
      });
    } catch (releaseError) {
      attachSuppressedRecoveryLeaseRelease(primaryError, releaseError);
    }
    throw primaryError;
  }
  await releaseTaskRunnerActiveClaimRecoveryLease({
    lease: leaseAcquisition.lease,
    succeeded: true,
  });
  return result;
}

export async function reconcileStaleTerminalTaskRunnerActiveClaim(opts: {
  ctx: CommandContext;
  task_id: string;
  prospective_run_id?: string;
}): Promise<"absent" | "nonterminal" | "recovered" | "retained"> {
  const prospectiveRunId =
    opts.prospective_run_id === undefined
      ? undefined
      : assertSafeRunnerRunId(opts.prospective_run_id);
  const claim = await readTaskRunnerActiveClaim({
    git_root: opts.ctx.resolvedProject.gitRoot,
    workflow_dir: opts.ctx.config.paths.workflow_dir,
    task_id: opts.task_id,
    run_id: "active-claim-reconciliation-probe",
  });
  if (!claim) {
    await assertNoOrphanedRunnerEffectInDoubt({
      git_root: opts.ctx.resolvedProject.gitRoot,
      workflow_dir: opts.ctx.config.paths.workflow_dir,
      task_id: opts.task_id,
      ignore_run_id: prospectiveRunId,
    });
    return "absent";
  }
  const repository = await RunnerRunRepository.openTaskRunIfPresent({
    git_root: opts.ctx.resolvedProject.gitRoot,
    workflow_dir: opts.ctx.config.paths.workflow_dir,
    task_id: opts.task_id,
    run_id: claim.run_id,
    storage: "supervisor",
  });
  const state = await repository?.readState();
  if (state && isRunnerEffectInDoubt(state)) return "retained";
  if (!state || state.status === "prepared" || state.status === "running") {
    return "nonterminal";
  }
  return await reconcileTerminalTaskRunnerActiveClaim({
    ctx: opts.ctx,
    task_id: opts.task_id,
    claim,
  });
}

function reconcileRefusal(opts: {
  task_id: string;
  claim: TaskRunnerActiveClaim;
  reason: string;
  owner_status: string;
  claimed_run_authority: TaskRunnerClaimedRunAuthority;
}): CliError {
  return new CliError({
    exitCode: 8,
    code: "E_RUNTIME",
    message:
      `Runner active claim for ${opts.task_id}:${opts.claim.run_id} cannot be safely ` +
      `reconciled without provider execution.`,
    context: {
      reason: opts.reason,
      task_id: opts.task_id,
      run_id: opts.claim.run_id,
      generation: opts.claim.generation,
      owner_status: opts.owner_status,
      claimed_run_authority: opts.claimed_run_authority,
    },
  });
}

export async function reconcileTaskRunnerActiveClaim(opts: {
  ctx: CommandContext;
  task_id: string;
}): Promise<TaskRunnerReconcileResult> {
  const lookup = {
    git_root: opts.ctx.resolvedProject.gitRoot,
    workflow_dir: opts.ctx.config.paths.workflow_dir,
    task_id: opts.task_id,
  };
  const claim = await readTaskRunnerActiveClaim({
    ...lookup,
    run_id: "active-claim-reconcile-probe",
  });
  if (!claim) {
    await assertNoOrphanedRunnerEffectInDoubt({
      ...lookup,
    });
    return {
      status: "no_active_claim",
      task_id: opts.task_id,
      run_id: null,
      claimed_run_authority: null,
    };
  }
  const [ownerStatus, claimedRunAuthority] = await Promise.all([
    inspectTaskRunnerActiveClaimOwner(claim),
    inspectTaskRunnerClaimedRunAuthority(lookup, claim),
  ]);
  if (ownerStatus !== "stale") {
    throw reconcileRefusal({
      task_id: opts.task_id,
      claim,
      reason: ownerStatus === "active" ? "owner_active" : "owner_unverified",
      owner_status: ownerStatus,
      claimed_run_authority: claimedRunAuthority,
    });
  }
  if (claimedRunAuthority === "terminal") {
    const result = await reconcileTerminalTaskRunnerActiveClaim({
      ctx: opts.ctx,
      task_id: opts.task_id,
      claim,
      expected_owner: claim,
    });
    if (result !== "recovered" && result !== "absent") {
      throw reconcileRefusal({
        task_id: opts.task_id,
        claim,
        reason: `terminal_reconciliation_${result}`,
        owner_status: ownerStatus,
        claimed_run_authority: claimedRunAuthority,
      });
    }
    return {
      status: "recovered",
      task_id: opts.task_id,
      run_id: claim.run_id,
      claimed_run_authority: claimedRunAuthority,
    };
  }
  if (claimedRunAuthority !== "absent" && claimedRunAuthority !== "incomplete_pre_provider") {
    throw reconcileRefusal({
      task_id: opts.task_id,
      claim,
      reason: `run_not_recoverable:${claimedRunAuthority}`,
      owner_status: ownerStatus,
      claimed_run_authority: claimedRunAuthority,
    });
  }
  const recovered = await recoverTaskRunnerActiveClaim({
    ...lookup,
    run_id: claim.run_id,
    expected_generation: claim.generation,
    expected_owner: claim,
  });
  if (recovered.status !== "recovered" && recovered.status !== "absent") {
    throw reconcileRefusal({
      task_id: opts.task_id,
      claim: recovered.claim,
      reason: recovered.reason,
      owner_status: ownerStatus,
      claimed_run_authority: claimedRunAuthority,
    });
  }
  return {
    status: "recovered",
    task_id: opts.task_id,
    run_id: claim.run_id,
    claimed_run_authority: claimedRunAuthority,
  };
}
