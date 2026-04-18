import { afterEach, describe, expect, it, vi } from "vitest";

import type { TaskBackend, TaskData } from "../../backends/task-backend.js";
import {
  makeTaskBackendDouble,
  makeTaskCommandContext,
  makeTaskFixture,
} from "../task.test-helpers.js";
import type { CommandContext } from "./task-backend.js";

function cloneTask(task: TaskData): TaskData {
  return structuredClone(task);
}

function mkTask(overrides: Partial<TaskData> = {}): TaskData {
  return makeTaskFixture(overrides);
}

function mkBackend(overrides: Partial<TaskBackend> = {}): TaskBackend {
  return makeTaskBackendDouble({
    capabilities: {
      canonical_source: "local",
      projection: "canonical",
      projection_read_mode: "fallback",
      reads_from_projection_by_default: false,
      supports_task_revisions: true,
      supports_revision_guarded_writes: true,
      may_access_network_on_read: false,
      may_access_network_on_write: false,
      supports_projection_refresh: false,
      supports_push_sync: false,
      supports_snapshot_export: false,
    },
    ...overrides,
  });
}

function mkCtx(taskBackend: TaskBackend): CommandContext {
  return makeTaskCommandContext({
    taskBackend,
    overrides: {
      config: {
        paths: { workflow_dir: ".agentplane/tasks" },
      } as never,
    },
  });
}

describe("applyTaskMutation", () => {
  afterEach(() => {
    vi.resetModules();
    vi.restoreAllMocks();
  });

  it("uses store intents on the local backend path", async () => {
    let currentTask = mkTask();
    const store = {
      update: vi.fn(async (_taskId: string, updater: (task: TaskData) => Promise<TaskData>) => {
        currentTask = cloneTask(await updater(cloneTask(currentTask)));
        return { changed: true, task: cloneTask(currentTask) };
      }),
    };
    const loadTaskFromContext = vi.fn();
    const writeTask = vi.fn();
    const ctx = mkCtx(mkBackend({ writeTask }));

    vi.doMock("./task-backend.js", async () => {
      const actual = await vi.importActual("./task-backend.js");
      return {
        ...actual,
        backendUsesLocalTaskStore: () => true,
        loadTaskFromContext,
      };
    });
    vi.doMock("./task-store.js", async () => {
      const actual = await vi.importActual("./task-store.js");
      return {
        ...actual,
        backendIsLocalFileBackend: () => true,
        getTaskStore: () => store,
      };
    });

    const { applyTaskMutation } = await import("./task-mutation.js");
    const { setTaskFieldsIntent } = await import("./task-store.js");
    const result = await applyTaskMutation({
      ctx,
      taskId: "T-1",
      build: () => ({ intents: setTaskFieldsIntent({ status: "DONE" }) }),
      writeOptions: { expectedRevision: 7 },
    });

    expect(result.mode).toBe("local-store");
    expect(result.changed).toBe(true);
    expect(result.task.status).toBe("DONE");
    expect(store.update).toHaveBeenCalledTimes(1);
    expect(loadTaskFromContext).not.toHaveBeenCalled();
    expect(writeTask).not.toHaveBeenCalled();
  });

  it("uses store updates on the local backend path when the builder returns a next task", async () => {
    let currentTask = mkTask();
    const store = {
      update: vi.fn((_taskId: string, updater: (task: TaskData) => Promise<TaskData> | TaskData) =>
        Promise.resolve(updater(cloneTask(currentTask))).then((nextTask) => {
          currentTask = cloneTask(nextTask);
          return { changed: true, task: cloneTask(currentTask) };
        }),
      ),
    };
    const ctx = mkCtx(mkBackend());

    vi.doMock("./task-store.js", async () => {
      const actual = await vi.importActual("./task-store.js");
      return {
        ...actual,
        backendIsLocalFileBackend: () => true,
        getTaskStore: () => store,
      };
    });
    vi.doMock("./task-backend.js", async () => {
      const actual = await vi.importActual("./task-backend.js");
      return {
        ...actual,
        backendUsesLocalTaskStore: () => true,
      };
    });

    const { applyTaskMutation } = await import("./task-mutation.js");
    const result = await applyTaskMutation({
      ctx,
      taskId: "T-1",
      build: (current) => ({ nextTask: { ...current, status: "DOING" } }),
    });

    expect(result.mode).toBe("local-store");
    expect(result.changed).toBe(true);
    expect(result.task.status).toBe("DOING");
    expect(store.update).toHaveBeenCalledTimes(1);
  });

  it("applies intents and writes through the backend when the backend is not local", async () => {
    const currentTask = mkTask();
    const writeTask = vi.fn(() => Promise.resolve());
    const ctx = mkCtx(mkBackend({ writeTask }));
    const loadTaskFromContext = vi.fn(() => Promise.resolve(cloneTask(currentTask)));

    vi.doMock("./task-backend.js", async () => {
      const actual = await vi.importActual("./task-backend.js");
      return {
        ...actual,
        backendUsesLocalTaskStore: () => false,
        loadTaskFromContext,
      };
    });
    vi.doMock("./task-store.js", async () => {
      const actual = await vi.importActual("./task-store.js");
      return {
        ...actual,
        backendIsLocalFileBackend: () => false,
      };
    });

    const { applyTaskMutation } = await import("./task-mutation.js");
    const { appendTaskCommentIntent, appendTaskEventIntent, touchTaskDocMetaIntent } =
      await import("./task-store.js");
    const result = await applyTaskMutation({
      ctx,
      taskId: "T-1",
      build: () => ({
        intents: [
          appendTaskCommentIntent({ author: "CODER", body: "Comment" }),
          appendTaskEventIntent({
            type: "comment",
            at: "2026-03-31T00:00:00.000Z",
            author: "CODER",
            body: "Comment",
          }),
          touchTaskDocMetaIntent({ updatedBy: "CODER", version: 3 }),
        ],
      }),
      writeOptions: { expectedRevision: 11 },
    });

    expect(result.mode).toBe("backend");
    expect(result.changed).toBe(true);
    expect(loadTaskFromContext).toHaveBeenCalledTimes(1);
    expect(writeTask).toHaveBeenCalledTimes(1);
    expect(writeTask).toHaveBeenCalledWith(
      expect.objectContaining({
        comments: [{ author: "CODER", body: "Comment" }],
        events: [
          expect.objectContaining({
            type: "comment",
            author: "CODER",
            body: "Comment",
          }),
        ],
        doc_version: 3,
        doc_updated_by: "CODER",
      }),
      { expectedRevision: 11 },
    );
  });

  it("skips backend writes when the mutation plan produces no changes", async () => {
    const currentTask = mkTask();
    const writeTask = vi.fn(() => Promise.resolve());
    const ctx = mkCtx(mkBackend({ writeTask }));
    const loadTaskFromContext = vi.fn(() => Promise.resolve(cloneTask(currentTask)));

    vi.doMock("./task-backend.js", async () => {
      const actual = await vi.importActual("./task-backend.js");
      return {
        ...actual,
        backendUsesLocalTaskStore: () => false,
        loadTaskFromContext,
      };
    });
    vi.doMock("./task-store.js", async () => {
      const actual = await vi.importActual("./task-store.js");
      return {
        ...actual,
        backendIsLocalFileBackend: () => false,
      };
    });

    const { applyTaskMutation } = await import("./task-mutation.js");
    const result = await applyTaskMutation({
      ctx,
      taskId: "T-1",
      build: (current) => ({ nextTask: cloneTask(current) }),
    });

    expect(result.mode).toBe("backend");
    expect(result.changed).toBe(false);
    expect(writeTask).not.toHaveBeenCalled();
  });
});

describe("applyTaskCollectionMutation", () => {
  afterEach(() => {
    vi.resetModules();
    vi.restoreAllMocks();
  });

  it("loads current tasks and writes the returned bulk task set", async () => {
    const currentTasks = [mkTask({ id: "T-1" }), mkTask({ id: "T-2" })];
    const listTasks = vi.fn(() => Promise.resolve(currentTasks.map((task) => cloneTask(task))));
    const writeTasks = vi.fn(() => Promise.resolve());
    const ctx = mkCtx(mkBackend({ listTasks, writeTasks }));

    const { applyTaskCollectionMutation } = await import("./task-mutation.js");
    const result = await applyTaskCollectionMutation({
      ctx,
      build: (tasks) => {
        const [firstTask, secondTask] = tasks;
        if (!firstTask || !secondTask) throw new Error("expected two tasks");
        return {
          result: tasks.map((task) => task.id).join(","),
          tasksToWrite: [firstTask, { ...secondTask, status: "DONE" }],
        };
      },
    });

    expect(result.result).toBe("T-1,T-2");
    expect(result.tasksToWrite).toHaveLength(2);
    expect(listTasks).toHaveBeenCalledTimes(1);
    expect(writeTasks).toHaveBeenCalledTimes(1);
    expect(writeTasks).toHaveBeenCalledWith(result.tasksToWrite);
  });

  it("skips bulk writes when the builder returns no tasks to write", async () => {
    const listTasks = vi.fn(() => Promise.resolve([mkTask({ id: "T-1" })]));
    const writeTask = vi.fn(() => Promise.resolve());
    const writeTasks = vi.fn(() => Promise.resolve());
    const ctx = mkCtx(mkBackend({ listTasks, writeTask, writeTasks }));

    const { applyTaskCollectionMutation } = await import("./task-mutation.js");
    const result = await applyTaskCollectionMutation({
      ctx,
      build: () => ({
        result: "noop",
      }),
    });

    expect(result.result).toBe("noop");
    expect(result.tasksToWrite).toEqual([]);
    expect(writeTasks).not.toHaveBeenCalled();
    expect(writeTask).not.toHaveBeenCalled();
  });
});
