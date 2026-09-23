import { describe, expect, it } from "vitest";

import {
  canonicalEvaluatorPassProjection,
  evaluatorReviewAllowsCanonicalProjection,
} from "./evaluator-review-apply.js";

describe("evaluator review compatibility projection", () => {
  it("enables compatibility projection only for canonical Kernel tasks", () => {
    expect(evaluatorReviewAllowsCanonicalProjection({ extensions: undefined })).toBe(false);
    expect(
      evaluatorReviewAllowsCanonicalProjection({
        extensions: { task_kernel: { kind: "canonical_task" } },
      }),
    ).toBe(true);
  });

  it("refreshes canonical implementation identity from a passing evaluator review", () => {
    const task = {
      extensions: {
        task_kernel: { kind: "canonical_task" },
        implementation_commit: { hash: "old", message: "old" },
      },
    };

    expect(
      canonicalEvaluatorPassProjection({
        task,
        verdict: "pass",
        evaluatedSha: "a".repeat(40),
      }),
    ).toEqual({
      commit: {
        hash: "a".repeat(40),
        message: "AgentPlane-owned canonical implementation commit",
      },
      extensions: {
        ...task.extensions,
        implementation_commit: {
          hash: "a".repeat(40),
          message: "AgentPlane-owned canonical implementation commit",
        },
      },
    });
    expect(
      canonicalEvaluatorPassProjection({ task, verdict: "human_review", evaluatedSha: "head" }),
    ).toBeNull();
  });
});
