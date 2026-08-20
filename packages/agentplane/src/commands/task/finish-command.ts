import { mapBackendError } from "../../cli/error-map.js";
import { CliError } from "../../shared/errors.js";
import { emitTraceEvent } from "../../shared/trace-events.js";

import { ensureActionApproved } from "../shared/approval-requirements.js";
import { ensureReconciledBeforeMutation } from "../shared/reconcile-check.js";
import { loadCommandContext } from "../shared/task-backend.js";
import { loadTaskCommandContext } from "../../runtime/task-execution-context/index.js";

import { ensureFinishRunsOnBaseBranch } from "./finish-close.js";
import { executeFinishPlan } from "./finish-execute.js";
import { resolveFinishExecutionPlan } from "./finish-plan.js";
import type { FinishOptions } from "./finish-types.js";

export async function cmdFinish(options: FinishOptions): Promise<number> {
  try {
    if (options.taskIds.length === 0 || options.taskIds.some((taskId) => !taskId.trim())) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: "finish requires non-empty task ids",
      });
    }
    const initialCtx =
      options.ctx ??
      (await loadCommandContext({ cwd: options.cwd, rootOverride: options.rootOverride ?? null }));
    const taskCommand = await loadTaskCommandContext({
      ctx: initialCtx,
      taskIds: options.taskIds,
      workspaceCommandForModes: ["direct"],
      discoverAuthoritativeWorkspace: false,
    });
    const ctx = taskCommand.command;
    emitTraceEvent({
      component: "task-finish",
      event: "finish_started",
      details: { task_count: options.taskIds.length, backend: ctx.backendId },
    });
    await ensureReconciledBeforeMutation({ ctx, command: "finish", taskIds: options.taskIds });
    await ensureFinishRunsOnBaseBranch({
      ctx,
      cwd: options.cwd,
      rootOverride: options.rootOverride,
      baseBranchOverride: options.baseBranchOverride,
      taskIds: options.taskIds,
      preMergeClosure: options.preMergeClosure === true,
      workflowMode: taskCommand.execution.selected_mode,
    });
    if (options.force) {
      await ensureActionApproved({
        action: "force_action",
        config: ctx.config,
        yes: options.yes === true,
        reason: "finish --force",
      });
    }

    const plan = resolveFinishExecutionPlan({ ctx, options, execution: taskCommand.execution });
    const code = await executeFinishPlan({ ctx, options, plan });
    emitTraceEvent({
      component: "task-finish",
      event: "finish_completed",
      details: { task_count: options.taskIds.length, exit_code: code },
    });
    return code;
  } catch (err) {
    emitTraceEvent({
      component: "task-finish",
      event: "finish_failed",
      details: {
        task_count: options.taskIds.length,
        error: err instanceof Error ? err.name : "UnknownError",
      },
    });
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "finish", root: options.rootOverride ?? null });
  }
}
