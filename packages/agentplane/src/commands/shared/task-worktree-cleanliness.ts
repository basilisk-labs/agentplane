import { findWorktreeForBranch, GitContext } from "@agentplaneorg/core/git";

import { CliError } from "../../shared/errors.js";

export type TaskWorktreeCleanliness =
  | {
      state: "not_present";
      branch: string;
      worktreePath: null;
      changedPaths: [];
    }
  | {
      state: "clean";
      branch: string;
      worktreePath: string;
      changedPaths: [];
    }
  | {
      state: "dirty";
      branch: string;
      worktreePath: string;
      changedPaths: string[];
    }
  | {
      state: "unavailable";
      branch: string;
      worktreePath: string | null;
      changedPaths: [];
      reason: string;
    };

export async function inspectTaskWorktreeCleanliness(opts: {
  gitRoot: string;
  branch: string;
}): Promise<TaskWorktreeCleanliness> {
  let worktreePath: string | null = null;
  try {
    worktreePath = await findWorktreeForBranch(opts.gitRoot, opts.branch);
    if (!worktreePath) {
      return {
        state: "not_present",
        branch: opts.branch,
        worktreePath: null,
        changedPaths: [],
      };
    }
    const changedPaths = await new GitContext({ gitRoot: worktreePath }).statusChangedPaths();
    if (changedPaths.length === 0) {
      return {
        state: "clean",
        branch: opts.branch,
        worktreePath,
        changedPaths: [],
      };
    }
    return {
      state: "dirty",
      branch: opts.branch,
      worktreePath,
      changedPaths,
    };
  } catch (err) {
    return {
      state: "unavailable",
      branch: opts.branch,
      worktreePath,
      changedPaths: [],
      reason: err instanceof Error ? err.message : String(err),
    };
  }
}

export function summarizeTaskWorktreeChanges(changedPaths: readonly string[]): string {
  const shown = changedPaths.slice(0, 3).join(", ");
  const remainder = changedPaths.length > 3 ? ` +${changedPaths.length - 3} more` : "";
  return `${shown}${remainder}`;
}

export function assertTaskWorktreeClean(opts: {
  taskId: string;
  probe: TaskWorktreeCleanliness;
}): void {
  if (opts.probe.state === "dirty") {
    throw new CliError({
      code: "E_VALIDATION",
      message:
        `Task worktree contains uncommitted changes for ${opts.taskId}: ` +
        `${summarizeTaskWorktreeChanges(opts.probe.changedPaths)}. ` +
        "Commit the intended task state or restore unintended changes before integration.",
      context: {
        reason_code: "task_worktree_dirty",
        task_id: opts.taskId,
        branch: opts.probe.branch,
        worktree_path: opts.probe.worktreePath,
        changed_paths: opts.probe.changedPaths,
      },
    });
  }
  if (opts.probe.state === "unavailable") {
    throw new CliError({
      code: "E_GIT",
      message:
        `Task worktree state could not be inspected for ${opts.taskId}: ${opts.probe.reason}. ` +
        "Inspect the task worktree before integration.",
      context: {
        reason_code: "task_worktree_state_unavailable",
        task_id: opts.taskId,
        branch: opts.probe.branch,
        worktree_path: opts.probe.worktreePath,
      },
    });
  }
}

export async function requireCleanTaskWorktree(opts: {
  gitRoot: string;
  branch: string;
  taskId: string;
}): Promise<TaskWorktreeCleanliness> {
  const probe = await inspectTaskWorktreeCleanliness(opts);
  assertTaskWorktreeClean({ taskId: opts.taskId, probe });
  return probe;
}
