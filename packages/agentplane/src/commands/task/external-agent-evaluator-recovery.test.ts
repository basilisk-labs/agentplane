import { describe, expect, it } from "vitest";

import type { ExternalAgentExchange } from "./external-agent-exchange.js";
import { isStaleUnappliedEvaluatorCandidate } from "./external-agent-evaluator-recovery.js";

const oldFingerprint = `sha256:${"a".repeat(64)}`;
const currentFingerprint = `sha256:${"b".repeat(64)}`;
const candidate = {
  purpose: "quality_review",
  role: "EVALUATOR",
  status: "result_received",
  state_fingerprint: oldFingerprint,
} as ExternalAgentExchange;

describe("evaluator retirement eligibility", () => {
  it.each(["issued", "result_received"] as const)(
    "requires an exact freshness change for %s",
    (status) => {
      const exchange = { ...candidate, status };
      expect(isStaleUnappliedEvaluatorCandidate(exchange, oldFingerprint)).toBe(false);
      expect(isStaleUnappliedEvaluatorCandidate(exchange, currentFingerprint)).toBe(true);
    },
  );

  it.each(["prepared", "accepted", "consumed", "retired"] as const)(
    "does not retire a %s exchange",
    (status) => {
      expect(isStaleUnappliedEvaluatorCandidate({ ...candidate, status }, currentFingerprint)).toBe(
        false,
      );
    },
  );

  it.each(["planning", "implementation", "verification", "task_worktree_resolution"] as const)(
    "does not replace %s authority with evaluator recovery",
    (purpose) => {
      expect(
        isStaleUnappliedEvaluatorCandidate({ ...candidate, purpose }, currentFingerprint),
      ).toBe(false);
    },
  );

  it("requires the original evaluator role", () => {
    expect(
      isStaleUnappliedEvaluatorCandidate({ ...candidate, role: "EXECUTOR" }, currentFingerprint),
    ).toBe(false);
  });
});
