import {
  EXECUTION_GRANT_EXTENSION_KEY,
  TASK_CENTRIC_REPLAN_REQUIRED_EXTENSION_KEY,
  taskCentricAggregateFromExtensions,
  taskCentricDigest,
  withTaskCentricAggregate,
  type DomainEvent,
  type TaskAggregate,
  type TransitionReceipt,
} from "@agentplaneorg/core/tasks";

import type { TaskBackend } from "../../backends/task-backend.js";
import {
  runtimeFrom,
  syntheticEvent,
  TASK_CENTRIC_RUNTIME_EXTENSION_KEY,
  transitionReceipt,
  type TaskCentricRuntimeProjection,
} from "./task-centric-backend-runtime.js";

export type RejectPlanInput = {
  task_id: string;
  expected_revision: number;
  plan_revision: number;
  plan_digest: `sha256:${string}`;
  actor_id: string;
  note: string;
  rejected_at: string;
  idempotency_key: string;
};

type RejectionPersistence = (opts: {
  task_id: string;
  expected_revision: number;
  next: TaskAggregate;
  event: DomainEvent;
  mutation_id: string;
  runtime: TaskCentricRuntimeProjection;
  replan_required_reason_code: string;
  clear_execution_grant: true;
  plan_approval: {
    state: "rejected";
    updated_at: string;
    updated_by: string;
    note: string;
  };
}) => Promise<TransitionReceipt>;

export async function rejectTaskCentricPlan(opts: {
  backend: TaskBackend;
  input: RejectPlanInput;
  persist: RejectionPersistence;
}): Promise<TransitionReceipt> {
  const { input } = opts;
  const raw = await opts.backend.getTask(input.task_id);
  if (!raw) throw new Error(`Task not found: ${input.task_id}`);
  const runtime = runtimeFrom(raw);
  const already = runtime.mutation_receipts[input.idempotency_key];
  if (already) return already;
  const aggregate = taskCentricAggregateFromExtensions(raw.extensions);
  if (!aggregate?.current_plan) throw new Error("Task-centric plan is missing.");
  if ((raw.revision ?? 1) !== aggregate.revision) {
    throw new Error(
      `Task-centric mutation revision mismatch: expected ${raw.revision ?? 1}, observed ${aggregate.revision}.`,
    );
  }
  if (
    aggregate.current_plan.revision !== input.plan_revision ||
    aggregate.current_plan.digest !== input.plan_digest
  ) {
    throw new Error("Task plan rejection request is stale.");
  }
  if (aggregate.current_plan.approval.state === "rejected") {
    throw new Error("Task plan is already rejected with a different mutation identity.");
  }
  const event = syntheticEvent({
    task: aggregate,
    mutation_id: input.idempotency_key,
    entity: "task",
    from: aggregate.lifecycle,
    to: "PLANNING",
    at: input.rejected_at,
    actor_id: input.actor_id,
    cause_refs: [`plan:${input.plan_digest}`, `note:${taskCentricDigest(input.note)}`],
  });
  return await opts.persist({
    task_id: aggregate.id,
    expected_revision: input.expected_revision,
    mutation_id: input.idempotency_key,
    event,
    runtime,
    next: Object.freeze({
      ...aggregate,
      lifecycle: "PLANNING",
      current_plan: Object.freeze({
        ...aggregate.current_plan,
        approval: Object.freeze({
          state: "rejected",
          approved_by: null,
          approved_at: null,
          approved_digest: null,
          policy_facts: [],
        }),
      }),
      event_cursor: aggregate.event_cursor + 1,
      updated_at: input.rejected_at,
    }),
    replan_required_reason_code: "plan_rejected",
    clear_execution_grant: true,
    plan_approval: {
      state: "rejected",
      updated_at: input.rejected_at,
      updated_by: input.actor_id,
      note: input.note,
    },
  });
}

export type RecoverRejectedPlanInput = {
  task_id: string;
  expected_readme_revision: number;
  expected_aggregate_revision: number;
  plan_digest: `sha256:${string}`;
  expected_state_fingerprint: `sha256:${string}`;
  observed_state_fingerprint: `sha256:${string}`;
  actor_id: string;
  note: string;
  recovered_at: string;
  idempotency_key: string;
};

export async function recoverRejectedPlanProjection(opts: {
  backend: TaskBackend;
  input: RecoverRejectedPlanInput;
}): Promise<TransitionReceipt> {
  const { input } = opts;
  const raw = await opts.backend.getTask(input.task_id);
  if (!raw) throw new Error(`Task not found: ${input.task_id}`);
  const runtime = runtimeFrom(raw);
  const already = runtime.mutation_receipts[input.idempotency_key];
  if (already) return already;
  if (input.expected_state_fingerprint !== input.observed_state_fingerprint) {
    throw new Error("Task rejection recovery fingerprint is stale.");
  }
  const aggregate = taskCentricAggregateFromExtensions(raw.extensions);
  if (!aggregate?.current_plan) throw new Error("Task-centric plan is missing.");
  if (
    (raw.revision ?? 1) !== input.expected_readme_revision ||
    aggregate.revision !== input.expected_aggregate_revision
  ) {
    throw new Error(
      `Task rejection recovery revisions changed: README ${raw.revision ?? 1}/${input.expected_readme_revision}, aggregate ${aggregate.revision}/${input.expected_aggregate_revision}.`,
    );
  }
  if (raw.plan_approval?.state !== "rejected") {
    throw new Error("Task rejection recovery requires a rejected README projection.");
  }
  if (aggregate.current_plan.digest !== input.plan_digest) {
    throw new Error("Task rejection recovery plan digest is stale.");
  }
  if (aggregate.current_plan.approval.state === "rejected") {
    throw new Error("Task rejection recovery is unnecessary.");
  }
  const nextRevision = input.expected_readme_revision + 1;
  const event = syntheticEvent({
    task: aggregate,
    mutation_id: input.idempotency_key,
    entity: "task",
    from: aggregate.lifecycle,
    to: "PLANNING",
    at: input.recovered_at,
    actor_id: input.actor_id,
    cause_refs: [
      "projection-recovery:plan-rejection",
      `readme-revision:${input.expected_readme_revision}`,
      `aggregate-revision:${input.expected_aggregate_revision}`,
      `state-fingerprint:${input.expected_state_fingerprint}`,
      `note:${taskCentricDigest(input.note)}`,
    ],
  });
  const next = Object.freeze({
    ...aggregate,
    revision: nextRevision,
    lifecycle: "PLANNING" as const,
    current_plan: Object.freeze({
      ...aggregate.current_plan,
      approval: Object.freeze({
        state: "rejected" as const,
        approved_by: null,
        approved_at: null,
        approved_digest: null,
        policy_facts: [],
      }),
    }),
    event_cursor: aggregate.event_cursor + 1,
    updated_at: input.recovered_at,
  });
  const receipt = transitionReceipt({
    task_id: input.task_id,
    previous_revision: aggregate.revision,
    next,
    mutation_id: input.idempotency_key,
    event,
  });
  const nextRuntime: TaskCentricRuntimeProjection = Object.freeze({
    ...runtime,
    events: Object.freeze([...runtime.events, event]),
    mutation_receipts: Object.freeze({
      ...runtime.mutation_receipts,
      [input.idempotency_key]: receipt,
    }),
  });
  const extensions = withTaskCentricAggregate(raw.extensions, next);
  delete extensions[EXECUTION_GRANT_EXTENSION_KEY];
  extensions[TASK_CENTRIC_REPLAN_REQUIRED_EXTENSION_KEY] = {
    schema_version: 1,
    reason_code: "plan_rejection_projection_recovered",
  };
  await opts.backend.writeTask(
    {
      ...raw,
      revision: nextRevision,
      status: "TODO",
      extensions: {
        ...extensions,
        [TASK_CENTRIC_RUNTIME_EXTENSION_KEY]: nextRuntime,
      },
    },
    { expectedRevision: input.expected_readme_revision },
  );
  return receipt;
}
