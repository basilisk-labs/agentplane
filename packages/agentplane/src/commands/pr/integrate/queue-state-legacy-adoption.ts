import { createHash } from "node:crypto";

export type LegacyProtectedConflictAdoptionEvidence = {
  schema_version: 1;
  kind: "legacy_protected_conflict_adoption";
  task_id: string;
  source_handoff: {
    created_at: string;
    from_role: "INTEGRATOR";
    route_kind: "protected_base_integrate";
    route_status: "awaiting_github_merge";
    provider_base_sha_state: "absent";
    branch: string;
    base: string;
    head_sha: string;
    pr_branch: string;
    pr_number: number;
  };
  provider: {
    pr_number: number;
    branch: string;
    head_sha: string;
    base: string;
    base_sha: string;
  };
  queue: {
    branch: string;
    base: string;
    head_sha: string;
    base_sha: string;
    pr_number: number;
    updated_at: string;
  };
  topology: {
    provider_base_sha: string;
    queue_base_sha: string;
    observed_current_base_sha: string;
    provider_to_queue: "ancestor_or_equal";
    queue_to_current: "ancestor_or_equal";
    provider_to_current: "strict_ancestor";
  };
};

export type LegacyProtectedConflictAdoptionReceipt = LegacyProtectedConflictAdoptionEvidence & {
  adopted_at: string;
  adopted_by: "INTEGRATOR";
  evidence_token: string;
};

function nonEmptyString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

function positiveInteger(value: unknown): number | null {
  return typeof value === "number" && Number.isSafeInteger(value) && value > 0 ? value : null;
}

function record(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function canonicalEvidence(
  evidence: LegacyProtectedConflictAdoptionEvidence,
): LegacyProtectedConflictAdoptionEvidence {
  return {
    schema_version: 1,
    kind: "legacy_protected_conflict_adoption",
    task_id: evidence.task_id,
    source_handoff: {
      created_at: evidence.source_handoff.created_at,
      from_role: "INTEGRATOR",
      route_kind: "protected_base_integrate",
      route_status: "awaiting_github_merge",
      provider_base_sha_state: "absent",
      branch: evidence.source_handoff.branch,
      base: evidence.source_handoff.base,
      head_sha: evidence.source_handoff.head_sha,
      pr_branch: evidence.source_handoff.pr_branch,
      pr_number: evidence.source_handoff.pr_number,
    },
    provider: {
      pr_number: evidence.provider.pr_number,
      branch: evidence.provider.branch,
      head_sha: evidence.provider.head_sha,
      base: evidence.provider.base,
      base_sha: evidence.provider.base_sha,
    },
    queue: {
      branch: evidence.queue.branch,
      base: evidence.queue.base,
      head_sha: evidence.queue.head_sha,
      base_sha: evidence.queue.base_sha,
      pr_number: evidence.queue.pr_number,
      updated_at: evidence.queue.updated_at,
    },
    topology: {
      provider_base_sha: evidence.topology.provider_base_sha,
      queue_base_sha: evidence.topology.queue_base_sha,
      observed_current_base_sha: evidence.topology.observed_current_base_sha,
      provider_to_queue: "ancestor_or_equal",
      queue_to_current: "ancestor_or_equal",
      provider_to_current: "strict_ancestor",
    },
  };
}

export function legacyProtectedConflictAdoptionToken(
  evidence: LegacyProtectedConflictAdoptionEvidence,
): string {
  const canonical = canonicalEvidence(evidence);
  return `sha256:${createHash("sha256").update(JSON.stringify(canonical), "utf8").digest("hex")}`;
}

export function createLegacyProtectedConflictAdoptionReceipt(opts: {
  evidence: LegacyProtectedConflictAdoptionEvidence;
  adoptedAt?: string;
}): LegacyProtectedConflictAdoptionReceipt {
  const evidence = canonicalEvidence(opts.evidence);
  return {
    ...evidence,
    adopted_at: opts.adoptedAt ?? new Date().toISOString(),
    adopted_by: "INTEGRATOR",
    evidence_token: legacyProtectedConflictAdoptionToken(evidence),
  };
}

function receiptEvidence(
  receipt: LegacyProtectedConflictAdoptionReceipt,
): LegacyProtectedConflictAdoptionEvidence {
  return canonicalEvidence({
    schema_version: receipt.schema_version,
    kind: receipt.kind,
    task_id: receipt.task_id,
    source_handoff: receipt.source_handoff,
    provider: receipt.provider,
    queue: receipt.queue,
    topology: receipt.topology,
  });
}

function hasValidReceipt(receipt: LegacyProtectedConflictAdoptionReceipt): boolean {
  return receipt.evidence_token === legacyProtectedConflictAdoptionToken(receiptEvidence(receipt));
}

export function parseLegacyProtectedConflictAdoptionReceipt(
  raw: unknown,
  index: number,
): LegacyProtectedConflictAdoptionReceipt {
  const value = record(raw);
  const sourceHandoff = record(value?.source_handoff);
  const provider = record(value?.provider);
  const queue = record(value?.queue);
  const topology = record(value?.topology);
  const evidence: LegacyProtectedConflictAdoptionEvidence = {
    schema_version: 1,
    kind: "legacy_protected_conflict_adoption",
    task_id: nonEmptyString(value?.task_id) ?? "",
    source_handoff: {
      created_at: nonEmptyString(sourceHandoff?.created_at) ?? "",
      from_role: "INTEGRATOR",
      route_kind: "protected_base_integrate",
      route_status: "awaiting_github_merge",
      provider_base_sha_state: "absent",
      branch: nonEmptyString(sourceHandoff?.branch) ?? "",
      base: nonEmptyString(sourceHandoff?.base) ?? "",
      head_sha: nonEmptyString(sourceHandoff?.head_sha) ?? "",
      pr_branch: nonEmptyString(sourceHandoff?.pr_branch) ?? "",
      pr_number: positiveInteger(sourceHandoff?.pr_number) ?? 0,
    },
    provider: {
      pr_number: positiveInteger(provider?.pr_number) ?? 0,
      branch: nonEmptyString(provider?.branch) ?? "",
      head_sha: nonEmptyString(provider?.head_sha) ?? "",
      base: nonEmptyString(provider?.base) ?? "",
      base_sha: nonEmptyString(provider?.base_sha) ?? "",
    },
    queue: {
      branch: nonEmptyString(queue?.branch) ?? "",
      base: nonEmptyString(queue?.base) ?? "",
      head_sha: nonEmptyString(queue?.head_sha) ?? "",
      base_sha: nonEmptyString(queue?.base_sha) ?? "",
      pr_number: positiveInteger(queue?.pr_number) ?? 0,
      updated_at: nonEmptyString(queue?.updated_at) ?? "",
    },
    topology: {
      provider_base_sha: nonEmptyString(topology?.provider_base_sha) ?? "",
      queue_base_sha: nonEmptyString(topology?.queue_base_sha) ?? "",
      observed_current_base_sha: nonEmptyString(topology?.observed_current_base_sha) ?? "",
      provider_to_queue: "ancestor_or_equal",
      queue_to_current: "ancestor_or_equal",
      provider_to_current: "strict_ancestor",
    },
  };
  const receipt: LegacyProtectedConflictAdoptionReceipt = {
    ...evidence,
    adopted_at: nonEmptyString(value?.adopted_at) ?? "",
    adopted_by: "INTEGRATOR",
    evidence_token: nonEmptyString(value?.evidence_token) ?? "",
  };
  const valid =
    value?.schema_version === 1 &&
    value.kind === "legacy_protected_conflict_adoption" &&
    value.adopted_by === "INTEGRATOR" &&
    sourceHandoff?.from_role === "INTEGRATOR" &&
    sourceHandoff?.route_kind === "protected_base_integrate" &&
    sourceHandoff?.route_status === "awaiting_github_merge" &&
    sourceHandoff?.provider_base_sha_state === "absent" &&
    topology?.provider_to_queue === "ancestor_or_equal" &&
    topology?.queue_to_current === "ancestor_or_equal" &&
    topology?.provider_to_current === "strict_ancestor" &&
    evidence.task_id.length > 0 &&
    evidence.source_handoff.created_at.length > 0 &&
    evidence.source_handoff.branch.length > 0 &&
    evidence.source_handoff.base.length > 0 &&
    evidence.source_handoff.head_sha.length > 0 &&
    evidence.source_handoff.pr_branch.length > 0 &&
    evidence.source_handoff.pr_number > 0 &&
    evidence.provider.pr_number > 0 &&
    evidence.provider.branch.length > 0 &&
    evidence.provider.head_sha.length > 0 &&
    evidence.provider.base.length > 0 &&
    evidence.provider.base_sha.length > 0 &&
    evidence.queue.branch.length > 0 &&
    evidence.queue.base.length > 0 &&
    evidence.queue.head_sha.length > 0 &&
    evidence.queue.base_sha.length > 0 &&
    evidence.queue.pr_number > 0 &&
    evidence.queue.updated_at.length > 0 &&
    evidence.topology.provider_base_sha === evidence.provider.base_sha &&
    evidence.topology.queue_base_sha === evidence.queue.base_sha &&
    evidence.topology.observed_current_base_sha.length > 0 &&
    receipt.adopted_at.length > 0 &&
    receipt.evidence_token.length > 0 &&
    hasValidReceipt(receipt);
  if (!valid) {
    throw new Error(`entry ${index} has an invalid legacy protected-conflict adoption receipt`);
  }
  return receipt;
}

export function sameLegacyProtectedConflictAdoption(
  left: LegacyProtectedConflictAdoptionReceipt | undefined,
  right: LegacyProtectedConflictAdoptionReceipt | undefined,
): boolean {
  return (
    left?.evidence_token === right?.evidence_token &&
    left?.adopted_at === right?.adopted_at &&
    left?.adopted_by === right?.adopted_by
  );
}
