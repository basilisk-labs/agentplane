import type { TaskData, TaskWriteOptions } from "../../backends/task-backend.js";
import { loadTaskFromContext, writeTasksOrFallback, type CommandContext } from "./task-backend.js";
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

export type TaskCollectionMutationPlan<TResult> = {
  tasksToWrite?: readonly TaskData[];
  result: TResult;
};

export async function withTaskMutationStorage<TResult>(opts: {
  ctx: CommandContext;
  local: (store: ReturnType<typeof getTaskStore>) => Promise<TResult> | TResult;
  remote: (backend: CommandContext["taskBackend"]) => Promise<TResult> | TResult;
}): Promise<TResult> {
  if (backendIsLocalFileBackend(opts.ctx)) {
    return await opts.local(getTaskStore(opts.ctx));
  }
  return await opts.remote(opts.ctx.taskBackend);
}

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

export async function applyTaskCollectionMutation<TResult>(opts: {
  ctx: CommandContext;
  build: (
    current: TaskData[],
  ) => Promise<TaskCollectionMutationPlan<TResult>> | TaskCollectionMutationPlan<TResult>;
}): Promise<{ result: TResult; tasksToWrite: TaskData[] }> {
  const current = await opts.ctx.taskBackend.listTasks();
  const plan = await opts.build(current.map((task) => ({ ...task })));
  const tasksToWrite = [...(plan.tasksToWrite ?? [])];
  if (tasksToWrite.length > 0) {
    await writeTasksOrFallback(opts.ctx.taskBackend, tasksToWrite);
  }
  return { result: plan.result, tasksToWrite };
}
