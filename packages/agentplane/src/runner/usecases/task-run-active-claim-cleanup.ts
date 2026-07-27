import type { CommandContext } from "../../commands/shared/task-backend.js";
import type { RunnerContextBundle } from "../types.js";

import {
  releaseTaskRunnerActiveClaim,
  type TaskRunnerActiveClaimLease,
} from "./task-run-active-claim.js";
import { inspectTaskRunnerClaimedRunAuthority } from "./task-run-active-claim-authority.js";
import {
  assertTaskRunnerActiveClaimCurrent,
  attachSuppressedActiveClaimCleanup,
  recordActiveClaimCleanupFailure,
  type TaskRunnerActiveClaimCleanupDiagnostic,
} from "./task-run-active-claim-runtime.js";

type TaskRunnerActiveClaimCleanupTarget = {
  active_claim_cleanup?: TaskRunnerActiveClaimCleanupDiagnostic;
};

export async function finalizeTaskRunnerActiveClaimCleanup(opts: {
  ctx: CommandContext;
  task_id: string;
  active_claim: TaskRunnerActiveClaimLease;
  cleanup_bundle: RunnerContextBundle | null;
  release_active_claim: boolean;
  has_primary_error: boolean;
  primary_error: unknown;
  completed?: TaskRunnerActiveClaimCleanupTarget;
}): Promise<void> {
  let releaseActiveClaim = opts.release_active_claim;
  if (!releaseActiveClaim && opts.has_primary_error) {
    try {
      const authority = await inspectTaskRunnerClaimedRunAuthority(
        {
          git_root: opts.ctx.resolvedProject.gitRoot,
          workflow_dir: opts.ctx.config.paths.workflow_dir,
          task_id: opts.task_id,
        },
        opts.active_claim.claim,
      );
      if (authority === "effect_in_doubt") {
        await assertTaskRunnerActiveClaimCurrent({
          git_root: opts.ctx.resolvedProject.gitRoot,
          workflow_dir: opts.ctx.config.paths.workflow_dir,
          expected: opts.active_claim.claim,
        });
      } else {
        releaseActiveClaim = authority === "absent" || authority === "incomplete_pre_provider";
      }
    } catch (inspectionError) {
      const diagnostic = await recordActiveClaimCleanupFailure({
        bundle: opts.cleanup_bundle,
        error: inspectionError,
      });
      attachSuppressedActiveClaimCleanup(opts.primary_error, diagnostic);
    }
  }
  if (!releaseActiveClaim) return;
  try {
    await releaseTaskRunnerActiveClaim(opts.active_claim);
  } catch (cleanupError) {
    const diagnostic = await recordActiveClaimCleanupFailure({
      bundle: opts.cleanup_bundle,
      error: cleanupError,
    });
    if (opts.has_primary_error) {
      attachSuppressedActiveClaimCleanup(opts.primary_error, diagnostic);
    } else if (opts.completed) {
      opts.completed.active_claim_cleanup = diagnostic;
    }
  }
}
