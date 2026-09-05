import {
  createLegacyTaskAggregate,
  taskCentricAggregateFromExtensions,
  taskCentricDigest,
  type DomainEvent,
  type ExecutionLease,
  type PendingEffect,
  type RetryBudget,
  type TaskAggregate,
  type TaskCheckpoint,
  type TransitionReceipt,
} from "@agentplaneorg/core/tasks";

import { BackendError, type TaskData } from "../../backends/task-backend.js";
import { TASK_KERNEL_EXTENSION } from "./kernel-record.js";
import { isRecord } from "../../shared/guards.js";

export const TASK_CENTRIC_RUNTIME_EXTENSION_KEY = "agentplane.task_centric_runtime";

export type TaskCentricRuntimeProjection = Readonly<{
  schema_version: 1;
  events: readonly DomainEvent[];
  leases: readonly ExecutionLease[];
  pending_effects: readonly PendingEffect[];
  checkpoints: readonly TaskCheckpoint[];
  retry_budgets: readonly RetryBudget[];
  mutation_receipts: Readonly<Record<string, TransitionReceipt>>;
}>;

function emptyRuntime(): TaskCentricRuntimeProjection {
  return Object.freeze({
    schema_version: 1,
    events: [],
    leases: [],
    pending_effects: [],
    checkpoints: [],
    retry_budgets: [],
    mutation_receipts: Object.freeze({}),
  });
}

export function runtimeFrom(task: TaskData): TaskCentricRuntimeProjection {
  if (Object.hasOwn(task.extensions ?? {}, TASK_KERNEL_EXTENSION)) {
    throw new BackendError("Canonical Task records require the kernel adapter.", "E_BACKEND", {
      reasonCode: "canonical_task_requires_kernel_adapter",
    });
  }
  const value = task.extensions?.[TASK_CENTRIC_RUNTIME_EXTENSION_KEY];
  if (value === undefined) return emptyRuntime();
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("Task-centric runtime projection is malformed.");
  }
  const runtime = value as Partial<TaskCentricRuntimeProjection>;
  if (
    runtime.schema_version !== 1 ||
    !Array.isArray(runtime.leases) ||
    !Array.isArray(runtime.pending_effects) ||
    !Array.isArray(runtime.checkpoints) ||
    !Array.isArray(runtime.retry_budgets) ||
    !runtime.mutation_receipts ||
    typeof runtime.mutation_receipts !== "object"
  ) {
    throw new Error("Task-centric runtime projection is malformed.");
  }
  return Object.freeze({
    ...(runtime as Omit<TaskCentricRuntimeProjection, "events">),
    events: Array.isArray(runtime.events) ? (runtime.events as readonly DomainEvent[]) : [],
  });
}

function acceptanceDescriptions(task: TaskData): string[] {
  return task.verify.length > 0 ? task.verify : [task.sections?.Summary ?? task.description];
}

export function aggregateFrom(task: TaskData): TaskAggregate {
  if (Object.hasOwn(task.extensions ?? {}, TASK_KERNEL_EXTENSION)) {
    throw new BackendError("Canonical Task records require the kernel adapter.", "E_BACKEND", {
      reasonCode: "canonical_task_requires_kernel_adapter",
    });
  }
  const aggregate =
    taskCentricAggregateFromExtensions(task.extensions) ??
    createLegacyTaskAggregate({
      id: task.id,
      revision: task.revision ?? 1,
      title: task.title,
      description: task.description,
      status: task.status,
      acceptance_criteria: acceptanceDescriptions(task),
      captured_at: task.doc_updated_at ?? new Date(0).toISOString(),
      updated_at: task.doc_updated_at ?? new Date(0).toISOString(),
    });
  return Object.freeze({ ...aggregate, revision: task.revision ?? aggregate.revision });
}

export function applyEvent(aggregate: TaskAggregate, event: DomainEvent): TaskAggregate {
  if (event.task_id !== aggregate.id) throw new Error("Domain event belongs to another task.");
  if (event.entity === "task") {
    return Object.freeze({
      ...aggregate,
      lifecycle: event.to as TaskAggregate["lifecycle"],
      revision: aggregate.revision + 1,
      event_cursor: aggregate.event_cursor + 1,
      updated_at: event.at,
    });
  }
  if (event.entity === "work_item" && event.work_item_id) {
    const current = aggregate.work_items[event.work_item_id];
    if (!current) throw new Error(`Work item ${event.work_item_id} does not exist.`);
    return Object.freeze({
      ...aggregate,
      revision: aggregate.revision + 1,
      event_cursor: aggregate.event_cursor + 1,
      work_items: Object.freeze({
        ...aggregate.work_items,
        [current.id]: Object.freeze({
          ...current,
          state: event.to as typeof current.state,
          revision: current.revision + 1,
        }),
      }),
      updated_at: event.at,
    });
  }
  return Object.freeze({
    ...aggregate,
    revision: aggregate.revision + 1,
    event_cursor: aggregate.event_cursor + 1,
    updated_at: event.at,
  });
}

export function transitionReceipt(opts: {
  task_id: string;
  previous_revision: number;
  next: TaskAggregate;
  mutation_id: string;
  event: DomainEvent;
}): TransitionReceipt {
  return Object.freeze({
    schema_version: 1,
    task_id: opts.task_id,
    previous_revision: opts.previous_revision,
    next_revision: opts.next.revision,
    mutation_id: opts.mutation_id,
    event: opts.event,
    aggregate_digest: taskCentricDigest(opts.next),
  });
}

export function syntheticEvent(opts: {
  task: TaskAggregate;
  mutation_id: string;
  entity: DomainEvent["entity"];
  work_item_id?: string | null;
  from: string | null;
  to: string;
  at?: string;
  actor_id?: string;
  cause_refs?: readonly string[];
  repository_fingerprint?: `sha256:${string}` | null;
}): DomainEvent {
  return Object.freeze({
    schema_version: 1,
    id: `event_${taskCentricDigest(opts).slice(7, 31)}`,
    mutation_id: opts.mutation_id,
    task_id: opts.task.id,
    task_revision: opts.task.revision,
    plan_revision: opts.task.current_plan?.revision ?? null,
    plan_digest: opts.task.current_plan?.digest ?? null,
    work_item_id: opts.work_item_id ?? null,
    entity: opts.entity,
    from: opts.from,
    to: opts.to,
    cause_refs: opts.cause_refs ?? [],
    actor_id: opts.actor_id ?? "agentplane",
    repository_fingerprint: opts.repository_fingerprint ?? null,
    at: opts.at ?? new Date().toISOString(),
  });
}

export function preserveReceiptedMetadata(
  before: Record<string, unknown>,
  after: Record<string, unknown>,
): void {
  const aggregateKey = "agentplane.task_centric";
  const runtimeKey = "agentplane.task_centric_runtime";
  if (
    taskCentricDigest(before[aggregateKey] ?? null) ===
      taskCentricDigest(after[aggregateKey] ?? null) &&
    taskCentricDigest(before[runtimeKey] ?? null) === taskCentricDigest(after[runtimeKey] ?? null)
  )
    return;
  const original = taskCentricAggregateFromExtensions(before);
  const current = taskCentricAggregateFromExtensions(after);
  const previousRuntime = before[runtimeKey];
  const currentRuntime = after[runtimeKey];
  if (!original || !current || !isRecord(previousRuntime) || !isRecord(currentRuntime)) return;
  const previousReceipts = previousRuntime.mutation_receipts;
  const currentReceipts = currentRuntime.mutation_receipts;
  if (!isRecord(previousReceipts) || !isRecord(currentReceipts)) return;
  if (
    taskCentricDigest({ ...previousRuntime, mutation_receipts: null }) !==
      taskCentricDigest({ ...currentRuntime, mutation_receipts: null }) ||
    Object.entries(previousReceipts).some(
      ([key, receipt]) =>
        !Object.hasOwn(currentReceipts, key) ||
        taskCentricDigest(receipt) !== taskCentricDigest(currentReceipts[key]),
    )
  )
    return;
  const added = Object.entries(currentReceipts).filter(
    ([key]) => !Object.hasOwn(previousReceipts, key),
  );
  let candidate = original;
  // Replay only metadata-only projection receipts. Plan, lifecycle and WorkItem data stay exact.
  const ordered = added.toSorted(
    ([, left], [, right]) =>
      Number(isRecord(left) ? left.previous_revision : -1) -
      Number(isRecord(right) ? right.previous_revision : -1),
  );
  for (const [mutationId, receipt] of ordered) {
    if (!isRecord(receipt) || !isRecord(receipt.event) || typeof receipt.event.at !== "string")
      return;
    const next = {
      ...candidate,
      revision: candidate.revision + 1,
      event_cursor: candidate.event_cursor + 1,
      updated_at: receipt.event.at,
    };
    const expected = transitionReceipt({
      task_id: candidate.id,
      previous_revision: candidate.revision,
      next,
      mutation_id: mutationId,
      event: syntheticEvent({
        task: candidate,
        mutation_id: mutationId,
        entity: "task",
        from: candidate.lifecycle,
        to: candidate.lifecycle,
        at: receipt.event.at,
        cause_refs: ["compatibility_projection_mutation"],
      }),
    });
    if (
      !mutationId.startsWith("compatibility:sha256:") ||
      taskCentricDigest(expected) !== taskCentricDigest(receipt)
    ) {
      return;
    }
    candidate = next;
  }
  if (taskCentricDigest(candidate) !== taskCentricDigest(current)) return;
  before[aggregateKey] = after[aggregateKey];
  before[runtimeKey] = after[runtimeKey];
}
