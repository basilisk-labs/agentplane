import type { TaskData } from "../../../backends/task-backend.js";
import type { PolicyPhase } from "../../../policy/model.js";
import type { PolicyActionId } from "../../../policy/taxonomy.js";
import { CliError } from "../../../shared/errors.js";
import { ensureNetworkApproved } from "../../shared/network-approval.js";
import { applyTaskMutation } from "../../shared/task-mutation.js";
import type { CommandContext } from "../../shared/task-backend.js";
import { emitTransitionWarnings } from "./transitions.js";
import { resolvePrimaryTag, toStringArray } from "./tags.js";
import {
  executeTaskStatusTransitionRequest,
  readDeferredTaskTransitionWarnings,
  type ExecuteTaskStatusTransitionRequest,
  type TaskStatusTransitionExecution,
} from "./workflow-transition-service.js";

type TaskStatusTransitionCommandRequest = Omit<
  ExecuteTaskStatusTransitionRequest,
  "task" | "backend" | "config"
>;

export async function applyTaskStatusTransitionCommand(opts: {
  ctx: CommandContext;
  taskId: string;
  quiet: boolean;
  policyAction?: PolicyActionId;
  phase?: PolicyPhase;
  build: (
    current: TaskData,
  ) => TaskStatusTransitionCommandRequest | Promise<TaskStatusTransitionCommandRequest>;
}): Promise<{
  execution: TaskStatusTransitionExecution;
  primaryTag: string;
}> {
  let execution: TaskStatusTransitionExecution | null = null;
  let primaryTag = "meta";
  let deferredWarnings: string[] = [];
  let statusChanged = false;
  try {
    const mutationResult = await applyTaskMutation({
      ctx: opts.ctx,
      taskId: opts.taskId,
      policyAction: opts.policyAction ?? "task_status_transition",
      phase: opts.phase,
      build: async (current) => {
        const request = await opts.build(current);
        execution = await executeTaskStatusTransitionRequest({
          ...request,
          task: current,
          backend: opts.ctx.taskBackend,
          config: opts.ctx.config,
        });
        primaryTag = resolvePrimaryTag(toStringArray(current.tags), opts.ctx).primary;
        deferredWarnings = execution.deferredWarnings;
        statusChanged =
          typeof execution.nextTask?.status === "string" &&
          execution.nextTask.status.length > 0 &&
          execution.nextTask.status !== current.status;
        return { intents: execution.intents, nextTask: execution.nextTask };
      },
    });
    await maybeAutoPushCloudAfterStatusMutation({
      ctx: opts.ctx,
      changed: mutationResult.changed,
      statusChanged,
      quiet: opts.quiet,
    });
  } catch (error) {
    emitTransitionWarnings(
      readDeferredTaskTransitionWarnings(error).length > 0
        ? readDeferredTaskTransitionWarnings(error)
        : deferredWarnings,
      opts.quiet,
    );
    throw error;
  }

  emitTransitionWarnings(deferredWarnings, opts.quiet);
  if (!execution) {
    throw new CliError({
      exitCode: 4,
      code: "E_IO",
      message: `Task transition produced no execution state: ${opts.taskId}`,
    });
  }
  return { execution, primaryTag };
}

async function maybeAutoPushCloudAfterStatusMutation(opts: {
  ctx: CommandContext;
  changed: boolean;
  statusChanged: boolean;
  quiet: boolean;
}): Promise<void> {
  if (!opts.changed || !opts.statusChanged) {
    return;
  }
  if (opts.ctx.backendId !== "cloud") {
    return;
  }
  const backend = opts.ctx.taskBackend as unknown as {
    autoPushOnMutation?: boolean;
    sync?: unknown;
  };
  if (backend.autoPushOnMutation !== true) {
    return;
  }
  await ensureNetworkApproved({
    action: "backend_sync",
    config: opts.ctx.config,
    yes: true,
    reason: "auto-push is enabled; pushing updated task status to cloud backend",
  });
  if (typeof (backend as { sync?: unknown }).sync !== "function") {
    return;
  }
  const sync = backend.sync as (args: {
    direction: "push";
    conflict: "diff" | "prefer-local" | "prefer-remote" | "fail";
    quiet: boolean;
    confirm: boolean;
  }) => Promise<void>;
  await sync({
    direction: "push",
    conflict: "diff",
    quiet: opts.quiet,
    confirm: true,
  });
}
