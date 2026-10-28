import type { StateFingerprint } from "@agentplaneorg/core/schemas";
import { canonicalizeJson } from "@agentplaneorg/core/tasks";

import {
  evaluateWorkflowOperationAuthority,
  readSideEffectAuthorityState,
  workflowOperationAuthorityDigest,
} from "../shared/side-effect-authority.js";
import type { SideEffectAuthorityRecord } from "../shared/side-effect-authority-policy.js";
import type { WorkflowOperation } from "../shared/workflow-step.js";
import {
  bindObservedExistingPr,
  sameAdoption,
  type AdoptedPrIdentity,
  type ExistingPrAdoptionClaim,
} from "./adoption-identity.js";
import type { ObservedChangeRequest } from "./internal/change-request-model.js";
import type { TaskData } from "../../backends/task-backend.js";
import { assertAdoptionTaskAuthority } from "./adoption-task-authority.js";

export type ExistingPrAdoptionStore = {
  /** Read a retained receipt for this task. Malformed receipts must throw. */
  readTask(taskId: string): Promise<AdoptedPrIdentity | null>;
  /** Read any task already bound to the exact provider PR identity. */
  findBinding(identity: AdoptedPrIdentity): Promise<{ task_id: string } | null>;
  /** Atomic first-write. A concurrent duplicate task or PR claim must reject. */
  createIfUnbound(identity: AdoptedPrIdentity): Promise<void>;
};

function sameAdoptionTarget(left: AdoptedPrIdentity, right: AdoptedPrIdentity): boolean {
  const { observed_at: _leftTime, ...leftTarget } = left;
  const { observed_at: _rightTime, ...rightTarget } = right;
  return (
    JSON.stringify(canonicalizeJson(leftTarget)) === JSON.stringify(canonicalizeJson(rightTarget))
  );
}

/** The operator route must pass a grant from the durable authority store. */
export async function adoptExistingPr(opts: {
  claim: Omit<ExistingPrAdoptionClaim, "authorityDigest">;
  task: TaskData;
  fingerprint: StateFingerprint;
  grant: SideEffectAuthorityRecord;
  requestDigest: string;
  observedAt: string;
  observe: () => Promise<ObservedChangeRequest>;
  store: ExistingPrAdoptionStore;
}): Promise<{ state: "adopted" | "already_adopted"; receipt: AdoptedPrIdentity }> {
  assertAdoptionTaskAuthority(opts.task);
  const operation = {
    id: "pr.existing.adopt",
    type: "pr_adopt",
    params: { taskId: opts.claim.taskId, requestDigest: opts.requestDigest },
  } as const satisfies Pick<WorkflowOperation, "id" | "type" | "params">;
  if (
    opts.grant.actor !== "USER" ||
    opts.grant.operationId !== operation.id ||
    opts.grant.operationDigest !== workflowOperationAuthorityDigest(operation)
  ) {
    throw new Error("Existing PR adoption requires a matching, separate USER grant");
  }
  const retainedAuthority = readSideEffectAuthorityState(opts.task);
  if (!retainedAuthority?.grants.some((entry) => entry.digest === opts.grant.digest)) {
    throw new Error("Existing PR adoption grant is missing from durable authority state");
  }

  const observed = await opts.observe();
  const proposed = bindObservedExistingPr(
    { ...opts.claim, authorityDigest: opts.grant.digest },
    observed,
    opts.observedAt,
  );
  const retained = await opts.store.readTask(opts.claim.taskId);
  if (retained) {
    if (!sameAdoptionTarget(retained, proposed)) {
      throw new Error("Task already has a different or partially replayed PR adoption");
    }
    const binding = await opts.store.findBinding(retained);
    if (binding?.task_id !== opts.claim.taskId) {
      throw new Error("Retained PR adoption has no unique matching task binding");
    }
    return { state: "already_adopted", receipt: retained };
  }
  const decision = evaluateWorkflowOperationAuthority({
    task: opts.task,
    operation,
    fingerprint: opts.fingerprint,
  });
  if (decision.state !== "allowed" || decision.authority?.digest !== opts.grant.digest) {
    throw new Error("Existing PR adoption grant is stale or does not match the current state");
  }
  const other = await opts.store.findBinding(proposed);
  if (other) {
    throw new Error("Hosted PR is already bound to another task");
  }

  // A separate provider readback closes the window between preparation and
  // durable write. The store must also enforce uniqueness under one lock.
  const finalReceipt = bindObservedExistingPr(
    { ...opts.claim, authorityDigest: opts.grant.digest },
    await opts.observe(),
    opts.observedAt,
  );
  await opts.store.createIfUnbound(finalReceipt);
  const written = await opts.store.readTask(opts.claim.taskId);
  if (!written || !sameAdoption(written, finalReceipt)) {
    throw new Error("Existing PR adoption write has no matching durable readback");
  }
  return { state: "adopted", receipt: written };
}
