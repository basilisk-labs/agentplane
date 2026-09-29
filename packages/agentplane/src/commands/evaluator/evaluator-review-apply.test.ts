import { describe, expect, it } from "vitest";

import { evaluatorReviewAllowsCanonicalProjection } from "./evaluator-review-apply.js";

describe("evaluator review compatibility projection", () => {
  it("enables compatibility projection only for canonical Kernel tasks", () => {
    expect(evaluatorReviewAllowsCanonicalProjection({ extensions: undefined })).toBe(false);
    expect(
      evaluatorReviewAllowsCanonicalProjection({
        extensions: { task_kernel: { kind: "canonical_task" } },
      }),
    ).toBe(true);
  });
});
