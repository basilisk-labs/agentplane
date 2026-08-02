import { readFile } from "node:fs/promises";
import path from "node:path";

import { gitProofEnv } from "@agentplaneorg/core/git";
import { execFileAsync } from "@agentplaneorg/core/process";

import type { GithubPrLookupResult } from "../pr/internal/sync-github.js";
import {
  gitCommitObjectExists,
  gitProofIsAncestor,
  isCanonicalFullCommitOid,
} from "../shared/git-ops.js";
import { parsePrMeta, readPreMergeClosureMarker } from "../shared/pr-meta.js";
import {
  taskCloseAlreadyRecordedOnBase,
  taskPreMergeClosureRecordedOnBase,
} from "../task/close-tail-state.js";
import {
  gitRepositoryHasReplacementRefs,
  hasAuthorityOnlyPostMergeTail,
  isProviderBaseUpdateOfLocalHead,
  validateProviderUpdateReceipt,
} from "./cleanup-merged-provider-compatibility.js";
import {
  observeProviderPr,
  resolveProviderReconciliation,
  validateMergedProviderReceipt as validateStrictMergedProviderReceipt,
  type ProviderReconciliationProof,
} from "./cleanup-merged-provider-reconciliation.js";
import type { CleanupCandidate } from "./cleanup-merged-proof.js";

type CleanupBranchKind = "task" | "task-close";

async function readCleanupPrMetaIfPresent(opts: {
  gitRoot: string;
  workflowDir: string;
  taskId: string;
}) {
  const metaPath = path.join(opts.gitRoot, opts.workflowDir, opts.taskId, "pr", "meta.json");
  try {
    return parsePrMeta(await readFile(metaPath, "utf8"), opts.taskId);
  } catch {
    return null;
  }
}

function commandFailedWithExitCode(error: unknown, code: number): boolean {
  return (error as { code?: number | string } | null)?.code === code;
}

async function gitTreesEquivalent(opts: {
  gitRoot: string;
  baseBranch: string;
  branch: string;
}): Promise<boolean> {
  try {
    await execFileAsync("git", ["diff", "--quiet", opts.baseBranch, opts.branch, "--"], {
      cwd: opts.gitRoot,
      env: gitProofEnv(),
    });
    return true;
  } catch (error) {
    if (commandFailedWithExitCode(error, 1)) return false;
    throw error;
  }
}

async function gitLinearPatchsetEquivalent(opts: {
  gitRoot: string;
  baseBranch: string;
  branch: string;
}): Promise<boolean> {
  const { stdout: mergeCommits } = await execFileAsync(
    "git",
    ["rev-list", "--merges", `${opts.baseBranch}..${opts.branch}`],
    { cwd: opts.gitRoot, env: gitProofEnv() },
  );
  if (mergeCommits.trim()) return false;
  const { stdout } = await execFileAsync("git", ["cherry", opts.baseBranch, opts.branch], {
    cwd: opts.gitRoot,
    env: gitProofEnv(),
  });
  return stdout
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .every((line) => line.startsWith("- "));
}

function blockedCleanupProof(reason: string) {
  return {
    proof: null,
    reason,
    expectedHeadSha: "",
    providerReconciliation: null,
  };
}

function providerUnavailableBecauseRepositoryIsLocal(result: GithubPrLookupResult): boolean {
  return (
    result.state === "unavailable" &&
    result.reason === "origin is unavailable or is not a GitHub repository"
  );
}

async function validateExactMergedProviderReceipt(opts: {
  gitRoot: string;
  baseBranch: string;
  branchHead: string;
  result: GithubPrLookupResult;
}): Promise<{ prNumber: number | null; reason: string | null; observedHeadSha: string | null }> {
  if (opts.result.state === "not_found") {
    return {
      prNumber: null,
      reason: "provider PR was not found for the exact branch and base",
      observedHeadSha: null,
    };
  }
  if (opts.result.state === "unavailable") {
    return {
      prNumber: null,
      reason: `provider lookup is unavailable: ${opts.result.reason}`,
      observedHeadSha: null,
    };
  }
  const observed = opts.result.pr;
  if (observed.status !== "MERGED") {
    return {
      prNumber: observed.prNumber,
      reason: `provider PR #${observed.prNumber} is ${observed.status.toLowerCase()}, not merged`,
      observedHeadSha: null,
    };
  }
  if ((observed.base?.trim() ?? "") !== opts.baseBranch) {
    return {
      prNumber: observed.prNumber,
      reason: `provider base mismatch: expected=${opts.baseBranch} observed=${observed.base ?? "-"}`,
      observedHeadSha: null,
    };
  }
  const rawMergeCommit = observed.mergeCommit ?? "";
  const mergeCommit = rawMergeCommit.trim();
  if (rawMergeCommit !== mergeCommit || !isCanonicalFullCommitOid(mergeCommit)) {
    return {
      prNumber: observed.prNumber,
      reason: `provider merge commit must be a canonical full commit OID: ${mergeCommit || "-"}`,
      observedHeadSha: null,
    };
  }
  if (!(await gitCommitObjectExists(opts.gitRoot, mergeCommit))) {
    return {
      prNumber: observed.prNumber,
      reason: `provider merge commit object is unavailable locally: ${mergeCommit}`,
      observedHeadSha: null,
    };
  }
  if (!(await gitProofIsAncestor(opts.gitRoot, mergeCommit, opts.baseBranch))) {
    return {
      prNumber: observed.prNumber,
      reason: `provider merge commit is not on ${opts.baseBranch}: ${mergeCommit}`,
      observedHeadSha: null,
    };
  }
  const rawObservedHeadSha = observed.headSha ?? "";
  const observedHeadSha = rawObservedHeadSha.trim();
  if (rawObservedHeadSha !== observedHeadSha || !isCanonicalFullCommitOid(observedHeadSha)) {
    return {
      prNumber: observed.prNumber,
      reason: `provider head must be a canonical full commit OID: ${observedHeadSha || "-"}`,
      observedHeadSha: observedHeadSha || null,
    };
  }
  if (!(await gitCommitObjectExists(opts.gitRoot, observedHeadSha))) {
    return {
      prNumber: observed.prNumber,
      reason: `provider head object is unavailable locally: ${observedHeadSha}`,
      observedHeadSha,
    };
  }
  if (observedHeadSha !== opts.branchHead) {
    return {
      prNumber: observed.prNumber,
      reason: `provider head mismatch: local=${opts.branchHead} observed=${observed.headSha ?? "-"}`,
      observedHeadSha: observedHeadSha || null,
    };
  }
  return { prNumber: observed.prNumber, reason: null, observedHeadSha };
}

export async function targetedCleanupProof(opts: {
  gitRoot: string;
  workflowDir: string;
  baseBranch: string;
  taskId: string;
  taskCommitSha: string;
  branch: string;
  kind: CleanupBranchKind;
  expectedReconciliation?: ProviderReconciliationProof;
}): Promise<{
  proof: CleanupCandidate["proof"] | null;
  reason: string | null;
  expectedHeadSha: string;
  providerReconciliation: ProviderReconciliationProof | null;
}> {
  const meta = await readCleanupPrMetaIfPresent(opts);
  const marker = opts.kind === "task" ? readPreMergeClosureMarker(meta) : null;
  const taskCommitIdentityReason =
    opts.kind === "task" && !isCanonicalFullCommitOid(opts.taskCommitSha)
      ? `task commit must be a canonical full commit OID: ${opts.taskCommitSha || "-"}`
      : null;
  const closureBasisIdentityReason =
    opts.kind === "task" && marker && !isCanonicalFullCommitOid(marker.basisCommit)
      ? `pre-merge closure basis must be a canonical full commit OID: ${marker.basisCommit || "-"}`
      : null;
  if (taskCommitIdentityReason) return blockedCleanupProof(taskCommitIdentityReason);
  if (opts.kind === "task" && !marker) {
    return blockedCleanupProof("exact pre-merge closure marker is unavailable");
  }
  if (closureBasisIdentityReason) return blockedCleanupProof(closureBasisIdentityReason);
  if (opts.kind === "task") {
    if (!(await gitCommitObjectExists(opts.gitRoot, opts.taskCommitSha))) {
      return blockedCleanupProof(
        `task commit object is unavailable locally: ${opts.taskCommitSha}`,
      );
    }
    if (!(await gitCommitObjectExists(opts.gitRoot, marker?.basisCommit ?? ""))) {
      return blockedCleanupProof(
        `pre-merge closure basis object is unavailable locally: ${marker?.basisCommit ?? "-"}`,
      );
    }
  }
  const branchHeadResult = await execFileAsync("git", ["rev-parse", opts.branch], {
    cwd: opts.gitRoot,
    env: gitProofEnv(),
  });
  const branchHead = branchHeadResult.stdout.trim();
  const result = (
    proof: CleanupCandidate["proof"] | null,
    reason: string | null,
    providerReconciliation: ProviderReconciliationProof | null = null,
  ) => ({ proof, reason, expectedHeadSha: branchHead, providerReconciliation });
  const metaBranch = meta?.branch?.trim() ?? "";
  const recordedPrNumber =
    metaBranch === opts.branch && Number.isInteger(meta?.pr_number) && Number(meta?.pr_number) > 0
      ? Number(meta?.pr_number)
      : null;
  const recordedHostedIdentity =
    metaBranch === opts.branch &&
    (recordedPrNumber !== null ||
      Boolean(meta?.pr_url?.trim()) ||
      meta?.status === "OPEN" ||
      meta?.status === "CLOSED" ||
      meta?.status === "MERGED");
  const providerResult = await observeProviderPr({
    gitRoot: opts.gitRoot,
    branch: opts.branch,
    baseBranch: opts.baseBranch,
    prNumber: recordedPrNumber,
  });
  if (opts.kind === "task") {
    if (recordedPrNumber === null) {
      return result(null, "exact task PR identity is unavailable from metadata");
    }
    const strictProviderReceipt = await validateStrictMergedProviderReceipt({
      gitRoot: opts.gitRoot,
      baseBranch: opts.baseBranch,
      expectedPrNumber: recordedPrNumber,
      expectedReconciliation: opts.expectedReconciliation,
      result: providerResult,
    });
    if (strictProviderReceipt.reason || !strictProviderReceipt.receipt) {
      const updateReceipt = await validateProviderUpdateReceipt({
        gitRoot: opts.gitRoot,
        baseBranch: opts.baseBranch,
        expectedPrNumber: recordedPrNumber,
        result: providerResult,
      });
      const closureRecorded =
        updateReceipt !== null &&
        (await taskPreMergeClosureRecordedOnBase({
          gitRoot: opts.gitRoot,
          workflowDir: opts.workflowDir,
          taskId: opts.taskId,
          baseBranch: opts.baseBranch,
          branch: opts.branch,
          prNumber: updateReceipt.prNumber,
        }));
      if (
        closureRecorded &&
        updateReceipt &&
        (await isProviderBaseUpdateOfLocalHead({
          gitRoot: opts.gitRoot,
          baseBranch: opts.baseBranch,
          branchHeadSha: branchHead,
          providerHeadSha: updateReceipt.providerHeadSha,
        }))
      ) {
        return result("provider_merge", null);
      }
      return result(null, strictProviderReceipt.reason ?? "provider merge receipt is unavailable");
    }
    const receipt = strictProviderReceipt.receipt;
    const closureRecorded = await taskPreMergeClosureRecordedOnBase({
      gitRoot: opts.gitRoot,
      workflowDir: opts.workflowDir,
      taskId: opts.taskId,
      baseBranch: opts.baseBranch,
      branch: opts.branch,
      prNumber: receipt.prNumber,
    });
    if (!closureRecorded) {
      return result(null, "exact pre-merge closure evidence is not recorded on base");
    }
    const reconciliation = await resolveProviderReconciliation({
      gitRoot: opts.gitRoot,
      taskId: opts.taskId,
      branch: opts.branch,
      baseBranch: opts.baseBranch,
      taskCommitSha: opts.taskCommitSha,
      branchHead,
      closureBasisCommit: marker?.basisCommit ?? "",
      receipt,
    });
    if (reconciliation.proof) {
      return result(
        reconciliation.proof.kind === "exact_head" ? "provider_merge" : "provider_rebase",
        null,
        reconciliation.proof,
      );
    }

    if (
      receipt.providerHeadSha === branchHead &&
      !(await gitRepositoryHasReplacementRefs(opts.gitRoot))
    ) {
      return result("provider_merge", null);
    }
    if (
      await hasAuthorityOnlyPostMergeTail({
        gitRoot: opts.gitRoot,
        workflowDir: opts.workflowDir,
        taskId: opts.taskId,
        providerHeadSha: receipt.providerHeadSha,
        branchHeadSha: branchHead,
      })
    ) {
      return result("provider_merge", null);
    }
    if (
      await isProviderBaseUpdateOfLocalHead({
        gitRoot: opts.gitRoot,
        baseBranch: opts.baseBranch,
        branchHeadSha: branchHead,
        providerHeadSha: receipt.providerHeadSha,
      })
    ) {
      return result("provider_merge", null);
    }
    return result(null, reconciliation.reason ?? "provider reconciliation proof is unavailable");
  }

  const providerReceipt = await validateExactMergedProviderReceipt({
    gitRoot: opts.gitRoot,
    baseBranch: opts.baseBranch,
    branchHead,
    result: providerResult,
  });

  const closeRecorded = await taskCloseAlreadyRecordedOnBase({
    gitRoot: opts.gitRoot,
    workflowDir: opts.workflowDir,
    taskId: opts.taskId,
    baseBranch: opts.baseBranch,
  });
  if (!closeRecorded) return result(null, "task-close evidence is not recorded on base");
  if (providerResult.state === "found") {
    return providerReceipt.reason
      ? result(null, providerReceipt.reason)
      : result("provider_merge", null);
  }
  if (recordedHostedIdentity) return result(null, providerReceipt.reason);
  if (
    providerResult.state === "unavailable" &&
    !providerUnavailableBecauseRepositoryIsLocal(providerResult)
  ) {
    return result(null, providerReceipt.reason);
  }
  if (await gitTreesEquivalent(opts)) return result("tree_equivalent", null);
  if (await gitLinearPatchsetEquivalent(opts)) {
    return result("patch_equivalent", null);
  }
  return result(null, "provider-less task-close branch is not tree/patch equivalent to base");
}

function sameProviderReconciliation(
  left: ProviderReconciliationProof,
  right: ProviderReconciliationProof,
): boolean {
  return (
    left.kind === right.kind &&
    left.taskId === right.taskId &&
    left.branch === right.branch &&
    left.baseBranch === right.baseBranch &&
    left.prNumber === right.prNumber &&
    left.taskCommitSha === right.taskCommitSha &&
    left.localHeadSha === right.localHeadSha &&
    left.providerHeadSha === right.providerHeadSha &&
    left.mergeCommit === right.mergeCommit &&
    left.closureBasisCommit === right.closureBasisCommit
  );
}

export async function revalidateCleanupCandidate(opts: {
  gitRoot: string;
  workflowDir: string;
  baseBranch: string;
  candidate: CleanupCandidate;
}): Promise<string | null> {
  const expected = opts.candidate.providerReconciliation;
  if (!expected) return null;
  const proof = await targetedCleanupProof({
    gitRoot: opts.gitRoot,
    workflowDir: opts.workflowDir,
    baseBranch: opts.baseBranch,
    taskId: opts.candidate.taskId,
    taskCommitSha: expected.taskCommitSha,
    branch: opts.candidate.branch,
    kind: "task",
    expectedReconciliation: expected,
  });
  if (!proof.proof || !proof.providerReconciliation) {
    return (
      proof.reason ?? "provider reconciliation proof is unavailable during cleanup revalidation"
    );
  }
  if (!sameProviderReconciliation(expected, proof.providerReconciliation)) {
    return "provider reconciliation changed after proof";
  }
  if (proof.expectedHeadSha !== opts.candidate.expectedHeadSha) {
    return (
      "local task branch head changed after provider reconciliation proof: " +
      `expected=${opts.candidate.expectedHeadSha ?? "-"} observed=${proof.expectedHeadSha}`
    );
  }
  return null;
}
