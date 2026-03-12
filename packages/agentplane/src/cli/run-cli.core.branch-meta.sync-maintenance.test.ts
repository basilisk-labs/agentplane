/* eslint-disable @typescript-eslint/no-unused-vars */
import { execFile } from "node:child_process";
import { readFileSync } from "node:fs";
import {
  chmod,
  copyFile,
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
import * as taskBackend from "../backends/task-backend.js";
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
  it("sync forwards flags to the backend", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const sync = vi.fn().mockImplementation(() => Promise.resolve());
    const resolved: ResolvedProject = {
      gitRoot: root,
      agentplaneDir: path.join(root, ".agentplane"),
    };
    const loadResult = {
      backend: stubTaskBackend({ id: "redmine", sync }),
      backendId: "redmine",
      resolved,
      config: defaultConfig(),
      backendConfigPath: path.join(root, ".agentplane", "backends", "redmine", "backend.json"),
    } satisfies Awaited<ReturnType<typeof taskBackend.loadTaskBackend>>;
    const spy = vi.spyOn(taskBackend, "loadTaskBackend").mockResolvedValue(loadResult);

    const io = captureStdIO();
    try {
      const code = await runCli([
        "sync",
        "redmine",
        "--direction",
        "pull",
        "--conflict",
        "prefer-remote",
        "--yes",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(sync).toHaveBeenCalledWith({
        direction: "pull",
        conflict: "prefer-remote",
        quiet: false,
        confirm: true,
      });
    } finally {
      io.restore();
      spy.mockRestore();
    }
  });

  it("backend sync defaults direction to push when omitted", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const sync = vi.fn().mockImplementation(() => Promise.resolve());
    const resolved: ResolvedProject = {
      gitRoot: root,
      agentplaneDir: path.join(root, ".agentplane"),
    };
    const loadResult = {
      backend: stubTaskBackend({ id: "redmine", sync }),
      backendId: "redmine",
      resolved,
      config: defaultConfig(),
      backendConfigPath: path.join(root, ".agentplane", "backends", "redmine", "backend.json"),
    } satisfies Awaited<ReturnType<typeof taskBackend.loadTaskBackend>>;
    const spy = vi.spyOn(taskBackend, "loadTaskBackend").mockResolvedValue(loadResult);

    const io = captureStdIO();
    try {
      const code = await runCli(["backend", "sync", "redmine", "--yes", "--root", root]);
      expect(code).toBe(0);
      expect(sync).toHaveBeenCalledWith({
        direction: "push",
        conflict: "diff",
        quiet: false,
        confirm: true,
      });
    } finally {
      io.restore();
      spy.mockRestore();
    }
  });

  it("sync rejects backend id mismatches", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const sync = vi.fn().mockImplementation(() => Promise.resolve());
    const resolved: ResolvedProject = {
      gitRoot: root,
      agentplaneDir: path.join(root, ".agentplane"),
    };
    const loadResult = {
      backend: stubTaskBackend({ id: "redmine", sync }),
      backendId: "redmine",
      resolved,
      config: defaultConfig(),
      backendConfigPath: path.join(root, ".agentplane", "backends", "redmine", "backend.json"),
    } satisfies Awaited<ReturnType<typeof taskBackend.loadTaskBackend>>;
    const spy = vi.spyOn(taskBackend, "loadTaskBackend").mockResolvedValue(loadResult);

    const io = captureStdIO();
    try {
      const code = await runCli(["sync", "local", "--direction", "push", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain('Configured backend is "redmine", not "local"');
      expect(io.stderr).toContain("Configured backend id mismatch");
      expect(io.stderr).toContain("next_action: agentplane config show");
    } finally {
      io.restore();
      spy.mockRestore();
    }
  });

  it("sync maps backend errors with hints", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const resolved: ResolvedProject = {
      gitRoot: root,
      agentplaneDir: path.join(root, ".agentplane"),
    };
    const loadResult = {
      backend: stubTaskBackend({
        id: "redmine",
        sync: vi.fn().mockImplementation(() => {
          throw new taskBackend.BackendError("Network down", "E_NETWORK");
        }),
      }),
      backendId: "redmine",
      resolved,
      config: defaultConfig(),
      backendConfigPath: path.join(root, ".agentplane", "backends", "redmine", "backend.json"),
    } satisfies Awaited<ReturnType<typeof taskBackend.loadTaskBackend>>;
    const spy = vi.spyOn(taskBackend, "loadTaskBackend").mockResolvedValue(loadResult);

    const io = captureStdIO();
    try {
      const code = await runCli([
        "sync",
        "redmine",
        "--direction",
        "push",
        "--yes",
        "--root",
        root,
      ]);
      expect(code).toBe(7);
      expect(io.stderr).toContain("error [E_NETWORK]");
      expect(io.stderr).toContain("Check network access and credentials.");
    } finally {
      io.restore();
      spy.mockRestore();
    }
  });

  it("sync maps backend errors with backend config hints", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const resolved: ResolvedProject = {
      gitRoot: root,
      agentplaneDir: path.join(root, ".agentplane"),
    };
    const loadResult = {
      backend: stubTaskBackend({
        id: "redmine",
        sync: vi.fn().mockImplementation(() => {
          throw new taskBackend.BackendError("Missing config", "E_BACKEND");
        }),
      }),
      backendId: "redmine",
      resolved,
      config: defaultConfig(),
      backendConfigPath: path.join(root, ".agentplane", "backends", "redmine", "backend.json"),
    } satisfies Awaited<ReturnType<typeof taskBackend.loadTaskBackend>>;
    const spy = vi.spyOn(taskBackend, "loadTaskBackend").mockResolvedValue(loadResult);

    const io = captureStdIO();
    try {
      const code = await runCli([
        "sync",
        "redmine",
        "--direction",
        "pull",
        "--yes",
        "--root",
        root,
      ]);
      expect(code).toBe(6);
      expect(io.stderr).toContain("error [E_BACKEND]");
      expect(io.stderr).toContain("Check backend config under .agentplane/backends and retry.");
    } finally {
      io.restore();
      spy.mockRestore();
    }
  });

  it("task list maps backend errors with default backend hints", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const resolved: ResolvedProject = {
      gitRoot: root,
      agentplaneDir: path.join(root, ".agentplane"),
    };
    const spy = vi.spyOn(taskBackend, "loadTaskBackend").mockResolvedValue({
      backend: stubTaskBackend({
        listTasks: vi.fn().mockImplementation(() => {
          throw new taskBackend.BackendError("Backend failed", "E_BACKEND");
        }),
      }),
      backendId: "redmine",
      resolved,
      config: defaultConfig(),
      backendConfigPath: path.join(root, ".agentplane", "backends", "redmine", "backend.json"),
    });

    const io = captureStdIO();
    try {
      const code = await runCli(["task", "list", "--root", root]);
      expect(code).toBe(6);
      expect(io.stderr).toContain("error [E_BACKEND]");
      expect(io.stderr).toContain("Check backend config under .agentplane/backends.");
    } finally {
      io.restore();
      spy.mockRestore();
    }
  });

  it("renders git hint for branch commands", async () => {
    const root = await mkTempDir();
    const io = captureStdIO();
    try {
      const code = await runCli(["branch", "base", "get", "--root", root]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("Check git repo/branch");
    } finally {
      io.restore();
    }
  });

  it("renders git hint for non-branch commands", async () => {
    const root = await mkTempDir();
    const io = captureStdIO();
    try {
      const code = await runCli(["task", "list", "--root", root]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("Check git repo context");
    } finally {
      io.restore();
    }
  });

  it("renders usage hint for missing args", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["config", "set"]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("See `agentplane help");
    } finally {
      io.restore();
    }
  });

  it("sync flag parsing rejects invalid usage", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const cases: { args: string[]; cmd: string }[] = [
      { args: ["sync", "--direction"], cmd: "sync" },
      { args: ["sync", "--conflict"], cmd: "sync" },
      { args: ["sync", "--direction", "sideways"], cmd: "sync" },
      { args: ["sync", "--conflict", "nope"], cmd: "sync" },
      { args: ["sync", "--wat"], cmd: "sync" },
      { args: ["sync", "a", "b"], cmd: "sync" },
      { args: ["backend", "sync"], cmd: "backend sync" },
      {
        args: ["backend", "sync", "redmine", "--direction", "noop"],
        cmd: "backend sync",
      },
      {
        args: ["backend", "sync", "redmine", "--conflict", "nope"],
        cmd: "backend sync",
      },
    ];

    for (const entry of cases) {
      const io = captureStdIO();
      try {
        const code = await runCli([...entry.args, "--root", root]);
        expect(code).toBe(2);
        expect(io.stderr).toContain("Usage:");
        expect(io.stderr).toContain(`agentplane ${entry.cmd}`);
      } finally {
        io.restore();
      }
    }
  });

  it("branch status reports ahead/behind", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await writeDefaultConfig(root);
    await configureGitUser(root);
    const execFileAsync = promisify(execFile);
    await writeFile(path.join(root, "README.md"), "base\n", "utf8");
    await execFileAsync("git", ["add", "README.md"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "chore base"], { cwd: root });
    await execFileAsync("git", ["checkout", "-b", "task/202601301111-STAT01/test"], {
      cwd: root,
    });
    await writeFile(path.join(root, "feature.txt"), "feature\n", "utf8");
    await execFileAsync("git", ["add", "feature.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "feat: add"], { cwd: root });
    await execFileAsync("git", ["checkout", "main"], { cwd: root });

    const io = captureStdIO();
    try {
      const code = await runCli([
        "branch",
        "status",
        "--branch",
        "task/202601301111-STAT01/test",
        "--base",
        "main",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("branch=task/202601301111-STAT01/test");
      expect(io.stdout).toContain("ahead=");
    } finally {
      io.restore();
    }
  }, 60_000);

  it("branch remove deletes the branch", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await writeDefaultConfig(root);
    await configureGitUser(root);
    const execFileAsync = promisify(execFile);
    await writeFile(path.join(root, "README.md"), "base\n", "utf8");
    await execFileAsync("git", ["add", "README.md"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "chore base"], { cwd: root });
    await execFileAsync("git", ["checkout", "-b", "feature"], { cwd: root });
    await execFileAsync("git", ["checkout", "main"], { cwd: root });

    const io = captureStdIO();
    try {
      const code = await runCli(["branch", "remove", "--branch", "feature", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("✅ removed branch feature");
    } finally {
      io.restore();
    }
    expect(await gitBranchExists(root, "feature")).toBe(false);
  });
});
