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
    expect(() =>
      assertEvaluatorQualityReviewPassed({
        task: task(),
        expectedSha: "head",
        command: "finish",
      }),
    ).toThrow(/quality_review=missing/);
  });

  it("rejects non-pass or non-EVALUATOR reviews", () => {
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
    ).toThrow(/quality_review.state=pass by EVALUATOR/);
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
    ).toThrow(/structured EVALUATOR quality report/);
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
    ).toThrow(/non-empty EVALUATOR findings/);
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
});
