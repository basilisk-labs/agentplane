import { realpath } from "node:fs/promises";
import path from "node:path";

import { describe } from "vitest";

import {
  captureStdIO,
  commitAll,
  defaultConfig,
  expect,
  it,
  mkGitRepoRootWithBranch,
  runCli,
  runCliSilent,
  writeConfig,
} from "@agentplane/testkit/cli-core-pr-flow";

async function createApprovedTask(root: string): Promise<string> {
  const taskIo = captureStdIO();
  let taskId = "";
  try {
    const code = await runCli([
      "task",
      "new",
      "--title",
      "Post work-start route",
      "--description",
      "Route an existing task worktree to PR publication.",
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
    "Create the task worktree and continue to PR publication.",
    "--updated-by",
    "ORCHESTRATOR",
    "--root",
    root,
  ]);
  await runCliSilent(["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--root", root]);
  return taskId;
}

describe("post work-start route decision", () => {
  it("routes the base checkout to PR publication when the task worktree already exists", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);
    const taskId = await createApprovedTask(root);
    await commitAll(root, "test: prepare approved task");

    const startOutput = captureStdIO();
    try {
      const code = await runCli([
        "work",
        "start",
        taskId,
        "--agent",
        "CODER",
        "--slug",
        "post-work-start-route",
        "--worktree",
        "--root",
        root,
      ]);
      if (code !== 0) {
        throw new Error(`${startOutput.stderr}\n${startOutput.stdout}`.trim());
      }
    } finally {
      startOutput.restore();
    }

    const output = captureStdIO();
    try {
      const code = await runCli(["task", "next-action", taskId, "--json", "--root", root]);
      expect(code).toBe(0);
      const parsed = JSON.parse(output.stdout) as {
        route_oracle: {
          phase: string;
          authoritativeCheckout: string;
          authoritativeCheckoutPath: string | null;
          nextCommand: string | null;
        };
        execution_packet: {
          mustRunFrom: string | null;
          exactArgv: string[] | null;
        };
        next_action: { code: string; command: string | null };
      };
      const worktreePath = path.join(
        root,
        ".agentplane",
        "worktrees",
        `${taskId}-post-work-start-route`,
      );
      expect(parsed.route_oracle).toMatchObject({
        phase: "pr_needed",
        authoritativeCheckout: "task_worktree",
        nextCommand: `agentplane pr open ${taskId} --author CODER`,
      });
      expect(await realpath(parsed.route_oracle.authoritativeCheckoutPath ?? "")).toBe(
        await realpath(worktreePath),
      );
      expect(await realpath(parsed.execution_packet.mustRunFrom ?? "")).toBe(
        await realpath(worktreePath),
      );
      expect(parsed.execution_packet.exactArgv).toEqual([
        "agentplane",
        "pr",
        "open",
        taskId,
        "--author",
        "CODER",
      ]);
      expect(parsed.next_action).toMatchObject({
        code: "open_pr",
        command: `agentplane pr open ${taskId} --author CODER`,
      });
    } finally {
      output.restore();
    }
  });
});
