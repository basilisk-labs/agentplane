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
import { getVersion } from "../meta/version.js";
import {
  filterAgentsByWorkflow,
  loadAgentTemplates,
  loadAgentsTemplate,
  loadPolicyTemplates,
} from "../agents/agents-template.js";
import { renderPolicyGatewayTemplateText } from "../shared/policy-gateway.js";
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

function normalizeSlashes(value: string): string {
  return value.replaceAll("\\", "/");
}

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
  it("backend rejects unknown subcommands", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const io = captureStdIO();
    try {
      const code = await runCli(["backend", "nope", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane backend sync");
    } finally {
      io.restore();
    }
  });

  it("backend sync routes to configured backend", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const io = captureStdIO();
    try {
      const code = await runCli([
        "backend",
        "sync",
        "local",
        "--direction",
        "pull",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Backend does not support sync()");
    } finally {
      io.restore();
    }
  });

  it("backend sync rejects invalid flags", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const cases: { args: string[] }[] = [
      {
        args: ["backend", "sync", "--direction", "sideways"],
      },
      { args: ["backend", "sync", "--conflict", "nope"] },
      { args: ["backend", "sync", "one", "two"] },
      { args: ["backend", "sync", "--wat"] },
    ];

    for (const entry of cases) {
      const io = captureStdIO();
      try {
        const code = await runCli([...entry.args, "--root", root]);
        expect(code).toBe(2);
        expect(io.stderr).toContain("Usage:");
        expect(io.stderr).toContain("agentplane backend sync");
      } finally {
        io.restore();
      }
    }
  });

  it("backend sync forwards flags to the backend", async () => {
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
        "backend",
        "sync",
        "redmine",
        "--direction",
        "push",
        "--conflict",
        "prefer-local",
        "--yes",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(sync).toHaveBeenCalledWith({
        direction: "push",
        conflict: "prefer-local",
        quiet: false,
        confirm: true,
      });
    } finally {
      io.restore();
      spy.mockRestore();
    }
  });

  it("backend sync requires --yes in non-tty mode when require_network=true and backend is non-local", async () => {
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
        "backend",
        "sync",
        "redmine",
        "--direction",
        "push",
        "--root",
        root,
      ]);
      expect(code).toBe(3);
      expect(io.stderr).toContain("--yes");
      expect(sync).not.toHaveBeenCalled();
    } finally {
      io.restore();
      spy.mockRestore();
    }
  });

  it("sync routes to configured backend", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const io = captureStdIO();
    try {
      const code = await runCli(["sync", "--direction", "pull", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Backend does not support sync()");
    } finally {
      io.restore();
    }
  });

  it("sync rejects invalid flags", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const cases: { args: string[]; msg: string }[] = [
      { args: ["sync", "--direction", "sideways"], msg: "Usage:" },
      { args: ["sync", "--conflict", "nope"], msg: "Usage:" },
      { args: ["sync", "one", "two"], msg: "Usage:" },
      { args: ["sync", "--wat"], msg: "Usage:" },
    ];

    for (const entry of cases) {
      const io = captureStdIO();
      try {
        const code = await runCli([...entry.args, "--root", root]);
        expect(code).toBe(2);
        expect(io.stderr).toContain(entry.msg);
        expect(io.stderr).toContain("agentplane sync");
        expect(io.stderr).toContain("agentplane help sync --compact");
      } finally {
        io.restore();
      }
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
        "push",
        "--conflict",
        "prefer-local",
        "--yes",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(sync).toHaveBeenCalledWith({
        direction: "push",
        conflict: "prefer-local",
        quiet: false,
        confirm: true,
      });
    } finally {
      io.restore();
      spy.mockRestore();
    }
  });

  it("sync requires --yes in non-tty mode when require_network=true and backend is non-local", async () => {
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
      const code = await runCli(["sync", "redmine", "--direction", "push", "--root", root]);
      expect(code).toBe(3);
      expect(io.stderr).toContain("--yes");
      expect(sync).not.toHaveBeenCalled();
    } finally {
      io.restore();
      spy.mockRestore();
    }
  });
});
