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
  resolveTaskDependencyState: vi.fn(),
  nowIso: vi.fn(),
  readCommitInfo: vi.fn(),
}));

vi.mock("../guard/index.js", () => ({
  commitFromComment: mocks.commitFromComment,
}));
vi.mock("../shared/task-backend.js", () => ({
  backendUsesLocalTaskStore: mocks.backendIsLocalFileBackend,
  loadCommandContext: mocks.loadCommandContext,
  loadTaskFromContext: mocks.loadTaskFromContext,
  resolveDocUpdatedBy: (task: TaskData, author?: string) =>
    author ?? task.doc_updated_by ?? task.owner,
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
vi.mock("./shared.js", async (importOriginal) => {
  const actualUnknown: unknown = await importOriginal();
  const actual =
    actualUnknown && typeof actualUnknown === "object"
      ? (actualUnknown as Record<string, unknown>)
      : {};
  return {
    ...actual,
    resolveTaskDependencyState: mocks.resolveTaskDependencyState,
    nowIso: mocks.nowIso,
    readCommitInfo: mocks.readCommitInfo,
  };
});

function mkTask(overrides: Partial<TaskData>): TaskData {
  return makeTaskFixture(overrides);
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
    },
  });
}

describe("task set-status command (unit)", () => {
  beforeEach(() => {
    mocks.commitFromComment.mockReset();
    mocks.loadCommandContext.mockReset();
    mocks.loadTaskFromContext.mockReset();
    mocks.backendIsLocalFileBackend.mockReset();
    mocks.getTaskStore.mockReset();
    mocks.resolveTaskDependencyState.mockReset();
    mocks.nowIso.mockReset();
    mocks.readCommitInfo.mockReset();

    mocks.backendIsLocalFileBackend.mockReturnValue(false);
    mocks.resolveTaskDependencyState.mockImplementation((task: TaskData) =>
      Promise.resolve({
        missing: Array.isArray(task.depends_on) && task.depends_on.length > 0 ? ["DEP-1"] : [],
        incomplete: [],
      }),
    );
    mocks.nowIso.mockReturnValue("2026-03-13T00:00:00.000Z");
    mocks.readCommitInfo.mockResolvedValue({ hash: "abc", message: "commit" });
    mocks.commitFromComment.mockResolvedValue({
      hash: "new-hash",
      message: "🚧 T-1 task: doing",
      staged: ["packages/agentplane"],
    });
  });

  it("cmdTaskSetStatus evaluates dependency readiness from the current local task state", async () => {
    const ctx = mkCtx();
    let currentTask = mkTask({ depends_on: [] });
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

    const { cmdTaskSetStatus } = await import("./set-status.js");
    const rc = await cmdTaskSetStatus({
      ctx,
      cwd: "/repo",
      taskId: "T-1",
      status: "DOING",
      force: false,
      yes: false,
      commitFromComment: false,
      commitAllow: [],
      commitAutoAllow: false,
      commitAllowTasks: false,
      commitRequireClean: false,
      confirmStatusCommit: false,
      quiet: false,
    });

    expect(rc).toBe(0);
    expect(store.update).toHaveBeenCalledTimes(1);
    expect(currentTask.status).toBe("DOING");
  });

  it("cmdTaskSetStatus derives comment-commit metadata from the current local task state", async () => {
    const ctx = mkCtx();
    let currentTask = mkTask({ status: "BLOCKED", tags: ["code"] });
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

    const { cmdTaskSetStatus } = await import("./set-status.js");
    const rc = await cmdTaskSetStatus({
      ctx,
      cwd: "/repo",
      taskId: "T-1",
      status: "DOING",
      author: "CODER",
      body: "Start: this comment is long enough to satisfy the min_chars requirement.",
      force: false,
      yes: false,
      commitFromComment: true,
      commitAllow: ["packages/agentplane"],
      commitAutoAllow: false,
      commitAllowTasks: false,
      commitRequireClean: false,
      confirmStatusCommit: false,
      quiet: true,
    });

    expect(rc).toBe(0);
    expect(currentTask.status).toBe("DOING");
    expect(mocks.commitFromComment).toHaveBeenCalledTimes(1);
    expect(mocks.commitFromComment.mock.calls[0]?.[0]).toMatchObject({
      taskId: "T-1",
      primaryTag: "code",
      statusFrom: "BLOCKED",
      statusTo: "DOING",
    });
  });

  it("emits status_commit_policy=warn only once when local mutate retries the builder", async () => {
    const ctx = mkCtx();
    ctx.config.status_commit_policy = "warn";
    let currentTask = mkTask({ status: "BLOCKED", tags: ["code"] });
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

    const { cmdTaskSetStatus } = await import("./set-status.js");
    const rc = await cmdTaskSetStatus({
      ctx,
      cwd: "/repo",
      taskId: "T-1",
      status: "DOING",
      author: "CODER",
      body: "Start: this comment is long enough to satisfy the min_chars requirement.",
      force: false,
      yes: false,
      commitFromComment: true,
      commitAllow: ["packages/agentplane"],
      commitAutoAllow: false,
      commitAllowTasks: false,
      commitRequireClean: false,
      confirmStatusCommit: false,
      quiet: false,
    });

    expect(rc).toBe(0);
    expect(store.update).toHaveBeenCalledTimes(1);
    const policyWarnings = stderrWrite.mock.calls
      .map((call) => String(call[0] ?? ""))
      .filter((line) => line.includes("policy=warn"));
    expect(policyWarnings).toHaveLength(1);
    stderrWrite.mockRestore();
  });

  it("still fails when the current local task state is not ready", async () => {
    const ctx = mkCtx();
    let currentTask = mkTask({ depends_on: ["DEP-1"] });
    const stderrWrite = vi.spyOn(process.stderr, "write").mockImplementation(() => true);
    const store = {
      update: vi
        .fn()
        .mockImplementation(
          async (_taskId: string, builder: (current: TaskData) => Promise<TaskData>) =>
            await builder(currentTask),
        ),
    };
    mocks.backendIsLocalFileBackend.mockReturnValue(true);
    mocks.getTaskStore.mockReturnValue(store);

    const { cmdTaskSetStatus } = await import("./set-status.js");
    await expect(
      cmdTaskSetStatus({
        ctx,
        cwd: "/repo",
        taskId: "T-1",
        status: "DOING",
        force: false,
        yes: false,
        commitFromComment: false,
        commitAllow: [],
        commitAutoAllow: false,
        commitAllowTasks: false,
        commitRequireClean: false,
        confirmStatusCommit: false,
        quiet: false,
      }),
    ).rejects.toMatchObject({
      code: "E_USAGE",
      message: "Task is not ready: T-1 (use --force to override)",
    });
    expect(store.update).toHaveBeenCalledTimes(1);
    const warnings = stderrWrite.mock.calls
      .map((call) => String(call[0] ?? ""))
      .filter((line) => line.includes("missing deps: DEP-1"));
    expect(warnings).toHaveLength(1);
    stderrWrite.mockRestore();
  });
});
