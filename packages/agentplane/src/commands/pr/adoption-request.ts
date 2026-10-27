import { taskKernel as kernel } from "@agentplaneorg/core/tasks";
import type { StateFingerprint } from "@agentplaneorg/core/schemas";

import { createSideEffectAuthorityRecord } from "../shared/side-effect-authority.js";
import type { SideEffectAuthorityRecord } from "../shared/side-effect-authority-policy.js";
import {
  assertObservedExistingPrTarget,
  existingPrReadbackDigest,
  type ExistingPrAdoptionTarget,
} from "./adoption-identity.js";
import { adoptExistingPr, type ExistingPrAdoptionStore } from "./adoption-route.js";
import type { ObservedChangeRequest } from "./internal/change-request-model.js";
import type { TaskData } from "../../backends/task-backend.js";
import { observeExistingPrClaim } from "./adoption-observe.js";

const DIGEST = /^sha256:[0-9a-f]{64}$/u;

export type ExistingPrAdoptionRequest = Readonly<{
  schema_version: 1;
  kind: "existing_pr_adoption_request";
  claim: ExistingPrAdoptionTarget;
  state_fingerprint_digest: string;
  provider_readback_digest: string;
  prepared_at: string;
  digest: string;
}>;

export function existingPrAdoptionOperation(request: ExistingPrAdoptionRequest) {
  return {
    id: "pr.existing.adopt" as const,
    type: "pr_adopt" as const,
    params: { taskId: request.claim.taskId, requestDigest: request.digest },
  };
}

export function assertExistingPrAdoptionRequest(raw: ExistingPrAdoptionRequest) {
  const { digest, ...contents } = raw;
  if (
    raw.schema_version !== 1 ||
    raw.kind !== "existing_pr_adoption_request" ||
    !DIGEST.test(raw.state_fingerprint_digest) ||
    !DIGEST.test(raw.provider_readback_digest) ||
    !Number.isFinite(Date.parse(raw.prepared_at)) ||
    digest !== kernel.kernelDigest(contents)
  ) {
    throw new Error("Existing PR adoption request is malformed or changed");
  }
  return raw;
}

/** Prepare one inert, exact request from a provider read. No authority is created here. */
export function prepareExistingPrAdoption(opts: {
  claim: ExistingPrAdoptionTarget;
  observed: ObservedChangeRequest;
  fingerprint: StateFingerprint;
  preparedAt: string;
}) {
  if (opts.fingerprint.task_id !== opts.claim.taskId) {
    throw new Error("Existing PR adoption task fingerprint changed");
  }
  const target = assertObservedExistingPrTarget(opts.claim, opts.observed);
  const contents = {
    schema_version: 1 as const,
    kind: "existing_pr_adoption_request" as const,
    claim: opts.claim,
    state_fingerprint_digest: opts.fingerprint.digest,
    provider_readback_digest: target.readback_digest,
    prepared_at: opts.preparedAt,
  };
  if (!Number.isFinite(Date.parse(opts.preparedAt))) {
    throw new Error("Existing PR adoption preparation time is invalid");
  }
  const request = assertExistingPrAdoptionRequest({
    ...contents,
    digest: kernel.kernelDigest(contents),
  });
  return {
    request,
    approval_digest: kernel.kernelDigest({
      operation: "pr.existing.adopt",
      request_digest: request.digest,
    }),
  };
}

/** The provider-neutral operator preparation keeps remote identity resolution in the read path. */
export async function prepareExistingPrAdoptionFromProvider(opts: {
  gitRoot: string;
  claim: ExistingPrAdoptionTarget;
  fingerprint: StateFingerprint;
  preparedAt: string;
}) {
  const observed = await observeExistingPrClaim({ gitRoot: opts.gitRoot, claim: opts.claim });
  return prepareExistingPrAdoption({ ...opts, observed });
}

/** Approve only the exact request shown to USER; the caller persists this grant. */
export function approveExistingPrAdoption(opts: {
  request: ExistingPrAdoptionRequest;
  approvedDigest: string;
  actor: string;
  fingerprint: StateFingerprint;
  issuedAt: string;
  expiresAt: string;
}): SideEffectAuthorityRecord {
  const request = assertExistingPrAdoptionRequest(opts.request);
  const approvalDigest = kernel.kernelDigest({
    operation: "pr.existing.adopt",
    request_digest: request.digest,
  });
  if (
    opts.actor !== "USER" ||
    opts.approvedDigest !== approvalDigest ||
    opts.fingerprint.task_id !== request.claim.taskId ||
    opts.fingerprint.digest !== request.state_fingerprint_digest
  ) {
    throw new Error("Existing PR adoption requires exact separate USER approval");
  }
  return createSideEffectAuthorityRecord({
    actor: opts.actor,
    operation: existingPrAdoptionOperation(request),
    fingerprint: opts.fingerprint,
    issuedAt: opts.issuedAt,
    expiresAt: opts.expiresAt,
    evidenceDigest: approvalDigest,
  });
}

/** Apply only a retained, approved request against fresh provider readback. */
export async function applyExistingPrAdoptionRequest(opts: {
  request: ExistingPrAdoptionRequest;
  task: TaskData;
  fingerprint: StateFingerprint;
  grant: SideEffectAuthorityRecord;
  observedAt: string;
  observe: () => Promise<ObservedChangeRequest>;
  store: ExistingPrAdoptionStore;
}) {
  const request = assertExistingPrAdoptionRequest(opts.request);
  if (opts.fingerprint.task_id !== request.claim.taskId) {
    throw new Error("Existing PR adoption task fingerprint changed");
  }
  const observed = await opts.observe();
  assertObservedExistingPrTarget(request.claim, observed);
  if (existingPrReadbackDigest(observed) !== request.provider_readback_digest) {
    throw new Error("Existing PR adoption provider readback changed after preparation");
  }
  let initialReadConsumed = false;
  return adoptExistingPr({
    claim: request.claim,
    task: opts.task,
    fingerprint: opts.fingerprint,
    grant: opts.grant,
    requestDigest: request.digest,
    observedAt: opts.observedAt,
    observe: () => {
      if (!initialReadConsumed) {
        initialReadConsumed = true;
        return Promise.resolve(observed);
      }
      return opts.observe();
    },
    store: opts.store,
  });
}

/** Each apply read resolves the configured remote again before an atomic store write. */
export async function applyExistingPrAdoptionRequestFromProvider(
  opts: Omit<Parameters<typeof applyExistingPrAdoptionRequest>[0], "observe"> & { gitRoot: string },
) {
  const observe = () =>
    observeExistingPrClaim({ gitRoot: opts.gitRoot, claim: opts.request.claim });
  return applyExistingPrAdoptionRequest({ ...opts, observe });
}
