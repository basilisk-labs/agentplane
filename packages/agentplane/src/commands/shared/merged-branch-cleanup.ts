import { execFileAsync } from "@agentplaneorg/core/process";
import { gitEnv, findWorktreeForBranch } from "@agentplaneorg/core/git";
import { gitBranchExists } from "./git-ops.js";
import { isPathWithin, resolvePathFallback } from "./path.js";

export type MergedBranchCleanupResult = {
  removedBranch: boolean;
  removedWorktree: boolean;
  worktreePath: string | null;
  skippedReason: "outside_repo" | "current_worktree" | null;
  preservedDirtyState: boolean;
  stashMessage: string | null;
};

export async function cleanupMergedLocalBranch(opts: {
  gitRoot: string;
  branch: string;
  worktreePathHint?: string | null;
  preserveDirty?: boolean;
}): Promise<MergedBranchCleanupResult> {
  const repoRoot = await resolvePathFallback(opts.gitRoot);
  const discoveredWorktree = await findWorktreeForBranch(opts.gitRoot, opts.branch);
  const rawWorktreePath = discoveredWorktree ?? opts.worktreePathHint ?? null;
  const worktreePath = rawWorktreePath ? await resolvePathFallback(rawWorktreePath) : null;

  if (worktreePath) {
    let stashMessage: string | null = null;
    if (!isPathWithin(repoRoot, worktreePath)) {
      return {
        removedBranch: false,
        removedWorktree: false,
        worktreePath,
        skippedReason: "outside_repo",
        preservedDirtyState: false,
        stashMessage: null,
      };
    }
    if (worktreePath === repoRoot) {
      return {
        removedBranch: false,
        removedWorktree: false,
        worktreePath,
        skippedReason: "current_worktree",
        preservedDirtyState: false,
        stashMessage: null,
      };
    }
    if (opts.preserveDirty === true) {
      const { stdout } = await execFileAsync(
        "git",
        ["status", "--porcelain", "--untracked-files=all"],
        {
          cwd: worktreePath,
          env: gitEnv(),
        },
      );
      if (stdout.trim()) {
        stashMessage = `agentplane/cleanup-preserve:${opts.branch}`;
        await execFileAsync("git", ["stash", "push", "-u", "-m", stashMessage], {
          cwd: worktreePath,
          env: gitEnv(),
        });
      }
    }
    await execFileAsync("git", ["worktree", "remove", "--force", worktreePath], {
      cwd: opts.gitRoot,
      env: gitEnv(),
    });
    const removed = await removeBranch(opts.gitRoot, opts.branch);
    return {
      removedBranch: removed,
      removedWorktree: true,
      worktreePath,
      skippedReason: null,
      preservedDirtyState: stashMessage !== null,
      stashMessage,
    };
  }

  const removedBranch = await removeBranch(opts.gitRoot, opts.branch);

  return {
    removedBranch,
    removedWorktree: Boolean(worktreePath),
    worktreePath,
    skippedReason: null,
    preservedDirtyState: false,
    stashMessage: null,
  };
}

async function removeBranch(gitRoot: string, branch: string): Promise<boolean> {
  if (!(await gitBranchExists(gitRoot, branch))) return false;
  await execFileAsync("git", ["branch", "-D", branch], {
    cwd: gitRoot,
    env: gitEnv(),
  });
  return true;
}
