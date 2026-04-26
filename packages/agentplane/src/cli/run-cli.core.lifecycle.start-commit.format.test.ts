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

import { extractTaskSuffix } from "@agentplaneorg/core/commit";
import { defaultConfig } from "@agentplaneorg/core/config";
import type { ResolvedProject } from "@agentplaneorg/core/project";
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
    "start commit-from-comment supports status_commit_policy=off with semicolon details",
    START_COMMIT_PATH_HANDLING_TIMEOUT_MS,
    async () => {
      const root = await mkGitRepoRoot();
      const cfg = defaultConfig();
      cfg.status_commit_policy = "off";
      await writeConfig(root, cfg);
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
          "Off policy",
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

      const io = captureStdIO();
      try {
        const code = await runCli([
          "start",
          taskId,
          "--author",
          "CODER",
          "--body",
          "Start: handle policy off; follow-up; extra details included for coverage",
          "--commit-from-comment",
          "--commit-allow",
          ".agentplane/tasks",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        expect(io.stderr).not.toContain("policy=warn");
      } finally {
        io.restore();
      }

      const execFileAsync = promisify(execFile);
      const { stdout } = await execFileAsync("git", ["log", "-1", "--pretty=%s"], { cwd: root });
      const suffix = extractTaskSuffix(taskId);
      expect(stdout.trim()).toBe(`🚧 ${suffix} meta: doing`);
    },
  );

  it(
    "start commit-from-comment formats -- separators and supports --quiet",
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
          "Dash separator",
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

      const io = captureStdIO();
      try {
        const code = await runCli([
          "start",
          taskId,
          "--author",
          "CODER",
          "--body",
          "Start: apply separator rules -- include extra details in the commit message",
          "--commit-from-comment",
          "--commit-allow",
          ".agentplane/tasks",
          "--confirm-status-commit",
          "--quiet",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        expect(io.stdout.trim()).toBe("");
      } finally {
        io.restore();
      }

      const execFileAsync = promisify(execFile);
      const { stdout } = await execFileAsync("git", ["log", "-1", "--pretty=%s"], { cwd: root });
      const suffix = extractTaskSuffix(taskId);
      expect(stdout.trim()).toBe(`🚧 ${suffix} meta: doing`);
    },
    START_COMMIT_PATH_HANDLING_TIMEOUT_MS,
  );

  it(
    "start commit-from-comment formats single-sentence summaries without details",
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
          "Single sentence",
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
      await startDirectWork(root, taskId, "CODER");

      const io = captureStdIO();
      try {
        const code = await runCli([
          "start",
          taskId,
          "--author",
          "CODER",
          "--body",
          "Start: implement summary-only commit message formatting for start actions",
          "--commit-from-comment",
          "--commit-allow",
          ".agentplane/tasks",
          "--confirm-status-commit",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
      } finally {
        io.restore();
      }

      const execFileAsync = promisify(execFile);
      const { stdout } = await execFileAsync("git", ["log", "-1", "--pretty=%s"], { cwd: root });
      const suffix = extractTaskSuffix(taskId);
      expect(stdout.trim()).toBe(`🚧 ${suffix} meta: doing`);
    },
    START_COMMIT_PATH_HANDLING_TIMEOUT_MS,
  );
});
