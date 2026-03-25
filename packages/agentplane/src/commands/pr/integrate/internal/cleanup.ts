import { execFileAsync, gitEnv } from "../../../shared/git.js";
import { gitBranchExists } from "../../../shared/git-ops.js";
import { findWorktreeForBranch } from "../../../shared/git-worktree.js";
import { isPathWithin, resolvePathFallback } from "../../../shared/path.js";

export type IntegrateCleanupResult = {
  removedBranch: boolean;
  removedWorktree: boolean;
  worktreePath: string | null;
  skippedReason: "outside_repo" | "current_worktree" | null;
};

export async function cleanupIntegratedBranch(opts: {
  gitRoot: string;
  branch: string;
  worktreePathHint?: string | null;
}): Promise<IntegrateCleanupResult> {
  const repoRoot = await resolvePathFallback(opts.gitRoot);
  const discoveredWorktree = await findWorktreeForBranch(opts.gitRoot, opts.branch);
  const rawWorktreePath = discoveredWorktree ?? opts.worktreePathHint ?? null;
  const worktreePath = rawWorktreePath ? await resolvePathFallback(rawWorktreePath) : null;

  if (worktreePath) {
    if (!isPathWithin(repoRoot, worktreePath)) {
      return {
        removedBranch: false,
        removedWorktree: false,
        worktreePath,
        skippedReason: "outside_repo",
      };
    }
    if (worktreePath === repoRoot) {
      return {
        removedBranch: false,
        removedWorktree: false,
        worktreePath,
        skippedReason: "current_worktree",
      };
    }
    await execFileAsync("git", ["worktree", "remove", "--force", worktreePath], {
      cwd: opts.gitRoot,
      env: gitEnv(),
    });
  }

  let removedBranch = false;
  if (await gitBranchExists(opts.gitRoot, opts.branch)) {
    await execFileAsync("git", ["branch", "-D", opts.branch], {
      cwd: opts.gitRoot,
      env: gitEnv(),
    });
    removedBranch = true;
  }

  return {
    removedBranch,
    removedWorktree: Boolean(worktreePath),
    worktreePath,
    skippedReason: null,
  };
}
