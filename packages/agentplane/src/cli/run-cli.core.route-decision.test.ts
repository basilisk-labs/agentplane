import { execFile } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

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

const execFileAsync = promisify(execFile);

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

  it("does not treat task-local artifact commits as stale PR metadata", async () => {
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

    const branch = `task/${taskId}/route-decision`;
    await execFileAsync("git", ["checkout", "-b", branch], { cwd: root });
    await writeFile(path.join(root, "impl.txt"), "implementation\n");
    await execFileAsync("git", ["add", "impl.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "feat: implementation"], { cwd: root });
    const { stdout: implementationHead } = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: root,
    });

    const prDir = path.join(root, ".agentplane", "tasks", taskId, "pr");
    await mkdir(prDir, { recursive: true });
    await writeFile(
      path.join(prDir, "meta.json"),
      `${JSON.stringify(
        {
          base: "main",
          branch,
          created_at: "2026-01-01T00:00:00.000Z",
          head_sha: implementationHead.trim(),
          schema_version: 1,
          status: "OPEN",
          task_id: taskId,
          updated_at: "2026-01-01T00:00:00.000Z",
        },
        null,
        2,
      )}\n`,
    );
    const readmePath = path.join(root, ".agentplane", "tasks", taskId, "README.md");
    const readme = await readFile(readmePath, "utf8");
    await writeFile(readmePath, `${readme}\n<!-- task-local artifact refresh -->\n`);
    await execFileAsync("git", ["add", `.agentplane/tasks/${taskId}`], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "task: refresh artifacts"], { cwd: root });

    const statusIo = captureStdIO();
    try {
      const code = await runCli(["task", "status", taskId, "--route", "--json", "--root", root]);
      expect(code).toBe(0);
      const parsed = JSON.parse(statusIo.stdout) as {
        blockers: { code: string }[];
      };
      expect(parsed.blockers.map((blocker) => blocker.code)).not.toContain("pr_meta_stale");
    } finally {
      statusIo.restore();
    }
  });
});
