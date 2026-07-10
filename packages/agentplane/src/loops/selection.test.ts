import { describe, expect, it } from "vitest";

import { getLoop } from "./registry.js";
import { planLoopForInput, scoreLoopCandidate } from "./selection.js";

describe("loop selection eligibility", () => {
  it("rejects a high-scoring loop when a hard requirement is not proven", () => {
    const loop = getLoop("tdd.fix");
    if (!loop) throw new Error("missing tdd.fix loop");
    const candidate = scoreLoopCandidate(loop, {
      tags: ["bug", "test"],
      taskKind: "code",
      workflowMode: "branch_pr",
      verifyStepsPresent: true,
      approvedPlan: false,
    });

    expect(candidate.eligible).toBe(false);
    expect(candidate.total).toBe(0);
    expect(candidate.rejectedReasons).toContain("loop requires approved plan");
  });

  it("selects ci.repair only when hosted PR and CI failure facts are present", () => {
    const withoutFacts = planLoopForInput({
      input: {
        tags: ["ci", "repair"],
        taskKind: "code",
        workflowMode: "branch_pr",
        approvedPlan: true,
      },
    });
    expect(withoutFacts.selected?.loopId).not.toBe("ci.repair");

    const withFacts = planLoopForInput({
      input: {
        tags: ["ci", "repair"],
        taskKind: "code",
        workflowMode: "branch_pr",
        approvedPlan: true,
        hostedPr: true,
        ciFailure: true,
      },
    });
    expect(withFacts.selected?.loopId).toBe("ci.repair");
    expect(withFacts.selected?.eligible).toBe(true);
  });
});
