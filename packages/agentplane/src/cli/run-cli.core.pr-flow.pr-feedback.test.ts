import { describe } from "vitest";

import {
  PR_FLOW_LONG_TIMEOUT_MS,
  captureStdIO,
  commitPathsIfChanged,
  configureGitUser,
  defaultConfig,
  execFile,
  expect,
  it,
  mkGitRepoRootWithBranch,
  path,
  promisify,
  runCli,
  runCliSilent,
  setConcreteVerifySteps,
  writeConfig,
  writeFile,
} from "@agentplane/testkit/cli-core-pr-flow";

describe("runCli PR feedback regressions", { timeout: PR_FLOW_LONG_TIMEOUT_MS }, () => {
  it(
    "pr check accepts metadata-only task artifact commits after verification",
    { timeout: PR_FLOW_LONG_TIMEOUT_MS },
    async () => {
      const root = await mkGitRepoRootWithBranch("main");
      const config = defaultConfig();
      config.workflow_mode = "branch_pr";
      config.agents.approvals.require_plan = false;
      await writeConfig(root, config);
      await configureGitUser(root);

      const execFileAsync = promisify(execFile);
      await writeFile(path.join(root, "seed.txt"), "seed", "utf8");
      await execFileAsync("git", ["add", "seed.txt"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", "seed"], { cwd: root });

      let taskId = "";
      const ioTask = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "PR metadata-only verify freshness",
          "--description",
          "PR check should keep verification valid across task-local PR metadata commits",
          "--priority",
          "med",
          "--owner",
          "CODER",
          "--tag",
          "docs",
          "--verify",
          "echo ok",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        taskId = ioTask.stdout.trim();
      } finally {
        ioTask.restore();
      }

      await execFileAsync("git", ["add", ".agentplane"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", `chore ${taskId} scaffold`], { cwd: root });
      await runCliSilent(["branch", "base", "set", "main", "--root", root]);

      const branch = `task/${taskId}/metadata-only-freshness`;
      await execFileAsync("git", ["checkout", "-b", branch], { cwd: root });
      await runCliSilent([
        "task",
        "start-ready",
        taskId,
        "--author",
        "CODER",
        "--body",
        "Start: create a verified implementation before PR metadata refresh.",
        "--root",
        root,
      ]);
      await setConcreteVerifySteps(root, taskId);

      await writeFile(path.join(root, "feature.txt"), "feature", "utf8");
      await execFileAsync("git", ["add", "feature.txt"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", "feature"], { cwd: root });
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
      ]);
      await runCliSilent([
        "verify",
        taskId,
        "--ok",
        "--by",
        "REVIEWER",
        "--note",
        "Verified metadata-only freshness behavior.",
        "--root",
        root,
      ]);
      await commitPathsIfChanged(
        root,
        [`.agentplane/tasks/${taskId}`],
        `${taskId} refresh verified pr metadata`,
      );

      const io = captureStdIO();
      try {
        const code = await runCli(["pr", "check", taskId, "--root", root]);
        expect(code).toBe(0);
        expect(io.stdout).toContain("✅ pr check");
        expect(io.stderr).not.toContain("Verify state stale");
      } finally {
        io.restore();
      }
    },
  );
});
