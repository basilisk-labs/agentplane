import { describe, expect, it } from "vitest";
import type { TaskData } from "../../backends/task-backend.js";

import { qualityReportEvidenceState, summarizeEvidenceRows } from "./evidence-check.command.js";

type QualityReview = NonNullable<TaskData["quality_review"]>;

function review(overrides: Partial<QualityReview> = {}): QualityReview {
  return {
    state: "pass",
    provenance: "evaluator_supplied",
    updated_at: "2026-07-22T00:00:00.000Z",
    updated_by: "EVALUATOR",
    note: "Reviewed",
    evaluated_sha: "a".repeat(40),
    blueprint_digest: "b".repeat(64),
    evidence_refs: [".agentplane/tasks/T/quality/run/quality-report.json"],
    findings: ["No blocking findings after semantic review."],
    ...overrides,
  };
}

function expectMissingReason(result: { state: string; reason: string }, text: string): void {
  expect(result.state).toBe("missing");
  expect(result.reason).toContain(text);
}

describe("task evidence check summary", () => {
  it("treats unchecked evidence kinds as blocking", () => {
    expect(
      summarizeEvidenceRows([{ state: "present" }, { state: "unknown" }, { state: "missing" }]),
    ).toEqual({
      ok: false,
      missing_count: 1,
      unknown_count: 1,
      blocking_count: 2,
    });
  });

  it("passes only when every required evidence row is present", () => {
    expect(summarizeEvidenceRows([{ state: "present" }, { state: "present" }])).toEqual({
      ok: true,
      missing_count: 0,
      unknown_count: 0,
      blocking_count: 0,
    });
  });

  it("accepts explicit evaluator, explicit human, and legacy evaluator quality reports", () => {
    expect(qualityReportEvidenceState(review()).state).toBe("present");
    expect(
      qualityReportEvidenceState(review({ provenance: "human_supplied", updated_by: "HUMAN" }))
        .state,
    ).toBe("present");
    expect(
      qualityReportEvidenceState(review({ provenance: undefined, updated_by: "EVALUATOR" })).state,
    ).toBe("present");
  });

  it("rejects missing or inconsistent provenance before strict evidence can pass", () => {
    expectMissingReason(
      qualityReportEvidenceState(review({ provenance: undefined, updated_by: "CODER" })),
      "provenance",
    );
    expectMissingReason(
      qualityReportEvidenceState(review({ provenance: "human_supplied", updated_by: "EVALUATOR" })),
      "provenance",
    );
    expectMissingReason(
      qualityReportEvidenceState(review({ provenance: "evaluator_supplied", updated_by: "HUMAN" })),
      "provenance",
    );
  });

  it("requires the structured report reference and semantic findings", () => {
    expectMissingReason(
      qualityReportEvidenceState(review({ evidence_refs: [] })),
      "quality-report.json",
    );
    expectMissingReason(qualityReportEvidenceState(review({ findings: [] })), "findings");
  });
});
