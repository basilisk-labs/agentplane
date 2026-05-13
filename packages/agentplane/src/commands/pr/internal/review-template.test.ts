import { describe, expect, it } from "vitest";

import type { TaskData } from "../../../backends/task-backend.js";
import {
  renderGithubPrBody,
  renderPrReviewDocument,
  validateGithubPrBodyContents,
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

  it("renders github-body.md as a minimal hosted projection without empty handoff notes", () => {
    const body = renderGithubPrBody({
      task: makeTask(),
      autoSummary: "<details><summary>Raw evidence</summary></details>",
    });
    const errors: string[] = [];

    validateGithubPrBodyContents(body, errors);

    expect(errors).toEqual([]);
    expect(body).toContain(
      "Canonical task record: `.agentplane/tasks/202601010101-ABCDE/README.md`",
    );
    expect(body).toContain("## Summary");
    expect(body).toContain("## Scope");
    expect(body).toContain("## Verification");
    expect(body).toContain("- Canonical workflow state lives in the task README.");
    expect(body).not.toContain("## Handoff Notes");
    expect(body).not.toContain("No handoff notes recorded yet");
  });

  it("includes github-body.md handoff notes only when notes exist", () => {
    const body = renderGithubPrBody({
      task: makeTask(),
      handoffNotes: [
        {
          schema_version: 1,
          created_at: "2026-01-27T00:00:00.000Z",
          author: "CODER",
          body: "Ready for review.",
        },
      ],
      autoSummary: "<details><summary>Raw evidence</summary></details>",
    });

    expect(body).toContain("## Handoff Notes");
    expect(body).toContain("- 2026-01-27T00:00:00Z CODER: Ready for review.");
  });

  it("includes optional bounded reviewer_summary without replacing canonical sections", () => {
    const task = {
      ...makeTask(),
      extensions: {
        reviewer_summary:
          "Reviewer observed that the implementation stays inside the approved task scope and verification passed.",
      },
    };
    const review = renderPrReviewDocument({
      task,
      createdAt: "2026-01-27T00:00:00Z",
      branch: "task/202601010101-ABCDE/batch-metadata",
      autoSummary: "No changes detected.",
    });
    const githubBody = renderGithubPrBody({
      task,
      autoSummary: "<details><summary>Raw evidence</summary></details>",
    });

    for (const text of [review, githubBody]) {
      expect(text).toContain("## Reviewer Summary");
      expect(text).toContain("implementation stays inside the approved task scope");
      expect(text).toContain("## Verification");
    }
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
