import { describe, expect, it } from "vitest";

import { validateSnapshotContents } from "./pr-artifact-snapshot.js";

const relPrDir = ".agentplane/tasks/T-1/pr";
const relMetaPath = ".agentplane/tasks/T-1/pr/meta.json";
const relDiffstatPath = ".agentplane/tasks/T-1/pr/diffstat.txt";
const relVerifyLogPath = ".agentplane/tasks/T-1/pr/verify.log";
const relReviewPath = ".agentplane/tasks/T-1/pr/review.md";
const relGithubTitlePath = ".agentplane/tasks/T-1/pr/github-title.txt";
const relGithubBodyPath = ".agentplane/tasks/T-1/pr/github-body.md";

function makeMetaText(): string {
  const now = "2026-05-01T00:00:00.000Z";
  const meta = {
    schema_version: 1,
    task_id: "T-1",
    branch: "task/branch",
    pr_number: null,
    pr_url: null,
    created_at: now,
    updated_at: now,
    status: null,
    artifact_state: null,
    artifact_state_reason: null,
    artifact_state_updated_at: now,
    merge_strategy: null,
    merged_at: null,
    merge_commit: null,
    last_verified_sha: null,
    last_verified_at: null,
    verify: { status: "skipped" },
    base: "main",
    head_sha: "abc123",
  };
  return JSON.stringify(meta, null, 2);
}

function makeTexts(
  overrides: {
    reviewText?: string;
    githubBodyText?: string;
    githubTitleText?: string;
  } = {},
): {
  metaText: string;
  diffstatText: string;
  verifyLogText: string;
  reviewText: string;
  githubTitleText: string;
  githubBodyText: string;
} {
  const englishBody = [
    "Task: `T-1`",
    "Title: Sample task",
    "",
    "## Summary",
    "- Sample summary.",
    "## Scope",
    "- Sample scope.",
    "## Verification",
    "- State: pending",
    "<details><summary>Raw evidence</summary></details>",
    "## Handoff Notes",
    "- No notes",
    "",
  ].join("\n");

  return {
    metaText: makeMetaText(),
    diffstatText: "A..B\n",
    verifyLogText: "",
    reviewText:
      overrides.reviewText ??
      [
        "# PR Review",
        "",
        "Created: NOW",
        "Branch: task/T-1",
        "",
        "## Summary",
        "- Sample summary.",
        "## Scope",
        "- Sample scope.",
        "## Verification",
        "- Not recorded yet.",
        "## Risks",
        "- Risk level: low",
        "## Handoff Notes",
        "- No notes",
      ].join("\n"),
    githubTitleText: overrides.githubTitleText ?? "task: Sample task [T-1]",
    githubBodyText: overrides.githubBodyText ?? englishBody,
  };
}

describe("validateSnapshotContents", () => {
  it("passes when artifacts language is not enforced", () => {
    const { meta, errors } = validateSnapshotContents({
      texts: makeTexts({
        reviewText:
          "## Summary\n- Пример без ограничения языка\n## Scope\n- Тест\n## Verification\n- State: pending\n## Risks\n- Risk level: low\n## Handoff Notes\n- No notes",
      }),
      relPrDir,
      relMetaPath,
      relDiffstatPath,
      relVerifyLogPath,
      relReviewPath,
      relGithubTitlePath,
      relGithubBodyPath,
      taskId: "T-1",
      artifactsLanguage: "any",
    });

    expect(meta).not.toBeNull();
    expect(errors).toHaveLength(0);
  });

  it("fails russian artifacts when language is en", () => {
    const { errors } = validateSnapshotContents({
      texts: makeTexts({
        reviewText:
          "## Summary\n- Проверка\n## Scope\n- ...\n## Verification\n- ...\n## Risks\n- Risk level: low\n## Handoff Notes\n- ...",
        githubTitleText: "task: Пример\n",
        githubBodyText:
          "Task: `T-1`\nTitle: Пример\n\n## Summary\n- ...\n## Scope\n- ...\n## Verification\n- ...\n<details><summary>Raw evidence</summary></details>\n## Handoff Notes\n- ...\n",
      }),
      relMetaPath,
      relDiffstatPath,
      relVerifyLogPath,
      relPrDir,
      relReviewPath,
      relGithubTitlePath,
      relGithubBodyPath,
      taskId: "T-1",
      artifactsLanguage: "en",
    });

    expect(errors).toContain("Non-English text in .agentplane/tasks/T-1/pr/review.md");
    expect(errors).toContain("Non-English text in .agentplane/tasks/T-1/pr/github-title.txt");
    expect(errors).toContain("Non-English text in .agentplane/tasks/T-1/pr/github-body.md");
  });
});
