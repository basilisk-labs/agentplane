import { describe, expect, it } from "vitest";

import { resolvePlanningObligation, type PlanningObligationFacts } from "./policy.js";

const supplied: PlanningObligationFacts = {
  policy: { allow_supplied_plan: true, require_planner: false },
  plan: { origin: "supplied", semantic_resolution: "resolved", freshness: "current" },
  attempt: { outcome: "not_attempted", freshness: "missing" },
};

describe("formal planning obligations", () => {
  it("requires planning without a Plan or with unresolved or stale input", () => {
    for (const plan of [
      null,
      { ...supplied.plan!, semantic_resolution: "unresolved" as const },
      { ...supplied.plan!, freshness: "stale" as const },
    ]) {
      expect(resolvePlanningObligation({ ...supplied, plan })).toMatchObject({
        requirement: "required",
        status: "pending",
      });
    }
  });

  it("omits a separate episode only under explicit trusted policy", () => {
    expect(resolvePlanningObligation(supplied)).toMatchObject({
      requirement: "not_required",
      status: "not_required",
      reason_code: "supplied_plan_accepted",
      attempt: supplied.attempt,
    });
    for (const policy of [
      { allow_supplied_plan: false, require_planner: false },
      { allow_supplied_plan: true, require_planner: true },
    ]) {
      expect(resolvePlanningObligation({ ...supplied, policy })).toMatchObject({
        requirement: "required",
        status: "pending",
        reason_code: "planning_policy_required",
      });
    }
  });

  it("requires a current successful planning observation to satisfy mandatory planning", () => {
    const facts: PlanningObligationFacts = {
      ...supplied,
      policy: { allow_supplied_plan: false, require_planner: true },
      plan: { ...supplied.plan!, origin: "planner" },
    };
    for (const outcome of ["not_attempted", "pending", "failed"] as const) {
      expect(
        resolvePlanningObligation({ ...facts, attempt: { outcome, freshness: "current" } }),
      ).toMatchObject({ requirement: "required", status: "pending" });
    }
    for (const freshness of ["missing", "stale"] as const) {
      expect(
        resolvePlanningObligation({ ...facts, attempt: { outcome: "passed", freshness } }),
      ).toMatchObject({ requirement: "required", status: "pending" });
    }
    expect(
      resolvePlanningObligation({
        ...facts,
        attempt: { outcome: "passed", freshness: "current" },
      }),
    ).toMatchObject({ requirement: "required", status: "satisfied" });
  });

  it("retains a failed attempt even when a later supplied Plan needs no separate episode", () => {
    expect(
      resolvePlanningObligation({
        ...supplied,
        attempt: { outcome: "failed", freshness: "current" },
      }),
    ).toMatchObject({
      status: "not_required",
      attempt: { outcome: "failed", freshness: "current" },
    });
  });

  it("does not infer semantic sufficiency from proposal labels or risk flags", () => {
    const facts = {
      ...supplied,
      plan: null,
      title: "trivial safe change",
      tags: ["low-risk"],
      planning_required: false,
      approved_by: "USER",
    };
    expect(resolvePlanningObligation(facts).status).toBe("pending");
  });

  it("is deterministic, preserves inputs and returns immutable observations", () => {
    const input = structuredClone(supplied);
    const before = structuredClone(input);
    const first = resolvePlanningObligation(input);
    expect(resolvePlanningObligation(input)).toEqual(first);
    expect(input).toEqual(before);
    expect(Object.isFrozen(first)).toBe(true);
    expect(Object.isFrozen(first.attempt)).toBe(true);
    expect(first.attempt).not.toBe(input.attempt);
  });
});
