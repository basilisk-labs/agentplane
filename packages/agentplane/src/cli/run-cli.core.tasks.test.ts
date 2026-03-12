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

import {
  defaultConfig,
  extractTaskSuffix,
  readTask,
  renderTaskReadme,
  type ResolvedProject,
} from "@agentplaneorg/core";

import { runCli } from "./run-cli.js";
import { BUNDLED_RECIPES_CATALOG } from "../recipes/bundled-recipes.js";
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
} from "./run-cli.test-helpers.js";
import { resolveUpdateCheckCachePath } from "./update-check.js";
import * as prompts from "./prompts.js";

installRunCliIntegrationHarness();

describe("runCli", () => {
  it("task new creates a task README and prints the id", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    let id = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "My task",
        "--description",
        "Why it matters",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "nodejs",
        "--verify",
        "sleep 1",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      id = io.stdout.trim();
      expect(id).toMatch(/^\d{12}-[A-Z0-9]{6}$/);
    } finally {
      io.restore();
    }

    const readmePath = path.join(root, ".agentplane", "tasks", id, "README.md");
    const readme = await readFile(readmePath, "utf8");
    expect(readme).toContain(`id: "${id}"`);
    expect(readme).toContain("doc_version: 3");
    expect(readme).toContain('status: "TODO"');
    expect(readme).toContain('title: "My task"');
    expect(readme).toContain("## Summary");
    expect(readme).toContain("## Scope");
    expect(readme).toContain("## Findings");
    expect(readme).not.toContain("## Risks");
  });

  it("task new normalizes escaped newlines into readable summary and scope text", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    let id = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Multiline task",
        "--description",
        String.raw`Line one\n\nLine two`,
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
      id = io.stdout.trim();
    } finally {
      io.restore();
    }

    const readmePath = path.join(root, ".agentplane", "tasks", id, "README.md");
    const readme = await readFile(readmePath, "utf8");
    expect(readme).toContain("description: |-");
    expect(readme).toContain("  Line one");
    expect(readme).toContain("  Line two");
    expect(readme).toContain("Line one\n\nLine two");
    expect(readme).not.toContain(String.raw`literal \n sequences`);
    expect(readme).toContain("- In scope: Line one Line two.");
  });

  it("task new supports depends-on and verify flags", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Dependent task",
        "--description",
        "Has deps and verify",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "nodejs",
        "--depends-on",
        "202601010101-ABCDEF",
        "--verify",
        "bun run ci",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = io.stdout.trim();
    } finally {
      io.restore();
    }

    const task = await readTask({ cwd: root, rootOverride: root, taskId });
    expect(task.frontmatter.depends_on).toContain("202601010101-ABCDEF");
    expect(task.frontmatter.verify).toContain("bun run ci");
  });

  it("task new requires values for flags", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Needs tag",
        "--description",
        "Missing tag value should error",
        "--owner",
        "CODER",
        "--tag",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Missing value after --tag");
    } finally {
      io.restore();
    }
  });

  it("task new fails when owner is not registered in .agentplane/agents", async () => {
    const root = await mkGitRepoRoot();
    const agentsDir = path.join(root, ".agentplane", "agents");
    await mkdir(agentsDir, { recursive: true });
    await writeFile(
      path.join(agentsDir, "CODER.json"),
      JSON.stringify({ id: "CODER", role: "Coder", workflow: [] }, null, 2),
      "utf8",
    );
    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Unknown owner",
        "--description",
        "Should fail fast",
        "--priority",
        "med",
        "--owner",
        "NOPE",
        "--tag",
        "nodejs",
        "--root",
        root,
      ]);
      expect(code).toBe(4);
      expect(io.stderr).toContain("unknown task owner id: NOPE");
    } finally {
      io.restore();
    }
  });

  it("task new seeds Verify Steps in README for verify-required primary tags", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    let id = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Code task",
        "--description",
        "Needs verify steps",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "code",
        "--verify",
        "bun run test:fast",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      id = io.stdout.trim();
      expect(io.stderr).toContain("seeded a default ## Verify Steps section");
    } finally {
      io.restore();
    }

    const readmePath = path.join(root, ".agentplane", "tasks", id, "README.md");
    const readme = await readFile(readmePath, "utf8");
    expect(readme).toContain("## Verify Steps");
    expect(readme).toContain("Run `bun run test:fast`.");
    expect(readme).toContain("Expected: it succeeds and confirms the requested outcome");
    expect(readme).toContain("## Findings");
    expect(readme).not.toContain("<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->");
  });

  it("task add creates tasks with explicit ids", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    const taskIds = ["202601010101-ABCD", "202601010102-BCDE"];
    try {
      const code = await runCli([
        "task",
        "add",
        ...taskIds,
        "--title",
        "Added task",
        "--description",
        "Added description",
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
    } finally {
      io.restore();
    }

    for (const taskId of taskIds) {
      const task = await readTask({ cwd: root, rootOverride: root, taskId });
      expect(task.frontmatter.id).toBe(taskId);
      expect(task.frontmatter.title).toBe("Added task");
      expect(task.frontmatter.doc_version).toBe(3);
    }
  });

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
  });

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

  it("task update supports replace flags", async () => {
    const root = await mkGitRepoRoot();
    const ioNew = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Replace flags",
        "--description",
        "Replace tags/depends/verify",
        "--owner",
        "CODER",
        "--tag",
        "docs",
        "--depends-on",
        "202601010101-ABCDEF",
        "--verify",
        "bun run lint",
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
        "update",
        taskId,
        "--replace-tags",
        "--allow-primary-change",
        "--tag",
        "code",
        "--replace-depends-on",
        "--depends-on",
        "202601020202-BCDEFG",
        "--replace-verify",
        "--verify",
        "bun run test",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    const task = await readTask({ cwd: root, rootOverride: root, taskId });
    expect(task.frontmatter.tags).toEqual(["code"]);
    expect(task.frontmatter.depends_on).toEqual(["202601020202-BCDEFG"]);
    expect(task.frontmatter.verify).toEqual(["bun run test"]);
  });

  it("task update allows code primary without verify commands", async () => {
    const root = await mkGitRepoRoot();
    const ioNew = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Verify required",
        "--description",
        "Ensure verify required",
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
        "update",
        taskId,
        "--replace-tags",
        "--allow-primary-change",
        "--tag",
        "code",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    const task = await readTask({ cwd: root, rootOverride: root, taskId });
    expect(task.frontmatter.tags).toEqual(["code"]);
    expect(task.frontmatter.verify).toEqual([]);
  });

  it("task update rejects missing and unknown flags", async () => {
    const root = await mkGitRepoRoot();
    const cases: { args: string[]; msg: string }[] = [
      {
        args: ["task", "update", "202601010101-ABCDEF", "--title"],
        msg: "Missing value after --title",
      },
      {
        args: ["task", "update", "202601010101-ABCDEF", "--wat", "x"],
        msg: "Unknown option: --wat.",
      },
    ];

    for (const entry of cases) {
      const io = captureStdIO();
      try {
        const code = await runCli([...entry.args, "--root", root]);
        expect(code).toBe(2);
        expect(io.stderr).toContain(entry.msg);
      } finally {
        io.restore();
      }
    }
  });

  it("task scrub replaces values across tasks", async () => {
    const root = await mkGitRepoRoot();
    let taskId = "";
    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Scrub task",
          "--description",
          "hello world",
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

    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "scrub",
          "--find",
          "hello",
          "--replace",
          "hi",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
      } finally {
        io.restore();
      }
    }

    const task = await readTask({ cwd: root, rootOverride: root, taskId });
    expect(task.frontmatter.description).toContain("hi");
  });

  it("task scrub supports dry-run and quiet", async () => {
    const root = await mkGitRepoRoot();
    const ioNew = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Scrub dry-run",
        "--description",
        "dry-run value",
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
        "scrub",
        "--find",
        "dry-run",
        "--replace",
        "ignored",
        "--dry-run",
        "--quiet",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    const task = await readTask({ cwd: root, rootOverride: root, taskId });
    expect(task.frontmatter.description).toContain("dry-run value");
  });

  it("task scrub rejects missing find/replace values and unknown flags", async () => {
    const root = await mkGitRepoRoot();
    const cases: { args: string[]; msg: string }[] = [
      { args: ["task", "scrub"], msg: "Missing required option: --find" },
      { args: ["task", "scrub", "--find"], msg: "Missing value after --find" },
      { args: ["task", "scrub", "--replace"], msg: "Missing value after --replace" },
      { args: ["task", "scrub", "--nope", "x"], msg: "Unknown option: --nope." },
    ];

    for (const entry of cases) {
      const io = captureStdIO();
      try {
        const code = await runCli([...entry.args, "--root", root]);
        expect(code).toBe(2);
        expect(io.stderr).toContain(entry.msg);
      } finally {
        io.restore();
      }
    }
  });
});
