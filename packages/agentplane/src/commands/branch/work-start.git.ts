import { exitCodeForError } from "../../cli/exit-codes.js";
import { CliError } from "../../shared/errors.js";
import { gitAheadBehind } from "@agentplaneorg/core/git";
import { gitBranchUpstream } from "../shared/git-ops.js";

export async function ensureCurrentBaseBranch(gitRoot: string, baseBranch: string): Promise<void> {
  const upstreamBranch = await gitBranchUpstream(gitRoot, baseBranch);
  if (!upstreamBranch) return;

  const { ahead, behind } = await gitAheadBehind(gitRoot, upstreamBranch, baseBranch);
  if (ahead === 0 && behind === 0) return;

  const divergence = [
    ahead > 0 ? `ahead by ${ahead} commit(s)` : null,
    behind > 0 ? `behind by ${behind} commit(s)` : null,
  ]
    .filter((entry): entry is string => entry !== null)
    .join(" and ");

  throw new CliError({
    exitCode: exitCodeForError("E_GIT"),
    code: "E_GIT",
    message:
      `Base branch ${baseBranch} does not exactly match its upstream ${upstreamBranch}: ${divergence}. ` +
      "Reconcile the base branch with its upstream before `agentplane work start`; " +
      "task branches must not inherit unpublished or stale base commits.",
    context: {
      reason_code: "base_branch_upstream_mismatch",
      base_branch: baseBranch,
      upstream_branch: upstreamBranch,
      ahead,
      behind,
    },
  });
}
