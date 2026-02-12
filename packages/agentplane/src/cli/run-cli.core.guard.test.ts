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
        "✨ ABCDEF guard: add checks",
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
        "✨ B2MTY4 guard: auto allow staging",
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
        "✨ ABCDEF guard: add checks",
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
        "✨ ABCDEF guard: add checks",
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
        "✨ ABCDEF guard: allow tasks",
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
        "✨ ABCDEF guard: protect paths",
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
        "✨ ABCDEF guard: protect paths",
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
        "✨ ABCDEF guard: quiet mode",
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
    // Modify a tracked file after staging to create unstaged tracked changes.
    await writeFile(path.join(root, "file.txt"), "y", "utf8");

    const io = captureStdIO();
    try {
      const code = await runCli([
        "guard",
        "commit",
        "202601010101-ABCDEF",
        "-m",
        "✨ ABCDEF guard: add checks",
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

  it("guard commit ignores untracked files with --require-clean", async () => {
    const root = await mkGitRepoRoot();
    await writeFile(path.join(root, "file.txt"), "x", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "file.txt"], { cwd: root });
    await writeFile(path.join(root, "untracked.txt"), "y", "utf8");

    const io = captureStdIO();
    try {
      const code = await runCli([
        "guard",
        "commit",
        "202601010101-ABCDEF",
        "-m",
        "✨ ABCDEF guard: tracked-only clean",
        "--allow",
        ".",
        "--require-clean",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stderr).not.toContain("Working tree is dirty");
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
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane guard commit");
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
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane guard commit");
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
        "✨ ABCDEF guard: allow prefix",
        "--allow",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane guard commit");
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
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane guard commit");
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
        "✨ ABCDEF guard: run checks",
        "--nope",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane guard commit");
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
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane guard <command>");
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
        "✨ ABCDEF commit: wrapper command",
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
    expect(stdout.trim()).toBe("✨ ABCDEF commit: wrapper command");
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
        "✨ ABCDEF commit: protected policy",
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
        "✨ ABCDEF commit: protected policy",
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
    expect(stdout.trim()).toBe("✨ ABCDEF commit: protected policy");
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
        "✨ ABCDEF commit: allow file.txt",
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
        "✨ ABCDEF commit: quiet mode",
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
        "✨ ABCDEF commit: auto allow",
        "--auto-allow",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }
  });

  it("commit wrapper compresses noisy pre-commit output into summary", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await configureGitUser(root);
    await writeFile(path.join(root, "file.txt"), "x", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "file.txt"], { cwd: root });

    const hookLines = Array.from(
      { length: 40 },
      (_, i) => `HOOK_LINE_${String(i + 1).padStart(2, "0")}`,
    );
    const preCommit = [
      "#!/bin/sh",
      ...hookLines.map((line) => `echo "${line}" 1>&2`),
      "exit 1",
      "",
    ].join("\n");
    const hookPath = path.join(root, ".git", "hooks", "pre-commit");
    await writeFile(hookPath, preCommit, "utf8");
    await chmod(hookPath, 0o755);

    const io = captureStdIO();
    try {
      const code = await runCli([
        "commit",
        "202601010101-ABCDEF",
        "-m",
        "✨ ABCDEF commit: hook failure summary",
        "--allow",
        "file.txt",
        "--root",
        root,
      ]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("error [E_GIT]");
      expect(io.stderr).toContain("git commit failed");
      expect(io.stderr).toContain("output_summary:");
      expect(io.stderr).toContain("HOOK_LINE_01");
      expect(io.stderr).toContain("HOOK_LINE_40");
      expect(io.stderr).toContain("lines omitted");
      expect(io.stderr).not.toContain("HOOK_LINE_20");
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
    // Unstaged tracked changes should block --require-clean.
    await writeFile(path.join(root, "base.txt"), "y", "utf8");

    const io = captureStdIO();
    try {
      const code = await runCli([
        "commit",
        "202601010101-ABCDEF",
        "-m",
        "✨ ABCDEF commit: allow base",
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
        "✨ ABCDEF commit: allow tasks",
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

  it("commit wrapper supports --close and stages only the task README", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await configureGitUser(root);

    // Seed the repo so the implementation commit has a parent.
    await writeFile(path.join(root, "seed.txt"), "seed\n", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "seed.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "seed"], { cwd: root });

    // Implementation commit recorded into the task metadata.
    await mkdir(path.join(root, "src"), { recursive: true });
    await writeFile(path.join(root, "src", "app.ts"), ["x", "x", "x", "x", "x"].join("\n"), "utf8");
    await execFileAsync("git", ["add", "src/app.ts"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "impl"], { cwd: root });
    const implRes = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });
    const implHash = implRes.stdout.trim();

    const taskId = "202602081506-R18Y1Q";
    const taskDir = path.join(root, ".agentplane", "tasks", taskId);
    await mkdir(taskDir, { recursive: true });
    const readme = renderTaskReadme(
      {
        id: taskId,
        title: "Close commit: add --close mode to agentplane commit",
        result_summary: "generate deterministic close commits",
        description: "desc",
        status: "DONE",
        priority: "high",
        owner: "ORCHESTRATOR",
        depends_on: [],
        tags: ["cli", "code", "git"],
        verify: ["bun run test:full"],
        verification: {
          state: "ok",
          updated_at: "2026-02-08T00:00:00.000Z",
          updated_by: "TESTER",
          note: "Verified: bun run test:full; manual: agentplane commit --close",
        },
        commit: { hash: implHash, message: "✨ R18Y1Q guard: add close mode" },
        doc_version: 2,
        doc_updated_at: "2026-02-08T00:00:00.000Z",
        doc_updated_by: "TESTER",
      },
      "## Summary\n\nTest task\n",
    );
    await writeFile(path.join(taskDir, "README.md"), readme, "utf8");

    const io = captureStdIO();
    try {
      const code = await runCli(["commit", taskId, "--close", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("committed");
    } finally {
      io.restore();
    }

    const subjectRes = await execFileAsync("git", ["log", "-1", "--pretty=%s"], { cwd: root });
    const bodyRes = await execFileAsync("git", ["log", "-1", "--pretty=%b"], { cwd: root });
    const subject = subjectRes.stdout.trim();
    const body = bodyRes.stdout.trim();
    expect(subject).toContain("✅ R18Y1Q close:");
    expect(subject).toContain("(202602081506-R18Y1Q)");
    expect(subject).toContain("[cli,code,git]");
    expect(body).toContain("Scope: cli, code, git");
    expect(body).toContain(
      "Verify: Verified: bun run test:full; manual: agentplane commit --close",
    );
    expect(body).toContain("Key files: src/app.ts");

    // Close commit should touch only the task README.
    const showRes = await execFileAsync("git", ["show", "--name-only", "--format="], { cwd: root });
    const changed = showRes.stdout
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    expect(changed).toEqual([`.agentplane/tasks/${taskId}/README.md`]);
  });

  it("commit wrapper --close rejects non-empty index", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await configureGitUser(root);
    await writeFile(path.join(root, "seed.txt"), "seed\n", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "seed.txt"], { cwd: root });

    const io = captureStdIO();
    try {
      const code = await runCli(["commit", "202602081506-R18Y1Q", "--close", "--root", root]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("close commit requires an empty index");
      expect(io.stderr).toContain("--unstage-others");
    } finally {
      io.restore();
    }
  });

  it("commit wrapper --close supports --unstage-others", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await configureGitUser(root);
    const execFileAsync = promisify(execFile);

    await writeFile(path.join(root, "seed.txt"), "seed\n", "utf8");
    await execFileAsync("git", ["add", "seed.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "seed"], { cwd: root });

    await writeFile(path.join(root, "src.txt"), "impl\n", "utf8");
    await execFileAsync("git", ["add", "src.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "impl"], { cwd: root });
    const implRes = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });
    const implHash = implRes.stdout.trim();

    const taskId = "202602081506-R18Y1Q";
    const taskDir = path.join(root, ".agentplane", "tasks", taskId);
    await mkdir(taskDir, { recursive: true });
    const readme = renderTaskReadme(
      {
        id: taskId,
        title: "Close commit with index cleanup",
        result_summary: "close duplicate bookkeeping",
        description: "desc",
        status: "DONE",
        priority: "high",
        owner: "ORCHESTRATOR",
        depends_on: [],
        tags: ["docs"],
        verify: ["manual"],
        verification: {
          state: "ok",
          updated_at: "2026-02-08T00:00:00.000Z",
          updated_by: "TESTER",
          note: "Verified: manual check",
        },
        commit: { hash: implHash, message: "✨ R18Y1Q docs: impl" },
        doc_version: 2,
        doc_updated_at: "2026-02-08T00:00:00.000Z",
        doc_updated_by: "TESTER",
      },
      "## Summary\n\nTest task\n",
    );
    await writeFile(path.join(taskDir, "README.md"), readme, "utf8");

    await writeFile(path.join(root, "noise.txt"), "noise\n", "utf8");
    await execFileAsync("git", ["add", "noise.txt"], { cwd: root });

    const io = captureStdIO();
    try {
      const code = await runCli(["commit", taskId, "--close", "--unstage-others", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("committed");
    } finally {
      io.restore();
    }

    const showRes = await execFileAsync("git", ["show", "--name-only", "--format="], {
      cwd: root,
    });
    const changed = showRes.stdout
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    expect(changed).toEqual([`.agentplane/tasks/${taskId}/README.md`]);
  });

  it("commit wrapper --close supports --check-only", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await configureGitUser(root);
    const execFileAsync = promisify(execFile);

    await writeFile(path.join(root, "seed.txt"), "seed\n", "utf8");
    await execFileAsync("git", ["add", "seed.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "seed"], { cwd: root });
    const implRes = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });
    const implHash = implRes.stdout.trim();

    const taskId = "202602081506-R18Y1Q";
    const taskDir = path.join(root, ".agentplane", "tasks", taskId);
    await mkdir(taskDir, { recursive: true });
    const readme = renderTaskReadme(
      {
        id: taskId,
        title: "Close preflight check",
        result_summary: "check close",
        description: "desc",
        status: "DONE",
        priority: "high",
        owner: "ORCHESTRATOR",
        depends_on: [],
        tags: ["docs"],
        verify: ["manual"],
        verification: {
          state: "ok",
          updated_at: "2026-02-08T00:00:00.000Z",
          updated_by: "TESTER",
          note: "Verified: manual check",
        },
        commit: { hash: implHash, message: "✨ R18Y1Q docs: impl" },
        doc_version: 2,
        doc_updated_at: "2026-02-08T00:00:00.000Z",
        doc_updated_by: "TESTER",
      },
      "## Summary\n\nTest task\n",
    );
    await writeFile(path.join(taskDir, "README.md"), readme, "utf8");

    await writeFile(path.join(root, "noise.txt"), "noise\n", "utf8");
    await execFileAsync("git", ["add", "noise.txt"], { cwd: root });

    const beforeRes = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });
    const before = beforeRes.stdout.trim();
    const io = captureStdIO();
    try {
      const code = await runCli([
        "commit",
        taskId,
        "--close",
        "--check-only",
        "--unstage-others",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("close preflight");
      expect(io.stdout).toContain("would unstage 1 path(s)");
    } finally {
      io.restore();
    }
    const afterRes = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });
    const after = afterRes.stdout.trim();
    expect(after).toBe(before);
  });

  it("commit wrapper requires a message", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["commit", "202601010101-ABCDEF", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane commit");
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
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane commit");
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
        "✨ ABCDEF commit: run commit",
        "--nope",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane commit");
    } finally {
      io.restore();
    }
  });
});
