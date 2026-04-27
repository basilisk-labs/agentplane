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
  it("task comment validates flags and appends comments", async () => {
    const root = await mkGitRepoRoot();
    let taskId = "";
    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Comment task",
          "--description",
          "Needs comments",
          "--priority",
          "med",
          "--owner",
          "CODER",
          "--tag",
          "docs",
          "--verify",
          "echo ok",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        taskId = io.stdout.trim();
      } finally {
        io.restore();
      }
    }

    {
      const io = captureStdIO();
      try {
        const code = await runCli(["task", "comment", taskId, "--author", "Coder", "--root", root]);
        expect(code).toBe(2);
        expect(io.stderr).toContain("Missing required option: --body");
      } finally {
        io.restore();
      }
    }

    {
      const io = captureStdIO();
      try {
        const code = await runCli(["task", "comment", taskId, "--author", "--root", root]);
        expect(code).toBe(2);
        expect(io.stderr).toContain("Missing value after --author");
      } finally {
        io.restore();
      }
    }

    {
      const io = captureStdIO();
      try {
        const code = await runCli(["task", "comment", taskId, "--nope", "--root", root]);
        expect(code).toBe(2);
        expect(io.stderr).toContain("Unknown option: --nope.");
      } finally {
        io.restore();
      }
    }

    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "comment",
          taskId,
          "--author",
          "Coder",
          "--body",
          "All good",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
      } finally {
        io.restore();
      }
    }

    const task = await readTask({ cwd: root, rootOverride: root, taskId });
    expect(task.frontmatter.comments?.length).toBe(1);
    expect(task.frontmatter.comments?.[0]?.body).toContain("All good");
  });

  it("task close-duplicate closes duplicate task in one command", async () => {
    const root = await mkGitRepoRoot();
    const ids: string[] = [];
    for (const title of ["Canonical task", "Duplicate task"]) {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          title,
          "--description",
          "Task closure check",
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
        ids.push(io.stdout.trim());
      } finally {
        io.restore();
      }
    }

    const canonicalId = ids[0] ?? "";
    const duplicateId = ids[1] ?? "";
    expect(canonicalId).toMatch(/^\d{12}-[A-Z0-9]{6}$/);
    expect(duplicateId).toMatch(/^\d{12}-[A-Z0-9]{6}$/);

    const ioClose = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "close-duplicate",
        duplicateId,
        "--of",
        canonicalId,
        "--author",
        "ORCHESTRATOR",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      ioClose.restore();
    }

    const duplicate = await readTask({ cwd: root, rootOverride: root, taskId: duplicateId });
    expect(duplicate.frontmatter.status).toBe("DONE");
    expect(duplicate.frontmatter.result_summary).toBe(`Closed as duplicate of ${canonicalId}.`);
    expect(duplicate.frontmatter.risk_level).toBe("low");
    const comments = Array.isArray(duplicate.frontmatter.comments)
      ? duplicate.frontmatter.comments
      : [];
    const lastBody = comments.at(-1)?.body ?? "";
    expect(lastBody).toContain(`duplicate of ${canonicalId}`);
  });

  it("task close-duplicate rejects same task id in --of", async () => {
    const root = await mkGitRepoRoot();
    const ioNew = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Self duplicate",
        "--description",
        "Should fail",
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

    const ioClose = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "close-duplicate",
        taskId,
        "--of",
        taskId,
        "--author",
        "ORCHESTRATOR",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(ioClose.stderr).toContain("Duplicate target must differ from task-id");
    } finally {
      ioClose.restore();
    }
  });

  it("task close-duplicate recovers the duplicate README from the task worktree when base is missing it", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await configureGitUser(root);

    const ids: string[] = [];
    for (const title of ["Canonical task", "Duplicate task"]) {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          title,
          "--description",
          "Task closure check",
          "--priority",
          "med",
          "--owner",
          "CODER",
          "--tag",
          "workflow",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        ids.push(io.stdout.trim());
      } finally {
        io.restore();
      }
    }

    const canonicalId = ids[0] ?? "";
    const duplicateId = ids[1] ?? "";
    const execFileAsync = promisify(execFile);
    await writeFile(path.join(root, "seed.txt"), "seed\n", "utf8");
    await execFileAsync("git", ["add", "seed.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "seed"], { cwd: root });
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);
    await runCliSilent([
      "task",
      "plan",
      "approve",
      duplicateId,
      "--by",
      "USER",
      "--note",
      "OK",
      "--root",
      root,
    ]);
    await runCliSilent([
      "work",
      "start",
      duplicateId,
      "--agent",
      "CODER",
      "--slug",
      "duplicate-close-worktree",
      "--worktree",
      "--root",
      root,
    ]);

    const worktreePath = path.join(
      root,
      ".agentplane",
      "worktrees",
      `${duplicateId}-duplicate-close-worktree`,
    );
    const worktreeReadmePath = path.join(
      worktreePath,
      ".agentplane",
      "tasks",
      duplicateId,
      "README.md",
    );
    expect(await pathExists(worktreeReadmePath)).toBe(true);

    await rm(path.join(root, ".agentplane", "tasks", duplicateId), {
      recursive: true,
      force: true,
    });
    expect(
      await pathExists(path.join(root, ".agentplane", "tasks", duplicateId, "README.md")),
    ).toBe(false);

    const ioClose = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "close-duplicate",
        duplicateId,
        "--of",
        canonicalId,
        "--author",
        "ORCHESTRATOR",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      ioClose.restore();
    }

    const duplicate = await readTask({ cwd: root, rootOverride: root, taskId: duplicateId });
    expect(duplicate.frontmatter.status).toBe("DONE");
    expect(duplicate.frontmatter.result_summary).toBe(`Closed as duplicate of ${canonicalId}.`);
    expect(
      await pathExists(path.join(root, ".agentplane", "tasks", duplicateId, "README.md")),
    ).toBe(true);
  });

  it("task close-noop closes bookkeeping tasks in one command", async () => {
    const root = await mkGitRepoRoot();
    let taskId = "";
    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Bookkeeping-only task",
          "--description",
          "No code work",
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

    const ioClose = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "close-noop",
        taskId,
        "--author",
        "ORCHESTRATOR",
        "--note",
        "duplicate tracking artifact",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      ioClose.restore();
    }

    const task = await readTask({ cwd: root, rootOverride: root, taskId });
    expect(task.frontmatter.status).toBe("DONE");
    expect(task.frontmatter.result_summary).toBe("No-op closure recorded.");
    expect(task.frontmatter.risk_level).toBe("low");
    const comments = Array.isArray(task.frontmatter.comments) ? task.frontmatter.comments : [];
    expect(String(comments.at(-1)?.body ?? "")).toContain("no-op bookkeeping");
  });

  it("task update appends tags and depends-on", async () => {
    const root = await mkGitRepoRoot();
    let taskId = "";
    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Update task",
          "--description",
          "Needs update",
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

    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "update",
        taskId,
        "--tag",
        "nodejs",
        "--depends-on",
        "202601010101-ABCD",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    const task = await readTask({ cwd: root, rootOverride: root, taskId });
    expect(task.frontmatter.tags).toContain("nodejs");
    expect(task.frontmatter.depends_on).toContain("202601010101-ABCD");
  });

  it("task set-status validates commit flags and policies", async () => {
    const root = await mkGitRepoRoot();
    let taskId = "";
    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Status task",
          "--description",
          "Needs status",
          "--priority",
          "med",
          "--owner",
          "CODER",
          "--tag",
          "docs",
          "--verify",
          "echo ok",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        taskId = io.stdout.trim();
      } finally {
        io.restore();
      }
    }

    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "set-status",
          taskId,
          "DOING",
          "--commit",
          "--root",
          root,
        ]);
        expect(code).toBe(2);
        expect(io.stderr).toContain("Missing value after --commit");
      } finally {
        io.restore();
      }
    }

    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "set-status",
          taskId,
          "DOING",
          "--commit-emoji",
          "--root",
          root,
        ]);
        expect(code).toBe(2);
        expect(io.stderr).toContain("Missing value after --commit-emoji");
      } finally {
        io.restore();
      }
    }

    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "set-status",
          taskId,
          "DOING",
          "--commit-allow",
          "--root",
          root,
        ]);
        expect(code).toBe(2);
        expect(io.stderr).toContain("Missing value after --commit-allow");
      } finally {
        io.restore();
      }
    }

    const config = defaultConfig();
    config.status_commit_policy = "confirm";
    await writeConfig(root, config);
    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "set-status",
          taskId,
          "DOING",
          "--commit-from-comment",
          "--root",
          root,
        ]);
        expect(code).toBe(2);
        expect(io.stderr).toContain("status_commit_policy");
      } finally {
        io.restore();
      }
    }

    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "set-status",
          taskId,
          "DOING",
          "--commit-from-comment",
          "--confirm-status-commit",
          "--root",
          root,
        ]);
        expect(code).toBe(2);
        expect(io.stderr).toContain("--body is required");
      } finally {
        io.restore();
      }
    }
  });

  it("task start-ready checks readiness and starts task in one command", async () => {
    const root = await mkGitRepoRoot();
    const config = defaultConfig();
    config.agents.approvals.require_plan = false;
    await writeConfig(root, config);
    let taskId = "";
    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Ready task",
          "--description",
          "single-step start",
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

    const ioStart = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "start-ready",
        taskId,
        "--author",
        "CODER",
        "--body",
        "Start: begin docs update through start-ready helper with deterministic checks.",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(ioStart.stdout).toContain("ready");
      expect(ioStart.stdout).not.toContain("started");
    } finally {
      ioStart.restore();
    }

    const task = await readTask({ cwd: root, rootOverride: root, taskId });
    expect(task.frontmatter.status).toBe("DOING");
  });

  it("task start-ready prints matching incident advice for analogous tasks", async () => {
    const root = await mkGitRepoRoot();
    const config = defaultConfig();
    config.agents.approvals.require_plan = false;
    await writeConfig(root, config);
    await mkdir(path.join(root, ".agentplane", "policy"), { recursive: true });
    await writeFile(
      path.join(root, ".agentplane", "policy", "incidents.md"),
      [
        createIncidentRegistrySkeleton().trimEnd(),
        "",
        "- id: INC-20260403-01",
        "  date: 2026-04-03",
        "  scope: docs website dependency drift",
        "  tags: docs, website",
        "  match: docs, website, dependency",
        "  failure: docs check failed because a website dependency drifted outside the repo change scope",
        "  advice: re-run the targeted docs site check first and confirm the failure is unrelated before widening task scope",
        "  rule: Docs-only tasks MUST confirm unrelated website drift before widening scope.",
        "  evidence: task 202603091054-V2X1QB",
        "  enforcement: manual",
        "  source_task: 202603091054-V2X1QB",
        "  fixability: external",
        "  state: open",
        "",
      ].join("\n"),
      "utf8",
    );

    let taskId = "";
    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Refresh docs website copy",
          "--description",
          "Update docs and keep website checks narrow",
          "--priority",
          "med",
          "--owner",
          "CODER",
          "--tag",
          "docs",
          "--tag",
          "website",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        taskId = io.stdout.trim();
      } finally {
        io.restore();
      }
    }

    const ioStart = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "start-ready",
        taskId,
        "--author",
        "CODER",
        "--body",
        "Start: update docs website copy while keeping unrelated drift out of scope.",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(ioStart.stdout).toContain("incident advice for analogous tasks");
      expect(ioStart.stdout).toContain("INC-20260403-01");
      expect(ioStart.stdout).toContain("re-run the targeted docs site check first");
    } finally {
      ioStart.restore();
    }
  });

  it("task start-ready fails early when dependencies are not ready", async () => {
    const root = await mkGitRepoRoot();
    const config = defaultConfig();
    config.agents.approvals.require_plan = false;
    await writeConfig(root, config);
    let taskId = "";
    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Blocked by dependency",
          "--description",
          "should not start",
          "--priority",
          "med",
          "--owner",
          "CODER",
          "--tag",
          "docs",
          "--depends-on",
          "202601010101-MISSING",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        taskId = io.stdout.trim();
      } finally {
        io.restore();
      }
    }

    const ioStart = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "start-ready",
        taskId,
        "--author",
        "CODER",
        "--body",
        "Start: attempt task with unresolved dependency through helper command flow.",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(ioStart.stderr).toContain("Task is not ready");
    } finally {
      ioStart.restore();
    }
  });

  it("task set-status enforces readiness and accepts commit metadata", async () => {
    const root = await mkGitRepoRoot();
    await configureGitUser(root);
    let taskId = "";
    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Ready task",
          "--description",
          "Needs deps",
          "--priority",
          "med",
          "--owner",
          "CODER",
          "--tag",
          "docs",
          "--verify",
          "echo ok",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        taskId = io.stdout.trim();
      } finally {
        io.restore();
      }
    }

    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "update",
          taskId,
          "--depends-on",
          "202601010101-ABCD",
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
        const code = await runCli(["task", "set-status", taskId, "DOING", "--root", root]);
        expect(code).toBe(2);
        expect(io.stderr).toContain("Task is not ready");
      } finally {
        io.restore();
      }
    }

    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "set-status",
          taskId,
          "DOING",
          "--force",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
      } finally {
        io.restore();
      }
    }

    await writeFile(path.join(root, "commit.txt"), "content", "utf8");
    await commitAll(root, "chore: status");
    const execFileAsync = promisify(execFile);
    const { stdout: commitSha } = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });
    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "set-status",
        taskId,
        "DONE",
        "--force",
        "--commit",
        commitSha.trim(),
        "--author",
        "CODER",
        "--body",
        "Done",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }
  }, 180_000);

  it("task set-status requires explicit approval for --force in conservative profile", async () => {
    const root = await mkGitRepoRoot();
    const cfg = defaultConfig();
    (cfg as unknown as { execution?: { profile?: string } }).execution = {
      profile: "conservative",
    };
    await writeConfig(root, cfg);
    let taskId = "";
    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Conservative force",
          "--description",
          "force should be blocked",
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

    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "set-status",
          taskId,
          "DOING",
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
          "task",
          "set-status",
          taskId,
          "DOING",
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
