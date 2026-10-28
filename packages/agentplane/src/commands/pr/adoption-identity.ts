import { createHash } from "node:crypto";
import { canonicalizeJson } from "@agentplaneorg/core/tasks";

import type { ObservedChangeRequest } from "./internal/change-request-model.js";
import type { GitHostIdentity } from "./internal/git-host-identity.js";

const OBJECT_ID = /^[0-9a-f]{40,64}$/u;
const DIGEST = /^sha256:[0-9a-f]{64}$/u;

export type ExistingPrAdoptionClaim = Readonly<{
  taskId: string;
  identity: GitHostIdentity;
  prNumber: number;
  headRef: string;
  baseRef: string;
  headSha: string;
  baseSha: string;
  authorityDigest: string;
}>;
export type ExistingPrAdoptionTarget = Omit<ExistingPrAdoptionClaim, "authorityDigest">;

export type AdoptedPrIdentity = Readonly<{
  schema_version: 1;
  task_id: string;
  provider: GitHostIdentity["provider"];
  hostname: string;
  remote: string;
  source_project: string;
  target_project: string;
  pr_number: number;
  head_ref: string;
  base_ref: string;
  head_sha: string;
  base_sha: string;
  observed_at: string;
  readback_digest: string;
  authority_digest: string;
}>;

function digest(value: unknown): string {
  return `sha256:${createHash("sha256")
    .update(JSON.stringify(canonicalizeJson(value)))
    .digest("hex")}`;
}

export function existingPrReadbackDigest(observed: ObservedChangeRequest): string {
  return digest({
    provider: observed.provider,
    identity: observed.identity,
    prNumber: observed.prNumber,
    status: observed.status,
    headRef: observed.headRef,
    base: observed.base,
    headSha: observed.headSha,
    baseSha: observed.baseSha,
  });
}

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

/**
 * This is a read-only precondition check. It never infers permission from a
 * provider response: the exact USER authority digest is supplied separately.
 */
export function bindObservedExistingPr(
  claim: ExistingPrAdoptionClaim,
  observed: ObservedChangeRequest,
  observedAt: string,
): AdoptedPrIdentity {
  if (!DIGEST.test(claim.authorityDigest) || !Number.isFinite(Date.parse(observedAt))) {
    throw new Error("Existing PR adoption claim is incomplete or invalid");
  }
  const target = assertObservedExistingPrTarget(claim, observed);
  return {
    schema_version: 1,
    ...target,
    observed_at: observedAt,
    authority_digest: claim.authorityDigest,
  };
}

/** Validate the exact same-repository observation before asking USER to approve it. */
export function assertObservedExistingPrTarget(
  claim: ExistingPrAdoptionTarget,
  observed: ObservedChangeRequest,
): Omit<AdoptedPrIdentity, "schema_version" | "observed_at" | "authority_digest"> {
  if (
    !claim.taskId.trim() ||
    !Number.isSafeInteger(claim.prNumber) ||
    claim.prNumber <= 0 ||
    !OBJECT_ID.test(claim.headSha) ||
    !OBJECT_ID.test(claim.baseSha) ||
    !claim.headRef.trim() ||
    !claim.baseRef.trim()
  ) {
    throw new Error("Existing PR adoption claim is incomplete or invalid");
  }
  if (
    claim.identity.sourceProject !== claim.identity.targetProject ||
    observed.identity.sourceProject !== observed.identity.targetProject
  ) {
    throw new Error("Existing PR adoption supports same-repository PRs only");
  }
  if (
    observed.provider !== claim.identity.provider ||
    !sameIdentity(observed.identity, claim.identity) ||
    observed.prNumber !== claim.prNumber ||
    observed.status !== "OPEN" ||
    observed.headRef !== claim.headRef ||
    observed.base !== claim.baseRef ||
    observed.headSha !== claim.headSha ||
    observed.baseSha !== claim.baseSha ||
    observed.mergeability?.state === "conflicting"
  ) {
    throw new Error("Existing PR identity or exact head/base observation changed");
  }
  return {
    task_id: claim.taskId,
    provider: claim.identity.provider,
    hostname: claim.identity.hostname,
    remote: claim.identity.remote,
    source_project: claim.identity.sourceProject,
    target_project: claim.identity.targetProject,
    pr_number: claim.prNumber,
    head_ref: claim.headRef,
    base_ref: claim.baseRef,
    head_sha: claim.headSha,
    base_sha: claim.baseSha,
    readback_digest: existingPrReadbackDigest(observed),
  };
}

/** A replay is accepted only when the immutable, fully bound receipt is equal. */
export function sameAdoption(retained: AdoptedPrIdentity, proposed: AdoptedPrIdentity): boolean {
  return digest(retained) === digest(proposed);
}

/** Live head/base SHAs may advance; the adopted PR's provider and refs may not. */
export function matchesAdoptedPrObservation(
  adoption: AdoptedPrIdentity,
  observed: ObservedChangeRequest,
): boolean {
  return (
    observed.provider === adoption.provider &&
    observed.identity.provider === adoption.provider &&
    observed.identity.hostname === adoption.hostname &&
    observed.identity.remote === adoption.remote &&
    observed.identity.sourceProject === adoption.source_project &&
    observed.identity.targetProject === adoption.target_project &&
    observed.prNumber === adoption.pr_number &&
    observed.headRef === adoption.head_ref &&
    observed.base === adoption.base_ref
  );
}
