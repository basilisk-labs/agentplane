import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { defaultConfig, type ResolvedProject } from "@agentplaneorg/core";

import type { TaskBackend, TaskData, TaskEvent } from "../../backends/task-backend.js";
import type { CommandContext } from "../shared/task-backend.js";
import type { TaskStoreIntent } from "../shared/task-store.js";

const mockLoadTaskFromContext =
  vi.fn<(opts: { ctx: CommandContext; taskId: string }) => Promise<TaskData>>();
const mockLoadCommandContext =
  vi.fn<(opts: { cwd: string; rootOverride?: string | null }) => Promise<CommandContext>>();
const mockBackendIsLocalFileBackend = vi.fn<(ctx: CommandContext) => boolean>();
const mockGetTaskStore = vi.fn();

vi.mock("../shared/task-backend.js", () => ({
  loadCommandContext: mockLoadCommandContext,
  loadTaskFromContext: mockLoadTaskFromContext,
}));
vi.mock("../shared/task-store.js", () => ({
  appendTaskCommentIntent: (comment: { author: string; body: string }) => ({
    kind: "append-comments",
    comments: [comment],
  }),
  appendTaskEventIntent: (event: TaskEvent) => ({
    kind: "append-events",
    events: [event],
  }),
  backendIsLocalFileBackend: mockBackendIsLocalFileBackend,
  getTaskStore: mockGetTaskStore,
  touchTaskDocMetaIntent: (opts: { updatedBy?: string; version?: 2 | 3 }) => ({
    kind: "touch-doc-meta",
    ...opts,
  }),
}));

function mkCtx(overrides?: Partial<CommandContext>): CommandContext {
  const config = defaultConfig();
  config.paths.workflow_dir = ".agentplane/tasks";
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

function applyStoreIntents(current: TaskData, intents: readonly TaskStoreIntent[]): TaskData {
  const next: TaskData = { ...current };
  let touchDoc = false;
  let updatedBy: string | undefined;
  let version: 2 | 3 | undefined;

  for (const intent of intents) {
    switch (intent.kind) {
      case "append-comments": {
        next.comments = [
          ...(Array.isArray(next.comments) ? next.comments : []),
          ...intent.comments,
        ];
        break;
      }
      case "append-events": {
        next.events = [...(Array.isArray(next.events) ? next.events : []), ...intent.events];
        break;
      }
      case "touch-doc-meta": {
        touchDoc = true;
        updatedBy = intent.updatedBy ?? updatedBy;
        version = intent.version ?? version;
        break;
      }
      case "set-task-fields":
      case "replace-doc":
      case "set-section": {
        break;
      }
    }
  }

  if (touchDoc) {
    next.doc_updated_at = new Date().toISOString();
    next.doc_updated_by = updatedBy ?? next.doc_updated_by;
    next.doc_version = version ?? next.doc_version;
  }

  return next;
}

describe("task comment command (unit)", () => {
  beforeEach(() => {
    mockLoadTaskFromContext.mockReset();
    mockLoadCommandContext.mockReset();
    mockBackendIsLocalFileBackend.mockReset();
    mockGetTaskStore.mockReset();
    mockBackendIsLocalFileBackend.mockReturnValue(false);
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-03-13T16:00:00.000Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("uses TaskStore intents for the local backend path", async () => {
    let currentTask: TaskData = {
      id: "T-1",
      title: "Title",
      description: "Desc",
      status: "DOING",
      priority: "med",
      owner: "CODER",
      depends_on: [],
      tags: [],
      verify: [],
      comments: [],
      events: [],
      doc_version: 3,
      doc_updated_by: "CODER",
    };
    const store = {
      mutate: vi
        .fn()
        .mockImplementation(
          async (
            _taskId: string,
            builder: (current: TaskData) => Promise<readonly TaskStoreIntent[]>,
          ) => {
            currentTask = applyStoreIntents(currentTask, await builder(currentTask));
            return { changed: true, task: currentTask };
          },
        ),
    };
    const ctx = mkCtx();
    mockBackendIsLocalFileBackend.mockReturnValue(true);
    mockGetTaskStore.mockReturnValue(store);

    const { cmdTaskComment } = await import("./comment.js");
    const rc = await cmdTaskComment({
      ctx,
      cwd: "/repo",
      taskId: "T-1",
      author: "CODER",
      body: "Comment body",
    });

    expect(rc).toBe(0);
    expect(store.mutate).toHaveBeenCalledTimes(1);
    expect(mockLoadTaskFromContext).not.toHaveBeenCalled();
    expect(currentTask.comments).toEqual([{ author: "CODER", body: "Comment body" }]);
    expect(currentTask.events).toEqual([
      {
        type: "comment",
        at: "2026-03-13T16:00:00.000Z",
        author: "CODER",
        body: "Comment body",
      },
    ]);
    expect(currentTask.doc_updated_by).toBe("CODER");
    expect(currentTask.doc_version).toBe(3);
  });
});
