import { createHash, randomUUID } from "node:crypto";

import { canonicalizeJson } from "@agentplaneorg/core/tasks";
import type { StateFingerprint } from "@agentplaneorg/core/schemas";

import type { TaskData } from "../../backends/task-backend.js";
import { isRecord } from "../../shared/guards.js";
import type { WorkflowOperation, WorkflowOperationId } from "./workflow-step.js";

/** Durable task extension owned by the formal workflow control plane. */
export const SIDE_EFFECT_AUTHORITY_EXTENSION_KEY = "agentplane.side_effect_authority";

export type SideEffectClass =
  | "local_reversible"
  | "external_reversible"
  | "external_high_risk"
  | "semantic_decision";

type AuthorityRequirement = {
  class: SideEffectClass;
  policyRule: string;
  requiresAuthority: boolean;
};

const LOCAL_REVERSIBLE: AuthorityRequirement = {
  class: "local_reversible",
  policyRule: "workflow.local_reversible",
  requiresAuthority: false,
};

const EXTERNAL_REVERSIBLE: AuthorityRequirement = {
  class: "external_reversible",
  policyRule: "workflow.external_reversible",
  requiresAuthority: true,
};

const EXTERNAL_HIGH_RISK: AuthorityRequirement = {
  class: "external_high_risk",
  policyRule: "workflow.external_high_risk",
  requiresAuthority: true,
};

/**
 * One exhaustive policy table makes a newly added formal operation fail closed
 * until it is deliberately classified here.
 */
export const WORKFLOW_OPERATION_AUTHORITY_POLICY = {
  "task.artifacts.commit": LOCAL_REVERSIBLE,
  "task.start": LOCAL_REVERSIBLE,
  "task.branch.start": LOCAL_REVERSIBLE,
  "task.verify.show": LOCAL_REVERSIBLE,
  "runner.follow": LOCAL_REVERSIBLE,
  "batch.follow_primary": LOCAL_REVERSIBLE,
  "batch.collect_included": LOCAL_REVERSIBLE,
  "batch.reconcile_included": LOCAL_REVERSIBLE,
  "integration.adopt_legacy_protected_conflict": EXTERNAL_HIGH_RISK,
  "worktree.prepare": LOCAL_REVERSIBLE,
  "pr.artifacts.update": EXTERNAL_REVERSIBLE,
  "pr.open": EXTERNAL_REVERSIBLE,
  "pr.head.publish": EXTERNAL_REVERSIBLE,
  "provider.pr.refresh": EXTERNAL_REVERSIBLE,
  "route.remote.refresh": EXTERNAL_REVERSIBLE,
  "task.pre_merge_close": EXTERNAL_HIGH_RISK,
  "integration.enqueue": EXTERNAL_HIGH_RISK,
  "task.hosted_close.open": EXTERNAL_REVERSIBLE,
  "task.hosted_close.finalize": EXTERNAL_HIGH_RISK,
  "task.worktree.cleanup": LOCAL_REVERSIBLE,
  "pr.sync_or_verify": EXTERNAL_REVERSIBLE,
} as const satisfies Record<WorkflowOperationId, AuthorityRequirement>;

export type SideEffectAuthorityRecord = {
  schemaVersion: 1;
  kind: "side_effect_authority";
  id: string;
  actor: string;
  policyRule: string;
  operationId: WorkflowOperationId;
  operationDigest: string;
  stateFingerprintDigest: string;
  stateScopeDigest: string;
  issuedAt: string;
  expiresAt: string;
  digest: string;
};

export type SideEffectAuthorityAuditEntry = {
  schemaVersion: 1;
  sequence: number;
  at: string;
  actor: string | null;
  policyRule: string;
  operationId: WorkflowOperationId;
  operationDigest: string;
  stateFingerprintDigest: string;
  authorityDigest: string | null;
  outcome: "approved" | "allowed" | "approval_required" | "denied";
  previousDigest: string | null;
  digest: string;
};

export type SideEffectAuthorityState = {
  schemaVersion: 1;
  grants: readonly SideEffectAuthorityRecord[];
  audit: readonly SideEffectAuthorityAuditEntry[];
};

export type WorkflowAuthorityDecision =
  | {
      state: "allowed";
      requirement: AuthorityRequirement;
      authorityRef: string;
      authority: SideEffectAuthorityRecord | null;
    }
  | {
      state: "approval_required" | "denied";
      requirement: AuthorityRequirement;
      reason: string;
    };

function sha256(value: unknown): string {
  const canonical = JSON.stringify(canonicalizeJson(value));
  if (typeof canonical !== "string") throw new Error("Authority payload must be canonical JSON.");
  return `sha256:${createHash("sha256").update(canonical, "utf8").digest("hex")}`;
}

function isWorkflowOperationId(value: unknown): value is WorkflowOperationId {
  return typeof value === "string" && value in WORKFLOW_OPERATION_AUTHORITY_POLICY;
}

function isDigest(value: unknown): value is string {
  return typeof value === "string" && /^sha256:[0-9a-f]{64}$/u.test(value);
}

function isIsoDate(value: unknown): value is string {
  return typeof value === "string" && Number.isFinite(Date.parse(value));
}

function grantDigest(record: Omit<SideEffectAuthorityRecord, "digest">): string {
  return sha256(record);
}

function auditDigest(entry: Omit<SideEffectAuthorityAuditEntry, "digest">): string {
  return sha256(entry);
}

function parseGrant(value: unknown): SideEffectAuthorityRecord | null {
  if (!isRecord(value)) return null;
  if (
    value.schemaVersion !== 1 ||
    value.kind !== "side_effect_authority" ||
    typeof value.id !== "string" ||
    !value.id.trim() ||
    typeof value.actor !== "string" ||
    !value.actor.trim() ||
    typeof value.policyRule !== "string" ||
    !value.policyRule.trim() ||
    !isWorkflowOperationId(value.operationId) ||
    !isDigest(value.operationDigest) ||
    !isDigest(value.stateFingerprintDigest) ||
    !isDigest(value.stateScopeDigest) ||
    !isIsoDate(value.issuedAt) ||
    !isIsoDate(value.expiresAt) ||
    !isDigest(value.digest)
  ) {
    return null;
  }
  const record: SideEffectAuthorityRecord = {
    schemaVersion: 1,
    kind: "side_effect_authority",
    id: value.id.trim(),
    actor: value.actor.trim(),
    policyRule: value.policyRule.trim(),
    operationId: value.operationId,
    operationDigest: value.operationDigest,
    stateFingerprintDigest: value.stateFingerprintDigest,
    stateScopeDigest: value.stateScopeDigest,
    issuedAt: value.issuedAt,
    expiresAt: value.expiresAt,
    digest: value.digest,
  };
  const { digest: _digest, ...unsigned } = record;
  return grantDigest(unsigned) === record.digest ? record : null;
}

function parseAuditEntry(value: unknown): SideEffectAuthorityAuditEntry | null {
  if (!isRecord(value)) return null;
  if (
    value.schemaVersion !== 1 ||
    typeof value.sequence !== "number" ||
    !Number.isInteger(value.sequence) ||
    (typeof value.actor !== "string" && value.actor !== null) ||
    typeof value.policyRule !== "string" ||
    !isWorkflowOperationId(value.operationId) ||
    !isDigest(value.operationDigest) ||
    !isDigest(value.stateFingerprintDigest) ||
    (value.authorityDigest !== null && !isDigest(value.authorityDigest)) ||
    !["approved", "allowed", "approval_required", "denied"].includes(String(value.outcome)) ||
    (value.previousDigest !== null && !isDigest(value.previousDigest)) ||
    !isDigest(value.digest) ||
    !isIsoDate(value.at)
  ) {
    return null;
  }
  const entry: SideEffectAuthorityAuditEntry = {
    schemaVersion: 1,
    sequence: value.sequence,
    at: value.at,
    actor: typeof value.actor === "string" ? value.actor : null,
    policyRule: value.policyRule,
    operationId: value.operationId,
    operationDigest: value.operationDigest,
    stateFingerprintDigest: value.stateFingerprintDigest,
    authorityDigest: value.authorityDigest,
    outcome: value.outcome as SideEffectAuthorityAuditEntry["outcome"],
    previousDigest: value.previousDigest,
    digest: value.digest,
  };
  const { digest: _digest, ...unsigned } = entry;
  return auditDigest(unsigned) === entry.digest ? entry : null;
}

export function readSideEffectAuthorityState(
  task: Pick<TaskData, "extensions">,
): SideEffectAuthorityState | null {
  const raw = task.extensions?.[SIDE_EFFECT_AUTHORITY_EXTENSION_KEY];
  if (raw === undefined) return { schemaVersion: 1, grants: [], audit: [] };
  if (
    !isRecord(raw) ||
    raw.schemaVersion !== 1 ||
    !Array.isArray(raw.grants) ||
    !Array.isArray(raw.audit)
  ) {
    return null;
  }
  const grants = raw.grants.map(parseGrant);
  const audit = raw.audit.map(parseAuditEntry);
  if (grants.some((entry) => entry === null) || audit.some((entry) => entry === null)) return null;
  const resolvedAudit = audit as SideEffectAuthorityAuditEntry[];
  const chainIsValid = resolvedAudit.every((entry, index) => {
    const previous = resolvedAudit[index - 1] ?? null;
    return entry.sequence === index + 1 && entry.previousDigest === (previous?.digest ?? null);
  });
  if (!chainIsValid) return null;
  return {
    schemaVersion: 1,
    grants: grants as SideEffectAuthorityRecord[],
    audit: resolvedAudit,
  };
}

export function workflowOperationAuthorityRequirement(
  operationId: WorkflowOperationId,
): AuthorityRequirement {
  return WORKFLOW_OPERATION_AUTHORITY_POLICY[operationId];
}

export function workflowOperationAuthorityDigest(
  operation: Pick<WorkflowOperation, "id" | "type" | "params">,
): string {
  return sha256({ id: operation.id, type: operation.type, params: operation.params });
}

/**
 * A grant itself changes task revision and the authority component. Those fields
 * cannot participate in the comparison or every durable approval invalidates
 * itself. All semantic, Git, policy, knowledge, provider, and worktree facts
 * remain bound and therefore still fail closed after material drift.
 */
export function workflowAuthorityStateScopeDigest(fingerprint: StateFingerprint): string {
  return sha256({
    schemaVersion: fingerprint.schema_version,
    kind: fingerprint.kind,
    observedBy: fingerprint.observed_by,
    taskId: fingerprint.task_id,
    gitHead: fingerprint.git_head,
    worktree: fingerprint.worktree,
    components: {
      task: fingerprint.components.task,
      git: fingerprint.components.git,
      backendProjection: fingerprint.components.backend_projection,
      policy: fingerprint.components.policy,
      blueprint: fingerprint.components.blueprint,
      knowledge: fingerprint.components.knowledge,
      provider: fingerprint.components.provider,
    },
  });
}

export function createSideEffectAuthorityRecord(opts: {
  actor: string;
  operation: Pick<WorkflowOperation, "id" | "type" | "params">;
  fingerprint: StateFingerprint;
  issuedAt: string;
  expiresAt: string;
  id?: string;
}): SideEffectAuthorityRecord {
  const requirement = workflowOperationAuthorityRequirement(opts.operation.id);
  if (!requirement.requiresAuthority) {
    throw new Error(`Operation ${opts.operation.id} does not require side-effect authority.`);
  }
  if (!isIsoDate(opts.issuedAt) || !isIsoDate(opts.expiresAt)) {
    throw new Error("Authority timestamps must be valid ISO dates.");
  }
  if (Date.parse(opts.expiresAt) <= Date.parse(opts.issuedAt)) {
    throw new Error("Authority expiry must be after issuance.");
  }
  const record = {
    schemaVersion: 1 as const,
    kind: "side_effect_authority" as const,
    id: opts.id ?? `authority-${randomUUID()}`,
    actor: opts.actor.trim(),
    policyRule: requirement.policyRule,
    operationId: opts.operation.id,
    operationDigest: workflowOperationAuthorityDigest(opts.operation),
    stateFingerprintDigest: opts.fingerprint.digest,
    stateScopeDigest: workflowAuthorityStateScopeDigest(opts.fingerprint),
    issuedAt: opts.issuedAt,
    expiresAt: opts.expiresAt,
  };
  if (!record.actor) throw new Error("Authority actor must be non-empty.");
  return { ...record, digest: grantDigest(record) };
}

export function appendSideEffectAuthorityAudit(opts: {
  state: SideEffectAuthorityState;
  at: string;
  actor: string | null;
  operation: Pick<WorkflowOperation, "id" | "type" | "params">;
  fingerprint: StateFingerprint;
  authority: SideEffectAuthorityRecord | null;
  outcome: SideEffectAuthorityAuditEntry["outcome"];
}): SideEffectAuthorityState {
  const previous = opts.state.audit.at(-1) ?? null;
  const requirement = workflowOperationAuthorityRequirement(opts.operation.id);
  const entry = {
    schemaVersion: 1 as const,
    sequence: opts.state.audit.length + 1,
    at: opts.at,
    actor: opts.actor,
    policyRule: requirement.policyRule,
    operationId: opts.operation.id,
    operationDigest: workflowOperationAuthorityDigest(opts.operation),
    stateFingerprintDigest: opts.fingerprint.digest,
    authorityDigest: opts.authority?.digest ?? null,
    outcome: opts.outcome,
    previousDigest: previous?.digest ?? null,
  };
  return {
    schemaVersion: 1,
    grants: opts.state.grants,
    audit: [...opts.state.audit, { ...entry, digest: auditDigest(entry) }],
  };
}

export function withSideEffectAuthorityState(
  task: Pick<TaskData, "extensions">,
  state: SideEffectAuthorityState,
): NonNullable<TaskData["extensions"]> {
  return {
    ...(isRecord(task.extensions) ? task.extensions : {}),
    [SIDE_EFFECT_AUTHORITY_EXTENSION_KEY]: state,
  };
}

export function evaluateWorkflowOperationAuthority(opts: {
  task: Pick<TaskData, "extensions">;
  operation: Pick<WorkflowOperation, "id" | "type" | "params">;
  fingerprint: StateFingerprint;
  now?: Date;
}): WorkflowAuthorityDecision {
  const requirement = workflowOperationAuthorityRequirement(opts.operation.id);
  if (!requirement.requiresAuthority) {
    return {
      state: "allowed",
      requirement,
      authorityRef: `route:${opts.fingerprint.task_id}:${opts.fingerprint.digest}`,
      authority: null,
    };
  }
  const state = readSideEffectAuthorityState(opts.task);
  if (!state) {
    return {
      state: "denied",
      requirement,
      reason: "side-effect authority state is malformed or its audit chain is invalid",
    };
  }
  const operationDigest = workflowOperationAuthorityDigest(opts.operation);
  const scopeDigest = workflowAuthorityStateScopeDigest(opts.fingerprint);
  const now = (opts.now ?? new Date()).getTime();
  const matching = state.grants.find(
    (grant) =>
      grant.policyRule === requirement.policyRule &&
      grant.operationId === opts.operation.id &&
      grant.operationDigest === operationDigest &&
      grant.stateScopeDigest === scopeDigest &&
      Date.parse(grant.issuedAt) <= now &&
      Date.parse(grant.expiresAt) > now,
  );
  if (!matching) {
    return {
      state: "approval_required",
      requirement,
      reason: "no unexpired authority record matches this operation and current state scope",
    };
  }
  return {
    state: "allowed",
    requirement,
    authorityRef: `authority:${matching.id}`,
    authority: matching,
  };
}
