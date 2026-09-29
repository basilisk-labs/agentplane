import { execFileAsync } from "@agentplaneorg/core/process";
import { extractTaskSuffix } from "@agentplaneorg/core/commit";
import { realpath } from "node:fs/promises";

import { CliError } from "../../shared/errors.js";
import { withGitMutationMutex } from "../../shared/git-mutation.js";
import { filterTaskWorktreeBlockingPaths } from "../shared/route-decision-worktree-cleanliness.js";
import { inspectTaskWorktreeCleanliness } from "../shared/task-worktree-cleanliness.js";

const FULL_SHA = /^(?:[a-f0-9]{40}|[a-f0-9]{64})$/u;

export type TaskBranchBaseSyncResult = {
  state: "already_current" | "updated";
  headSha: string;
};

function refuse(reason: string, taskId: string): never {
  throw new CliError({
    code: "E_VALIDATION",
    message: `Task branch base synchronization refused for ${taskId}: ${reason}.`,
    context: { reason_code: "task_branch_base_sync_refused", task_id: taskId },
  });
}

async function git(cwd: string, args: string[]): Promise<string> {
  const result = await execFileAsync("git", args, { cwd });
  return result.stdout.trim();
}

async function isAncestor(cwd: string, ancestor: string, descendant: string): Promise<boolean> {
  try {
    await git(cwd, ["merge-base", "--is-ancestor", ancestor, descendant]);
    return true;
  } catch (error) {
    if ((error as { exitCode?: unknown } | null)?.exitCode === 1) return false;
    throw error;
  }
}

export async function synchronizeTaskBranchBase(opts: {
  gitRoot: string;
  worktreePath: string;
  workflowDir: string;
  tasksPath: string;
  taskId: string;
  branch: string;
  baseBranch: string;
  expectedHeadSha: string;
  expectedBaseSha: string;
}): Promise<TaskBranchBaseSyncResult> {
  if (!FULL_SHA.test(opts.expectedHeadSha) || !FULL_SHA.test(opts.expectedBaseSha)) {
    refuse("expected head and base identities must be full commit SHAs", opts.taskId);
  }
  return withGitMutationMutex(
    {
      repoRoot: opts.worktreePath,
      operation: "task-branch-base-sync",
      workflowMode: "branch_pr",
      mutationKind: "integration",
      taskId: opts.taskId,
    },
    async () => {
      const assertBoundState = async (): Promise<void> => {
        const [topLevel, expectedTopLevel, branch, head, base] = await Promise.all([
          git(opts.worktreePath, ["rev-parse", "--show-toplevel"]).then((value) => realpath(value)),
          realpath(opts.worktreePath),
          git(opts.worktreePath, ["branch", "--show-current"]),
          git(opts.worktreePath, ["rev-parse", "--verify", "HEAD^{commit}"]),
          git(opts.gitRoot, ["rev-parse", "--verify", `${opts.baseBranch}^{commit}`]),
        ]);
        if (topLevel !== expectedTopLevel)
          refuse("authoritative worktree path changed", opts.taskId);
        if (branch !== opts.branch) refuse(`current branch changed to ${branch}`, opts.taskId);
        if (head !== opts.expectedHeadSha) refuse(`task HEAD changed to ${head}`, opts.taskId);
        if (base !== opts.expectedBaseSha) {
          refuse(`base ${opts.baseBranch} changed to ${base}`, opts.taskId);
        }
        const cleanliness = await inspectTaskWorktreeCleanliness({
          gitRoot: opts.gitRoot,
          branch: opts.branch,
        });
        if (cleanliness.state === "unavailable") {
          refuse(`task worktree cleanliness is unavailable: ${cleanliness.reason}`, opts.taskId);
        }
        if (
          cleanliness.state === "not_present" ||
          !cleanliness.worktreePath ||
          (await realpath(cleanliness.worktreePath)) !== expectedTopLevel
        ) {
          refuse("authoritative task worktree registration changed", opts.taskId);
        }
        const blockingPaths = filterTaskWorktreeBlockingPaths({
          changedPaths: cleanliness.changedPaths,
          workflowDir: opts.workflowDir,
          tasksPath: opts.tasksPath,
          taskId: opts.taskId,
        });
        if (blockingPaths.length > 0) {
          refuse(`task worktree is dirty: ${blockingPaths.slice(0, 8).join(", ")}`, opts.taskId);
        }
      };

      await assertBoundState();
      if (await isAncestor(opts.worktreePath, opts.expectedBaseSha, opts.expectedHeadSha)) {
        return { state: "already_current", headSha: opts.expectedHeadSha };
      }
      try {
        await git(opts.worktreePath, [
          "merge-tree",
          "--write-tree",
          "--no-messages",
          opts.expectedHeadSha,
          opts.expectedBaseSha,
        ]);
      } catch {
        refuse("the exact head and base require semantic conflict resolution", opts.taskId);
      }
      await assertBoundState();
      const message =
        `🔀 ${extractTaskSuffix(opts.taskId)} task: sync exact ` +
        `${opts.baseBranch} into task branch`;
      try {
        await git(opts.worktreePath, [
          "merge",
          "--no-ff",
          "--no-edit",
          "--no-overwrite-ignore",
          "--signoff",
          "-m",
          message,
          opts.expectedBaseSha,
        ]);
      } catch (error) {
        const observedHead = await git(opts.worktreePath, ["rev-parse", "HEAD"]);
        if (observedHead === opts.expectedHeadSha) {
          await git(opts.worktreePath, ["merge", "--abort"]).catch(() => null);
        }
        throw error;
      }
      const newHead = await git(opts.worktreePath, ["rev-parse", "HEAD"]);
      const parentLine = await git(opts.worktreePath, [
        "rev-list",
        "--parents",
        "-n",
        "1",
        newHead,
      ]);
      const parents = parentLine.split(/\s+/u);
      if (
        parents.length !== 3 ||
        parents[1] !== opts.expectedHeadSha ||
        parents[2] !== opts.expectedBaseSha ||
        !(await isAncestor(opts.worktreePath, opts.expectedHeadSha, newHead)) ||
        !(await isAncestor(opts.worktreePath, opts.expectedBaseSha, newHead))
      ) {
        throw new CliError({
          code: "E_GIT_RACE",
          message: `Task branch base synchronization produced an unproven merge for ${opts.taskId}.`,
          context: {
            reason_code: "task_branch_base_sync_readback_unproven",
            task_id: opts.taskId,
            observed_head: newHead,
          },
        });
      }
      return { state: "updated", headSha: newHead };
    },
  );
}
