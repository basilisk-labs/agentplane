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
  it("hooks install writes managed hooks and shim", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "install", "--root", root]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    const hooksDir = path.join(root, ".git", "hooks");
    const commitMsg = await readFile(path.join(hooksDir, "commit-msg"), "utf8");
    const preCommit = await readFile(path.join(hooksDir, "pre-commit"), "utf8");
    const shim = await readFile(path.join(root, ".agentplane", "bin", "agentplane"), "utf8");

    expect(commitMsg).toContain("agentplane-hook");
    expect(preCommit).toContain("agentplane-hook");
    expect(shim).toContain("agentplane-hook-shim");
  });

  it("hooks install refuses to overwrite unmanaged hook", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await mkdir(path.join(root, ".git", "hooks"), { recursive: true });
    await writeFile(path.join(root, ".git", "hooks", "commit-msg"), "custom", "utf8");

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "install", "--root", root]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("Refusing to overwrite existing hook");
    } finally {
      io.restore();
    }
  });

  it("hooks install is idempotent for managed hooks", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await runCliSilent(["hooks", "install", "--root", root]);

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "install", "--root", root]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }
  });

  it("hooks install supports --quiet", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "install", "--quiet", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toBe("");
    } finally {
      io.restore();
    }
  }, 15_000);

  it("hooks install maps errors for non-git roots", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-cli-test-"));
    await mkdir(path.join(root, ".agentplane"), { recursive: true });
    await writeFile(path.join(root, ".agentplane", "config.json"), "{}", "utf8");
    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "install", "--root", root]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("Not a git repository");
    } finally {
      io.restore();
    }
  });

  it("hooks rejects unknown subcommands", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "nope", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane hooks <command>");
    } finally {
      io.restore();
    }
  });

  it("hooks uninstall removes managed hooks", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await runCliSilent(["hooks", "install", "--root", root]);

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "uninstall", "--root", root]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    const hookPath = path.join(root, ".git", "hooks", "commit-msg");
    await expect(readFile(hookPath, "utf8")).rejects.toThrow();
  });

  it("hooks uninstall reports when no hooks are present", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "uninstall", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("no agentplane hooks found");
    } finally {
      io.restore();
    }
  });

  it("hooks uninstall maps errors for non-git roots", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-cli-test-"));
    await mkdir(path.join(root, ".agentplane"), { recursive: true });
    await writeFile(path.join(root, ".agentplane", "config.json"), "{}", "utf8");
    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "uninstall", "--root", root]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("Not a git repository");
    } finally {
      io.restore();
    }
  });

  it("hooks run commit-msg requires a message file", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "run", "commit-msg", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Missing commit message file");
    } finally {
      io.restore();
    }
  });

  it("hooks run commit-msg enforces task id env", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const messagePath = path.join(root, "COMMIT_EDITMSG");
    await writeFile(messagePath, "✨ ABCDEF guard: add checks\n", "utf8");
    const prev = process.env.AGENTPLANE_TASK_ID;
    process.env.AGENTPLANE_TASK_ID = "202601010101-ABCDEF";

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "run", "commit-msg", messagePath, "--root", root]);
      expect(code).toBe(0);
    } finally {
      io.restore();
      if (prev === undefined) delete process.env.AGENTPLANE_TASK_ID;
      else process.env.AGENTPLANE_TASK_ID = prev;
    }
  });

  it("hooks run commit-msg rejects generic subjects even with task env", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const messagePath = path.join(root, "COMMIT_EDITMSG");
    await writeFile(messagePath, "✨ ABCDEF task: update\n", "utf8");
    const prev = process.env.AGENTPLANE_TASK_ID;
    process.env.AGENTPLANE_TASK_ID = "202601010101-ABCDEF";

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "run", "commit-msg", messagePath, "--root", root]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("commit subject is too generic");
    } finally {
      io.restore();
      if (prev === undefined) delete process.env.AGENTPLANE_TASK_ID;
      else process.env.AGENTPLANE_TASK_ID = prev;
    }
  });

  it("hooks run rejects unknown hook", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "run", "nope", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane hooks run");
    } finally {
      io.restore();
    }
  });

  it("hooks run commit-msg rejects empty subject", async () => {
    const root = await mkGitRepoRoot();
    const messagePath = path.join(root, "COMMIT_EDITMSG");
    await writeFile(messagePath, "# comment\n\n", "utf8");
    const prev = process.env.AGENTPLANE_TASK_ID;
    delete process.env.AGENTPLANE_TASK_ID;

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "run", "commit-msg", messagePath, "--root", root]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("Commit message subject is empty");
    } finally {
      io.restore();
      if (prev === undefined) delete process.env.AGENTPLANE_TASK_ID;
      else process.env.AGENTPLANE_TASK_ID = prev;
    }
  });

  it("hooks run commit-msg rejects missing suffix", async () => {
    const root = await mkGitRepoRoot();
    const messagePath = path.join(root, "COMMIT_EDITMSG");
    await writeFile(messagePath, "chore: update\n", "utf8");
    const prev = process.env.AGENTPLANE_TASK_ID;
    process.env.AGENTPLANE_TASK_ID = "202601010101-ABCDEF";

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "run", "commit-msg", messagePath, "--root", root]);
      expect(code).toBe(5);
    } finally {
      io.restore();
      if (prev === undefined) delete process.env.AGENTPLANE_TASK_ID;
      else process.env.AGENTPLANE_TASK_ID = prev;
    }
  });

  it("hooks run commit-msg rejects when task env is unset", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const messagePath = path.join(root, "COMMIT_EDITMSG");
    await writeFile(messagePath, "✨ ABCDEF task: add hooks\n", "utf8");
    const prev = process.env.AGENTPLANE_TASK_ID;
    delete process.env.AGENTPLANE_TASK_ID;

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "run", "commit-msg", messagePath, "--root", root]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("task id is required unless the suffix is 'DEV'");
    } finally {
      io.restore();
      if (prev === undefined) delete process.env.AGENTPLANE_TASK_ID;
      else process.env.AGENTPLANE_TASK_ID = prev;
    }
  });

  it("hooks run commit-msg accepts DEV suffix when task env is unset", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const messagePath = path.join(root, "COMMIT_EDITMSG");
    await writeFile(messagePath, "✨ DEV ci: enforce full tests before push\n", "utf8");
    const prev = process.env.AGENTPLANE_TASK_ID;
    delete process.env.AGENTPLANE_TASK_ID;

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "run", "commit-msg", messagePath, "--root", root]);
      expect(code).toBe(0);
    } finally {
      io.restore();
      if (prev === undefined) delete process.env.AGENTPLANE_TASK_ID;
      else process.env.AGENTPLANE_TASK_ID = prev;
    }
  });

  it("hooks run pre-commit succeeds when nothing is staged", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "run", "pre-commit", "--root", root]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }
  });

  it("hooks run pre-commit maps errors for non-git roots", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-cli-test-"));
    await mkdir(path.join(root, ".agentplane"), { recursive: true });
    await writeFile(path.join(root, ".agentplane", "config.json"), "{}", "utf8");
    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "run", "pre-commit", "--root", root]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("Not a git repository");
    } finally {
      io.restore();
    }
  });

  it("hooks run pre-commit blocks tasks.json without allow flag", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await writeFile(path.join(root, ".agentplane", "tasks.json"), "{}", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", ".agentplane/tasks.json"], { cwd: root });

    const prev = process.env.AGENTPLANE_ALLOW_TASKS;
    process.env.AGENTPLANE_ALLOW_TASKS = "0";

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "run", "pre-commit", "--root", root]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("protected by agentplane hooks");
    } finally {
      io.restore();
      if (prev === undefined) delete process.env.AGENTPLANE_ALLOW_TASKS;
      else process.env.AGENTPLANE_ALLOW_TASKS = prev;
    }
  });

  it("hooks run pre-push returns success", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "run", "pre-push", "--root", root]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }
  });

  it("hooks run pre-commit allows tasks.json with env override", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await writeFile(path.join(root, ".agentplane", "tasks.json"), "{}", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", ".agentplane/tasks.json"], { cwd: root });

    const prev = process.env.AGENTPLANE_ALLOW_TASKS;
    process.env.AGENTPLANE_ALLOW_TASKS = "1";

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "run", "pre-commit", "--root", root]);
      expect(code).toBe(0);
    } finally {
      io.restore();
      if (prev === undefined) delete process.env.AGENTPLANE_ALLOW_TASKS;
      else process.env.AGENTPLANE_ALLOW_TASKS = prev;
    }
  });

  it("hooks run pre-commit blocks AGENTS.md without env override", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await writeFile(path.join(root, "AGENTS.md"), "# policy\n", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "AGENTS.md"], { cwd: root });

    const prev = process.env.AGENTPLANE_ALLOW_POLICY;
    process.env.AGENTPLANE_ALLOW_POLICY = "0";

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "run", "pre-commit", "--root", root]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("AGENTS.md is protected by agentplane hooks");
      expect(io.stderr).toContain("AGENTPLANE_ALLOW_POLICY=1");
    } finally {
      io.restore();
      if (prev === undefined) delete process.env.AGENTPLANE_ALLOW_POLICY;
      else process.env.AGENTPLANE_ALLOW_POLICY = prev;
    }
  });

  it("hooks run pre-commit allows AGENTS.md with env override", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await writeFile(path.join(root, "AGENTS.md"), "# policy\n", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "AGENTS.md"], { cwd: root });

    const prev = process.env.AGENTPLANE_ALLOW_POLICY;
    process.env.AGENTPLANE_ALLOW_POLICY = "1";

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "run", "pre-commit", "--root", root]);
      expect(code).toBe(0);
    } finally {
      io.restore();
      if (prev === undefined) delete process.env.AGENTPLANE_ALLOW_POLICY;
      else process.env.AGENTPLANE_ALLOW_POLICY = prev;
    }
  });

  it("hooks run pre-commit allows base branch with allowBase", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);
    await mkdir(path.join(root, "src"), { recursive: true });
    await writeFile(path.join(root, "src", "app.ts"), "x", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "src/app.ts"], { cwd: root });

    const prev = process.env.AGENTPLANE_ALLOW_BASE;
    process.env.AGENTPLANE_ALLOW_BASE = "1";

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "run", "pre-commit", "--root", root]);
      expect(code).toBe(0);
    } finally {
      io.restore();
      if (prev === undefined) delete process.env.AGENTPLANE_ALLOW_BASE;
      else process.env.AGENTPLANE_ALLOW_BASE = prev;
    }
  });

  it("hooks run pre-commit enforces branch_pr base restrictions", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);
    await mkdir(path.join(root, "src"), { recursive: true });
    await writeFile(path.join(root, "src", "app.ts"), "x", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "src/app.ts"], { cwd: root });

    const prev = process.env.AGENTPLANE_ALLOW_BASE;
    delete process.env.AGENTPLANE_ALLOW_BASE;

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "run", "pre-commit", "--root", root]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("forbidden on main");
    } finally {
      io.restore();
      if (prev === undefined) delete process.env.AGENTPLANE_ALLOW_BASE;
      else process.env.AGENTPLANE_ALLOW_BASE = prev;
    }
  });

  it("hooks run pre-commit blocks tasks.json off base in branch_pr", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["checkout", "-b", "feature"], { cwd: root });
    await writeFile(path.join(root, ".agentplane", "tasks.json"), "{}", "utf8");
    await execFileAsync("git", ["add", ".agentplane/tasks.json"], { cwd: root });

    const prev = process.env.AGENTPLANE_ALLOW_TASKS;
    process.env.AGENTPLANE_ALLOW_TASKS = "1";

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "run", "pre-commit", "--root", root]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("allowed only on main");
    } finally {
      io.restore();
      if (prev === undefined) delete process.env.AGENTPLANE_ALLOW_TASKS;
      else process.env.AGENTPLANE_ALLOW_TASKS = prev;
    }
  });
});
