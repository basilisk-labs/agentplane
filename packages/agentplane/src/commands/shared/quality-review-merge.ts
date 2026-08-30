import { gitEnv } from "@agentplaneorg/core/git";
import { execFileAsync } from "@agentplaneorg/core/process";

/**
 * Find merge paths that cannot be proved to be a clean base synchronization.
 * This uses existing Git objects only. It never runs merge-tree or creates a merge.
 * Shared paths conservatively require review even when Git could merge their hunks.
 * null means that the history cannot prove safe reuse of a previous review.
 */
export async function baseSyncMergeReviewPaths(opts: {
  gitRoot: string;
  merge: string;
  taskParent: string;
  baseParent: string;
}): Promise<string[] | null> {
  try {
    const [parents, bases] = await Promise.all([
      execFileAsync("git", ["rev-list", "--parents", "-n", "1", opts.merge], {
        cwd: opts.gitRoot,
        env: gitEnv(),
      }),
      execFileAsync("git", ["merge-base", "--all", opts.taskParent, opts.baseParent], {
        cwd: opts.gitRoot,
        env: gitEnv(),
      }),
    ]);
    const parentIds = parents.stdout.trim().split(/\s+/u);
    const baseIds = bases.stdout.trim().split(/\s+/u);
    if (
      parentIds.length !== 3 ||
      parentIds[1] !== opts.taskParent ||
      parentIds[2] !== opts.baseParent ||
      baseIds.length !== 1 ||
      !baseIds[0]
    )
      return null;
    // Rename detection can hide the deleted endpoint in --name-only output.
    // Compare trees as additions/deletions so divergent renames share their source path.
    const diffPaths = async (from: string, to: string): Promise<string[]> => {
      const result = await execFileAsync(
        "git",
        [
          "diff",
          "--name-only",
          "--no-renames",
          "--no-ext-diff",
          "--no-textconv",
          "-z",
          from,
          to,
          "--",
        ],
        {
          cwd: opts.gitRoot,
          env: gitEnv(),
        },
      );
      return result.stdout.split("\0").filter(Boolean);
    };
    const [taskDelta, baseDelta, againstTask, againstBase] = await Promise.all([
      diffPaths(baseIds[0], opts.taskParent),
      diffPaths(baseIds[0], opts.baseParent),
      diffPaths(opts.taskParent, opts.merge),
      diffPaths(opts.baseParent, opts.merge),
    ]);
    const taskPaths = new Set(taskDelta);
    const basePaths = new Set(baseDelta);
    const mergeVsBase = new Set(againstBase);
    return [
      ...new Set([
        // A choice between conflicting parents is semantic even if it matches one parent.
        ...taskDelta.filter((file) => basePaths.has(file)),
        // Task-only or new paths changed inside the merge contain new, unreviewed work.
        ...againstTask.filter((file) => !basePaths.has(file)),
        // Base-only changes must appear exactly as they do in the base parent.
        ...baseDelta.filter((file) => !taskPaths.has(file) && mergeVsBase.has(file)),
      ]),
    ].toSorted();
  } catch {
    return null;
  }
}
