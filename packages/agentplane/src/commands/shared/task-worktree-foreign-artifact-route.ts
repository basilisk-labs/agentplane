import type { CommandContext } from "./task-backend.js";
import {
  inspectForeignTaskReadmeReplicaRepair,
  type ForeignTaskReadmeReplicaRepair,
} from "./task-worktree-foreign-artifact-repair.js";
import {
  inspectTaskWorktreeCleanliness,
  type TaskWorktreeCleanliness,
} from "./task-worktree-cleanliness.js";

async function inspectForeignTaskReadmeReplicaRepairForRoute(
  ctx: CommandContext,
  activeTaskId: string,
  baseBranch: string | null,
  taskWorktree: TaskWorktreeCleanliness,
): Promise<ForeignTaskReadmeReplicaRepair> {
  if (taskWorktree.state !== "dirty" || !taskWorktree.worktreePath) {
    return { state: "not_applicable", reason: "task_worktree_not_dirty" };
  }
  return inspectForeignTaskReadmeReplicaRepair({
    ctx,
    activeTaskId,
    taskWorktreePath: taskWorktree.worktreePath,
    baseBranch,
  }).catch(() => ({
    state: "not_applicable" as const,
    reason: "foreign_replica_inspection_failed",
  }));
}

export async function inspectTaskWorktreeRouteState(opts: {
  ctx: CommandContext;
  activeTaskId: string;
  baseBranch: string | null;
  taskBranch: string | null;
}): Promise<{
  taskWorktreeCleanliness: TaskWorktreeCleanliness;
  foreignTaskReadmeReplicaRepair: ForeignTaskReadmeReplicaRepair;
}> {
  const taskWorktreeCleanliness: TaskWorktreeCleanliness = opts.taskBranch
    ? await inspectTaskWorktreeCleanliness({
        gitRoot: opts.ctx.resolvedProject.gitRoot,
        branch: opts.taskBranch,
      })
    : { state: "not_present", branch: "", worktreePath: null, changedPaths: [] };
  const foreignTaskReadmeReplicaRepair = await inspectForeignTaskReadmeReplicaRepairForRoute(
    opts.ctx,
    opts.activeTaskId,
    opts.baseBranch,
    taskWorktreeCleanliness,
  );
  return { taskWorktreeCleanliness, foreignTaskReadmeReplicaRepair };
}
