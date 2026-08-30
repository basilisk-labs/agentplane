import { setTimeout as delay } from "node:timers/promises";
import { normalizeGhTransportError } from "../shared/gh-transport.js";
import {
  reconcileProviderUpdateLocalHead,
  validateProviderUpdateLocalState,
} from "./provider-update-branch-local.js";

import type { ObservedChangeRequest } from "./internal/change-request-model.js";
import { observeExistingChangeRequestByNumber } from "./internal/change-request-provider.js";
import { runGhApiJson } from "./internal/gh-api.js";
import type { GitHostIdentity } from "./internal/git-host-identity.js";

const GIT_OBJECT_ID = /^[0-9a-f]{40,64}$/u;

export type ProviderUpdateBranchRequest = Readonly<{
  gitRoot: string;
  worktreePath?: string;
  identity: GitHostIdentity;
  prNumber: number;
  branch: string;
  baseBranch: string;
  expectedHeadSha: string;
  expectedBaseSha: string;
  reconcileHeadSha?: string;
}>;

type ProviderUpdateBranchEvidence = Readonly<{
  provider: "github";
  targetProject: string;
  prNumber: number;
  branch: string;
  baseBranch: string;
  expectedHeadSha: string;
  expectedBaseSha: string;
  observedHeadSha: string;
  containsExpectedHead: boolean;
  containsExpectedBase: boolean;
}>;

export type ProviderUpdateBranchResult =
  | Readonly<{
      state: "updated";
      effect: "applied" | "reconciled";
      observed: ObservedChangeRequest;
      evidence: ProviderUpdateBranchEvidence;
    }>
  | Readonly<{
      state: "not_applied";
      reason:
        | "unsupported_provider"
        | "invalid_request"
        | "observation_unavailable"
        | "pr_not_found"
        | "identity_drift"
        | "pr_not_open"
        | "branch_drift"
        | "base_drift"
        | "head_drift"
        | "conflict"
        | "local_state_unavailable";
      detail: string;
      observed: ObservedChangeRequest | null;
    }>
  | Readonly<{
      state: "effect_in_doubt";
      reason: "readback_unavailable" | "readback_unproven";
      detail: string;
      observed: ObservedChangeRequest | null;
    }>;

type ProviderUpdateBranchNotApplied = Extract<ProviderUpdateBranchResult, { state: "not_applied" }>;
type ProviderUpdateBranchReconciliation = Extract<
  ProviderUpdateBranchResult,
  { state: "updated" | "effect_in_doubt" }
>;

type GithubCompareResponse = {
  status?: string | null;
  base_commit?: { sha?: string | null } | null;
  merge_base_commit?: { sha?: string | null } | null;
};

function sameIdentity(left: GitHostIdentity, right: GitHostIdentity): boolean {
  return (
    left.provider === right.provider &&
    left.hostname === right.hostname &&
    left.remote === right.remote &&
    left.sourceProject === right.sourceProject &&
    left.targetProject === right.targetProject &&
    left.sourceUrl === right.sourceUrl &&
    left.targetUrl === right.targetUrl
  );
}

function validateRequest(opts: ProviderUpdateBranchRequest): string | null {
  if (!Number.isInteger(opts.prNumber) || opts.prNumber <= 0) return "invalid PR number";
  if (!opts.branch.trim() || !opts.baseBranch.trim()) return "branch identity is incomplete";
  if (!GIT_OBJECT_ID.test(opts.expectedHeadSha)) return "expected head SHA is invalid";
  if (!GIT_OBJECT_ID.test(opts.expectedBaseSha)) return "expected base SHA is invalid";
  if (
    opts.reconcileHeadSha !== undefined &&
    (!GIT_OBJECT_ID.test(opts.reconcileHeadSha) || opts.reconcileHeadSha === opts.expectedHeadSha)
  ) {
    return "reconciliation target must be a distinct valid head SHA";
  }
  if (!/^[-A-Za-z0-9_.]+\/[-A-Za-z0-9_.]+$/u.test(opts.identity.targetProject)) {
    return "target project identity is invalid";
  }
  return null;
}

function validateObservedIdentity(
  opts: ProviderUpdateBranchRequest,
  observed: ObservedChangeRequest,
  allowBaseAdvance = false,
): ProviderUpdateBranchNotApplied | null {
  if (
    observed.provider !== "github" ||
    observed.prNumber !== opts.prNumber ||
    !sameIdentity(observed.identity, opts.identity)
  ) {
    return {
      state: "not_applied",
      reason: "identity_drift",
      detail: "Observed provider or pull-request identity does not match the authorized operation.",
      observed,
    };
  }
  if (observed.status !== "OPEN") {
    return {
      state: "not_applied",
      reason: "pr_not_open",
      detail: `Pull request #${opts.prNumber} is ${observed.status}, not OPEN.`,
      observed,
    };
  }
  if (observed.headRef !== opts.branch) {
    return {
      state: "not_applied",
      reason: "branch_drift",
      detail: `Observed head branch ${observed.headRef ?? "unknown"} does not match ${opts.branch}.`,
      observed,
    };
  }
  if (
    observed.base !== opts.baseBranch ||
    !GIT_OBJECT_ID.test(observed.baseSha ?? "") ||
    (!allowBaseAdvance && observed.baseSha !== opts.expectedBaseSha)
  ) {
    return {
      state: "not_applied",
      reason: "base_drift",
      detail:
        `Observed base ${observed.base ?? "unknown"}@${observed.baseSha ?? "unknown"} ` +
        `does not match ${opts.baseBranch}@${opts.expectedBaseSha}.`,
      observed,
    };
  }
  return null;
}

async function provesAncestor(opts: {
  gitRoot: string;
  project: string;
  ancestor: string;
  descendant: string;
}): Promise<boolean> {
  const comparison = await runGhApiJson<GithubCompareResponse>(opts.gitRoot, [
    `repos/${opts.project}/compare/${encodeURIComponent(opts.ancestor)}...${encodeURIComponent(opts.descendant)}`,
  ]);
  const status = comparison.status?.trim().toLowerCase() ?? "";
  return (
    (status === "ahead" || status === "identical") &&
    comparison.base_commit?.sha === opts.ancestor &&
    comparison.merge_base_commit?.sha === opts.ancestor
  );
}

async function reconcileUpdatedHead(opts: {
  request: ProviderUpdateBranchRequest;
  observed: ObservedChangeRequest;
  effect: "applied" | "reconciled";
}): Promise<ProviderUpdateBranchReconciliation> {
  const identityFailure = validateObservedIdentity(
    opts.request,
    opts.observed,
    opts.effect === "applied",
  );
  if (identityFailure) {
    return {
      state: "effect_in_doubt",
      reason: "readback_unproven",
      detail: identityFailure.detail,
      observed: opts.observed,
    };
  }
  const observedHeadSha = opts.observed.headSha ?? "";
  if (!GIT_OBJECT_ID.test(observedHeadSha) || observedHeadSha === opts.request.expectedHeadSha) {
    return {
      state: "effect_in_doubt",
      reason: "readback_unproven",
      detail: "Provider readback did not expose a distinct valid updated head SHA.",
      observed: opts.observed,
    };
  }
  try {
    const observedBase = opts.observed.baseSha!;
    const comparisonContext = {
      gitRoot: opts.request.gitRoot,
      project: opts.request.identity.targetProject,
    };
    if (
      observedBase !== opts.request.expectedBaseSha &&
      (!(await provesAncestor({
        ...comparisonContext,
        ancestor: opts.request.expectedBaseSha,
        descendant: observedBase,
      })) ||
        !(await provesAncestor({
          ...comparisonContext,
          ancestor: observedBase,
          descendant: observedHeadSha,
        })))
    ) {
      return {
        state: "effect_in_doubt",
        reason: "readback_unproven",
        detail: "Updated base lacks exact expected-base and updated-head ancestry evidence.",
        observed: opts.observed,
      };
    }
    const [containsExpectedHead, containsExpectedBase] = await Promise.all([
      provesAncestor({
        gitRoot: opts.request.gitRoot,
        project: opts.request.identity.targetProject,
        ancestor: opts.request.expectedHeadSha,
        descendant: observedHeadSha,
      }),
      provesAncestor({
        gitRoot: opts.request.gitRoot,
        project: opts.request.identity.targetProject,
        ancestor: opts.request.expectedBaseSha,
        descendant: observedHeadSha,
      }),
    ]);
    if (!containsExpectedHead || !containsExpectedBase) {
      return {
        state: "effect_in_doubt",
        reason: "readback_unproven",
        detail: "Updated hosted head lacks exact expected-head or expected-base ancestry evidence.",
        observed: opts.observed,
      };
    }
    const localFailure = await reconcileProviderUpdateLocalHead(opts.request, observedHeadSha);
    if (localFailure) {
      return {
        state: "effect_in_doubt",
        reason: "readback_unproven",
        detail: `Hosted ancestry is proven, but local reconciliation is incomplete: ${localFailure}`,
        observed: opts.observed,
      };
    }
    return {
      state: "updated",
      effect: opts.effect,
      observed: opts.observed,
      evidence: {
        provider: "github",
        targetProject: opts.request.identity.targetProject,
        prNumber: opts.request.prNumber,
        branch: opts.request.branch,
        baseBranch: opts.request.baseBranch,
        expectedHeadSha: opts.request.expectedHeadSha,
        expectedBaseSha: opts.request.expectedBaseSha,
        observedHeadSha,
        containsExpectedHead,
        containsExpectedBase,
      },
    };
  } catch (error) {
    return {
      state: "effect_in_doubt",
      reason: "readback_unproven",
      detail: `Provider ancestry readback failed: ${normalizeGhTransportError(error)}`,
      observed: opts.observed,
    };
  }
}

async function observeAuthorizedPullRequest(
  opts: ProviderUpdateBranchRequest,
  allowBaseAdvance = false,
): Promise<
  | { state: "found"; observed: ObservedChangeRequest }
  | { state: "not_applied"; result: ProviderUpdateBranchNotApplied }
> {
  const lookup = await observeExistingChangeRequestByNumber({
    gitRoot: opts.gitRoot,
    branch: opts.branch,
    baseBranch: opts.baseBranch,
    prNumber: opts.prNumber,
    identity: opts.identity,
  });
  if (lookup.state === "unavailable") {
    return {
      state: "not_applied",
      result: {
        state: "not_applied",
        reason: "observation_unavailable",
        detail: lookup.reason,
        observed: null,
      },
    };
  }
  if (lookup.state === "not_found") {
    return {
      state: "not_applied",
      result: {
        state: "not_applied",
        reason: "pr_not_found",
        detail: `Pull request #${opts.prNumber} was not found.`,
        observed: null,
      },
    };
  }
  const failure = validateObservedIdentity(opts, lookup.pr, allowBaseAdvance);
  return failure
    ? { state: "not_applied", result: failure }
    : { state: "found", observed: lookup.pr };
}

export async function updateProviderBranch(
  opts: ProviderUpdateBranchRequest,
): Promise<ProviderUpdateBranchResult> {
  const invalid = validateRequest(opts);
  if (invalid) {
    return {
      state: "not_applied",
      reason: "invalid_request",
      detail: invalid,
      observed: null,
    };
  }
  if (opts.identity.provider !== "github") {
    return {
      state: "not_applied",
      reason: "unsupported_provider",
      detail: `Provider ${opts.identity.provider} does not implement update-branch.`,
      observed: null,
    };
  }

  const before = await observeAuthorizedPullRequest(opts);
  if (before.state === "not_applied") return before.result;
  if (opts.reconcileHeadSha !== undefined && before.observed.headSha !== opts.reconcileHeadSha) {
    return {
      state: "not_applied",
      reason: "head_drift",
      detail: "The exact reconciliation-only target changed; no provider mutation is permitted.",
      observed: before.observed,
    };
  }
  const localFailure = await validateProviderUpdateLocalState(opts, [
    opts.expectedHeadSha,
    ...(before.observed.headSha ? [before.observed.headSha] : []),
  ]);
  if (localFailure) {
    return {
      state: "not_applied",
      reason: "local_state_unavailable",
      detail: localFailure,
      observed: before.observed,
    };
  }
  if (before.observed.headSha !== opts.expectedHeadSha) {
    const reconciled = await reconcileUpdatedHead({
      request: opts,
      observed: before.observed,
      effect: "reconciled",
    });
    return reconciled.state === "updated"
      ? reconciled
      : {
          state: "not_applied",
          reason: "head_drift",
          detail:
            `Observed head ${before.observed.headSha ?? "unknown"} does not match ` +
            `${opts.expectedHeadSha} and cannot be proven as its authorized update.`,
          observed: before.observed,
        };
  }
  if (before.observed.mergeability?.state === "conflicting") {
    return {
      state: "not_applied",
      reason: "conflict",
      detail: "Provider reports merge conflicts; update-branch was not attempted.",
      observed: before.observed,
    };
  }

  let mutationError: unknown = null;
  try {
    await runGhApiJson<Record<string, unknown>>(opts.gitRoot, [
      `repos/${opts.identity.targetProject}/pulls/${opts.prNumber}/update-branch`,
      "-X",
      "PUT",
      "-f",
      `expected_head_sha=${opts.expectedHeadSha}`,
    ]);
  } catch (error) {
    mutationError = error;
  }

  let lastResult: ProviderUpdateBranchReconciliation | null = null;
  for (let attempt = 0; attempt < 4; attempt += 1) {
    if (attempt > 0) await delay(250 * attempt);
    const after = await observeAuthorizedPullRequest(opts, true).catch((error: unknown) => ({
      state: "not_applied" as const,
      result: {
        state: "effect_in_doubt" as const,
        reason: "readback_unavailable" as const,
        detail: `Provider readback failed: ${normalizeGhTransportError(error)}`,
        observed: null,
      },
    }));
    if (after.state === "not_applied") {
      lastResult = {
        state: "effect_in_doubt",
        reason: "readback_unavailable",
        detail:
          `Provider update-branch ${mutationError ? "failed or remained uncertain" : "returned"}, ` +
          `but exact readback was unavailable: ${after.result.detail}`,
        observed: after.result.observed,
      };
      if (
        after.result.state === "not_applied" &&
        !["observation_unavailable", "pr_not_found"].includes(after.result.reason)
      )
        return lastResult;
      continue;
    }
    const reconciled = await reconcileUpdatedHead({
      request: opts,
      observed: after.observed,
      effect: "applied",
    });
    if (reconciled.state === "updated") return reconciled;
    lastResult = {
      ...reconciled,
      detail: mutationError
        ? `Provider mutation error: ${normalizeGhTransportError(mutationError)}; ${reconciled.detail}`
        : reconciled.detail,
    };
    if (after.observed.headSha !== opts.expectedHeadSha) return lastResult;
  }
  return lastResult!;
}
