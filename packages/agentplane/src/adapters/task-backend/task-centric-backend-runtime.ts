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

export const TASK_CENTRIC_RUNTIME_EXTENSION_KEY = "agentplane.task_centric_runtime";

export type TaskCentricRuntimeProjection = Readonly<{
  schema_version: 1;
  leases: readonly ExecutionLease[];
  pending_effects: readonly PendingEffect[];
  checkpoints: readonly TaskCheckpoint[];
  retry_budgets: readonly RetryBudget[];
  mutation_receipts: Readonly<Record<string, TransitionReceipt>>;
}>;

function emptyRuntime(): TaskCentricRuntimeProjection {
  return Object.freeze({
    schema_version: 1,
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
  return runtime as TaskCentricRuntimeProjection;
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
