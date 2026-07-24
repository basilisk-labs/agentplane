import { CliError } from "../../shared/errors.js";

import {
  acquireTaskRunnerActiveClaim,
  readTaskRunnerActiveClaim,
  type TaskRunnerActiveClaim,
} from "./task-run-active-claim.js";
import type { LoadedRunnerExecution } from "./task-run-lifecycle-shared.js";

function effectInDoubtClaimConflict(opts: {
  task_id: string;
  run_id: string;
  competing: TaskRunnerActiveClaim;
}): CliError {
  return new CliError({
    exitCode: 8,
    code: "E_RUNTIME",
    message:
      `Runner cannot restore effect-in-doubt authority for ${opts.task_id}:${opts.run_id} ` +
      `because another run owns the task active claim.`,
    context: {
      reason: "runner_effect_in_doubt_claim_conflict",
      task_id: opts.task_id,
      run_id: opts.run_id,
      competing_run_id: opts.competing.run_id,
      competing_generation: opts.competing.generation,
      competing_operation: opts.competing.operation,
    },
  });
}

export async function ensureEffectInDoubtActiveClaim(opts: {
  loaded: LoadedRunnerExecution;
  task_id: string;
}): Promise<{ claim: TaskRunnerActiveClaim | null; restored: boolean }> {
  if (opts.loaded.repository.storage !== "supervisor") {
    return { claim: null, restored: false };
  }
  const lookup = {
    git_root: opts.loaded.bundle.repository.git_root,
    workflow_dir: opts.loaded.bundle.repository.workflow_dir,
    task_id: opts.task_id,
    run_id: opts.loaded.invocation.run_id,
  };
  const observed = await readTaskRunnerActiveClaim(lookup);
  if (observed) {
    if (observed.run_id !== lookup.run_id) {
      throw effectInDoubtClaimConflict({
        task_id: lookup.task_id,
        run_id: lookup.run_id,
        competing: observed,
      });
    }
    return { claim: observed, restored: false };
  }

  try {
    const lease = await acquireTaskRunnerActiveClaim({
      ...lookup,
      operation: "effect_in_doubt",
    });
    return { claim: lease.claim, restored: true };
  } catch (error) {
    if (!(error instanceof CliError) || error.code !== "E_USAGE") throw error;
    const competing = await readTaskRunnerActiveClaim(lookup);
    if (!competing) throw error;
    if (competing.run_id !== lookup.run_id) {
      throw effectInDoubtClaimConflict({
        task_id: lookup.task_id,
        run_id: lookup.run_id,
        competing,
      });
    }
    return { claim: competing, restored: false };
  }
}
