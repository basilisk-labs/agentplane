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

async function createLegacyStartTask(root: string, description: string): Promise<string> {
  const task = await createLegacyTask({
    cwd: root,
    rootOverride: root,
    title: "Start task",
    description,
    priority: "med",
    owner: "CODER",
    tags: ["nodejs"],
    dependsOn: [],
    verify: ["bun run test:cli:core"],
  });
  for (const [section, text] of [
    ["Summary", `Start task\n\n${description}`],
    ["Scope", "- In scope: legacy direct start commit behavior."],
    ["Rollback Plan", "- Revert the generated start commit."],
  ] as const) {
    await setTaskDocSection({
      cwd: root,
      rootOverride: root,
      taskId: task.id,
      section,
      text,
      updatedBy: "PLANNER",
    });
  }
  return task.id;
}

describe("runCli", { timeout: START_COMMIT_PATH_HANDLING_TIMEOUT_MS }, () => {
  it("start --commit-from-comment commits and updates status", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await configureGitUser(root);
    await commitAll(root, "seed");

    const taskId = await createLegacyStartTask(root, "Test start command with commit-from-comment");
    expect(taskId).toMatch(/\d{12}-[A-Z0-9]+/);
    await approveTaskPlan(root, taskId);
    await stageGitignoreIfPresent(root);
    await commitAll(root, "fixture: approve task");
    await startDirectWork(root, taskId, "CODER");

    const commentBody =
      "Start: implement comment-driven commit for start flow | detail A; detail B";

    const io = captureStdIO();
    try {
      const code = await runCli([
        "start",
        taskId,
        "--author",
        "CODER",
        "--body",
        commentBody,
        "--commit-from-comment",
        "--commit-allow",
        ".agentplane/tasks",
        "--confirm-status-commit",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("creating commit from start comment");
      expect(io.stdout).toContain("✅ started");
    } finally {
      io.restore();
    }

    const task = await readTask({ cwd: root, rootOverride: root, taskId });
    expect(task.frontmatter.status).toBe("DOING");

    const execFileAsync = promisify(execFile);
    const { stdout } = await execFileAsync("git", ["log", "-1", "--pretty=%s"], { cwd: root });
    const suffix = extractTaskSuffix(taskId);
    expect(stdout.trim()).toBe(`🚧 ${suffix} meta: doing`);

    const { stdout: body } = await execFileAsync("git", ["log", "-1", "--pretty=%b"], {
      cwd: root,
    });
    expect(body).toContain(`Task: ${taskId}`);
    expect(body).toContain("Agent: CODER");
    expect(body).toContain("Primary: meta");
    expect(body).toContain("Status: DOING");
    expect(body).toContain("Comment:");
    expect(body).toContain("implement comment-driven commit for start flow");
  }, 90_000);

  it(
    "start commit-from-comment accepts any explicit --commit-emoji provided by the agent",
    async () => {
      const root = await mkGitRepoRoot();
      await writeDefaultConfig(root);
      await configureGitUser(root);
      await commitAll(root, "seed");

      const taskId = await createLegacyStartTask(root, "Custom emoji");
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
          "Start: custom emoji commit path for start command coverage and validation",
          "--commit-from-comment",
          "--commit-emoji",
          "🦞",
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
      expect(stdout.trim()).toBe(`🦞 ${suffix} meta: doing`);
    },
    START_COMMIT_PATH_HANDLING_TIMEOUT_MS,
  );
});
