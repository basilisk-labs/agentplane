import path from "node:path";

import type { TaskData, TaskWriteOptions, TaskWriteResult } from "../../backends/task-backend.js";
import { PolicyEngine } from "../../policy/engine.js";
import type { PolicyPhase, TaskPolicyState } from "../../policy/model.js";
import type { PolicyActionId } from "../../policy/taxonomy.js";
import { throwIfPolicyDecisionDenied } from "./policy-deny.js";
import {
  backendUsesLocalTaskStore,
  loadTaskFromContext,
  writeTasksOrFallback,
  type CommandContext,
} from "./task-backend.js";
import {
  applyTaskStoreIntentsToTask,
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

/** A stable receipt for a task mutation, independent of the active task backend. */
export type TaskMutationResult = {
  task_id: string;
  revision: number | null;
  backend_id: string;
  artifact_paths: string[];
};

export type PersistedTaskMutationResult = TaskMutationResult & {
  task: TaskData;
  changed: boolean;
};

function taskArtifactPaths(ctx: CommandContext, taskId: string): string[] {
  const taskReadme = path.resolve(
    ctx.resolvedProject.gitRoot,
    ctx.config.paths.workflow_dir,
    taskId,
    "README.md",
  );
  const relative = path.relative(ctx.resolvedProject.gitRoot, taskReadme);
  if (relative && !relative.startsWith(`..${path.sep}`) && relative !== "..") {
    return [relative.split(path.sep).join("/")];
  }
  return [taskReadme];
}

function normalizeArtifactPath(ctx: CommandContext, artifactPath: string): string {
  const absolute = path.resolve(ctx.resolvedProject.gitRoot, artifactPath);
  const relative = path.relative(ctx.resolvedProject.gitRoot, absolute);
  if (relative && !relative.startsWith(`..${path.sep}`) && relative !== "..") {
    return relative.split(path.sep).join("/");
  }
  return absolute;
}

function taskRevision(task: TaskData): number | null {
  return typeof task.revision === "number" && Number.isInteger(task.revision)
    ? task.revision
    : null;
}

/**
 * Persists one task and returns the exact identity that downstream filesystem
 * phases must retain. Native backends provide an atomic receipt; the fallback
 * keeps older third-party backends compatible while they adopt that contract.
 */
export async function writeTaskMutation(opts: {
  ctx: CommandContext;
  task: TaskData;
  writeOptions?: TaskWriteOptions;
}): Promise<PersistedTaskMutationResult> {
  const backend = opts.ctx.taskBackend;
  const writeResult: TaskWriteResult = backend.writeTaskWithResult
    ? await backend.writeTaskWithResult(opts.task, opts.writeOptions)
    : await (async () => {
        await backend.writeTask(opts.task, opts.writeOptions);
        const persisted = await backend.getTask(opts.task.id);
        if (!persisted) {
          throw new Error(
            `Task backend ${backend.id} did not return ${opts.task.id} after a legacy writeTask() mutation.`,
          );
        }
        return { task: persisted, changed: true };
      })();
  if (writeResult.task.id !== opts.task.id) {
    throw new Error(
      `Task backend ${backend.id} returned receipt for ${writeResult.task.id} after writing ${opts.task.id}.`,
    );
  }
  return {
    task_id: writeResult.task.id,
    revision: taskRevision(writeResult.task),
    backend_id: backend.id,
    artifact_paths: (
      writeResult.artifact_paths ?? taskArtifactPaths(opts.ctx, writeResult.task.id)
    ).map((artifactPath) => normalizeArtifactPath(opts.ctx, artifactPath)),
    task: writeResult.task,
    changed: writeResult.changed,
  };
}

function taskPolicyStateFromTask(task: TaskData, ctx: CommandContext): TaskPolicyState {
  return {
    status: task.status,
    planApprovalState: task.plan_approval?.state ?? null,
    verificationState: task.verification?.state ?? null,
    workflowMode: ctx.config.workflow_mode,
  };
}

export function assertTaskMutationPolicy(opts: {
  ctx: CommandContext;
  taskId: string;
  task: TaskData;
  action: PolicyActionId;
  phase?: PolicyPhase;
}): void {
  const decision = new PolicyEngine().evaluate({
    action: opts.action,
    phase: opts.phase,
    config: opts.ctx.config,
    taskId: opts.taskId,
    task: taskPolicyStateFromTask(opts.task, opts.ctx),
    git: { stagedPaths: [] },
  });
  throwIfPolicyDecisionDenied(decision);
}

export async function withTaskMutationStorage<TResult>(opts: {
  ctx: CommandContext;
  local: (store: ReturnType<typeof getTaskStore>) => Promise<TResult> | TResult;
  remote: (backend: CommandContext["taskBackend"]) => Promise<TResult> | TResult;
}): Promise<TResult> {
  if (backendUsesLocalTaskStore(opts.ctx)) {
    return await opts.local(getTaskStore(opts.ctx));
  }
  return await opts.remote(opts.ctx.taskBackend);
}

export async function applyTaskMutation(opts: {
  ctx: CommandContext;
  taskId: string;
  policyAction?: PolicyActionId;
  phase?: PolicyPhase;
  build: (
    current: TaskData,
  ) => Promise<TaskMutationPlan | null | undefined> | TaskMutationPlan | null | undefined;
  writeOptions?: TaskWriteOptions;
}): Promise<{ changed: boolean; task: TaskData; mode: "local-store" | "backend" }> {
  const policyAction = opts.policyAction ?? "task_mutation";

  if (backendUsesLocalTaskStore(opts.ctx)) {
    const store = getTaskStore(opts.ctx);
    const result = await store.update(
      opts.taskId,
      async (current) => {
        assertTaskMutationPolicy({
          ctx: opts.ctx,
          taskId: opts.taskId,
          task: current,
          action: policyAction,
          phase: opts.phase,
        });
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

  assertTaskMutationPolicy({
    ctx: opts.ctx,
    taskId: opts.taskId,
    task: materializedCurrent,
    action: policyAction,
    phase: opts.phase,
  });

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
  const mutation = await writeTaskMutation({
    ctx: opts.ctx,
    task: nextTask,
    writeOptions: mergedWriteOptions,
  });
  return { changed, task: mutation.task, mode: "backend" };
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
