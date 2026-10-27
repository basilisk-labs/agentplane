import type { TaskData } from "../../backends/task-backend.js";
import { matchesAdoptedPrObservation, type AdoptedPrIdentity } from "./adoption-identity.js";
import { assertAdoptedPrMergeReadiness } from "./adoption-task-authority.js";
import {
  observeExistingChangeRequestByNumber,
  resolveChangeRequestIdentity,
} from "./internal/change-request-provider.js";
import type { ObservedChangeRequest } from "./internal/change-request-model.js";
import type { GitHostIdentity } from "./internal/git-host-identity.js";
import { waitForHostedChecks } from "./hosted-checks.js";
import {
  checkGithubUnresolvedReviewThreads,
  throwIfGithubReviewThreadsUnresolved,
} from "./internal/github-review-threads.js";
import { resolveGithubBasePullRequestProtection } from "./integrate/internal/github-protection.js";
import { resolveGitLabBaseMergeRequestProtection } from "./integrate/internal/gitlab-protection.js";
import { runProtectedBaseGithubMerge } from "./integrate/internal/github-pr-merge.js";
import { runProtectedBaseGitLabMerge } from "./integrate/internal/gitlab-mr-merge.js";
import { runGhApiJson } from "./internal/gh-api.js";
import { runGlabApiJson } from "./internal/glab-api.js";

/** Read-only proof that the immutable merge result used the authorized base immediately. */
export async function proveAdoptedMergeExactBaseParent(opts: {
  gitRoot: string;
  receipt: AdoptedPrIdentity;
  expectedBaseSha: string;
  mergeCommit: string;
}): Promise<boolean> {
  const { receipt, expectedBaseSha, mergeCommit } = opts;
  if (!/^[a-f0-9]{40,64}$/u.test(expectedBaseSha) || !/^[a-f0-9]{40,64}$/u.test(mergeCommit)) {
    return false;
  }
  if (receipt.provider === "github") {
    const commit = await runGhApiJson<{
      sha?: string | null;
      parents?: { sha?: string | null }[] | null;
    }>(opts.gitRoot, [
      `repos/${receipt.target_project}/commits/${encodeURIComponent(mergeCommit)}`,
    ]);
    return commit.sha === mergeCommit && commit.parents?.[0]?.sha === expectedBaseSha;
  }
  if (receipt.provider === "gitlab") {
    const commit = await runGlabApiJson<{ id?: string; parent_ids?: string[] }>({
      cwd: opts.gitRoot,
      hostname: receipt.hostname,
      endpoint: `projects/${encodeURIComponent(receipt.target_project)}/repository/commits/${encodeURIComponent(mergeCommit)}`,
    });
    return commit.id === mergeCommit && commit.parent_ids?.[0] === expectedBaseSha;
  }
  return false;
}

export type AdoptedMergeDependencies = {
  resolveIdentity: (gitRoot: string, branch: string) => Promise<GitHostIdentity>;
  observe: (
    gitRoot: string,
    branch: string,
    base: string,
    number: number,
    identity: GitHostIdentity,
  ) => Promise<ObservedChangeRequest>;
  checks: (gitRoot: string, receipt: AdoptedPrIdentity, headSha: string) => Promise<void>;
  protection: (
    gitRoot: string,
    receipt: AdoptedPrIdentity,
    identity: GitHostIdentity,
  ) => Promise<void>;
  merge: (
    gitRoot: string,
    receipt: AdoptedPrIdentity,
    identity: GitHostIdentity,
    headSha: string,
    guard: () => Promise<void>,
  ) => Promise<void>;
  proveBase: (
    gitRoot: string,
    receipt: AdoptedPrIdentity,
    expectedBaseSha: string,
    mergeCommit: string,
  ) => Promise<boolean>;
};

const provider: AdoptedMergeDependencies = {
  resolveIdentity: async (gitRoot, branch) => resolveChangeRequestIdentity({ gitRoot, branch }),
  observe: async (gitRoot, branch, base, number, identity) => {
    const result = await observeExistingChangeRequestByNumber({
      gitRoot,
      branch,
      baseBranch: base,
      prNumber: number,
      identity,
    });
    if (result.state !== "found")
      throw new Error(`Adopted PR provider readback is ${result.state}`);
    return result.pr;
  },
  checks: async (gitRoot, receipt, headSha) => {
    await waitForHostedChecks({
      gitRoot,
      prNumber: receipt.pr_number,
      branch: receipt.head_ref,
      expectedHeadSha: headSha,
      recordedProvider: {
        kind: receipt.provider,
        hostname: receipt.hostname,
        remote: receipt.remote,
        source_project: receipt.source_project,
        target_project: receipt.target_project,
      },
      stablePolls: 2,
      quiet: true,
    });
    if (receipt.provider === "github") {
      const threads = await checkGithubUnresolvedReviewThreads({
        gitRoot,
        prNumber: receipt.pr_number,
      });
      if (!threads.checked) throw new Error("Adopted PR review-thread readback is unavailable");
      throwIfGithubReviewThreadsUnresolved({
        prNumber: receipt.pr_number,
        unresolved: threads.unresolved,
      });
    }
  },
  protection: async (gitRoot, receipt, identity) => {
    const result =
      identity.provider === "github"
        ? await resolveGithubBasePullRequestProtection({ gitRoot, baseBranch: receipt.base_ref })
        : await resolveGitLabBaseMergeRequestProtection({
            gitRoot,
            identity,
            baseBranch: receipt.base_ref,
          });
    if (result.state === "unavailable")
      throw new Error(`Adopted PR base protection is unavailable: ${result.reason}`);
  },
  merge: async (gitRoot, receipt, identity, headSha, guard) => {
    if (identity.provider === "github") {
      await runProtectedBaseGithubMerge({
        gitRoot,
        prTarget: String(receipt.pr_number),
        expectedHeadSha: headSha,
        preMutationGuard: guard,
        exactBaseParentProof: true,
      });
    } else {
      await runProtectedBaseGitLabMerge({
        gitRoot,
        identity,
        prNumber: receipt.pr_number,
        expectedHeadSha: headSha,
        preMutationGuard: guard,
        exactBaseParentProof: true,
      });
    }
  },
  proveBase: async (gitRoot, receipt, expectedBaseSha, mergeCommit) =>
    await proveAdoptedMergeExactBaseParent({
      gitRoot,
      receipt,
      expectedBaseSha,
      mergeCommit,
    }),
};

/** Provider-native merge of an adopted PR. The caller must first admit a separate USER-authorized workflow operation. */
export async function mergeAdoptedPr(opts: {
  gitRoot: string;
  task: TaskData;
  receipt: AdoptedPrIdentity;
  expectedHeadSha: string;
  expectedBaseSha: string;
  assertAuthority: () => Promise<void>;
  assertVerification: () => Promise<void>;
  dependencies?: AdoptedMergeDependencies;
}): Promise<{ status: "merged"; mergeCommit: string; mergedAt: string }> {
  const deps = opts.dependencies ?? provider;
  const { receipt } = opts;
  assertAdoptedPrMergeReadiness(opts.task, opts.expectedHeadSha);
  await opts.assertVerification();
  const identity = await deps.resolveIdentity(opts.gitRoot, receipt.head_ref);
  if (
    identity.provider !== receipt.provider ||
    identity.hostname !== receipt.hostname ||
    identity.remote !== receipt.remote ||
    identity.sourceProject !== receipt.source_project ||
    identity.targetProject !== receipt.target_project ||
    identity.sourceProject !== identity.targetProject
  )
    throw new Error("Adopted PR configured remote identity changed");
  const read = async () =>
    deps.observe(opts.gitRoot, receipt.head_ref, receipt.base_ref, receipt.pr_number, identity);
  const assertOpen = async () => {
    const observed = await read();
    if (
      !matchesAdoptedPrObservation(receipt, observed) ||
      observed.status !== "OPEN" ||
      observed.headSha !== opts.expectedHeadSha ||
      observed.baseSha !== opts.expectedBaseSha ||
      observed.mergeability?.state === "conflicting" ||
      observed.mergeability?.providerState?.trim().toLowerCase() === "behind"
    )
      throw new Error("Adopted PR identity, open state, or exact head/base changed");
  };
  await opts.assertAuthority();
  await assertOpen();
  await deps.protection(opts.gitRoot, receipt, identity);
  await deps.checks(opts.gitRoot, receipt, opts.expectedHeadSha);
  const guard = async () => {
    await opts.assertAuthority();
    await opts.assertVerification();
    await assertOpen();
    await deps.checks(opts.gitRoot, receipt, opts.expectedHeadSha);
  };
  await deps.merge(opts.gitRoot, receipt, identity, opts.expectedHeadSha, guard);
  const merged = await read();
  if (
    !matchesAdoptedPrObservation(receipt, merged) ||
    merged.status !== "MERGED" ||
    merged.headSha !== opts.expectedHeadSha ||
    !merged.mergeCommit ||
    !merged.mergedAt
  )
    throw new Error("Adopted PR merge has no matching exact-head provider readback");
  if (!(await deps.proveBase(opts.gitRoot, receipt, opts.expectedBaseSha, merged.mergeCommit))) {
    throw new Error("Adopted PR merge lacks immutable exact pre-merge base proof");
  }
  return { status: "merged", mergeCommit: merged.mergeCommit, mergedAt: merged.mergedAt };
}
