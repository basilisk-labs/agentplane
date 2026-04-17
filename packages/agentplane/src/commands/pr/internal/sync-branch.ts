import { readFile } from "node:fs/promises";
import path from "node:path";

import { extractTaskSuffix } from "@agentplaneorg/core";

import { fileExists } from "../../../cli/fs-utils.js";
import { execFileAsync, gitEnv } from "../../shared/git.js";
import { gitBranchUpstream, gitCurrentBranch } from "../../shared/git-ops.js";
import { parseTaskIdFromBranch } from "../../shared/git-worktree.js";
import { gitDiffStat } from "../../shared/git-diff.js";
import { parsePrMeta } from "../../shared/pr-meta.js";

export type ResolvedPrSyncBranch = {
  branch: string | null;
  source: "explicit" | "meta" | "current" | "none";
};

export function isUnknownRevisionError(err: unknown): boolean {
  const message = err instanceof Error ? err.message : String(err);
  return (
    /unknown revision or path not in the working tree/i.test(message) ||
    /bad revision/i.test(message) ||
    /ambiguous argument/i.test(message)
  );
}

export function taskPrArtifactRefreshMessage(taskId: string): string {
  return `📝 ${extractTaskSuffix(taskId)} task: refresh PR artifacts`;
}

export async function resolveBranchHeadSha(opts: {
  gitRoot: string;
  branch: string;
}): Promise<string | null> {
  try {
    const { stdout } = await execFileAsync("git", ["rev-parse", opts.branch], {
      cwd: opts.gitRoot,
      env: gitEnv(),
    });
    return stdout.trim() || null;
  } catch (err) {
    if (!isUnknownRevisionError(err)) throw err;
    return null;
  }
}

export async function resolveRenderableBranchHead(opts: {
  gitRoot: string;
  taskId: string;
  branch: string;
}): Promise<{ headSha: string | null; artifactRefresh: boolean }> {
  const branchHeadSha = await resolveBranchHeadSha({
    gitRoot: opts.gitRoot,
    branch: opts.branch,
  });
  if (!branchHeadSha) return { headSha: null, artifactRefresh: false };

  try {
    const { stdout: subjectStdout } = await execFileAsync(
      "git",
      ["log", "-1", "--pretty=%s", branchHeadSha],
      {
        cwd: opts.gitRoot,
        env: gitEnv(),
      },
    );
    const subject = subjectStdout.trim();
    return {
      headSha: branchHeadSha,
      artifactRefresh: subject === taskPrArtifactRefreshMessage(opts.taskId),
    };
  } catch {
    return { headSha: branchHeadSha, artifactRefresh: false };
  }
}

export async function resolvePrDiffBaseRef(opts: {
  gitRoot: string;
  baseBranch: string;
}): Promise<string> {
  const upstreamRef = await gitBranchUpstream(opts.gitRoot, opts.baseBranch);
  const candidate = upstreamRef?.trim() ?? "";
  if (!candidate) return opts.baseBranch;
  try {
    const { stdout } = await execFileAsync("git", ["rev-parse", "--verify", candidate], {
      cwd: opts.gitRoot,
      env: gitEnv(),
    });
    return stdout.trim() ? candidate : opts.baseBranch;
  } catch (err) {
    if (!isUnknownRevisionError(err)) throw err;
    return opts.baseBranch;
  }
}

export async function computePrDiffstat(opts: {
  gitRoot: string;
  baseBranch: string;
  branch: string;
  prDir: string;
}): Promise<string> {
  const diffBaseRef = await resolvePrDiffBaseRef({
    gitRoot: opts.gitRoot,
    baseBranch: opts.baseBranch,
  });
  const taskDir = path.dirname(opts.prDir);
  try {
    return await gitDiffStat(opts.gitRoot, diffBaseRef, opts.branch, {
      excludePaths: [
        path.relative(opts.gitRoot, opts.prDir),
        path.relative(opts.gitRoot, path.join(taskDir, "README.md")),
      ],
    });
  } catch (err) {
    if (!isUnknownRevisionError(err)) throw err;
    return "";
  }
}

export async function resolvePrSyncBranch(opts: {
  gitRoot: string;
  metaPath: string;
  taskId: string;
  branch?: string;
}): Promise<ResolvedPrSyncBranch> {
  const explicitBranch = opts.branch?.trim() ?? "";
  if (explicitBranch) {
    return { branch: explicitBranch, source: "explicit" };
  }

  if (await fileExists(opts.metaPath)) {
    const metaBranch = parsePrMeta(await readFile(opts.metaPath, "utf8"), opts.taskId).branch?.trim() ?? "";
    if (metaBranch) {
      return { branch: metaBranch, source: "meta" };
    }
  }

  const currentBranchValue = await gitCurrentBranch(opts.gitRoot);
  const currentBranch = currentBranchValue.trim();
  if (currentBranch) {
    return { branch: currentBranch, source: "current" };
  }

  return { branch: null, source: "none" };
}

export function currentBranchMatchesTask(taskPrefix: string, branch: string, taskId: string): boolean {
  return parseTaskIdFromBranch(taskPrefix, branch) === taskId;
}
