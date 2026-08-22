export type Sha256Digest = `sha256:${string}`;

export type GitBaseIdentity =
  | Readonly<{ kind: "commit"; sha: string; ref: string | null }>
  | Readonly<{ kind: "unborn"; ref: string | null }>
  | Readonly<{ kind: "unavailable"; reason_code: string; detail?: string }>;

export type TaskIntent = Readonly<{
  task_id: string;
  request: string;
  constraints: readonly string[];
  acceptance_criteria: readonly AcceptanceCriterion[];
  captured_at: string;
}>;

export type RepositorySnapshot = Readonly<{
  schema_version: 1;
  digest: Sha256Digest;
  git: GitBaseIdentity;
  dirty_paths: readonly string[];
  policy_digest: Sha256Digest | null;
  config_digest: Sha256Digest | null;
  context_digest: Sha256Digest | null;
  task_history_cursor: string | null;
  captured_at: string;
}>;

export type TaskLifecycleState =
  | "CAPTURED"
  | "PLANNING"
  | "AWAITING_PLAN_APPROVAL"
  | "ACTIVE"
  | "FINAL_VALIDATION"
  | "COMPLETED"
  | "HUMAN_REQUIRED"
  | "BLOCKED"
  | "EFFECT_IN_DOUBT"
  | "CANCELLED";

export type WorkItemState =
  | "PLANNED"
  | "READY"
  | "CLAIMED"
  | "EXECUTING"
  | "RESULT_RECEIVED"
  | "INSPECTING"
  | "VALIDATING"
  | "REWORK_READY"
  | "COMPLETED"
  | "BLOCKED"
  | "EFFECT_IN_DOUBT"
  | "CANCELLED";

export type SemanticWorkKind =
  | "plan"
  | "execute"
  | "diagnose"
  | "repair"
  | "review"
  | "clarify"
  | "replan";

export type AcceptanceCriterion = Readonly<{
  id: string;
  description: string;
  required: boolean;
  check_ids: readonly string[];
}>;

export type ValidationCheckKind = "structural" | "deterministic" | "semantic" | "provider";

export type ValidationCheck = Readonly<{
  id: string;
  kind: ValidationCheckKind;
  required: boolean;
  capability: string;
  command?: string;
  timeout_ms?: number;
}>;

export type ValidationPlan = Readonly<{
  schema_version: 1;
  criteria: readonly AcceptanceCriterion[];
  checks: readonly ValidationCheck[];
  evidence_fingerprint: Sha256Digest;
}>;

export type ValidationEvidence = Readonly<{
  check_id: string;
  status: "passed" | "failed" | "unsupported" | "stale";
  observed_at: string;
  repository_snapshot_digest: Sha256Digest;
  command_identity: string | null;
  exit_code: number | null;
  artifact_refs: readonly string[];
  detail: string;
}>;

export type ValidationResult = Readonly<{
  schema_version: 1;
  status: "passed" | "failed" | "blocked";
  evidence: readonly ValidationEvidence[];
  unsatisfied_criteria: readonly string[];
  stale_evidence: readonly string[];
}>;

export type ContextSpec = Readonly<{
  required_sources: readonly string[];
  optional_sources: readonly string[];
  symbol_hints: readonly string[];
  max_bytes: number;
}>;

export type RetrievalOutcome =
  | Readonly<{ status: "available"; ref: string; digest: Sha256Digest }>
  | Readonly<{
      status: "omitted" | "malformed" | "denied" | "unavailable";
      ref: string;
      reason_code: string;
      required: boolean;
    }>;

export type ContextBundle = Readonly<{
  schema_version: 1;
  task_id: string;
  plan_revision: number;
  plan_digest: Sha256Digest;
  work_item_id: string | null;
  repository_snapshot: RepositorySnapshot;
  upstream_outputs: readonly OutputManifest[];
  retrievals: readonly RetrievalOutcome[];
  authority: ExecutionAuthority;
  digest: Sha256Digest;
}>;

export type OutputManifest = Readonly<{
  schema_version: 1;
  id: string;
  kind: string;
  schema: string;
  digest: Sha256Digest;
  producer: Readonly<{
    task_id: string;
    plan_revision: number;
    work_item_id: string;
    attempt: number;
  }>;
  repository_snapshot_digest: Sha256Digest;
  provenance: readonly string[];
}>;

export type ResourceClaimSpec = Readonly<{
  kind: "path" | "workspace" | "provider_queue" | "exclusive";
  resource: string;
  mode: "read" | "write" | "exclusive";
}>;

export type WorkItem = Readonly<{
  id: string;
  objective: string;
  depends_on: readonly string[];
  required_inputs: readonly string[];
  expected_outputs: readonly string[];
  scope_roots: readonly string[];
  acceptance_criteria: readonly AcceptanceCriterion[];
  validation: ValidationPlan;
  context: ContextSpec;
  risk: "low" | "medium" | "high";
  capabilities: readonly string[];
  resource_claims: readonly ResourceClaimSpec[];
  optional: boolean;
  priority: number;
}>;

export type WorkItemGraph = Readonly<{
  schema_version: 1;
  work_items: readonly WorkItem[];
}>;

export type TaskPlanProposal = Readonly<{
  schema_version: 1;
  task_id: string;
  planning_baseline: RepositorySnapshot;
  work_items: WorkItemGraph;
  assumptions: readonly string[];
  unresolved_questions: readonly string[];
  top_level_validation: ValidationPlan;
}>;

export type PlanApproval = Readonly<{
  state: "pending" | "approved" | "rejected";
  approved_by: string | null;
  approved_at: string | null;
  approved_digest: Sha256Digest | null;
  policy_facts: readonly string[];
}>;

export type TaskPlanRevision = Readonly<{
  schema_version: 1;
  task_id: string;
  revision: number;
  digest: Sha256Digest;
  proposal: TaskPlanProposal;
  approval: PlanApproval;
  created_at: string;
}>;

export type WorkItemRuntime = Readonly<{
  id: string;
  state: WorkItemState;
  revision: number;
  attempt: number;
  claim_id: string | null;
  output_manifests: readonly OutputManifest[];
  validation_result: ValidationResult | null;
  last_failure: Failure | null;
}>;

export type TaskAggregate = Readonly<{
  schema_version: 1;
  id: string;
  revision: number;
  intent: TaskIntent;
  lifecycle: TaskLifecycleState;
  current_plan: TaskPlanRevision | null;
  plan_history?: readonly TaskPlanRevision[];
  plan_amendments?: readonly PlanAmendment[];
  work_items: Readonly<Record<string, WorkItemRuntime>>;
  final_validation: ValidationResult | null;
  event_cursor: number;
  updated_at: string;
}>;

export type ActorIdentity = Readonly<{
  id: string;
  transport: "pull" | "managed" | "manual";
  capabilities: readonly string[];
}>;

export type ExecutionAuthority = Readonly<{
  task_id: string;
  plan_revision: number;
  plan_digest: Sha256Digest;
  work_item_id: string | null;
  repository_snapshot_digest: Sha256Digest;
  workspace: string;
  writable_roots: readonly string[];
  allowed_operations: readonly string[];
  expires_at: string | null;
}>;

export type ExecutionLease = Readonly<{
  schema_version: 1;
  id: string;
  authority: ExecutionAuthority;
  actor: ActorIdentity;
  resource_claims: readonly ResourceClaimSpec[];
  issued_at: string;
  expires_at: string | null;
}>;

export type SemanticWorkRequest = Readonly<{
  schema_version: 1;
  kind: SemanticWorkKind;
  task_id: string;
  plan_revision: number;
  plan_digest: Sha256Digest;
  work_item: WorkItem | null;
  context: ContextBundle;
  authority: ExecutionAuthority;
  required_outputs: readonly string[];
  stop_rules: readonly string[];
}>;

export type SemanticWorkResult = Readonly<{
  schema_version: 1;
  kind: SemanticWorkKind;
  task_id: string;
  plan_revision: number;
  plan_digest: Sha256Digest;
  work_item_id: string | null;
  context_digest: Sha256Digest;
  status: "completed" | "failed" | "needs_context" | "blocked";
  summary: string;
  claims: readonly string[];
  questions: readonly string[];
  artifacts: readonly string[];
  proposed_plan?: TaskPlanProposal;
  proposed_refinement?: PlanRefinement;
}>;

export type PlanRefinement = Readonly<{
  description: string;
  scope_roots_added: readonly string[];
  outputs_added: readonly string[];
  acceptance_changed: boolean;
  risk_changed: boolean;
  external_effects_added: readonly string[];
  dependencies_changed: boolean;
  architecture_constraints_changed: boolean;
  operations: readonly ("split" | "reorder" | "add_test" | "clarify")[];
}>;

export type PlanAmendment = Readonly<{
  schema_version: 1;
  id: string;
  plan_revision: number;
  plan_digest: Sha256Digest;
  refinement: PlanRefinement;
  actor_id: string;
  created_at: string;
  digest: Sha256Digest;
}>;

export type FailureKind =
  | "semantic"
  | "actor"
  | "tool"
  | "validation"
  | "policy"
  | "infrastructure"
  | "git"
  | "context"
  | "invalid_state"
  | "dependency"
  | "auth"
  | "effect_in_doubt";

export type Failure = Readonly<{
  kind: FailureKind;
  code: string;
  message: string;
  retryable: boolean;
  cause_refs: readonly string[];
}>;

export type RecoveryDecision = Readonly<{
  action: "retry" | "repair" | "block" | "replan" | "require_human" | "reconcile_effect";
  reason_code: string;
  failure: Failure;
}>;

export type ConfirmationDecision = Readonly<{
  action:
    | "proceed"
    | "deny"
    | "require_plan_approval"
    | "require_effect_approval"
    | "require_human"
    | "wait";
  rule: string;
  evidence: readonly string[];
}>;

export type HumanDecisionTicket = Readonly<{
  schema_version: 1;
  id: string;
  kind: "plan" | "effect" | "semantic" | "credentials" | "destructive";
  question: string;
  alternatives: readonly Readonly<{ id: string; consequence: string }>[];
  required_authority: string;
  state_fingerprint: Sha256Digest;
  expires_at: string | null;
  resume_token: string;
}>;

export type DomainEvent = Readonly<{
  schema_version: 1;
  id: string;
  mutation_id: string;
  task_id: string;
  task_revision: number;
  plan_revision: number | null;
  plan_digest: Sha256Digest | null;
  work_item_id: string | null;
  entity: "task" | "plan" | "work_item" | "effect";
  from: string | null;
  to: string;
  cause_refs: readonly string[];
  actor_id: string;
  repository_fingerprint: Sha256Digest | null;
  at: string;
}>;

export type TransitionReceipt = Readonly<{
  schema_version: 1;
  task_id: string;
  previous_revision: number;
  next_revision: number;
  mutation_id: string;
  event: DomainEvent;
  aggregate_digest: Sha256Digest;
}>;

export type PendingEffect = Readonly<{
  operation_id: string;
  state: "intent" | "applied" | "effect_in_doubt" | "reconciled";
  idempotent: boolean;
  receipt_ref: string | null;
}>;

export type ReconciliationSnapshot = Readonly<{
  schema_version: 1;
  task: TaskAggregate;
  repository: RepositorySnapshot;
  active_leases: readonly ExecutionLease[];
  exchanges: readonly string[];
  pending_effects: readonly PendingEffect[];
  artifact_refs: readonly string[];
  provider_state: Readonly<Record<string, string>>;
  external_drift: readonly string[];
}>;

export type TaskCheckpoint = Readonly<{
  schema_version: 1;
  task_id: string;
  task_revision: number;
  plan_revision: number | null;
  event_cursor: number;
  work_item_states: Readonly<Record<string, WorkItemState>>;
  context_refs: readonly string[];
  validation_refs: readonly string[];
  artifact_refs: readonly string[];
  pending_effects: readonly PendingEffect[];
  created_at: string;
}>;

export type RetryBudget = Readonly<{
  task_id: string;
  work_item_id: string | null;
  operation: string;
  failure_kind: FailureKind;
  maximum: number;
  consumed: number;
  reset_fingerprint: Sha256Digest;
}>;

export type OutcomeDisposition = Readonly<{
  kind: "success" | "failure" | "pause" | "wait";
  exit_code: number;
  reason_code: string;
  terminal: boolean;
}>;

export type LifecycleCommand =
  | Readonly<{ kind: "request_semantic_work"; request: SemanticWorkRequest }>
  | Readonly<{ kind: "run_validation"; plan: ValidationPlan; work_item_id: string | null }>
  | Readonly<{ kind: "transition"; event: DomainEvent }>
  | Readonly<{ kind: "decision"; decision: ConfirmationDecision }>
  | Readonly<{ kind: "complete" }>;

export type LifecycleInput = Readonly<{
  snapshot: ReconciliationSnapshot;
  semantic_result?: SemanticWorkResult;
  validation_result?: ValidationResult;
  failure?: Failure;
  actor?: ActorIdentity;
}>;
