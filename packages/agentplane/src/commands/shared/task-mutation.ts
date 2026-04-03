import type { TaskData, TaskWriteOptions } from "../../backends/task-backend.js";
import { PolicyEngine } from "../../policy/engine.js";
import type { PolicyActionId } from "../../policy/taxonomy.js";
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
  writeOptions?: TaskWriteOptions;
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
  policyAction?: PolicyActionId;
  build: (
    current: TaskData,
  ) => Promise<TaskMutationPlan | null | undefined> | TaskMutationPlan | null | undefined;
  writeOptions?: TaskWriteOptions;
}): Promise<{ changed: boolean; task: TaskData; mode: "local-store" | "backend" }> {
  void new PolicyEngine().evaluate({
    action: opts.policyAction ?? "task_mutation",
    config: opts.ctx.config,
    taskId: opts.taskId,
    git: { stagedPaths: [] },
  });

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
  let materializedCurrent = current;
  if (opts.ctx.taskBackend.getTaskDoc) {
    const currentDoc =
      typeof current.doc === "string" && current.doc.length > 0
        ? current.doc
        : ((await opts.ctx.taskBackend.getTaskDoc(opts.taskId)) ?? "");
    if (currentDoc !== current.doc) {
      materializedCurrent = { ...current, doc: currentDoc };
    }
  }

  const plan = await opts.build({ ...materializedCurrent });
  if (!plan) return { changed: false, task: current, mode: "backend" };

  const nextTask =
    plan.nextTask ??
    (plan.intents === undefined
      ? undefined
      : applyTaskStoreIntentsToTask(materializedCurrent, plan.intents));
  if (nextTask === undefined) {
    return { changed: false, task: current, mode: "backend" };
  }

  const changed = JSON.stringify(materializedCurrent) !== JSON.stringify(nextTask);
  if (!changed && plan.forceWrite !== true) {
    return { changed: false, task: nextTask, mode: "backend" };
  }

  const mergedWriteOptions: TaskWriteOptions = {};
  if (opts.writeOptions) Object.assign(mergedWriteOptions, opts.writeOptions);
  if (plan.writeOptions) Object.assign(mergedWriteOptions, plan.writeOptions);
  await opts.ctx.taskBackend.writeTask(nextTask, mergedWriteOptions);
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
