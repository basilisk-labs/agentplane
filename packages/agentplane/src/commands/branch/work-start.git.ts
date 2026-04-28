import { exitCodeForError } from "../../cli/exit-codes.js";
import { CliError } from "../../shared/errors.js";
import { gitAheadBehind } from "@agentplaneorg/core/git";
import { gitBranchUpstream } from "../shared/git-ops.js";

export async function ensureCurrentBaseBranch(gitRoot: string, baseBranch: string): Promise<void> {
  const upstreamBranch = await gitBranchUpstream(gitRoot, baseBranch);
  if (!upstreamBranch) return;

  const { behind } = await gitAheadBehind(gitRoot, upstreamBranch, baseBranch);
  if (behind === 0) return;

  throw new CliError({
    exitCode: exitCodeForError("E_GIT"),
    code: "E_GIT",
    message:
      `Base branch ${baseBranch} is behind its upstream ${upstreamBranch} by ${behind} commit(s). ` +
      "Refresh the base branch before `agentplane work start` to avoid DIRTY hosted PRs.",
  });
}
