/* eslint-disable @typescript-eslint/require-await */
import { describe, expect, it } from "vitest";

import {
  aggregateValidation,
  approveTaskPlan,
  createLegacyTaskAggregate,
  createRepositorySnapshot,
  createTaskPlanRevision,
  materializeApprovedWorkItems,
  TaskCentricOrchestrator,
  taskCentricDigest,
  type ArtifactPort,
  type ContextBundle,
  type ContextPort,
  type ContentActorPort,
  type DomainEvent,
  type ExecutionLease,
  type GitPort,
  type OutputManifest,
  type PendingEffect,
  type ReconciliationSnapshot,
  type RepositorySnapshot,
  type RetryBudget,
  type SemanticWorkResult,
  type SemanticWorkRequest,
  type TaskAggregate,
  type TaskCheckpoint,
  type TaskPlanProposal,
  type TaskRepositoryPort,
  type TransitionReceipt,
  type ValidationEvidence,
  type ValidationPort,
  type WorkItem,
  type WorkspacePort,
} from "./index.js";

const NOW = "2026-08-22T00:00:00.000Z";
const TASK_ID = "task-loop";

function repositorySnapshot(): RepositorySnapshot {
  return createRepositorySnapshot({
    git: { kind: "commit", sha: "a".repeat(40), ref: "refs/heads/main" },
    dirty_paths: [],
    policy_digest: null,
    config_digest: null,
    context_digest: null,
    task_history_cursor: null,
    captured_at: NOW,
  });
}

function workItem(id: string, depends_on: readonly string[] = []): WorkItem {
  const checkId = `check-${id}`;
  const criterion = {
    id: `criterion-${id}`,
    description: `Validate ${id}`,
    required: true,
    check_ids: [checkId],
  };
  return {
    id,
    objective: `Implement ${id}`,
    depends_on,
    required_inputs: depends_on.map((dependency) => `out-${dependency}`),
    expected_outputs: [`out-${id}`],
    scope_roots: ["packages"],
    acceptance_criteria: [criterion],
    validation: {
      schema_version: 1,
      criteria: [criterion],
      checks: [{ id: checkId, kind: "deterministic", required: true, capability: "test" }],
      evidence_fingerprint: taskCentricDigest(checkId),
    },
    context: {
      required_sources: ["repository"],
      optional_sources: [],
      symbol_hints: [],
      max_bytes: 8192,
    },
    risk: "medium",
    capabilities: ["test"],
    resource_claims: [{ kind: "path", resource: "packages", mode: "write" }],
    optional: false,
    priority: id === "a" ? 2 : 1,
  };
}

function task(): TaskAggregate {
  const rootCheck = {
    id: "check-root",
    kind: "deterministic" as const,
    required: true,
    capability: "test",
  };
  const rootCriterion = {
    id: "criterion-root",
    description: "Validate root",
    required: true,
    check_ids: [rootCheck.id],
  };
  const proposal: TaskPlanProposal = {
    schema_version: 1,
    task_id: TASK_ID,
    planning_baseline: repositorySnapshot(),
    work_items: { schema_version: 1, work_items: [workItem("a"), workItem("b", ["a"])] },
    assumptions: [],
    unresolved_questions: [],
    top_level_validation: {
      schema_version: 1,
      criteria: [rootCriterion],
      checks: [rootCheck],
      evidence_fingerprint: taskCentricDigest("root"),
    },
  };
  const draft = createTaskPlanRevision({ proposal, revision: 1, created_at: NOW });
  const plan = approveTaskPlan({
    plan: draft,
    expected_digest: draft.digest,
    actor: "user",
    approved_at: NOW,
  });
  return materializeApprovedWorkItems({
    task: createLegacyTaskAggregate({
      id: TASK_ID,
      revision: 1,
      title: "Loop",
      description: "One task with two internal work items",
      status: "TODO",
      acceptance_criteria: ["complete"],
      captured_at: NOW,
      updated_at: NOW,
    }),
    plan,
    now: NOW,
  });
}

function receipt(opts: {
  previous: number;
  next: TaskAggregate;
  mutation_id: string;
  event: DomainEvent;
}): TransitionReceipt {
  return {
    schema_version: 1,
    task_id: TASK_ID,
    previous_revision: opts.previous,
    next_revision: opts.next.revision,
    mutation_id: opts.mutation_id,
    event: opts.event,
    aggregate_digest: taskCentricDigest(opts.next),
  };
}

class MemoryRepository implements TaskRepositoryPort {
  readonly capabilities = {
    compare_and_swap: true,
    atomic_transition_event: true,
    atomic_plan_materialization: true,
    idempotency_keys: true,
    serialized: false,
  } as const;
  aggregate = task();
  leases: ExecutionLease[] = [];
  pendingEffects: PendingEffect[] = [];
  checkpoints: TaskCheckpoint[] = [];
  retryBudgets: RetryBudget[] = [];
  receipts = new Map<string, TransitionReceipt>();
  crashAfterNextResult = false;
  private crashOnReconcile = false;

  async readTask(taskId: string) {
    return taskId === TASK_ID ? this.aggregate : null;
  }

  private persist(next: TaskAggregate, mutation_id: string, event: DomainEvent): TransitionReceipt {
    const prior = this.receipts.get(mutation_id);
    if (prior) return prior;
    const previous = this.aggregate.revision;
    this.aggregate = Object.freeze({ ...next, revision: previous + 1 });
    const result = receipt({ previous, next: this.aggregate, mutation_id, event });
    this.receipts.set(mutation_id, result);
    return result;
  }

  async compareAndSwap(opts: {
    task_id: string;
    expected_revision: number;
    next: TaskAggregate;
    mutation_id: string;
    event: DomainEvent;
  }) {
    const prior = this.receipts.get(opts.mutation_id);
    if (prior) return prior;
    if (opts.expected_revision !== this.aggregate.revision) throw new Error("stale revision");
    return this.persist(opts.next, opts.mutation_id, opts.event);
  }

  async appendTransition(opts: { task_id: string; expected_revision: number; event: DomainEvent }) {
    if (opts.expected_revision !== this.aggregate.revision) throw new Error("stale revision");
    const next =
      opts.event.entity === "task"
        ? { ...this.aggregate, lifecycle: opts.event.to as TaskAggregate["lifecycle"] }
        : this.aggregate;
    return this.persist(next, opts.event.mutation_id, opts.event);
  }

  async writePlanRevision(): Promise<TransitionReceipt> {
    throw new Error("not used");
  }

  async materializeWorkItems(): Promise<TransitionReceipt> {
    throw new Error("not used");
  }

  async claimWorkItem(opts: {
    task_id: string;
    expected_revision: number;
    work_item_id: string;
    lease: ExecutionLease;
    idempotency_key: string;
  }) {
    const prior = this.receipts.get(opts.idempotency_key);
    if (prior) return prior;
    if (opts.expected_revision !== this.aggregate.revision) throw new Error("stale revision");
    const runtime = this.aggregate.work_items[opts.work_item_id]!;
    const event: DomainEvent = {
      schema_version: 1,
      id: `claim-${opts.work_item_id}`,
      mutation_id: opts.idempotency_key,
      task_id: TASK_ID,
      task_revision: this.aggregate.revision,
      plan_revision: 1,
      plan_digest: this.aggregate.current_plan!.digest,
      work_item_id: opts.work_item_id,
      entity: "work_item",
      from: runtime.state,
      to: "CLAIMED",
      cause_refs: [],
      actor_id: opts.lease.actor.id,
      repository_fingerprint: repositorySnapshot().digest,
      at: NOW,
    };
    this.leases.push(opts.lease);
    return this.persist(
      {
        ...this.aggregate,
        work_items: {
          ...this.aggregate.work_items,
          [runtime.id]: {
            ...runtime,
            state: "CLAIMED",
            attempt: runtime.attempt + 1,
            claim_id: opts.lease.id,
          },
        },
      },
      opts.idempotency_key,
      event,
    );
  }

  async recordWorkItemResult(opts: {
    task_id: string;
    expected_revision: number;
    work_item_id: string;
    semantic_result: SemanticWorkResult;
    outputs: readonly OutputManifest[];
    validation: readonly ValidationEvidence[];
    idempotency_key: string;
  }) {
    const prior = this.receipts.get(opts.idempotency_key);
    if (prior) return prior;
    if (opts.expected_revision !== this.aggregate.revision) throw new Error("stale revision");
    const definition = this.aggregate.current_plan!.proposal.work_items.work_items.find(
      (entry) => entry.id === opts.work_item_id,
    )!;
    const runtime = this.aggregate.work_items[opts.work_item_id]!;
    const validation = aggregateValidation(definition.validation, opts.validation);
    const nextState = validation.status === "passed" ? "COMPLETED" : "REWORK_READY";
    const event: DomainEvent = {
      schema_version: 1,
      id: `result-${opts.work_item_id}-${runtime.attempt}`,
      mutation_id: opts.idempotency_key,
      task_id: TASK_ID,
      task_revision: this.aggregate.revision,
      plan_revision: 1,
      plan_digest: this.aggregate.current_plan!.digest,
      work_item_id: opts.work_item_id,
      entity: "work_item",
      from: runtime.state,
      to: nextState,
      cause_refs: validation.unsatisfied_criteria,
      actor_id: "same-actor",
      repository_fingerprint: repositorySnapshot().digest,
      at: NOW,
    };
    this.leases = this.leases.filter((lease) => lease.id !== runtime.claim_id);
    const result = this.persist(
      {
        ...this.aggregate,
        work_items: {
          ...this.aggregate.work_items,
          [runtime.id]: {
            ...runtime,
            state: nextState,
            claim_id: null,
            output_manifests: opts.outputs,
            validation_result: validation,
          },
        },
      },
      opts.idempotency_key,
      event,
    );
    if (this.crashAfterNextResult) {
      this.crashAfterNextResult = false;
      this.crashOnReconcile = true;
    }
    return result;
  }

  async writeCheckpoint(checkpoint: TaskCheckpoint) {
    if (!this.checkpoints.some((item) => item.task_revision === checkpoint.task_revision))
      this.checkpoints.push(checkpoint);
  }

  async readRetryBudget(opts: {
    task_id: string;
    work_item_id: string | null;
    operation: string;
    failure_kind: RetryBudget["failure_kind"];
  }) {
    return (
      this.retryBudgets.find(
        (budget) =>
          budget.work_item_id === opts.work_item_id &&
          budget.operation === opts.operation &&
          budget.failure_kind === opts.failure_kind,
      ) ?? null
    );
  }

  async writeRetryBudget(budget: RetryBudget) {
    this.retryBudgets = [
      ...this.retryBudgets.filter(
        (item) =>
          !(
            item.work_item_id === budget.work_item_id &&
            item.operation === budget.operation &&
            item.failure_kind === budget.failure_kind
          ),
      ),
      budget,
    ];
  }

  async reconcile(): Promise<ReconciliationSnapshot> {
    if (this.crashOnReconcile) {
      this.crashOnReconcile = false;
      throw new Error("simulated process crash after durable result");
    }
    return {
      schema_version: 1,
      task: this.aggregate,
      repository: repositorySnapshot(),
      active_leases: this.leases,
      exchanges: [],
      pending_effects: this.pendingEffects,
      artifact_refs: Object.values(this.aggregate.work_items).flatMap((item) =>
        item.output_manifests.map((output) => output.id),
      ),
      provider_state: {},
      external_drift: [],
    };
  }
}

function contextPort(): ContextPort {
  const build = (opts: Parameters<ContextPort["buildWorkItemContext"]>[0]): ContextBundle => {
    const value = {
      schema_version: 1 as const,
      task_id: opts.task.id,
      plan_revision: opts.task.current_plan!.revision,
      plan_digest: opts.task.current_plan!.digest,
      work_item_id: opts.work_item.id,
      repository_snapshot: opts.repository,
      upstream_outputs: opts.upstream_outputs,
      retrievals: [
        { status: "available" as const, ref: "repository", digest: opts.repository.digest },
      ],
      authority: opts.authority,
    };
    return { ...value, digest: taskCentricDigest(value) };
  };
  return {
    async buildPlanningContext() {
      throw new Error("not used");
    },
    async buildWorkItemContext(opts) {
      return build(opts);
    },
  };
}

function ports(repository: MemoryRepository) {
  const actorKinds: string[] = [];
  const actor: ContentActorPort = {
    identity: { id: "same-actor", transport: "pull" as const, capabilities: ["test"] },
    async perform(request: SemanticWorkRequest): Promise<SemanticWorkResult> {
      actorKinds.push(request.kind);
      return {
        schema_version: 1,
        kind: request.kind,
        task_id: request.task_id,
        plan_revision: request.plan_revision,
        plan_digest: request.plan_digest,
        work_item_id: request.work_item!.id,
        context_digest: request.context.digest,
        status: "completed",
        summary: "done",
        claims: [],
        questions: [],
        artifacts: [`out-${request.work_item!.id}`],
      };
    },
  };
  let aChecks = 0;
  const validation: ValidationPort = {
    supports: () => true,
    async execute({ check, repository_snapshot_digest }) {
      if (check.id === "check-a") aChecks += 1;
      const failed = check.id === "check-a" && aChecks === 1;
      return {
        check_id: check.id,
        status: failed ? "failed" : "passed",
        observed_at: NOW,
        repository_snapshot_digest,
        command_identity: check.id,
        exit_code: failed ? 1 : 0,
        artifact_refs: [],
        detail: failed ? "repair required" : "passed",
      };
    },
  };
  const git: GitPort = {
    async observe() {
      return {
        snapshot: repositorySnapshot(),
        changed_paths: ["packages/change.ts"],
        diff_digest: taskCentricDigest("diff"),
      };
    },
    async commit() {
      throw new Error("not used");
    },
    async integrate() {
      throw new Error("not used");
    },
  };
  const workspace: WorkspacePort = {
    async prepare({ task_id, work_item, repository: observed }) {
      return {
        workspace: `/workspace/${work_item.id}`,
        task_id,
        work_item_id: work_item.id,
        repository_snapshot_digest: observed.digest,
        changed_paths: [],
      };
    },
    async inspect() {
      throw new Error("not used");
    },
    async cleanup() {
      throw new Error("not used");
    },
  };
  const artifacts: ArtifactPort = {
    async put(opts) {
      const id = new TextDecoder().decode(opts.bytes);
      return {
        schema_version: 1,
        id,
        kind: opts.kind,
        schema: opts.schema,
        digest: taskCentricDigest(id),
        producer: opts.producer,
        repository_snapshot_digest: opts.repository_snapshot_digest,
        provenance: opts.provenance,
      };
    },
    async get() {
      return null;
    },
    async exists() {
      return true;
    },
  };
  return {
    actorKinds,
    values: { repository, actor, validation, git, workspace, artifacts, context: contextPort() },
  };
}

describe("TaskCentricOrchestrator", () => {
  it("resumes after a durable-result crash, repairs, and completes one Task with the same actor", async () => {
    const repository = new MemoryRepository();
    const setup = ports(repository);
    repository.crashAfterNextResult = true;
    const orchestrator = new TaskCentricOrchestrator(setup.values);

    await expect(orchestrator.run(TASK_ID)).rejects.toThrow(/simulated process crash/u);
    expect(repository.aggregate.work_items.a?.state).toBe("REWORK_READY");
    expect(setup.actorKinds).toEqual(["execute"]);

    await expect(orchestrator.run(TASK_ID)).resolves.toMatchObject({
      status: "completed",
      task_id: TASK_ID,
    });
    expect(setup.actorKinds).toEqual(["execute", "repair", "execute"]);
    expect(repository.aggregate.lifecycle).toBe("COMPLETED");
    expect(repository.aggregate.work_items.a?.attempt).toBe(2);
    expect(repository.aggregate.work_items.b?.attempt).toBe(1);
    expect(repository.checkpoints.length).toBeGreaterThan(2);
  });

  it("stops before actor work when an external effect is in doubt", async () => {
    const repository = new MemoryRepository();
    repository.pendingEffects = [
      { operation_id: "publish", state: "effect_in_doubt", idempotent: false, receipt_ref: null },
    ];
    const setup = ports(repository);
    await expect(new TaskCentricOrchestrator(setup.values).run(TASK_ID)).resolves.toMatchObject({
      status: "effect_in_doubt",
      reason_code: "effect_reconciliation_required",
    });
    expect(setup.actorKinds).toEqual([]);
  });
});
