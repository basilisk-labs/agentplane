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
import { approveTaskPlan, recordVerificationOk } from "./run-cli.core.pr-flow.test-helpers.js";
import { resolveUpdateCheckCachePath } from "./update-check.js";
import * as prompts from "./prompts.js";

installRunCliIntegrationHarness();

describe("runCli", () => {
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

  it("pr update refreshes diffstat and auto summary", { timeout: 60_000 }, async () => {
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
    await mkdir(path.join(root, ".agentplane"), { recursive: true });
    await writeFile(path.join(root, ".agentplane", "config.json"), "{}", "utf8");
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
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane pr note");
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
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane pr open");
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
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane pr open");
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
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane pr update");
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
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane pr check");
    } finally {
      io.restore();
    }
  });

  it("pr check maps errors for non-git roots", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-cli-test-"));
    await mkdir(path.join(root, ".agentplane"), { recursive: true });
    await writeFile(path.join(root, ".agentplane", "config.json"), "{}", "utf8");
    const io = captureStdIO();
    try {
      const code = await runCli(["pr", "check", "202601010101-ABCDEF", "--root", root]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("Not a git repository");
    } finally {
      io.restore();
    }
  });

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
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane pr note");
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
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane pr note");
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
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane pr open");
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
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane pr <open|update|check|note>");
    } finally {
      io.restore();
    }
  });
});
