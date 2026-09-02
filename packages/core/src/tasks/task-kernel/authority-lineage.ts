import { compareExecutionAuthority } from "./invariants.js";
import { kernelDigest } from "./digest.js";
import type {
  CanonicalAuthorityRecord,
  ExecutionAuthority,
  KernelInput,
  TaskAggregate,
} from "./model.js";

export function authorityDigest(authority: Omit<ExecutionAuthority, "digest">) {
  const { digest: _digest, ...contents } = authority as ExecutionAuthority;
  return kernelDigest(contents);
}

export function canonicalAuthorityIssues(aggregate: TaskAggregate): string[] {
  const issues: string[] = [];
  const records = aggregate.authority_lineage ?? [];
  const seen = new Set<string>();
  for (const [index, record] of records.entries()) {
    const authority = record.authority;
    if (authority.digest !== authorityDigest(authority) || seen.has(authority.digest))
      issues.push("authority_digest");
    seen.add(authority.digest);
    if (authority.task_id !== aggregate.id) issues.push("authority_task");
    const plan = [aggregate.current_plan, ...aggregate.plan_history].find(
      (entry) =>
        entry?.revision === authority.plan_revision && entry.digest === authority.plan_digest,
    );
    if (plan?.approval_evidence_digest !== authority.provenance.evidence_digest)
      issues.push("authority_plan");
    if (record.approval_mode === null) {
      const parent = records[index - 1]?.authority;
      if (!parent || !record.observation || continuationIssues(parent, record).length > 0)
        issues.push("authority_continuation");
    } else if (
      record.observation !== null ||
      authority.provenance.kind !== "USER" ||
      authority.provenance.parent_authority_digest !== null ||
      plan?.approval_actor_id !== authority.provenance.actor_id
    )
      issues.push("authority_approval");
  }
  return issues;
}

/** Compare immutable authority dimensions before admitting an explicit context observation. */
export function continuationIssues(
  parent: ExecutionAuthority,
  record: CanonicalAuthorityRecord,
): string[] {
  const child = record.authority;
  const observation = record.observation;
  if (record.approval_mode !== null || !observation) return ["observation_required"];
  const sameContext = {
    ...child,
    plan_revision: parent.plan_revision,
    plan_digest: parent.plan_digest,
    repository_fingerprint: parent.repository_fingerprint,
  };
  const comparison = compareExecutionAuthority(parent, sameContext);
  if (!comparison.ok) return [...comparison.violations];
  // Continuation cannot remove approved obligations, even if a dispatch may narrow capabilities.
  const originalDimensions = {
    ...sameContext,
    digest: parent.digest,
    provenance: parent.provenance,
  };
  if (kernelDigest(originalDimensions) !== kernelDigest(parent))
    return ["authority_dimensions_changed"];
  if (
    child.digest !== authorityDigest(child) ||
    observation.previous_fingerprint !== parent.repository_fingerprint ||
    !/^sha256:[0-9a-f]{64}$/u.test(observation.evidence_digest)
  )
    return ["observation_binding"];
  if (observation.kind === "plan_amendment") {
    if (
      child.plan_revision !== parent.plan_revision + 1 ||
      child.plan_digest === parent.plan_digest ||
      child.repository_fingerprint !== parent.repository_fingerprint ||
      observation.changed_paths.length > 0
    )
      return ["plan_observation_binding"];
  } else if (
    child.plan_revision !== parent.plan_revision ||
    child.plan_digest !== parent.plan_digest ||
    child.repository_fingerprint === parent.repository_fingerprint ||
    observation.changed_paths.length === 0 ||
    !compareExecutionAuthority(parent, {
      ...sameContext,
      scope_roots: observation.changed_paths,
    }).ok
  )
    return ["repository_observation_scope"];
  return [];
}

export function continuationAdmissionIssues(
  input: KernelInput,
  record: CanonicalAuthorityRecord,
): string[] {
  const parent = input.aggregate.authority_lineage?.at(-1)?.authority;
  const plan = input.aggregate.current_plan;
  if (
    !parent ||
    !input.authority ||
    kernelDigest(parent) !== kernelDigest(input.authority) ||
    input.actor.kind !== "SYSTEM" ||
    !input.actor.capabilities.includes("authority.observe") ||
    record.authority.provenance.actor_id !== input.actor.id ||
    record.authority.repository_fingerprint !== input.repository_fingerprint ||
    plan?.state !== "APPROVED" ||
    record.authority.plan_revision !== plan.revision ||
    record.authority.plan_digest !== plan.digest
  )
    return ["native_authority_observation_required"];
  if (
    !Number.isFinite(Date.parse(input.occurred_at)) ||
    (parent.expires_at !== null &&
      (!Number.isFinite(Date.parse(parent.expires_at)) ||
        Date.parse(input.occurred_at) >= Date.parse(parent.expires_at)))
  )
    return ["authority_expired"];
  if (record.observation?.kind === "plan_amendment") {
    const source = input.aggregate.plan_history.find(
      (entry) => entry.digest === parent.plan_digest,
    );
    if (
      source?.approval_actor_id !== plan.approval_actor_id ||
      source.approval_evidence_digest !== plan.approval_evidence_digest ||
      source.work_items.length !== plan.work_items.length ||
      plan.work_items.some((item) => {
        const original = source.work_items.find((entry) => entry.id === item.id);
        return !original || original.contract_digest !== item.contract_digest;
      })
    )
      return ["nonmaterial_plan_observation_required"];
  }
  return continuationIssues(parent, record);
}
