import type {
  DomainEvent,
  ExecutionLease,
  Failure,
  OutputManifest,
  ReconciliationSnapshot,
  RetryBudget,
  SemanticWorkResult,
  Sha256Digest,
  TaskAggregate,
  TaskCheckpoint,
  TaskPlanRevision,
  TransitionReceipt,
  ValidationEvidence,
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
