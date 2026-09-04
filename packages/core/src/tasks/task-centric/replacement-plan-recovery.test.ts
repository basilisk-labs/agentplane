import { describe, expect, it } from "vitest";

import {
  aggregateValidation,
  approveTaskPlan,
  createLegacyTaskAggregate,
  createRepositorySnapshot,
  createTaskPlanRevision,
  materializeApprovedWorkItems,
  reconcileReplacementPlanWorkItems,
  taskCentricDigest,
  type DomainEvent,
  type OutputManifest,
  type ReplacementPlanWorkItemRecoveryEvidence,
  type RepositorySnapshot,
  type TaskAggregate,
  type TaskPlanProposal,
  type TransitionReceipt,
  type ValidationPlan,
  type WorkItem,
} from "./index.js";

const NOW = "2026-08-22T00:00:00.000Z";

function snapshot(): RepositorySnapshot {
  return createRepositorySnapshot({
    git: { kind: "commit", sha: "a".repeat(40), ref: "refs/heads/main" },
    dirty_paths: [],
    policy_digest: taskCentricDigest("policy"),
    config_digest: taskCentricDigest("config"),
    context_digest: taskCentricDigest("context"),
    task_history_cursor: "cursor-1",
    captured_at: NOW,
  });
}

function validation(id: string): ValidationPlan {
  const checkId = `check-${id}`;
  return {
    schema_version: 1,
    criteria: [
      {
        id: `criterion-${id}`,
        description: `Validate ${id}`,
        required: true,
        check_ids: [checkId],
      },
    ],
    checks: [{ id: checkId, kind: "deterministic", required: true, capability: "test" }],
    evidence_fingerprint: taskCentricDigest({ id }),
  };
}

function item(objective = "Implement a"): WorkItem {
  const plan = validation("a");
  return {
    id: "a",
    objective,
    depends_on: [],
    required_inputs: [],
    expected_outputs: ["out-a"],
    scope_roots: ["packages/a"],
    acceptance_criteria: plan.criteria,
    validation: plan,
    context: {
      required_sources: ["repository"],
      optional_sources: [],
      symbol_hints: [],
      max_bytes: 16_384,
    },
    risk: "medium",
    capabilities: ["test"],
    resource_claims: [{ kind: "path", resource: "packages/a", mode: "write" }],
    optional: false,
    priority: 0,
  };
}

function proposal(definition: WorkItem): TaskPlanProposal {
  return {
    schema_version: 1,
    task_id: "task-1",
    planning_baseline: snapshot(),
    work_items: { schema_version: 1, work_items: [definition] },
    assumptions: [],
    unresolved_questions: [],
    top_level_validation: validation("root"),
  };
}

function approvedTask(): TaskAggregate {
  const draft = createTaskPlanRevision({
    proposal: proposal(item()),
    revision: 1,
    created_at: NOW,
  });
  const approved = approveTaskPlan({
    plan: draft,
    expected_digest: draft.digest,
    actor: "denis",
    approved_at: NOW,
  });
  return materializeApprovedWorkItems({
    task: createLegacyTaskAggregate({
      id: "task-1",
      revision: 1,
      title: "Task",
      description: "Description",
      status: "TODO",
      acceptance_criteria: ["Complete the task"],
      captured_at: NOW,
      updated_at: NOW,
    }),
    plan: approved,
    now: NOW,
  });
}

function manifest(): OutputManifest {
  return {
    schema_version: 1,
    id: "out-a",
    kind: "test",
    schema: "test.v1",
    digest: taskCentricDigest("out-a"),
    producer: { task_id: "task-1", plan_revision: 1, work_item_id: "a", attempt: 1 },
    repository_snapshot_digest: snapshot().digest,
    provenance: [],
  };
}

function completedRecoveryEvidence(task: TaskAggregate): ReplacementPlanWorkItemRecoveryEvidence {
  const plan = task.current_plan!;
  const current = task.work_items.a!;
  const runtime = {
    ...current,
    state: "COMPLETED" as const,
    revision: current.revision + 1,
    attempt: current.attempt + 1,
    output_manifests: [manifest()],
    validation_result: aggregateValidation(validation("a"), [
      {
        check_id: "check-a",
        status: "passed",
        observed_at: NOW,
        repository_snapshot_digest: snapshot().digest,
        command_identity: "test",
        exit_code: 0,
        artifact_refs: ["verification.json"],
        detail: "passed",
      },
    ]),
  };
  const event: DomainEvent = {
    schema_version: 1,
    id: "event_completed_a",
    mutation_id: "result-a",
    task_id: task.id,
    task_revision: task.revision,
    plan_revision: plan.revision,
    plan_digest: plan.digest,
    work_item_id: "a",
    entity: "work_item",
    from: current.state,
    to: runtime.state,
    cause_refs: [],
    actor_id: "agentplane",
    repository_fingerprint: null,
    at: NOW,
  };
  const aggregate: TaskAggregate = {
    ...task,
    revision: task.revision + 1,
    event_cursor: task.event_cursor + 1,
    work_items: { ...task.work_items, a: runtime },
  };
  const receipt: TransitionReceipt = {
    schema_version: 1,
    task_id: task.id,
    previous_revision: task.revision,
    next_revision: aggregate.revision,
    mutation_id: event.mutation_id,
    event,
    aggregate_digest: taskCentricDigest(aggregate),
  };
  return { aggregate, receipt };
}

function resetTask(task: TaskAggregate): TaskAggregate {
  return {
    ...task,
    work_items: {
      a: {
        id: "a",
        state: "PLANNED",
        revision: 1,
        attempt: 0,
        claim_id: null,
        output_manifests: [],
        validation_result: null,
        last_failure: null,
      },
    },
    final_validation: null,
  };
}

describe("replacement-plan WorkItem recovery", () => {
  it("recovers exact terminal evidence after a validation-fingerprint-only revision", () => {
    const original = approvedTask();
    const evidence = completedRecoveryEvidence(original);
    const definition = original.current_plan!.proposal.work_items.work_items[0]!;
    const changed = {
      ...definition,
      validation: {
        ...definition.validation,
        evidence_fingerprint: taskCentricDigest("command-only-verification-change"),
      },
    };
    const draft = createTaskPlanRevision({
      proposal: proposal(changed),
      revision: 2,
      created_at: NOW,
    });
    const plan = approveTaskPlan({
      plan: draft,
      expected_digest: draft.digest,
      actor: "denis",
      approved_at: NOW,
    });
    const reset = {
      ...resetTask(evidence.aggregate),
      current_plan: plan,
      plan_history: [original.current_plan!],
    };

    const recovered = reconcileReplacementPlanWorkItems({
      task: reset,
      proposal: plan.proposal,
      recovery_evidence: [evidence],
    });
    expect(recovered.a).toBe(evidence.aggregate.work_items.a);
    expect(recovered.a?.state).toBe("COMPLETED");
    expect(
      reconcileReplacementPlanWorkItems({
        task: { ...reset, work_items: recovered },
        proposal: plan.proposal,
        recovery_evidence: [evidence],
      }).a,
    ).toBe(recovered.a);
  });

  it("fails closed for ambiguous, mismatched, cross-task, active, or incomplete evidence", () => {
    const original = approvedTask();
    const evidence = completedRecoveryEvidence(original);
    const reset = { ...resetTask(original), plan_history: [original.current_plan!] };
    const resetRuntime = reset.work_items.a!;
    const crossTaskAggregate = { ...evidence.aggregate, id: "other-task" };
    const activelyClaimedAggregate = {
      ...evidence.aggregate,
      work_items: {
        ...evidence.aggregate.work_items,
        a: { ...evidence.aggregate.work_items.a!, claim_id: "claim-a" },
      },
    };
    const invalidCases: readonly (readonly ReplacementPlanWorkItemRecoveryEvidence[])[] = [
      [evidence, evidence],
      [
        {
          aggregate: evidence.aggregate,
          receipt: { ...evidence.receipt, aggregate_digest: taskCentricDigest("incomplete") },
        },
      ],
      [
        {
          aggregate: crossTaskAggregate,
          receipt: {
            ...evidence.receipt,
            task_id: "other-task",
            event: { ...evidence.receipt.event, task_id: "other-task" },
            aggregate_digest: taskCentricDigest(crossTaskAggregate),
          },
        },
      ],
      [
        {
          aggregate: activelyClaimedAggregate,
          receipt: {
            ...evidence.receipt,
            aggregate_digest: taskCentricDigest(activelyClaimedAggregate),
          },
        },
      ],
    ];
    const before = taskCentricDigest(reset);
    for (const recovery_evidence of invalidCases) {
      expect(
        reconcileReplacementPlanWorkItems({
          task: reset,
          proposal: original.current_plan!.proposal,
          recovery_evidence,
        }).a,
      ).toBe(resetRuntime);
      expect(taskCentricDigest(reset)).toBe(before);
    }

    expect(
      reconcileReplacementPlanWorkItems({
        task: reset,
        proposal: proposal(item("Different semantic contract")),
        recovery_evidence: [evidence],
      }).a,
    ).toMatchObject({ state: "PLANNED", revision: 1, attempt: 0 });
    expect(taskCentricDigest(reset)).toBe(before);
  });
});
