import { gitDiffNames, gitMergeBase } from "@agentplaneorg/core/git";

import { exitCodeForError } from "../../../cli/exit-codes.js";
import { CliError } from "../../../shared/errors.js";
import { gitBranchExists, gitBranchUpstream, gitRevParse } from "../../shared/git-ops.js";

function normalizedRoot(value: string | undefined): string {
  if (!value) return "";
  return value.replaceAll("\\", "/").replace(/^\.\//u, "").replace(/\/+$/u, "");
}

function taskIdFromArtifactPath(pathname: string, roots: readonly string[]): string | null {
  const normalized = pathname.replaceAll("\\", "/").replace(/^\.\//u, "");
  for (const root of roots) {
    const prefix = `${root}/`;
    if (!normalized.startsWith(prefix)) continue;
    const taskId = normalized.slice(prefix.length).split("/", 1)[0]?.trim() ?? "";
    return taskId || null;
  }
  return null;
}

export async function assertBranchTaskArtifactOwnership(opts: {
  gitRoot: string;
  baseBranch: string;
  branch: string;
  workflowDir: string;
  tasksPath: string;
  primaryTaskId: string;
  includedTaskIds?: readonly string[];
}): Promise<void> {
  const roots = [...new Set([normalizedRoot(opts.workflowDir), normalizedRoot(opts.tasksPath)])]
    .filter(Boolean)
    .toSorted((left, right) => right.length - left.length);
  const upstream = await gitBranchUpstream(opts.gitRoot, opts.baseBranch);
  const comparisonBase = upstream ?? opts.baseBranch;
  // Synthetic and pre-initialized repositories may name a future base before
  // the ref exists. There is no committed base history to contaminate yet.
  const [baseExists, branchExists] = await Promise.all([
    gitRevParse(opts.gitRoot, ["--verify", `${comparisonBase}^{commit}`])
      .then(() => true)
      .catch(() => false),
    gitBranchExists(opts.gitRoot, opts.branch),
  ]);
  if (!baseExists || !branchExists) return;
  // Compare only changes introduced by the candidate branch. A two-dot diff
  // also reports paths added on an advanced base as deletions from an older
  // task branch, which can falsely attribute unrelated base task artifacts to
  // the candidate. The merge-base anchored diff is the branch-side delta.
  const mergeBase = await gitMergeBase(opts.gitRoot, comparisonBase, opts.branch);
  const changedPaths = await gitDiffNames(opts.gitRoot, mergeBase, opts.branch);
  const allowed = new Set([opts.primaryTaskId, ...(opts.includedTaskIds ?? [])]);
  const foreignTaskIds = [
    ...new Set(
      changedPaths
        .map((pathname) => taskIdFromArtifactPath(pathname, roots))
        .filter((taskId): taskId is string => Boolean(taskId && !allowed.has(taskId))),
    ),
  ].toSorted();
  if (foreignTaskIds.length === 0) return;

  throw new CliError({
    exitCode: exitCodeForError("E_VALIDATION"),
    code: "E_VALIDATION",
    message:
      `Task branch ${opts.branch} contains committed artifacts owned by other tasks: ` +
      `${foreignTaskIds.join(", ")}. Rebuild the branch from ${comparisonBase} or explicitly ` +
      "include those tasks in the branch_pr batch before publishing.",
    context: {
      reason_code: "foreign_committed_task_artifacts",
      task_id: opts.primaryTaskId,
      branch: opts.branch,
      comparison_base: comparisonBase,
      comparison_merge_base: mergeBase,
      foreign_task_ids: foreignTaskIds,
    },
  });
}
