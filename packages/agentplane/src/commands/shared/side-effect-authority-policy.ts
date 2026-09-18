import type { OperationLease } from "@agentplaneorg/core/tasks";
import type { TaskExecutionContext } from "../../runtime/task-execution-context/index.js";
import type { WorkflowOperationId } from "./workflow-step.js";

/** Durable task extension owned by the formal workflow control plane. */
export const SIDE_EFFECT_AUTHORITY_EXTENSION_KEY = "agentplane.side_effect_authority";

export const CANONICAL_EFFECT_KIND_BY_OPERATION = {
  "task.branch.sync_base": "integration",
  "pr.artifacts.update": "pull_request",
  "pr.open": "pull_request",
  "pr.head.publish": "git_remote",
  "pr.sync_or_verify": "pull_request",
  "provider.pr.refresh": "pull_request",
  "provider.pr.update_branch": "integration",
  "route.remote.refresh": "pull_request",
  "integration.enqueue": "integration",
  "integration.run_next": "integration",
  "task.hosted_close.open": "hosted_ci",
  "task.hosted_close.finalize": "hosted_ci",
  "task.worktree.cleanup": "git_remote",
} as const satisfies Partial<Record<WorkflowOperationId, string>>;

type SideEffectClass =
  | "local_reversible"
  | "external_reversible"
  | "external_high_risk"
  | "external_pre_authorized"
  | "semantic_decision";

export type AuthorityRequirement = {
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

const SEMANTIC_DECISION: AuthorityRequirement = {
  class: "semantic_decision",
  policyRule: "workflow.semantic_decision.user_only",
  requiresAuthority: true,
};

/**
 * The queue entry is itself an exact, durable integration authorization: it
 * can only be created by the authority-gated integration.enqueue operation.
 * Consuming that entry is deterministic execution of the existing authority,
 * not a second high-risk decision.
 */
const EXTERNAL_PRE_AUTHORIZED: AuthorityRequirement = {
  class: "external_pre_authorized",
  policyRule: "workflow.external_pre_authorized_queue",
  requiresAuthority: false,
};

/**
 * One exhaustive policy table makes a newly added formal operation fail closed
 * until it is deliberately classified here.
 */
export const WORKFLOW_OPERATION_AUTHORITY_POLICY = {
  "task.artifacts.commit": LOCAL_REVERSIBLE,
  "task.branch.sync_base": LOCAL_REVERSIBLE,
  "task.start": LOCAL_REVERSIBLE,
  "task.branch.start": LOCAL_REVERSIBLE,
  "task.scope.extend": SEMANTIC_DECISION,
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
  "provider.pr.update_branch": EXTERNAL_HIGH_RISK,
  "flow.repair.foreign_task_readme": LOCAL_REVERSIBLE,
  "route.remote.refresh": EXTERNAL_REVERSIBLE,
  "task.pre_merge_close": EXTERNAL_HIGH_RISK,
  "integration.enqueue": EXTERNAL_HIGH_RISK,
  "integration.run_next": EXTERNAL_PRE_AUTHORIZED,
  "task.hosted_close.open": EXTERNAL_REVERSIBLE,
  // The protected merge and task completion have already been recorded before
  // this route. The close-tail cleanup consumes that durable authorization to
  // fast-forward the base and remove only provider-proven merged local/remote
  // task refs; it cannot select a new integration target.
  "task.hosted_close.finalize": EXTERNAL_PRE_AUTHORIZED,
  "task.worktree.cleanup": EXTERNAL_PRE_AUTHORIZED,
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
  evidenceDigest?: string;
  operationLease?: OperationLease;
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

export type WorkflowOperationCapabilityDecision =
  | { state: "allowed"; effect_class: SideEffectClass }
  | {
      state: "escalation_required";
      effect_class: SideEffectClass;
      from: "direct";
      to: "branch_pr";
      reason_code: "side_effect_requires_isolation";
      requires_approval: boolean;
    }
  | {
      state: "approval_required";
      effect_class: "semantic_decision";
      reason_code: "semantic_decision_user_only";
    };

export function assessWorkflowOperationCapability(opts: {
  execution: Pick<TaskExecutionContext, "selected_mode">;
  operationId: WorkflowOperationId;
}): WorkflowOperationCapabilityDecision {
  const requirement = WORKFLOW_OPERATION_AUTHORITY_POLICY[opts.operationId];
  if (requirement.class === "semantic_decision") {
    return {
      state: "approval_required",
      effect_class: requirement.class,
      reason_code: "semantic_decision_user_only",
    };
  }
  if (
    opts.execution.selected_mode === "direct" &&
    (requirement.class === "external_reversible" || requirement.class === "external_high_risk")
  ) {
    return {
      state: "escalation_required",
      effect_class: requirement.class,
      from: "direct",
      to: "branch_pr",
      reason_code: "side_effect_requires_isolation",
      requires_approval: requirement.requiresAuthority,
    };
  }
  return { state: "allowed", effect_class: requirement.class };
}
