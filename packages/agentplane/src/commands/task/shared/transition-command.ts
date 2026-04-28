import type { TaskData } from "../../../backends/task-backend.js";
import type { PolicyActionId } from "../../../policy/taxonomy.js";
import { CliError } from "../../../shared/errors.js";
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
  try {
    await applyTaskMutation({
      ctx: opts.ctx,
      taskId: opts.taskId,
      policyAction: opts.policyAction ?? "task_status_transition",
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
        return { intents: execution.intents, nextTask: execution.nextTask };
      },
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
