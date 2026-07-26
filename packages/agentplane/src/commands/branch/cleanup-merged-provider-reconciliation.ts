import { gitEnv } from "@agentplaneorg/core/git";
import { execFileAsync } from "@agentplaneorg/core/process";

import { gitIsAncestor } from "../shared/git-ops.js";
import {
  observeExistingGithubPrByBranch,
  observeExistingGithubPrByNumber,
  type GithubPrLookupResult,
} from "../pr/internal/sync-github.js";

export type ProviderReconciliationProof = {
  kind: "exact_head" | "provider_rebase_equivalent";
  taskId: string;
  branch: string;
  baseBranch: string;
  prNumber: number;
  taskCommitSha: string;
  localHeadSha: string;
  providerHeadSha: string;
  mergeCommit: string;
  closureBasisCommit: string;
};

type ProviderMergeReceipt = {
  prNumber: number;
  providerHeadSha: string;
  mergeCommit: string;
};

async function gitCommitExists(gitRoot: string, sha: string): Promise<boolean> {
  try {
    await execFileAsync("git", ["cat-file", "-e", `${sha}^{commit}`], {
      cwd: gitRoot,
      env: gitEnv(),
    });
    return true;
  } catch {
    return false;
  }
}

type GitCherryLine = { marker: "+" | "-"; sha: string };

async function gitCherryLines(opts: {
  gitRoot: string;
  upstream: string;
  head: string;
}): Promise<GitCherryLine[] | null> {
  try {
    const { stdout } = await execFileAsync("git", ["cherry", opts.upstream, opts.head], {
      cwd: opts.gitRoot,
      env: gitEnv(),
    });
    const rawLines = stdout
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    const lines: GitCherryLine[] = [];
    for (const rawLine of rawLines) {
      const match = /^([+-])\s+([0-9a-f]+)$/u.exec(rawLine);
      if (!match) return null;
      lines.push({ marker: match[1] as "+" | "-", sha: match[2] });
    }
    return lines;
  } catch {
    return null;
  }
}

async function gitCherryEquivalent(opts: {
  gitRoot: string;
  upstream: string;
  head: string;
}): Promise<boolean> {
  const lines = await gitCherryLines(opts);
  return lines !== null && lines.length > 0 && lines.every((line) => line.marker === "-");
}

async function gitMergeBaseParent(opts: {
  gitRoot: string;
  mergeCommit: string;
}): Promise<string | null> {
  try {
    const { stdout } = await execFileAsync(
      "git",
      ["rev-list", "--parents", "-n", "1", opts.mergeCommit],
      { cwd: opts.gitRoot, env: gitEnv() },
    );
    const [, ...parents] = stdout.trim().split(/\s+/u);
    return parents.length >= 2 ? (parents[0] ?? null) : null;
  } catch {
    return null;
  }
}

async function gitProviderPatchesEquivalentToLocal(opts: {
  gitRoot: string;
  localHead: string;
  providerHead: string;
  providerBase: string;
}): Promise<boolean> {
  const lines = await gitCherryLines({
    gitRoot: opts.gitRoot,
    upstream: opts.localHead,
    head: opts.providerHead,
  });
  if (lines === null || lines.length === 0) return false;
  for (const line of lines) {
    if (await gitIsAncestor(opts.gitRoot, line.sha, opts.providerBase)) continue;
    if (line.marker !== "-") return false;
  }
  return true;
}

export async function observeProviderPr(opts: {
  gitRoot: string;
  branch: string;
  baseBranch: string;
  prNumber: number | null;
}): Promise<GithubPrLookupResult> {
  return opts.prNumber
    ? await observeExistingGithubPrByNumber({
        gitRoot: opts.gitRoot,
        branch: opts.branch,
        baseBranch: opts.baseBranch,
        prNumber: opts.prNumber,
      })
    : await observeExistingGithubPrByBranch({
        gitRoot: opts.gitRoot,
        branch: opts.branch,
        baseBranch: opts.baseBranch,
      });
}

export async function validateMergedProviderReceipt(opts: {
  gitRoot: string;
  baseBranch: string;
  expectedPrNumber: number | null;
  expectedReconciliation?: ProviderReconciliationProof;
  result: GithubPrLookupResult;
}): Promise<{ receipt: ProviderMergeReceipt | null; reason: string | null }> {
  if (opts.result.state === "not_found") {
    return { receipt: null, reason: "provider PR was not found for the exact branch and base" };
  }
  if (opts.result.state === "unavailable") {
    return {
      receipt: null,
      reason: `provider lookup is unavailable: ${opts.result.reason}`,
    };
  }
  const observed = opts.result.pr;
  if (opts.expectedPrNumber !== null && observed.prNumber !== opts.expectedPrNumber) {
    return {
      receipt: null,
      reason: `provider PR identity mismatch: expected=${opts.expectedPrNumber} observed=${observed.prNumber}`,
    };
  }
  if (observed.status !== "MERGED") {
    return {
      receipt: null,
      reason: `provider PR #${observed.prNumber} is ${observed.status.toLowerCase()}, not merged`,
    };
  }
  if ((observed.base?.trim() ?? "") !== opts.baseBranch) {
    return {
      receipt: null,
      reason: `provider base mismatch: expected=${opts.baseBranch} observed=${observed.base ?? "-"}`,
    };
  }
  const providerHeadSha = observed.headSha?.trim() ?? "";
  if (!providerHeadSha) {
    return {
      receipt: null,
      reason: "provider merged PR head is unavailable",
    };
  }
  const mergeCommit = observed.mergeCommit?.trim() ?? "";
  if (!mergeCommit || !(await gitCommitExists(opts.gitRoot, mergeCommit))) {
    return {
      receipt: null,
      reason: `provider merge commit object is unavailable locally: ${mergeCommit || "-"}`,
    };
  }
  if (!(await gitIsAncestor(opts.gitRoot, mergeCommit, opts.baseBranch))) {
    return {
      receipt: null,
      reason: `provider merge commit is not on ${opts.baseBranch}: ${mergeCommit}`,
    };
  }
  const receipt = { prNumber: observed.prNumber, providerHeadSha, mergeCommit };
  const expected = opts.expectedReconciliation;
  if (!expected) return { receipt, reason: null };
  if (expected.prNumber !== receipt.prNumber) {
    return {
      receipt: null,
      reason:
        `provider PR identity changed after reconciliation proof: ` +
        `expected=${expected.prNumber} observed=${receipt.prNumber}`,
    };
  }
  if (expected.baseBranch !== opts.baseBranch) {
    return {
      receipt: null,
      reason:
        `provider base changed after reconciliation proof: ` +
        `expected=${expected.baseBranch} observed=${opts.baseBranch}`,
    };
  }
  if (expected.providerHeadSha !== receipt.providerHeadSha) {
    return {
      receipt: null,
      reason:
        `provider head changed after reconciliation proof: ` +
        `expected=${expected.providerHeadSha} observed=${receipt.providerHeadSha}`,
    };
  }
  if (expected.mergeCommit !== receipt.mergeCommit) {
    return {
      receipt: null,
      reason:
        `provider merge changed after reconciliation proof: ` +
        `expected=${expected.mergeCommit} observed=${receipt.mergeCommit}`,
    };
  }
  return { receipt, reason: null };
}

export async function resolveProviderReconciliation(opts: {
  gitRoot: string;
  taskId: string;
  branch: string;
  baseBranch: string;
  taskCommitSha: string;
  branchHead: string;
  closureBasisCommit: string;
  receipt: ProviderMergeReceipt;
}): Promise<{ proof: ProviderReconciliationProof | null; reason: string | null }> {
  if (!(await gitCommitExists(opts.gitRoot, opts.receipt.providerHeadSha))) {
    return {
      proof: null,
      reason: `provider rebase head object is unavailable locally: ${opts.receipt.providerHeadSha}`,
    };
  }
  if (!(await gitCommitExists(opts.gitRoot, opts.closureBasisCommit))) {
    return {
      proof: null,
      reason: `pre-merge closure basis object is unavailable locally: ${opts.closureBasisCommit}`,
    };
  }
  if (!(await gitIsAncestor(opts.gitRoot, opts.taskCommitSha, opts.closureBasisCommit))) {
    return {
      proof: null,
      reason: "task commit is not covered by the pre-merge closure basis",
    };
  }
  if (!(await gitIsAncestor(opts.gitRoot, opts.closureBasisCommit, opts.branchHead))) {
    return {
      proof: null,
      reason: "pre-merge closure basis is not an ancestor of the stale local task head",
    };
  }
  if (
    !(await gitIsAncestor(opts.gitRoot, opts.receipt.providerHeadSha, opts.receipt.mergeCommit))
  ) {
    return {
      proof: null,
      reason: "provider merged head is not contained by the recorded merge commit",
    };
  }
  const common = {
    taskId: opts.taskId,
    branch: opts.branch,
    baseBranch: opts.baseBranch,
    prNumber: opts.receipt.prNumber,
    taskCommitSha: opts.taskCommitSha,
    localHeadSha: opts.branchHead,
    providerHeadSha: opts.receipt.providerHeadSha,
    mergeCommit: opts.receipt.mergeCommit,
    closureBasisCommit: opts.closureBasisCommit,
  };
  if (opts.branchHead === opts.receipt.providerHeadSha) {
    return { proof: { ...common, kind: "exact_head" }, reason: null };
  }
  const [headEquivalent, closureBasisCovered] = await Promise.all([
    gitCherryEquivalent({
      gitRoot: opts.gitRoot,
      upstream: opts.receipt.providerHeadSha,
      head: opts.branchHead,
    }),
    gitIsAncestor(opts.gitRoot, opts.closureBasisCommit, opts.receipt.providerHeadSha).catch(
      () => false,
    ),
  ]);
  if (!headEquivalent) {
    return {
      proof: null,
      reason: "provider rebase is not patch-equivalent to the stale local task head",
    };
  }
  const providerBase = await gitMergeBaseParent({
    gitRoot: opts.gitRoot,
    mergeCommit: opts.receipt.mergeCommit,
  });
  if (!providerBase) {
    return {
      proof: null,
      reason: "provider merge does not expose a base parent for symmetric patch proof",
    };
  }
  if (
    !(await gitProviderPatchesEquivalentToLocal({
      gitRoot: opts.gitRoot,
      localHead: opts.branchHead,
      providerHead: opts.receipt.providerHeadSha,
      providerBase,
    }))
  ) {
    return {
      proof: null,
      reason: "provider rebase contains provider-only patches beyond the merged base",
    };
  }
  if (
    !closureBasisCovered &&
    !(await gitCherryEquivalent({
      gitRoot: opts.gitRoot,
      upstream: opts.receipt.providerHeadSha,
      head: opts.closureBasisCommit,
    }))
  ) {
    return {
      proof: null,
      reason: "provider rebase does not cover the pre-merge closure basis",
    };
  }
  return { proof: { ...common, kind: "provider_rebase_equivalent" }, reason: null };
}
