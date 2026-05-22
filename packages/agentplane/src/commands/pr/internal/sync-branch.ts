import { readFile } from "node:fs/promises";
import path from "node:path";

import { isTaskArtifactRefreshCommitSubject } from "@agentplaneorg/core/commit";

import { fileExists } from "../../../cli/fs-utils.js";
import { execFileAsync } from "@agentplaneorg/core/process";
import { gitEnv, parseTaskIdFromBranch, gitDiffStat } from "@agentplaneorg/core/git";
import { gitBranchUpstream, gitCurrentBranch } from "../../shared/git-ops.js";
import { parsePrMeta } from "../../shared/pr-meta.js";

export type ResolvedPrSyncBranch = {
  branch: string | null;
  source: "explicit" | "meta" | "current" | "none";
};

export function isUnknownRevisionError(err: unknown): boolean {
  const message = err instanceof Error ? err.message : String(err);
  return (
    /unknown revision or path not in the working tree/i.test(message) ||
    /not a valid object name/i.test(message) ||
    /bad revision/i.test(message) ||
    /ambiguous argument/i.test(message)
  );
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
      artifactRefresh: isTaskArtifactRefreshCommitSubject({ subject, taskId: opts.taskId }),
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
    if (!stdout.trim()) return opts.baseBranch;
    if (await isAncestor(opts.gitRoot, candidate, opts.baseBranch)) return opts.baseBranch;
    return candidate;
  } catch (err) {
    if (!isUnknownRevisionError(err)) throw err;
    return opts.baseBranch;
  }
}

async function isAncestor(gitRoot: string, ancestor: string, descendant: string): Promise<boolean> {
  try {
    await execFileAsync("git", ["merge-base", "--is-ancestor", ancestor, descendant], {
      cwd: gitRoot,
      env: gitEnv(),
    });
    return true;
  } catch (err) {
    const exitCode = (err as { code?: unknown; exitCode?: unknown } | null)?.code;
    const normalizedExitCode =
      typeof exitCode === "number" ? exitCode : (err as { exitCode?: unknown } | null)?.exitCode;
    if (normalizedExitCode === 1) return false;
    if (!isUnknownRevisionError(err)) throw err;
    return false;
  }
}

export async function computePrDiffstat(opts: {
  gitRoot: string;
  baseBranch: string;
  branch: string;
  prDir: string;
  tasksPath?: string;
}): Promise<string> {
  const diffBaseRef = await resolvePrDiffBaseRef({
    gitRoot: opts.gitRoot,
    baseBranch: opts.baseBranch,
  });
  const taskDir = path.dirname(opts.prDir);
  const excludePaths = [path.relative(opts.gitRoot, taskDir)];
  if (opts.tasksPath) {
    const relTasksPath = path.isAbsolute(opts.tasksPath)
      ? path.relative(opts.gitRoot, opts.tasksPath)
      : opts.tasksPath;
    if (relTasksPath && !relTasksPath.startsWith("..") && !path.isAbsolute(relTasksPath)) {
      excludePaths.push(relTasksPath);
    }
  }
  try {
    return await gitDiffStat(opts.gitRoot, diffBaseRef, opts.branch, {
      excludePaths,
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
    const metaBranch =
      parsePrMeta(await readFile(opts.metaPath, "utf8"), opts.taskId).branch?.trim() ?? "";
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

export function currentBranchMatchesTask(
  taskPrefix: string,
  branch: string,
  taskId: string,
): boolean {
  return parseTaskIdFromBranch(taskPrefix, branch) === taskId;
}
