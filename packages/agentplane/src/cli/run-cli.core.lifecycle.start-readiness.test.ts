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
import {
  createTask as createLegacyTask,
  readTask,
  renderTaskReadme,
  setTaskDocSection,
} from "@agentplaneorg/core/tasks";

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
  mkGitRepoRootWithCommit,
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

async function createLegacyReadinessTask(opts: {
  root: string;
  title: string;
  description: string;
  dependsOn?: string[];
}): Promise<string> {
  const task = await createLegacyTask({
    cwd: opts.root,
    rootOverride: opts.root,
    title: opts.title,
    description: opts.description,
    priority: "med",
    owner: "CODER",
    tags: ["docs"],
    dependsOn: opts.dependsOn ?? [],
    verify: ["bun run test:cli:core"],
  });
  for (const [section, text] of [
    ["Summary", `${opts.title}\n\n${opts.description}`],
    ["Scope", "- In scope: legacy direct start readiness behavior."],
    ["Rollback Plan", "- Restore the task to TODO."],
  ] as const) {
    await setTaskDocSection({
      cwd: opts.root,
      rootOverride: opts.root,
      taskId: task.id,
      section,
      text,
      updatedBy: "PLANNER",
    });
  }
  return task.id;
}

describe("runCli", { timeout: START_COMMIT_PATH_HANDLING_TIMEOUT_MS }, () => {
  it("start enforces dependency readiness unless forced", async () => {
    const root = await mkGitRepoRootWithCommit();
    const taskA = await createLegacyReadinessTask({
      root,
      title: "Dep task",
      description: "Dependency",
    });
    const taskB = await createLegacyReadinessTask({
      root,
      title: "Needs deps",
      description: "Depends on A",
      dependsOn: [taskA],
    });
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
        "--yes",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }
  });

  it("start --force always requires explicit approval", async () => {
    const root = await mkGitRepoRootWithCommit();
    const cfg = defaultConfig();
    cfg.execution.profile = "conservative";
    await writeConfig(root, cfg);

    const taskId = await createLegacyReadinessTask({
      root,
      title: "Start force approval",
      description: "conservative force approval check",
    });
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
          "Start: force start should require explicit approval under the standard policy.",
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
          "Start: force start approved explicitly with yes under the standard policy.",
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
