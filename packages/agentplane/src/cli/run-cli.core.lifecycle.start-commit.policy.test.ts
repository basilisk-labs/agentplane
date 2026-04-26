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
  it("start blocks comment-driven commits when status_commit_policy=confirm", async () => {
    const root = await mkGitRepoRoot();
    const cfg = defaultConfig();
    cfg.status_commit_policy = "confirm";
    await writeConfig(root, cfg);

    const ioNew = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Start task",
        "--description",
        "Confirm policy",
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
        "Start: blocked by confirm policy because comment is long enough",
        "--commit-from-comment",
        "--commit-allow",
        ".agentplane/tasks",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("status/comment-driven commit blocked");
    } finally {
      io.restore();
    }
  });

  it("task set-status --commit-from-comment rejects non-major transitions", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root, { status_commit_policy: "warn" });

    const ioNew = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Transition task",
        "--description",
        "non-major transition check",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "docs",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = ioNew.stdout.trim();
    } finally {
      ioNew.restore();
    }

    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "set-status",
        taskId,
        "BLOCKED",
        "--author",
        "CODER",
        "--body",
        "Blocked: dependency is not ready for this transition test case",
        "--commit-from-comment",
        "--commit-allow",
        ".agentplane/tasks",
        "--confirm-status-commit",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("major transitions");
    } finally {
      io.restore();
    }
  });

  it(
    "start warns on status_commit_policy=warn without confirmation",
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
          "Warn policy",
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
          "Start: implement warning path for status commit policy on start action",
          "--commit-from-comment",
          "--commit-allow",
          ".agentplane/tasks",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        expect(io.stderr).toContain("policy=warn");
      } finally {
        io.restore();
      }
    },
    START_COMMIT_PATH_HANDLING_TIMEOUT_MS,
  );

  it("start commit-from-comment rejects auto-allow", async () => {
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
        "Auto allow",
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
        "Start: implement sentence-based summary for commit messages. Add follow-up details.",
        "--commit-from-comment",
        "--commit-auto-allow",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("--commit-auto-allow is disabled");
    } finally {
      io.restore();
    }
  });

  it(
    "start supports status_commit_policy=confirm when acknowledged",
    async () => {
      const root = await mkGitRepoRoot();
      const cfg = defaultConfig();
      cfg.status_commit_policy = "confirm";
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
          "Confirm acknowledged",
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
          "Start: confirm policy acknowledged for status commit workflow and logging",
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
    },
    START_COMMIT_PATH_HANDLING_TIMEOUT_MS,
  );
});
