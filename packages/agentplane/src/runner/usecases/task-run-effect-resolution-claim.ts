import type { RunnerEffectResolutionRef } from "@agentplaneorg/core/schemas";

import { CliError } from "../../shared/errors.js";
import { RunnerRunRepository } from "../run-repository.js";

import { inspectTaskRunnerActiveClaimOwner } from "./task-run-active-claim-authority.js";
import {
  ownershipError,
  readObservedClaim,
  resolveClaimDirectory,
  retireObservedClaim,
} from "./task-run-active-claim.js";
import {
  acquireTaskRunnerActiveClaimRecoveryLease,
  beginTaskRunnerActiveClaimRetirement,
  releaseTaskRunnerActiveClaimRecoveryLease,
} from "./task-run-active-claim-recovery-lease.js";

/**
 * The generic recovery path must continue to reject effect_in_doubt. This is
 * the only retirement path that may cross that boundary, and only after the
 * run state durably contains the exact operator resolution supplied by caller.
 */
export async function retireTaskRunnerActiveClaimAfterEffectResolution(opts: {
  git_root: string;
  workflow_dir: string;
  task_id: string;
  run_id: string;
  expected_generation: string;
  resolution: RunnerEffectResolutionRef;
  ensure_resolution_attached: () => Promise<boolean>;
}): Promise<"absent" | "retired"> {
  const acquisition = await acquireTaskRunnerActiveClaimRecoveryLease({
    git_root: opts.git_root,
    workflow_dir: opts.workflow_dir,
    task_id: opts.task_id,
    target_generation: opts.expected_generation,
  });
  if (acquisition.status === "busy") {
    throw new CliError({
      exitCode: 8,
      code: "E_RUNTIME",
      message: "Runner effect resolution is already retiring this active claim.",
      context: {
        reason: "runner_effect_resolution_retirement_busy",
        task_id: opts.task_id,
        run_id: opts.run_id,
        generation: opts.expected_generation,
      },
    });
  }
  let succeeded = false;
  try {
    const directory = await resolveClaimDirectory(opts);
    const observed = await readObservedClaim(directory);
    if (!observed) {
      succeeded = true;
      return "absent";
    }
    if (
      observed.claim.run_id !== opts.run_id ||
      observed.claim.generation !== opts.expected_generation
    ) {
      throw ownershipError({
        expected: observed,
        observed: observed.claim,
        detail: "the active claim no longer matches the resolved generation",
      });
    }
    const ownerStatus = await inspectTaskRunnerActiveClaimOwner(observed.claim);
    if (ownerStatus !== "stale") {
      throw new CliError({
        exitCode: 8,
        code: "E_RUNTIME",
        message: "Runner effect resolution refuses to retire an active or unverified claim owner.",
        context: {
          reason:
            ownerStatus === "active"
              ? "runner_effect_resolution_owner_active"
              : "runner_effect_resolution_owner_unverified",
          task_id: opts.task_id,
          run_id: opts.run_id,
          generation: opts.expected_generation,
        },
      });
    }
    const repository = await RunnerRunRepository.openExistingTaskRun({
      git_root: opts.git_root,
      workflow_dir: opts.workflow_dir,
      task_id: opts.task_id,
      run_id: opts.run_id,
      storage: "supervisor",
    });
    let record = await repository.readRequiredRecord({
      task_id: opts.task_id,
      run_id: opts.run_id,
    });
    if (!record.state.effect_resolution) {
      await opts.ensure_resolution_attached();
      record = await repository.readRequiredRecord({
        task_id: opts.task_id,
        run_id: opts.run_id,
      });
    }
    const attached = record.state.effect_resolution;
    if (
      attached?.digest !== opts.resolution.digest ||
      attached.active_claim_generation !== opts.expected_generation ||
      attached.operation_key !== opts.resolution.operation_key ||
      attached.operation_digest !== opts.resolution.operation_digest
    ) {
      throw new CliError({
        exitCode: 8,
        code: "E_RUNTIME",
        message: "Runner effect resolution is not durably attached to the exact active claim.",
        context: {
          reason: "runner_effect_resolution_state_attachment_missing",
          task_id: opts.task_id,
          run_id: opts.run_id,
          generation: opts.expected_generation,
        },
      });
    }
    await beginTaskRunnerActiveClaimRetirement({
      lease: acquisition.lease,
      task_dir: directory.task_dir,
      target_generation: opts.expected_generation,
    });
    const archived = await retireObservedClaim({
      directory,
      expected: observed,
      disposition: "stale",
    });
    succeeded = true;
    return archived ? "retired" : "absent";
  } finally {
    await releaseTaskRunnerActiveClaimRecoveryLease({
      lease: acquisition.lease,
      succeeded,
    });
  }
}
