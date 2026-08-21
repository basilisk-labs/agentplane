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
    declaration: contract?.declaration ?? null,
    authority: contract?.authority ?? null,
    selected_mode: contract?.selected_mode ?? null,
  });
}

export function createPlanProposal(opts: {
  task_id: string;
  task_revision: number;
  plan: string;
  execution_contract?: TaskExecutionContract;
}): PlanProposal {
  return Object.freeze({
    schema_version: 1,
    kind: "agentplane.plan_proposal",
    task_id: opts.task_id,
    task_revision: opts.task_revision,
    plan_digest: computePlanDigest(opts.plan),
    scope_digest: computeExecutionScopeDigest(opts.execution_contract),
  });
}

function capabilitiesFor(contract: TaskExecutionContract | undefined): ExecutionGrantCapability[] {
  const capabilities = new Set<ExecutionGrantCapability>(["task.lifecycle"]);
  if ((contract?.declaration.repository_effects.length ?? 0) > 0) {
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

export function isExecutionGrantActive(opts: {
  grant: ExecutionGrant | null;
  task_id: string;
  plan: string;
  execution_contract?: TaskExecutionContract;
}): opts is {
  grant: ExecutionGrant;
  task_id: string;
  plan: string;
  execution_contract?: TaskExecutionContract;
} {
  return Boolean(
    opts.grant?.task_id === opts.task_id &&
    opts.grant.plan_digest === computePlanDigest(opts.plan) &&
    opts.grant.scope_digest === computeExecutionScopeDigest(opts.execution_contract),
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
}): OperationLease {
  const unsigned = {
    schema_version: 1 as const,
    kind: "agentplane.operation_lease" as const,
    lease_id: randomUUID(),
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
