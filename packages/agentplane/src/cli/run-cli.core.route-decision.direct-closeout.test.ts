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

describe("runCli route decision direct closeout", () => {
  it("routes verified direct tasks to closeout instead of rerunning them and drops them from active work", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "direct";
    await writeConfig(root, config);

    const taskId = await createBranchPrTask(root);
    await runCliSilent([
      "task",
      "plan",
      "set",
      taskId,
      "--text",
      "Exercise direct verified closeout routing.",
      "--updated-by",
      "ORCHESTRATOR",
      "--root",
      root,
    ]);
    await runCliSilent(["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--root", root]);
    await runCliSilent([
      "task",
      "start-ready",
      taskId,
      "--author",
      "CODER",
      "--body",
      "Start: create a direct DOING task for verified closeout routing.",
      "--root",
      root,
    ]);
    await runCliSilent([
      "verify",
      taskId,
      "--ok",
      "--by",
      "EVALUATOR",
      "--note",
      "Verified: ready for direct closeout.",
      "--root",
      root,
    ]);

    const nextIo = captureStdIO();
    try {
      const code = await runCli(["task", "next-action", taskId, "--json", "--root", root]);
      expect(code).toBe(0);
      const parsed = JSON.parse(nextIo.stdout) as {
        route_oracle: { phase: string };
        next_action: { code: string; command: string | null; summary: string };
      };
      expect(parsed.route_oracle.phase).toBe("direct_verified_pending_closeout");
      expect(parsed.next_action).toMatchObject({
        code: "complete_direct",
        command: `agentplane task complete ${taskId} --result "<result>" --commit <hash>`,
      });
      expect(parsed.next_action.summary).toContain("task complete");
      expect(parsed.next_action.summary).toContain("instead of rerunning execution");
    } finally {
      nextIo.restore();
    }

    const activeIo = captureStdIO();
    try {
      const code = await runCli(["task", "active", "--json", "--root", root]);
      expect(code).toBe(0);
      const parsed = JSON.parse(activeIo.stdout) as {
        count: number;
        filtered_count: number;
        items: { task: { id: string } }[];
      };
      expect(parsed.count).toBe(0);
      expect(parsed.filtered_count).toBe(0);
      expect(parsed.items.map((item) => item.task.id)).not.toContain(taskId);
    } finally {
      activeIo.restore();
    }
  });
});
