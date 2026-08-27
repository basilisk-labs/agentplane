import { beforeEach, describe, expect, it, vi } from "vitest";

import { TASK_CENTRIC_EXTENSION_KEY } from "@agentplaneorg/core/tasks";

const mocks = vi.hoisted(() => ({ loadTask: vi.fn() }));
vi.mock("../shared/task-backend.js", () => ({ loadTaskFromContext: mocks.loadTask }));

import { isExternalPlanningResultApplied } from "./external-agent-planning-authority.js";

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
