import { describe } from "vitest";

import {
  captureStdIO,
  defaultConfig,
  expect,
  it,
  mkGitRepoRootWithBranch,
  runCli,
  runCliSilent,
  writeConfig,
} from "@agentplane/testkit/cli-core-pr-flow";

async function createBranchPrTask(root: string): Promise<string> {
  const taskIo = captureStdIO();
  try {
    const code = await runCli([
      "task",
      "new",
      "--title",
      "Route decision task",
      "--description",
      "Exercise route decision commands for branch_pr recovery.",
      "--priority",
      "med",
      "--owner",
      "CODER",
      "--tag",
      "code",
      "--root",
      root,
    ]);
    expect(code).toBe(0);
    return taskIo.stdout.trim();
  } finally {
    taskIo.restore();
  }
}

describe("runCli route decision commands", () => {
  it("reports status, next action, work resume, and dry-run repair", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);

    const taskId = await createBranchPrTask(root);
    await runCliSilent([
      "task",
      "plan",
      "set",
      taskId,
      "--text",
      "Exercise route decision commands.",
      "--updated-by",
      "ORCHESTRATOR",
      "--root",
      root,
    ]);
    await runCliSilent(["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--root", root]);

    const statusIo = captureStdIO();
    try {
      const code = await runCli(["task", "status", taskId, "--route", "--root", root]);
      expect(code).toBe(0);
      expect(statusIo.stdout).toContain(`task:         ${taskId} TODO`);
      expect(statusIo.stdout).toContain("next_code:    start_or_recover_worktree");
      expect(statusIo.stdout).toContain("blocker:      missing_pr_branch");
    } finally {
      statusIo.restore();
    }

    const nextIo = captureStdIO();
    try {
      const code = await runCli(["task", "next-action", taskId, "--json", "--root", root]);
      expect(code).toBe(0);
      const parsed = JSON.parse(nextIo.stdout) as {
        next_action: { code: string; command: string };
      };
      expect(parsed.next_action.code).toBe("start_or_recover_worktree");
      expect(parsed.next_action.command).toContain(`agentplane work start ${taskId}`);
    } finally {
      nextIo.restore();
    }

    const resumeIo = captureStdIO();
    try {
      const code = await runCli(["work", "resume", taskId, "--root", root]);
      expect(code).toBe(0);
      expect(resumeIo.stdout).toContain("work resume");
      expect(resumeIo.stdout).toContain("repair_step:");
    } finally {
      resumeIo.restore();
    }

    const repairIo = captureStdIO();
    try {
      const code = await runCli(["flow", "repair", taskId, "--dry-run", "--root", root]);
      expect(code).toBe(0);
      expect(repairIo.stdout).toContain("flow repair");
      expect(repairIo.stdout).toContain("would_run:");
      expect(repairIo.stdout).toContain(`agentplane work start ${taskId}`);
    } finally {
      repairIo.restore();
    }
  });
});
