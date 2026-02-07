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
  validateCommitSubject,
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
  await runCliSilent([
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
  await runCliSilent([
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
}

async function recordVerificationOk(root: string, taskId: string): Promise<void> {
  await runCliSilent([
    "verify",
    taskId,
    "--ok",
    "--by",
    "REVIEWER",
    "--note",
    "Ok to integrate",
    "--quiet",
    "--root",
    root,
  ]);
}

describe("runCli", () => {
  it("work start requires task id and flags", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["work", "start", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane work start");
    } finally {
      io.restore();
    }
  });

  it("work start rejects missing --slug value", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli([
        "work",
        "start",
        "202601010101-ABCDEF",
        "--agent",
        "CODER",
        "--worktree",
        "--slug",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane work start");
    } finally {
      io.restore();
    }
  });

  it("work start rejects missing --agent value", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli([
        "work",
        "start",
        "202601010101-ABCDEF",
        "--agent",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane work start");
    } finally {
      io.restore();
    }
  });

  it("work start requires --worktree in branch_pr mode", async () => {
    const root = await mkGitRepoRoot();
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    const io = captureStdIO();
    try {
      const code = await runCli([
        "work",
        "start",
        "202601010101-ABCDEF",
        "--agent",
        "CODER",
        "--slug",
        "missing-worktree",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane work start");
    } finally {
      io.restore();
    }
  });

  it("work start rejects unknown flags", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli([
        "work",
        "start",
        "202601010101-ABCDEF",
        "--agent",
        "CODER",
        "--slug",
        "unknown-flag",
        "--worktree",
        "--nope",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane work start");
    } finally {
      io.restore();
    }
  });

  it("work start supports direct mode without worktree", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await writeDefaultConfig(root);
    await configureGitUser(root);

    await writeFile(path.join(root, "seed.txt"), "seed", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "seed.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "seed"], { cwd: root });

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Work start direct",
        "--description",
        "Work start in direct mode without worktree",
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
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }
    await approveTaskPlan(root, taskId);

    const io = captureStdIO();
    try {
      const code = await runCli([
        "work",
        "start",
        taskId,
        "--agent",
        "CODER",
        "--slug",
        "work-start",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("✅ work start");
    } finally {
      io.restore();
    }

    const { stdout } = await execFileAsync("git", ["branch", "--show-current"], { cwd: root });
    expect(stdout.trim()).toBe(`task/${taskId}/work-start`);
  });

  it("work start rejects --worktree in direct mode", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await writeDefaultConfig(root);
    await configureGitUser(root);

    await writeFile(path.join(root, "seed.txt"), "seed", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "seed.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "seed"], { cwd: root });

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Work start direct worktree reject",
        "--description",
        "Direct mode should reject --worktree",
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
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }
    await approveTaskPlan(root, taskId);

    const io = captureStdIO();
    try {
      const code = await runCli([
        "work",
        "start",
        taskId,
        "--agent",
        "CODER",
        "--slug",
        "work-start",
        "--worktree",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("--worktree is only supported");
      expect(io.stderr).toContain("Usage: agentplane work start");
    } finally {
      io.restore();
    }
  });

  it("work start creates a branch and worktree", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await configureGitUser(root);

    await writeFile(path.join(root, "seed.txt"), "seed", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "seed.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "seed"], { cwd: root });

    await runCliSilent(["branch", "base", "set", "main", "--root", root]);

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Work start task",
        "--description",
        "Work start creates branch and worktree",
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
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }
    await approveTaskPlan(root, taskId);

    const io = captureStdIO();
    let branchName = "";
    let worktreePath = "";
    try {
      const code = await runCli([
        "work",
        "start",
        taskId,
        "--agent",
        "CODER",
        "--slug",
        "work-start",
        "--worktree",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("✅ work start");
      branchName = `task/${taskId}/work-start`;
      worktreePath = path.join(root, ".agentplane", "worktrees", `${taskId}-work-start`);
    } finally {
      io.restore();
    }

    await expect(
      execFileAsync("git", ["show-ref", "--verify", `refs/heads/${branchName}`], { cwd: root }),
    ).resolves.toBeDefined();

    const { stdout } = await execFileAsync("git", ["worktree", "list", "--porcelain"], {
      cwd: root,
    });
    expect(stdout).toContain(worktreePath);
  });

  it("pr open creates PR artifacts", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "PR open task",
        "--description",
        "PR open creates artifacts",
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
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    const io = captureStdIO();
    try {
      const code = await runCli([
        "pr",
        "open",
        taskId,
        "--author",
        "CODER",
        "--branch",
        `task/${taskId}/pr-open`,
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("✅ pr open");
    } finally {
      io.restore();
    }

    const prDir = path.join(root, ".agentplane", "tasks", taskId, "pr");
    const metaRaw = await readFile(path.join(prDir, "meta.json"), "utf8");
    const meta = JSON.parse(metaRaw) as { task_id?: string; branch?: string };
    expect(meta.task_id).toBe(taskId);
    expect(meta.branch).toBe(`task/${taskId}/pr-open`);
    await readFile(path.join(prDir, "review.md"), "utf8");
    await readFile(path.join(prDir, "diffstat.txt"), "utf8");
    await readFile(path.join(prDir, "verify.log"), "utf8");
  });

  it("pr update refreshes diffstat and auto summary", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await configureGitUser(root);

    await writeFile(path.join(root, "seed.txt"), "seed", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "seed.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "seed"], { cwd: root });

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "PR update task",
        "--description",
        "PR update writes diffstat",
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
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    await runCliSilent(["branch", "base", "set", "main", "--root", root]);

    await runCliSilent([
      "pr",
      "open",
      taskId,
      "--author",
      "CODER",
      "--branch",
      `task/${taskId}/pr-update`,
      "--root",
      root,
    ]);

    await execFileAsync("git", ["checkout", "-b", `task/${taskId}/pr-update`], { cwd: root });
    await writeFile(path.join(root, "change.txt"), "change", "utf8");
    await execFileAsync("git", ["add", "change.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "change"], { cwd: root });

    const io = captureStdIO();
    try {
      const code = await runCli(["pr", "update", taskId, "--root", root]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    const prDir = path.join(root, ".agentplane", "tasks", taskId, "pr");
    const diffstat = await readFile(path.join(prDir, "diffstat.txt"), "utf8");
    expect(diffstat).toContain("change.txt");
    const review = await readFile(path.join(prDir, "review.md"), "utf8");
    expect(review).toContain("BEGIN AUTO SUMMARY");
    expect(review).toContain("change.txt");
  });

  it("pr note appends to handoff notes", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "PR note task",
        "--description",
        "PR note appends handoff notes",
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
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    await runCliSilent([
      "pr",
      "open",
      taskId,
      "--author",
      "CODER",
      "--branch",
      `task/${taskId}/pr-note`,
      "--root",
      root,
    ]);

    const io = captureStdIO();
    try {
      const code = await runCli([
        "pr",
        "note",
        taskId,
        "--author",
        "DOCS",
        "--body",
        "Handoff: reviewed docs changes.",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    const review = await readFile(
      path.join(root, ".agentplane", "tasks", taskId, "pr", "review.md"),
      "utf8",
    );
    expect(review).toContain("DOCS: Handoff: reviewed docs changes.");
  });

  it("pr note requires branch_pr workflow", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const ioTask = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "PR note direct",
        "--description",
        "Branch_pr required",
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
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    const io = captureStdIO();
    try {
      const code = await runCli([
        "pr",
        "note",
        taskId,
        "--author",
        "DOCS",
        "--body",
        "Handoff: should fail in direct mode.",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Invalid workflow_mode: direct (expected branch_pr)");
    } finally {
      io.restore();
    }
  });

  it("pr note maps errors for non-git roots", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-cli-test-"));
    const io = captureStdIO();
    try {
      const code = await runCli([
        "pr",
        "note",
        "202601010101-ABCDEF",
        "--author",
        "DOCS",
        "--body",
        "Handoff: should fail without git repo.",
        "--root",
        root,
      ]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("Not a git repository");
    } finally {
      io.restore();
    }
  });

  it("pr note rejects empty author or body", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const io = captureStdIO();
    try {
      const code = await runCli([
        "pr",
        "note",
        "202601010101-ABCDEF",
        "--author",
        "   ",
        "--body",
        "Handoff: should fail on empty author.",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane pr note");
    } finally {
      io.restore();
    }
  });

  it("pr check passes when artifacts exist", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "PR check task",
        "--description",
        "PR check validates artifacts",
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
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    await runCliSilent([
      "pr",
      "open",
      taskId,
      "--author",
      "CODER",
      "--branch",
      `task/${taskId}/pr-check`,
      "--root",
      root,
    ]);

    const io = captureStdIO();
    try {
      const code = await runCli(["pr", "check", taskId, "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("✅ pr check");
    } finally {
      io.restore();
    }
  });

  it("pr open requires --author", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "PR open requires author",
        "--description",
        "PR open must have author flag",
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
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    const io = captureStdIO();
    try {
      const code = await runCli(["pr", "open", taskId, "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane pr open");
    } finally {
      io.restore();
    }
  });

  it("pr open rejects unknown flags", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "PR open unknown flag",
        "--description",
        "PR open should reject unknown flags",
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
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    const io = captureStdIO();
    try {
      const code = await runCli([
        "pr",
        "open",
        taskId,
        "--author",
        "CODER",
        "--nope",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane pr open");
    } finally {
      io.restore();
    }
  });

  it("pr open uses current branch when --branch is omitted", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "PR open branch default",
        "--description",
        "PR open uses current branch",
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
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    await runCliSilent(["pr", "open", taskId, "--author", "CODER", "--root", root]);

    const metaRaw = await readFile(
      path.join(root, ".agentplane", "tasks", taskId, "pr", "meta.json"),
      "utf8",
    );
    const meta = JSON.parse(metaRaw) as { branch?: string };
    expect(meta.branch).toBe("main");
  });

  it("pr open is idempotent when artifacts exist", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "PR open idempotent task",
        "--description",
        "PR open can be re-run safely",
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
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    await runCliSilent([
      "pr",
      "open",
      taskId,
      "--author",
      "CODER",
      "--branch",
      `task/${taskId}/pr-open`,
      "--root",
      root,
    ]);

    const io = captureStdIO();
    try {
      const code = await runCli([
        "pr",
        "open",
        taskId,
        "--author",
        "REVIEWER",
        "--branch",
        `task/${taskId}/pr-open`,
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }
  });

  it("pr update rejects missing artifacts", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "PR update missing artifacts",
        "--description",
        "PR update should error without pr open",
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
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    const io = captureStdIO();
    try {
      const code = await runCli(["pr", "update", taskId, "--root", root]);
      expect(code).toBe(3);
      expect(io.stderr).toContain("PR artifacts missing");
    } finally {
      io.restore();
    }
  });

  it("pr update rejects extra arguments", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const io = captureStdIO();
    try {
      const code = await runCli(["pr", "update", "202601010101-ABCDEF", "--extra", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane pr update");
    } finally {
      io.restore();
    }
  });

  it("pr note rejects missing review", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "PR note missing review",
        "--description",
        "PR note requires review",
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
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    const io = captureStdIO();
    try {
      const code = await runCli([
        "pr",
        "note",
        taskId,
        "--author",
        "DOCS",
        "--body",
        "Handoff: missing review should fail.",
        "--root",
        root,
      ]);
      expect(code).toBe(3);
      expect(io.stderr).toContain("Missing .agentplane/tasks");
    } finally {
      io.restore();
    }
  });

  it("pr check fails when verify requirements are unmet", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "PR check verify task",
        "--description",
        "PR check should fail until verify passes",
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
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    await runCliSilent([
      "pr",
      "open",
      taskId,
      "--author",
      "CODER",
      "--branch",
      `task/${taskId}/pr-check`,
      "--root",
      root,
    ]);

    const io = captureStdIO();
    try {
      const code = await runCli(["pr", "check", taskId, "--root", root]);
      expect(code).toBe(3);
      expect(io.stderr).toContain("Verify requirements not satisfied");
    } finally {
      io.restore();
    }
  });

  it("pr check reports missing auto summary markers", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "PR check markers",
        "--description",
        "Missing auto summary markers",
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
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    await runCliSilent([
      "pr",
      "open",
      taskId,
      "--author",
      "CODER",
      "--branch",
      `task/${taskId}/pr-check-markers`,
      "--root",
      root,
    ]);

    const reviewPath = path.join(root, ".agentplane", "tasks", taskId, "pr", "review.md");
    const review = await readFile(reviewPath, "utf8");
    const stripped = review
      .replace("<!-- BEGIN AUTO SUMMARY -->", "")
      .replace("<!-- END AUTO SUMMARY -->", "");
    await writeFile(reviewPath, stripped, "utf8");

    const io = captureStdIO();
    try {
      const code = await runCli(["pr", "check", taskId, "--root", root]);
      expect(code).toBe(3);
      expect(io.stderr).toContain("Missing auto summary start marker");
      expect(io.stderr).toContain("Missing auto summary end marker");
    } finally {
      io.restore();
    }
  });

  it("pr check reports invalid meta.json", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "PR check invalid meta",
        "--description",
        "Invalid meta.json",
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
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    await runCliSilent([
      "pr",
      "open",
      taskId,
      "--author",
      "CODER",
      "--branch",
      `task/${taskId}/pr-check-meta`,
      "--root",
      root,
    ]);

    const metaPath = path.join(root, ".agentplane", "tasks", taskId, "pr", "meta.json");
    await writeFile(metaPath, "{ not-json", "utf8");

    const io = captureStdIO();
    try {
      const code = await runCli(["pr", "check", taskId, "--root", root]);
      expect(code).toBe(3);
      expect(io.stderr).toContain("JSON Parse error:");
    } finally {
      io.restore();
    }
  });

  it("pr check rejects extra arguments", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const io = captureStdIO();
    try {
      const code = await runCli(["pr", "check", "202601010101-ABCDEF", "--extra", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane pr check");
    } finally {
      io.restore();
    }
  });

  it("pr check maps errors for non-git roots", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-cli-test-"));
    const io = captureStdIO();
    try {
      const code = await runCli(["pr", "check", "202601010101-ABCDEF", "--root", root]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("Not a git repository");
    } finally {
      io.restore();
    }
  });

  it("integrate requires a task id", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["integrate"]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane integrate");
    } finally {
      io.restore();
    }
  });

  it("integrate rejects invalid merge strategy", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await configureGitUser(root);
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Integrate task",
        "--description",
        "Branch integration",
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
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    const io = captureStdIO();
    try {
      const code = await runCli(["integrate", taskId, "--merge-strategy", "nope", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane integrate");
    } finally {
      io.restore();
    }
  });

  it("integrate rejects unexpected arguments", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["integrate", "202601010101-ABCDEF", "extra"]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane integrate");
    } finally {
      io.restore();
    }
  });

  it("integrate rejects unknown flags", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["integrate", "202601010101-ABCDEF", "--nope"]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane integrate");
    } finally {
      io.restore();
    }
  });

  it("integrate requires branch_pr workflow", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await configureGitUser(root);
    const config = defaultConfig();
    config.workflow_mode = "direct";
    await writeConfig(root, config);

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Integrate task",
        "--description",
        "Branch integration",
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
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    const io = captureStdIO();
    try {
      const code = await runCli(["integrate", taskId, "--quiet", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Invalid workflow_mode: direct (expected branch_pr)");
    } finally {
      io.restore();
    }
  });

  it("integrate maps errors for non-git roots", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-cli-test-"));
    const io = captureStdIO();
    try {
      const code = await runCli(["integrate", "202601010101-ABCDEF", "--root", root]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("Not a git repository");
    } finally {
      io.restore();
    }
  });

  it("integrate merges branch and marks task done", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await configureGitUser(root);
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    const execFileAsync = promisify(execFile);
    await writeFile(path.join(root, "README.md"), "base\n", "utf8");
    await writeFile(path.join(root, ".gitignore"), ".agentplane/worktrees\n", "utf8");
    await stageGitignoreIfPresent(root);
    await execFileAsync("git", ["add", "README.md"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "chore base"], { cwd: root });

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Integrate task",
        "--description",
        "Branch integration",
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
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }
    await approveTaskPlan(root, taskId);
    await recordVerificationOk(root, taskId);
    await execFileAsync("git", ["add", ".agentplane"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", `chore ${taskId} scaffold`], { cwd: root });

    const branch = `task/${taskId}/integrate`;
    await execFileAsync("git", ["checkout", "-b", branch], { cwd: root });
    await writeFile(path.join(root, "feature.txt"), "feature\n", "utf8");
    await execFileAsync("git", ["add", "feature.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", `${taskId} add feature`], { cwd: root });

    await runCliSilent(["pr", "open", taskId, "--author", "CODER", "--root", root]);
    await execFileAsync("git", ["add", ".agentplane/tasks"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", `${taskId} add pr artifacts`], { cwd: root });

    await execFileAsync("git", ["checkout", "main"], { cwd: root });
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);

    const io = captureStdIO();
    try {
      const code = await runCli(["integrate", taskId, "--branch", branch, "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("✅ integrate");
    } finally {
      io.restore();
    }

    const task = await readTask({ cwd: root, taskId });
    expect(task.frontmatter.status).toBe("DONE");

    const metaPath = path.join(root, ".agentplane", "tasks", taskId, "pr", "meta.json");
    const metaText = await readFile(metaPath, "utf8");
    expect(metaText).toContain('"status": "MERGED"');
    const meta = JSON.parse(metaText) as Record<string, unknown>;
    expect(meta.base).toBe("main");
    expect(meta).not.toHaveProperty("base_branch");
  }, 15_000);

  it("integrate uses a compliant fallback commit subject when branch subject is invalid (squash)", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await configureGitUser(root);
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    const execFileAsync = promisify(execFile);
    await writeFile(path.join(root, "README.md"), "base\n", "utf8");
    await writeFile(path.join(root, ".gitignore"), ".agentplane/worktrees\n", "utf8");
    await stageGitignoreIfPresent(root);
    await execFileAsync("git", ["add", "README.md"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "chore base"], { cwd: root });

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Integrate subject fallback",
        "--description",
        "Integration should generate a compliant subject when needed",
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
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }
    await approveTaskPlan(root, taskId);
    await recordVerificationOk(root, taskId);
    await execFileAsync("git", ["add", ".agentplane"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", `chore ${taskId} scaffold`], { cwd: root });

    const branch = `task/${taskId}/integrate-subject`;
    await execFileAsync("git", ["checkout", "-b", branch], { cwd: root });
    await writeFile(path.join(root, "feature.txt"), "feature\n", "utf8");
    await execFileAsync("git", ["add", "feature.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "wip"], { cwd: root });

    await runCliSilent(["pr", "open", taskId, "--author", "CODER", "--root", root]);
    await execFileAsync("git", ["add", ".agentplane/tasks"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", `${taskId} add pr artifacts`], { cwd: root });

    await execFileAsync("git", ["checkout", "main"], { cwd: root });
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);

    const io = captureStdIO();
    try {
      const code = await runCli(["integrate", taskId, "--branch", branch, "--root", root]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    const { stdout: subjectOut } = await execFileAsync("git", ["log", "-1", "--pretty=%s"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    const subject = subjectOut.trim();
    const suffix = extractTaskSuffix(taskId);
    expect(subject.startsWith(`🧩 ${suffix} integrate:`)).toBe(true);
    expect(
      validateCommitSubject({ subject, taskId, genericTokens: config.commit.generic_tokens }).ok,
    ).toBe(true);
  }, 15_000);

  it("integrate supports dry-run", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await configureGitUser(root);
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    const execFileAsync = promisify(execFile);
    await writeFile(path.join(root, "README.md"), "base\n", "utf8");
    await writeFile(path.join(root, ".gitignore"), ".agentplane/worktrees\n", "utf8");
    await stageGitignoreIfPresent(root);
    await execFileAsync("git", ["add", "README.md"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "chore base"], { cwd: root });

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Dry run integrate",
        "--description",
        "Branch integration",
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
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }
    await approveTaskPlan(root, taskId);
    await recordVerificationOk(root, taskId);
    await execFileAsync("git", ["add", ".agentplane"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", `chore ${taskId} scaffold`], { cwd: root });

    const branch = `task/${taskId}/dry-run`;
    await execFileAsync("git", ["checkout", "-b", branch], { cwd: root });
    await writeFile(path.join(root, "feature.txt"), "feature\n", "utf8");
    await execFileAsync("git", ["add", "feature.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", `${taskId} add feature`], { cwd: root });

    await runCliSilent(["pr", "open", taskId, "--author", "CODER", "--root", root]);
    await execFileAsync("git", ["add", ".agentplane/tasks"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", `${taskId} add pr artifacts`], { cwd: root });

    await execFileAsync("git", ["checkout", "main"], { cwd: root });
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);
    const { stdout: headBefore } = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: root,
    });

    const io = captureStdIO();
    try {
      const code = await runCli([
        "integrate",
        taskId,
        "--branch",
        branch,
        "--dry-run",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("dry-run");
    } finally {
      io.restore();
    }

    const { stdout: headAfter } = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: root,
    });
    expect(headAfter.trim()).toBe(headBefore.trim());
  }, 15_000);

  it("integrate supports merge strategy", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await configureGitUser(root);
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    const execFileAsync = promisify(execFile);
    await writeFile(path.join(root, "README.md"), "base\n", "utf8");
    await execFileAsync("git", ["add", "README.md"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "chore base"], { cwd: root });

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Merge strategy integrate",
        "--description",
        "Branch integration",
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
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }
    await approveTaskPlan(root, taskId);
    await recordVerificationOk(root, taskId);
    await execFileAsync("git", ["add", ".agentplane"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", `chore ${taskId} scaffold`], { cwd: root });

    const branch = `task/${taskId}/merge`;
    await execFileAsync("git", ["checkout", "-b", branch], { cwd: root });
    await writeFile(path.join(root, "feature.txt"), "feature\n", "utf8");
    await execFileAsync("git", ["add", "feature.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", `${taskId} add feature`], { cwd: root });

    await runCliSilent(["pr", "open", taskId, "--author", "CODER", "--root", root]);
    await execFileAsync("git", ["add", ".agentplane/tasks"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", `${taskId} add pr artifacts`], { cwd: root });

    await execFileAsync("git", ["checkout", "main"], { cwd: root });
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);

    const io = captureStdIO();
    try {
      const code = await runCli([
        "integrate",
        taskId,
        "--branch",
        branch,
        "--merge-strategy",
        "merge",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("✅ integrate");
    } finally {
      io.restore();
    }
  }, 15_000);

  it("integrate supports rebase strategy", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await configureGitUser(root);
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    const execFileAsync = promisify(execFile);
    await writeFile(path.join(root, "README.md"), "base\n", "utf8");
    await execFileAsync("git", ["add", "README.md"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "chore base"], { cwd: root });

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Rebase integrate",
        "--description",
        "Branch integration",
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
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }
    await approveTaskPlan(root, taskId);
    await recordVerificationOk(root, taskId);
    await execFileAsync("git", ["add", ".agentplane"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", `chore ${taskId} scaffold`], { cwd: root });

    const branch = `task/${taskId}/rebase`;
    await execFileAsync("git", ["checkout", "-b", branch], { cwd: root });
    await writeFile(path.join(root, "feature.txt"), "feature\n", "utf8");
    await execFileAsync("git", ["add", "feature.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", `${taskId} add feature`], { cwd: root });

    await runCliSilent(["pr", "open", taskId, "--author", "CODER", "--root", root]);
    await execFileAsync("git", ["add", ".agentplane/tasks"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", `${taskId} add pr artifacts`], { cwd: root });

    await execFileAsync("git", ["checkout", "main"], { cwd: root });
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);
    await writeFile(path.join(root, "base.txt"), "base\n", "utf8");
    await execFileAsync("git", ["add", "base.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "chore base update"], { cwd: root });
    const worktreePath = await mkdtemp(path.join(os.tmpdir(), "agentplane-rebase-"));
    await execFileAsync("git", ["worktree", "add", worktreePath, branch], {
      cwd: root,
      env: cleanGitEnv(),
    });

    const io = captureStdIO();
    try {
      const code = await runCli([
        "integrate",
        taskId,
        "--branch",
        branch,
        "--merge-strategy",
        "rebase",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("✅ integrate");
    } finally {
      io.restore();
    }
  }, 15_000);

  it("integrate rebase fails when base changes during verify", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await configureGitUser(root);
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    const execFileAsync = promisify(execFile);
    await writeFile(path.join(root, "README.md"), "base\n", "utf8");
    await execFileAsync("git", ["add", "README.md"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "chore base"], { cwd: root });
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);

    const verifyCmd = `cd "${root}" && echo bump >> bump.txt && git add bump.txt && git commit -m "chore bump"`;

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Rebase integrate failure",
        "--description",
        "Branch integration",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "nodejs",
        "--verify",
        verifyCmd,
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }
    await approveTaskPlan(root, taskId);
    await recordVerificationOk(root, taskId);
    await execFileAsync("git", ["add", ".agentplane"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", `chore ${taskId} scaffold`], { cwd: root });

    const branch = `task/${taskId}/rebase-fail`;
    await execFileAsync("git", ["checkout", "-b", branch], { cwd: root });
    await writeFile(path.join(root, "feature.txt"), "feature\n", "utf8");
    await execFileAsync("git", ["add", "feature.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", `${taskId} add feature`], { cwd: root });

    await runCliSilent(["pr", "open", taskId, "--author", "CODER", "--root", root]);
    await execFileAsync("git", ["add", ".agentplane/tasks"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", `${taskId} add pr artifacts`], { cwd: root });

    await execFileAsync("git", ["checkout", "main"], { cwd: root });
    await writeFile(path.join(root, "base.txt"), "base\n", "utf8");
    await execFileAsync("git", ["add", "base.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "chore base update"], { cwd: root });

    const worktreePath = await mkdtemp(path.join(os.tmpdir(), "agentplane-rebase-"));
    await execFileAsync("git", ["worktree", "add", worktreePath, branch], {
      cwd: root,
      env: cleanGitEnv(),
    });

    const io = captureStdIO();
    try {
      const code = await runCli([
        "integrate",
        taskId,
        "--branch",
        branch,
        "--merge-strategy",
        "rebase",
        "--run-verify",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("merge --ff-only");
    } finally {
      io.restore();
    }
  }, 15_000);

  it("integrate rebase fails when verify command fails", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await configureGitUser(root);
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    const execFileAsync = promisify(execFile);
    await writeFile(path.join(root, "README.md"), "base\n", "utf8");
    await execFileAsync("git", ["add", "README.md"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "chore base"], { cwd: root });
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Rebase verify failure",
        "--description",
        "Branch integration",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "nodejs",
        "--verify",
        "false",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }
    await approveTaskPlan(root, taskId);
    await recordVerificationOk(root, taskId);
    await execFileAsync("git", ["add", ".agentplane"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", `chore ${taskId} scaffold`], { cwd: root });

    const branch = `task/${taskId}/rebase-verify-fail`;
    await execFileAsync("git", ["checkout", "-b", branch], { cwd: root });
    await writeFile(path.join(root, "feature.txt"), "feature\n", "utf8");
    await execFileAsync("git", ["add", "feature.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", `${taskId} add feature`], { cwd: root });

    await runCliSilent(["pr", "open", taskId, "--author", "CODER", "--root", root]);
    await execFileAsync("git", ["add", ".agentplane/tasks"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", `${taskId} add pr artifacts`], { cwd: root });

    await execFileAsync("git", ["checkout", "main"], { cwd: root });
    const worktreePath = await mkdtemp(path.join(os.tmpdir(), "agentplane-rebase-"));
    await execFileAsync("git", ["worktree", "add", worktreePath, branch], {
      cwd: root,
      env: cleanGitEnv(),
    });

    const io = captureStdIO();
    try {
      const code = await runCli([
        "integrate",
        taskId,
        "--branch",
        branch,
        "--merge-strategy",
        "rebase",
        "--run-verify",
        "--root",
        root,
      ]);
      expect(code).toBe(1);
      expect(io.stderr).toContain("Verify command failed");
    } finally {
      io.restore();
    }
  }, 15_000);

  it("integrate fails when post-merge hook removes pr dir", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await configureGitUser(root);
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    const execFileAsync = promisify(execFile);
    await writeFile(path.join(root, "README.md"), "base\n", "utf8");
    await execFileAsync("git", ["add", "README.md"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "chore base"], { cwd: root });

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Integrate missing PR",
        "--description",
        "Branch integration",
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
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }
    await approveTaskPlan(root, taskId);
    await recordVerificationOk(root, taskId);
    await execFileAsync("git", ["add", ".agentplane"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", `chore ${taskId} scaffold`], { cwd: root });

    const branch = `task/${taskId}/integrate-missing-pr`;
    await execFileAsync("git", ["checkout", "-b", branch], { cwd: root });
    await writeFile(path.join(root, "feature.txt"), "feature\n", "utf8");
    await execFileAsync("git", ["add", "feature.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", `${taskId} add feature`], { cwd: root });

    await runCliSilent(["pr", "open", taskId, "--author", "CODER", "--root", root]);
    await execFileAsync("git", ["add", ".agentplane/tasks"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", `${taskId} add pr artifacts`], { cwd: root });

    await execFileAsync("git", ["checkout", "main"], { cwd: root });
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);
    const prDir = path.join(root, ".agentplane", "tasks", taskId, "pr");
    const hookPath = path.join(root, ".git", "hooks", "post-merge");
    const hookBody = `#!/bin/sh\nrm -rf "${prDir}"\n`;
    await writeFile(hookPath, hookBody, "utf8");
    await chmod(hookPath, 0o755);

    const io = captureStdIO();
    try {
      const code = await runCli([
        "integrate",
        taskId,
        "--branch",
        branch,
        "--merge-strategy",
        "merge",
        "--root",
        root,
      ]);
      expect(code).toBe(3);
      expect(io.stderr).toContain("Missing PR artifact dir after merge");
    } finally {
      io.restore();
    }
  }, 15_000);

  it("integrate runs verify when requested", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await configureGitUser(root);
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    const execFileAsync = promisify(execFile);
    await writeFile(path.join(root, "README.md"), "base\n", "utf8");
    await execFileAsync("git", ["add", "README.md"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "chore base"], { cwd: root });

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Verify integrate",
        "--description",
        "Branch integration",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "nodejs",
        "--verify",
        "echo ok",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }
    await approveTaskPlan(root, taskId);
    await recordVerificationOk(root, taskId);
    await execFileAsync("git", ["add", ".agentplane"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", `chore ${taskId} scaffold`], { cwd: root });

    const branch = `task/${taskId}/verify`;
    await execFileAsync("git", ["checkout", "-b", branch], { cwd: root });
    await writeFile(path.join(root, "feature.txt"), "feature\n", "utf8");
    await execFileAsync("git", ["add", "feature.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", `${taskId} add feature`], { cwd: root });

    await runCliSilent(["pr", "open", taskId, "--author", "CODER", "--root", root]);
    await execFileAsync("git", ["add", ".agentplane/tasks"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", `${taskId} add pr artifacts`], { cwd: root });

    await execFileAsync("git", ["checkout", "main"], { cwd: root });

    const io = captureStdIO();
    try {
      const code = await runCli([
        "integrate",
        taskId,
        "--branch",
        branch,
        "--base",
        "main",
        "--run-verify",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    const verifyLog = await readFile(
      path.join(root, ".agentplane", "tasks", taskId, "pr", "verify.log"),
      "utf8",
    );
    expect(verifyLog).toContain("verified_sha=");
  }, 15_000);

  it("cleanup merged requires branch_pr workflow", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await configureGitUser(root);
    const io = captureStdIO();
    try {
      const code = await runCli(["cleanup", "merged", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Invalid workflow_mode: direct (expected branch_pr)");
    } finally {
      io.restore();
    }
  });

  it("cleanup merged requires running on base branch", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await configureGitUser(root);
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await commitAll(root, "chore config");
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["checkout", "-b", "feature"], { cwd: root });

    const io = captureStdIO();
    try {
      const code = await runCli(["cleanup", "merged", "--root", root]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("cleanup merged must run on base branch");
    } finally {
      io.restore();
    }
  });

  it("cleanup merged maps errors for non-git roots", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-cli-test-"));
    const io = captureStdIO();
    try {
      const code = await runCli(["cleanup", "merged", "--root", root]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("Not a git repository");
    } finally {
      io.restore();
    }
  });

  it("cleanup merged rejects blank base branch", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await configureGitUser(root);
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await commitAll(root, "chore config");

    const io = captureStdIO();
    try {
      const code = await runCli(["cleanup", "merged", "--base", " ", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane cleanup merged");
    } finally {
      io.restore();
    }
  });

  it("cleanup merged rejects unknown base branch", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await configureGitUser(root);
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await commitAll(root, "chore config");

    const io = captureStdIO();
    try {
      const code = await runCli(["cleanup", "merged", "--base", "nope", "--root", root]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("Unknown base branch");
    } finally {
      io.restore();
    }
  });

  it("cleanup merged rejects unknown subcommands", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const io = captureStdIO();
    try {
      const code = await runCli(["cleanup", "nope", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane cleanup merged");
    } finally {
      io.restore();
    }
  });

  it("cleanup merged rejects missing --base value", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const io = captureStdIO();
    try {
      const code = await runCli(["cleanup", "merged", "--base", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane cleanup merged");
    } finally {
      io.restore();
    }
  });

  it("cleanup merged rejects unknown flags", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const io = captureStdIO();
    try {
      const code = await runCli(["cleanup", "merged", "--nope", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane cleanup merged");
    } finally {
      io.restore();
    }
  });

  it("cleanup merged rejects unexpected arguments", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const io = captureStdIO();
    try {
      const code = await runCli(["cleanup", "merged", "extra", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane cleanup merged");
    } finally {
      io.restore();
    }
  });

  it("cleanup merged reports no candidates", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await configureGitUser(root);
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    await writeFile(path.join(root, "README.md"), "base\n", "utf8");
    await commitAll(root, "chore base");
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);

    const io = captureStdIO();
    try {
      const code = await runCli(["cleanup", "merged", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("no candidates");
    } finally {
      io.restore();
    }
  });

  it("cleanup merged --quiet suppresses output", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await configureGitUser(root);
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    await writeFile(path.join(root, "README.md"), "base\n", "utf8");
    await commitAll(root, "chore base");
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);

    const io = captureStdIO();
    try {
      const code = await runCli(["cleanup", "merged", "--quiet", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout.trim()).toBe("");
    } finally {
      io.restore();
    }
  });

  it("cleanup merged accepts --base and --archive", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await configureGitUser(root);
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    await writeFile(path.join(root, "README.md"), "base\n", "utf8");
    await commitAll(root, "chore base");

    const io = captureStdIO();
    try {
      const code = await runCli([
        "cleanup",
        "merged",
        "--base",
        "main",
        "--archive",
        "--quiet",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }
  });

  it("cleanup merged lists candidates without --yes", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await configureGitUser(root);
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    await writeFile(path.join(root, "README.md"), "base\n", "utf8");
    await writeFile(path.join(root, ".gitignore"), ".agentplane/worktrees\n", "utf8");
    await commitAll(root, "chore base");
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Cleanup dry run",
        "--description",
        "cleanup candidate",
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
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }
    await commitAll(root, `chore ${taskId} scaffold`);

    const task = await readTask({ cwd: root, taskId });
    const readmeText = await readFile(task.readmePath, "utf8");
    await writeFile(
      task.readmePath,
      readmeText.replace('status: "TODO"', 'status: "DONE"'),
      "utf8",
    );
    await commitAll(root, `chore ${taskId} done`);

    const branch = `task/${taskId}/cleanup`;
    const worktreePath = path.join(root, ".agentplane", "worktrees", `${taskId}-cleanup`);
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["worktree", "add", "-b", branch, worktreePath, "main"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    const resolvedWorktreePath = await realpath(worktreePath);

    const io = captureStdIO();
    try {
      const code = await runCli(["cleanup", "merged", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain(`branch=${branch}`);
      expect(io.stdout).toContain(`worktree=${resolvedWorktreePath}`);
      expect(io.stdout).toContain("Re-run with --yes");
    } finally {
      io.restore();
    }

    expect(await gitBranchExists(root, branch)).toBe(true);
    expect(await pathExists(worktreePath)).toBe(true);
  }, 15_000);

  it("cleanup merged deletes branches/worktrees and archives pr artifacts", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await configureGitUser(root);
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    await writeFile(path.join(root, "README.md"), "base\n", "utf8");
    await writeFile(path.join(root, ".gitignore"), ".agentplane/worktrees\n", "utf8");
    await commitAll(root, "chore base");
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Cleanup delete",
        "--description",
        "cleanup candidate",
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
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }
    await commitAll(root, `chore ${taskId} scaffold`);

    const task = await readTask({ cwd: root, taskId });
    const readmeText = await readFile(task.readmePath, "utf8");
    await writeFile(
      task.readmePath,
      readmeText.replace('status: "TODO"', 'status: "DONE"'),
      "utf8",
    );
    await commitAll(root, `chore ${taskId} done`);

    const prDir = path.join(root, ".agentplane", "tasks", taskId, "pr");
    await mkdir(prDir, { recursive: true });
    await writeFile(path.join(prDir, "meta.json"), "{\n}\n", "utf8");
    await commitAll(root, `chore ${taskId} pr artifacts`);

    const branch = `task/${taskId}/cleanup-delete`;
    const worktreePath = path.join(root, ".agentplane", "worktrees", `${taskId}-cleanup-delete`);
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["worktree", "add", "-b", branch, worktreePath, "main"], {
      cwd: root,
      env: cleanGitEnv(),
    });

    const io = captureStdIO();
    try {
      const code = await runCli(["cleanup", "merged", "--yes", "--archive", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("✅ cleanup merged");
    } finally {
      io.restore();
    }

    expect(await gitBranchExists(root, branch)).toBe(false);
    expect(await pathExists(worktreePath)).toBe(false);

    const archiveRoot = path.join(root, ".agentplane", "tasks", taskId, "pr-archive");
    const entries = await readdir(archiveRoot);
    expect(entries.length).toBe(1);
    expect(await pathExists(path.join(archiveRoot, entries[0]))).toBe(true);
    expect(await pathExists(prDir)).toBe(false);
  }, 15_000);

  it("cleanup merged refuses worktrees outside repo", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await configureGitUser(root);
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    await writeFile(path.join(root, "README.md"), "base\n", "utf8");
    await writeFile(path.join(root, ".gitignore"), ".agentplane/worktrees\n", "utf8");
    await commitAll(root, "chore base");
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Cleanup outside worktree",
        "--description",
        "cleanup candidate",
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
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }
    await commitAll(root, `chore ${taskId} scaffold`);

    const task = await readTask({ cwd: root, taskId });
    const readmeText = await readFile(task.readmePath, "utf8");
    await writeFile(
      task.readmePath,
      readmeText.replace('status: "TODO"', 'status: "DONE"'),
      "utf8",
    );
    await commitAll(root, `chore ${taskId} done`);

    const branch = `task/${taskId}/cleanup-outside`;
    const worktreePath = await mkdtemp(path.join(os.tmpdir(), "agentplane-worktree-"));
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["worktree", "add", "-b", branch, worktreePath, "main"], {
      cwd: root,
      env: cleanGitEnv(),
    });

    const io = captureStdIO();
    try {
      const code = await runCli(["cleanup", "merged", "--yes", "--root", root]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("Refusing to remove worktree outside repo");
    } finally {
      io.restore();
    }

    await execFileAsync("git", ["worktree", "remove", "--force", worktreePath], {
      cwd: root,
      env: cleanGitEnv(),
    });
    await execFileAsync("git", ["branch", "-D", branch], { cwd: root, env: cleanGitEnv() });
  }, 15_000);

  it("pr note rejects unknown flags", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const io = captureStdIO();
    try {
      const code = await runCli([
        "pr",
        "note",
        "202601010101-ABCDEF",
        "--author",
        "DOCS",
        "--body",
        "Handoff: unknown flag check.",
        "--nope",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane pr note");
    } finally {
      io.restore();
    }
  });

  it("pr note requires --author and --body", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const io = captureStdIO();
    try {
      const code = await runCli(["pr", "note", "202601010101-ABCDEF", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane pr note");
    } finally {
      io.restore();
    }
  });

  it("pr commands require a task id", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const io = captureStdIO();
    try {
      const code = await runCli(["pr", "open", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane pr open");
    } finally {
      io.restore();
    }
  });

  it("pr rejects unknown subcommands", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const io = captureStdIO();
    try {
      const code = await runCli(["pr", "nope", "202601010101-ABCDEF", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane pr open|update|check|note");
    } finally {
      io.restore();
    }
  });
});
