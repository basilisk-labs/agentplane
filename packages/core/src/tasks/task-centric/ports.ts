import type {
  ActorIdentity,
  ContextBundle,
  ContextSpec,
  DomainEvent,
  ExecutionAuthority,
  ExecutionLease,
  Failure,
  OutputManifest,
  PendingEffect,
  ReconciliationSnapshot,
  RepositorySnapshot,
  RetryBudget,
  SemanticWorkRequest,
  SemanticWorkResult,
  Sha256Digest,
  TaskAggregate,
  TaskCheckpoint,
  TaskPlanRevision,
  TransitionReceipt,
  ValidationCheck,
  ValidationEvidence,
  WorkItem,
} from "./model.js";

export type TaskRepositoryCapabilities = Readonly<{
  compare_and_swap: boolean;
  atomic_transition_event: boolean;
  atomic_plan_materialization: boolean;
  idempotency_keys: boolean;
  serialized: boolean;
}>;

export type TaskRepositoryPort = {
  readonly capabilities: TaskRepositoryCapabilities;
  readTask(task_id: string): Promise<TaskAggregate | null>;
  compareAndSwap(opts: {
    task_id: string;
    expected_revision: number;
    next: TaskAggregate;
    mutation_id: string;
    event: DomainEvent;
  }): Promise<TransitionReceipt>;
  appendTransition(opts: {
    task_id: string;
    expected_revision: number;
    event: DomainEvent;
  }): Promise<TransitionReceipt>;
  writePlanRevision(opts: {
    task_id: string;
    expected_revision: number;
    plan: TaskPlanRevision;
    idempotency_key: string;
  }): Promise<TransitionReceipt>;
  materializeWorkItems(opts: {
    task_id: string;
    expected_revision: number;
    plan_revision: number;
    plan_digest: Sha256Digest;
    idempotency_key: string;
  }): Promise<TransitionReceipt>;
  claimWorkItem(opts: {
    task_id: string;
    expected_revision: number;
    work_item_id: string;
    lease: ExecutionLease;
    idempotency_key: string;
  }): Promise<TransitionReceipt>;
  recordWorkItemResult(opts: {
    task_id: string;
    expected_revision: number;
    work_item_id: string;
    semantic_result: SemanticWorkResult;
    outputs: readonly OutputManifest[];
    validation: readonly ValidationEvidence[];
    idempotency_key: string;
  }): Promise<TransitionReceipt>;
  writeCheckpoint(checkpoint: TaskCheckpoint): Promise<void>;
  readRetryBudget(opts: {
    task_id: string;
    work_item_id: string | null;
    operation: string;
    failure_kind: Failure["kind"];
  }): Promise<RetryBudget | null>;
  writeRetryBudget(budget: RetryBudget): Promise<void>;
  reconcile(task_id: string): Promise<ReconciliationSnapshot>;
};

export type GitObservation = Readonly<{
  snapshot: RepositorySnapshot;
  changed_paths: readonly string[];
  diff_digest: Sha256Digest;
}>;

export type GitEffectResult = Readonly<{
  operation_id: string;
  state: "applied" | "effect_in_doubt";
  commit_sha: string | null;
  receipt_ref: string | null;
}>;

export type GitPort = {
  observe(workspace: string): Promise<GitObservation>;
  commit(opts: {
    workspace: string;
    message: string;
    authority: ExecutionAuthority;
    operation_id: string;
  }): Promise<GitEffectResult>;
  integrate(opts: {
    workspace: string;
    reviewed_head: string;
    operation_id: string;
  }): Promise<GitEffectResult>;
};

export type WorkspaceObservation = Readonly<{
  workspace: string;
  task_id: string;
  work_item_id: string;
  repository_snapshot_digest: Sha256Digest;
  changed_paths: readonly string[];
}>;

export type WorkspacePort = {
  prepare(opts: {
    task_id: string;
    plan_revision: number;
    work_item: WorkItem;
    repository: RepositorySnapshot;
    lease: ExecutionLease;
  }): Promise<WorkspaceObservation>;
  inspect(workspace: string): Promise<WorkspaceObservation>;
  cleanup(opts: { workspace: string; operation_id: string }): Promise<PendingEffect>;
};

export type ContentActorPort = {
  readonly identity: ActorIdentity;
  perform(request: SemanticWorkRequest): Promise<SemanticWorkResult>;
  issue?(request: SemanticWorkRequest): Promise<{ exchange_ref: string }>;
  accept?(exchange_ref: string): Promise<SemanticWorkResult>;
  cancel?(exchange_ref: string): Promise<void>;
  observe?(exchange_ref: string): Promise<"pending" | "completed" | "failed" | "unknown">;
};

export type ValidationPort = {
  supports(capability: string): boolean;
  execute(opts: {
    check: ValidationCheck;
    workspace: string;
    repository_snapshot_digest: Sha256Digest;
  }): Promise<ValidationEvidence>;
};

export type ProviderObservation = Readonly<{
  provider: string;
  state: Readonly<Record<string, string>>;
  digest: Sha256Digest;
}>;

export type ProviderEffectResult = Readonly<{
  operation_id: string;
  state: "applied" | "waiting" | "effect_in_doubt";
  receipt_ref: string | null;
}>;

export type ProviderPort = {
  observe(task_id: string): Promise<ProviderObservation>;
  apply(opts: {
    operation_id: string;
    action: string;
    idempotency_key: string;
    expected_state_digest: Sha256Digest;
  }): Promise<ProviderEffectResult>;
  reconcile(operation_id: string): Promise<ProviderEffectResult>;
};

export type ArtifactPort = {
  put(opts: {
    kind: string;
    schema: string;
    bytes: Uint8Array;
    producer: OutputManifest["producer"];
    repository_snapshot_digest: Sha256Digest;
    provenance: readonly string[];
  }): Promise<OutputManifest>;
  get(manifest: OutputManifest): Promise<Uint8Array | null>;
  exists(manifest: OutputManifest): Promise<boolean>;
};

export type ContextPort = {
  buildPlanningContext(opts: {
    task: TaskAggregate;
    repository: RepositorySnapshot;
  }): Promise<ContextBundle>;
  buildWorkItemContext(opts: {
    task: TaskAggregate;
    work_item: WorkItem;
    repository: RepositorySnapshot;
    spec: ContextSpec;
    authority: ExecutionAuthority;
    upstream_outputs: readonly OutputManifest[];
  }): Promise<ContextBundle>;
};

export function assertAutonomousRepositoryCapabilities(
  capabilities: TaskRepositoryCapabilities,
): void {
  if (
    !(capabilities.compare_and_swap || capabilities.serialized) ||
    !capabilities.atomic_transition_event ||
    !capabilities.atomic_plan_materialization ||
    !capabilities.idempotency_keys
  ) {
    throw new Error(
      "Autonomous task execution requires CAS or serialized persistence, atomic transitions and plan materialization, and idempotency keys.",
    );
  }
}
