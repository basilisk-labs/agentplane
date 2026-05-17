import { readFile } from "node:fs/promises";
import path from "node:path";

import { describe, expect, it } from "vitest";

const WORKFLOW_PATH = path.resolve(process.cwd(), ".github/workflows/task-hosted-close.yml");

describe("Task hosted-close workflow contract", () => {
  it("runs on merged pull_request_target close events and opens a follow-up closure PR", async () => {
    const workflow = await readFile(WORKFLOW_PATH, "utf8");

    expect(workflow).toContain("name: Task Hosted Close");
    expect(workflow).toContain("pull_request_target:");
    expect(workflow).toContain("types:");
    expect(workflow).toContain("- closed");
    expect(workflow).toContain("if: github.event.pull_request.merged == true");
    expect(workflow).toContain("contents: write");
    expect(workflow).toContain("pull-requests: write");
    expect(workflow).toContain("fetch-depth: 0");
    expect(workflow).toContain("node scripts/prepare-hosted-task-closure.mjs");
    expect(workflow).not.toContain("pull/${{ steps.prepare.outputs.pr_number }}/head");
    expect(workflow).toContain("task hosted-close");
    expect(workflow).toContain("gh pr create");
    expect(workflow).toContain('if gh pr merge --merge --delete-branch "$pr_url"; then');
    expect(workflow).toContain("gh pr merge --auto --merge --delete-branch");
    expect(workflow).not.toContain("gh pr merge --squash");
    expect(workflow).toContain(
      "Hosted closure PR created but neither direct merge nor auto-merge could be enabled",
    );
    expect(workflow).toContain("GIT_AUTHOR_NAME: DEUS");
    expect(workflow).toContain("GIT_AUTHOR_EMAIL: deus@agentplane.org");
    expect(workflow).toContain("GIT_COMMITTER_NAME: DEUS");
    expect(workflow).toContain("GIT_COMMITTER_EMAIL: deus@agentplane.org");
    expect(workflow).not.toContain("agentplane-bot@example.com");
    expect(workflow).not.toContain("GIT_AUTHOR_NAME: agentplane-bot");
  });
});
