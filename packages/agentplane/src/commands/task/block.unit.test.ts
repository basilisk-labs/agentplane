import { beforeEach, describe, expect, it, vi } from "vitest";

import { defaultConfig, type ResolvedProject } from "@agentplaneorg/core";

import type { TaskBackend, TaskData, TaskEvent } from "../../backends/task-backend.js";
import type { CommandContext } from "../shared/task-backend.js";
import type { TaskStorePatch } from "../shared/task-store.js";

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
  return {
    id: "T-1",
    title: "Title",
    description: "Desc",
    status: "DOING",
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
  config.tasks.comments.blocked = { prefix: "Blocked:", min_chars: 20 };

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
    const staleTask = mkTask({ status: "TODO", tags: ["meta"] });
    let currentTask = mkTask({ status: "DOING", tags: ["code"] });
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
    expect(store.get).toHaveBeenCalledTimes(1);
    expect(store.patch).toHaveBeenCalledTimes(1);
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
    const staleTask = mkTask({ status: "TODO", tags: ["meta"] });
    let currentTask = mkTask({ status: "DOING", tags: ["code"] });
    const stderrWrite = vi.spyOn(process.stderr, "write").mockImplementation(() => true);
    const store = {
      get: vi.fn().mockResolvedValue(staleTask),
      mutate: vi
        .fn()
        .mockImplementation(async (_taskId: string, builder: (current: TaskData) => unknown) => {
          const { taskStorePatchFromIntents } = await import("../shared/task-store.js");
          await builder(currentTask);
          currentTask = applyStorePatch(
            currentTask,
            taskStorePatchFromIntents(await builder(currentTask)),
          );
          return { changed: true, task: currentTask };
        }),
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
    expect(store.mutate).toHaveBeenCalledTimes(1);
    expect(currentTask.status).toBe("BLOCKED");
    const policyWarnings = stderrWrite.mock.calls
      .map((call) => String(call[0] ?? ""))
      .filter((line) => line.includes("policy=warn"));
    expect(policyWarnings).toHaveLength(1);
    stderrWrite.mockRestore();
  });
});
