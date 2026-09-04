import {
  aggregateValidation,
  evaluateTaskCompletion,
  legacyStatusToTaskLifecycle,
  projectTaskLifecycleToLegacyStatus,
  taskCentricAggregateFromExtensions,
  taskCentricDigest,
  withTaskCentricAggregate,
  type RepositorySnapshot,
  type TaskAggregate,
  type TransitionReceipt,
  type ValidationEvidence,
} from "@agentplaneorg/core/tasks";

import type { TaskData } from "../../backends/task-backend.js";
import {
  runtimeFrom,
  syntheticEvent,
  TASK_CENTRIC_RUNTIME_EXTENSION_KEY,
  transitionReceipt,
} from "./task-centric-backend-runtime.js";

export function projectTaskCentricCompletion(opts: {
  task_id: string;
  current: TaskData;
  next: TaskData;
  repository: RepositorySnapshot;
  actor_id: string;
  evidence_refs: readonly string[];
  idempotency_key: string;
}): { task: TaskData; receipt: TransitionReceipt } | null {
  const aggregate = taskCentricAggregateFromExtensions(opts.current.extensions);
  if (!aggregate?.current_plan) return null;
  const runtime = runtimeFrom(opts.current);
  const already = runtime.mutation_receipts[opts.idempotency_key];
  if (already) return { task: opts.current, receipt: already };
  if (aggregate.lifecycle === "COMPLETED") return null;
  if (opts.next.verification?.state !== "ok") {
    throw new Error("Task-centric completion requires a recorded successful task verification.");
  }
  const evidence: ValidationEvidence[] =
    aggregate.current_plan.proposal.top_level_validation.checks.map((check) => ({
      check_id: check.id,
      status: "passed",
      observed_at: opts.next.verification?.updated_at ?? opts.repository.captured_at,
      repository_snapshot_digest: opts.repository.digest,
      command_identity: check.command ?? check.capability,
      exit_code: 0,
      artifact_refs: opts.evidence_refs,
      detail: opts.next.verification?.note ?? "Passed by the recorded task verification.",
    }));
  const currentRevision = opts.current.revision ?? aggregate.revision;
  const candidate: TaskAggregate = Object.freeze({
    ...aggregate,
    revision: currentRevision + 1,
    lifecycle: "COMPLETED",
    final_validation: aggregateValidation(
      aggregate.current_plan.proposal.top_level_validation,
      evidence,
    ),
    updated_at: opts.repository.captured_at,
  });
  const eligibility = evaluateTaskCompletion({
    task: candidate,
    repository_digest: opts.repository.digest,
    pending_effects: runtime.pending_effects,
  });
  if (!eligibility.eligible) {
    throw new Error(
      `Task-centric completion is not eligible: ${eligibility.reason_codes.join(", ")}.`,
    );
  }
  const event = syntheticEvent({
    task: aggregate,
    mutation_id: opts.idempotency_key,
    entity: "task",
    from: aggregate.lifecycle,
    to: "COMPLETED",
    at: opts.repository.captured_at,
    actor_id: opts.actor_id,
    cause_refs: opts.evidence_refs,
    repository_fingerprint: opts.repository.digest,
  });
  const receipt = transitionReceipt({
    task_id: aggregate.id,
    previous_revision: currentRevision,
    next: candidate,
    mutation_id: opts.idempotency_key,
    event,
  });
  return {
    receipt,
    task: {
      ...opts.next,
      revision: currentRevision + 1,
      status: projectTaskLifecycleToLegacyStatus(candidate.lifecycle),
      extensions: {
        ...withTaskCentricAggregate(opts.next.extensions, candidate),
        [TASK_CENTRIC_RUNTIME_EXTENSION_KEY]: Object.freeze({
          ...runtime,
          mutation_receipts: Object.freeze({
            ...runtime.mutation_receipts,
            [opts.idempotency_key]: receipt,
          }),
        }),
      },
    },
  };
}

export function projectTaskCentricCompatibilityMutation(opts: {
  current: TaskData;
  next: TaskData;
}): TaskData {
  if (JSON.stringify(opts.current) === JSON.stringify(opts.next)) return opts.next;
  const storedAggregate = taskCentricAggregateFromExtensions(opts.current.extensions);
  const nextAggregate = taskCentricAggregateFromExtensions(opts.next.extensions);
  if (!nextAggregate) {
    if (!storedAggregate) return opts.next;
    throw new Error("Task-centric compatibility mutation cannot remove the canonical aggregate.");
  }
  const currentAggregate = storedAggregate ?? nextAggregate;
  const currentRevision = opts.current.revision ?? currentAggregate.revision;
  const nextRevision = currentRevision + 1;
  const aggregateChanged = taskCentricDigest(currentAggregate) !== taskCentricDigest(nextAggregate);
  if (nextAggregate.revision === nextRevision) {
    return { ...opts.next, revision: nextRevision };
  }
  if (nextAggregate.revision !== currentRevision) {
    throw new Error(
      `Task-centric mutation revision mismatch: expected ${nextRevision}, observed ${nextAggregate.revision}.`,
    );
  }

  const at = opts.next.doc_updated_at ?? currentAggregate.updated_at;
  const verificationRework =
    currentAggregate.lifecycle === "COMPLETED" &&
    opts.current.verification?.state === "ok" &&
    opts.next.verification?.state === "needs_rework" &&
    opts.next.status === "DOING";
  const projectedLifecycle = verificationRework
    ? legacyStatusToTaskLifecycle(opts.next.status)
    : nextAggregate.lifecycle;
  const mutationId = `compatibility:${taskCentricDigest({
    task_id: opts.current.id,
    previous_revision: currentRevision,
    status: opts.next.status,
    comments: opts.next.comments,
    events: opts.next.events,
    verification: opts.next.verification,
    commit: opts.next.commit,
    aggregate: aggregateChanged ? taskCentricDigest(nextAggregate) : null,
    doc_version: opts.next.doc_version,
    doc_updated_at: opts.next.doc_updated_at,
    doc_updated_by: opts.next.doc_updated_by,
  })}`;
  const candidate: TaskAggregate = Object.freeze({
    ...nextAggregate,
    revision: nextRevision,
    lifecycle: projectedLifecycle,
    ...(projectedLifecycle === nextAggregate.lifecycle ? {} : { final_validation: null }),
    event_cursor: Math.max(nextAggregate.event_cursor, currentAggregate.event_cursor + 1),
    updated_at: at,
  });
  const event = syntheticEvent({
    task: currentAggregate,
    mutation_id: mutationId,
    entity: "task",
    from: currentAggregate.lifecycle,
    to: candidate.lifecycle,
    at,
    cause_refs: ["compatibility_projection_mutation"],
  });
  const receipt = transitionReceipt({
    task_id: currentAggregate.id,
    previous_revision: currentRevision,
    next: candidate,
    mutation_id: mutationId,
    event,
  });
  const runtime = runtimeFrom(opts.current);
  return {
    ...opts.next,
    revision: nextRevision,
    extensions: {
      ...withTaskCentricAggregate(opts.next.extensions, candidate),
      [TASK_CENTRIC_RUNTIME_EXTENSION_KEY]: Object.freeze({
        ...runtime,
        mutation_receipts: Object.freeze({
          ...runtime.mutation_receipts,
          [mutationId]: receipt,
        }),
      }),
    },
  };
}
