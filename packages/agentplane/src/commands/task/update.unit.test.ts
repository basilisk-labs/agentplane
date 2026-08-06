import { beforeEach, describe, expect, it, vi } from "vitest";

import type { TaskBackend, TaskData } from "../../backends/task-backend.js";
import { makeTaskCommandContext } from "@agentplane/testkit/task";
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

function mkCtx(task: TaskData, onWrite?: (task: TaskData) => void): CommandContext {
  let currentTask = task;
  const backend: TaskBackend = {
    id: "mock",
    listTasks: () => Promise.resolve([]),
    getTask: () => Promise.resolve(currentTask),
    writeTask: (next) => {
      currentTask = next;
      onWrite?.(next);
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

  it("requires an explicit primary-change acknowledgement for structured reclassification", async () => {
    let written: TaskData | null = null;
    const task = mkTask({
      task_kind: "docs",
      mutation_scope: "docs",
      blueprint_request: "docs.change",
      tags: ["docs"],
    });
    const ctx = mkCtx(task, (next) => {
      written = next;
    });
    const { cmdTaskUpdate } = await import("./update.js");
    const base = {
      ctx,
      cwd: "/repo",
      taskId: "T-1",
      tags: ["code"],
      replaceTags: true,
      dependsOn: [],
      replaceDependsOn: false,
      verify: [],
      replaceVerify: false,
      taskKind: "code" as const,
      mutationScope: "code" as const,
      blueprintRequest: "code.branch_pr" as const,
    };

    await expect(cmdTaskUpdate(base)).rejects.toThrow(
      "Structured task reclassification requires --allow-primary-change",
    );

    const stdoutWrite = vi.spyOn(process.stdout, "write").mockImplementation(() => true);
    await expect(cmdTaskUpdate({ ...base, allowPrimaryChange: true })).resolves.toBe(0);
    expect(written).toMatchObject({
      task_kind: "code",
      mutation_scope: "code",
      blueprint_request: "code.branch_pr",
      tags: ["code"],
    });
    stdoutWrite.mockRestore();
  });
});
