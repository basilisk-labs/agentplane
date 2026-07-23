import { execFile } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
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
      "--allow-duplicate",
      "--root",
      root,
    ]);
    expect(code).toBe(0);
    return taskIo.stdout.trim();
  } finally {
    taskIo.restore();
  }
}

describe("runCli route decision open PR metadata", () => {
  it("routes an existing task worktree without PR metadata directly to pr open", async () => {
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
      "Publish the already-created task branch.",
      "--updated-by",
      "ORCHESTRATOR",
      "--root",
      root,
    ]);
    await runCliSilent(["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--root", root]);
    await execFileAsync("git", ["add", "."], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "seed task artifacts"], { cwd: root });
    const branch = `task/${taskId}/bootstrap-existing`;
    const worktreePath = path.join(
      root,
      ".agentplane",
      "worktrees",
      `${taskId}-bootstrap-existing`,
    );
    await mkdir(path.dirname(worktreePath), { recursive: true });
    await execFileAsync("git", ["worktree", "add", "-b", branch, worktreePath], { cwd: root });
    const { stdout: branches } = await execFileAsync(
      "git",
      ["branch", "--format=%(refname:short)"],
      { cwd: root },
    );
    expect(branches).toContain(branch);

    const nextIo = captureStdIO();
    try {
      const code = await runCli(["task", "next-action", taskId, "--json", "--root", root]);
      expect(code).toBe(0);
      const parsed = JSON.parse(nextIo.stdout) as {
        next_action: { code: string; command: string };
        route_oracle: {
          authoritativeCheckout: string;
          authoritativeCheckoutPath: string | null;
        };
      };
      expect(parsed.next_action).toMatchObject({
        code: "open_pr",
        command: `agentplane pr open ${taskId} --author CODER`,
      });
      expect(parsed.route_oracle.authoritativeCheckout).toBe("task_worktree");
      expect(parsed.route_oracle.authoritativeCheckoutPath).toContain(taskId);
    } finally {
      nextIo.restore();
    }
  });

  it("routes local open PR metadata to pre-merge closure without remote lookup", async () => {
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
      "Exercise local open PR routing.",
      "--updated-by",
      "ORCHESTRATOR",
      "--root",
      root,
    ]);
    await runCliSilent(["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--root", root]);
    await execFileAsync("git", ["add", "."], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "seed task workflow"], { cwd: root });

    const branch = `task/${taskId}/route-decision`;
    await execFileAsync("git", ["checkout", "-b", branch], { cwd: root });
    await writeFile(path.join(root, "impl.txt"), "implementation\n");
    await execFileAsync("git", ["add", "impl.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "feat: implementation"], { cwd: root });

    await runCliSilent([
      "task",
      "start-ready",
      taskId,
      "--author",
      "CODER",
      "--body",
      "Start: exercise local open PR routing through the branch_pr lifecycle.",
      "--root",
      root,
    ]);

    await runCliSilent([
      "verify",
      taskId,
      "--ok",
      "--by",
      "CODER",
      "--note",
      "Implementation verified for local open PR routing.",
      "--root",
      root,
    ]);
    await runCliSilent([
      "evaluator",
      "run",
      taskId,
      "--provenance",
      "evaluator_supplied",
      "--verdict",
      "pass",
      "--summary",
      "Quality review passed.",
      "--finding",
      "No blocking findings.",
      "--evidence",
      `.agentplane/tasks/${taskId}/README.md`,
      "--root",
      root,
    ]);

    const prDir = path.join(root, ".agentplane", "tasks", taskId, "pr");
    await mkdir(prDir, { recursive: true });
    await writeFile(
      path.join(prDir, "meta.json"),
      `${JSON.stringify(
        {
          base: "main",
          branch,
          created_at: "2026-01-01T00:00:00.000Z",
          pr_number: 123,
          pr_url: "https://github.com/example/repo/pull/123",
          schema_version: 1,
          status: "OPEN",
          task_id: taskId,
          updated_at: "2026-01-01T00:00:00.000Z",
        },
        null,
        2,
      )}\n`,
    );

    const nextIo = captureStdIO();
    try {
      const code = await runCli(["task", "next-action", taskId, "--json", "--root", root]);
      expect(code).toBe(0);
      const parsed = JSON.parse(nextIo.stdout) as {
        next_action: { code: string; command: string };
        blockers: { code: string }[];
      };
      expect(parsed.blockers.map((blocker) => blocker.code)).toContain("pre_merge_closure_missing");
      expect(parsed.next_action.code).toBe("record_pre_merge_closure");
      expect(parsed.next_action.command).toContain("--pre-merge-closure");
    } finally {
      nextIo.restore();
    }
  });
});
