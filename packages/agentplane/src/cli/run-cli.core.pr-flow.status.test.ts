import { describe } from "vitest";

import {
  captureStdIO,
  defaultConfig,
  expect,
  it,
  mkGitRepoRootWithBranch,
  readFile,
  runCli,
  runCliSilent,
  writeConfig,
} from "@agentplane/testkit/cli-core-pr-flow";
import path from "node:path";

describe("runCli pr flow status", () => {
  it("reports task branch, local PR metadata, close-tail state, and next action", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);

    let taskId = "";
    const taskIo = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Inspect PR flow status",
        "--description",
        "PR flow status should summarize branch_pr state without mutating remote providers.",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "workflow",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = taskIo.stdout.trim();
    } finally {
      taskIo.restore();
    }

    const branch = `task/${taskId}/flow-status`;
    expect(
      await runCliSilent([
        "pr",
        "open",
        taskId,
        "--author",
        "CODER",
        "--branch",
        branch,
        "--sync-only",
        "--root",
        root,
      ]),
    ).toBe(0);

    const metaPath = path.join(root, ".agentplane", "tasks", taskId, "pr", "meta.json");
    const meta = JSON.parse(await readFile(metaPath, "utf8")) as { branch?: string };
    expect(meta.branch).toBe(branch);

    const io = captureStdIO();
    try {
      const code = await runCli(["pr", "flow", "status", taskId, "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("PR flow status");
      expect(io.stdout).toContain(`task: ${taskId}`);
      expect(io.stdout).toContain(`branch: ${branch}`);
      expect(io.stdout).toContain("remote_pr: github: not_found");
      expect(io.stdout).toContain(`next: agentplane pr open ${taskId} --author <ROLE>`);
    } finally {
      io.restore();
    }
  });
});
