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

import { defaultConfig, extractTaskSuffix, type ResolvedProject } from "./core-imports.js";
import { readTask, renderTaskReadme } from "@agentplaneorg/core/tasks";

import { runCli } from "./run-cli.js";
import {
  filterAgentsByWorkflow,
  loadAgentTemplates,
  loadAgentsTemplate,
} from "../agents/agents-template.js";
import * as taskBackend from "../backends/task-backend.js";
import {
  approveTaskPlan,
  captureStdIO,
  cleanGitEnv,
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
} from "@agentplane/testkit";
import { resolveUpdateCheckCachePath } from "./update-check.js";
import * as prompts from "./prompts.js";
import {
  START_COMMIT_PATH_HANDLING_TIMEOUT_MS,
  startDirectWork,
} from "@agentplane/testkit/cli-core-lifecycle";

installRunCliIntegrationHarness();

describe("runCli", { timeout: START_COMMIT_PATH_HANDLING_TIMEOUT_MS }, () => {
  it(
    "start --commit-from-comment normalizes ./ prefixes in allowlist",
    async () => {
      const root = await mkGitRepoRoot();
      await writeDefaultConfig(root);
      await configureGitUser(root);
      await commitAll(root, "seed");

      const ioNew = captureStdIO();
      let taskId = "";
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Allow prefix normalize",
          "--description",
          "Ensure ./ prefixes are accepted for commit-from-comment allowlist",
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
        taskId = ioNew.stdout.trim();
      } finally {
        ioNew.restore();
      }
      await approveTaskPlan(root, taskId);
      await stageGitignoreIfPresent(root);
      await commitAll(root, "fixture: approve task");
      await startDirectWork(root, taskId, "CODER");

      await mkdir(path.join(root, "tmp"), { recursive: true });
      await writeFile(path.join(root, "tmp", "a.txt"), "hello\n", "utf8");

      const io = captureStdIO();
      try {
        const code = await runCli([
          "start",
          taskId,
          "--author",
          "CODER",
          "--body",
          "Start: allow ./tmp prefix should work for staging + guard validation.",
          "--commit-from-comment",
          "--commit-allow",
          "./tmp",
          "--confirm-status-commit",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        expect(io.stdout).toContain("✅ started");
      } finally {
        io.restore();
      }
    },
    START_COMMIT_PATH_HANDLING_TIMEOUT_MS,
  );

  it(
    "start --commit-from-comment handles paths with spaces",
    async () => {
      const root = await mkGitRepoRoot();
      await writeDefaultConfig(root);
      await configureGitUser(root);
      await commitAll(root, "seed");

      const ioNew = captureStdIO();
      let taskId = "";
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Spaced paths",
          "--description",
          "Ensure commit-from-comment can stage file paths with spaces",
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
        taskId = ioNew.stdout.trim();
      } finally {
        ioNew.restore();
      }
      await approveTaskPlan(root, taskId);
      await stageGitignoreIfPresent(root);
      await commitAll(root, "fixture: approve task");
      await startDirectWork(root, taskId, "CODER");

      await mkdir(path.join(root, "tmp"), { recursive: true });
      await writeFile(path.join(root, "tmp", "a b.txt"), "hello\n", "utf8");

      const io = captureStdIO();
      try {
        const code = await runCli([
          "start",
          taskId,
          "--author",
          "CODER",
          "--body",
          "Start: stage path with spaces via -z parsing (tmp/a b.txt).",
          "--commit-from-comment",
          "--commit-allow",
          ".agentplane/tasks",
          "--commit-allow",
          "tmp",
          "--confirm-status-commit",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        expect(io.stdout).toContain("✅ started");
      } finally {
        io.restore();
      }
    },
    START_COMMIT_PATH_HANDLING_TIMEOUT_MS,
  );

  it(
    "start --commit-from-comment stages deletions under allowlist",
    async () => {
      const root = await mkGitRepoRoot();
      await writeDefaultConfig(root);
      await configureGitUser(root);

      // Seed a tracked file we will delete (so staging deletes is required).
      await mkdir(path.join(root, "tmp"), { recursive: true });
      await writeFile(path.join(root, "tmp", "a.txt"), "hello\n", "utf8");
      await commitAll(root, "seed");

      const ioNew = captureStdIO();
      let taskId = "";
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Delete staging",
          "--description",
          "Ensure allowlist staging includes deletions",
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
        taskId = ioNew.stdout.trim();
      } finally {
        ioNew.restore();
      }
      await approveTaskPlan(root, taskId);
      await stageGitignoreIfPresent(root);
      await commitAll(root, "fixture: approve task");
      await startDirectWork(root, taskId, "CODER");

      await rm(path.join(root, "tmp", "a.txt"));

      const io = captureStdIO();
      try {
        const code = await runCli([
          "start",
          taskId,
          "--author",
          "CODER",
          "--body",
          "Start: ensure allowlist stages deletions",
          "--commit-from-comment",
          "--commit-allow",
          "tmp",
          "--confirm-status-commit",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
      } finally {
        io.restore();
      }

      const execFileAsync = promisify(execFile);
      const { stdout } = await execFileAsync("git", ["show", "--name-status", "--pretty=%s"], {
        cwd: root,
      });
      expect(stdout).toContain("D\ttmp/a.txt");
    },
    START_COMMIT_PATH_HANDLING_TIMEOUT_MS,
  );

  it(
    "start commit-from-comment still commits the active task README when allow prefixes do not match non-task changes",
    async () => {
      const root = await mkGitRepoRoot();
      await writeDefaultConfig(root);
      await configureGitUser(root);
      await commitAll(root, "seed");

      const ioNew = captureStdIO();
      let taskId = "";
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Start task",
          "--description",
          "Allowlist mismatch",
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
        taskId = ioNew.stdout.trim();
      } finally {
        ioNew.restore();
      }
      await approveTaskPlan(root, taskId);
      await stageGitignoreIfPresent(root);
      await commitAll(root, "fixture: approve task");
      await startDirectWork(root, taskId, "CODER");

      const io = captureStdIO();
      try {
        const code = await runCli([
          "start",
          taskId,
          "--author",
          "CODER",
          "--body",
          "Start: allowlist mismatch should fail with helpful error message for debugging",
          "--commit-from-comment",
          "--commit-allow",
          "src",
          "--confirm-status-commit",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        expect(io.stdout).toContain("committed");
      } finally {
        io.restore();
      }
    },
    START_COMMIT_PATH_HANDLING_TIMEOUT_MS,
  );
});
