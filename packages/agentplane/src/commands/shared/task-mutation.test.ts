import { afterEach, describe, expect, it, vi } from "vitest";
import {
  createLegacyTaskAggregate,
  taskCentricAggregateFromExtensions,
  withTaskCentricAggregate,
} from "@agentplaneorg/core/tasks";

import type { TaskBackend, TaskData } from "../../backends/task-backend.js";
import {
  makeTaskBackendDouble,
  makeTaskCommandContext,
  makeTaskFixture,
} from "@agentplane/testkit/task";
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

describe("writeTaskMutation", () => {
  afterEach(() => {
    vi.resetModules();
    vi.restoreAllMocks();
  });

  it("reads the exact persisted receipt from a legacy backend without listing tasks", async () => {
    const requested = mkTask({ id: "T-1", revision: 7 });
    const persisted = { ...requested, revision: 8 };
    const writeTask = vi.fn(() => Promise.resolve());
    const getTask = vi.fn(() => Promise.resolve(persisted));
    const listTasks = vi.fn(() => Promise.resolve([persisted]));
    const ctx = mkCtx(mkBackend({ writeTask, getTask, listTasks }));
    const { writeTaskMutation } = await import("./task-mutation.js");

    const receipt = await writeTaskMutation({ ctx, task: requested });

    expect(writeTask).toHaveBeenCalledWith(requested, undefined);
    expect(getTask).toHaveBeenCalledWith("T-1");
    expect(listTasks).not.toHaveBeenCalled();
    expect(receipt).toMatchObject({
      task_id: "T-1",
      revision: 8,
      backend_id: ctx.taskBackend.id,
    });
  });

  it("rejects a legacy write that cannot return an exact persisted task", async () => {
    const requested = mkTask({ id: "T-1", revision: 7 });
    const writeTask = vi.fn(() => Promise.resolve());
    const getTask = vi.fn(() => Promise.resolve(null));
    const ctx = mkCtx(mkBackend({ writeTask, getTask }));
    const { writeTaskMutation } = await import("./task-mutation.js");

    await expect(writeTaskMutation({ ctx, task: requested })).rejects.toThrow(
      /did not return T-1 after a legacy writeTask\(\) mutation/u,
    );
  });
});

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

  it("persists a compatibility mutation and its task-centric receipt in one revision", async () => {
    const aggregate = createLegacyTaskAggregate({
      id: "T-1",
      revision: 4,
      title: "Task",
      description: "Atomic compatibility projection",
      status: "DOING",
      acceptance_criteria: ["done"],
      captured_at: "2026-03-31T00:00:00.000Z",
      updated_at: "2026-03-31T00:00:00.000Z",
    });
    let currentTask = mkTask({
      id: "T-1",
      revision: 4,
      status: "DOING",
      extensions: withTaskCentricAggregate({}, aggregate),
    });
    const store = {
      update: vi.fn((_taskId: string, updater: (task: TaskData) => Promise<TaskData> | TaskData) =>
        Promise.resolve(updater(cloneTask(currentTask))).then((nextTask) => {
          const changed = JSON.stringify(currentTask) !== JSON.stringify(nextTask);
          currentTask = cloneTask(nextTask);
          return { changed, task: cloneTask(currentTask) };
        }),
      ),
    };
    const ctx = mkCtx(mkBackend());
    vi.doMock("./task-store.js", async () => ({
      ...(await vi.importActual("./task-store.js")),
      getTaskStore: () => store,
    }));
    vi.doMock("./task-backend.js", async () => ({
      ...(await vi.importActual("./task-backend.js")),
      backendUsesLocalTaskStore: () => true,
    }));

    const { applyTaskMutation } = await import("./task-mutation.js");
    const first = await applyTaskMutation({
      ctx,
      taskId: "T-1",
      build: (current) => ({ nextTask: { ...current, owner: "INTEGRATOR" } }),
    });
    const projected = taskCentricAggregateFromExtensions(first.task.extensions)!;
    const firstRuntime = first.task.extensions?.["agentplane.task_centric_runtime"] as {
      mutation_receipts: Record<string, unknown>;
    };
    const receiptIds = Object.keys(firstRuntime.mutation_receipts);

    expect(first.task).toMatchObject({ revision: 5, status: "DOING", owner: "INTEGRATOR" });
    expect(projected).toMatchObject({ revision: 5, lifecycle: "ACTIVE", event_cursor: 1 });
    expect(receiptIds).toHaveLength(1);

    const replay = await applyTaskMutation({
      ctx,
      taskId: "T-1",
      build: (current) => ({ nextTask: cloneTask(current) }),
    });
    expect(replay.changed).toBe(false);
    const replayRuntime = replay.task.extensions?.["agentplane.task_centric_runtime"] as {
      mutation_receipts: Record<string, unknown>;
    };
    expect(Object.keys(replayRuntime.mutation_receipts)).toEqual(receiptIds);
  });

  it("atomically reopens a completed task-centric projection for verification rework", async () => {
    const aggregate = createLegacyTaskAggregate({
      id: "T-1",
      revision: 4,
      title: "Task",
      description: "Verification rework",
      status: "DONE",
      acceptance_criteria: ["done"],
      captured_at: "2026-03-31T00:00:00.000Z",
      updated_at: "2026-03-31T00:00:00.000Z",
    });
    let currentTask = mkTask({
      id: "T-1",
      revision: 4,
      status: "DONE",
      verification: { state: "ok", attempts: 1 },
      extensions: withTaskCentricAggregate({}, aggregate),
    });
    const store = {
      update: vi.fn((_taskId: string, updater: (task: TaskData) => Promise<TaskData> | TaskData) =>
        Promise.resolve(updater(cloneTask(currentTask))).then((nextTask) => {
          const changed = JSON.stringify(currentTask) !== JSON.stringify(nextTask);
          currentTask = cloneTask(nextTask);
          return { changed, task: cloneTask(currentTask) };
        }),
      ),
    };
    const ctx = mkCtx(mkBackend());
    vi.doMock("./task-store.js", async () => ({
      ...(await vi.importActual("./task-store.js")),
      getTaskStore: () => store,
    }));
    vi.doMock("./task-backend.js", async () => ({
      ...(await vi.importActual("./task-backend.js")),
      backendUsesLocalTaskStore: () => true,
    }));

    const { applyTaskMutation } = await import("./task-mutation.js");
    const first = await applyTaskMutation({
      ctx,
      taskId: "T-1",
      build: (current) => ({
        nextTask: {
          ...current,
          status: "DOING",
          verification: { ...current.verification!, state: "needs_rework" },
        },
      }),
    });
    const projected = taskCentricAggregateFromExtensions(first.task.extensions)!;
    const runtime = first.task.extensions?.["agentplane.task_centric_runtime"] as {
      mutation_receipts: Record<string, { next_revision: number }>;
    };

    expect(first.task).toMatchObject({
      revision: 5,
      status: "DOING",
      verification: { state: "needs_rework" },
    });
    expect(projected).toMatchObject({ revision: 5, lifecycle: "ACTIVE", final_validation: null });
    expect(Object.values(runtime.mutation_receipts)).toEqual([
      expect.objectContaining({ next_revision: 5 }),
    ]);

    const replay = await applyTaskMutation({
      ctx,
      taskId: "T-1",
      build: (current) => ({ nextTask: cloneTask(current) }),
    });
    expect(replay.changed).toBe(false);
    expect(replay.task.revision).toBe(5);
    expect(
      Object.keys(
        (
          replay.task.extensions?.["agentplane.task_centric_runtime"] as {
            mutation_receipts: Record<string, unknown>;
          }
        ).mutation_receipts,
      ),
    ).toHaveLength(1);
  });

  it("exposes no partial rework projection when persistence fails", async () => {
    const aggregate = createLegacyTaskAggregate({
      id: "T-1",
      revision: 4,
      title: "Task",
      description: "Failed verification rework",
      status: "DONE",
      acceptance_criteria: ["done"],
      captured_at: "2026-03-31T00:00:00.000Z",
      updated_at: "2026-03-31T00:00:00.000Z",
    });
    const currentTask = mkTask({
      id: "T-1",
      revision: 4,
      status: "DONE",
      verification: { state: "ok", attempts: 1 },
      extensions: withTaskCentricAggregate({}, aggregate),
    });
    const store = {
      update: vi.fn(async (_taskId: string, updater: (task: TaskData) => Promise<TaskData>) => {
        await updater(cloneTask(currentTask));
        throw new Error("injected persistence failure");
      }),
    };
    const ctx = mkCtx(mkBackend());
    vi.doMock("./task-store.js", async () => ({
      ...(await vi.importActual("./task-store.js")),
      getTaskStore: () => store,
    }));
    vi.doMock("./task-backend.js", async () => ({
      ...(await vi.importActual("./task-backend.js")),
      backendUsesLocalTaskStore: () => true,
    }));

    const { applyTaskMutation } = await import("./task-mutation.js");
    await expect(
      applyTaskMutation({
        ctx,
        taskId: "T-1",
        build: (current) => ({
          nextTask: {
            ...current,
            status: "DOING",
            verification: { ...current.verification!, state: "needs_rework" },
          },
        }),
      }),
    ).rejects.toThrow("injected persistence failure");

    expect(currentTask).toMatchObject({
      revision: 4,
      status: "DONE",
      verification: { state: "ok" },
    });
    expect(taskCentricAggregateFromExtensions(currentTask.extensions)).toMatchObject({
      revision: 4,
      lifecycle: "COMPLETED",
    });
    expect(currentTask.extensions).not.toHaveProperty("agentplane.task_centric_runtime");
  });

  it("applies intents and writes through the backend when the backend is not local", async () => {
    const currentTask = mkTask();
    let persistedTask = cloneTask(currentTask);
    const writeTask = vi.fn((task: TaskData) => {
      persistedTask = cloneTask(task);
      return Promise.resolve();
    });
    const getTask = vi.fn(() => Promise.resolve(cloneTask(persistedTask)));
    const ctx = mkCtx(mkBackend({ writeTask, getTask }));
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
