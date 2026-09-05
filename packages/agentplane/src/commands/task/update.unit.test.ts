import { beforeEach, describe, expect, it, vi } from "vitest";

import type { TaskBackend, TaskData } from "../../backends/task-backend.js";
import { makeTaskCommandContext } from "@agentplane/testkit/task";
import {
  createLegacyTaskAggregate,
  taskCentricAggregateFromExtensions,
  withTaskCentricAggregate,
} from "@agentplaneorg/core/tasks";
import type { CommandContext } from "../shared/task-backend.js";

const mockLoadCommandContext =
  vi.fn<(opts: { cwd: string; rootOverride?: string | null }) => Promise<CommandContext>>();

vi.mock("../shared/task-backend.js", () => ({
  loadCommandContext: mockLoadCommandContext,
}));

function mkTask(overrides: Partial<TaskData> = {}): TaskData {
  return {
    id: "T-1",
    title: "Title",
    description: "Desc",
    status: "TODO",
    priority: "med",
    owner: "CODER",
    depends_on: [],
    tags: ["code"],
    verify: [],
    ...overrides,
  };
}

function mkCtx(task: TaskData): CommandContext {
  let currentTask = task;
  const backend: TaskBackend = {
    id: "mock",
    listTasks: () => Promise.resolve([]),
    getTask: () => Promise.resolve(currentTask),
    writeTask: (next) => {
      currentTask = next;
      return Promise.resolve();
    },
  };
  return makeTaskCommandContext({
    taskBackend: backend,
    overrides: {
      taskBackend: backend,
    },
  });
}

describe("task update command (unit)", () => {
  it.each([false, true])("keeps canonical metadata writes atomic (stale=%s)", async (stale) => {
    const aggregate = createLegacyTaskAggregate({
      id: "T-1",
      revision: 3,
      title: "Title",
      description: "Desc",
      status: "TODO",
      acceptance_criteria: [],
      captured_at: "2026-09-01T00:00:00.000Z",
      updated_at: "2026-09-01T00:00:00.000Z",
    });
    const task = mkTask({
      revision: stale ? 4 : 3,
      extensions: withTaskCentricAggregate({}, aggregate),
    });
    const ctx = mkCtx(task);
    const write = vi.spyOn(ctx.taskBackend, "writeTask");
    const { cmdTaskUpdate } = await import("./update.js");
    const run = cmdTaskUpdate({
      ctx,
      cwd: "/repo",
      taskId: "T-1",
      description: "Updated",
      tags: [],
      replaceTags: false,
      dependsOn: [],
      replaceDependsOn: false,
      verify: [],
      replaceVerify: false,
    });
    if (stale) {
      await expect(run).rejects.toThrow(/revision mismatch/u);
      expect(write).not.toHaveBeenCalled();
      return;
    }
    await expect(run).resolves.toBe(0);
    const next = write.mock.calls[0]![0];
    expect(next.revision).toBe(4);
    expect(taskCentricAggregateFromExtensions(next.extensions)?.revision).toBe(4);
    expect(write.mock.calls[0]![1]).toEqual({ expectedRevision: 3 });
    expect(task.revision).toBe(3);
    expect(aggregate.revision).toBe(3);
  });

  beforeEach(() => {
    mockLoadCommandContext.mockReset();
  });

  it("routes warnings and success through the shared command-result emitter", async () => {
    const stderrWrite = vi.spyOn(process.stderr, "write").mockImplementation(() => true);
    const stdoutWrite = vi.spyOn(process.stdout, "write").mockImplementation(() => true);
    const task = mkTask();
    const ctx = mkCtx(task);

    const { cmdTaskUpdate } = await import("./update.js");
    const rc = await cmdTaskUpdate({
      ctx,
      cwd: "/repo",
      taskId: "T-1",
      tags: ["spike"],
      replaceTags: false,
      dependsOn: [],
      replaceDependsOn: false,
      verify: [],
      replaceVerify: false,
    });

    expect(rc).toBe(0);
    expect(stderrWrite.mock.calls.map((call) => String(call[0] ?? "")).join("")).toContain(
      "spike is combined with a primary tag that requires verify steps",
    );
    expect(stdoutWrite.mock.calls.map((call) => String(call[0] ?? "")).join("")).toContain(
      "✅ updated T-1",
    );

    stdoutWrite.mockRestore();
    stderrWrite.mockRestore();
  });

  it("rejects an unsupported verify replacement before writing the task", async () => {
    const task = mkTask({ verify: ["npm test"] });
    const writeTask = vi.fn().mockResolvedValue(undefined);
    const backend: TaskBackend = {
      id: "mock",
      listTasks: () => Promise.resolve([]),
      getTask: () => Promise.resolve(task),
      writeTask,
    };
    const ctx = makeTaskCommandContext({ taskBackend: backend });
    const { cmdTaskUpdate } = await import("./update.js");

    await expect(
      cmdTaskUpdate({
        ctx,
        cwd: "/repo",
        taskId: "T-1",
        tags: [],
        replaceTags: false,
        dependsOn: [],
        replaceDependsOn: false,
        verify: ["bash -c 'npm test'"],
        replaceVerify: true,
      }),
    ).rejects.toMatchObject({ code: "E_USAGE", exitCode: 2 });
    expect(writeTask).not.toHaveBeenCalled();
  });

  it("allows unrelated updates to legacy tasks until verify is explicitly replaced", async () => {
    const task = mkTask({ verify: ["TOKEN=value npm test"] });
    const writeTask = vi.fn().mockResolvedValue(undefined);
    const backend: TaskBackend = {
      id: "mock",
      listTasks: () => Promise.resolve([]),
      getTask: () => Promise.resolve(task),
      writeTask,
    };
    const ctx = makeTaskCommandContext({ taskBackend: backend });
    const { cmdTaskUpdate } = await import("./update.js");

    await expect(
      cmdTaskUpdate({
        ctx,
        cwd: "/repo",
        taskId: "T-1",
        description: "Metadata-only repair",
        tags: [],
        replaceTags: false,
        dependsOn: [],
        replaceDependsOn: false,
        verify: [],
        replaceVerify: false,
      }),
    ).resolves.toBe(0);
    expect(writeTask).toHaveBeenCalledOnce();
  });
});
