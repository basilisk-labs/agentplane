/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/consistent-type-imports */
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

async function approveTaskPlan(root: string, taskId: string): Promise<void> {
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
}

describe("runCli", () => {
  it("start requires --author and --body", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["start", "202601010101-ABCDEF", "--body", "x", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane start");
    } finally {
      io.restore();
    }
  });

  it("start requires a task id", async () => {
    const root = await mkGitRepoRoot();
    const previous = process.env.AGENTPLANE_TASK_ID;
    delete process.env.AGENTPLANE_TASK_ID;
    const io = captureStdIO();
    try {
      const code = await runCli([
        "start",
        "--author",
        "CODER",
        "--body",
        "Start: test",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane start");
    } finally {
      io.restore();
      if (previous) process.env.AGENTPLANE_TASK_ID = previous;
    }
  });

  it("start rejects unknown flags", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli([
        "start",
        "202601010101-ABCDEF",
        "--author",
        "CODER",
        "--body",
        "Start: test unknown flag handling",
        "--nope",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane start");
    } finally {
      io.restore();
    }
  });

  it("start accepts --commit-require-clean flag without commit-from-comment", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const ioNew = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Start task",
        "--description",
        "Commit require clean flag",
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
        "Start: validate commit require clean parsing",
        "--commit-require-clean",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }
  });

  it("start uses env task id when omitted", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const ioNew = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Env start task",
        "--description",
        "Start uses env task id",
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

    const previous = process.env.AGENTPLANE_TASK_ID;
    process.env.AGENTPLANE_TASK_ID = taskId;
    const io = captureStdIO();
    try {
      const code = await runCli([
        "start",
        "--author",
        "CODER",
        "--body",
        "Start: use env task id for start command with required prefix and length.",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
      if (previous) process.env.AGENTPLANE_TASK_ID = previous;
      else delete process.env.AGENTPLANE_TASK_ID;
    }
  });

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

  it("start --commit-from-comment commits and updates status", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await configureGitUser(root);

    const ioNew = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Start task",
        "--description",
        "Test start command with commit-from-comment",
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
      expect(taskId).toMatch(/\d{12}-[A-Z0-9]+/);
    } finally {
      ioNew.restore();
    }
    await approveTaskPlan(root, taskId);

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
      expect(io.stdout).toContain("✅ started");
    } finally {
      io.restore();
    }

    const task = await readTask({ cwd: root, rootOverride: root, taskId });
    expect(task.frontmatter.status).toBe("DOING");

    const execFileAsync = promisify(execFile);
    const { stdout } = await execFileAsync("git", ["log", "-1", "--pretty=%s"], { cwd: root });
    const suffix = extractTaskSuffix(taskId);
    expect(stdout.trim()).toBe(
      `🚧 ${suffix} start: implement comment-driven commit for start flow | details: detail A; detail B`,
    );
  });

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
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("status/comment-driven commit blocked");
    } finally {
      io.restore();
    }
  });

  it("start warns on status_commit_policy=warn without confirmation", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await configureGitUser(root);

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
  });

  it("start commit-from-comment supports auto-allow and sentence formatting", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await configureGitUser(root);

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

    const commentBody =
      "Start: implement sentence-based summary for commit messages. Add follow-up details.";

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
        "--commit-auto-allow",
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
    expect(stdout.trim()).toBe(
      `🚧 ${suffix} start: implement sentence-based summary for commit messages. | details: Add follow-up details.`,
    );
  });

  it("start rejects comments without the required prefix", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const ioNew = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Start task",
        "--description",
        "Prefix enforcement",
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
        "Missing prefix even if long enough to pass length checks",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Comment body must start with");
    } finally {
      io.restore();
    }
  });

  it("start commit-from-comment supports status_commit_policy=off with semicolon details", async () => {
    const root = await mkGitRepoRoot();
    const cfg = defaultConfig();
    cfg.status_commit_policy = "off";
    await writeConfig(root, cfg);
    await configureGitUser(root);

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
    expect(stdout.trim()).toBe(
      `🚧 ${suffix} start: handle policy off | details: follow-up; extra details included for coverage`,
    );
  });

  it("start commit-from-comment formats -- separators and supports --quiet", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await configureGitUser(root);

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
    expect(stdout.trim()).toBe(
      `🚧 ${suffix} start: apply separator rules | details: include extra details in the commit message`,
    );
  });

  it("start rejects comments that are too short", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const ioNew = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Start task",
        "--description",
        "Short comment",
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
        "Start: too short",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("at least");
    } finally {
      io.restore();
    }
  });

  it("start supports status_commit_policy=confirm when acknowledged", async () => {
    const root = await mkGitRepoRoot();
    const cfg = defaultConfig();
    cfg.status_commit_policy = "confirm";
    await writeConfig(root, cfg);
    await configureGitUser(root);

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
  });

  it("start commit-from-comment formats single-sentence summaries without details", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await configureGitUser(root);

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
    expect(stdout.trim()).toBe(
      `🚧 ${suffix} start: implement summary-only commit message formatting for start actions`,
    );
  });

  it("start commit-from-comment honors custom commit emoji", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await configureGitUser(root);

    const ioNew = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Start task",
        "--description",
        "Custom emoji",
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
        "Start: custom emoji commit path for start command coverage and validation",
        "--commit-from-comment",
        "--commit-emoji",
        "✨",
        "--commit-allow",
        ".agentplane/tasks",
        "--commit-allow-tasks",
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
    expect(stdout.trim()).toBe(
      `✨ ${suffix} start: custom emoji commit path for start command coverage and validation`,
    );
  });

  it("start commit-from-comment fails when allow prefixes do not match changes", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await configureGitUser(root);

    const ioNew = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Start task",
        "--description",
        "Allowlist mismatch",
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
        "Start: allowlist mismatch should fail with helpful error message for debugging",
        "--commit-from-comment",
        "--commit-allow",
        "src",
        "--confirm-status-commit",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("No changes matched allowed prefixes");
    } finally {
      io.restore();
    }
  }, 15_000);

  it("block updates status and appends comment", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const ioNew = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Block task",
        "--description",
        "Block command updates status",
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

    const io = captureStdIO();
    try {
      const code = await runCli([
        "block",
        taskId,
        "--author",
        "CODER",
        "--body",
        "Blocked: waiting on upstream API response to unblock direct workflow testing.",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("✅ blocked");
    } finally {
      io.restore();
    }

    const task = await readTask({ cwd: root, rootOverride: root, taskId });
    expect(task.frontmatter.status).toBe("BLOCKED");
    expect(task.frontmatter.comments.at(-1)?.author).toBe("CODER");
  });

  it("block supports --quiet output", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const ioNew = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Quiet block task",
        "--description",
        "Block command with quiet flag",
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

    const io = captureStdIO();
    try {
      const code = await runCli([
        "block",
        taskId,
        "--author",
        "CODER",
        "--body",
        "Blocked: testing quiet output in block command.",
        "--quiet",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toBe("");
    } finally {
      io.restore();
    }
  });

  it("block uses env task id when omitted", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const ioNew = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Env block task",
        "--description",
        "Block uses env task id",
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

    const previous = process.env.AGENTPLANE_TASK_ID;
    process.env.AGENTPLANE_TASK_ID = taskId;
    const io = captureStdIO();
    try {
      const code = await runCli([
        "block",
        "--author",
        "CODER",
        "--body",
        "Blocked: waiting on upstream API response to unblock env task id flow.",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
      if (previous) process.env.AGENTPLANE_TASK_ID = previous;
      else delete process.env.AGENTPLANE_TASK_ID;
    }
  });

  it("block requires --author and --body", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["block", "202601010101-ABCDEF", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane block");
    } finally {
      io.restore();
    }
  });

  it("block requires a task id when env is unset", async () => {
    const root = await mkGitRepoRoot();
    const previous = process.env.AGENTPLANE_TASK_ID;
    delete process.env.AGENTPLANE_TASK_ID;
    const io = captureStdIO();
    try {
      const code = await runCli([
        "block",
        "--author",
        "CODER",
        "--body",
        "Blocked: missing task id should trigger usage error in block.",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane block");
    } finally {
      io.restore();
      if (previous) process.env.AGENTPLANE_TASK_ID = previous;
    }
  });

  it("block rejects unknown flags", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli([
        "block",
        "202601010101-ABCDEF",
        "--author",
        "CODER",
        "--body",
        "Blocked: test unknown flag handling for block command errors.",
        "--nope",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane block");
    } finally {
      io.restore();
    }
  });

  it("finish marks done and records commit metadata", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await configureGitUser(root);

    await writeFile(path.join(root, "file.txt"), "content", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "file.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "feat: seed commit"], { cwd: root });
    const { stdout: commitHash } = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });

    const ioNew = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Finish task",
        "--description",
        "Finish command updates commit metadata",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "nodejs",
        "--verify",
        "bun run ci",
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
        "finish",
        taskId,
        "--author",
        "CODER",
        "--body",
        "Verified: direct workflow finish updates export and lint with commit metadata present.",
        "--commit",
        commitHash.trim(),
        "--skip-verify",
        "--force",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("✅ finished");
    } finally {
      io.restore();
    }

    const task = await readTask({ cwd: root, rootOverride: root, taskId });
    expect(task.frontmatter.status).toBe("DONE");
    expect(task.frontmatter.commit?.hash).toBeTruthy();
    await runCliSilent(["task", "export", "--root", root]);
    const tasksJson = await readFile(path.join(root, ".agentplane", "tasks.json"), "utf8");
    expect(tasksJson).toContain(taskId);
  });

  it("finish uses env task id when omitted", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await configureGitUser(root);

    await writeFile(path.join(root, "seed.txt"), "seed", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "seed.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "feat: seed"], { cwd: root });

    const ioNew = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Env finish task",
        "--description",
        "Finish uses env task id",
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

    const previous = process.env.AGENTPLANE_TASK_ID;
    process.env.AGENTPLANE_TASK_ID = taskId;
    const io = captureStdIO();
    try {
      const code = await runCli([
        "finish",
        "--author",
        "CODER",
        "--body",
        "Verified: finish with env task id should record commit metadata and close task.",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
      if (previous) process.env.AGENTPLANE_TASK_ID = previous;
      else delete process.env.AGENTPLANE_TASK_ID;
    }
  });

  it("finish supports multiple task ids", async () => {
    const root = await mkGitRepoRoot();
    const execFileAsync = promisify(execFile);
    let taskA = "";
    let taskB = "";
    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Finish A",
          "--description",
          "First task",
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
          "Finish B",
          "--description",
          "Second task",
          "--owner",
          "CODER",
          "--tag",
          "docs",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        taskB = io.stdout.trim();
      } finally {
        io.restore();
      }
    }

    await writeFile(path.join(root, "finish.txt"), "done\n", "utf8");
    await execFileAsync("git", ["add", "."], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "finish changes"], { cwd: root });

    const io = captureStdIO();
    try {
      const code = await runCli([
        "finish",
        taskA,
        taskB,
        "--author",
        "CODER",
        "--body",
        "Verified: finish two tasks with a shared comment to close both records.",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    const a = await readTask({ cwd: root, rootOverride: root, taskId: taskA });
    const b = await readTask({ cwd: root, rootOverride: root, taskId: taskB });
    expect(a.frontmatter.status).toBe("DONE");
    expect(b.frontmatter.status).toBe("DONE");
  });

  it("finish requires --author and --body", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["finish", "202601010101-ABCDEF", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane finish");
    } finally {
      io.restore();
    }
  });

  it("finish requires a task id when env is unset", async () => {
    const root = await mkGitRepoRoot();
    const previous = process.env.AGENTPLANE_TASK_ID;
    delete process.env.AGENTPLANE_TASK_ID;
    const io = captureStdIO();
    try {
      const code = await runCli([
        "finish",
        "--author",
        "CODER",
        "--body",
        "Verified: missing task id should trigger usage error in finish command.",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane finish");
    } finally {
      io.restore();
      if (previous) process.env.AGENTPLANE_TASK_ID = previous;
    }
  });

  it("finish rejects unknown flags", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli([
        "finish",
        "202601010101-ABCDEF",
        "--author",
        "CODER",
        "--body",
        "Verified: test unknown flag handling for finish command errors in direct mode.",
        "--nope",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane finish");
    } finally {
      io.restore();
    }
  });

  it("finish requires a commit value when --commit is provided", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli([
        "finish",
        "202601010101-ABCDEF",
        "--author",
        "CODER",
        "--body",
        "Verified: missing commit hash should trigger usage error for finish.",
        "--commit",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane finish");
    } finally {
      io.restore();
    }
  });

  it("finish rejects missing values for commit and status commit flags", async () => {
    const root = await mkGitRepoRoot();
    const cases: { args: string[]; label: string }[] = [
      { args: ["--commit-emoji"], label: "--commit-emoji" },
      { args: ["--commit-allow"], label: "--commit-allow" },
      { args: ["--status-commit-emoji"], label: "--status-commit-emoji" },
      { args: ["--status-commit-allow"], label: "--status-commit-allow" },
    ];

    for (const entry of cases) {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "finish",
          "202601010101-ABCDEF",
          "--author",
          "CODER",
          "--body",
          "Verified: missing finish flag values should trigger usage errors for parsing.",
          ...entry.args,
          "--root",
          root,
        ]);
        expect(code).toBe(2);
        expect(io.stderr).toContain("Usage: agentplane finish");
      } finally {
        io.restore();
      }
    }
  });

  it("finish rejects commit-from-comment with multiple task ids", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const io = captureStdIO();
    try {
      const code = await runCli([
        "finish",
        "202601010101-AAA111",
        "202601010101-BBB222",
        "--author",
        "CODER",
        "--body",
        "Verified: finish with multiple task ids should fail when status-commit is requested.",
        "--commit-from-comment",
        "--no-require-task-id-in-commit",
        "--commit-emoji",
        "✅",
        "--commit-allow",
        "docs/",
        "--commit-auto-allow",
        "--commit-allow-tasks",
        "--commit-require-clean",
        "--status-commit",
        "--status-commit-emoji",
        "✅",
        "--status-commit-allow",
        "docs/",
        "--status-commit-auto-allow",
        "--status-commit-require-clean",
        "--confirm-status-commit",
        "--quiet",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain(
        "--commit-from-comment/--status-commit requires exactly one task id",
      );
    } finally {
      io.restore();
    }
  });

  it("verify requires a task id", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    const previous = process.env.AGENTPLANE_TASK_ID;
    delete process.env.AGENTPLANE_TASK_ID;
    try {
      const code = await runCli(["verify", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane verify");
    } finally {
      io.restore();
      if (previous === undefined) delete process.env.AGENTPLANE_TASK_ID;
      else process.env.AGENTPLANE_TASK_ID = previous;
    }
  });

  it("verify requires --ok|--rework and --by/--note", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const ioTask = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Verify args",
        "--description",
        "Verify requires ok/rework and by/note",
        "--owner",
        "CODER",
        "--tag",
        "nodejs",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    const io = captureStdIO();
    try {
      const code = await runCli(["verify", taskId, "--ok", "--by", "REVIEWER", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane verify");
    } finally {
      io.restore();
    }
  });

  it("verify records ok result and prints README path", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const ioTask = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Verify ok",
        "--description",
        "Verify records ok result",
        "--owner",
        "CODER",
        "--tag",
        "nodejs",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    const io = captureStdIO();
    try {
      const code = await runCli([
        "verify",
        taskId,
        "--ok",
        "--by",
        "REVIEWER",
        "--note",
        "Looks good",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toContain(path.join(root, ".agentplane", "tasks", taskId, "README.md"));
    } finally {
      io.restore();
    }

    const readmePath = path.join(root, ".agentplane", "tasks", taskId, "README.md");
    const readme = await readFile(readmePath, "utf8");
    expect(readme).toContain("VERIFY — ok");
    expect(readme).toContain("Note: Looks good");
  });

  it("verify supports --quiet", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const ioTask = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Verify quiet",
        "--description",
        "Quiet verify output",
        "--owner",
        "CODER",
        "--tag",
        "nodejs",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    const io = captureStdIO();
    try {
      const code = await runCli([
        "verify",
        taskId,
        "--ok",
        "--by",
        "REVIEWER",
        "--note",
        "Ok",
        "--quiet",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout.trim()).toBe("");
    } finally {
      io.restore();
    }
  });

  it("verify rejects unknown flags", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const ioTask = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Verify flags",
        "--description",
        "Unknown verify flag",
        "--owner",
        "CODER",
        "--tag",
        "nodejs",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    const io = captureStdIO();
    try {
      const code = await runCli([
        "verify",
        taskId,
        "--ok",
        "--by",
        "REVIEWER",
        "--note",
        "Ok",
        "--nope",
        "x",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Unknown flag: --nope");
    } finally {
      io.restore();
    }
  });

  it("task verify ok writes record", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const ioTask = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Task verify",
        "--description",
        "Task verify ok writes record",
        "--owner",
        "CODER",
        "--tag",
        "nodejs",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "verify",
        "ok",
        taskId,
        "--by",
        "REVIEWER",
        "--note",
        "Ok",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toContain(path.join(root, ".agentplane", "tasks", taskId, "README.md"));
    } finally {
      io.restore();
    }
  });

  it("verify uses env task id when flags come first", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const ioTask = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Verify env",
        "--description",
        "Verify uses env task id",
        "--owner",
        "CODER",
        "--tag",
        "nodejs",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    const previous = process.env.AGENTPLANE_TASK_ID;
    process.env.AGENTPLANE_TASK_ID = taskId;
    const io = captureStdIO();
    try {
      const code = await runCli([
        "verify",
        "--ok",
        "--by",
        "REVIEWER",
        "--note",
        "Ok",
        "--quiet",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout.trim()).toBe("");
    } finally {
      io.restore();
      if (previous === undefined) delete process.env.AGENTPLANE_TASK_ID;
      else process.env.AGENTPLANE_TASK_ID = previous;
    }
  });
});
