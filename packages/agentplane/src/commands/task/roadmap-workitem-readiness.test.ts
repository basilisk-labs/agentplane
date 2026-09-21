import {
  approveTaskPlan,
  createLegacyTaskAggregate,
  createRepositorySnapshot,
  createTaskPlanRevision,
  materializeApprovedWorkItems,
  selectSchedulableWorkItems,
  taskCentricDigest,
  withTaskCentricAggregate,
  type TaskPlanProposal,
  type ValidationPlan,
  type WorkItem,
} from "@agentplaneorg/core/tasks";
import { describe, expect, it } from "vitest";

import type { TaskData } from "../../backends/task-backend.js";
import { requiredWorkItemRoute } from "../shared/workflow-step-factory.js";

const NOW = "2026-09-21T00:00:00.000Z";

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

function item(opts: Partial<WorkItem> & Pick<WorkItem, "id">): WorkItem {
  const plan = validation(opts.id);
  return {
    id: opts.id,
    objective: `Implement ${opts.id}`,
    depends_on: opts.depends_on ?? [],
    required_inputs: opts.required_inputs ?? [],
    expected_outputs: opts.expected_outputs ?? [`out-${opts.id}`],
    scope_roots: [`packages/${opts.id}`],
    acceptance_criteria: plan.criteria,
    validation: plan,
    context: {
      required_sources: ["repository"],
      optional_sources: [],
      symbol_hints: [],
      max_bytes: 4096,
    },
    risk: "medium",
    capabilities: ["test"],
    resource_claims: opts.resource_claims ?? [
      { kind: "exclusive", resource: "workspace:source", mode: "exclusive" },
    ],
    optional: opts.optional ?? false,
    priority: opts.priority ?? 0,
  };
}

function approvedTask(workItems: readonly WorkItem[]) {
  const snapshot = createRepositorySnapshot({
    git: { kind: "commit", sha: "a".repeat(40), ref: "refs/heads/main" },
    dirty_paths: [],
    policy_digest: null,
    config_digest: null,
    context_digest: null,
    task_history_cursor: null,
    captured_at: NOW,
  });
  const proposal: TaskPlanProposal = {
    schema_version: 1,
    task_id: "task-1",
    planning_baseline: snapshot,
    work_items: { schema_version: 1, work_items: workItems },
    assumptions: [],
    unresolved_questions: [],
    top_level_validation: validation("root"),
  };
  const draft = createTaskPlanRevision({ proposal, revision: 1, created_at: NOW });
  const plan = approveTaskPlan({
    plan: draft,
    expected_digest: draft.digest,
    actor: "USER",
    approved_at: NOW,
  });
  return materializeApprovedWorkItems({
    task: createLegacyTaskAggregate({
      id: "task-1",
      revision: 1,
      title: "Task",
      description: "Readiness contract",
      status: "TODO",
      acceptance_criteria: ["Complete"],
      captured_at: NOW,
      updated_at: NOW,
    }),
    plan,
    now: NOW,
  });
}

function routeTask(aggregate: ReturnType<typeof approvedTask>): TaskData {
  return { extensions: withTaskCentricAggregate({}, aggregate) } as TaskData;
}

describe("LC-04 common WorkItem readiness", () => {
  it("keeps a required input blocked until an output manifest exists", () => {
    const aggregate = approvedTask([item({ id: "consumer", required_inputs: ["source"] })]);

    expect(aggregate.work_items.consumer?.state).toBe("PLANNED");
    expect(requiredWorkItemRoute(routeTask(aggregate))).toEqual({
      state: "blocked",
      work_item_id: null,
    });
  });

  it("does not let an optional ready WorkItem block required completion", () => {
    const aggregate = approvedTask([item({ id: "optional", optional: true })]);

    expect(aggregate.work_items.optional?.state).toBe("READY");
    expect(requiredWorkItemRoute(routeTask(aggregate))).toEqual({
      state: "complete",
      work_item_id: null,
    });
  });

  it("uses one deterministic selector for ordering and exclusive resource conflicts", () => {
    const shared = [
      { kind: "exclusive" as const, resource: "workspace:source", mode: "exclusive" as const },
    ];
    const candidates = [
      { id: "b", priority: 0, ready: true, resource_claims: shared, value: "b" },
      { id: "a", priority: 0, ready: true, resource_claims: shared, value: "a" },
    ];

    expect(selectSchedulableWorkItems({ candidates, open_slots: 2 })).toEqual(["a"]);
    expect(
      selectSchedulableWorkItems({
        candidates,
        open_slots: 1,
        active_resource_claims: shared,
      }),
    ).toEqual([]);
  });
});
