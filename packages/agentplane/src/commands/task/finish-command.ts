import { mapBackendError } from "../../cli/error-map.js";
import { CliError } from "../../shared/errors.js";

import { ensureActionApproved } from "../shared/approval-requirements.js";
import { ensureReconciledBeforeMutation } from "../shared/reconcile-check.js";
import { loadCommandContext } from "../shared/task-backend.js";

import { ensureFinishRunsOnBaseBranch } from "./finish-close.js";
import { executeFinishPlan } from "./finish-execute.js";
import { resolveFinishExecutionPlan } from "./finish-plan.js";
import type { FinishOptions } from "./finish-types.js";

export async function cmdFinish(options: FinishOptions): Promise<number> {
  try {
    const ctx =
      options.ctx ??
      (await loadCommandContext({ cwd: options.cwd, rootOverride: options.rootOverride ?? null }));
    await ensureReconciledBeforeMutation({ ctx, command: "finish" });
    await ensureFinishRunsOnBaseBranch({
      ctx,
      cwd: options.cwd,
      rootOverride: options.rootOverride,
      baseBranchOverride: options.baseBranchOverride,
    });
    if (options.force) {
      await ensureActionApproved({
        action: "force_action",
        config: ctx.config,
        yes: options.yes === true,
        reason: "finish --force",
      });
    }

    const plan = resolveFinishExecutionPlan({ ctx, options });
    return await executeFinishPlan({ ctx, options, plan });
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "finish", root: options.rootOverride ?? null });
  }
}
