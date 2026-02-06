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
  it("branch base get returns default when not pinned", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["branch", "base", "get", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout.trim()).toBe("main");
    } finally {
      io.restore();
    }
  });

  it("branch base get maps errors for non-git roots", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-cli-test-"));
    const io = captureStdIO();
    try {
      const code = await runCli(["branch", "base", "get", "--root", root]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("Not a git repository");
    } finally {
      io.restore();
    }
  });

  it("branch base set writes git config and returns value", async () => {
    const root = await mkGitRepoRoot();
    const io1 = captureStdIO();
    try {
      const code1 = await runCli(["branch", "base", "set", "develop", "--root", root]);
      expect(code1).toBe(0);
      expect(io1.stdout.trim()).toBe("develop");
    } finally {
      io1.restore();
    }

    const io2 = captureStdIO();
    try {
      const code2 = await runCli(["branch", "base", "get", "--root", root]);
      expect(code2).toBe(0);
      expect(io2.stdout.trim()).toBe("develop");
    } finally {
      io2.restore();
    }
  });

  it("branch base set --current pins the current branch", async () => {
    const root = await mkGitRepoRootWithBranch("feature");
    const io1 = captureStdIO();
    try {
      const code1 = await runCli(["branch", "base", "set", "--current", "--root", root]);
      expect(code1).toBe(0);
      expect(io1.stdout.trim()).toBe("feature");
    } finally {
      io1.restore();
    }

    const io2 = captureStdIO();
    try {
      const code2 = await runCli(["branch", "base", "get", "--root", root]);
      expect(code2).toBe(0);
      expect(io2.stdout.trim()).toBe("feature");
    } finally {
      io2.restore();
    }
  });

  it("branch base clear removes pinned base", async () => {
    const root = await mkGitRepoRoot();
    await runCliSilent(["branch", "base", "set", "develop", "--root", root]);

    const io1 = captureStdIO();
    try {
      const code1 = await runCli(["branch", "base", "clear", "--root", root]);
      expect(code1).toBe(0);
      expect(io1.stdout.trim()).toBe("cleared");
    } finally {
      io1.restore();
    }

    const io2 = captureStdIO();
    try {
      const code2 = await runCli(["branch", "base", "get", "--root", root]);
      expect(code2).toBe(0);
      expect(io2.stdout.trim()).toBe("main");
    } finally {
      io2.restore();
    }
  });

  it("branch base explain prints current, pinned, and effective base", async () => {
    const root = await mkGitRepoRootWithBranch("feature");
    const execFileAsync = promisify(execFile);
    await configureGitUser(root);
    await writeFile(path.join(root, "seed.txt"), "seed", "utf8");
    await execFileAsync("git", ["add", "seed.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "seed"], { cwd: root });
    await execFileAsync("git", ["branch", "main"], { cwd: root }).catch(() => null);
    await execFileAsync("git", ["config", "--local", "--unset-all", "agentplane.baseBranch"], {
      cwd: root,
    }).catch(() => null);
    await execFileAsync("git", ["config", "--local", "agentplane.baseBranch", "main"], {
      cwd: root,
    });

    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);

    const io = captureStdIO();
    try {
      const code = await runCli(["branch", "base", "explain", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("current_branch=feature");
      expect(io.stdout).toContain("pinned_base=main");
      expect(io.stdout).toContain("effective_base=main");
    } finally {
      io.restore();
    }
  });

  it("branch base set maps errors for non-git roots", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-cli-test-"));
    const io = captureStdIO();
    try {
      const code = await runCli(["branch", "base", "set", "main", "--root", root]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("Not a git repository");
    } finally {
      io.restore();
    }
  });

  it("branch base set rejects blank values", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["branch", "base", "set", "   ", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane branch base");
    } finally {
      io.restore();
    }
  });

  it("branch base set requires a value", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["branch", "base", "set", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane branch base");
    } finally {
      io.restore();
    }
  });

  it("branch base rejects unknown subcommands", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["branch", "base", "nope", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane branch base");
    } finally {
      io.restore();
    }
  });

  it("ready reports readiness details", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const depId = "202601301111-READY01";
    const taskId = "202601301111-READY02";

    await runCliSilent([
      "task",
      "add",
      depId,
      "--title",
      "Dep task",
      "--description",
      "Dep",
      "--priority",
      "med",
      "--owner",
      "CODER",
      "--tag",
      "nodejs",
      "--root",
      root,
    ]);
    await runCliSilent([
      "task",
      "add",
      taskId,
      "--title",
      "Main task",
      "--description",
      "Main",
      "--priority",
      "med",
      "--owner",
      "CODER",
      "--tag",
      "nodejs",
      "--depends-on",
      depId,
      "--root",
      root,
    ]);
    const execFileAsync = promisify(execFile);
    await writeFile(path.join(root, "seed.txt"), "seed\n", "utf8");
    await execFileAsync("git", ["add", "seed.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "seed"], { cwd: root });
    await runCliSilent([
      "verify",
      depId,
      "--ok",
      "--by",
      "TESTER",
      "--note",
      "Ok to finish dependency",
      "--quiet",
      "--root",
      root,
    ]);
    await runCliSilent([
      "finish",
      depId,
      "--author",
      "INTEGRATOR",
      "--body",
      "Verified: dependency completed for readiness test; checks done locally; no issues found.",
      "--root",
      root,
    ]);

    const io = captureStdIO();
    try {
      const code = await runCli(["ready", taskId, "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain(`Task: ${taskId}`);
      expect(io.stdout).toContain("✅ ready");
    } finally {
      io.restore();
    }
  });

  it("ready reports missing dependencies", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const taskId = "202601301111-READY03";
    await runCliSilent([
      "task",
      "add",
      taskId,
      "--title",
      "Waiting task",
      "--description",
      "Waiting",
      "--priority",
      "med",
      "--owner",
      "CODER",
      "--tag",
      "nodejs",
      "--depends-on",
      "202601301111-MISSING",
      "--root",
      root,
    ]);

    const io = captureStdIO();
    try {
      const code = await runCli(["ready", taskId, "--root", root]);
      expect(code).toBe(2);
      expect(io.stdout).toContain("missing deps");
      expect(io.stdout).toContain("⚠️ not ready");
    } finally {
      io.restore();
    }
  });

  it("quickstart prints CLI help output", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const io = captureStdIO();
    try {
      const code = await runCli(["quickstart", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("agentplane quickstart");
      expect(io.stdout).toContain("agentplane init");
    } finally {
      io.restore();
    }
  });

  it("role prints role guidance", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const io = captureStdIO();
    try {
      const code = await runCli(["role", "CODER", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("### CODER");
      expect(io.stdout).toContain("agentplane start");
    } finally {
      io.restore();
    }
  });

  it("agents lists agent json files", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const agentsDir = path.join(root, ".agentplane", "agents");
    await mkdir(agentsDir, { recursive: true });
    await writeFile(
      path.join(agentsDir, "CODER.json"),
      JSON.stringify({ id: "CODER", role: "Code changes" }, null, 2),
      "utf8",
    );
    const io = captureStdIO();
    try {
      const code = await runCli(["agents", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("ID");
      expect(io.stdout).toContain("CODER");
    } finally {
      io.restore();
    }
  });

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
      const code = await runCli(["sync", "redmine", "--direction", "push", "--root", root]);
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
      const code = await runCli(["sync", "redmine", "--direction", "pull", "--root", root]);
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
      expect(io.stderr).toContain("See `agentplane --help` for usage.");
    } finally {
      io.restore();
    }
  });

  it("sync flag parsing rejects invalid usage", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const cases: { args: string[]; msg: string }[] = [
      { args: ["sync", "--direction"], msg: "Usage: agentplane sync" },
      { args: ["sync", "--conflict"], msg: "Usage: agentplane sync" },
      { args: ["sync", "--direction", "sideways"], msg: "Usage: agentplane sync" },
      { args: ["sync", "--conflict", "nope"], msg: "Usage: agentplane sync" },
      { args: ["sync", "--wat"], msg: "Usage: agentplane sync" },
      { args: ["sync", "a", "b"], msg: "Usage: agentplane sync" },
      { args: ["backend", "sync"], msg: "Usage: agentplane backend sync" },
      {
        args: ["backend", "sync", "redmine", "--direction"],
        msg: "Usage: agentplane backend sync",
      },
      {
        args: ["backend", "sync", "redmine", "--direction", "noop"],
        msg: "Usage: agentplane backend sync",
      },
      {
        args: ["backend", "sync", "redmine", "--conflict", "nope"],
        msg: "Usage: agentplane backend sync",
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
  });

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
