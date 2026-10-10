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

const sorted = (values: readonly string[]) => [...new Set(values)].toSorted();
const equal = (a: unknown, b: unknown) => kernelDigest(a) === kernelDigest(b);

export function prospectiveScopeApprovalEvidence(request: ProspectiveScopeRequest, actor: string) {
  return kernelDigest({
    kind: "prospective_scope_approval",
    request_digest: kernelDigest(request),
    actor,
  });
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
