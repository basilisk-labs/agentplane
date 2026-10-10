import { describe, expect, it } from "vitest";
import { aggregate, manifest, runtime, validation, resultDigest } from "./kernel.test-fixtures.js";
import { kernelDigest } from "./digest.js";
import { reconcileReplannedWorkItems } from "./replan-work-items.js";
import type { PlanRecord } from "./model.js";

function fixture() {
  const completed = {
    ...runtime("COMPLETED"),
    result_digest: resultDigest,
    output_manifests: [manifest()],
    validation: validation(resultDigest),
  };
  const consumer = {
    ...runtime("BLOCKED"),
    definition: {
      ...completed.definition,
      id: "consumer",
      depends_on: ["kernel"],
      required_inputs: ["kernel-source"],
      expected_outputs: ["consumer-output"],
    },
  };
  const state = aggregate({
    work_items: { kernel: completed, consumer },
    current_plan: {
      ...aggregate().current_plan!,
      state: "REJECTED",
      work_items: [completed.definition, consumer.definition],
    },
  });
  const prep = {
    ...consumer.definition,
    id: "prep",
    depends_on: ["kernel"],
    expected_outputs: ["prep-output"],
  };
  const proposed: PlanRecord = {
    ...state.current_plan!,
    revision: 2,
    state: "PROPOSED",
    work_items: [
      completed.definition,
      prep,
      { ...consumer.definition, depends_on: ["kernel", "prep"] },
    ],
  };
  return {
    state,
    proposed: {
      ...proposed,
      digest: kernelDigest({ revision: proposed.revision, work_items: proposed.work_items }),
    },
    completed,
  };
}

describe("scope replan runtime preservation", () => {
  it("preserves accepted producer evidence and initializes only new or changed unfinished work", () => {
    const { state, proposed, completed } = fixture();
    const next = reconcileReplannedWorkItems(state, proposed);
    expect(next.issues).toEqual([]);
    expect(next.workItems.kernel).toBe(completed);
    expect(next.workItems.consumer).toMatchObject({
      state: "PLANNED",
      attempt: 1,
      result_digest: null,
    });
    expect(next.workItems.prep).toMatchObject({ state: "PLANNED", attempt: 0 });
    expect(state.work_items.consumer!.state).toBe("BLOCKED");
  });
  it.each(["change", "remove"])("rejects %s of completed work", (action) => {
    const { state, proposed } = fixture();
    const work_items =
      action === "remove"
        ? proposed.work_items.slice(1)
        : proposed.work_items.map((item) =>
            item.id === "kernel" ? { ...item, optional: true } : item,
          );
    expect(reconcileReplannedWorkItems(state, { ...proposed, work_items }).issues).not.toEqual([]);
  });
  it("rejects a new active execution or mismatched runtime definition", () => {
    const { state, proposed } = fixture();
    expect(
      reconcileReplannedWorkItems(
        {
          ...state,
          work_items: {
            ...state.work_items,
            consumer: { ...state.work_items.consumer!, state: "EXECUTING" },
          },
        },
        proposed,
      ).issues,
    ).not.toEqual([]);
    expect(
      reconcileReplannedWorkItems(
        {
          ...state,
          work_items: {
            ...state.work_items,
            kernel: {
              ...state.work_items.kernel!,
              definition: { ...state.work_items.kernel!.definition, optional: true },
            },
          },
        },
        proposed,
      ).issues,
    ).not.toEqual([]);
  });
});
