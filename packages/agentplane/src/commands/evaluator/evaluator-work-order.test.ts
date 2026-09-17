import { describe, expect, it } from "vitest";

import { evaluatorWorkOrderReviewDigest, readWorkOrder } from "./evaluator-work-order.js";

const digest = `sha256:${"a".repeat(64)}`;

function common() {
  return {
    kind: "evaluator_work_order",
    work_order_id: "review-1",
    prepared_at: "2026-09-17T00:00:00.000Z",
    task: {
      id: "T-1",
      revision: 7,
      objective: "Review the implementation",
      acceptance_criteria: ["Tests pass"],
    },
    evaluated_sha: "1".repeat(40),
    evaluator: { id: "default", profile: "quality", prompt_module_path: "policy.md" },
    authority: {
      sandbox: "read-only",
      writable_roots: [],
      allowed_tool_classes: ["repository_read"],
      external_side_effects: [],
    },
    result_contract: "sgr.evaluator_result.v1",
  };
}

function evidence(kind: "blueprint" | "plan") {
  return ["task_document", "actual_diff", kind].map((entry, index) => ({
    id: `e-${index}`,
    kind: entry,
    path: `evidence/${index}.json`,
    sha256: digest,
    required: true,
  }));
}

describe("EvaluatorWorkOrder compatibility", () => {
  it("cold-reads legacy v1 Blueprint work orders", () => {
    const order = readWorkOrder({
      ...common(),
      schema_version: 1,
      blueprint_digest: digest,
      evidence: evidence("blueprint"),
    });

    expect(order.schema_version).toBe(1);
    expect(evaluatorWorkOrderReviewDigest(order)).toBe(digest);
  });

  it("reads native v2 work orders and rejects unknown versions", () => {
    const reviewIdentity = {
      schema_version: 1,
      kind: "agentplane.native_quality_review_identity",
      task_id: "T-1",
      plan_digest: digest,
      policy_digest: digest,
      capability_digest: digest,
      checks_digest: digest,
      verification_input_digest: digest,
      acceptance_digest: digest,
      implementation_sha: "1".repeat(40),
      digest,
    };
    const order = readWorkOrder({
      ...common(),
      schema_version: 2,
      review_identity: reviewIdentity,
      evidence: evidence("plan"),
    });

    expect(order.schema_version).toBe(2);
    expect(evaluatorWorkOrderReviewDigest(order)).toBe(digest);
    expect(() => readWorkOrder({ ...order, schema_version: 3 })).toThrow(
      /Invalid EvaluatorWorkOrder/u,
    );
  });
});
