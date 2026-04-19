import { beforeEach, describe, expect, it, vi } from "vitest";

import type { TaskBackend, TaskData } from "../../backends/task-backend.js";
import { makeTaskCommandContext } from "../../../../testkit/src/task.js";
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
});
