import { execFile } from "node:child_process";
import { realpath, writeFile } from "node:fs/promises";
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

async function runJson<T>(args: string[]): Promise<[number, T]> {
  const io = captureStdIO();
  try {
    return [await runCli(args), JSON.parse(io.stdout) as T];
  } finally {
    io.restore();
  }
}

describe("runCli task execution routing", () => {
  it("escalates an auto-routed task from a direct repository into a branch_pr worktree", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await writeFile(path.join(root, "README.md"), "# Fixture\n", "utf8");
    await execFileAsync("git", ["add", "README.md"], { cwd: root });
    await execFileAsync(
      "git",
      [
        "-c",
        "user.name=AgentPlane Test",
        "-c",
        "user.email=test@example.invalid",
        "commit",
        "-m",
        "initial",
      ],
      { cwd: root },
    );
    const config = defaultConfig();
    config.workflow_mode = "direct";
    await writeConfig(root, config);
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);

    const taskIo = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Publish an isolated patch",
        "--description",
        "Exercise automatic route escalation",
        "--owner",
        "CODER",
        "--tag",
        "release",
        "--task-kind",
        "release",
        "--mutation-scope",
        "release",
        "--risk",
        "publish",
        "--route",
        "auto",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = taskIo.stdout.trim();
    } finally {
      taskIo.restore();
    }
    await runCliSilent([
      "task",
      "plan",
      "set",
      taskId,
      "--text",
      "Verify automatic route escalation.",
      "--updated-by",
      "PLANNER",
      "--root",
      root,
    ]);
    await runCliSilent(["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--root", root]);

    const [code, payload] = await runJson<{
      workflow_mode: string;
      next_action: { code: string; command: string };
      task: { execution_route: { selected_mode: string; reason_codes: string[] } };
    }>(["task", "next-action", taskId, "--json", "--root", root]);
    expect(code).toBe(0);
    expect(payload.workflow_mode).toBe("branch_pr");
    expect(payload.task.execution_route.selected_mode).toBe("branch_pr");
    expect(payload.task.execution_route.reason_codes).toContain("risk_publish");
    expect(payload.next_action.code).toBe("start_or_recover_worktree");

    const worktreePath = path.join(
      root,
      ".agentplane",
      "worktrees",
      `${taskId}-publish-an-isolated-patch`,
    );
    const workIo = captureStdIO();
    try {
      const workCode = await runCli([
        "work",
        "start",
        taskId,
        "--agent",
        "CODER",
        "--slug",
        "publish-an-isolated-patch",
        "--worktree",
        "--root",
        root,
      ]);
      expect(workCode, workIo.stderr).toBe(0);
    } finally {
      workIo.restore();
    }
    await expect(realpath(worktreePath)).resolves.toContain(taskId);
  });
});
