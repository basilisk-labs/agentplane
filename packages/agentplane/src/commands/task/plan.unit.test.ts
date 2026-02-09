import { defaultConfig, type ResolvedProject } from "@agentplaneorg/core";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { TaskBackend, TaskData } from "../../backends/task-backend.js";
import type { CommandContext } from "../shared/task-backend.js";
import { GitContext } from "../shared/git-context.js";

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
  backendIsLocalFileBackend: mockBackendIsLocalFileBackend,
  getTaskStore: mockGetTaskStore,
}));

function mkTask(overrides: Partial<TaskData>): TaskData {
  return {
    id: "T-1",
    title: "Title",
    description: "Desc",
    status: "TODO",
    priority: "normal",
    owner: "me",
    depends_on: [],
    tags: [],
    verify: [],
    ...overrides,
  };
}

function mkCtx(overrides?: Partial<CommandContext>): CommandContext {
  const config = defaultConfig();
  config.paths.workflow_dir = ".agentplane/tasks";
  config.tasks.doc.required_sections = ["Summary", "Plan", "Verify Steps", "Notes"];
  config.tasks.verify.required_tags = ["code", "backend", "frontend"];
  config.tasks.verify.spike_tag = "spike";
  config.tasks.verify.enforce_on_plan_approve = true;

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
    git: new GitContext({ gitRoot: "/repo" }),
    memo: {},
    resolved,
    backend,
  };
  return { ...ctx, ...overrides };
}

describe("task plan commands (unit)", () => {
  beforeEach(() => {
    mockLoadTaskFromContext.mockReset();
    mockLoadCommandContext.mockReset();
    mockBackendIsLocalFileBackend.mockReset();
    mockGetTaskStore.mockReset();
    mockBackendIsLocalFileBackend.mockReturnValue(false);
  });

  it("cmdTaskPlanApprove rejects empty --by", async () => {
    const ctx = mkCtx();
    mockLoadTaskFromContext.mockResolvedValue(mkTask({ doc: "## Summary\nx\n" }));

    const { cmdTaskPlanApprove } = await import("./plan.js");
    await expect(
      cmdTaskPlanApprove({ ctx, cwd: "/repo", taskId: "T-1", by: "   " }),
    ).rejects.toMatchObject({
      code: "E_USAGE",
    });
  });

  it("cmdTaskPlanApprove rejects when Plan section is missing/empty", async () => {
    const ctx = mkCtx();
    mockLoadTaskFromContext.mockResolvedValue(mkTask({ doc: "## Summary\nx\n" }));

    const { cmdTaskPlanApprove } = await import("./plan.js");
    await expect(
      cmdTaskPlanApprove({ ctx, cwd: "/repo", taskId: "T-1", by: "A" }),
    ).rejects.toMatchObject({
      code: "E_VALIDATION",
    });
  });

  it("cmdTaskPlanApprove enforces Verify Steps when tags require it", async () => {
    const ctx = mkCtx();
    mockLoadTaskFromContext.mockResolvedValue(
      mkTask({
        tags: ["code"],
        doc: [
          "## Summary",
          "x",
          "",
          "## Plan",
          "do stuff",
          "",
          "## Verify Steps",
          "<!-- TODO: FILL VERIFY STEPS -->",
        ].join("\n"),
      }),
    );

    const { cmdTaskPlanApprove } = await import("./plan.js");
    await expect(
      cmdTaskPlanApprove({ ctx, cwd: "/repo", taskId: "T-1", by: "A" }),
    ).rejects.toMatchObject({
      code: "E_VALIDATION",
    });
  });

  it("cmdTaskPlanApprove enforces Notes for spike tasks", async () => {
    const ctx = mkCtx();
    mockLoadTaskFromContext.mockResolvedValue(
      mkTask({
        tags: ["spike"],
        doc: ["## Summary", "x", "", "## Plan", "do", "", "## Verify Steps", "ok"].join("\n"),
      }),
    );

    const { cmdTaskPlanApprove } = await import("./plan.js");
    await expect(
      cmdTaskPlanApprove({ ctx, cwd: "/repo", taskId: "T-1", by: "A" }),
    ).rejects.toMatchObject({
      code: "E_VALIDATION",
    });
  });

  it("cmdTaskPlanApprove writes approved state with timestamps and optional note", async () => {
    const writeTask = vi.fn<(task: TaskData) => Promise<void>>(() => Promise.resolve());
    const backend: TaskBackend = {
      id: "mock",
      listTasks: () => Promise.resolve([]),
      getTask: () => Promise.resolve(null),
      writeTask,
      getTaskDoc: () => Promise.resolve(""),
    };
    const ctx = mkCtx({ taskBackend: backend, backend });
    mockLoadTaskFromContext.mockResolvedValue(
      mkTask({
        tags: ["docs"],
        doc: ["## Summary", "x", "", "## Plan", "do"].join("\n"),
        plan_approval: { state: "pending", updated_at: null, updated_by: null, note: null },
      }),
    );

    const { cmdTaskPlanApprove } = await import("./plan.js");
    const rc = await cmdTaskPlanApprove({ ctx, cwd: "/repo", taskId: "T-1", by: "ME", note: "" });
    expect(rc).toBe(0);
    expect(writeTask).toHaveBeenCalledTimes(1);
    const nextTask = writeTask.mock.calls[0]?.[0];
    expect(nextTask?.plan_approval?.state).toBe("approved");
    expect(nextTask?.plan_approval?.updated_by).toBe("ME");
    expect(nextTask?.plan_approval?.updated_at).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    expect(nextTask?.plan_approval?.note).toBeNull();
  });

  it("cmdTaskPlanReject requires --by and --note and rejects when Plan is missing", async () => {
    const ctx = mkCtx();
    mockLoadTaskFromContext.mockResolvedValue(mkTask({ doc: "## Summary\nx\n" }));

    const { cmdTaskPlanReject } = await import("./plan.js");
    await expect(
      cmdTaskPlanReject({ ctx, cwd: "/repo", taskId: "T-1", by: "", note: "x" }),
    ).rejects.toMatchObject({
      code: "E_USAGE",
    });
    await expect(
      cmdTaskPlanReject({ ctx, cwd: "/repo", taskId: "T-1", by: "A", note: "   " }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
    await expect(
      cmdTaskPlanReject({ ctx, cwd: "/repo", taskId: "T-1", by: "A", note: "x" }),
    ).rejects.toMatchObject({
      code: "E_VALIDATION",
    });
  });

  it("cmdTaskPlanSet enforces exactly one of --text/--file and validates --updated-by", async () => {
    const ctx = mkCtx();
    mockLoadTaskFromContext.mockResolvedValue(mkTask({ doc: "" }));

    const { cmdTaskPlanSet } = await import("./plan.js");
    await expect(cmdTaskPlanSet({ ctx, cwd: "/repo", taskId: "T-1" })).rejects.toMatchObject({
      code: "E_USAGE",
    });
    await expect(
      cmdTaskPlanSet({ ctx, cwd: "/repo", taskId: "T-1", text: "x", file: "f.md" }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
    await expect(
      cmdTaskPlanSet({ ctx, cwd: "/repo", taskId: "T-1", text: "x", updatedBy: "   " }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
  });

  it("cmdTaskPlanSet writes pending plan approval and echoes README path", async () => {
    const writes: string[] = [];
    const writeSpy = vi.spyOn(process.stdout, "write").mockImplementation((chunk) => {
      writes.push(String(chunk));
      return true;
    });

    const getTaskDoc = vi.fn<() => Promise<string>>(() => Promise.resolve("## Summary\nx\n"));
    const writeTask = vi.fn<(task: TaskData) => Promise<void>>(() => Promise.resolve());
    const backend: TaskBackend = {
      id: "mock",
      listTasks: () => Promise.resolve([]),
      getTask: () => Promise.resolve(null),
      writeTask,
      getTaskDoc,
    };
    const ctx = mkCtx({ taskBackend: backend, backend });
    mockLoadTaskFromContext.mockResolvedValue(mkTask({ doc: "" }));

    const { cmdTaskPlanSet } = await import("./plan.js");
    const rc = await cmdTaskPlanSet({
      ctx,
      cwd: "/repo",
      taskId: "T-1",
      text: "plan text",
      updatedBy: "ME",
    });
    expect(rc).toBe(0);
    expect(getTaskDoc).toHaveBeenCalledTimes(1);
    expect(writeTask).toHaveBeenCalledTimes(1);
    const nextTask = writeTask.mock.calls[0]?.[0];
    expect(nextTask?.plan_approval?.state).toBe("pending");
    expect(nextTask?.doc_updated_by).toBe("ME");
    expect(nextTask?.doc).toContain("## Plan");
    expect(nextTask?.doc).toContain("plan text");
    expect(writes.join("")).toContain("/repo/.agentplane/tasks/T-1/README.md");

    writeSpy.mockRestore();
  });
});
