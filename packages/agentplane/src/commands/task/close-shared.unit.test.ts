import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { defaultConfig, type ResolvedProject } from "@agentplaneorg/core";

import type { TaskBackend, TaskData } from "../../backends/task-backend.js";
import type { CommandContext } from "../shared/task-backend.js";
import type { TaskMutationPlan } from "../shared/task-mutation.js";

const mockApplyTaskMutation =
  vi.fn<
    (opts: {
      ctx: CommandContext;
      taskId: string;
      build: (current: TaskData) => TaskMutationPlan | Promise<TaskMutationPlan>;
    }) => Promise<{ changed: boolean; task: TaskData; mode: "local-store" | "backend" }>
  >();

vi.mock("../shared/task-mutation.js", () => ({
  applyTaskMutation: mockApplyTaskMutation,
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

describe("task close-shared helper (unit)", () => {
  beforeEach(() => {
    mockApplyTaskMutation.mockReset();
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-03-13T16:10:00.000Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("builds one shared transition plan and delegates persistence to applyTaskMutation", async () => {
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

    const { recordVerifiedNoopClosure } = await import("./close-shared.js");
    await recordVerifiedNoopClosure({
      ctx,
      taskId: "T-1",
      author: "CODER",
      body: "Verified: this closure note is long enough to satisfy the verified comment policy.",
      resultSummary: "No-op verified",
      quiet: true,
      successMessage: "ok",
      force: false,
    });

    expect(mockApplyTaskMutation).toHaveBeenCalledTimes(1);
    const call = mockApplyTaskMutation.mock.calls[0];
    expect(call).toBeDefined();
    if (!call) throw new Error("expected applyTaskMutation call");
    const plan = await call[0].build(currentTask);
    expect(plan.intents).toBeDefined();
    expect(plan.nextTask).toEqual(
      expect.objectContaining({
        status: "DONE",
        result_summary: "No-op verified",
        risk_level: "low",
        breaking: false,
        comments: [
          {
            author: "CODER",
            body: "Verified: this closure note is long enough to satisfy the verified comment policy.",
          },
        ],
        events: [
          {
            type: "status",
            at: "2026-03-13T16:10:00.000Z",
            author: "CODER",
            from: "DOING",
            to: "DONE",
            note: "Verified: this closure note is long enough to satisfy the verified comment policy.",
          },
        ],
        doc_updated_by: "CODER",
        doc_version: 3,
      }),
    );
  });
});
