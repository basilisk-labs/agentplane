import { readFile } from "node:fs/promises";
import path from "node:path";

import { normalizeTaskStatus } from "@agentplaneorg/core/tasks";

import type { TaskData } from "../../../backends/task-backend.js";
import { exitCodeForError } from "../../../cli/exit-codes.js";
import { fileExists } from "../../../cli/fs-utils.js";
import { CliError } from "../../../shared/errors.js";
import { parsePrMeta, type PrMeta } from "../../shared/pr-meta.js";
import { resolveTaskBranchFromContext, type CommandContext } from "../../shared/task-backend.js";

type BatchValidationDeps = {
  getTask?: (taskId: string) => Promise<TaskData | null>;
  resolveTaskBranch?: (taskId: string) => Promise<string | null>;
  readPrMeta?: (taskId: string) => Promise<PrMeta | null>;
};

async function readIncludedTaskPrMeta(opts: {
  ctx: CommandContext;
  taskId: string;
}): Promise<PrMeta | null> {
  const metaPath = path.join(
    opts.ctx.resolvedProject.gitRoot,
    opts.ctx.config.paths.workflow_dir,
    opts.taskId,
    "pr",
    "meta.json",
  );
  if (!(await fileExists(metaPath))) return null;
  return parsePrMeta(await readFile(metaPath, "utf8"), opts.taskId);
}

function normalizeRawIncludedIds(opts: {
  primaryTaskId: string;
  includeTaskIds: string[] | undefined;
  errors: string[];
}): string[] {
  const seen = new Set<string>();
  const includedTaskIds: string[] = [];
  for (const raw of opts.includeTaskIds ?? []) {
    const taskId = raw.trim();
    if (!taskId) continue;
    if (taskId === opts.primaryTaskId) {
      opts.errors.push(`include-task ${taskId} points at the primary task`);
      continue;
    }
    if (seen.has(taskId)) {
      opts.errors.push(`include-task ${taskId} is duplicated`);
      continue;
    }
    seen.add(taskId);
    includedTaskIds.push(taskId);
  }
  return includedTaskIds.toSorted();
}

export async function validateBranchPrBatchIncludedTasks(opts: {
  ctx: CommandContext;
  primaryTaskId: string;
  includeTaskIds?: string[];
  primaryBranch: string;
  deps?: BatchValidationDeps;
}): Promise<string[]> {
  const errors: string[] = [];
  const includedTaskIds = normalizeRawIncludedIds({
    primaryTaskId: opts.primaryTaskId,
    includeTaskIds: opts.includeTaskIds,
    errors,
  });
  if (includedTaskIds.length === 0 && errors.length === 0) return [];

  const getTask = opts.deps?.getTask ?? ((taskId) => opts.ctx.taskBackend.getTask(taskId));
  const resolveTaskBranch =
    opts.deps?.resolveTaskBranch ??
    ((taskId) => resolveTaskBranchFromContext({ ctx: opts.ctx, taskId }));
  const readPrMeta =
    opts.deps?.readPrMeta ?? ((taskId) => readIncludedTaskPrMeta({ ctx: opts.ctx, taskId }));

  await Promise.all(
    includedTaskIds.map(async (taskId) => {
      const task = await getTask(taskId);
      if (!task) {
        errors.push(`include-task ${taskId} does not exist`);
        return;
      }
      if (normalizeTaskStatus(task.status) === "DONE") {
        errors.push(`include-task ${taskId} is already DONE`);
      }
      if (task.verification?.state !== "ok") {
        errors.push(`include-task ${taskId} does not have ok verification`);
      }

      const [taskBranch, prMeta] = await Promise.all([
        resolveTaskBranch(taskId),
        readPrMeta(taskId),
      ]);
      if (taskBranch && taskBranch !== opts.primaryBranch) {
        errors.push(`include-task ${taskId} already owns branch ${taskBranch}`);
      }
      const metaBranch = prMeta?.branch?.trim() ?? "";
      if (metaBranch && metaBranch !== opts.primaryBranch) {
        errors.push(`include-task ${taskId} already has PR metadata for branch ${metaBranch}`);
      }
    }),
  );

  if (errors.length > 0) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message: `Invalid branch_pr batch include-task selection:\n- ${errors.toSorted().join("\n- ")}`,
    });
  }

  return includedTaskIds;
}
