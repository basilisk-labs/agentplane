export type Sha256Digest = `sha256:${string}`;

export const TASK_STATES = [
  "CAPTURED",
  "PLANNING",
  "AWAITING_PLAN_APPROVAL",
  "ACTIVE",
  "FINAL_VALIDATION",
  "COMPLETED",
  "HUMAN_REQUIRED",
  "BLOCKED",
  "EFFECT_IN_DOUBT",
  "CANCELLED",
] as const;

export type TaskState = (typeof TASK_STATES)[number];

export const WORK_ITEM_STATES = [
  "PLANNED",
  "READY",
  "CLAIMED",
  "EXECUTING",
  "RESULT_RECEIVED",
  "INSPECTING",
  "VALIDATING",
  "REWORK_READY",
  "COMPLETED",
  "BLOCKED",
  "EFFECT_IN_DOUBT",
  "CANCELLED",
] as const;

export type WorkItemState = (typeof WORK_ITEM_STATES)[number];

export const EFFECT_STATES = [
  "PREPARED",
  "PENDING",
  "APPLIED",
  "NOT_APPLIED",
  "IN_DOUBT",
  "RECONCILED",
  "SUPERSEDED",
] as const;

export type EffectState = (typeof EFFECT_STATES)[number];

export const KERNEL_REJECTION_CODES = [
  "TASK_ID_MISMATCH",
  "STALE_TASK_REVISION",
  "STALE_STATE_FINGERPRINT",
  "ILLEGAL_TASK_TRANSITION",
  "ILLEGAL_WORK_ITEM_TRANSITION",
  "CURRENT_PLAN_MISSING",
  "CURRENT_PLAN_NOT_APPROVED",
  "PLAN_DIGEST_MISMATCH",
  "PLAN_REVISION_MISMATCH",
  "PLAN_SCOPE_EXPANSION_REQUIRES_USER",
  "WORK_ITEM_MISSING",
  "WORK_ITEM_DEPENDENCY_INCOMPLETE",
  "WORK_ITEM_RESOURCE_CONFLICT",
  "WORK_ITEM_RESULT_TARGET_MISMATCH",
  "WORK_ITEM_OUTPUT_MISSING",
  "WORK_ITEM_VALIDATION_MISSING",
  "VALIDATION_IDENTITY_MISMATCH",
  "AUTHORITY_MISSING",
  "AUTHORITY_TASK_MISMATCH",
  "AUTHORITY_SCOPE_EXCEEDED",
  "AUTHORITY_PROVENANCE_ESCALATION",
  "MUTATION_ID_CONFLICT",
  "EFFECT_RECONCILIATION_REQUIRED",
  "FINAL_VALIDATION_MISSING",
  "TASK_COMPLETION_INELIGIBLE",
  "PROJECTION_CANNOT_AUTHORIZE",
  "CONTROLLER_TRANSFER_INVALID",
  "MIGRATION_RECEIPT_INVALID",
] as const;

export type KernelRejectionCode = (typeof KERNEL_REJECTION_CODES)[number];

export type ActorIdentity = Readonly<{
  id: string;
  kind: "USER" | "AGENT" | "SYSTEM";
  transport: "host" | "managed" | "pull" | "manual";
  capabilities: readonly string[];
}>;

export type AuthorityProvenance = Readonly<{
  kind: "USER" | "DELEGATED" | "SYSTEM";
  actor_id: string;
  evidence_digest: Sha256Digest;
  parent_authority_digest: Sha256Digest | null;
}>;

export type AuthorityRisk = Readonly<{
  requirements: "bounded" | "material";
  implementation: "bounded" | "material";
  reversibility: "reversible" | "recovery_required" | "irreversible";
}>;

export type ExecutionAuthority = Readonly<{
  digest: Sha256Digest;
  task_id: string;
  plan_revision: number;
  plan_digest: Sha256Digest;
  work_item_id: string | null;
  repository_identity: Sha256Digest;
  repository_fingerprint: Sha256Digest;
  scope_roots: readonly string[];
  repository_effects: readonly string[];
  external_effects: readonly string[];
  capabilities: readonly string[];
  resources: readonly string[];
  validation_requirements: readonly string[];
  policy_digests: readonly Sha256Digest[];
  completion_requirements: readonly string[];
  risk: AuthorityRisk;
  provenance: AuthorityProvenance;
  expires_at: string | null;
}>;

export type OutputManifest = Readonly<{
  id: string;
  kind: string;
  digest: Sha256Digest;
  task_id: string;
  plan_revision: number;
  work_item_id: string;
  attempt: number;
  repository_fingerprint: Sha256Digest;
}>;

export type ExecutionRequirements = Pick<
  ExecutionAuthority,
  "scope_roots" | "repository_effects" | "external_effects" | "capabilities" | "resources"
>;

export type ValidationIdentity = Readonly<{
  implementation_identity: Sha256Digest;
  check_id: string;
  command_digest: Sha256Digest;
  toolchain_digest: Sha256Digest;
  environment_digest: Sha256Digest;
}>;

export type ValidationRecord = Readonly<{
  status: "PASSED" | "FAILED" | "BLOCKED" | "STALE";
  identity: ValidationIdentity;
  evidence_digests: readonly Sha256Digest[];
  observed_at: string;
}>;

export type WorkItemDefinition = Readonly<{
  id: string;
  depends_on: readonly string[];
  required_inputs: readonly string[];
  expected_outputs: readonly string[];
  execution_requirements: ExecutionRequirements;
  optional: boolean;
}>;

export type WorkItemRuntime = Readonly<{
  definition: WorkItemDefinition;
  state: WorkItemState;
  revision: number;
  attempt: number;
  claim_id: string | null;
  result_digest: Sha256Digest | null;
  output_manifests: readonly OutputManifest[];
  validation: ValidationRecord | null;
}>;

export type PlanRecord = Readonly<{
  revision: number;
  digest: Sha256Digest;
  state: "PROPOSED" | "APPROVED" | "REJECTED" | "SUPERSEDED";
  approval_actor_id: string | null;
  approval_evidence_digest: Sha256Digest | null;
  work_items: readonly WorkItemDefinition[];
}>;

export type ExternalEffect = Readonly<{
  id: string;
  kind: string;
  execution_requirements: ExecutionRequirements;
  idempotency_key: string;
  state: EffectState;
  request_digest: Sha256Digest;
  provider_receipt_digest: Sha256Digest | null;
  observed_state_digest: Sha256Digest | null;
}>;

export type MutationReceipt = Readonly<{
  mutation_id: string;
  command_digest: Sha256Digest;
  before_revision: number;
  after_revision: number;
  aggregate_digest: Sha256Digest;
  event_digests: readonly Sha256Digest[];
  effect_ids: readonly string[];
}>;

export type ControllerTransferReceipt = Readonly<{
  from_controller: string;
  to_controller: string;
  state_digest: Sha256Digest;
  authority_digest: Sha256Digest;
}>;

export type MigrationReceipt = Readonly<{
  migration_version: string;
  source_digest: Sha256Digest;
  canonical_digest: Sha256Digest;
  projection_digest: Sha256Digest;
  backup_digest: Sha256Digest;
}>;

export type TaskAggregate = Readonly<{
  schema_version: 1;
  id: string;
  revision: number;
  state: TaskState;
  intent_digest: Sha256Digest;
  current_plan: PlanRecord | null;
  plan_history: readonly PlanRecord[];
  work_items: Readonly<Record<string, WorkItemRuntime>>;
  final_validation: ValidationRecord | null;
  effects: readonly ExternalEffect[];
  mutation_receipts: Readonly<Record<string, MutationReceipt>>;
  controller_transfer: ControllerTransferReceipt | null;
  migration_receipts: readonly MigrationReceipt[];
}>;

type CommandEnvelope<K extends string, P extends object = object> = Readonly<
  {
    kind: K;
    task_id: string;
    expected_task_revision: number;
    expected_state_fingerprint: Sha256Digest;
  } & P
>;

export type TaskCommand =
  | CommandEnvelope<"capture_intent", { intent_digest: Sha256Digest }>
  | CommandEnvelope<"transition_task", { action: "request_human" | "block" | "resume" | "cancel" }>
  | CommandEnvelope<"propose_plan", { plan: PlanRecord }>
  | CommandEnvelope<"reject_plan", { plan_revision: number; plan_digest: Sha256Digest }>
  | CommandEnvelope<
      "approve_plan",
      {
        plan_revision: number;
        plan_digest: Sha256Digest;
        approval_evidence_digest: Sha256Digest;
      }
    >
  | CommandEnvelope<"materialize_work_items", { plan_revision: number; plan_digest: Sha256Digest }>
  | CommandEnvelope<
      "transition_work_item",
      {
        work_item_id: string;
        action:
          | "claim"
          | "begin"
          | "inspect"
          | "validate"
          | "rework"
          | "block"
          | "resume"
          | "complete"
          | "cancel";
        claim_id: string | null;
      }
    >
  | CommandEnvelope<
      "accept_work_item_result",
      {
        plan_revision: number;
        plan_digest: Sha256Digest;
        work_item_id: string;
        result_digest: Sha256Digest;
        output_manifests: readonly OutputManifest[];
      }
    >
  | CommandEnvelope<
      "record_work_item_validation",
      { work_item_id: string; validation: ValidationRecord }
    >
  | CommandEnvelope<"record_final_validation", { validation: ValidationRecord }>
  | CommandEnvelope<"prepare_effect", { effect: ExternalEffect }>
  | CommandEnvelope<
      "observe_effect",
      {
        effect_id: string;
        observed_state: "APPLIED" | "NOT_APPLIED" | "IN_DOUBT";
        observation_digest: Sha256Digest;
      }
    >
  | CommandEnvelope<
      "reconcile_effect",
      {
        effect_id: string;
        resolution: "APPLIED" | "NOT_APPLIED";
        provider_receipt_digest: Sha256Digest;
      }
    >
  | CommandEnvelope<"supersede_effect", { effect_id: string; replacement_effect_id: string }>
  | CommandEnvelope<
      "amend_plan",
      {
        plan_revision: number;
        plan_digest: Sha256Digest;
        amendment_digest: Sha256Digest;
        amended_plan: Pick<PlanRecord, "revision" | "digest" | "work_items">;
        authority_delta_digest: Sha256Digest | null;
      }
    >
  | CommandEnvelope<
      "request_authority_delta",
      { parent_authority_digest: Sha256Digest; delta_digest: Sha256Digest }
    >
  | CommandEnvelope<"complete_task">
  | CommandEnvelope<"record_controller_transfer", { receipt: ControllerTransferReceipt }>
  | CommandEnvelope<"record_migration", { receipt: MigrationReceipt }>;

export type DomainEvent = Readonly<{
  id: string;
  kind:
    | "intent_captured"
    | "task_transitioned"
    | "plan_proposed"
    | "plan_rejected"
    | "plan_approved"
    | "work_items_materialized"
    | "work_item_transitioned"
    | "work_item_result_accepted"
    | "work_item_validation_recorded"
    | "final_validation_recorded"
    | "effect_prepared"
    | "effect_observed"
    | "effect_reconciled"
    | "effect_superseded"
    | "plan_amended"
    | "authority_delta_requested"
    | "task_completed"
    | "controller_transferred"
    | "migration_recorded";
  task_id: string;
  task_revision: number;
  mutation_id: string;
  occurred_at: string;
  command_digest: Sha256Digest;
  payload_digest: Sha256Digest;
}>;

export type KernelInput = Readonly<{
  aggregate: TaskAggregate;
  command: TaskCommand;
  actor: ActorIdentity;
  authority: ExecutionAuthority | null;
  repository_fingerprint: Sha256Digest | null;
  occurred_at: string;
  mutation_id: string;
}>;

export type KernelResult =
  | Readonly<{
      kind: "accepted";
      aggregate: TaskAggregate;
      events: readonly DomainEvent[];
      receipts: readonly MutationReceipt[];
    }>
  | Readonly<{
      kind: "rejected";
      code: KernelRejectionCode;
      facts: readonly string[];
      required_action: string | null;
    }>;
