import { beforeEach, describe, expect, it, vi } from "vitest";

import type { TaskBackend, TaskData } from "../../backends/task-backend.js";
import { makeTaskCommandContext, makeTaskFixture } from "../task.test-helpers.js";
import type { CommandContext } from "../shared/task-backend.js";

const mocks = vi.hoisted(() => ({
  commitFromComment: vi.fn(),
  loadCommandContext: vi.fn(),
  loadTaskFromContext: vi.fn(),
  backendIsLocalFileBackend: vi.fn(),
  getTaskStore: vi.fn(),
}));

vi.mock("../guard/index.js", () => ({
  commitFromComment: mocks.commitFromComment,
}));
vi.mock("../shared/task-backend.js", () => ({
  loadCommandContext: mocks.loadCommandContext,
  loadTaskFromContext: mocks.loadTaskFromContext,
}));
vi.mock("../shared/task-store.js", async (importOriginal) => {
  const actualUnknown: unknown = await importOriginal();
  const actual =
    actualUnknown && typeof actualUnknown === "object"
      ? (actualUnknown as Record<string, unknown>)
      : {};
  return {
    ...actual,
    backendIsLocalFileBackend: mocks.backendIsLocalFileBackend,
    getTaskStore: mocks.getTaskStore,
  };
});

function mkTask(overrides: Partial<TaskData>): TaskData {
  return makeTaskFixture({ status: "DOING", ...overrides });
}

function mkCtx(overrides?: Partial<CommandContext>): CommandContext {
  const backend: TaskBackend = {
    id: "mock",
    listTasks: () => Promise.resolve([]),
    getTask: () => Promise.resolve(null),
    writeTask: () => Promise.resolve(),
  };
  return makeTaskCommandContext({
    taskBackend: backend,
    overrides,
    configureConfig: (config) => {
      config.status_commit_policy = "off";
      config.tasks.comments.blocked = { prefix: "Blocked:", min_chars: 20 };
    },
  });
}

describe("task block command (unit)", () => {
  beforeEach(() => {
    mocks.commitFromComment.mockReset();
    mocks.loadCommandContext.mockReset();
    mocks.loadTaskFromContext.mockReset();
    mocks.backendIsLocalFileBackend.mockReset();
    mocks.getTaskStore.mockReset();
    mocks.backendIsLocalFileBackend.mockReturnValue(false);
    mocks.commitFromComment.mockResolvedValue({
      hash: "new-hash",
      message: "⛔ T-1 task: blocked",
      staged: ["packages/agentplane"],
    });
  });

  it("cmdBlock derives status-commit metadata from the current local task state", async () => {
    const ctx = mkCtx();
    let currentTask = mkTask({ status: "DOING", tags: ["code"] });
    const store = {
      update: vi
        .fn()
        .mockImplementation(
          async (_taskId: string, builder: (current: TaskData) => Promise<TaskData>) => {
            currentTask = await builder(currentTask);
            return { changed: true, task: currentTask };
          },
        ),
    };
    mocks.backendIsLocalFileBackend.mockReturnValue(true);
    mocks.getTaskStore.mockReturnValue(store);

    const { cmdBlock } = await import("./block.js");
    const rc = await cmdBlock({
      ctx,
      cwd: "/repo",
      taskId: "T-1",
      author: "CODER",
      body: "Blocked: this comment is long enough to satisfy the min_chars rule.",
      commitFromComment: true,
      commitAllow: ["packages/agentplane"],
      commitAutoAllow: false,
      commitAllowTasks: false,
      commitRequireClean: false,
      confirmStatusCommit: false,
      force: false,
      quiet: true,
    });

    expect(rc).toBe(0);
    expect(store.update).toHaveBeenCalledTimes(1);
    expect(currentTask.status).toBe("BLOCKED");
    expect(mocks.commitFromComment).toHaveBeenCalledTimes(1);
    expect(mocks.commitFromComment.mock.calls[0]?.[0]).toMatchObject({
      taskId: "T-1",
      primaryTag: "code",
      statusFrom: "DOING",
      statusTo: "BLOCKED",
    });
  });

  it("emits status_commit_policy=warn only once when local mutate retries the builder", async () => {
    const ctx = mkCtx();
    ctx.config.status_commit_policy = "warn";
    let currentTask = mkTask({ status: "DOING", tags: ["code"] });
    const stderrWrite = vi.spyOn(process.stderr, "write").mockImplementation(() => true);
    const store = {
      update: vi
        .fn()
        .mockImplementation(
          async (_taskId: string, builder: (current: TaskData) => Promise<TaskData>) => {
            await builder(currentTask);
            currentTask = await builder(currentTask);
            return { changed: true, task: currentTask };
          },
        ),
    };
    mocks.backendIsLocalFileBackend.mockReturnValue(true);
    mocks.getTaskStore.mockReturnValue(store);

    const { cmdBlock } = await import("./block.js");
    const rc = await cmdBlock({
      ctx,
      cwd: "/repo",
      taskId: "T-1",
      author: "CODER",
      body: "Blocked: this comment is long enough to satisfy the min_chars rule.",
      commitFromComment: true,
      commitAllow: ["packages/agentplane"],
      commitAutoAllow: false,
      commitAllowTasks: false,
      commitRequireClean: false,
      confirmStatusCommit: false,
      force: false,
      quiet: false,
    });

    expect(rc).toBe(0);
    expect(store.update).toHaveBeenCalledTimes(1);
    expect(currentTask.status).toBe("BLOCKED");
    const policyWarnings = stderrWrite.mock.calls
      .map((call) => String(call[0] ?? ""))
      .filter((line) => line.includes("policy=warn"));
    expect(policyWarnings).toHaveLength(1);
    stderrWrite.mockRestore();
  });
});
