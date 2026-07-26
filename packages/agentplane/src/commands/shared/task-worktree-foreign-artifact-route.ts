import type { CommandContext } from "./task-backend.js";
import {
  inspectForeignTaskReadmeReplicaRepair,
  type ForeignTaskReadmeReplicaRepair,
} from "./task-worktree-foreign-artifact-repair.js";
import type { TaskWorktreeCleanliness } from "./task-worktree-cleanliness.js";

export async function inspectForeignTaskReadmeReplicaRepairForRoute(
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
