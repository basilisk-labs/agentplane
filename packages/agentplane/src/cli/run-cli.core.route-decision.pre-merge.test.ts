import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

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
      "Exercise pre-merge closure route decisions.",
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

describe("pre-merge closure route decisions", () => {
  it("keeps done pre-merge closure tasks in the provider lane while the task PR is open", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);

    const taskId = await createBranchPrTask(root);
    const branchName = `task/${taskId}/pre-merge-closure`;
    await runCliSilent([
      "task",
      "plan",
      "set",
      taskId,
      "--text",
      "Exercise pre-merge closure route decisions.",
      "--updated-by",
      "ORCHESTRATOR",
      "--root",
      root,
    ]);
    await runCliSilent(["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--root", root]);

    const readmePath = path.join(root, ".agentplane", "tasks", taskId, "README.md");
    const readme = await readFile(readmePath, "utf8");
    await writeFile(
      readmePath,
      readme
        .replace('status: "TODO"', 'status: "DONE"')
        .replace("commit: null", 'commit:\n  hash: "abc123"\n  message: "Pre-merge closure"'),
      "utf8",
    );
    await mkdir(path.join(root, ".agentplane", "tasks", taskId, "pr"), { recursive: true });
    await writeFile(
      path.join(root, ".agentplane", "tasks", taskId, "pr", "meta.json"),
      `${JSON.stringify(
        {
          schema_version: 1,
          task_id: taskId,
          branch: branchName,
          base: "main",
          status: "OPEN",
          pr_number: 4402,
          pr_url: "https://github.test/pull/4402",
          created_at: "2026-04-05T09:00:00.000Z",
          updated_at: "2026-04-05T09:00:00.000Z",
          verify: { status: "pass" },
          pre_merge_closure: {
            state: "closed_before_merge",
            branch: branchName,
            basis_commit: "abc123",
            recorded_at: "2026-04-05T09:12:00.000Z",
          },
        },
        null,
        2,
      )}\n`,
    );

    const statusIo = captureStdIO();
    try {
      const code = await runCli(["task", "status", taskId, "--route", "--json", "--root", root]);
      if (code !== 0) process.stderr.write(statusIo.stderr);
      expect(code).toBe(0);
      const parsed = JSON.parse(statusIo.stdout) as {
        nextAction: { code: string; command: string };
        oracle: { phase: string; authoritativeCheckout: string };
      };
      expect(parsed.nextAction).toMatchObject({
        code: "wait_hosted_checks",
        command: `agentplane integrate queue enqueue ${taskId} --branch ${branchName}`,
      });
      expect(parsed.oracle).toMatchObject({
        phase: "pr_open_integration_lane",
        authoritativeCheckout: "base_checkout",
      });
    } finally {
      statusIo.restore();
    }
  });
});
