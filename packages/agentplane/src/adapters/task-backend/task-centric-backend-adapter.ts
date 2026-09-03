import {
  aggregateValidation,
  applyPlanRefinement,
  materializeApprovedWorkItems,
  projectTaskLifecycleToLegacyStatus,
  TASK_CENTRIC_REPLAN_REQUIRED_EXTENSION_KEY,
  withTaskCentricAggregate,
  type DomainEvent,
  type ExecutionLease,
  type PlanRefinement,
  type OutputManifest,
  type ReconciliationSnapshot,
  type RepositorySnapshot,
  type RetryBudget,
  type SemanticWorkResult,
  type TaskAggregate,
  type TaskCheckpoint,
  type TaskPlanRevision,
  type TaskRepositoryPort,
  type TransitionReceipt,
  type ValidationEvidence,
} from "@agentplaneorg/core/tasks";

import type { TaskBackend } from "../../backends/task-backend.js";
import { projectTaskCentricCompletion } from "./task-centric-backend-projection.js";
import {
  aggregateFrom,
  applyEvent,
  runtimeFrom,
  syntheticEvent,
  TASK_CENTRIC_RUNTIME_EXTENSION_KEY,
  transitionReceipt,
  type TaskCentricRuntimeProjection,
} from "./task-centric-backend-runtime.js";

export class TaskCentricBackendAdapter implements TaskRepositoryPort {
  readonly capabilities = Object.freeze({
    compare_and_swap: true,
    atomic_transition_event: true,
    atomic_plan_materialization: true,
    idempotency_keys: true,
    serialized: false,
  });

  readonly backend: TaskBackend;
  readonly observeRepository: () => Promise<RepositorySnapshot>;

  constructor(opts: {
    backend: TaskBackend;
    observeRepository: () => Promise<RepositorySnapshot>;
  }) {
    this.backend = opts.backend;
    this.observeRepository = opts.observeRepository;
  }

  async readTask(taskId: string): Promise<TaskAggregate | null> {
    const task = await this.backend.getTask(taskId);
    return task ? aggregateFrom(task) : null;
  }

  private async persist(opts: {
    task_id: string;
    expected_revision: number;
    next: TaskAggregate;
    event: DomainEvent;
    mutation_id: string;
    runtime?: TaskCentricRuntimeProjection;
    replan_required_reason_code?: string | null;
  }): Promise<TransitionReceipt> {
    const current = await this.backend.getTask(opts.task_id);
    if (!current) throw new Error(`Task not found: ${opts.task_id}`);
    const currentRevision = current.revision ?? 1;
    const runtime = opts.runtime ?? runtimeFrom(current);
    const already = runtime.mutation_receipts[opts.mutation_id];
    if (already) return already;
    if (currentRevision !== opts.expected_revision) {
      throw new Error(
        `Task revision changed concurrently: expected ${opts.expected_revision}, observed ${currentRevision}.`,
      );
    }
    const normalizedNext = Object.freeze({ ...opts.next, revision: currentRevision + 1 });
    const nextReceipt = transitionReceipt({
      task_id: opts.task_id,
      previous_revision: currentRevision,
      next: normalizedNext,
      mutation_id: opts.mutation_id,
      event: opts.event,
    });
    const nextRuntime: TaskCentricRuntimeProjection = Object.freeze({
      ...runtime,
      mutation_receipts: Object.freeze({
        ...runtime.mutation_receipts,
        [opts.mutation_id]: nextReceipt,
      }),
    });
    const hasIncompleteRequiredWork =
      normalizedNext.lifecycle === "ACTIVE" &&
      normalizedNext.current_plan?.proposal.work_items.work_items.some(
        (item) => !item.optional && normalizedNext.work_items[item.id]?.state !== "COMPLETED",
      ) === true;
    const extensions = withTaskCentricAggregate(current.extensions, normalizedNext);
    if (opts.replan_required_reason_code) {
      extensions[TASK_CENTRIC_REPLAN_REQUIRED_EXTENSION_KEY] = {
        schema_version: 1,
        reason_code: opts.replan_required_reason_code,
      };
    }
    await this.backend.writeTask(
      {
        ...current,
        revision: currentRevision + 1,
        status: projectTaskLifecycleToLegacyStatus(normalizedNext.lifecycle),
        ...(hasIncompleteRequiredWork
          ? {
              commit: null,
              verification: {
                state: "pending" as const,
                attempts: 0,
                updated_at: null,
                updated_by: null,
                note: null,
              },
              quality_review: undefined,
            }
          : {}),
        extensions: {
          ...extensions,
          [TASK_CENTRIC_RUNTIME_EXTENSION_KEY]: nextRuntime,
        },
      },
      { expectedRevision: currentRevision },
    );
    return nextReceipt;
  }

  async compareAndSwap(opts: {
    task_id: string;
    expected_revision: number;
    next: TaskAggregate;
    mutation_id: string;
    event: DomainEvent;
  }): Promise<TransitionReceipt> {
    return await this.persist(opts);
  }

  async appendTransition(opts: {
    task_id: string;
    expected_revision: number;
    event: DomainEvent;
  }): Promise<TransitionReceipt> {
    const current = await this.readTask(opts.task_id);
    if (!current) throw new Error(`Task not found: ${opts.task_id}`);
    return await this.persist({
      ...opts,
      next: applyEvent(current, opts.event),
      mutation_id: opts.event.mutation_id,
    });
  }

  async writePlanRevision(opts: {
    task_id: string;
    expected_revision: number;
    plan: TaskPlanRevision;
    idempotency_key: string;
  }): Promise<TransitionReceipt> {
    const task = await this.readTask(opts.task_id);
    if (!task) throw new Error(`Task not found: ${opts.task_id}`);
    const event = syntheticEvent({
      task,
      mutation_id: opts.idempotency_key,
      entity: "plan",
      from: task.current_plan?.digest ?? null,
      to: opts.plan.digest,
    });
    return await this.persist({
      task_id: task.id,
      expected_revision: opts.expected_revision,
      mutation_id: opts.idempotency_key,
      event,
      next: {
        ...task,
        lifecycle: "AWAITING_PLAN_APPROVAL",
        current_plan: opts.plan,
        work_items: Object.freeze({}),
        final_validation: null,
        updated_at: event.at,
      },
    });
  }

  async materializeWorkItems(opts: {
    task_id: string;
    expected_revision: number;
    plan_revision: number;
    plan_digest: `sha256:${string}`;
    idempotency_key: string;
  }): Promise<TransitionReceipt> {
    const task = await this.readTask(opts.task_id);
    if (!task?.current_plan) throw new Error("Task plan is missing.");
    if (
      task.current_plan.revision !== opts.plan_revision ||
      task.current_plan.digest !== opts.plan_digest
    ) {
      throw new Error("Task plan materialization request is stale.");
    }
    const event = syntheticEvent({
      task,
      mutation_id: opts.idempotency_key,
      entity: "task",
      from: task.lifecycle,
      to: "ACTIVE",
    });
    return await this.persist({
      task_id: task.id,
      expected_revision: opts.expected_revision,
      mutation_id: opts.idempotency_key,
      event,
      next: materializeApprovedWorkItems({ task, plan: task.current_plan, now: event.at }),
    });
  }

  async recordPlanRefinement(opts: {
    task_id: string;
    expected_revision?: number;
    refinement: PlanRefinement;
    actor_id: string;
    at: string;
    idempotency_key: string;
  }): Promise<
    Readonly<{
      action: "amended" | "replan_required";
      receipt: TransitionReceipt;
    }>
  > {
    const raw = await this.backend.getTask(opts.task_id);
    if (!raw) throw new Error(`Task not found: ${opts.task_id}`);
    const task = aggregateFrom(raw);
    const expectedRevision = opts.expected_revision ?? raw.revision ?? task.revision;
    if ((raw.revision ?? task.revision) !== expectedRevision) {
      throw new Error(
        `Plan refinement task revision changed: expected ${expectedRevision}, observed ${raw.revision ?? task.revision}.`,
      );
    }
    const applied = applyPlanRefinement({
      task,
      refinement: opts.refinement,
      actor_id: opts.actor_id,
      at: opts.at,
    });
    const next: TaskAggregate =
      applied.action === "replan_required"
        ? Object.freeze({
            ...task,
            lifecycle: "PLANNING",
            final_validation: null,
            updated_at: opts.at,
          })
        : applied.task;
    const event = syntheticEvent({
      task,
      mutation_id: opts.idempotency_key,
      entity: applied.action === "replan_required" ? "task" : "plan",
      from:
        applied.action === "replan_required" ? task.lifecycle : (task.current_plan?.digest ?? null),
      to:
        applied.action === "replan_required"
          ? "PLANNING"
          : (applied.amendment?.digest ?? task.current_plan?.digest ?? "amended"),
      at: opts.at,
      actor_id: opts.actor_id,
      cause_refs: applied.classification.reason_codes,
    });
    const persisted = await this.persist({
      task_id: task.id,
      expected_revision: expectedRevision,
      mutation_id: opts.idempotency_key,
      event,
      next,
      replan_required_reason_code:
        applied.action === "replan_required"
          ? applied.classification.reason_codes.join("+") || "material_plan_refinement"
          : null,
    });
    return Object.freeze({ action: applied.action, receipt: persisted });
  }

  async claimWorkItem(opts: {
    task_id: string;
    expected_revision: number;
    work_item_id: string;
    lease: ExecutionLease;
    idempotency_key: string;
  }): Promise<TransitionReceipt> {
    const raw = await this.backend.getTask(opts.task_id);
    if (!raw) throw new Error(`Task not found: ${opts.task_id}`);
    const task = aggregateFrom(raw);
    const current = task.work_items[opts.work_item_id];
    if (!current || !["READY", "REWORK_READY"].includes(current.state)) {
      throw new Error(`Work item ${opts.work_item_id} is not claimable.`);
    }
    const runtime = runtimeFrom(raw);
    if (runtime.leases.some((lease) => lease.authority.work_item_id === opts.work_item_id)) {
      throw new Error(`Work item ${opts.work_item_id} is already claimed.`);
    }
    const event = syntheticEvent({
      task,
      mutation_id: opts.idempotency_key,
      entity: "work_item",
      work_item_id: opts.work_item_id,
      from: current.state,
      to: "CLAIMED",
      at: opts.lease.issued_at,
    });
    return await this.persist({
      task_id: task.id,
      expected_revision: opts.expected_revision,
      mutation_id: opts.idempotency_key,
      event,
      runtime: Object.freeze({ ...runtime, leases: [...runtime.leases, opts.lease] }),
      next: {
        ...task,
        work_items: Object.freeze({
          ...task.work_items,
          [current.id]: Object.freeze({
            ...current,
            state: "CLAIMED",
            revision: current.revision + 1,
            attempt: current.attempt + 1,
            claim_id: opts.lease.id,
          }),
        }),
        updated_at: event.at,
      },
    });
  }

  async recordWorkItemResult(opts: {
    task_id: string;
    expected_revision: number;
    work_item_id: string;
    semantic_result: SemanticWorkResult;
    outputs: readonly OutputManifest[];
    validation: readonly ValidationEvidence[];
    idempotency_key: string;
  }): Promise<TransitionReceipt> {
    const raw = await this.backend.getTask(opts.task_id);
    if (!raw) throw new Error(`Task not found: ${opts.task_id}`);
    const task = aggregateFrom(raw);
    const item = task.current_plan?.proposal.work_items.work_items.find(
      (candidate) => candidate.id === opts.work_item_id,
    );
    const current = task.work_items[opts.work_item_id];
    if (!item || !current) throw new Error(`Work item ${opts.work_item_id} is missing.`);
    const validation = aggregateValidation(item.validation, opts.validation);
    const nextState = validation.status === "passed" ? "COMPLETED" : "REWORK_READY";
    const event = syntheticEvent({
      task,
      mutation_id: opts.idempotency_key,
      entity: "work_item",
      work_item_id: item.id,
      from: current.state,
      to: nextState,
    });
    const runtime = runtimeFrom(raw);
    return await this.persist({
      task_id: task.id,
      expected_revision: opts.expected_revision,
      mutation_id: opts.idempotency_key,
      event,
      runtime: Object.freeze({
        ...runtime,
        leases: runtime.leases.filter((lease) => lease.id !== current.claim_id),
      }),
      next: {
        ...task,
        work_items: Object.freeze({
          ...task.work_items,
          [current.id]: Object.freeze({
            ...current,
            state: nextState,
            revision: current.revision + 1,
            attempt: current.state === "CLAIMED" ? current.attempt : current.attempt + 1,
            claim_id: null,
            output_manifests: opts.outputs,
            validation_result: validation,
            last_failure:
              validation.status === "passed"
                ? null
                : {
                    kind: "validation" as const,
                    code: "validation_failed",
                    message: opts.semantic_result.summary,
                    retryable: true,
                    cause_refs: validation.unsatisfied_criteria,
                  },
          }),
        }),
        updated_at: event.at,
      },
    });
  }

  async completeTaskFromLegacyVerification(opts: {
    task_id: string;
    repository: RepositorySnapshot;
    actor_id: string;
    evidence_refs: readonly string[];
    idempotency_key: string;
  }): Promise<TransitionReceipt | null> {
    const raw = await this.backend.getTask(opts.task_id);
    if (!raw) throw new Error(`Task not found: ${opts.task_id}`);
    const projected = projectTaskCentricCompletion({ ...opts, current: raw, next: raw });
    if (!projected) return null;
    if (projected.task === raw) return projected.receipt;
    await this.backend.writeTask(projected.task, { expectedRevision: raw.revision ?? 1 });
    return projected.receipt;
  }

  async writeCheckpoint(checkpoint: TaskCheckpoint): Promise<void> {
    const task = await this.backend.getTask(checkpoint.task_id);
    if (!task) throw new Error(`Task not found: ${checkpoint.task_id}`);
    const runtime = runtimeFrom(task);
    if (
      runtime.checkpoints.some(
        (existing) =>
          existing.task_revision === checkpoint.task_revision &&
          existing.event_cursor === checkpoint.event_cursor,
      )
    ) {
      return;
    }
    await this.backend.writeTask(
      {
        ...task,
        extensions: {
          ...(task.extensions ?? {}),
          [TASK_CENTRIC_RUNTIME_EXTENSION_KEY]: {
            ...runtime,
            checkpoints: [...runtime.checkpoints.slice(-31), checkpoint],
          },
        },
      },
      { expectedRevision: task.revision ?? 1 },
    );
  }

  async readRetryBudget(opts: {
    task_id: string;
    work_item_id: string | null;
    operation: string;
    failure_kind: RetryBudget["failure_kind"];
  }): Promise<RetryBudget | null> {
    const task = await this.backend.getTask(opts.task_id);
    if (!task) return null;
    return (
      runtimeFrom(task).retry_budgets.find(
        (budget) =>
          budget.work_item_id === opts.work_item_id &&
          budget.operation === opts.operation &&
          budget.failure_kind === opts.failure_kind,
      ) ?? null
    );
  }

  async writeRetryBudget(budget: RetryBudget): Promise<void> {
    const task = await this.backend.getTask(budget.task_id);
    if (!task) throw new Error(`Task not found: ${budget.task_id}`);
    const runtime = runtimeFrom(task);
    const others = runtime.retry_budgets.filter(
      (existing) =>
        !(
          existing.work_item_id === budget.work_item_id &&
          existing.operation === budget.operation &&
          existing.failure_kind === budget.failure_kind
        ),
    );
    await this.backend.writeTask(
      {
        ...task,
        extensions: {
          ...(task.extensions ?? {}),
          [TASK_CENTRIC_RUNTIME_EXTENSION_KEY]: {
            ...runtime,
            retry_budgets: [...others, budget],
          },
        },
      },
      { expectedRevision: task.revision ?? 1 },
    );
  }

  async reconcile(taskId: string): Promise<ReconciliationSnapshot> {
    const task = await this.backend.getTask(taskId);
    if (!task) throw new Error(`Task not found: ${taskId}`);
    const aggregate = aggregateFrom(task);
    const runtime = runtimeFrom(task);
    const repository = await this.observeRepository();
    return Object.freeze({
      schema_version: 1,
      task: aggregate,
      repository,
      active_leases: runtime.leases,
      exchanges: [],
      pending_effects: runtime.pending_effects,
      artifact_refs: Object.values(aggregate.work_items).flatMap((item) =>
        item.output_manifests.map((manifest) => manifest.id),
      ),
      provider_state: Object.freeze({}),
      external_drift: [],
    });
  }
}

export {
  projectTaskCentricCompatibilityMutation,
  projectTaskCentricCompletion,
} from "./task-centric-backend-projection.js";

export { TASK_CENTRIC_RUNTIME_EXTENSION_KEY } from "./task-centric-backend-runtime.js";
