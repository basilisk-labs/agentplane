import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  createRepositorySnapshot,
  taskCentricDigest,
  TASK_CENTRIC_EXTENSION_KEY,
  type TaskPlanProposal,
} from "@agentplaneorg/core/tasks";

const mocks = vi.hoisted(() => ({ loadTask: vi.fn() }));
vi.mock("../shared/task-backend.js", () => ({ loadTaskFromContext: mocks.loadTask }));

import {
  assertExternalPlanningResultApplicable,
  isExternalPlanningResultApplied,
} from "./external-agent-planning-authority.js";

const summary = "Preserve exact planning-result recovery.";
// These projections isolate comparison after the envelope has already been validated.
// The CLI recovery suite exercises validation and persistence of a full TaskPlanProposal.
const returnedProposal = {
  task_id: "202608190000-ABC123",
  work_items: [
    { id: "first", context: { required: true, paths: ["src", "tests"] } },
    { id: "second", context: { required: false, paths: [] } },
  ],
};
const persistedProposal = {
  work_items: [
    { context: { paths: ["src", "tests"], required: true }, id: "first" },
    { context: { paths: [], required: false }, id: "second" },
  ],
  task_id: "202608190000-ABC123",
};

function taskRecord(proposal: unknown = persistedProposal) {
  return {
    sections: { Plan: summary },
    plan_approval: { state: "approved" },
    extensions: { [TASK_CENTRIC_EXTENSION_KEY]: { current_plan: { proposal } } },
  };
}

function applied(
  opts: {
    status?: "completed" | "blocked";
    proposal?: unknown;
    approvalRoute?: boolean;
    intent?: unknown;
  } = {},
) {
  return isExternalPlanningResultApplied({
    command: {} as never,
    exchange: { task_id: returnedProposal.task_id } as never,
    decision: {
      workflowStep: opts.approvalRoute
        ? { kind: "approval", request: { type: "plan_approval" } }
        : { kind: "agent_episode" },
    } as never,
    envelope: {
      result: {
        status: opts.status ?? "completed",
        summary,
        task_plan_proposal: opts.proposal ?? returnedProposal,
        ...(opts.intent ? { task_intent: opts.intent } : {}),
      },
    } as never,
  });
}

describe("persisted external planning-result comparison", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mocks.loadTask.mockResolvedValue(taskRecord());
  });

  it("recognizes equivalent nested objects regardless of property insertion order", async () => {
    expect(persistedProposal).toEqual(returnedProposal);
    expect(JSON.stringify(persistedProposal)).not.toBe(JSON.stringify(returnedProposal));
    expect(await applied()).toBe(true);
  });

  it.each([
    ["changed scalar", { ...persistedProposal, task_id: "202608190000-OTHER1" }],
    ["missing field", { work_items: persistedProposal.work_items }],
    ["added field", { ...persistedProposal, unexpected: true }],
    [
      "reordered work items",
      {
        ...persistedProposal,
        work_items: persistedProposal.work_items.toReversed(),
      },
    ],
    [
      "reordered nested array",
      {
        ...persistedProposal,
        work_items: [
          { id: "first", context: { required: true, paths: ["tests", "src"] } },
          persistedProposal.work_items[1],
        ],
      },
    ],
    [
      "changed nested value",
      {
        ...persistedProposal,
        work_items: [
          { id: "first", context: { required: false, paths: ["src", "tests"] } },
          persistedProposal.work_items[1],
        ],
      },
    ],
  ])("rejects a %s", async (_label, proposal) => {
    mocks.loadTask.mockResolvedValue(taskRecord(proposal));
    expect(await applied()).toBe(false);
  });

  it("rejects a missing persisted proposal", async () => {
    mocks.loadTask.mockResolvedValue({ ...taskRecord(), extensions: {} });
    expect(await applied()).toBe(false);
  });

  it("rejects changed plan text despite an equivalent proposal", async () => {
    mocks.loadTask.mockResolvedValue({ ...taskRecord(), sections: { Plan: "A different plan." } });
    expect(await applied()).toBe(false);
  });

  it("requires either current plan approval or the plan-approval route", async () => {
    mocks.loadTask.mockResolvedValue({ ...taskRecord(), plan_approval: { state: "pending" } });
    expect(await applied()).toBe(false);
    expect(await applied({ approvalRoute: true })).toBe(true);
  });

  it("does not treat an incomplete result as applied", async () => {
    expect(await applied({ status: "blocked" })).toBe(false);
    expect(mocks.loadTask).not.toHaveBeenCalled();
  });

  it("compares structured classification values semantically without relaxing their content", async () => {
    const intent = {
      task_kind: "code",
      mutation_scope: "code",
      risk_flags: [],
      tags: ["code", "tests"],
      blueprint_request: { mode: "extend", recipeIds: ["one", "two"] },
    };
    const record = {
      ...taskRecord(),
      ...intent,
      tags: ["tests", "code"],
      blueprint_request: { recipeIds: ["one", "two"], mode: "extend" },
    };
    mocks.loadTask.mockResolvedValue(record);
    expect(await applied({ intent })).toBe(true);
    mocks.loadTask.mockResolvedValue({ ...record, mutation_scope: "docs" });
    expect(await applied({ intent })).toBe(false);
  });
});

describe("external TaskPlanProposal graph validation", () => {
  const repository = createRepositorySnapshot({
    git: { kind: "commit", sha: "a".repeat(40), ref: null },
    dirty_paths: [],
    policy_digest: null,
    config_digest: null,
    context_digest: null,
    task_history_cursor: "task-revision:1",
    captured_at: "2026-08-19T00:00:00.000Z",
  });
  const validation = {
    schema_version: 1 as const,
    criteria: [{ id: "done", description: "done", required: true, check_ids: ["test"] }],
    checks: [
      {
        id: "test",
        kind: "deterministic" as const,
        required: true,
        capability: "task.verify",
        command: "bun test",
      },
    ],
    evidence_fingerprint: taskCentricDigest("validation"),
  };
  const item = (opts: {
    id: string;
    depends_on?: readonly string[];
    required_inputs?: readonly string[];
    expected_outputs: readonly string[];
  }) => ({
    id: opts.id,
    objective: `Implement ${opts.id}`,
    depends_on: [...(opts.depends_on ?? [])],
    required_inputs: [...(opts.required_inputs ?? [])],
    expected_outputs: [...opts.expected_outputs],
    scope_roots: ["packages/agentplane/src/commands/task"],
    acceptance_criteria: validation.criteria,
    validation,
    context: {
      required_sources: ["repository"],
      optional_sources: [],
      symbol_hints: [],
      max_bytes: 8192,
    },
    risk: "medium" as const,
    capabilities: ["task.verify"],
    resource_claims: [
      {
        kind: "path" as const,
        resource: "packages/agentplane/src/commands/task",
        mode: "write" as const,
      },
    ],
    optional: false,
    priority: 1,
  });

  function proposal(workItems: TaskPlanProposal["work_items"]["work_items"]): TaskPlanProposal {
    return {
      schema_version: 1,
      task_id: returnedProposal.task_id,
      planning_baseline: repository,
      work_items: { schema_version: 1, work_items: workItems },
      assumptions: [],
      unresolved_questions: [],
      top_level_validation: validation,
    };
  }

  async function assertApplicable(plan: TaskPlanProposal) {
    mocks.loadTask.mockResolvedValue({
      id: returnedProposal.task_id,
      title: "Task",
      description: "Task",
      status: "DOING",
      revision: 1,
      verify: [],
      mutation_scope: "code",
      task_kind: "code",
      extensions: {},
    });
    return assertExternalPlanningResultApplicable({
      command: {} as never,
      exchange: { task_id: returnedProposal.task_id } as never,
      envelope: {
        result: {
          status: "completed",
          summary: "Plan",
          task_plan_proposal: plan,
        },
      } as never,
      work_order: {
        role: "PLANNER",
        task: { id: returnedProposal.task_id, work_item_id: null },
        state_fingerprint: { digest: taskCentricDigest("state"), git_head: null },
        planning_context: { repository_snapshot: repository },
      } as never,
    });
  }

  it("accepts a required input produced by exactly one predecessor", async () => {
    await expect(
      assertApplicable(
        proposal([
          item({ id: "first", expected_outputs: ["first-output"] }),
          item({
            id: "second",
            depends_on: ["first"],
            required_inputs: ["first-output"],
            expected_outputs: ["second-output"],
          }),
        ]),
      ),
    ).resolves.toBeUndefined();
  });

  it.each([
    [
      "unproduced",
      [item({ id: "first", required_inputs: ["missing"], expected_outputs: ["out"] })],
    ],
    ["self-produced", [item({ id: "first", required_inputs: ["out"], expected_outputs: ["out"] })]],
    [
      "multiply produced",
      [
        item({ id: "first", expected_outputs: ["shared"] }),
        item({ id: "second", expected_outputs: ["shared"] }),
        item({ id: "consumer", required_inputs: ["shared"], expected_outputs: ["result"] }),
      ],
    ],
    [
      "input-induced cyclic",
      [
        item({
          id: "first",
          required_inputs: ["second-output"],
          expected_outputs: ["first-output"],
        }),
        item({
          id: "second",
          required_inputs: ["first-output"],
          expected_outputs: ["second-output"],
        }),
      ],
    ],
    ["duplicate output", [item({ id: "first", expected_outputs: ["duplicate", "duplicate"] })]],
  ])("rejects a %s required input before persistence", async (_label, workItems) => {
    await expect(assertApplicable(proposal(workItems))).rejects.toThrow(
      "missing_dependency@work_items.required_inputs",
    );
  });
});
