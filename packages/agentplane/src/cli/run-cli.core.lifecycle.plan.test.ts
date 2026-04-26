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
  it("task plan approve rejects verify-required tasks with missing Verify Steps", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const ioNew = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Plan gate task",
        "--description",
        "Verify Steps gate should block approve",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "code",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = ioNew.stdout.trim();
    } finally {
      ioNew.restore();
    }

    const codeSet = await runCli([
      "task",
      "plan",
      "set",
      taskId,
      "--text",
      "1) Do the work\n2) Verify the work",
      "--updated-by",
      "ORCHESTRATOR",
      "--root",
      root,
    ]);
    expect(codeSet).toBe(0);

    const codeResetVerifySteps = await runCli([
      "task",
      "doc",
      "set",
      taskId,
      "--section",
      "Verify Steps",
      "--text",
      "<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->",
      "--root",
      root,
    ]);
    expect(codeResetVerifySteps).toBe(0);

    const ioApprove = captureStdIO();
    try {
      const codeApprove = await runCli([
        "task",
        "plan",
        "approve",
        taskId,
        "--by",
        "USER",
        "--note",
        "OK",
        "--root",
        root,
      ]);
      expect(codeApprove).toBe(3);
      expect(ioApprove.stderr).toContain("cannot approve plan");
      expect(ioApprove.stderr).toContain("Verify Steps");
    } finally {
      ioApprove.restore();
    }

    const codeFill = await runCli([
      "task",
      "doc",
      "set",
      taskId,
      "--section",
      "Verify Steps",
      "--text",
      "Run bun run test:cli:core; expect exit 0.",
      "--root",
      root,
    ]);
    expect(codeFill).toBe(0);

    const codeApprove2 = await runCli([
      "task",
      "plan",
      "approve",
      taskId,
      "--by",
      "USER",
      "--note",
      "OK",
      "--root",
      root,
    ]);
    expect(codeApprove2).toBe(0);
  });

  it("task plan approve accepts scaffolded Verify Steps for verify-required tasks without README surgery", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const ioNew = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Approvable scaffold task",
        "--description",
        "Verify-required scaffolds should be approvable as created",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "code",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = ioNew.stdout.trim();
      expect(ioNew.stderr).toContain("seeded a concrete ## Verify Steps section");
    } finally {
      ioNew.restore();
    }

    const codeSet = await runCli([
      "task",
      "plan",
      "set",
      taskId,
      "--text",
      "1) Implement the change\n2) Verify the change",
      "--updated-by",
      "ORCHESTRATOR",
      "--root",
      root,
    ]);
    expect(codeSet).toBe(0);

    const codeApprove = await runCli([
      "task",
      "plan",
      "approve",
      taskId,
      "--by",
      "USER",
      "--note",
      "OK",
      "--root",
      root,
    ]);
    expect(codeApprove).toBe(0);

    const readme = await readFile(
      path.join(root, ".agentplane", "tasks", taskId, "README.md"),
      "utf8",
    );
    expect(readme).toContain("Review the changed artifact or behavior for the `code` task.");
    expect(readme).not.toContain("<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->");
  });

  it("start blocks verify-required tasks when plan approval is disabled and Verify Steps is missing", async () => {
    const root = await mkGitRepoRoot();

    const cfg = defaultConfig();
    cfg.agents.approvals.require_plan = false;
    await writeConfig(root, cfg);

    const ioNew = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Start gate task",
        "--description",
        "Verify Steps gate should block start when require_plan=false",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "code",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = ioNew.stdout.trim();
    } finally {
      ioNew.restore();
    }

    const codeResetVerifySteps = await runCli([
      "task",
      "doc",
      "set",
      taskId,
      "--section",
      "Verify Steps",
      "--text",
      "<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->",
      "--root",
      root,
    ]);
    expect(codeResetVerifySteps).toBe(0);

    const ioStart = captureStdIO();
    try {
      const codeStart = await runCli([
        "start",
        taskId,
        "--author",
        "CODER",
        "--body",
        "Start: this comment is long enough to satisfy the min_chars requirement.",
        "--root",
        root,
      ]);
      expect(codeStart).toBe(3);
      expect(ioStart.stderr).toContain("cannot start work");
      expect(ioStart.stderr).toContain("Verify Steps");
    } finally {
      ioStart.restore();
    }

    const codeFill = await runCli([
      "task",
      "doc",
      "set",
      taskId,
      "--section",
      "Verify Steps",
      "--text",
      "Exit criteria: start must succeed when plan approval is disabled.",
      "--root",
      root,
    ]);
    expect(codeFill).toBe(0);

    const codeStart2 = await runCli([
      "start",
      taskId,
      "--author",
      "CODER",
      "--body",
      "Start: this comment is long enough to satisfy the min_chars requirement.",
      "--root",
      root,
    ]);
    expect(codeStart2).toBe(0);
  });
});
