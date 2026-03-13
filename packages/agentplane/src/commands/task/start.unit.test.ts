import { beforeEach, describe, expect, it, vi } from "vitest";

import { defaultConfig, type ResolvedProject } from "@agentplaneorg/core";

import type { TaskBackend, TaskData, TaskEvent } from "../../backends/task-backend.js";
import type { CommandContext } from "../shared/task-backend.js";
import type { TaskStorePatch } from "../shared/task-store.js";

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
vi.mock("../shared/task-store.js", async (importOriginal) => {
  const actualUnknown: unknown = await importOriginal();
  const actual =
    actualUnknown && typeof actualUnknown === "object"
      ? (actualUnknown as Record<string, unknown>)
      : {};
  return {
    ...actual,
    backendIsLocalFileBackend: mockBackendIsLocalFileBackend,
    getTaskStore: mockGetTaskStore,
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
  config.agents.approvals.require_plan = false;
  config.tasks.doc.required_sections = ["Summary", "Plan", "Verify Steps", "Notes"];
  config.tasks.verify.required_tags = ["code", "backend", "frontend"];
  config.tasks.verify.spike_tag = "spike";
  config.tasks.verify.enforce_on_start_when_no_plan = true;

  const resolved = {
    gitRoot: "/repo",
    agentplaneDir: "/repo/.agentplane",
  } as unknown as ResolvedProject;

  const backend: TaskBackend = {
    id: "mock",
    listTasks: () => Promise.resolve([]),
    getTask: () => Promise.resolve(null),
    writeTask: () => Promise.resolve(),
    getTaskDoc: () => Promise.resolve(""),
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

describe("task start command (unit)", () => {
  beforeEach(() => {
    mockLoadTaskFromContext.mockReset();
    mockLoadCommandContext.mockReset();
    mockBackendIsLocalFileBackend.mockReset();
    mockGetTaskStore.mockReset();
    mockBackendIsLocalFileBackend.mockReturnValue(false);
  });

  it("cmdStart uses the current local README state instead of a stale initial snapshot", async () => {
    const ctx = mkCtx();
    const staleTask = mkTask({
      tags: ["code"],
      doc: [
        "## Summary",
        "x",
        "",
        "## Plan",
        "do stuff",
        "",
        "## Verify Steps",
        "<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->",
        "",
        "## Notes",
        "n/a",
      ].join("\n"),
    });
    let currentTask = mkTask({
      tags: ["code"],
      doc: [
        "## Summary",
        "x",
        "",
        "## Plan",
        "do stuff",
        "",
        "## Verify Steps",
        "Run bun run test:cli:core",
        "",
        "## Notes",
        "n/a",
      ].join("\n"),
    });
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
    mockBackendIsLocalFileBackend.mockReturnValue(true);
    mockGetTaskStore.mockReturnValue(store);

    const { cmdStart } = await import("./start.js");
    const rc = await cmdStart({
      ctx,
      cwd: "/repo",
      taskId: "T-1",
      author: "CODER",
      body: "Start: this comment is long enough to satisfy the min_chars requirement.",
      commitFromComment: false,
      commitAllow: [],
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
    expect(currentTask.status).toBe("DOING");
    expect(currentTask.comments).toEqual([
      {
        author: "CODER",
        body: "Start: this comment is long enough to satisfy the min_chars requirement.",
      },
    ]);
  });
});
