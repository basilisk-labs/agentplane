import { beforeEach, describe, expect, it, vi } from "vitest";

import { defaultConfig, type ResolvedProject } from "@agentplaneorg/core";

import type { TaskBackend, TaskData, TaskEvent } from "../../backends/task-backend.js";
import { CliError } from "../../shared/errors.js";
import type { CommandContext } from "../shared/task-backend.js";
import type { TaskStorePatch } from "../shared/task-store.js";

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
  loadCommandContext: mocks.loadCommandContext,
  loadTaskFromContext: mocks.loadTaskFromContext,
  resolveDocUpdatedBy: (task: TaskData, author?: string) =>
    author ?? task.doc_updated_by ?? task.owner,
}));
vi.mock("../shared/task-store.js", () => ({
  backendIsLocalFileBackend: mocks.backendIsLocalFileBackend,
  getTaskStore: mocks.getTaskStore,
}));
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
  return {
    id: "T-1",
    title: "Title",
    description: "Desc",
    status: "TODO",
    priority: "normal",
    owner: "CODER",
    depends_on: [],
    tags: [],
    verify: [],
    comments: [],
    events: [],
    ...overrides,
  };
}

function mkCtx(overrides?: Partial<CommandContext>): CommandContext {
  const config = defaultConfig();
  config.paths.workflow_dir = ".agentplane/tasks";
  config.status_commit_policy = "off";

  const resolved = {
    gitRoot: "/repo",
    agentplaneDir: "/repo/.agentplane",
  } as unknown as ResolvedProject;

  const backend: TaskBackend = {
    id: "mock",
    listTasks: () => Promise.resolve([]),
    getTask: () => Promise.resolve(null),
    writeTask: () => Promise.resolve(),
  };

  const ctx: CommandContext = {
    resolvedProject: resolved,
    config,
    taskBackend: backend,
    backendId: "mock",
    backendConfigPath: "/repo/.agentplane/backends/local/backend.json",
    git: { gitRoot: "/repo" } as never,
    memo: {},
    resolved,
    backend,
  };
  return { ...ctx, ...overrides };
}

function normalizeComments(task: TaskData): NonNullable<TaskData["comments"]> {
  return Array.isArray(task.comments)
    ? task.comments.filter(
        (item): item is NonNullable<TaskData["comments"]>[number] =>
          !!item && typeof item.author === "string" && typeof item.body === "string",
      )
    : [];
}

function normalizeEvents(task: TaskData): TaskEvent[] {
  return Array.isArray(task.events)
    ? task.events.filter(
        (item): item is TaskEvent =>
          !!item &&
          typeof item.type === "string" &&
          typeof item.at === "string" &&
          typeof item.author === "string",
      )
    : [];
}

function applyStorePatch(current: TaskData, patch: TaskStorePatch | null | undefined): TaskData {
  if (!patch) return current;
  const next: TaskData = patch.task ? { ...current, ...patch.task } : { ...current };
  if (patch.appendComments && patch.appendComments.length > 0) {
    next.comments = [...normalizeComments(current), ...patch.appendComments];
  }
  if (patch.appendEvents && patch.appendEvents.length > 0) {
    next.events = [...normalizeEvents(current), ...patch.appendEvents];
  }
  if (patch.docMeta?.touch === true) {
    next.doc_updated_at = new Date().toISOString();
    next.doc_updated_by = patch.docMeta.updatedBy ?? next.doc_updated_by;
    next.doc_version = patch.docMeta.version ?? next.doc_version;
  }
  return next;
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
    const staleTask = mkTask({ depends_on: ["DEP-1"] });
    let currentTask = mkTask({ depends_on: [] });
    const store = {
      get: vi.fn().mockResolvedValue(staleTask),
      patch: vi
        .fn()
        .mockImplementation(
          async (_taskId: string, builder: (current: TaskData) => Promise<TaskStorePatch>) => {
            currentTask = applyStorePatch(currentTask, await builder(currentTask));
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
      quiet: true,
    });

    expect(rc).toBe(0);
    expect(store.get).toHaveBeenCalledTimes(1);
    expect(store.patch).toHaveBeenCalledTimes(1);
    expect(currentTask.status).toBe("DOING");
  });

  it("cmdTaskSetStatus derives comment-commit metadata from the current local task state", async () => {
    const ctx = mkCtx();
    const staleTask = mkTask({ status: "TODO", tags: ["meta"] });
    let currentTask = mkTask({ status: "BLOCKED", tags: ["code"] });
    const store = {
      get: vi.fn().mockResolvedValue(staleTask),
      patch: vi
        .fn()
        .mockImplementation(
          async (_taskId: string, builder: (current: TaskData) => Promise<TaskStorePatch>) => {
            currentTask = applyStorePatch(currentTask, await builder(currentTask));
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

  it("still fails when the current local task state is not ready", async () => {
    const ctx = mkCtx();
    let currentTask = mkTask({ depends_on: ["DEP-1"] });
    const store = {
      get: vi.fn().mockResolvedValue(currentTask),
      patch: vi
        .fn()
        .mockImplementation(
          async (_taskId: string, builder: (current: TaskData) => Promise<TaskStorePatch>) => {
            await builder(currentTask);
            throw new CliError({ exitCode: 2, code: "E_USAGE", message: "unreachable" });
          },
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
        quiet: true,
      }),
    ).rejects.toMatchObject({
      code: "E_USAGE",
      message: "Task is not ready: T-1 (use --force to override)",
    });
  });
});
