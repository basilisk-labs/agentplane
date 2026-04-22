import { normalizeTaskStatus } from "@agentplaneorg/core/tasks";

import { mapBackendError } from "../../cli/error-map.js";
import { successMessage } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import type { TaskData } from "../../backends/task-backend.js";
import { ensureActionApproved } from "../shared/approval-requirements.js";
import { loadCommandContext, type CommandContext } from "../shared/task-backend.js";
import { applyTaskCollectionMutation } from "../shared/task-mutation.js";
import { collectTaskIncidents } from "../incidents/shared.js";
import { syncHostedMergedTasks, syncLocallyShippedBranchPrTasks } from "./hosted-merge-sync.js";

function dedupeTaskIds(taskIds: readonly string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const rawTaskId of taskIds) {
    const taskId = rawTaskId.trim();
    if (!taskId || seen.has(taskId)) continue;
    seen.add(taskId);
    result.push(taskId);
  }
  return result;
}

function selectTasksForNormalize(
  current: readonly TaskData[],
  taskIds: readonly string[],
): TaskData[] {
  if (taskIds.length === 0) return current.map((task) => ({ ...task }));
  const byId = new Map(current.map((task) => [task.id, task] as const));
  const missing: string[] = [];
  const selected: TaskData[] = [];
  for (const taskId of taskIds) {
    const task = byId.get(taskId);
    if (!task) {
      missing.push(taskId);
      continue;
    }
    selected.push({ ...task });
  }
  if (missing.length > 0) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: `Unknown task${missing.length === 1 ? "" : "s"}: ${missing.join(", ")}`,
    });
  }
  return selected;
}

function diffTasksToWrite(current: readonly TaskData[], next: readonly TaskData[]): TaskData[] {
  const previousById = new Map(current.map((task) => [task.id, JSON.stringify(task)] as const));
  return next.filter((task) => previousById.get(task.id) !== JSON.stringify(task));
}

export async function cmdTaskNormalize(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  quiet: boolean;
  force: boolean;
  yes?: boolean;
  syncHostedMerges?: boolean;
  syncBranchPrState?: boolean;
  taskIds?: string[];
}): Promise<number> {
  try {
    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
    const selectedTaskIds = dedupeTaskIds(opts.taskIds ?? []);
    if (opts.force) {
      await ensureActionApproved({
        action: "force_action",
        config: ctx.config,
        yes: opts.yes === true,
        reason: "task normalize --force",
      });
    }
    if (
      ctx.taskBackend.normalizeTasks &&
      opts.syncHostedMerges !== true &&
      opts.syncBranchPrState !== true
    ) {
      const result = await ctx.taskBackend.normalizeTasks();
      if (!opts.quiet) {
        process.stdout.write(
          `${successMessage("normalized tasks", undefined, `scanned=${result.scanned} changed=${result.changed}`)}\n`,
        );
      }
      return 0;
    }

    let syncedHostedMerges = 0;
    let syncedBranchPrState = 0;
    let promotedIncidents = 0;
    const passThroughNormalizeWrite =
      opts.syncHostedMerges !== true && opts.syncBranchPrState !== true;
    const { result, tasksToWrite } = await applyTaskCollectionMutation({
      ctx,
      build: async (tasks) => {
        const scopedTasks = selectTasksForNormalize(tasks, selectedTaskIds);
        let nextTasks = scopedTasks;
        if (opts.syncHostedMerges === true) {
          const synced = await syncHostedMergedTasks({ ctx, tasks: nextTasks });
          nextTasks = synced.tasks;
          syncedHostedMerges = synced.synced;
        }
        if (opts.syncBranchPrState === true) {
          const synced = await syncLocallyShippedBranchPrTasks({ ctx, tasks: nextTasks });
          nextTasks = synced.tasks;
          syncedBranchPrState = synced.synced;
        }
        const nextTasksToWrite = passThroughNormalizeWrite
          ? nextTasks
          : diffTasksToWrite(scopedTasks, nextTasks);
        const incidentCandidates =
          opts.syncHostedMerges === true || opts.syncBranchPrState === true
            ? nextTasksToWrite.filter((task) => normalizeTaskStatus(task.status) === "DONE")
            : [];
        for (const task of incidentCandidates) {
          await collectTaskIncidents({
            ctx,
            taskId: task.id,
            task,
            write: false,
          });
        }
        return {
          result: { incidentCandidates },
          tasksToWrite: nextTasksToWrite,
        };
      },
    });
    for (const task of result.incidentCandidates) {
      const collected = await collectTaskIncidents({
        ctx,
        taskId: task.id,
        task,
        write: true,
      });
      promotedIncidents += collected.plan.promotable.length;
    }
    if (!opts.quiet) {
      process.stdout.write(
        `${successMessage(
          "normalized tasks",
          undefined,
          `count=${tasksToWrite.length}${
            opts.syncHostedMerges === true ? ` synced_hosted_merges=${syncedHostedMerges}` : ""
          }${
            opts.syncBranchPrState === true ? ` synced_branch_pr_state=${syncedBranchPrState}` : ""
          }${
            opts.syncHostedMerges === true || opts.syncBranchPrState === true
              ? ` promoted_incidents=${promotedIncidents}`
              : ""
          }`,
        )}\n`,
      );
    }
    return 0;
  } catch (err) {
    throw mapBackendError(err, { command: "task normalize", root: opts.rootOverride ?? null });
  }
}
