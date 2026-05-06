import { beforeEach, describe, expect, it, vi } from "vitest";

import type { TaskBackend, TaskData } from "../../backends/task-backend.js";
import { makeTaskCommandContext, makeTaskFixture } from "@agentplane/testkit/task";
import type { CommandContext } from "../shared/task-backend.js";

const mockLoadTaskFromContext =
  vi.fn<(opts: { ctx: CommandContext; taskId: string }) => Promise<TaskData>>();
const mockLoadCommandContext =
  vi.fn<(opts: { cwd: string; rootOverride?: string | null }) => Promise<CommandContext>>();
const mockBackendIsLocalFileBackend = vi.fn<(ctx: CommandContext) => boolean>();
const mockGetTaskStore = vi.fn();
const mockWriteTaskBlueprintResolvedSnapshot =
  vi.fn<(opts: { ctx: CommandContext; task: TaskData }) => Promise<unknown>>();

vi.mock("../shared/task-backend.js", () => ({
  backendUsesLocalTaskStore: mockBackendIsLocalFileBackend,
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
vi.mock("../blueprint/snapshot-artifact.js", async (importOriginal) => {
  const actualUnknown: unknown = await importOriginal();
  const actual =
    actualUnknown && typeof actualUnknown === "object"
      ? (actualUnknown as Record<string, unknown>)
      : {};
  return {
    ...actual,
    writeTaskBlueprintResolvedSnapshot: mockWriteTaskBlueprintResolvedSnapshot,
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
    getTaskDoc: () => Promise.resolve(""),
  };
  return makeTaskCommandContext({
    taskBackend: backend,
    overrides,
    configureConfig: (config) => {
      config.agents.approvals.require_plan = false;
      config.tasks.doc.required_sections = ["Summary", "Plan", "Verify Steps", "Notes"];
      config.tasks.verify.required_tags = ["code", "backend", "frontend"];
      config.tasks.verify.spike_tag = "spike";
      config.tasks.verify.enforce_on_start_when_no_plan = true;
    },
  });
}

describe("task start command (unit)", () => {
  beforeEach(() => {
    mockLoadTaskFromContext.mockReset();
    mockLoadCommandContext.mockReset();
    mockBackendIsLocalFileBackend.mockReset();
    mockGetTaskStore.mockReset();
    mockWriteTaskBlueprintResolvedSnapshot.mockReset();
    mockBackendIsLocalFileBackend.mockReturnValue(false);
    mockWriteTaskBlueprintResolvedSnapshot.mockResolvedValue({
      path: "/repo/.agentplane/tasks/T-1/blueprint/resolved-snapshot.json",
      snapshot: { digest: { value: "abc" } },
    });
  });

  it("cmdStart evaluates README requirements from the current local task state", async () => {
    const ctx = mkCtx();
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
      update: vi
        .fn()
        .mockImplementation(
          async (_taskId: string, builder: (current: TaskData) => Promise<TaskData>) => {
            currentTask = await builder(currentTask);
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
    expect(store.update).toHaveBeenCalledTimes(1);
    expect(currentTask.status).toBe("DOING");
    expect(currentTask.comments).toEqual([
      {
        author: "CODER",
        body: "Start: this comment is long enough to satisfy the min_chars requirement.",
      },
    ]);
    expect(mockWriteTaskBlueprintResolvedSnapshot).toHaveBeenCalledTimes(1);
    const snapshotCall = mockWriteTaskBlueprintResolvedSnapshot.mock.calls[0]?.[0];
    expect(snapshotCall?.ctx).toBe(ctx);
    expect(snapshotCall?.task.id).toBe(currentTask.id);
    expect(snapshotCall?.task.status).toBe("DOING");
  });
});
