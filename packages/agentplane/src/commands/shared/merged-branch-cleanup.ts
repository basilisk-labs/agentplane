import { rm } from "node:fs/promises";

import { execFileAsync } from "@agentplaneorg/core/process";
import { gitEnv, findWorktreeForBranch } from "@agentplaneorg/core/git";
import { CliError } from "../../shared/errors.js";
import { gitBranchExists, gitRevParse } from "./git-ops.js";
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
  expectedHeadSha?: string | null;
}): Promise<MergedBranchCleanupResult> {
  const repoRoot = await resolvePathFallback(opts.gitRoot);
  const discoveredWorktree = await findWorktreeForBranch(opts.gitRoot, opts.branch);
  const rawWorktreePath = discoveredWorktree ?? opts.worktreePathHint ?? null;
  const worktreePath = rawWorktreePath ? await resolvePathFallback(rawWorktreePath) : null;
  await assertExpectedBranchHead({
    gitRoot: opts.gitRoot,
    branch: opts.branch,
    expectedHeadSha: opts.expectedHeadSha ?? null,
  });

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
    await assertExpectedBranchHead({
      gitRoot: opts.gitRoot,
      branch: opts.branch,
      expectedHeadSha: opts.expectedHeadSha ?? null,
    });
    const { stdout: finalStatus } = await execFileAsync(
      "git",
      ["status", "--porcelain", "--untracked-files=all"],
      {
        cwd: worktreePath,
        env: gitEnv(),
      },
    );
    if (finalStatus.trim()) {
      throw new CliError({
        code: "E_GIT_RACE",
        message: `Refusing cleanup because worktree changed during preflight: ${worktreePath}`,
        context: {
          reason_code: "merged_worktree_changed_during_cleanup",
          branch: opts.branch,
          worktree_path: worktreePath,
        },
      });
    }
    await removeCleanWorktree({
      gitRoot: opts.gitRoot,
      branch: opts.branch,
      worktreePath,
      expectedHeadSha: opts.expectedHeadSha ?? null,
    });
    let removed: boolean;
    try {
      removed = await removeBranch(opts.gitRoot, opts.branch, opts.expectedHeadSha ?? null);
    } catch (err) {
      if (opts.expectedHeadSha && (await gitBranchExists(opts.gitRoot, opts.branch))) {
        await execFileAsync("git", ["worktree", "add", worktreePath, opts.branch], {
          cwd: opts.gitRoot,
          env: gitEnv(),
        }).catch(() => null);
      }
      throw err;
    }
    return {
      removedBranch: removed,
      removedWorktree: true,
      worktreePath,
      skippedReason: null,
      preservedDirtyState: stashMessage !== null,
      stashMessage,
    };
  }

  const removedBranch = await removeBranch(opts.gitRoot, opts.branch, opts.expectedHeadSha ?? null);

  return {
    removedBranch,
    removedWorktree: Boolean(worktreePath),
    worktreePath,
    skippedReason: null,
    preservedDirtyState: false,
    stashMessage: null,
  };
}

async function removeCleanWorktree(opts: {
  gitRoot: string;
  branch: string;
  worktreePath: string;
  expectedHeadSha: string | null;
}): Promise<void> {
  try {
    await execFileAsync("git", ["worktree", "remove", opts.worktreePath], {
      cwd: opts.gitRoot,
      env: gitEnv(),
    });
    return;
  } catch (error) {
    const registeredWorktree = await findWorktreeForBranch(opts.gitRoot, opts.branch).catch(
      () => opts.worktreePath,
    );
    if (registeredWorktree) throw error;
    await assertExpectedBranchHead(opts);
    await removeUnregisteredWorktreeDirectory({
      gitRoot: opts.gitRoot,
      branch: opts.branch,
      worktreePath: opts.worktreePath,
      cause: error,
    });
  }
}

async function removeUnregisteredWorktreeDirectory(opts: {
  gitRoot: string;
  branch: string;
  worktreePath: string;
  cause: unknown;
}): Promise<void> {
  const repoRoot = await resolvePathFallback(opts.gitRoot);
  const resolvedWorktreePath = await resolvePathFallback(opts.worktreePath);
  if (!isPathWithin(repoRoot, resolvedWorktreePath) || resolvedWorktreePath === repoRoot) {
    throw new CliError({
      code: "E_GIT",
      message:
        `Git unregistered worktree ${opts.worktreePath} after a failed removal, but ` +
        "its path is no longer safe to remove; preserving the task branch for recovery.",
      context: {
        reason_code: "merged_worktree_orphan_recovery_unsafe",
        branch: opts.branch,
        worktree_path: opts.worktreePath,
        cause: opts.cause instanceof Error ? opts.cause.message : String(opts.cause),
      },
    });
  }
  try {
    await rm(resolvedWorktreePath, {
      recursive: true,
      maxRetries: 3,
      retryDelay: 100,
    });
  } catch (error) {
    const code = (error as NodeJS.ErrnoException | null)?.code;
    if (code === "ENOENT") return;
    throw new CliError({
      code: "E_GIT",
      message:
        `Git unregistered worktree ${opts.worktreePath} after a failed removal and ` +
        `its directory could not be removed; preserving ${opts.branch} for recovery.`,
      context: {
        reason_code: "merged_worktree_orphan_recovery_failed",
        branch: opts.branch,
        worktree_path: opts.worktreePath,
        cause: error instanceof Error ? error.message : String(error),
        worktree_remove_cause:
          opts.cause instanceof Error ? opts.cause.message : String(opts.cause),
      },
    });
  }
}

async function assertExpectedBranchHead(opts: {
  gitRoot: string;
  branch: string;
  expectedHeadSha: string | null;
}): Promise<void> {
  if (!opts.expectedHeadSha || !(await gitBranchExists(opts.gitRoot, opts.branch))) return;
  const observed = await gitRevParse(opts.gitRoot, [opts.branch]);
  if (observed === opts.expectedHeadSha) return;
  throw new CliError({
    code: "E_GIT_RACE",
    message:
      `Refusing cleanup because ${opts.branch} moved after merge proof: ` +
      `expected=${opts.expectedHeadSha} current=${observed}`,
    context: {
      reason_code: "merged_branch_head_changed",
      branch: opts.branch,
      expected_head_sha: opts.expectedHeadSha,
      current_head_sha: observed,
    },
  });
}

async function removeBranch(
  gitRoot: string,
  branch: string,
  expectedHeadSha: string | null,
): Promise<boolean> {
  if (!(await gitBranchExists(gitRoot, branch))) return false;
  if (expectedHeadSha) {
    try {
      await execFileAsync("git", ["update-ref", "-d", `refs/heads/${branch}`, expectedHeadSha], {
        cwd: gitRoot,
        env: gitEnv(),
      });
    } catch (err) {
      const observed = await gitRevParse(gitRoot, [branch]).catch(() => "<missing>");
      throw new CliError({
        code: "E_GIT_RACE",
        message:
          `Refusing cleanup because ${branch} changed during atomic deletion: ` +
          `expected=${expectedHeadSha} current=${observed}`,
        context: {
          reason_code: "merged_branch_delete_race",
          branch,
          expected_head_sha: expectedHeadSha,
          current_head_sha: observed,
          cause: err instanceof Error ? err.message : String(err),
        },
      });
    }
    return true;
  }
  await execFileAsync("git", ["branch", "-D", branch], {
    cwd: gitRoot,
    env: gitEnv(),
  });
  return true;
}
