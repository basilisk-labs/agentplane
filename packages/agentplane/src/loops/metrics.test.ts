import { describe, expect, it } from "vitest";

import { aggregateLoopMetricScores } from "./metrics.js";

describe("loop metrics", () => {
  it("aggregates weighted scores and threshold failures", () => {
    const aggregate = aggregateLoopMetricScores(
      [
        { id: "verification_score", source: "check", weight: 0.5, threshold: 0.8 },
        { id: "diff_scope_score", source: "rule", weight: 0.3, threshold: 0.7 },
        { id: "policy_compliance_score", source: "rule", weight: 0.2, threshold: 1 },
      ],
      {
        verification_score: 0.9,
        diff_scope_score: 0.6,
        policy_compliance_score: true,
      },
    );

    expect(aggregate.normalized).toBe(0.83);
    expect(aggregate.failedThresholds).toEqual(["diff_scope_score"]);
    expect(aggregate.missingRequired).toEqual([]);
  });

  it("tracks required missing signals without inventing score", () => {
    const aggregate = aggregateLoopMetricScores(
      [
        { id: "verification_score", source: "check", required: true },
        { id: "iteration_progress_score", source: "aggregate", weight: 2 },
      ],
      { iteration_progress_score: 0.5 },
    );

    expect(aggregate.scores.find((score) => score.id === "verification_score")?.missing).toBe(true);
    expect(aggregate.missingRequired).toEqual(["verification_score"]);
    expect(aggregate.normalized).toBe(0.333333);
  });
});
