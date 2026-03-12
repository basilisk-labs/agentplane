import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { cmdTaskMigrate, cmdTaskNormalize, cmdTaskScaffold, cmdTaskScrub } from "./workflow.js";
import { defaultConfig } from "@agentplaneorg/core";
import * as taskBackend from "../backends/task-backend.js";
import type { TaskData } from "../backends/task-backend.js";
import {
  captureStdIO,
  mkGitRepoRoot,
  silenceStdIO,
  writeDefaultConfig,
} from "../cli/run-cli.test-helpers.js";

function baseTaskBackend(overrides: Partial<taskBackend.TaskBackend>): taskBackend.TaskBackend {
  return {
    id: "local",
    listTasks: vi.fn().mockResolvedValue([]),
    getTask: vi.fn().mockResolvedValue(null),
    writeTask: vi.fn().mockImplementation(() => Promise.resolve()),
    ...overrides,
  };
}

async function makeRepo(): Promise<string> {
  const root = await mkGitRepoRoot();
  await writeDefaultConfig(root);
  return root;
}

describe("commands/workflow", () => {
  let restoreStdIO: (() => void) | null = null;

  beforeEach(() => {
    restoreStdIO = silenceStdIO();
  });

  afterEach(() => {
    restoreStdIO?.();
    restoreStdIO = null;
  });

  it("task scrub validates args and supports dry-run output", async () => {
    const root = await makeRepo();
    const tasks: TaskData[] = [
      {
        id: "TASK-1",
        title: "hello",
        description: "foo",
        status: "TODO",
        priority: "med",
        owner: "CODER",
        depends_on: [],
        tags: ["foo"],
        verify: [],
        comments: [{ author: "A", body: "foo" }],
        doc_version: 2,
        doc_updated_at: "2026-02-05T00:00:00Z",
        doc_updated_by: "CODER",
      },
      {
        id: "TASK-2",
        title: "other",
        description: "bar",
        status: "TODO",
        priority: "med",
        owner: "CODER",
        depends_on: [],
        tags: ["bar"],
        verify: [],
        comments: [],
        doc_version: 2,
        doc_updated_at: "2026-02-05T00:00:00Z",
        doc_updated_by: "CODER",
      },
    ];
    const writeTasks = vi.fn();
    const backend = baseTaskBackend({
      listTasks: vi.fn().mockResolvedValue(tasks),
      writeTasks,
      writeTask: vi.fn().mockImplementation(() => Promise.resolve()),
    });
    const spy = vi.spyOn(taskBackend, "loadTaskBackend").mockResolvedValue({
      backendId: "local",
      backend,
      resolved: { gitRoot: root, agentplaneDir: path.join(root, ".agentplane") },
      config: defaultConfig(),
      backendConfigPath: path.join(root, ".agentplane", "backends", "local", "backend.json"),
    });

    const io = captureStdIO();
    try {
      const code = await cmdTaskScrub({
        cwd: root,
        find: "foo",
        replace: "baz",
        dryRun: true,
        quiet: false,
      });
      expect(code).toBe(0);
      expect(io.stdout).toContain("dry-run: would update 1 task(s)");
      expect(io.stdout).toContain("TASK-1");
    } finally {
      io.restore();
      spy.mockRestore();
    }
  });

  it("task scrub writes updates and respects quiet mode", async () => {
    const root = await makeRepo();
    const tasks: TaskData[] = [
      {
        id: "TASK-3",
        title: "foo",
        description: "foo",
        status: "TODO",
        priority: "med",
        owner: "CODER",
        depends_on: [],
        tags: ["foo"],
        verify: [],
        comments: [],
        doc_version: 2,
        doc_updated_at: "2026-02-05T00:00:00Z",
        doc_updated_by: "CODER",
      },
    ];
    const writeTasks = vi.fn();
    const backend = baseTaskBackend({
      listTasks: vi.fn().mockResolvedValue(tasks),
      writeTasks,
      writeTask: vi.fn().mockImplementation(() => Promise.resolve()),
    });
    const spy = vi.spyOn(taskBackend, "loadTaskBackend").mockResolvedValue({
      backendId: "local",
      backend,
      resolved: { gitRoot: root, agentplaneDir: path.join(root, ".agentplane") },
      config: defaultConfig(),
      backendConfigPath: path.join(root, ".agentplane", "backends", "local", "backend.json"),
    });

    const io = captureStdIO();
    try {
      const code = await cmdTaskScrub({
        cwd: root,
        find: "foo",
        replace: "bar",
        dryRun: false,
        quiet: true,
      });
      expect(code).toBe(0);
      expect(writeTasks).toHaveBeenCalledOnce();
      expect(io.stdout).toBe("");
    } finally {
      io.restore();
      spy.mockRestore();
    }
  });

  it("task normalize handles writeTask", async () => {
    const root = await makeRepo();
    const tasks: TaskData[] = [
      {
        id: "TASK-4",
        title: "one",
        description: "one",
        status: "TODO",
        priority: "med",
        owner: "CODER",
        depends_on: [],
        tags: [],
        verify: [],
        comments: [],
        doc_version: 2,
        doc_updated_at: "2026-02-05T00:00:00Z",
        doc_updated_by: "CODER",
      },
    ];
    const writeTask = vi.fn();
    const backend = baseTaskBackend({
      listTasks: vi.fn().mockResolvedValue(tasks),
      writeTask: writeTask.mockImplementation(() => Promise.resolve()),
    });
    const spy = vi.spyOn(taskBackend, "loadTaskBackend").mockResolvedValue({
      backendId: "local",
      backend,
      resolved: { gitRoot: root, agentplaneDir: path.join(root, ".agentplane") },
      config: defaultConfig(),
      backendConfigPath: path.join(root, ".agentplane", "backends", "local", "backend.json"),
    });
    const io = captureStdIO();
    try {
      const code = await cmdTaskNormalize({ cwd: root, quiet: true, force: false });
      expect(code).toBe(0);
      expect(writeTask).toHaveBeenCalledTimes(1);
      expect(io.stdout).toBe("");
    } finally {
      io.restore();
      spy.mockRestore();
    }
  });

  it("task migrate validates flags and JSON payloads", async () => {
    const root = await makeRepo();
    const tasksPath = path.join(root, "tasks.json");
    await writeFile(tasksPath, "{not-json", "utf8");

    await expect(
      cmdTaskMigrate({ cwd: root, source: "tasks.json", quiet: false, force: false }),
    ).rejects.toMatchObject({ code: "E_VALIDATION" });

    const writeTasks = vi.fn();
    const backend = baseTaskBackend({
      listTasks: vi.fn().mockResolvedValue([]),
      writeTasks,
      writeTask: vi.fn().mockImplementation(() => Promise.resolve()),
    });
    const spy = vi.spyOn(taskBackend, "loadTaskBackend").mockResolvedValue({
      backendId: "local",
      backend,
      resolved: { gitRoot: root, agentplaneDir: path.join(root, ".agentplane") },
      config: defaultConfig(),
      backendConfigPath: path.join(root, ".agentplane", "backends", "local", "backend.json"),
    });

    await writeFile(
      tasksPath,
      JSON.stringify({ tasks: [{ id: "TASK-5", title: "ok" }] }, null, 2),
      "utf8",
    );
    const io = captureStdIO();
    try {
      const code = await cmdTaskMigrate({
        cwd: root,
        source: "tasks.json",
        quiet: false,
        force: false,
      });
      expect(code).toBe(0);
      expect(writeTasks).toHaveBeenCalledOnce();
    } finally {
      io.restore();
      spy.mockRestore();
    }
  });

  it("task scaffold handles missing tasks, overwrites, and writes readmes", async () => {
    const root = await makeRepo();
    const taskId = "202602050900-J1K2";
    const resolved = { gitRoot: root, agentplaneDir: path.join(root, ".agentplane") };
    const backend = baseTaskBackend({ getTask: vi.fn().mockResolvedValue(null) });
    const spy = vi.spyOn(taskBackend, "loadTaskBackend").mockResolvedValue({
      backendId: "local",
      backend,
      resolved,
      config: defaultConfig(),
      backendConfigPath: path.join(root, ".agentplane", "backends", "local", "backend.json"),
    });

    await expect(
      cmdTaskScaffold({
        cwd: root,
        taskId,
        overwrite: false,
        force: false,
        quiet: false,
      }),
    ).rejects.toMatchObject({
      code: "E_USAGE",
    });

    const io = captureStdIO();
    try {
      const code = await cmdTaskScaffold({
        cwd: root,
        taskId,
        overwrite: false,
        force: true,
        quiet: false,
      });
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    const readmePath = path.join(root, ".agentplane", "tasks", taskId, "README.md");
    const text = await readFile(readmePath, "utf8");
    expect(text).toContain(`id: "${taskId}"`);

    const fileIo = captureStdIO();
    try {
      await expect(
        cmdTaskScaffold({
          cwd: root,
          taskId,
          overwrite: false,
          force: false,
          quiet: false,
        }),
      ).rejects.toMatchObject({
        code: "E_USAGE",
      });
    } finally {
      fileIo.restore();
      spy.mockRestore();
    }
  });

  it("task scaffold overwrites existing files when requested", async () => {
    const root = await makeRepo();
    const taskId = "202602050900-L3M4";
    const resolved = { gitRoot: root, agentplaneDir: path.join(root, ".agentplane") };
    const backend = baseTaskBackend({
      getTask: vi.fn().mockResolvedValue({
        id: taskId,
        title: "T",
        description: "",
        status: "TODO",
        priority: "med",
        owner: "CODER",
        depends_on: [],
        tags: [],
        verify: [],
        comments: [],
        doc_version: 2,
        doc_updated_at: "2026-02-05T00:00:00Z",
        doc_updated_by: "agentplane",
      } satisfies TaskData),
    });
    const spy = vi.spyOn(taskBackend, "loadTaskBackend").mockResolvedValue({
      backendId: "local",
      backend,
      resolved,
      config: defaultConfig(),
      backendConfigPath: path.join(root, ".agentplane", "backends", "local", "backend.json"),
    });

    const readmePath = path.join(root, ".agentplane", "tasks", taskId, "README.md");
    await mkdir(path.dirname(readmePath), { recursive: true });
    await writeFile(readmePath, "old", "utf8");

    const io = captureStdIO();
    try {
      const code = await cmdTaskScaffold({
        cwd: root,
        taskId,
        overwrite: true,
        force: false,
        quiet: false,
      });
      expect(code).toBe(0);
    } finally {
      io.restore();
      spy.mockRestore();
    }

    const text = await readFile(readmePath, "utf8");
    expect(text).toContain(`id: "${taskId}"`);
  });
});
