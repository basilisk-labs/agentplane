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

  it("task export prefers the configured backend projection snapshot for remote backends", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const resolved: ResolvedProject = {
      gitRoot: root,
      agentplaneDir: path.join(root, ".agentplane"),
    };
    const exportProjectionSnapshot = vi.fn(async (outputPath: string) => {
      await writeFile(
        outputPath,
        JSON.stringify({ tasks: [{ id: "R-1", title: "Remote" }], meta: { checksum: "proj" } }),
        "utf8",
      );
    });
    const exportTasksJson = vi.fn(() => {
      throw new Error("exportTasksJson should not be used when projection export is available");
    });
    const loadResult = {
      backend: stubTaskBackend({
        id: "redmine",
        capabilities: {
          canonical_source: "remote",
          projection: "cache",
          reads_from_projection_by_default: true,
          may_access_network_on_read: false,
          may_access_network_on_write: true,
          supports_projection_refresh: true,
          supports_push_sync: true,
          supports_snapshot_export: true,
        },
        exportProjectionSnapshot,
        exportTasksJson,
      }),
      backendId: "redmine",
      resolved,
      config: defaultConfig(),
      backendConfigPath: path.join(root, ".agentplane", "backends", "redmine", "backend.json"),
    } satisfies Awaited<ReturnType<typeof taskBackend.loadTaskBackend>>;
    const spy = vi.spyOn(taskBackend, "loadTaskBackend").mockResolvedValue(loadResult);

    const io = captureStdIO();
    try {
      const code = await runCli(["task", "export", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout.trim()).toBe(".agentplane/tasks.json");
      expect(exportProjectionSnapshot).toHaveBeenCalledWith(
        path.join(root, ".agentplane", "tasks.json"),
      );
      expect(exportTasksJson).not.toHaveBeenCalled();
    } finally {
      io.restore();
      spy.mockRestore();
    }

    const text = await readFile(path.join(root, ".agentplane", "tasks.json"), "utf8");
    expect(JSON.parse(text)).toMatchObject({
      tasks: [{ id: "R-1", title: "Remote" }],
      meta: { checksum: "proj" },
    });
  });
});
