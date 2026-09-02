import { TASK_KERNEL_EXTENSION } from "../../adapters/task-backend/kernel-record.js";
import { projectTaskCentricCompatibilityMutation } from "../../adapters/task-backend/task-centric-backend-adapter.js";
import {
  projectTaskLifecycleToLegacyStatus,
  taskCentricAggregateFromExtensions,
} from "@agentplaneorg/core/tasks";

import path from "node:path";

import type { TaskData, TaskWriteOptions, TaskWriteResult } from "../../backends/task-backend.js";
import { PolicyEngine } from "../../policy/engine.js";
import { CliError } from "../../shared/errors.js";
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

export function assertLegacyMutation(task: TaskData): void {
  if (task.extensions && Object.hasOwn(task.extensions, TASK_KERNEL_EXTENSION))
    throw new Error(
      "Canonical Task mutations require the kernel lifecycle; legacy mutation is refused",
    );
}

function assertTaskCentricProjection(opts: { current: TaskData; next: TaskData }): void {
  const task = opts.next;
  const aggregate = taskCentricAggregateFromExtensions(task.extensions);
  if (!aggregate) return;
  const expectedStatus = projectTaskLifecycleToLegacyStatus(aggregate.lifecycle);
  const changed = JSON.stringify(opts.current) !== JSON.stringify(task);
  const expectedRevision = changed
    ? (opts.current.revision ?? aggregate.revision - 1) + 1
    : (opts.current.revision ?? aggregate.revision);
  if (task.status === expectedStatus && aggregate.revision === expectedRevision) return;
  throw new CliError({
    code: "E_VALIDATION",
    message:
      `Legacy mutation would expose a partial task-centric projection for ${task.id}: ` +
      `task status/revision=${task.status}/${String(expectedRevision)}, ` +
      `canonical status/revision=${expectedStatus}/${String(aggregate.revision)}.`,
    context: {
      reason_code: "task_centric_projection_mismatch",
      task_id: task.id,
      task_status: task.status,
      task_revision: expectedRevision,
      canonical_status: expectedStatus,
      canonical_revision: aggregate.revision,
    },
  });
}
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
  assertLegacyMutation(opts.task);
  const stored = await backend.getTask(opts.task.id);
  if (stored) assertLegacyMutation(stored);
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
        assertLegacyMutation(current);
        assertTaskMutationPolicy({
          ctx: opts.ctx,
          taskId: opts.taskId,
          task: current,
          action: policyAction,
          phase: opts.phase,
        });
        const plan = await opts.build({ ...current });
        if (!plan) return current;
        if (plan.nextTask !== undefined) {
          const next = projectTaskCentricCompatibilityMutation({
            current,
            next: plan.nextTask,
          });
          assertTaskCentricProjection({ current, next });
          return next;
        }
        if (plan.intents !== undefined) {
          const next = projectTaskCentricCompatibilityMutation({
            current,
            next: applyTaskStoreIntentsToTask(current, plan.intents),
          });
          assertTaskCentricProjection({ current, next });
          return next;
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
  assertLegacyMutation(current);
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
  const reconciledTask = projectTaskCentricCompatibilityMutation({
    current: materializedCurrent,
    next: nextTask,
  });
  assertTaskCentricProjection({ current: materializedCurrent, next: reconciledTask });

  const changed = JSON.stringify(materializedCurrent) !== JSON.stringify(reconciledTask);
  if (!changed && plan.forceWrite !== true) {
    return { changed: false, task: reconciledTask, mode: "backend" };
  }

  const mergedWriteOptions: TaskWriteOptions = {};
  if (opts.writeOptions) Object.assign(mergedWriteOptions, opts.writeOptions);
  if (plan.writeOptions) Object.assign(mergedWriteOptions, plan.writeOptions);
  const mutation = await writeTaskMutation({
    ctx: opts.ctx,
    task: reconciledTask,
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
  for (const task of tasksToWrite) {
    assertLegacyMutation(task);
    const stored = current.find((entry) => entry.id === task.id);
    if (stored) assertLegacyMutation(stored);
  }
  if (tasksToWrite.length > 0) {
    await writeTasksOrFallback(opts.ctx.taskBackend, tasksToWrite);
  }
  return { result: plan.result, tasksToWrite };
}
