import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { TaskBackend, TaskData, TaskEvent } from "../../backends/task-backend.js";
import { makeTaskCommandContext } from "@agentplane/testkit/task";
import type { CommandContext } from "../shared/task-backend.js";
import type { TaskMutationPlan } from "../shared/task-mutation.js";

const mockLoadCommandContext =
  vi.fn<(opts: { cwd: string; rootOverride?: string | null }) => Promise<CommandContext>>();
const mockApplyTaskMutation =
  vi.fn<
    (opts: {
      ctx: CommandContext;
      taskId: string;
      build: (current: TaskData) => TaskMutationPlan | Promise<TaskMutationPlan>;
    }) => Promise<{ changed: boolean; task: TaskData; mode: "local-store" | "backend" }>
  >();

vi.mock("../shared/task-backend.js", () => ({
  loadCommandContext: mockLoadCommandContext,
}));
vi.mock("../shared/task-mutation.js", () => ({
  applyTaskMutation: mockApplyTaskMutation,
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
  touchTaskDocMetaIntent: (opts: { updatedBy?: string; version?: 2 | 3 }) => ({
    kind: "touch-doc-meta",
    ...opts,
  }),
}));

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
  });
}

describe("task comment command (unit)", () => {
  beforeEach(() => {
    mockLoadCommandContext.mockReset();
    mockApplyTaskMutation.mockReset();
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-03-13T16:00:00.000Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("builds one shared mutation plan and delegates persistence to applyTaskMutation", async () => {
    const currentTask: TaskData = {
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
    const ctx = mkCtx();
    mockApplyTaskMutation.mockImplementation(async ({ build }) => {
      const plan = await build(currentTask);
      return {
        changed: true,
        task: plan.nextTask ?? currentTask,
        mode: "local-store",
      };
    });

    const { cmdTaskComment } = await import("./comment.js");
    const rc = await cmdTaskComment({
      ctx,
      cwd: "/repo",
      taskId: "T-1",
      author: "CODER",
      body: "Comment body",
    });

    expect(rc).toBe(0);
    expect(mockApplyTaskMutation).toHaveBeenCalledTimes(1);
    const call = mockApplyTaskMutation.mock.calls[0];
    expect(call).toBeDefined();
    if (!call) throw new Error("expected applyTaskMutation call");
    const plan = await call[0].build(currentTask);
    expect(plan.intents).toEqual([
      {
        kind: "append-comments",
        comments: [{ author: "CODER", body: "Comment body" }],
      },
      {
        kind: "append-events",
        events: [
          {
            type: "comment",
            at: "2026-03-13T16:00:00.000Z",
            author: "CODER",
            body: "Comment body",
          },
        ],
      },
      {
        kind: "touch-doc-meta",
        updatedBy: "CODER",
        version: 3,
      },
    ]);
    expect(plan.nextTask).toEqual(
      expect.objectContaining({
        comments: [{ author: "CODER", body: "Comment body" }],
        events: [
          {
            type: "comment",
            at: "2026-03-13T16:00:00.000Z",
            author: "CODER",
            body: "Comment body",
          },
        ],
        doc_updated_by: "CODER",
        doc_version: 3,
      }),
    );
  });
});
