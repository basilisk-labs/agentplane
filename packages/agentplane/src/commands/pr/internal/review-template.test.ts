import { describe, expect, it } from "vitest";

import type { TaskData } from "../../../backends/task-backend.js";
import {
  renderGithubPrBody,
  renderPrReviewDocument,
  validateReviewContents,
} from "./review-template.js";

function makeTask(): TaskData {
  return {
    id: "202601010101-ABCDE",
    title: "Batch metadata",
    status: "DOING",
    priority: "high",
    owner: "CODER",
    depends_on: [],
    tags: ["code"],
    verify: [],
    created_at: "2026-01-27T00:00:00Z",
    updated_at: "2026-01-27T00:00:00Z",
    created_by: "CODER",
    updated_by: "CODER",
  };
}

describe("review-template batch rendering", () => {
  it("renders review.md as a compact index to the canonical task record", () => {
    const review = renderPrReviewDocument({
      task: makeTask(),
      createdAt: "2026-01-27T00:00:00Z",
      branch: "task/202601010101-ABCDE/batch-metadata",
      autoSummary: "No changes detected.",
    });
    const errors: string[] = [];

    validateReviewContents(review, errors);

    expect(errors).toEqual([]);
    expect(review).toContain("## Task");
    expect(review).toContain("- Task: `202601010101-ABCDE`");
    expect(review).toContain("- Branch: `task/202601010101-ABCDE/batch-metadata`");
    expect(review).toContain(
      "- Canonical task record: `.agentplane/tasks/202601010101-ABCDE/README.md`",
    );
    expect(review).toContain("## Verification");
    expect(review).toContain("## Handoff Notes");
    expect(review).not.toContain("## Scope");
    expect(review).not.toContain("## Risks");
  });

  it("keeps legacy review.md artifacts valid during migration", () => {
    const legacyReview = [
      "## Summary",
      "Legacy summary",
      "## Scope",
      "Legacy scope",
      "## Verification",
      "Legacy verification",
      "## Risks",
      "Legacy risks",
      "## Handoff Notes",
      "Legacy notes",
      "<!-- BEGIN AUTO SUMMARY -->",
      "Raw evidence",
      "<!-- END AUTO SUMMARY -->",
    ].join("\n");
    const errors: string[] = [];

    validateReviewContents(legacyReview, errors);

    expect(errors).toEqual([]);
  });

  it("renders included task ids as an explicit branch_pr batch", () => {
    const review = renderPrReviewDocument({
      task: makeTask(),
      createdAt: "2026-01-27T00:00:00Z",
      branch: "task/202601010101-ABCDE/batch-metadata",
      relatedTaskIds: ["202601010102-BBBBB"],
      autoSummary: "No changes detected.",
    });
    const githubBody = renderGithubPrBody({
      task: makeTask(),
      relatedTaskIds: ["202601010102-BBBBB"],
      autoSummary: "No changes detected.",
    });

    for (const text of [review, githubBody]) {
      expect(text).toContain("## Batch Tasks");
      expect(text).toContain("- Primary: `202601010101-ABCDE`");
      expect(text).toContain("- Closure policy: `all_or_fail`");
      expect(text).toContain("- Included: `202601010102-BBBBB`");
    }
  });
});
