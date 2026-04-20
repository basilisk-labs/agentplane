import type { TaskData } from "../../backends/task-backend.js";
import { CliError } from "../../shared/errors.js";
import { writeJsonStableIfChanged } from "../../shared/write-if-changed.js";
import type { CommandContext } from "../shared/task-backend.js";
import { backendUsesLocalTaskStore } from "../shared/task-backend.js";
import {
  buildLocallyMergedSyncedTask,
  buildLocallySyncedPrMeta,
  buildLocallySyncedTask,
  buildSyncedPrMeta,
  buildSyncedTask,
  needsHostedMergeSync,
  needsHostedMergeSyncFromLocalMeta,
} from "./hosted-merge-sync/builders.js";
import { resolveHostedMergedPr } from "./hosted-merge-sync/github.js";
import { findLocallyShippedBranchPrTasks } from "./hosted-merge-sync/local-branch.js";
import { readPrMetaIfPresent, resolveLocalMergedPrMeta } from "./hosted-merge-sync/pr-meta.js";
import type { HostedMergeSyncResult, HostedMergeTarget } from "./hosted-merge-sync/types.js";

export type {
  HostedMergedPr,
  HostedMergeSyncResult,
  HostedMergeTarget,
  LocalBranchPrSyncCandidate,
  LocalDoneBranchPrDrift,
  LocalMergedPrMeta,
} from "./hosted-merge-sync/types.js";
export {
  findDoneBranchPrTasksWithOpenPrArtifacts,
  findLocallyShippedBranchPrTasks,
} from "./hosted-merge-sync/local-branch.js";
export {
  resolveHostedMergedPr,
  resolveHostedMergeTargetFromEvent,
} from "./hosted-merge-sync/github.js";
export { resolveLocalMergedPrMeta } from "./hosted-merge-sync/pr-meta.js";

export async function syncHostedMergedTask(opts: {
  ctx: CommandContext;
  tasks: TaskData[];
  target: HostedMergeTarget;
  missingTask?: "noop" | "error";
  missingPrMeta?: "noop" | "error";
}): Promise<HostedMergeSyncResult> {
  if (!backendUsesLocalTaskStore(opts.ctx) || opts.ctx.config.workflow_mode !== "branch_pr") {
    return { tasks: opts.tasks, synced: 0 };
  }

  const task = opts.tasks.find((entry) => entry.id === opts.target.taskId);
  if (!task) {
    if (opts.missingTask === "error") {
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message: `Hosted task closure could not find task artifact: ${opts.target.taskId}`,
      });
    }
    return { tasks: opts.tasks, synced: 0 };
  }

  const prMetaRecord = await readPrMetaIfPresent({ ctx: opts.ctx, taskId: opts.target.taskId });
  if (!prMetaRecord) {
    if (opts.missingPrMeta === "error") {
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message: `Hosted task closure could not find pr/meta.json for ${opts.target.taskId}`,
      });
    }
    return { tasks: opts.tasks, synced: 0 };
  }

  if (
    !needsHostedMergeSync({
      task,
      meta: prMetaRecord.meta,
      mergedPr: opts.target.mergedPr,
      branch: opts.target.branch,
    })
  ) {
    return { tasks: opts.tasks, synced: 0 };
  }

  const nextMeta = buildSyncedPrMeta({
    meta: prMetaRecord.meta,
    mergedPr: opts.target.mergedPr,
    branch: opts.target.branch,
  });
  await writeJsonStableIfChanged(prMetaRecord.metaPath, nextMeta);

  return {
    tasks: opts.tasks.map((entry) =>
      entry.id === opts.target.taskId
        ? buildSyncedTask({ task: entry, mergedPr: opts.target.mergedPr })
        : entry,
    ),
    synced: 1,
  };
}

export async function syncLocallyShippedBranchPrTasks(opts: {
  ctx: CommandContext;
  tasks: TaskData[];
}): Promise<HostedMergeSyncResult> {
  const matches = await findLocallyShippedBranchPrTasks(opts);
  if (matches.length === 0) return { tasks: opts.tasks, synced: 0 };
  for (const candidate of matches) {
    if (candidate.meta && candidate.metaPath && candidate.meta.status !== "MERGED") {
      await writeJsonStableIfChanged(
        candidate.metaPath,
        buildLocallySyncedPrMeta({ meta: candidate.meta, candidate }),
      );
    }
  }
  const byTaskId = new Map(matches.map((entry) => [entry.taskId, entry]));
  return {
    tasks: opts.tasks.map((task) => {
      const candidate = byTaskId.get(task.id);
      if (!candidate) return task;
      return candidate.taskStatus === "DONE" ? task : buildLocallySyncedTask({ task, candidate });
    }),
    synced: matches.length,
  };
}

export async function syncHostedMergedTasks(opts: {
  ctx: CommandContext;
  tasks: TaskData[];
}): Promise<HostedMergeSyncResult> {
  if (!backendUsesLocalTaskStore(opts.ctx) || opts.ctx.config.workflow_mode !== "branch_pr") {
    return { tasks: opts.tasks, synced: 0 };
  }

  const nextTasks: TaskData[] = [];
  let synced = 0;

  for (const task of opts.tasks) {
    const prMetaRecord = await readPrMetaIfPresent({ ctx: opts.ctx, taskId: task.id });
    if (!prMetaRecord) {
      nextTasks.push(task);
      continue;
    }

    const branch = prMetaRecord.meta.branch?.trim() ?? "";
    if (!branch) {
      nextTasks.push(task);
      continue;
    }

    const localMergedMeta = resolveLocalMergedPrMeta(prMetaRecord.meta);
    if (localMergedMeta) {
      const needsSync = needsHostedMergeSyncFromLocalMeta({ task, meta: localMergedMeta });
      nextTasks.push(
        needsSync ? buildLocallyMergedSyncedTask({ task, meta: localMergedMeta }) : task,
      );
      if (needsSync) synced += 1;
      continue;
    }

    const mergedPr = await resolveHostedMergedPr({
      cwd: opts.ctx.resolvedProject.gitRoot,
      branch,
    });
    if (!mergedPr?.mergeCommit?.oid) {
      nextTasks.push(task);
      continue;
    }

    const syncedTask = await syncHostedMergedTask({
      ctx: opts.ctx,
      tasks: [task],
      target: { taskId: task.id, branch, mergedPr },
      missingTask: "noop",
      missingPrMeta: "noop",
    });
    nextTasks.push(syncedTask.tasks[0] ?? task);
    synced += syncedTask.synced;
  }

  return { tasks: nextTasks, synced };
}
