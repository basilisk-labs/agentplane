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
    prFlow.publication?.state !== "aligned" ||
    !prFlow.hostedChecks.checked ||
    prFlow.hostedChecks.failing <= 0
  ) {
    return null;
  }
  const observed = prFlow.providerObservation.pr;
  const localHead = prFlow.branch.headSha;
  const baseSha = observed.baseSha ?? "";
  const mergeability = observed.mergeability;
  if (
    observed.provider !== "github" ||
    observed.identity.provider !== "github" ||
    observed.status !== "OPEN" ||
    observed.prNumber !== prFlow.pr.prNumber ||
    observed.headRef !== prFlow.branch.name ||
    observed.headSha !== localHead ||
    observed.base !== prFlow.pr.base ||
    !GIT_OBJECT_ID.test(baseSha) ||
    !hasCoherentGithubPrMergeability(mergeability) ||
    mergeability?.state !== "not_conflicting" ||
    mergeability.mergeable !== true ||
    mergeability.providerState?.trim().toLowerCase() !== "behind" ||
    prFlow.pr.headSha !== localHead ||
    prFlow.publication.localHeadSha !== localHead ||
    prFlow.publication.upstreamHeadSha !== localHead ||
    prFlow.publication.hostedHeadSha !== localHead
  ) {
    return null;
  }
  return {
    taskId: prFlow.task.id,
    identity: observed.identity,
    prNumber: observed.prNumber,
    branch: prFlow.branch.name,
    baseBranch: observed.base,
    expectedHeadSha: localHead,
    expectedBaseSha: baseSha,
  };
}
