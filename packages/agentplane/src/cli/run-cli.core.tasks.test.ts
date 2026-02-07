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
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

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
import * as taskBackend from "../backends/task-backend.js";
import {
  captureStdIO,
  cleanGitEnv,
  commitAll,
  configureGitUser,
  createUpgradeBundle,
  getAgentplaneHome,
  gitBranchExists,
  runCliSilent,
  mkGitRepoRoot,
  mkGitRepoRootWithBranch,
  mkTempDir,
  pathExists,
  registerAgentplaneHome,
  silenceStdIO,
  stageGitignoreIfPresent,
  writeConfig,
  writeDefaultConfig,
} from "./run-cli.test-helpers.js";
import { resolveUpdateCheckCachePath } from "./update-check.js";
import * as prompts from "./prompts.js";

registerAgentplaneHome();
let restoreStdIO: (() => void) | null = null;

beforeEach(() => {
  restoreStdIO = silenceStdIO();
});

afterEach(() => {
  restoreStdIO?.();
  restoreStdIO = null;
});

function stubTaskBackend(overrides: Partial<taskBackend.TaskBackend>): taskBackend.TaskBackend {
  return {
    id: "local",
    listTasks: vi.fn().mockResolvedValue([]),
    getTask: vi.fn().mockResolvedValue(null),
    writeTask: vi.fn().mockImplementation(() => Promise.resolve()),
    ...overrides,
  };
}

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
    expect(readme).toContain('status: "TODO"');
    expect(readme).toContain('title: "My task"');
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
      expect(io.stderr).toContain("Missing value for --tag");
    } finally {
      io.restore();
    }
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
        expect(io.stderr).toContain("Usage: agentplane task comment");
      } finally {
        io.restore();
      }
    }

    {
      const io = captureStdIO();
      try {
        const code = await runCli(["task", "comment", taskId, "--author", "--root", root]);
        expect(code).toBe(2);
        expect(io.stderr).toContain("Missing value for --author");
      } finally {
        io.restore();
      }
    }

    {
      const io = captureStdIO();
      try {
        const code = await runCli(["task", "comment", taskId, "--nope", "--root", root]);
        expect(code).toBe(2);
        expect(io.stderr).toContain("Usage: agentplane task comment");
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
        expect(io.stderr).toContain("Missing value for --commit");
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
        expect(io.stderr).toContain("Missing value for --commit-emoji");
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
        expect(io.stderr).toContain("Missing value for --commit-allow");
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

  it("task update allows code tags without verify commands", async () => {
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
      const code = await runCli(["task", "update", taskId, "--tag", "code", "--root", root]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    const task = await readTask({ cwd: root, rootOverride: root, taskId });
    expect(task.frontmatter.tags).toEqual(["docs", "code"]);
    expect(task.frontmatter.verify).toEqual([]);
  });

  it("task update rejects missing and unknown flags", async () => {
    const root = await mkGitRepoRoot();
    const cases: { args: string[]; msg: string }[] = [
      {
        args: ["task", "update", "202601010101-ABCDEF", "--title"],
        msg: "Missing value for --title",
      },
      {
        args: ["task", "update", "202601010101-ABCDEF", "--wat", "x"],
        msg: "Unknown flag: --wat",
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
      { args: ["task", "scrub"], msg: "Usage: agentplane task scrub --find" },
      { args: ["task", "scrub", "--find"], msg: "Missing value for --find" },
      { args: ["task", "scrub", "--replace"], msg: "Missing value for --replace" },
      { args: ["task", "scrub", "--nope", "x"], msg: "Unknown flag: --nope" },
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

  it("task next shows ready tasks only", async () => {
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
          "Ready task",
          "--description",
          "No deps",
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
          "Blocked task",
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
    const io = captureStdIO();
    try {
      const code = await runCli(["task", "next", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain(taskA);
      expect(io.stdout).not.toContain(taskB);
    } finally {
      io.restore();
    }
  });

  it("task next supports limit and quiet flags", async () => {
    const root = await mkGitRepoRoot();
    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Ready task",
          "--description",
          "Limit test",
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
    }

    const io = captureStdIO();
    try {
      const code = await runCli(["task", "next", "--limit", "1", "--quiet", "--root", root]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }
  });

  it("task next applies status, owner, and tag filters", async () => {
    const root = await mkGitRepoRoot();
    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Filtered next",
          "--description",
          "Filter me",
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
    }

    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "next",
        "--status",
        "TODO",
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
  });

  it("task next rejects invalid limit values", async () => {
    const root = await mkGitRepoRoot();
    const cases: { args: string[]; msg: string }[] = [
      { args: ["task", "next", "--limit"], msg: "Missing value for --limit" },
      {
        args: ["task", "next", "--limit", "nope"],
        msg: "Invalid value for --limit: nope (expected integer)",
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

  it("task search finds matching tasks", async () => {
    const root = await mkGitRepoRoot();
    let taskId = "";
    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Searchable task",
          "--description",
          "Find me",
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
      const code = await runCli(["task", "search", "Searchable", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain(taskId);
    } finally {
      io.restore();
    }
  });

  it("task search supports regex and limit filters", async () => {
    const root = await mkGitRepoRoot();
    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Regex task",
          "--description",
          "Searchable content",
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
    }

    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "search",
        "Regex.*",
        "--regex",
        "--limit",
        "1",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }
  });

  it("task search applies status, owner, and tag filters", async () => {
    const root = await mkGitRepoRoot();
    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Filtered search",
          "--description",
          "Search scope",
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
    }

    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "search",
        "Filtered",
        "--status",
        "TODO",
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
  });

  it("task search rejects empty queries and invalid limits", async () => {
    const root = await mkGitRepoRoot();
    const cases: { args: string[]; msg: string }[] = [
      { args: ["task", "search", "  "], msg: "Missing query (expected non-empty text)" },
      { args: ["task", "search", "query", "--limit"], msg: "Missing value for --limit" },
      {
        args: ["task", "search", "query", "--limit", "nope"],
        msg: "Invalid value for --limit: nope (expected integer)",
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

  it("task search rejects invalid regex", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["task", "search", "(", "--regex", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Invalid regex");
    } finally {
      io.restore();
    }
  });

  it("task doc show prints section content", async () => {
    const root = await mkGitRepoRoot();
    let taskId = "";
    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Doc task",
          "--description",
          "Has doc",
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
          "doc",
          "set",
          taskId,
          "--section",
          "Summary",
          "--text",
          "Doc section text",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
      } finally {
        io.restore();
      }
    }
    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "doc",
        "show",
        taskId,
        "--section",
        "Summary",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("Doc section text");
    } finally {
      io.restore();
    }
  });

  it("task verify-show prints Verify Steps", async () => {
    const root = await mkGitRepoRoot();
    let taskId = "";
    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Verify show",
          "--description",
          "Has verify steps",
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
          "doc",
          "set",
          taskId,
          "--section",
          "Verify Steps",
          "--text",
          "Verifier instructions",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
      } finally {
        io.restore();
      }
    }

    const io = captureStdIO();
    try {
      const code = await runCli(["task", "verify-show", taskId, "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("Verifier instructions");
    } finally {
      io.restore();
    }
  });

  it("task doc show supports quiet when section is missing", async () => {
    const root = await mkGitRepoRoot();
    let taskId = "";
    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Doc show quiet",
          "--description",
          "Missing section",
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
        "doc",
        "show",
        taskId,
        "--section",
        "Notes",
        "--quiet",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }
  });

  it("task doc show rejects missing values and unknown flags", async () => {
    const root = await mkGitRepoRoot();
    const taskId = "202602011330-DOC01";
    const cases: { args: string[]; msg: string }[] = [
      { args: ["task", "doc", "show", taskId, "--section"], msg: "Missing value for --section" },
      { args: ["task", "doc", "show", taskId, "--nope"], msg: "Unknown flag: --nope" },
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

  it("task comment and set-status update task metadata", async () => {
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
          "Tracks status",
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
          "comment",
          taskId,
          "--author",
          "CODER",
          "--body",
          "Comment body",
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
          "set-status",
          taskId,
          "DOING",
          "--author",
          "CODER",
          "--body",
          "Status update body",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
      } finally {
        io.restore();
      }
    }

    const task = await readTask({ cwd: root, rootOverride: root, taskId });
    expect(task.frontmatter.status).toBe("DOING");
    expect(task.frontmatter.comments.length).toBeGreaterThan(0);
  });

  it("task show prints task frontmatter json", async () => {
    const root = await mkGitRepoRoot();

    const io1 = captureStdIO();
    let id = "";
    try {
      const code1 = await runCli([
        "task",
        "new",
        "--title",
        "My task",
        "--description",
        "Why it matters",
        "--owner",
        "CODER",
        "--tag",
        "nodejs",
        "--root",
        root,
      ]);
      expect(code1).toBe(0);
      id = io1.stdout.trim();
    } finally {
      io1.restore();
    }

    const io2 = captureStdIO();
    try {
      const code2 = await runCli(["task", "show", id, "--root", root]);
      expect(code2).toBe(0);
      expect(io2.stdout).toContain(`"id": "${id}"`);
      expect(io2.stdout).toContain('"status": "TODO"');
    } finally {
      io2.restore();
    }
  });

  it("task list prints tasks", async () => {
    const root = await mkGitRepoRoot();

    const io1 = captureStdIO();
    let id = "";
    try {
      const code1 = await runCli([
        "task",
        "new",
        "--title",
        "My task",
        "--description",
        "Why it matters",
        "--owner",
        "CODER",
        "--tag",
        "nodejs",
        "--root",
        root,
      ]);
      expect(code1).toBe(0);
      id = io1.stdout.trim();
    } finally {
      io1.restore();
    }

    const io2 = captureStdIO();
    try {
      const code2 = await runCli(["task", "list", "--root", root]);
      expect(code2).toBe(0);
      expect(io2.stdout).toContain(id);
      expect(io2.stdout).toContain("[TODO]");
      expect(io2.stdout).toContain("My task");
    } finally {
      io2.restore();
    }
  });

  it("task list is empty when no tasks exist", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["task", "list", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("Total: 0");
    } finally {
      io.restore();
    }
  });

  it("task list supports filters and quiet mode", async () => {
    const root = await mkGitRepoRoot();
    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Filter task",
          "--description",
          "Tagged task",
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
    }

    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "list",
        "--status",
        "TODO",
        "--owner",
        "CODER",
        "--tag",
        "docs",
        "--quiet",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }
  });

  it("task list rejects missing filter values and unknown flags", async () => {
    const root = await mkGitRepoRoot();
    const cases: { args: string[]; msg: string }[] = [
      { args: ["task", "list", "--status"], msg: "Missing value for --status" },
      { args: ["task", "list", "--owner"], msg: "Missing value for --owner" },
      { args: ["task", "list", "--tag"], msg: "Missing value for --tag" },
      { args: ["task", "list", "--nope"], msg: "Unknown flag: --nope" },
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

  it("task doc set updates a task README section and bumps metadata", async () => {
    const root = await mkGitRepoRoot();

    const io1 = captureStdIO();
    let id = "";
    try {
      const code1 = await runCli([
        "task",
        "new",
        "--title",
        "My task",
        "--description",
        "Why it matters",
        "--owner",
        "CODER",
        "--tag",
        "nodejs",
        "--root",
        root,
      ]);
      expect(code1).toBe(0);
      id = io1.stdout.trim();
    } finally {
      io1.restore();
    }

    const io2 = captureStdIO();
    try {
      const code2 = await runCli([
        "task",
        "doc",
        "set",
        id,
        "--section",
        "Summary",
        "--text",
        "Hello",
        "--updated-by",
        "DOCS",
        "--root",
        root,
      ]);
      expect(code2).toBe(0);
      expect(io2.stdout).toContain(path.join(root, ".agentplane", "tasks", id, "README.md"));
    } finally {
      io2.restore();
    }

    const readmePath = path.join(root, ".agentplane", "tasks", id, "README.md");
    const readme = await readFile(readmePath, "utf8");
    expect(readme).toContain("## Summary");
    expect(readme).toContain("Hello");
    expect(readme).toContain('doc_updated_by: "DOCS"');
  });

  it("task scaffold writes and enforces overwrite", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = "202602011330-SCAF01";

    const io = captureStdIO();
    try {
      const code = await runCli(["task", "scaffold", taskId, "--force", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("wrote");
    } finally {
      io.restore();
    }

    const ioOverwrite = captureStdIO();
    try {
      const code = await runCli(["task", "scaffold", taskId, "--root", root]);
      expect(code).toBe(2);
      expect(ioOverwrite.stderr).toContain("File already exists");
    } finally {
      ioOverwrite.restore();
    }

    const ioForce = captureStdIO();
    try {
      const code = await runCli(["task", "scaffold", taskId, "--overwrite", "--root", root]);
      expect(code).toBe(0);
    } finally {
      ioForce.restore();
    }
  });

  it("task scaffold supports quiet and title", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = "202602011330-SCAF02";

    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "scaffold",
        taskId,
        "--title",
        "Custom title",
        "--force",
        "--quiet",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }
  });

  it("task scaffold rejects missing title values and unknown flags", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = "202602011330-SCAF03";
    const cases: { args: string[]; msg: string }[] = [
      { args: ["task", "scaffold", taskId, "--title"], msg: "Missing value for --title" },
      { args: ["task", "scaffold", taskId, "--nope", "x"], msg: "Unknown flag: --nope" },
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

  it("task normalize and migrate support quiet/force flags", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = "202602011330-NRM01";

    const addCode = await runCliSilent([
      "task",
      "add",
      taskId,
      "--title",
      "Normalize task",
      "--description",
      "Normalize test",
      "--priority",
      "med",
      "--owner",
      "CODER",
      "--tag",
      "nodejs",
      "--root",
      root,
    ]);
    expect(addCode).toBe(0);

    const ioNormalize = captureStdIO();
    try {
      const code = await runCli(["task", "normalize", "--quiet", "--force", "--root", root]);
      expect(code).toBe(0);
      expect(ioNormalize.stdout).toBe("");
    } finally {
      ioNormalize.restore();
    }

    const exportPath = path.join(root, "tasks-export.json");
    await writeFile(
      exportPath,
      JSON.stringify(
        {
          tasks: [
            {
              id: "202602011330-MGR01",
              title: "Migrated task",
              description: "Migrate test",
              status: "TODO",
              priority: "med",
              owner: "CODER",
              depends_on: [],
              tags: ["nodejs"],
              verify: [],
              comments: [],
              doc_version: 2,
              doc_updated_at: new Date().toISOString(),
              doc_updated_by: "agentplane",
            },
          ],
        },
        null,
        2,
      ),
      "utf8",
    );

    const ioMigrate = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "migrate",
        "--source",
        path.relative(root, exportPath),
        "--quiet",
        "--force",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(ioMigrate.stdout).toBe("");
    } finally {
      ioMigrate.restore();
    }

    const migrated = await readTask({
      cwd: root,
      rootOverride: root,
      taskId: "202602011330-MGR01",
    });
    expect(migrated?.id).toBe("202602011330-MGR01");
  }, 15_000);

  it("task normalize and migrate reject unknown flags and missing source values", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const cases: { args: string[]; msg: string }[] = [
      { args: ["task", "normalize", "--nope"], msg: "Unknown flag" },
      { args: ["task", "migrate", "--source"], msg: "Missing value for --source" },
      { args: ["task", "migrate", "--nope"], msg: "Unknown flag" },
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

  it("task doc set appends required sections when missing", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = "202601300000-ABCD";
    const taskDir = path.join(root, ".agentplane", "tasks", taskId);
    await mkdir(taskDir, { recursive: true });
    const readme = renderTaskReadme(
      {
        id: taskId,
        title: "Task",
        description: "",
        status: "TODO",
        priority: "med",
        owner: "CODER",
        depends_on: [],
        tags: [],
        verify: [],
      },
      "## Summary\n\nOnly summary",
    );
    await writeFile(path.join(taskDir, "README.md"), readme, "utf8");

    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "doc",
        "set",
        taskId,
        "--section",
        "Summary",
        "--text",
        "Updated",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    const updated = await readFile(path.join(taskDir, "README.md"), "utf8");
    expect(updated).toContain("## Summary");
    expect(updated).toContain("Updated");
    expect(updated).toContain("## Scope");
    expect(updated).toContain("## Risks");
  });

  it("task doc set dedupes repeated section headings", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = "202601300002-ABCD";
    const taskDir = path.join(root, ".agentplane", "tasks", taskId);
    await mkdir(taskDir, { recursive: true });
    const readme = renderTaskReadme(
      {
        id: taskId,
        title: "Task",
        description: "",
        status: "TODO",
        priority: "med",
        owner: "CODER",
        depends_on: [],
        tags: [],
        verify: [],
      },
      "## Summary\n\n## Scope\n\n## Risks\n\n## Verify Steps\n\n## Rollback Plan\n",
    );
    const duplicated = `${readme}\n## Summary\n\nOld summary\n\n## Scope\n\nOld scope\n`;
    await writeFile(path.join(taskDir, "README.md"), duplicated, "utf8");

    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "doc",
        "set",
        taskId,
        "--section",
        "Summary",
        "--text",
        "Updated summary",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    const updated = await readFile(path.join(taskDir, "README.md"), "utf8");
    expect((updated.match(/^## Summary$/gm) ?? []).length).toBe(1);
    expect((updated.match(/^## Scope$/gm) ?? []).length).toBe(1);
    expect(updated).toContain("Updated summary");
  });

  it("task doc set splits concatenated section headings", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = "202601300002-ABCD";
    const taskDir = path.join(root, ".agentplane", "tasks", taskId);
    await mkdir(taskDir, { recursive: true });
    const readme = renderTaskReadme(
      {
        id: taskId,
        title: "Task",
        description: "",
        status: "TODO",
        priority: "med",
        owner: "CODER",
        depends_on: [],
        tags: [],
        verify: [],
      },
      "## Summary\n\n## Scope\n\n## Risks\n\n## Verify Steps\n\n## Rollback Plan\n",
    );
    const duplicated = `${readme}\n## Summary## Summary\n\nOld summary\n\n## Scope\n\nOld scope\n`;
    await writeFile(path.join(taskDir, "README.md"), duplicated, "utf8");

    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "doc",
        "set",
        taskId,
        "--section",
        "Summary",
        "--text",
        "Updated summary",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    const updated = await readFile(path.join(taskDir, "README.md"), "utf8");
    expect(updated).not.toContain("## Summary## Summary");
    expect((updated.match(/^## Summary$/gm) ?? []).length).toBe(1);
    expect((updated.match(/^## Scope$/gm) ?? []).length).toBe(1);
    expect(updated).toContain("Updated summary");
  });

  it("task doc set treats multi-section text as a full doc update", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = "202601300001-ABCD";
    const taskDir = path.join(root, ".agentplane", "tasks", taskId);
    await mkdir(taskDir, { recursive: true });
    const readme = renderTaskReadme(
      {
        id: taskId,
        title: "Task",
        description: "",
        status: "TODO",
        priority: "med",
        owner: "CODER",
        depends_on: [],
        tags: [],
        verify: [],
      },
      "## Summary\n\n## Scope\n\n## Risks\n\n## Verify Steps\n\n## Rollback Plan\n",
    );
    await writeFile(path.join(taskDir, "README.md"), readme, "utf8");

    const fullDoc = [
      "## Summary",
      "",
      "Filled summary.",
      "",
      "## Scope",
      "",
      "Filled scope.",
      "",
      "## Risks",
      "",
      "Filled risks.",
      "",
      "## Verify Steps",
      "",
      "Filled verify.",
      "",
      "## Rollback Plan",
      "",
      "Filled rollback.",
    ].join("\n");

    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "doc",
        "set",
        taskId,
        "--section",
        "Summary",
        "--text",
        fullDoc,
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    const updated = await readFile(path.join(taskDir, "README.md"), "utf8");
    const summaryCount = (updated.match(/^## Summary$/gm) ?? []).length;
    const scopeCount = (updated.match(/^## Scope$/gm) ?? []).length;
    const risksCount = (updated.match(/^## Risks$/gm) ?? []).length;
    expect(summaryCount).toBe(1);
    expect(scopeCount).toBe(1);
    expect(risksCount).toBe(1);
    expect(updated).toContain("Filled summary.");
    expect(updated).toContain("Filled scope.");
  });

  it("task doc set fails when backend lacks doc support", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = "202601300000-BCDE";
    const taskDir = path.join(root, ".agentplane", "tasks", taskId);
    await mkdir(taskDir, { recursive: true });
    const readme = renderTaskReadme(
      {
        id: taskId,
        title: "Task",
        description: "",
        status: "TODO",
        priority: "med",
        owner: "CODER",
        depends_on: [],
        tags: [],
        verify: [],
      },
      "## Summary\n\nDoc",
    );
    await writeFile(path.join(taskDir, "README.md"), readme, "utf8");

    const resolved: ResolvedProject = {
      gitRoot: root,
      agentplaneDir: path.join(root, ".agentplane"),
    };
    const loadResult = {
      backend: stubTaskBackend({ id: "fake" }),
      backendId: "fake",
      resolved,
      config: defaultConfig(),
      backendConfigPath: path.join(root, ".agentplane", "backends", "local", "backend.json"),
    } satisfies Awaited<ReturnType<typeof taskBackend.loadTaskBackend>>;
    const spy = vi.spyOn(taskBackend, "loadTaskBackend").mockResolvedValue(loadResult);

    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "doc",
        "set",
        taskId,
        "--section",
        "Summary",
        "--text",
        "Hello",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Backend does not support task docs");
    } finally {
      io.restore();
      spy.mockRestore();
    }
  });

  it("task doc set validates usage and maps unknown doc sections", async () => {
    const root = await mkGitRepoRoot();

    const io1 = captureStdIO();
    try {
      const code1 = await runCli(["task", "doc", "set", "X", "--root", root]);
      expect(code1).toBe(2);
      expect(io1.stderr).toContain("Usage: agentplane task doc set");
    } finally {
      io1.restore();
    }

    const io2 = captureStdIO();
    let id = "";
    try {
      const code2 = await runCli([
        "task",
        "new",
        "--title",
        "My task",
        "--description",
        "Why it matters",
        "--owner",
        "CODER",
        "--tag",
        "nodejs",
        "--root",
        root,
      ]);
      expect(code2).toBe(0);
      id = io2.stdout.trim();
    } finally {
      io2.restore();
    }

    const io3 = captureStdIO();
    try {
      const code3 = await runCli([
        "task",
        "doc",
        "set",
        id,
        "--section",
        "Nope",
        "--text",
        "x",
        "--root",
        root,
      ]);
      expect(code3).toBe(2);
      expect(io3.stderr).toContain("Unknown doc section");
    } finally {
      io3.restore();
    }

    const io4 = captureStdIO();
    try {
      const code4 = await runCli([
        "task",
        "doc",
        "set",
        id,
        "--section",
        "Summary",
        "--root",
        root,
      ]);
      expect(code4).toBe(2);
      expect(io4.stderr).toContain("Usage: agentplane task doc set");
    } finally {
      io4.restore();
    }
  });

  it("task doc set rejects missing flag values and unknown flags", async () => {
    const root = await mkGitRepoRoot();

    let id = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Doc set flags",
        "--description",
        "Flag validation coverage",
        "--owner",
        "CODER",
        "--tag",
        "nodejs",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      id = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    const io1 = captureStdIO();
    try {
      const code1 = await runCli([
        "task",
        "doc",
        "set",
        id,
        "--section",
        "Summary",
        "--text",
        "x",
        "--updated-by",
        "--root",
        root,
      ]);
      expect(code1).toBe(2);
      expect(io1.stderr).toContain("Missing value for --updated-by");
    } finally {
      io1.restore();
    }

    const io2 = captureStdIO();
    try {
      const code2 = await runCli([
        "task",
        "doc",
        "set",
        id,
        "--section",
        "Summary",
        "--text",
        "x",
        "--nope",
        "y",
        "--root",
        root,
      ]);
      expect(code2).toBe(2);
      expect(io2.stderr).toContain("Unknown flag");
    } finally {
      io2.restore();
    }
  });

  it("task doc set rejects empty --updated-by", async () => {
    const root = await mkGitRepoRoot();

    let id = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Doc set updated-by",
        "--description",
        "Updated-by validation",
        "--owner",
        "CODER",
        "--tag",
        "nodejs",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      id = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "doc",
        "set",
        id,
        "--section",
        "Summary",
        "--text",
        "x",
        "--updated-by",
        "   ",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("--updated-by must be non-empty");
    } finally {
      io.restore();
    }
  });

  it("task doc set rejects unexpected arguments", async () => {
    const root = await mkGitRepoRoot();

    let id = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Doc set unexpected arg",
        "--description",
        "Unexpected arg validation",
        "--owner",
        "CODER",
        "--tag",
        "nodejs",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      id = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "doc",
        "set",
        id,
        "oops",
        "--section",
        "Summary",
        "--text",
        "x",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Unexpected argument: oops");
    } finally {
      io.restore();
    }
  });

  it("task doc set maps missing task/file to E_IO", async () => {
    const root = await mkGitRepoRoot();

    const io1 = captureStdIO();
    try {
      const code1 = await runCli([
        "task",
        "doc",
        "set",
        "202601010101-ABCDEF",
        "--section",
        "Summary",
        "--text",
        "x",
        "--root",
        root,
      ]);
      expect(code1).toBe(4);
      expect(io1.stderr).toMatch(/ENOENT|no such file/i);
    } finally {
      io1.restore();
    }

    const io2 = captureStdIO();
    try {
      const code2 = await runCli([
        "task",
        "new",
        "--title",
        "My task",
        "--description",
        "Why it matters",
        "--owner",
        "CODER",
        "--tag",
        "nodejs",
        "--root",
        root,
      ]);
      expect(code2).toBe(0);
    } finally {
      io2.restore();
    }

    const id = io2.stdout.trim();

    const io3 = captureStdIO();
    try {
      const code3 = await runCli([
        "task",
        "doc",
        "set",
        id,
        "--section",
        "Notes",
        "--file",
        path.join(root, "does-not-exist.txt"),
        "--root",
        root,
      ]);
      expect(code3).toBe(4);
      expect(io3.stderr).toMatch(/ENOENT|no such file/i);
    } finally {
      io3.restore();
    }
  });

  it("task export writes .agentplane/tasks.json", async () => {
    const root = await mkGitRepoRoot();

    const io1 = captureStdIO();
    let id = "";
    try {
      const code1 = await runCli([
        "task",
        "new",
        "--title",
        "My task",
        "--description",
        "Why it matters",
        "--owner",
        "CODER",
        "--tag",
        "nodejs",
        "--root",
        root,
      ]);
      expect(code1).toBe(0);
      id = io1.stdout.trim();
      expect(id).toMatch(/^\d{12}-[A-Z0-9]{6}$/);
    } finally {
      io1.restore();
    }

    const io2 = captureStdIO();
    try {
      const code2 = await runCli(["task", "export", "--root", root]);
      expect(code2).toBe(0);
      expect(io2.stdout.trim()).toBe(".agentplane/tasks.json");
    } finally {
      io2.restore();
    }

    const outPath = path.join(root, ".agentplane", "tasks.json");
    const text = await readFile(outPath, "utf8");
    const parsed = JSON.parse(text) as { tasks: unknown[]; meta: { checksum: string } };
    expect(Array.isArray(parsed.tasks)).toBe(true);
    expect(typeof parsed.meta.checksum).toBe("string");
    expect(parsed.meta.checksum.length).toBeGreaterThan(0);
  });
});
