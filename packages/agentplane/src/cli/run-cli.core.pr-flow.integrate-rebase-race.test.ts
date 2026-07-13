import { execFile } from "node:child_process";
import { mkdtemp, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { defaultConfig } from "@agentplaneorg/core/config";
import {
  approveTaskPlan,
  captureStdIO,
  cleanGitEnv,
  commitPathsIfChanged,
  configureGitUser,
  installRunCliIntegrationHarness,
  mkGitRepoRootWithBranch,
  recordVerificationOk,
  runCliSilent,
  stageGitignoreIfPresent,
  writeConfig,
} from "@agentplane/testkit";
import { describe, expect, it } from "vitest";

import { runCli } from "./run-cli.js";

installRunCliIntegrationHarness();

const INTEGRATE_REBASE_TIMEOUT_MS = 180_000;
const TEST_WORKFLOW_GITIGNORE =
  ".agentplane/worktrees\n" +
  ".agentplane/cache\n" +
  ".agentplane/cache.sqlite\n" +
  ".agentplane/cache.sqlite-wal\n" +
  ".agentplane/cache.sqlite-shm\n";

describe("runCli integrate rebase race", () => {
  it(
    "fails when the base changes during verify",
    async () => {
      const root = await mkGitRepoRootWithBranch("main");
      await configureGitUser(root);
      const config = defaultConfig();
      config.workflow_mode = "branch_pr";
      await writeConfig(root, config);

      const execFileAsync = promisify(execFile);
      await writeFile(path.join(root, "README.md"), "base\n", "utf8");
      await writeFile(path.join(root, ".gitignore"), TEST_WORKFLOW_GITIGNORE, "utf8");
      await stageGitignoreIfPresent(root);
      await execFileAsync("git", ["add", "README.md"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", "chore base"], { cwd: root });
      await runCliSilent(["branch", "base", "set", "main", "--root", root]);

      const verifyCmd = [
        "node -e",
        `'const cp=require("node:child_process");const fs=require("node:fs");const path=require("node:path");const root=${JSON.stringify(root)};fs.appendFileSync(path.join(root,"bump.txt"),"bump"+String.fromCharCode(10));cp.execFileSync("git",["-C",root,"add","bump.txt"]);cp.execFileSync("git",["-C",root,"commit","-m","chore bump"]);'`,
      ].join(" ");

      let taskId = "";
      const ioTask = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Rebase integrate failure",
          "--description",
          "Branch integration",
          "--priority",
          "med",
          "--owner",
          "CODER",
          "--tag",
          "nodejs",
          "--verify",
          verifyCmd,
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        taskId = ioTask.stdout.trim();
      } finally {
        ioTask.restore();
      }
      await approveTaskPlan(root, taskId);
      await recordVerificationOk(root, taskId);
      await execFileAsync("git", ["add", ".agentplane"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", `chore ${taskId} scaffold`], { cwd: root });

      const branch = `task/${taskId}/rebase-fail`;
      await execFileAsync("git", ["checkout", "-b", branch], { cwd: root });
      await writeFile(path.join(root, "feature.txt"), "feature\n", "utf8");
      await execFileAsync("git", ["add", "feature.txt"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", `${taskId} add feature`], { cwd: root });

      await runCliSilent(["branch", "base", "set", "main", "--root", root]);
      await recordVerificationOk(root, taskId);
      await commitPathsIfChanged(root, [".agentplane/tasks"], `${taskId} refresh verification`);
      await runCliSilent(["pr", "open", taskId, "--author", "CODER", "--root", root]);
      await commitPathsIfChanged(root, [".agentplane/tasks"], `${taskId} add pr artifacts`);

      await execFileAsync("git", ["checkout", "main"], { cwd: root });
      await writeFile(path.join(root, "base.txt"), "base\n", "utf8");
      await execFileAsync("git", ["add", "base.txt"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", "chore base update"], { cwd: root });

      const worktreePath = await mkdtemp(path.join(os.tmpdir(), "agentplane-rebase-"));
      await execFileAsync("git", ["worktree", "add", worktreePath, branch], {
        cwd: root,
        env: cleanGitEnv(),
      });

      const io = captureStdIO();
      try {
        const code = await runCli([
          "integrate",
          taskId,
          "--branch",
          branch,
          "--merge-strategy",
          "rebase",
          "--run-verify",
          "--root",
          root,
        ]);
        expect(code).toBe(5);
        expect(io.stderr).toContain("merge --ff-only");
      } finally {
        io.restore();
      }
    },
    INTEGRATE_REBASE_TIMEOUT_MS,
  );
});
