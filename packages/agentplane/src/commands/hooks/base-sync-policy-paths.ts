import { gitRevParse } from "@agentplaneorg/core/git";
import { execFileAsync } from "@agentplaneorg/core/process";

function nullSeparatedPaths(value: string | Buffer): string[] {
  return [
    ...new Set(
      value
        .toString()
        .split("\0")
        .filter((entry) => entry.length > 0),
    ),
  ].toSorted();
}

/**
 * During a configured-base merge, the index-to-HEAD diff includes every path
 * arriving from the base branch. Policy must attribute only the task-side
 * delta to the active task, while ordinary commits and non-base merges retain
 * the original staged-path enforcement surface.
 */
export async function resolveHookPolicyStagedPaths(opts: {
  gitRoot: string;
  workflowMode: "direct" | "branch_pr";
  baseBranch: string | null;
  stagedPaths: readonly string[];
}): Promise<string[]> {
  const fallback = [...opts.stagedPaths];
  if (opts.workflowMode !== "branch_pr" || !opts.baseBranch) return fallback;

  try {
    const mergeHeadOutput = await gitRevParse(opts.gitRoot, ["--verify", "MERGE_HEAD"]);
    const mergeHeads = mergeHeadOutput.split(/\s+/u).filter(Boolean);
    if (mergeHeads.length !== 1) return fallback;
    const mergeHead = mergeHeads[0];
    if (!mergeHead) return fallback;

    const baseHead = await gitRevParse(opts.gitRoot, [`${opts.baseBranch}^{commit}`]);
    if (mergeHead !== baseHead) return fallback;

    const { stdout } = await execFileAsync(
      "git",
      ["diff", "--cached", "--name-only", "-z", mergeHead, "--"],
      {
        cwd: opts.gitRoot,
        encoding: "buffer",
        maxBuffer: 10 * 1024 * 1024,
      },
    );
    return nullSeparatedPaths(stdout);
  } catch {
    return fallback;
  }
}
