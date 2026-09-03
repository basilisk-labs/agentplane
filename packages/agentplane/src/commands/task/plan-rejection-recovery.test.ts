import {
  createLegacyTaskAggregate,
  TASK_CENTRIC_REPLAN_REQUIRED_EXTENSION_KEY,
  taskCentricDigest,
  withTaskCentricAggregate,
  type TaskAggregate,
} from "@agentplaneorg/core/tasks";
import { describe, expect, it } from "vitest";

import { assertCanonicalPlanCanBeApproved } from "./plan-approval-guard.js";

function aggregate(planState: "pending" | "rejected"): TaskAggregate {
  const base = createLegacyTaskAggregate({
    id: "202609021331-5FPZAB",
    revision: 52,
    title: "Projection recovery",
    description: "Fixture",
    status: "TODO",
    acceptance_criteria: ["recovered"],
    captured_at: "2026-09-02T13:31:00.000Z",
    updated_at: "2026-09-02T13:31:00.000Z",
  });
  return {
    ...base,
    lifecycle: "PLANNING",
    current_plan: {
      schema_version: 1,
      task_id: base.id,
      revision: 1,
      digest: taskCentricDigest("rejected-plan"),
      proposal: {
        schema_version: 1,
        task_id: base.id,
        planning_baseline: {
          schema_version: 1,
          digest: taskCentricDigest("baseline"),
          git: { kind: "commit", sha: "a".repeat(40), ref: null },
          dirty_paths: [],
          policy_digest: null,
          config_digest: null,
          context_digest: null,
          task_history_cursor: null,
          captured_at: "2026-09-02T13:31:00.000Z",
        },
        work_items: { schema_version: 1, work_items: [] },
        assumptions: [],
        unresolved_questions: [],
        top_level_validation: {
          schema_version: 1,
          criteria: [],
          checks: [],
          evidence_fingerprint: taskCentricDigest("evidence"),
        },
      },
      approval: {
        state: planState,
        approved_by: null,
        approved_at: null,
        approved_digest: null,
        policy_facts: [],
      },
      created_at: "2026-09-02T13:31:00.000Z",
    },
  };
}

describe("plan rejection approval invalidation", () => {
  it("rejects the rejected digest and every approval request while replanning is required", () => {
    const rejected = aggregate("rejected");
    const extensions = {
      ...withTaskCentricAggregate({}, rejected),
      [TASK_CENTRIC_REPLAN_REQUIRED_EXTENSION_KEY]: {
        schema_version: 1,
        reason_code: "plan_rejected",
      },
    };
    expect(() => assertCanonicalPlanCanBeApproved(rejected, extensions)).toThrow(
      /complete replanning/u,
    );
  });

  it("fails closed on a stale approval packet even before the aggregate plan state is projected", () => {
    const pending = aggregate("pending");
    const extensions = {
      ...withTaskCentricAggregate({}, pending),
      [TASK_CENTRIC_REPLAN_REQUIRED_EXTENSION_KEY]: {
        schema_version: 1,
        reason_code: "plan_rejection_projection_recovered",
      },
    };
    expect(() => assertCanonicalPlanCanBeApproved(pending, extensions)).toThrow(
      /stale.*replanning/u,
    );
  });
});
