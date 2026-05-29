import type { TaskData } from "../../../backends/task-backend.js";
import { isRecord } from "../../../shared/guards.js";
import type { CommandContext } from "../../shared/task-backend.js";

export function normalizeRelatedTaskIds(
  value: string[] | undefined,
  primaryTaskId: string,
): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const raw of value ?? []) {
    const id = raw.trim();
    if (!id || id === primaryTaskId || seen.has(id)) continue;
    seen.add(id);
    result.push(id);
  }
  return result.toSorted();
}

export function normalizeBranchPrBatchIncludedTaskIds(
  task: TaskData,
  primaryTaskId: string,
): string[] {
  const batch = isRecord(task.extensions?.branch_pr_batch) ? task.extensions.branch_pr_batch : null;
  if (batch?.role !== "primary" || batch.primary_task_id !== primaryTaskId) return [];
  if (!Array.isArray(batch.included_task_ids)) return [];
  return normalizeRelatedTaskIds(
    batch.included_task_ids.filter((entry): entry is string => typeof entry === "string"),
    primaryTaskId,
  );
}

function withBranchPrBatchExtension(opts: {
  task: TaskData;
  role: "primary" | "included";
  primaryTaskId: string;
  includedTaskIds: string[];
  branch: string;
  base: string | null;
  updatedAt: string;
}): TaskData {
  const extensions = isRecord(opts.task.extensions) ? { ...opts.task.extensions } : {};
  extensions.branch_pr_batch = {
    role: opts.role,
    primary_task_id: opts.primaryTaskId,
    included_task_ids: opts.includedTaskIds,
    branch: opts.branch,
    base: opts.base,
    updated_at: opts.updatedAt,
  };
  return { ...opts.task, extensions };
}

function withoutBranchPrBatchExtension(task: TaskData): TaskData {
  if (!isRecord(task.extensions) || !("branch_pr_batch" in task.extensions)) return task;
  const extensions = { ...task.extensions };
  delete extensions.branch_pr_batch;
  return { ...task, extensions };
}

function hasBranchPrBatchPrimary(task: TaskData, primaryTaskId: string): boolean {
  const batch = isRecord(task.extensions?.branch_pr_batch) ? task.extensions.branch_pr_batch : null;
  return batch?.primary_task_id === primaryTaskId;
}

export async function recordBranchPrBatchOwnership(opts: {
  ctx: CommandContext;
  primaryTask: TaskData;
  previousIncludedTaskIds: string[];
  includedTaskIds: string[];
  branch: string;
  base: string | null;
  updatedAt: string;
}): Promise<TaskData> {
  const staleTaskIds = opts.previousIncludedTaskIds.filter(
    (taskId) => !opts.includedTaskIds.includes(taskId),
  );
  const nextPrimary =
    opts.includedTaskIds.length > 0
      ? withBranchPrBatchExtension({
          task: opts.primaryTask,
          role: "primary",
          primaryTaskId: opts.primaryTask.id,
          includedTaskIds: opts.includedTaskIds,
          branch: opts.branch,
          base: opts.base,
          updatedAt: opts.updatedAt,
        })
      : withoutBranchPrBatchExtension(opts.primaryTask);

  if (nextPrimary !== opts.primaryTask) {
    await opts.ctx.taskBackend.writeTask(nextPrimary);
  }

  for (const taskId of staleTaskIds) {
    const staleTask = await opts.ctx.taskBackend.getTask(taskId);
    if (!staleTask) continue;
    if (!hasBranchPrBatchPrimary(staleTask, opts.primaryTask.id)) continue;
    await opts.ctx.taskBackend.writeTask(withoutBranchPrBatchExtension(staleTask));
  }

  if (opts.includedTaskIds.length === 0) return nextPrimary;

  await Promise.all(
    opts.includedTaskIds.map(async (taskId) => {
      const includedTask = await opts.ctx.taskBackend.getTask(taskId);
      if (!includedTask) return;
      await opts.ctx.taskBackend.writeTask(
        withBranchPrBatchExtension({
          task: includedTask,
          role: "included",
          primaryTaskId: opts.primaryTask.id,
          includedTaskIds: opts.includedTaskIds,
          branch: opts.branch,
          base: opts.base,
          updatedAt: opts.updatedAt,
        }),
      );
    }),
  );

  return nextPrimary;
}
