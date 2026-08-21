import { createHash, randomUUID } from "node:crypto";

import type { TaskExecutionContract } from "./task-store.js";

export const EXECUTION_GRANT_EXTENSION_KEY = "agentplane.execution_grant";

export type PlanApprovalEvidenceKind =
  | "manual_operator"
  | "signed_user_receipt"
  | "host_user_decision";

export type PlanProposal = Readonly<{
  schema_version: 1;
  kind: "agentplane.plan_proposal";
  task_id: string;
  task_revision: number;
  plan_digest: string;
  scope_digest: string;
  repository_identity: string;
  completion_contract_digest: string;
}>;

export type HostUserDecision = Readonly<{
  schema_version: 1;
  kind: "agentplane.host_user_decision";
  origin: "user";
  host_id: string;
  conversation_id: string;
  message_id: string;
  task_id: string;
  plan_digest: string;
  state_fingerprint: string;
  decision: "approved";
  decided_at: string;
}>;

export type ExecutionGrantCapability =
  | "task.lifecycle"
  | "task.scope.extend"
  | "repository.write"
  | "repository.integrate"
  | "provider.pr"
  | "provider.merge"
  | "publish"
  | "deploy";

export type ExecutionGrant = Readonly<{
  schema_version: 1;
  kind: "agentplane.execution_grant";
  grant_id: string;
  task_id: string;
  plan_revision: number;
  plan_digest: string;
  scope_digest: string;
  repository_identity: string;
  completion_contract_digest: string;
  actor: string;
  approval_kind: PlanApprovalEvidenceKind;
  approval_evidence_digest: string | null;
  capabilities: readonly ExecutionGrantCapability[];
  issued_at: string;
  status: "active";
  digest: string;
}>;

export type OperationLease = Readonly<{
  schema_version: 1;
  kind: "agentplane.operation_lease";
  lease_id: string;
  grant_digest: string;
  task_id: string;
  operation_id: string;
  operation_digest: string;
  state_fingerprint: string;
  state_scope_digest: string;
  issued_at: string;
  expires_at: string;
  digest: string;
}>;

const DIGEST_PATTERN = /^sha256:[0-9a-f]{64}$/u;

function canonicalize(value: unknown): unknown {
  if (Array.isArray(value)) return value.map((item) => canonicalize(item));
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .toSorted(([left], [right]) => left.localeCompare(right))
        .map(([key, item]) => [key, canonicalize(item)]),
    );
  }
  return value;
}

export function executionGrantDigest(value: unknown): string {
  const encoded = JSON.stringify(canonicalize(value));
  if (typeof encoded !== "string")
    throw new Error("Execution authority value is not serializable.");
  return `sha256:${createHash("sha256").update(encoded, "utf8").digest("hex")}`;
}

export function normalizePlanText(plan: string): string {
  return plan.replaceAll("\r\n", "\n").trim();
}

export function computePlanDigest(plan: string): string {
  return executionGrantDigest({ plan: normalizePlanText(plan) });
}

export function computeExecutionScopeDigest(contract: TaskExecutionContract | undefined): string {
  return executionGrantDigest({
    declaration: contract
      ? {
          repository_effects: contract.declaration.repository_effects,
          external_effects: contract.declaration.external_effects,
          requirements_uncertainty: contract.declaration.requirements_uncertainty,
          implementation_uncertainty: contract.declaration.implementation_uncertainty,
          reversibility: contract.declaration.reversibility,
        }
      : null,
    authority: contract
      ? {
          allowed_repository_effects: contract.authority.allowed_repository_effects,
          forbidden_repository_effects: contract.authority.forbidden_repository_effects,
          allowed_external_effects: contract.authority.allowed_external_effects,
          forbidden_external_effects: contract.authority.forbidden_external_effects,
        }
      : null,
    selected_mode: contract?.selected_mode ?? null,
  });
}

export function computeLogicalCompletionContractDigest(
  contract: TaskExecutionContract | undefined,
): string {
  return executionGrantDigest({
    schema_version: 1,
    selected_mode: contract?.selected_mode ?? null,
    required_evidence: [...(contract?.verification?.required_evidence ?? [])].toSorted(),
    approved_external_effects: [
      ...(contract?.authority?.allowed_external_effects ?? []),
    ].toSorted(),
    logical_phases: [
      "implementation",
      "bounded_rework",
      "verification",
      "integration",
      "closeout",
      "cleanup",
    ],
  });
}

export function createPlanProposal(opts: {
  task_id: string;
  task_revision: number;
  plan: string;
  execution_contract?: TaskExecutionContract;
  repository_identity: string;
}): PlanProposal {
  if (!DIGEST_PATTERN.test(opts.repository_identity)) {
    throw new Error("Plan proposal repository identity must be a sha256 digest.");
  }
  return Object.freeze({
    schema_version: 1,
    kind: "agentplane.plan_proposal",
    task_id: opts.task_id,
    task_revision: opts.task_revision,
    plan_digest: computePlanDigest(opts.plan),
    scope_digest: computeExecutionScopeDigest(opts.execution_contract),
    repository_identity: opts.repository_identity,
    completion_contract_digest: computeLogicalCompletionContractDigest(opts.execution_contract),
  });
}

export function parsePlanProposal(value: unknown): PlanProposal | null {
  const item = record(value);
  if (!item) return null;
  if (
    item.schema_version !== 1 ||
    item.kind !== "agentplane.plan_proposal" ||
    typeof item.task_id !== "string" ||
    !item.task_id.trim() ||
    !Number.isInteger(item.task_revision) ||
    Number(item.task_revision) < 1 ||
    typeof item.plan_digest !== "string" ||
    !DIGEST_PATTERN.test(item.plan_digest) ||
    typeof item.scope_digest !== "string" ||
    !DIGEST_PATTERN.test(item.scope_digest) ||
    typeof item.repository_identity !== "string" ||
    !DIGEST_PATTERN.test(item.repository_identity) ||
    typeof item.completion_contract_digest !== "string" ||
    !DIGEST_PATTERN.test(item.completion_contract_digest)
  ) {
    return null;
  }
  return Object.freeze(item as unknown as PlanProposal);
}

function capabilitiesFor(contract: TaskExecutionContract | undefined): ExecutionGrantCapability[] {
  const capabilities = new Set<ExecutionGrantCapability>(["task.lifecycle"]);
  if ((contract?.declaration.repository_effects.length ?? 0) > 0) {
    capabilities.add("task.scope.extend");
    capabilities.add("repository.write");
    capabilities.add("repository.integrate");
  }
  if (contract?.selected_mode === "branch_pr") {
    capabilities.add("provider.pr");
    capabilities.add("provider.merge");
  }
  const effects = new Set(contract?.declaration.external_effects);
  if (effects.has("network_read") || effects.has("external_write")) {
    capabilities.add("provider.pr");
  }
  if (effects.has("external_write")) capabilities.add("provider.merge");
  if (effects.has("publish")) capabilities.add("publish");
  if (effects.has("deploy")) capabilities.add("deploy");
  return [...capabilities].toSorted();
}

export function createExecutionGrant(opts: {
  proposal: PlanProposal;
  execution_contract?: TaskExecutionContract;
  actor: string;
  approval_kind: PlanApprovalEvidenceKind;
  approval_evidence_digest?: string | null;
  issued_at: string;
}): ExecutionGrant {
  const unsigned = {
    schema_version: 1 as const,
    kind: "agentplane.execution_grant" as const,
    grant_id: randomUUID(),
    task_id: opts.proposal.task_id,
    plan_revision: opts.proposal.task_revision,
    plan_digest: opts.proposal.plan_digest,
    scope_digest: opts.proposal.scope_digest,
    repository_identity: opts.proposal.repository_identity,
    completion_contract_digest: opts.proposal.completion_contract_digest,
    actor: opts.actor.trim(),
    approval_kind: opts.approval_kind,
    approval_evidence_digest: opts.approval_evidence_digest ?? null,
    capabilities: capabilitiesFor(opts.execution_contract),
    issued_at: opts.issued_at,
    status: "active" as const,
  };
  return Object.freeze({ ...unsigned, digest: executionGrantDigest(unsigned) });
}

function record(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function isIsoDate(value: unknown): value is string {
  return typeof value === "string" && Number.isFinite(Date.parse(value));
}

export function parseExecutionGrant(value: unknown): ExecutionGrant | null {
  const item = record(value);
  if (!item) return null;
  if (
    item.schema_version !== 1 ||
    item.kind !== "agentplane.execution_grant" ||
    typeof item.grant_id !== "string" ||
    !item.grant_id.trim() ||
    typeof item.task_id !== "string" ||
    !item.task_id.trim() ||
    !Number.isInteger(item.plan_revision) ||
    Number(item.plan_revision) < 1 ||
    typeof item.plan_digest !== "string" ||
    !DIGEST_PATTERN.test(item.plan_digest) ||
    typeof item.scope_digest !== "string" ||
    !DIGEST_PATTERN.test(item.scope_digest) ||
    typeof item.repository_identity !== "string" ||
    !DIGEST_PATTERN.test(item.repository_identity) ||
    typeof item.completion_contract_digest !== "string" ||
    !DIGEST_PATTERN.test(item.completion_contract_digest) ||
    typeof item.actor !== "string" ||
    !item.actor.trim() ||
    !["manual_operator", "signed_user_receipt", "host_user_decision"].includes(
      String(item.approval_kind),
    ) ||
    (item.approval_evidence_digest !== null &&
      (typeof item.approval_evidence_digest !== "string" ||
        !DIGEST_PATTERN.test(item.approval_evidence_digest))) ||
    !Array.isArray(item.capabilities) ||
    !item.capabilities.every((capability) =>
      [
        "task.lifecycle",
        "task.scope.extend",
        "repository.write",
        "repository.integrate",
        "provider.pr",
        "provider.merge",
        "publish",
        "deploy",
      ].includes(String(capability)),
    ) ||
    !isIsoDate(item.issued_at) ||
    item.status !== "active" ||
    typeof item.digest !== "string" ||
    !DIGEST_PATTERN.test(item.digest)
  ) {
    return null;
  }
  const grant = item as unknown as ExecutionGrant;
  const { digest: _digest, ...unsigned } = grant;
  return executionGrantDigest(unsigned) === grant.digest ? Object.freeze(grant) : null;
}

export function executionGrantFromExtensions(
  extensions: Record<string, unknown> | undefined,
): ExecutionGrant | null {
  return parseExecutionGrant(extensions?.[EXECUTION_GRANT_EXTENSION_KEY]);
}

/**
 * Compatibility reader for grants issued before repository/completion binding
 * existed. The legacy digest is verified first, then the missing context is
 * deterministically compiled into the in-memory grant. The historical task
 * artifact remains unchanged as approval evidence.
 */
export function executionGrantForContextFromExtensions(opts: {
  extensions: Record<string, unknown> | undefined;
  repository_identity: string;
  execution_contract?: TaskExecutionContract;
}): ExecutionGrant | null {
  const raw = opts.extensions?.[EXECUTION_GRANT_EXTENSION_KEY];
  const current = parseExecutionGrant(raw);
  if (current) return current;
  const item = record(raw);
  if (!item) return null;
  if (
    item.schema_version !== 1 ||
    item.kind !== "agentplane.execution_grant" ||
    item.repository_identity !== undefined ||
    item.completion_contract_digest !== undefined ||
    typeof item.digest !== "string" ||
    !DIGEST_PATTERN.test(item.digest)
  ) {
    return null;
  }
  const { digest: legacyDigest, ...legacyUnsigned } = item;
  if (executionGrantDigest(legacyUnsigned) !== legacyDigest) return null;
  const migratedUnsigned = {
    ...legacyUnsigned,
    repository_identity: opts.repository_identity,
    completion_contract_digest: computeLogicalCompletionContractDigest(opts.execution_contract),
  };
  return parseExecutionGrant({
    ...migratedUnsigned,
    digest: executionGrantDigest(migratedUnsigned),
  });
}

export function isExecutionGrantActive(opts: {
  grant: ExecutionGrant | null;
  task_id: string;
  plan: string;
  execution_contract?: TaskExecutionContract;
  repository_identity: string;
}): opts is {
  grant: ExecutionGrant;
  task_id: string;
  plan: string;
  execution_contract?: TaskExecutionContract;
  repository_identity: string;
} {
  return Boolean(
    opts.grant?.task_id === opts.task_id &&
    opts.grant.plan_digest === computePlanDigest(opts.plan) &&
    opts.grant.scope_digest === computeExecutionScopeDigest(opts.execution_contract) &&
    opts.grant.repository_identity === opts.repository_identity &&
    opts.grant.completion_contract_digest ===
      computeLogicalCompletionContractDigest(opts.execution_contract),
  );
}

export function parseHostUserDecision(encoded: string): HostUserDecision {
  const normalized = encoded.trim();
  let value: unknown;
  try {
    const decoded = Buffer.from(normalized, "base64url");
    if (decoded.length === 0 || decoded.toString("base64url") !== normalized.replace(/=+$/u, "")) {
      throw new Error("non-canonical base64url");
    }
    value = JSON.parse(decoded.toString("utf8"));
  } catch {
    throw new Error("Host user decision must be canonical base64url-encoded JSON.");
  }
  const item = record(value);
  if (!item) throw new Error("Host user decision fields are malformed.");
  if (
    item.schema_version !== 1 ||
    item.kind !== "agentplane.host_user_decision" ||
    item.origin !== "user" ||
    typeof item.host_id !== "string" ||
    !item.host_id.trim() ||
    typeof item.conversation_id !== "string" ||
    !item.conversation_id.trim() ||
    typeof item.message_id !== "string" ||
    !item.message_id.trim() ||
    typeof item.task_id !== "string" ||
    !item.task_id.trim() ||
    typeof item.plan_digest !== "string" ||
    !DIGEST_PATTERN.test(item.plan_digest) ||
    typeof item.state_fingerprint !== "string" ||
    !DIGEST_PATTERN.test(item.state_fingerprint) ||
    item.decision !== "approved" ||
    !isIsoDate(item.decided_at)
  ) {
    throw new Error("Host user decision fields are malformed.");
  }
  return Object.freeze(item as unknown as HostUserDecision);
}

export function hostUserDecisionDigest(decision: HostUserDecision): string {
  return executionGrantDigest(decision);
}

export function createOperationLease(opts: {
  grant: ExecutionGrant;
  operation_id: string;
  operation_digest: string;
  state_fingerprint: string;
  state_scope_digest: string;
  issued_at: string;
  expires_at: string;
  lease_id?: string;
}): OperationLease {
  if (!isIsoDate(opts.issued_at) || !isIsoDate(opts.expires_at)) {
    throw new Error("Operation lease timestamps must be valid ISO dates.");
  }
  if (Date.parse(opts.expires_at) <= Date.parse(opts.issued_at)) {
    throw new Error("Operation lease expiry must be after issuance.");
  }
  if (opts.lease_id !== undefined && !opts.lease_id.trim()) {
    throw new Error("Operation lease id must be non-empty when supplied.");
  }
  const unsigned = {
    schema_version: 1 as const,
    kind: "agentplane.operation_lease" as const,
    lease_id: opts.lease_id?.trim() ?? randomUUID(),
    grant_digest: opts.grant.digest,
    task_id: opts.grant.task_id,
    operation_id: opts.operation_id,
    operation_digest: opts.operation_digest,
    state_fingerprint: opts.state_fingerprint,
    state_scope_digest: opts.state_scope_digest,
    issued_at: opts.issued_at,
    expires_at: opts.expires_at,
  };
  return Object.freeze({ ...unsigned, digest: executionGrantDigest(unsigned) });
}

export function parseOperationLease(value: unknown): OperationLease | null {
  const item = record(value);
  if (!item) return null;
  if (
    item.schema_version !== 1 ||
    item.kind !== "agentplane.operation_lease" ||
    typeof item.lease_id !== "string" ||
    !item.lease_id.trim() ||
    typeof item.grant_digest !== "string" ||
    !DIGEST_PATTERN.test(item.grant_digest) ||
    typeof item.task_id !== "string" ||
    !item.task_id.trim() ||
    typeof item.operation_id !== "string" ||
    !item.operation_id.trim() ||
    typeof item.operation_digest !== "string" ||
    !DIGEST_PATTERN.test(item.operation_digest) ||
    typeof item.state_fingerprint !== "string" ||
    !DIGEST_PATTERN.test(item.state_fingerprint) ||
    typeof item.state_scope_digest !== "string" ||
    !DIGEST_PATTERN.test(item.state_scope_digest) ||
    !isIsoDate(item.issued_at) ||
    !isIsoDate(item.expires_at) ||
    Date.parse(item.expires_at) <= Date.parse(item.issued_at) ||
    typeof item.digest !== "string" ||
    !DIGEST_PATTERN.test(item.digest)
  ) {
    return null;
  }
  const lease = item as unknown as OperationLease;
  const { digest: _digest, ...unsigned } = lease;
  return executionGrantDigest(unsigned) === lease.digest ? Object.freeze(lease) : null;
}
