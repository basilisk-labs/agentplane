import type { TaskData, TaskWriteOptions } from "../../backends/task-backend.js";
import { loadTaskFromContext, type CommandContext } from "./task-backend.js";
import {
  applyTaskStoreIntentsToTask,
  backendIsLocalFileBackend,
  getTaskStore,
  type TaskStoreIntentResult,
} from "./task-store.js";

export type TaskMutationPlan = {
  intents?: TaskStoreIntentResult;
  nextTask?: TaskData;
  forceWrite?: boolean;
};

export async function applyTaskMutation(opts: {
  ctx: CommandContext;
  taskId: string;
  build: (
    current: TaskData,
  ) => Promise<TaskMutationPlan | null | undefined> | TaskMutationPlan | null | undefined;
  writeOptions?: TaskWriteOptions;
}): Promise<{ changed: boolean; task: TaskData; mode: "local-store" | "backend" }> {
  if (backendIsLocalFileBackend(opts.ctx)) {
    const store = getTaskStore(opts.ctx);
    const result = await store.update(
      opts.taskId,
      async (current) => {
        const plan = await opts.build({ ...current });
        if (!plan) return current;
        if (plan.nextTask !== undefined) return plan.nextTask;
        if (plan.intents !== undefined) {
          return applyTaskStoreIntentsToTask(current, plan.intents);
        }
        return current;
      },
      {
        expectedRevision: opts.writeOptions?.expectedRevision,
      },
    );
    return { ...result, mode: "local-store" };
  }

  const current = await loadTaskFromContext({ ctx: opts.ctx, taskId: opts.taskId });
  const plan = await opts.build({ ...current });
  if (!plan) return { changed: false, task: current, mode: "backend" };

  const nextTask =
    plan.nextTask ??
    (plan.intents === undefined ? undefined : applyTaskStoreIntentsToTask(current, plan.intents));
  if (nextTask === undefined) {
    return { changed: false, task: current, mode: "backend" };
  }

  const changed = JSON.stringify(current) !== JSON.stringify(nextTask);
  if (!changed && plan.forceWrite !== true) {
    return { changed: false, task: nextTask, mode: "backend" };
  }

  await opts.ctx.taskBackend.writeTask(nextTask, {
    expectedRevision: opts.writeOptions?.expectedRevision,
  });
  return { changed, task: nextTask, mode: "backend" };
}
