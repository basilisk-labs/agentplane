import { describe, expect, it } from "vitest";

import type { TaskData } from "../../backends/task-backend.js";

import { assertEvaluatorQualityReviewPassed } from "./quality-review-gate.js";

function task(overrides: Partial<TaskData> = {}): TaskData {
  return {
    id: "T-1",
    title: "Title",
    description: "Description",
    status: "DOING",
    priority: "med",
    owner: "CODER",
    depends_on: [],
    tags: ["code"],
    verify: [],
    ...overrides,
  };
}

describe("EVALUATOR quality review gate", () => {
  it("rejects missing quality review", () => {
    expect(() => {
      try {
        assertEvaluatorQualityReviewPassed({
          task: task(),
          expectedSha: "head",
          command: "finish",
        });
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        expect(message).toContain("quality_review=missing");
        expect(message).toContain("quality_review_required");
        expect(message).not.toContain("--verdict pass");
        throw error;
      }
    }).toThrow(/quality_review=missing/);
  });

  it("rejects non-pass or unprovenanced reviews", () => {
    expect(() =>
      assertEvaluatorQualityReviewPassed({
        task: task({
          quality_review: {
            state: "rework",
            updated_at: "2026-02-09T00:00:00.000Z",
            updated_by: "CODER",
            note: "Self-reviewed",
            evaluated_sha: "head",
            blueprint_digest: "digest",
            evidence_refs: [],
            findings: [],
          },
        }),
        expectedSha: "head",
        command: "integrate",
      }),
    ).toThrow(/quality_review.state=pass from an EVALUATOR or an explicit HUMAN record/);
  });

  it("rejects stale evaluated commits", () => {
    expect(() =>
      assertEvaluatorQualityReviewPassed({
        task: task({
          quality_review: {
            state: "pass",
            updated_at: "2026-02-09T00:00:00.000Z",
            updated_by: "EVALUATOR",
            note: "Looks good",
            evaluated_sha: "old",
            blueprint_digest: "digest",
            evidence_refs: [".agentplane/tasks/T-1/quality/run/quality-report.json"],
            findings: [],
          },
        }),
        expectedSha: "head",
        command: "finish",
      }),
    ).toThrow(/fresh EVALUATOR quality review/);
  });

  it("rejects missing evaluated commit when a commit is expected", () => {
    expect(() =>
      assertEvaluatorQualityReviewPassed({
        task: task({
          quality_review: {
            state: "pass",
            updated_at: "2026-02-09T00:00:00.000Z",
            updated_by: "EVALUATOR",
            note: "Looks good",
            evaluated_sha: null,
            blueprint_digest: "digest",
            evidence_refs: [".agentplane/tasks/T-1/quality/run/quality-report.json"],
            findings: [],
          },
        }),
        expectedSha: "head",
        command: "integrate",
      }),
    ).toThrow(/fresh EVALUATOR quality review/);
  });

  it("rejects missing blueprint digest when a digest is expected", () => {
    expect(() =>
      assertEvaluatorQualityReviewPassed({
        task: task({
          quality_review: {
            state: "pass",
            updated_at: "2026-02-09T00:00:00.000Z",
            updated_by: "EVALUATOR",
            note: "Looks good",
            evaluated_sha: "head",
            blueprint_digest: null,
            evidence_refs: [".agentplane/tasks/T-1/quality/run/quality-report.json"],
            findings: [],
          },
        }),
        expectedSha: "head",
        expectedBlueprintDigest: "digest",
        command: "finish",
      }),
    ).toThrow(/current blueprint snapshot/);
  });

  it("rejects pass reviews without a structured quality report", () => {
    expect(() =>
      assertEvaluatorQualityReviewPassed({
        task: task({
          quality_review: {
            state: "pass",
            updated_at: "2026-02-09T00:00:00.000Z",
            updated_by: "EVALUATOR",
            note: "Looks good",
            evaluated_sha: "head",
            blueprint_digest: "digest",
            evidence_refs: [".agentplane/tasks/T-1/README.md"],
            findings: ["Reviewed scope and evidence."],
          },
        }),
        expectedSha: "head",
        expectedBlueprintDigest: "digest",
        command: "finish",
      }),
    ).toThrow(/structured semantic quality report/);
  });

  it("rejects pass reviews without findings", () => {
    expect(() =>
      assertEvaluatorQualityReviewPassed({
        task: task({
          quality_review: {
            state: "pass",
            updated_at: "2026-02-09T00:00:00.000Z",
            updated_by: "EVALUATOR",
            note: "Looks good",
            evaluated_sha: "head",
            blueprint_digest: "digest",
            evidence_refs: [".agentplane/tasks/T-1/quality/run/quality-report.json"],
            findings: [],
          },
        }),
        expectedSha: "head",
        expectedBlueprintDigest: "digest",
        command: "finish",
      }),
    ).toThrow(/non-empty semantic findings/);
  });

  it("accepts a fresh EVALUATOR pass", () => {
    expect(() =>
      assertEvaluatorQualityReviewPassed({
        task: task({
          quality_review: {
            state: "pass",
            updated_at: "2026-02-09T00:00:00.000Z",
            updated_by: "EVALUATOR",
            note: "Looks good",
            evaluated_sha: "head",
            blueprint_digest: "digest",
            evidence_refs: [
              ".agentplane/tasks/T-1/README.md",
              ".agentplane/tasks/T-1/quality/run/quality-report.json",
            ],
            findings: ["Reviewed scope, diff, verification evidence, and residual risk."],
          },
        }),
        expectedSha: "head",
        expectedBlueprintDigest: "digest",
        command: "finish",
      }),
    ).not.toThrow();
  });

  it("accepts a fresh explicitly human-supplied pass", () => {
    expect(() =>
      assertEvaluatorQualityReviewPassed({
        task: task({
          quality_review: {
            state: "pass",
            provenance: "human_supplied",
            updated_at: "2026-02-09T00:00:00.000Z",
            updated_by: "HUMAN",
            note: "Human accepted the reviewed result.",
            evaluated_sha: "head",
            blueprint_digest: "digest",
            evidence_refs: [
              ".agentplane/tasks/T-1/README.md",
              ".agentplane/tasks/T-1/quality/run/quality-report.json",
            ],
            findings: ["The human reviewer supplied this semantic finding."],
          },
        }),
        expectedSha: "head",
        expectedBlueprintDigest: "digest",
        command: "finish",
      }),
    ).not.toThrow();
  });

  it("rejects a HUMAN reviewer without explicit human provenance", () => {
    expect(() =>
      assertEvaluatorQualityReviewPassed({
        task: task({
          quality_review: {
            state: "pass",
            updated_at: "2026-02-09T00:00:00.000Z",
            updated_by: "HUMAN",
            note: "Missing provenance.",
            evaluated_sha: "head",
            blueprint_digest: "digest",
            evidence_refs: [".agentplane/tasks/T-1/quality/run/quality-report.json"],
            findings: ["The record has no explicit provenance."],
          },
        }),
        expectedSha: "head",
        expectedBlueprintDigest: "digest",
        command: "finish",
      }),
    ).toThrow(/quality_review.provenance=legacy_or_missing/);
  });
});
