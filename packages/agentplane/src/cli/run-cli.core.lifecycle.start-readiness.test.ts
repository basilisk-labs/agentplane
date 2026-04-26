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
  it("start enforces dependency readiness unless forced", async () => {
    const root = await mkGitRepoRoot();
    let taskA = "";
    let taskB = "";
    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Dep task",
          "--description",
          "Dependency",
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
        taskA = io.stdout.trim();
      } finally {
        io.restore();
      }
    }
    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Needs deps",
          "--description",
          "Depends on A",
          "--priority",
          "med",
          "--owner",
          "CODER",
          "--tag",
          "docs",
          "--depends-on",
          taskA,
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        taskB = io.stdout.trim();
      } finally {
        io.restore();
      }
    }
    await approveTaskPlan(root, taskB);

    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "start",
          taskB,
          "--author",
          "CODER",
          "--body",
          "Start: attempt start without deps completed should fail for readiness check.",
          "--root",
          root,
        ]);
        expect(code).toBe(2);
      } finally {
        io.restore();
      }
    }

    const io = captureStdIO();
    try {
      const code = await runCli([
        "start",
        taskB,
        "--author",
        "CODER",
        "--body",
        "Start: force start even though deps are incomplete to bypass readiness check.",
        "--force",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }
  });

  it("start --force requires explicit approval in conservative profile", async () => {
    const root = await mkGitRepoRoot();
    const cfg = defaultConfig();
    cfg.execution.profile = "conservative";
    await writeConfig(root, cfg);

    let taskId = "";
    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Start force approval",
          "--description",
          "conservative force approval check",
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
        taskId = io.stdout.trim();
      } finally {
        io.restore();
      }
    }
    await approveTaskPlan(root, taskId);

    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "start",
          taskId,
          "--author",
          "CODER",
          "--body",
          "Start: force start should require explicit approval in conservative profile mode.",
          "--force",
          "--root",
          root,
        ]);
        expect(code).toBe(3);
        expect(io.stderr).toContain("Force action requires explicit approval");
      } finally {
        io.restore();
      }
    }

    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "start",
          taskId,
          "--author",
          "CODER",
          "--body",
          "Start: force start approved explicitly with yes in conservative profile mode.",
          "--force",
          "--yes",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
      } finally {
        io.restore();
      }
    }
  });
});
