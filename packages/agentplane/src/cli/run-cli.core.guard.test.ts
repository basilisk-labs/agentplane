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

describe("runCli", () => {
  it("guard clean succeeds when no staged files", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["guard", "clean", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("index clean");
    } finally {
      io.restore();
    }
  });

  it("guard clean supports --quiet", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["guard", "clean", "--quiet", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout.trim()).toBe("");
    } finally {
      io.restore();
    }
  });

  it("guard clean fails when staged files exist", async () => {
    const root = await mkGitRepoRoot();
    await writeFile(path.join(root, "file.txt"), "x", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "file.txt"], { cwd: root });

    const io = captureStdIO();
    try {
      const code = await runCli(["guard", "clean", "--root", root]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("Staged files exist");
    } finally {
      io.restore();
    }
  });

  it("guard suggest-allow outputs prefixes for staged files", async () => {
    const root = await mkGitRepoRoot();
    await mkdir(path.join(root, "src"), { recursive: true });
    await writeFile(path.join(root, "src", "app.ts"), "x", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "src/app.ts"], { cwd: root });

    const io = captureStdIO();
    try {
      const code = await runCli(["guard", "suggest-allow", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout.trim()).toBe("src");
    } finally {
      io.restore();
    }
  });

  it("guard suggest-allow supports args format", async () => {
    const root = await mkGitRepoRoot();
    await writeFile(path.join(root, "file.txt"), "x", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "file.txt"], { cwd: root });

    const io = captureStdIO();
    try {
      const code = await runCli(["guard", "suggest-allow", "--format", "args", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout.trim()).toBe("--allow file.txt");
    } finally {
      io.restore();
    }
  });

  it("guard suggest-allow rejects invalid format", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["guard", "suggest-allow", "--format", "nope", "--root", root]);
      expect(code).toBe(2);
    } finally {
      io.restore();
    }
  });

  it("guard commit validates allowlist and message", async () => {
    const root = await mkGitRepoRoot();
    await mkdir(path.join(root, "src"), { recursive: true });
    await writeFile(path.join(root, "src", "app.ts"), "x", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "src/app.ts"], { cwd: root });

    const io = captureStdIO();
    try {
      const code = await runCli([
        "guard",
        "commit",
        "202601010101-ABCDEF",
        "-m",
        "✨ ABCDEF add guard checks",
        "--allow",
        "src",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout.trim()).toBe("OK");
    } finally {
      io.restore();
    }
  });

  it("guard commit supports --auto-allow", async () => {
    const root = await mkGitRepoRoot();
    await writeFile(path.join(root, "file.txt"), "x", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "file.txt"], { cwd: root });

    const io = captureStdIO();
    try {
      const code = await runCli([
        "guard",
        "commit",
        "202601301004-B2MTY4",
        "-m",
        "✨ B2MTY4 allow auto list",
        "--auto-allow",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("OK");
    } finally {
      io.restore();
    }
  });

  it("guard commit fails without allowlist", async () => {
    const root = await mkGitRepoRoot();
    await writeFile(path.join(root, "file.txt"), "x", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "file.txt"], { cwd: root });

    const io = captureStdIO();
    try {
      const code = await runCli([
        "guard",
        "commit",
        "202601010101-ABCDEF",
        "-m",
        "✨ ABCDEF add guard checks",
        "--root",
        root,
      ]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("Provide at least one --allow");
    } finally {
      io.restore();
    }
  });

  it("guard commit fails when tasks.json is staged without allow-tasks", async () => {
    const root = await mkGitRepoRoot();
    await mkdir(path.join(root, ".agentplane"), { recursive: true });
    await writeFile(path.join(root, ".agentplane", "tasks.json"), "{}", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", ".agentplane/tasks.json"], { cwd: root });

    const io = captureStdIO();
    try {
      const code = await runCli([
        "guard",
        "commit",
        "202601010101-ABCDEF",
        "-m",
        "✨ ABCDEF add guard checks",
        "--allow",
        ".agentplane",
        "--root",
        root,
      ]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("forbidden by default");
    } finally {
      io.restore();
    }
  });

  it("guard commit allows tasks.json with --allow-tasks", async () => {
    const root = await mkGitRepoRoot();
    await mkdir(path.join(root, ".agentplane"), { recursive: true });
    await writeFile(path.join(root, ".agentplane", "tasks.json"), "{}", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", ".agentplane/tasks.json"], { cwd: root });

    const io = captureStdIO();
    try {
      const code = await runCli([
        "guard",
        "commit",
        "202601010101-ABCDEF",
        "-m",
        "✨ ABCDEF allow tasks",
        "--allow",
        ".agentplane",
        "--allow-tasks",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout.trim()).toBe("OK");
    } finally {
      io.restore();
    }
  });

  it("guard commit fails when AGENTS.md is staged without allow-policy", async () => {
    const root = await mkGitRepoRoot();
    await writeFile(path.join(root, "AGENTS.md"), "# policy\n", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "AGENTS.md"], { cwd: root });

    const io = captureStdIO();
    try {
      const code = await runCli([
        "guard",
        "commit",
        "202601010101-ABCDEF",
        "-m",
        "✨ ABCDEF guard protected paths",
        "--allow",
        ".",
        "--root",
        root,
      ]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("AGENTS.md");
      expect(io.stderr).toContain("--allow-policy");
    } finally {
      io.restore();
    }
  });

  it("guard commit allows AGENTS.md with allow-policy", async () => {
    const root = await mkGitRepoRoot();
    await writeFile(path.join(root, "AGENTS.md"), "# policy\n", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "AGENTS.md"], { cwd: root });

    const io = captureStdIO();
    try {
      const code = await runCli([
        "guard",
        "commit",
        "202601010101-ABCDEF",
        "-m",
        "✨ ABCDEF guard protected paths",
        "--allow",
        ".",
        "--allow-policy",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout.trim()).toBe("OK");
    } finally {
      io.restore();
    }
  });

  it("guard commit quiet suppresses output", async () => {
    const root = await mkGitRepoRoot();
    await writeFile(path.join(root, "file.txt"), "x", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "file.txt"], { cwd: root });

    const io = captureStdIO();
    try {
      const code = await runCli([
        "guard",
        "commit",
        "202601010101-ABCDEF",
        "-m",
        "✨ ABCDEF quiet guard",
        "--allow",
        "file.txt",
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

  it("guard commit fails with --require-clean and unstaged changes", async () => {
    const root = await mkGitRepoRoot();
    await writeFile(path.join(root, "file.txt"), "x", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "file.txt"], { cwd: root });
    await writeFile(path.join(root, "other.txt"), "y", "utf8");

    const io = captureStdIO();
    try {
      const code = await runCli([
        "guard",
        "commit",
        "202601010101-ABCDEF",
        "-m",
        "✨ ABCDEF add guard checks",
        "--allow",
        ".",
        "--require-clean",
        "--root",
        root,
      ]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("Working tree is dirty");
    } finally {
      io.restore();
    }
  });

  it("guard commit requires a message", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["guard", "commit", "202601010101-ABCDEF", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane guard commit");
    } finally {
      io.restore();
    }
  });

  it("guard commit requires a task id", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["guard", "commit", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane guard commit");
    } finally {
      io.restore();
    }
  });

  it("guard commit rejects missing --allow value", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli([
        "guard",
        "commit",
        "202601010101-ABCDEF",
        "-m",
        "✨ ABCDEF guard allow",
        "--allow",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane guard commit");
    } finally {
      io.restore();
    }
  });

  it("guard commit rejects missing -m value", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["guard", "commit", "202601010101-ABCDEF", "-m", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane guard commit");
    } finally {
      io.restore();
    }
  });

  it("guard commit rejects unknown flags", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli([
        "guard",
        "commit",
        "202601010101-ABCDEF",
        "-m",
        "✨ ABCDEF guard",
        "--nope",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane guard commit");
    } finally {
      io.restore();
    }
  });

  it("guard rejects unknown subcommands", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["guard", "nope", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane guard");
    } finally {
      io.restore();
    }
  });

  it("commit wrapper creates a commit with allowlist", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await configureGitUser(root);
    await writeFile(path.join(root, "file.txt"), "x", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "file.txt"], { cwd: root });

    const io = captureStdIO();
    try {
      const code = await runCli([
        "commit",
        "202601010101-ABCDEF",
        "-m",
        "✨ ABCDEF commit wrapper",
        "--allow",
        "file.txt",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("✅ committed");
    } finally {
      io.restore();
    }

    const { stdout } = await execFileAsync("git", ["log", "-1", "--pretty=%s"], { cwd: root });
    expect(stdout.trim()).toBe("✨ ABCDEF commit wrapper");
  });

  it("commit wrapper blocks AGENTS.md without allow-policy", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await configureGitUser(root);
    await writeFile(path.join(root, "AGENTS.md"), "# policy\n", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "AGENTS.md"], { cwd: root });

    const io = captureStdIO();
    try {
      const code = await runCli([
        "commit",
        "202601010101-ABCDEF",
        "-m",
        "✨ ABCDEF commit protected policy",
        "--allow",
        ".",
        "--root",
        root,
      ]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("AGENTS.md");
      expect(io.stderr).toContain("--allow-policy");
    } finally {
      io.restore();
    }
  });

  it("commit wrapper allows AGENTS.md with allow-policy", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await configureGitUser(root);
    await writeFile(path.join(root, "AGENTS.md"), "# policy\n", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "AGENTS.md"], { cwd: root });

    const io = captureStdIO();
    try {
      const code = await runCli([
        "commit",
        "202601010101-ABCDEF",
        "-m",
        "✨ ABCDEF commit protected policy",
        "--allow",
        ".",
        "--allow-policy",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("✅ committed");
    } finally {
      io.restore();
    }

    const { stdout } = await execFileAsync("git", ["log", "-1", "--pretty=%s"], { cwd: root });
    expect(stdout.trim()).toBe("✨ ABCDEF commit protected policy");
  });

  it("commit wrapper normalizes ./ prefixes in allowlist", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await configureGitUser(root);
    await writeFile(path.join(root, "file.txt"), "x", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "file.txt"], { cwd: root });

    const io = captureStdIO();
    try {
      const code = await runCli([
        "commit",
        "202601010101-ABCDEF",
        "-m",
        "✨ ABCDEF commit wrapper allow ./file.txt",
        "--allow",
        "./file.txt",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("✅ committed");
    } finally {
      io.restore();
    }
  });

  it("commit wrapper supports --quiet", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await configureGitUser(root);
    await writeFile(path.join(root, "file.txt"), "x", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "file.txt"], { cwd: root });

    const io = captureStdIO();
    try {
      const code = await runCli([
        "commit",
        "202601010101-ABCDEF",
        "-m",
        "✨ ABCDEF quiet commit",
        "--allow",
        "file.txt",
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

  it("commit wrapper supports auto-allow", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await configureGitUser(root);
    await mkdir(path.join(root, "src"), { recursive: true });
    await writeFile(path.join(root, "src", "app.ts"), "x", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "src/app.ts"], { cwd: root });

    const io = captureStdIO();
    try {
      const code = await runCli([
        "commit",
        "202601010101-ABCDEF",
        "-m",
        "✨ ABCDEF auto allow",
        "--auto-allow",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }
  });

  it("commit wrapper supports --allow-base and --require-clean", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await configureGitUser(root);
    await writeFile(path.join(root, "base.txt"), "x", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "base.txt"], { cwd: root });

    const io = captureStdIO();
    try {
      const code = await runCli([
        "commit",
        "202601010101-ABCDEF",
        "-m",
        "✨ ABCDEF allow base",
        "--allow",
        "base.txt",
        "--allow-base",
        "--require-clean",
        "--root",
        root,
      ]);
      expect(code).toBe(5);
    } finally {
      io.restore();
    }
  });

  it("commit wrapper supports --allow-tasks flag", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await configureGitUser(root);
    await writeFile(path.join(root, "note.txt"), "x", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "note.txt"], { cwd: root });

    const io = captureStdIO();
    try {
      const code = await runCli([
        "commit",
        "202601010101-ABCDEF",
        "-m",
        "✨ ABCDEF allow tasks",
        "--allow",
        "note.txt",
        "--allow-tasks",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }
  });

  it("commit wrapper requires a message", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["commit", "202601010101-ABCDEF", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane commit");
    } finally {
      io.restore();
    }
  });

  it("commit wrapper requires a task id", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["commit", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane commit");
    } finally {
      io.restore();
    }
  });

  it("commit wrapper rejects unknown flags", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli([
        "commit",
        "202601010101-ABCDEF",
        "-m",
        "✨ ABCDEF commit",
        "--nope",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane commit");
    } finally {
      io.restore();
    }
  });
});
