import type { PrFlowStatusReport } from "../pr/flow-status.js";
import type { GitHostIdentity } from "../pr/internal/git-host-identity.js";
import { hasCoherentGithubPrMergeability } from "../pr/internal/sync-github.js";

export type ProviderUpdateBranchOperationParams = {
  taskId: string;
  identity: GitHostIdentity;
  prNumber: number;
  branch: string;
  baseBranch: string;
  expectedHeadSha: string;
  expectedBaseSha: string;
  reconcileHeadSha?: string;
};

const GIT_OBJECT_ID = /^[0-9a-f]{40,64}$/u;

export function providerUpdateBranchParams(
  prFlow: PrFlowStatusReport | null,
): ProviderUpdateBranchOperationParams | null {
  if (
    prFlow?.pr.state !== "OPEN" ||
    prFlow.pr.provider !== "github" ||
    prFlow.pr.source !== "lookup" ||
    prFlow.pr.prNumber === null ||
    !prFlow.branch.name ||
    !prFlow.branch.headSha ||
    !prFlow.pr.base ||
    prFlow.providerObservation?.state !== "found" ||
    !prFlow.publication
  ) {
    return null;
  }
  const observed = prFlow.providerObservation.pr;
  // Strict protection can require an updated branch even when its current head checks pass.
  // The coherent provider "behind" observation, not a failed check, establishes this route.
  const localHead = prFlow.branch.headSha;
  const hostedHead = observed.headSha ?? "";
  const baseSha = observed.baseSha ?? "";
  const mergeability = observed.mergeability;
  if (
    observed.provider !== "github" ||
    observed.identity.provider !== "github" ||
    observed.status !== "OPEN" ||
    observed.prNumber !== prFlow.pr.prNumber ||
    observed.headRef !== prFlow.branch.name ||
    !GIT_OBJECT_ID.test(localHead) ||
    !GIT_OBJECT_ID.test(hostedHead) ||
    observed.base !== prFlow.pr.base ||
    !GIT_OBJECT_ID.test(baseSha) ||
    prFlow.pr.headSha !== hostedHead ||
    prFlow.publication.localHeadSha !== localHead ||
    prFlow.publication.hostedHeadSha !== hostedHead
  ) {
    return null;
  }
  const reconciliation = hostedHead !== localHead;
  if (reconciliation) {
    // A mismatched provider head must be proven before publication can replace it.
    // The executor only fast-forwards an exact descendant and never performs PUT in this mode.
    if (
      !prFlow.publication.upstreamRef ||
      prFlow.publication.state !== "hosted_mismatch" ||
      ![localHead, hostedHead].includes(prFlow.publication.upstreamHeadSha ?? "")
    )
      return null;
  } else if (
    prFlow.publication.state !== "aligned" ||
    prFlow.publication.upstreamHeadSha !== localHead ||
    !prFlow.hostedChecks.checked ||
    !hasCoherentGithubPrMergeability(mergeability) ||
    mergeability?.state !== "not_conflicting" ||
    mergeability.mergeable !== true ||
    mergeability.providerState?.trim().toLowerCase() !== "behind"
  )
    return null;
  return {
    taskId: prFlow.task.id,
    identity: observed.identity,
    prNumber: observed.prNumber,
    branch: prFlow.branch.name,
    baseBranch: observed.base,
    expectedHeadSha: localHead,
    expectedBaseSha: baseSha,
    ...(reconciliation ? { reconcileHeadSha: hostedHead } : {}),
  };
}
