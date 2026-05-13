import { describe } from "vitest";

import {
  captureStdIO,
  commitAll,
  defaultConfig,
  expect,
  it,
  mkdir,
  mkGitRepoRoot,
  path,
  runCli,
  seedTaskQueryFixture,
  useRunCliIntegrationHarness,
  writeConfig,
  writeFile,
} from "@agentplane/testkit/cli-core-tasks-query";

useRunCliIntegrationHarness();

describe("runCli branch_pr task list state", () => {
  it("surfaces merged branch_pr artifacts as pending close instead of ordinary TODO", async () => {
    const root = await mkGitRepoRoot();
    const taskId = "202605130001-MERGED";
    await seedTaskQueryFixture(root, [
      {
        id: taskId,
        title: "Merged branch_pr task",
        description: "Local projection has not caught hosted close yet",
        status: "TODO",
        priority: "high",
        owner: "CODER",
        depends_on: [],
        tags: ["code", "workflow"],
        verify: [],
      },
    ]);
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    const prDir = path.join(root, ".agentplane", "tasks", taskId, "pr");
    await mkdir(prDir, { recursive: true });
    await writeFile(
      path.join(prDir, "meta.json"),
      JSON.stringify(
        {
          schema_version: 1,
          task_id: taskId,
          base: "main",
          branch: `task/${taskId}/merged-state`,
          created_at: "2026-05-13T00:00:00.000Z",
          updated_at: "2026-05-13T00:05:00.000Z",
          status: "MERGED",
          merged_at: "2026-05-13T00:05:00.000Z",
          merge_commit: "abcdef1234567890abcdef1234567890abcdef12",
          head_sha: "1234567890abcdef1234567890abcdef12345678",
          pr_number: 3645,
          pr_url: "https://github.com/example/repo/pull/3645",
        },
        null,
        2,
      ),
      "utf8",
    );
    await commitAll(root, "initial branch_pr fixture");

    const ioList = captureStdIO();
    try {
      const code = await runCli(["task", "list", "--root", root]);
      expect(code).toBe(0);
      expect(ioList.stdout).toContain(`${taskId} [MERGED->DONE?]`);
      expect(ioList.stdout).toContain("branch_pr=merged_pending_close");
      expect(ioList.stdout).toContain("pr=#3645");
      expect(ioList.stdout).toContain("next=task-normalize-sync-hosted-merges");
      expect(ioList.stdout).toContain("Total: 1 (MERGED_PENDING_CLOSE=1)");
      expect(ioList.stdout).not.toContain("[TODO]");
    } finally {
      ioList.restore();
    }

    const ioTodo = captureStdIO();
    try {
      const code = await runCli(["task", "list", "--status", "TODO", "--root", root]);
      expect(code).toBe(0);
      expect(ioTodo.stdout).toBe("Total: 0\n");
    } finally {
      ioTodo.restore();
    }

    const ioMerged = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "list",
        "--status",
        "MERGED_PENDING_CLOSE",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(ioMerged.stdout).toContain(`${taskId} [MERGED->DONE?]`);
    } finally {
      ioMerged.restore();
    }

    const ioNext = captureStdIO();
    try {
      const code = await runCli(["task", "next", "--root", root]);
      expect(code).toBe(0);
      expect(ioNext.stdout).toBe("Ready: 0 / 0\n");
    } finally {
      ioNext.restore();
    }
  });
});
