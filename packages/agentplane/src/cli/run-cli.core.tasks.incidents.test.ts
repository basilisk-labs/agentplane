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
import { createIncidentRegistrySkeleton } from "../runtime/incidents/index.js";

import { runCli } from "./run-cli.js";
import {
  filterAgentsByWorkflow,
  loadAgentTemplates,
  loadAgentsTemplate,
} from "../agents/agents-template.js";
import type * as taskBackend from "../backends/task-backend.js";
import {
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

installRunCliIntegrationHarness();
const TASKS_CLI_TIMEOUT_MS = 300_000;

describe("runCli", { timeout: TASKS_CLI_TIMEOUT_MS }, () => {
  it("finish promotes structured external incident candidates into the incident registry", async () => {
    const root = await mkGitRepoRoot();
    await configureGitUser(root);
    const config = defaultConfig();
    config.agents.approvals.require_plan = false;
    await writeConfig(root, config);
    await mkdir(path.join(root, ".agentplane", "policy"), { recursive: true });
    await writeFile(
      path.join(root, ".agentplane", "policy", "incidents.md"),
      createIncidentRegistrySkeleton(),
      "utf8",
    );
    await commitAll(root, "test: seed incident registry");

    let taskId = "";
    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Handle external release outage",
          "--description",
          "Document external release recovery advice",
          "--priority",
          "med",
          "--owner",
          "CODER",
          "--tag",
          "release",
          "--tag",
          "github-actions",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        taskId = io.stdout.trim();
      } finally {
        io.restore();
      }
    }

    for (const [section, text] of [
      ["Verify Steps", "1. Run the targeted release workflow checks."],
      [
        "Findings",
        [
          "- Observation: workflow_dispatch on release tags can still hang while waiting on exact-SHA push runs that never existed.",
          "  Impact: manual release recovery stalls even after the repository fix is known.",
          "  Resolution: validate the exact release ref inside the workflow before rerunning recovery.",
          "  Fixability: external",
        ].join("\n"),
      ],
    ] as const) {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "doc",
          "set",
          taskId,
          "--section",
          section,
          "--text",
          text,
          "--root",
          root,
        ]);
        expect(code).toBe(0);
      } finally {
        io.restore();
      }
    }

    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "start-ready",
          taskId,
          "--author",
          "CODER",
          "--body",
          "Start: capture external release recovery advice and ship the task changes.",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
      } finally {
        io.restore();
      }
    }

    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "verify",
          taskId,
          "--ok",
          "--by",
          "CODER",
          "--note",
          "Verified: targeted release workflow checks passed.",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
      } finally {
        io.restore();
      }
    }

    const execFileAsync = promisify(execFile);
    const { stdout } = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: root,
      env: cleanGitEnv(process.env),
    });
    const commitHash = stdout.trim();

    const ioFinish = captureStdIO();
    try {
      const code = await runCli([
        "finish",
        taskId,
        "--author",
        "CODER",
        "--body",
        "Verified: release recovery advice is captured and the task is complete.",
        "--result",
        "Captured reusable external release recovery advice.",
        "--commit",
        commitHash,
        "--no-close-commit",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(ioFinish.stdout).toContain("incident registry updated (1 promoted)");
      expect(ioFinish.stdout).toContain("ids=INC-");
      expect(ioFinish.stdout).toContain("files=.agentplane/policy/incidents.md");
    } finally {
      ioFinish.restore();
    }

    const incidents = await readFile(
      path.join(root, ".agentplane", "policy", "incidents.md"),
      "utf8",
    );
    expect(incidents).toContain(`source_task: ${taskId}`);
    expect(incidents).toContain("fixability: external");
    expect(incidents).toContain("state: open");
    expect(incidents).toContain(
      "validate the exact release ref inside the workflow before rerunning recovery",
    );
  });
});
