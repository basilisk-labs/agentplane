import { kernelDigest } from "./digest.js";
import type {
  CanonicalAuthorityRecord,
  ExecutionAuthority,
  KernelInput,
  Sha256Digest,
} from "./model.js";

/** A pre-effect request is distinct from an observation of already changed repository paths. */
export type ProspectiveScopeRequest = Readonly<{
  task_id: string;
  record_digest: Sha256Digest;
  task_revision: number;
  plan_revision: number;
  plan_digest: Sha256Digest;
  work_item_id: string;
  attempt: number;
  claim_id: string;
  contract_digest: Sha256Digest;
  work_order_id: Sha256Digest;
  result_digest: Sha256Digest;
  result_authentication: "native_stop_receipt" | "legacy_current_retained_content";
  stop_receipt_digest: Sha256Digest;
  parent_authority_digest: Sha256Digest;
  repository_fingerprint: Sha256Digest;
  intake_before_digest: Sha256Digest;
  intake_after_digest: Sha256Digest;
  scope_roots: readonly string[];
  repository_effects: readonly string[];
}>;

/** A completed task has no blocked WorkItem; its retained rework stop is task-level. */
export type CompletedReworkScopeRequest = Readonly<{
  task_id: string;
  record_digest: Sha256Digest;
  task_revision: number;
  plan_revision: number;
  plan_digest: Sha256Digest;
  work_order_id: string;
  result_digest: Sha256Digest;
  transition_id: string;
  blocker_state_fingerprint: Sha256Digest;
  blocker_request_digest: Sha256Digest;
  baseline_head: string;
  parent_authority_digest: Sha256Digest;
  repository_identity: Sha256Digest;
  repository_fingerprint: Sha256Digest;
  policy_digests_digest: Sha256Digest;
  intake_before_digest: Sha256Digest;
  intake_after_digest: Sha256Digest;
  scope_roots: readonly string[];
  repository_effects: readonly string[];
}>;

const sorted = (values: readonly string[]) => [...new Set(values)].toSorted();
const equal = (a: unknown, b: unknown) => kernelDigest(a) === kernelDigest(b);

export function prospectiveScopeApprovalEvidence(request: ProspectiveScopeRequest, actor: string) {
  return kernelDigest({
    kind: "prospective_scope_approval",
    request_digest: kernelDigest(request),
    actor,
  });
}

export function completedReworkScopeApprovalEvidence(
  request: CompletedReworkScopeRequest,
  actor: string,
) {
  return kernelDigest({
    kind: "completed_rework_scope_approval",
    request_digest: kernelDigest(request),
    actor,
  });
}

export function completedReworkScopeLineageIssues(
  parent: ExecutionAuthority,
  record: CanonicalAuthorityRecord,
): string[] {
  const observation = record.observation;
  const request = observation?.completed_rework_scope_request;
  const child = record.authority;
  if (!request || observation?.kind !== "completed_rework_scope_request")
    return ["completed_rework_scope_request_missing"];
  const immutable = {
    ...child,
    digest: parent.digest,
    scope_roots: parent.scope_roots,
    repository_effects: parent.repository_effects,
    provenance: parent.provenance,
  };
  if (
    record.approval_mode !== "manual_operator" ||
    child.provenance.kind !== "USER" ||
    child.provenance.parent_authority_digest !== parent.digest ||
    child.provenance.evidence_digest !== parent.provenance.evidence_digest ||
    request.task_id !== parent.task_id ||
    request.parent_authority_digest !== parent.digest ||
    request.plan_revision !== parent.plan_revision ||
    request.plan_digest !== parent.plan_digest ||
    request.repository_identity !== parent.repository_identity ||
    request.repository_fingerprint !== parent.repository_fingerprint ||
    request.policy_digests_digest !== kernelDigest(parent.policy_digests) ||
    observation.previous_fingerprint !== parent.repository_fingerprint ||
    observation.changed_paths.length > 0 ||
    observation.request_digest !== kernelDigest(request) ||
    observation.evidence_digest !==
      completedReworkScopeApprovalEvidence(request, child.provenance.actor_id) ||
    !equal(immutable, parent) ||
    !equal(child.scope_roots, sorted([...parent.scope_roots, ...request.scope_roots])) ||
    !equal(
      child.repository_effects,
      sorted([...parent.repository_effects, ...request.repository_effects]),
    ) ||
    !equal(request.scope_roots, sorted(request.scope_roots)) ||
    !equal(request.repository_effects, sorted(request.repository_effects)) ||
    (request.scope_roots.length === 0 && request.repository_effects.length === 0)
  )
    return ["completed_rework_scope_lineage"];
  return [];
}

/** The kernel admits this one explicit USER transition out of a completed task. */
export function completedReworkScopeAdmissionIssues(
  input: KernelInput,
  record: CanonicalAuthorityRecord,
): string[] {
  const aggregate = input.aggregate;
  const parent = aggregate.authority_lineage?.at(-1)?.authority;
  const request = record.observation?.completed_rework_scope_request;
  if (!parent || !request) return ["completed_rework_scope_request_missing"];
  if (
    aggregate.state !== "COMPLETED" ||
    aggregate.current_plan?.state !== "APPROVED" ||
    aggregate.current_plan.digest !== request.plan_digest ||
    aggregate.current_plan.revision !== request.plan_revision ||
    aggregate.revision !== request.task_revision ||
    input.actor.kind !== "USER" ||
    input.actor.transport !== "manual" ||
    input.actor.id !== record.authority.provenance.actor_id ||
    input.authority !== null ||
    input.repository_fingerprint !== request.repository_fingerprint ||
    Object.values(aggregate.work_items).some((item) => item.state !== "COMPLETED") ||
    aggregate.effects.some((effect) =>
      ["PREPARED", "PENDING", "IN_DOUBT"].includes(effect.state),
    ) ||
    (parent.expires_at !== null && Date.parse(parent.expires_at) <= Date.parse(input.occurred_at))
  )
    return ["completed_rework_scope_binding"];
  return completedReworkScopeLineageIssues(parent, record);
}

/** Validate immutable lineage without pretending requested paths have been modified. */
export function prospectiveScopeLineageIssues(
  parent: ExecutionAuthority,
  record: CanonicalAuthorityRecord,
): string[] {
  const observation = record.observation;
  const request = observation?.scope_request;
  const child = record.authority;
  if (!request || observation?.kind !== "prospective_scope_request")
    return ["scope_request_missing"];
  const immutable = {
    ...child,
    digest: parent.digest,
    scope_roots: parent.scope_roots,
    repository_effects: parent.repository_effects,
    provenance: parent.provenance,
  };
  if (
    record.approval_mode !== "manual_operator" ||
    child.provenance.kind !== "USER" ||
    child.provenance.parent_authority_digest !== parent.digest ||
    child.provenance.evidence_digest !== parent.provenance.evidence_digest ||
    request.task_id !== parent.task_id ||
    request.parent_authority_digest !== parent.digest ||
    request.plan_revision !== parent.plan_revision ||
    request.plan_digest !== parent.plan_digest ||
    request.repository_fingerprint !== parent.repository_fingerprint ||
    observation.previous_fingerprint !== parent.repository_fingerprint ||
    observation.changed_paths.length > 0 ||
    observation.request_digest !== kernelDigest(request) ||
    observation.evidence_digest !==
      prospectiveScopeApprovalEvidence(request, child.provenance.actor_id) ||
    !equal(immutable, parent) ||
    !equal(child.scope_roots, sorted([...parent.scope_roots, ...request.scope_roots])) ||
    !equal(
      child.repository_effects,
      sorted([...parent.repository_effects, ...request.repository_effects]),
    ) ||
    !equal(request.scope_roots, sorted(request.scope_roots)) ||
    !equal(request.repository_effects, sorted(request.repository_effects)) ||
    (request.scope_roots.length === 0 && request.repository_effects.length === 0)
  )
    return ["scope_request_lineage"];
  return [];
}

export function prospectiveScopeAdmissionIssues(
  input: KernelInput,
  record: CanonicalAuthorityRecord,
): string[] {
  const aggregate = input.aggregate;
  const parent = aggregate.authority_lineage?.at(-1)?.authority;
  const request = record.observation?.scope_request;
  if (!parent || !request) return ["scope_request_missing"];
  const item = aggregate.work_items[request.work_item_id];
  const stop = aggregate.mutation_receipts[String(`semantic-stop:${request.work_order_id}`)];
  if (
    aggregate.state !== "ACTIVE" ||
    aggregate.current_plan?.state !== "APPROVED" ||
    aggregate.current_plan.digest !== request.plan_digest ||
    aggregate.current_plan.revision !== request.plan_revision ||
    aggregate.revision !== request.task_revision ||
    input.actor.kind !== "USER" ||
    input.actor.transport !== "manual" ||
    input.actor.id !== record.authority.provenance.actor_id ||
    input.authority !== null ||
    input.repository_fingerprint !== request.repository_fingerprint ||
    item?.state !== "BLOCKED" ||
    item.result_digest !== null ||
    item.attempt !== request.attempt ||
    item.claim_id !== request.claim_id ||
    item.definition.contract_digest !== request.contract_digest ||
    !stop ||
    kernelDigest(stop) !== request.stop_receipt_digest ||
    aggregate.effects.some((effect) =>
      ["PREPARED", "PENDING", "IN_DOUBT"].includes(effect.state),
    ) ||
    (parent.expires_at !== null && Date.parse(parent.expires_at) <= Date.parse(input.occurred_at))
  )
    return ["scope_request_binding"];
  return prospectiveScopeLineageIssues(parent, record);
}
