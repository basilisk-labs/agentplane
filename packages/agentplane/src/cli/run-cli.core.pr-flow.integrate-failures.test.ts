/* eslint-disable @typescript-eslint/no-unused-vars */
import { execFile } from "node:child_process";
import { readFileSync } from "node:fs";
import {
  chmod,
  mkdir,
  mkdtemp,
  readdir,
  readFile,
  realpath,
  rm,
  writeFile,
} from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it, vi } from "vitest";
import { extractTaskSuffix, validateCommitSubject } from "@agentplaneorg/core/commit";
import { defaultConfig } from "@agentplaneorg/core/config";
import type { ResolvedProject } from "@agentplaneorg/core/project";
import { readTask, renderTaskReadme } from "@agentplaneorg/core/tasks";
import { createIncidentRegistrySkeleton } from "../runtime/incidents/index.js";

import { runCli } from "./run-cli.js";
import {
  filterAgentsByWorkflow,
  loadAgentTemplates,
  loadAgentsTemplate,
} from "../agents/agents-template.js";
import {
  approveTaskPlan,
  captureStdIO,
  cleanGitEnv,
  commitPathsIfChanged,
  commitAll,
  configureGitUser,
  createUpgradeBundle,
  getAgentplaneHome,
  gitBranchExists,
  installRunCliIntegrationHarness,
  runCliSilent,
  mkGitRepoRoot,
  mkGitRepoRootWithBranch,
  mkTempDir,
  pathExists,
  stageGitignoreIfPresent,
  stubTaskBackend,
  writeConfig,
  writeDefaultConfig,
  recordVerificationOk,
} from "@agentplane/testkit";
import { resolveUpdateCheckCachePath } from "./update-check.js";
import * as prompts from "./prompts.js";

installRunCliIntegrationHarness();

const INTEGRATE_REBASE_TIMEOUT_MS = 180_000;
const INTEGRATE_ROUTE_TIMEOUT_MS = 120_000;
const TEST_WORKFLOW_GITIGNORE =
  ".agentplane/worktrees\n" +
  ".agentplane/cache\n" +
  ".agentplane/cache.sqlite\n" +
  ".agentplane/cache.sqlite-wal\n" +
  ".agentplane/cache.sqlite-shm\n";

async function installFakeGhProtection(opts: { scenarioName: string; protectedBranch?: string }) {
  const fakeBin = path.join(
    os.tmpdir(),
    `agentplane-gh-protection-${Date.now()}-${opts.scenarioName}`,
  );
  await mkdir(fakeBin, { recursive: true });
  const scriptPath = path.join(fakeBin, "fake-gh.mjs");
  const ghPath = path.join(fakeBin, process.platform === "win32" ? "gh.cmd" : "gh");
  const protectedBranch = opts.protectedBranch ?? "main";
  await writeFile(
    scriptPath,
    [
      'import fs from "node:fs";',
      "const args = process.argv.slice(2);",
      "const logPath = process.env.AGENTPLANE_GH_LOG;",
      "if (logPath) fs.appendFileSync(logPath, `${JSON.stringify(args)}\\n`);",
      'if (args[0] !== "api") { console.error("unexpected gh command"); process.exit(90); }',
      `const expected = ${JSON.stringify(`repos/example/repo/branches/${protectedBranch}/protection`)};`,
      'if ((args[1] ?? "") === expected) {',
      "  console.log(JSON.stringify({ required_pull_request_reviews: { required_approving_review_count: 0 } }));",
      "  process.exit(0);",
      "}",
      'console.error("unexpected gh api endpoint");',
      "process.exit(91);",
      "",
    ].join("\n"),
    "utf8",
  );
  if (process.platform === "win32") {
    await writeFile(ghPath, '@echo off\r\nnode "%~dp0\\fake-gh.mjs" %*\r\n', "utf8");
  } else {
    await writeFile(ghPath, '#!/bin/sh\nnode "$(dirname "$0")/fake-gh.mjs" "$@"\n', "utf8");
    await chmod(ghPath, 0o755);
  }
  return { fakeBin, logPath: path.join(fakeBin, "gh.log") };
}

describe("runCli", { timeout: INTEGRATE_ROUTE_TIMEOUT_MS }, () => {
  it(
    "integrate rebase fails when verify command fails",
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

      let taskId = "";
      const ioTask = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Rebase verify failure",
          "--description",
          "Branch integration",
          "--priority",
          "med",
          "--owner",
          "CODER",
          "--tag",
          "nodejs",
          "--verify",
          "false",
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

      const branch = `task/${taskId}/rebase-verify-fail`;
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
        expect(code).toBe(4);
        expect(io.stderr).toContain("Verify command failed");
      } finally {
        io.restore();
      }
    },
    INTEGRATE_REBASE_TIMEOUT_MS,
  );

  it(
    "integrate fails when post-merge hook removes pr dir",
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

      let taskId = "";
      const ioTask = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Integrate missing PR",
          "--description",
          "Branch integration",
          "--priority",
          "med",
          "--owner",
          "CODER",
          "--tag",
          "nodejs",
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

      const branch = `task/${taskId}/integrate-missing-pr`;
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
      await runCliSilent(["branch", "base", "set", "main", "--root", root]);
      const prDir = path.join(root, ".agentplane", "tasks", taskId, "pr");
      const hookPath = path.join(root, ".git", "hooks", "post-merge");
      const hookBody = `#!/bin/sh\nrm -rf "${prDir}"\n`;
      await writeFile(hookPath, hookBody, "utf8");
      await chmod(hookPath, 0o755);

      const io = captureStdIO();
      try {
        const code = await runCli([
          "integrate",
          taskId,
          "--branch",
          branch,
          "--merge-strategy",
          "merge",
          "--root",
          root,
        ]);
        expect(code).toBe(3);
        expect(io.stderr).toContain("Missing PR artifact dir after merge");
      } finally {
        io.restore();
      }
    },
    INTEGRATE_ROUTE_TIMEOUT_MS,
  );

  it(
    "integrate fails before merge when the task branch never committed PR artifacts",
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

      let taskId = "";
      const ioTask = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Integrate missing committed PR artifacts",
          "--description",
          "Branch integration",
          "--priority",
          "med",
          "--owner",
          "CODER",
          "--tag",
          "nodejs",
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

      const branch = `task/${taskId}/integrate-untracked-pr-artifacts`;
      await execFileAsync("git", ["checkout", "-b", branch], { cwd: root });
      await writeFile(path.join(root, "feature.txt"), "feature\n", "utf8");
      await execFileAsync("git", ["add", "feature.txt"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", `${taskId} add feature`], { cwd: root });

      await execFileAsync("git", ["checkout", "main"], { cwd: root });
      await runCliSilent([
        "pr",
        "open",
        taskId,
        "--author",
        "CODER",
        "--branch",
        branch,
        "--root",
        root,
      ]);
      const statusAfterPrOpen = await execFileAsync(
        "git",
        ["status", "--short", "--untracked-files=all", `.agentplane/tasks/${taskId}`],
        { cwd: root },
      );
      expect(statusAfterPrOpen.stdout).toContain(`?? .agentplane/tasks/${taskId}/pr/meta.json`);
      await runCliSilent(["branch", "base", "set", "main", "--root", root]);
      const baseHeadBeforeResult = await execFileAsync("git", ["rev-parse", "HEAD"], {
        cwd: root,
      });
      const baseHeadBefore = baseHeadBeforeResult.stdout.trim();

      const io = captureStdIO();
      try {
        const code = await runCli([
          "integrate",
          taskId,
          "--branch",
          branch,
          "--merge-strategy",
          "merge",
          "--root",
          root,
        ]);
        expect(code).toBe(3);
        expect(io.stderr).toContain("missing committed PR artifacts required for integrate");
        expect(io.stderr).toContain(`.agentplane/tasks/${taskId}/pr/meta.json`);
      } finally {
        io.restore();
      }

      const baseHeadAfterResult = await execFileAsync("git", ["rev-parse", "HEAD"], {
        cwd: root,
      });
      const baseHeadAfter = baseHeadAfterResult.stdout.trim();
      expect(baseHeadAfter).toBe(baseHeadBefore);
    },
    INTEGRATE_ROUTE_TIMEOUT_MS,
  );

  it(
    "integrate runs verify when requested",
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

      let taskId = "";
      const ioTask = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Verify integrate",
          "--description",
          "Branch integration",
          "--priority",
          "med",
          "--owner",
          "CODER",
          "--tag",
          "nodejs",
          "--verify",
          "git status --short",
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

      const branch = `task/${taskId}/verify`;
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

      const io = captureStdIO();
      try {
        const code = await runCli([
          "integrate",
          taskId,
          "--branch",
          branch,
          "--base",
          "main",
          "--run-verify",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
      } finally {
        io.restore();
      }

      expect(await gitBranchExists(root, branch)).toBe(false);
      expect(
        await pathExists(path.join(root, ".agentplane", "worktrees", `_integrate_tmp_${taskId}`)),
      ).toBe(false);

      const verifyLog = await readFile(
        path.join(root, ".agentplane", "tasks", taskId, "pr", "verify.log"),
        "utf8",
      );
      expect(verifyLog).toContain("verified_sha=");
    },
    INTEGRATE_ROUTE_TIMEOUT_MS,
  );
});
