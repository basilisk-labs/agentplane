import path from "node:path";

import { gitProofDiffNames, gitProofEnv } from "@agentplaneorg/core/git";
import { execFileAsync } from "@agentplaneorg/core/process";

import type { GithubPrLookupResult } from "../pr/internal/sync-github.js";
import { resolveDefaultGithubRepo, runGhApiJson } from "../pr/internal/gh-api.js";
import {
  gitCommitObjectExists,
  gitProofIsAncestor,
  isCanonicalFullCommitOid,
} from "../shared/git-ops.js";
import { isAuthorityOnlyTaskReadmeAdvance } from "../shared/quality-review-target.js";

type GithubCommitRecord = {
  parents?: { sha?: string | null }[];
};

export async function gitRepositoryHasReplacementRefs(gitRoot: string): Promise<boolean> {
  const { stdout } = await execFileAsync(
    "git",
    ["for-each-ref", "--format=%(refname)", "refs/replace"],
    { cwd: gitRoot, env: gitProofEnv() },
  );
  return stdout.trim().length > 0;
}

export async function isProviderBaseUpdateOfLocalHead(opts: {
  gitRoot: string;
  baseBranch: string;
  branchHeadSha: string;
  providerHeadSha: string;
}): Promise<boolean> {
  try {
    const repo = await resolveDefaultGithubRepo(opts.gitRoot);
    const commit = await runGhApiJson<GithubCommitRecord>(opts.gitRoot, [
      `repos/${repo}/commits/${opts.providerHeadSha}`,
    ]);
    const parents = (commit.parents ?? [])
      .map((parent) => parent.sha?.trim() ?? "")
      .filter(Boolean);
    if (parents.length !== 2 || !parents.includes(opts.branchHeadSha)) return false;
    const baseParent = parents.find((parent) => parent !== opts.branchHeadSha);
    return Boolean(
      baseParent && (await gitProofIsAncestor(opts.gitRoot, baseParent, opts.baseBranch)),
    );
  } catch {
    return false;
  }
}

export async function hasAuthorityOnlyPostMergeTail(opts: {
  gitRoot: string;
  workflowDir: string;
  taskId: string;
  providerHeadSha: string;
  branchHeadSha: string;
}): Promise<boolean> {
  if (!(await gitProofIsAncestor(opts.gitRoot, opts.providerHeadSha, opts.branchHeadSha))) {
    return false;
  }
  const { stdout } = await execFileAsync(
    "git",
    ["rev-list", "--reverse", `${opts.providerHeadSha}..${opts.branchHeadSha}`],
    { cwd: opts.gitRoot, env: gitProofEnv() },
  );
  const commits = stdout
    .split("\n")
    .map((value) => value.trim())
    .filter(Boolean);
  if (commits.length === 0) return false;

  const taskReadme = path.posix.join(opts.workflowDir, opts.taskId, "README.md");
  for (const current of commits) {
    const { stdout: parentOutput } = await execFileAsync("git", ["rev-parse", `${current}^`], {
      cwd: opts.gitRoot,
      env: gitProofEnv(),
    });
    const parent = parentOutput.trim();
    const changed = await gitProofDiffNames(opts.gitRoot, parent, current);
    const authorityOnly = await isAuthorityOnlyTaskReadmeAdvance({
      gitRoot: opts.gitRoot,
      parent,
      current,
      changed,
      taskRelativePath: (name) => (name === taskReadme ? "README.md" : null),
    });
    if (!authorityOnly) return false;
  }
  return true;
}

export async function validateProviderUpdateReceipt(opts: {
  gitRoot: string;
  baseBranch: string;
  expectedPrNumber: number;
  result: GithubPrLookupResult;
}): Promise<{
  prNumber: number;
  providerHeadSha: string;
  mergeCommit: string;
} | null> {
  if (opts.result.state !== "found") return null;
  const observed = opts.result.pr;
  const providerHeadSha = observed.headSha?.trim() ?? "";
  const mergeCommit = observed.mergeCommit?.trim() ?? "";
  if (
    observed.prNumber !== opts.expectedPrNumber ||
    observed.status !== "MERGED" ||
    observed.base?.trim() !== opts.baseBranch ||
    !isCanonicalFullCommitOid(providerHeadSha) ||
    !isCanonicalFullCommitOid(mergeCommit) ||
    !(await gitCommitObjectExists(opts.gitRoot, mergeCommit)) ||
    !(await gitProofIsAncestor(opts.gitRoot, mergeCommit, opts.baseBranch))
  ) {
    return null;
  }
  return { prNumber: observed.prNumber, providerHeadSha, mergeCommit };
}
