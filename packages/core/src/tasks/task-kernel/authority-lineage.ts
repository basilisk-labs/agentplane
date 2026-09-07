import { compareExecutionAuthority } from "./invariants.js";
import { kernelDigest } from "./digest.js";
import type {
  CanonicalAuthorityRecord,
  ExecutionAuthority,
  KernelInput,
  Sha256Digest,
  TaskAggregate,
} from "./model.js";

export function authorityDigest(authority: Omit<ExecutionAuthority, "digest">) {
  const { digest: _digest, ...contents } = authority as ExecutionAuthority;
  return kernelDigest(contents);
}

export function authorityDeltaApprovalEvidence(input: {
  task_id: string;
  request_digest: Sha256Digest;
  actor_id: string;
}) {
  return kernelDigest({ kind: "canonical_authority_delta_approval", ...input });
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
    if (
      record.observation?.kind !== "authority_delta" &&
      plan?.approval_evidence_digest !== authority.provenance.evidence_digest
    )
      issues.push("authority_plan");
    if (record.observation?.kind === "authority_delta") {
      const parent = records[index - 1]?.authority;
      const observation = record.observation;
      const immutable = parent
        ? {
            ...authority,
            digest: parent.digest,
            repository_fingerprint: parent.repository_fingerprint,
            scope_roots: parent.scope_roots,
            repository_effects: parent.repository_effects,
            provenance: parent.provenance,
          }
        : null;
      if (
        !parent ||
        record.approval_mode === null ||
        record.approval_mode !== "manual_operator" ||
        authority.provenance.kind !== "USER" ||
        authority.provenance.parent_authority_digest !== parent.digest ||
        authority.provenance.evidence_digest !== parent.provenance.evidence_digest ||
        observation.evidence_digest !==
          authorityDeltaApprovalEvidence({
            task_id: aggregate.id,
            request_digest: observation.request_digest!,
            actor_id: authority.provenance.actor_id,
          }) ||
        observation.request_task_revision === undefined ||
        observation.repository_evidence_digest === undefined ||
        observation.added_scope_roots === undefined ||
        observation.added_repository_effects === undefined ||
        observation.added_scope_roots.length === 0 ||
        JSON.stringify(observation.changed_paths) !==
          JSON.stringify([...new Set(observation.changed_paths)].toSorted()) ||
        JSON.stringify(observation.added_scope_roots) !==
          JSON.stringify([...new Set(observation.added_scope_roots)].toSorted()) ||
        JSON.stringify(observation.added_repository_effects) !==
          JSON.stringify([...new Set(observation.added_repository_effects)].toSorted()) ||
        observation.added_scope_roots.some((root) => !observation.changed_paths.includes(root)) ||
        JSON.stringify(authority.scope_roots) !==
          JSON.stringify(
            [...new Set([...parent.scope_roots, ...observation.added_scope_roots])].toSorted(),
          ) ||
        JSON.stringify(authority.repository_effects) !==
          JSON.stringify(
            [
              ...new Set([...parent.repository_effects, ...observation.added_repository_effects]),
            ].toSorted(),
          ) ||
        !immutable ||
        kernelDigest(immutable) !== kernelDigest(parent) ||
        kernelDigest({
          task_id: aggregate.id,
          task_revision: observation.request_task_revision,
          plan_revision: parent.plan_revision,
          plan_digest: parent.plan_digest,
          parent_authority_digest: parent.digest,
          repository_identity: parent.repository_identity,
          previous_fingerprint: parent.repository_fingerprint,
          repository_fingerprint: authority.repository_fingerprint,
          repository_evidence_digest: observation.repository_evidence_digest,
          changed_paths: observation.changed_paths,
          added_scope_roots: observation.added_scope_roots,
          added_repository_effects: observation.added_repository_effects,
        }) !== observation.request_digest
      )
        issues.push("authority_delta");
    } else if (record.approval_mode === null) {
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
  } else if (observation.kind === "authority_delta") {
    return ["authority_delta_requires_user"];
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
