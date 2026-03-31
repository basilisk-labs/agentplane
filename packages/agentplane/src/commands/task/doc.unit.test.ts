import { defaultConfig, type ResolvedProject } from "@agentplaneorg/core";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { TaskBackend, TaskData } from "../../backends/task-backend.js";
import { CliError } from "../../shared/errors.js";
import type { CommandContext } from "../shared/task-backend.js";
import { GitContext } from "../shared/git-context.js";

const mocks = vi.hoisted(() => ({
  loadCommandContext: vi.fn(),
  loadTaskFromContext:
    vi.fn<(opts: { ctx: CommandContext; taskId: string }) => Promise<TaskData>>(),
  backendIsLocalFileBackend: vi.fn<(ctx: CommandContext) => boolean>(),
  getTaskStore: vi.fn(),
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
  config.tasks.doc.sections = ["Summary", "Plan", "Verify Steps", "Findings"];
  config.tasks.doc.required_sections = ["Summary", "Plan", "Verify Steps", "Findings"];

  const resolved = {
    gitRoot: "/repo",
    agentplaneDir: "/repo/.agentplane",
  } as unknown as ResolvedProject;

  const backend: TaskBackend = {
    id: "mock",
    listTasks: () => Promise.resolve([]),
    getTask: () => Promise.resolve(null),
    getTaskDoc: () => Promise.resolve(""),
    setTaskDoc: () => Promise.resolve(),
    writeTask: () => Promise.resolve(),
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

describe("task doc commands (unit)", () => {
  beforeEach(() => {
    mocks.loadCommandContext.mockReset();
    mocks.loadTaskFromContext.mockReset();
    mocks.backendIsLocalFileBackend.mockReset();
    mocks.getTaskStore.mockReset();
    mocks.backendIsLocalFileBackend.mockReturnValue(false);
  });

  it("cmdTaskDocSet preserves fresher README sections from store-backed updates", async () => {
    const writes: string[] = [];
    const stdoutSpy = vi.spyOn(process.stdout, "write").mockImplementation((chunk) => {
      writes.push(String(chunk));
      return true;
    });
    const stderrSpy = vi.spyOn(process.stderr, "write").mockImplementation((chunk) => {
      writes.push(String(chunk));
      return true;
    });

    let currentTask = mkTask({
      doc: [
        "## Summary",
        "Fresh summary from concurrent writer",
        "",
        "## Plan",
        "Concurrent plan survives",
        "",
        "## Verify Steps",
        "Run current checks",
        "",
        "## Findings",
        "No findings yet",
      ].join("\n"),
    });
    const store = {
      update: vi
        .fn()
        .mockImplementation(
          async (_taskId: string, updater: (current: TaskData) => Promise<TaskData>) => {
            currentTask = await updater(currentTask);
            return { changed: true, task: currentTask };
          },
        ),
    };
    const ctx = mkCtx();
    mocks.backendIsLocalFileBackend.mockReturnValue(true);
    mocks.getTaskStore.mockReturnValue(store);

    const { cmdTaskDocSet } = await import("./doc.js");
    const rc = await cmdTaskDocSet({
      ctx,
      cwd: "/repo",
      taskId: "T-1",
      section: "Summary",
      text: "Replacement summary",
      fullDoc: false,
    });

    expect(rc).toBe(0);
    expect(store.update).toHaveBeenCalledTimes(1);
    expect(currentTask.doc).toContain("Replacement summary");
    expect(currentTask.doc).toContain("Concurrent plan survives");
    expect(currentTask.doc).toContain("Run current checks");
    expect(currentTask.doc).not.toContain("Fresh summary from concurrent writer");
    expect(writes.join("")).toContain("/repo/.agentplane/tasks/T-1/README.md");
    expect(writes.join("")).toContain("task doc set outcome=section-updated section=Summary");

    stdoutSpy.mockRestore();
    stderrSpy.mockRestore();
  });

  it("cmdTaskDocSet decodes escaped inline newlines before writing the section", async () => {
    let currentTask = mkTask({
      doc: [
        "## Summary",
        "Old summary",
        "",
        "## Plan",
        "Plan stays",
        "",
        "## Verify Steps",
        "Run checks",
        "",
        "## Findings",
        "",
      ].join("\n"),
    });
    const store = {
      update: vi
        .fn()
        .mockImplementation(
          async (_taskId: string, updater: (current: TaskData) => Promise<TaskData>) => {
            currentTask = await updater(currentTask);
            return { changed: true, task: currentTask };
          },
        ),
    };
    const ctx = mkCtx();
    mocks.backendIsLocalFileBackend.mockReturnValue(true);
    mocks.getTaskStore.mockReturnValue(store);

    const { cmdTaskDocSet } = await import("./doc.js");
    const rc = await cmdTaskDocSet({
      ctx,
      cwd: "/repo",
      taskId: "T-1",
      section: "Summary",
      text: String.raw`Line one\nLine two`,
      fullDoc: false,
    });

    expect(rc).toBe(0);
    expect(currentTask.doc).toContain("Line one\nLine two");
    expect(currentTask.doc).not.toContain(String.raw`Line one\nLine two`);
  });

  it("cmdTaskDocSet carries expectedCurrentText for backend writes", async () => {
    const originalDoc = [
      "## Summary",
      "Current summary",
      "",
      "## Plan",
      "Current plan",
      "",
      "## Verify Steps",
      "Run checks",
      "",
      "## Findings",
      "",
    ].join("\n");
    const writeTask = vi.fn<(task: TaskData, opts?: Record<string, unknown>) => Promise<void>>(() =>
      Promise.resolve(),
    );
    const backend: TaskBackend = {
      id: "mock",
      listTasks: () => Promise.resolve([]),
      getTask: () => Promise.resolve(null),
      getTaskDoc: () => Promise.resolve(""),
      writeTask,
    };
    const ctx = mkCtx({ taskBackend: backend, backend });
    mocks.loadTaskFromContext.mockResolvedValue(mkTask({ doc: originalDoc }));

    const { cmdTaskDocSet } = await import("./doc.js");
    const rc = await cmdTaskDocSet({
      ctx,
      cwd: "/repo",
      taskId: "T-1",
      section: "Summary",
      text: "Replacement summary",
      fullDoc: false,
    });

    expect(rc).toBe(0);
    expect(writeTask).toHaveBeenCalledTimes(1);
    expect(writeTask.mock.calls[0]?.[1]).toMatchObject({
      expectedCurrentText: "Current summary",
      expectedSection: "Summary",
    });
    expect(writeTask.mock.calls[0]?.[0]?.doc).toContain("Replacement summary");
  });

  it("cmdTaskDocSet carries expectedCurrentDoc for backend full-doc replacements", async () => {
    const originalDoc = [
      "## Summary",
      "Current summary",
      "",
      "## Plan",
      "Current plan",
      "",
      "## Verify Steps",
      "Run checks",
      "",
      "## Findings",
      "",
    ].join("\n");
    const writeTask = vi.fn<(task: TaskData, opts?: Record<string, unknown>) => Promise<void>>(() =>
      Promise.resolve(),
    );
    const backend: TaskBackend = {
      id: "mock",
      listTasks: () => Promise.resolve([]),
      getTask: () => Promise.resolve(null),
      getTaskDoc: () => Promise.resolve(""),
      writeTask,
    };
    const ctx = mkCtx({ taskBackend: backend, backend });
    mocks.loadTaskFromContext.mockResolvedValue(mkTask({ doc: originalDoc }));

    const { cmdTaskDocSet } = await import("./doc.js");
    const rc = await cmdTaskDocSet({
      ctx,
      cwd: "/repo",
      taskId: "T-1",
      section: "Summary",
      text: ["## Summary", "Replacement summary", "", "## Plan", "Replacement plan"].join("\n"),
      fullDoc: false,
    });

    expect(rc).toBe(0);
    expect(writeTask).toHaveBeenCalledTimes(1);
    expect(writeTask.mock.calls[0]?.[1]).toMatchObject({
      expectedCurrentDoc: originalDoc,
    });
  });

  it("cmdTaskDocShow prefers canonical sections over stale task.doc on the local backend", async () => {
    const writes: string[] = [];
    const stdoutSpy = vi.spyOn(process.stdout, "write").mockImplementation((chunk) => {
      writes.push(String(chunk));
      return true;
    });

    const ctx = mkCtx();
    mocks.backendIsLocalFileBackend.mockReturnValue(true);
    mocks.getTaskStore.mockReturnValue({
      get: vi.fn().mockResolvedValue(
        mkTask({
          doc: "## Summary\n\nstale body\n",
          sections: {
            Summary: "canonical summary",
            Plan: "canonical plan",
            "Verify Steps": "Run checks",
            Findings: "",
          },
        }),
      ),
    });

    const { cmdTaskDocShow } = await import("./doc.js");
    const rc = await cmdTaskDocShow({
      ctx,
      cwd: "/repo",
      taskId: "T-1",
      section: "Summary",
      quiet: false,
    });

    expect(rc).toBe(0);
    expect(writes.join("")).toContain("canonical summary");
    expect(writes.join("")).not.toContain("stale body");
    stdoutSpy.mockRestore();
  });

  it("cmdTaskDocSet surfaces semantic section conflicts from the task store", async () => {
    const ctx = mkCtx();
    mocks.backendIsLocalFileBackend.mockReturnValue(true);
    mocks.getTaskStore.mockReturnValue({
      update: vi.fn().mockRejectedValue(
        new CliError({
          exitCode: 3,
          code: "E_VALIDATION",
          message: "Task README section changed concurrently: T-1 ## Summary",
          context: { reason_code: "task_readme_section_conflict", section: "Summary" },
        }),
      ),
    });

    const { cmdTaskDocSet } = await import("./doc.js");
    await expect(
      cmdTaskDocSet({
        ctx,
        cwd: "/repo",
        taskId: "T-1",
        section: "Summary",
        text: "Replacement summary",
        fullDoc: false,
      }),
    ).rejects.toMatchObject({
      code: "E_VALIDATION",
      context: { reason_code: "task_readme_section_conflict", section: "Summary" },
    });
  });

  it("cmdTaskDocSet surfaces semantic full-doc conflicts from the task store", async () => {
    const ctx = mkCtx();
    mocks.backendIsLocalFileBackend.mockReturnValue(true);
    mocks.getTaskStore.mockReturnValue({
      update: vi.fn().mockRejectedValue(
        new CliError({
          exitCode: 3,
          code: "E_VALIDATION",
          message: "Task README changed concurrently: T-1",
          context: { reason_code: "task_readme_conflict" },
        }),
      ),
    });

    const { cmdTaskDocSet } = await import("./doc.js");
    await expect(
      cmdTaskDocSet({
        ctx,
        cwd: "/repo",
        taskId: "T-1",
        section: "Summary",
        text: ["## Summary", "Replacement summary", "", "## Plan", "Replacement plan"].join("\n"),
        fullDoc: false,
      }),
    ).rejects.toMatchObject({
      code: "E_VALIDATION",
      context: { reason_code: "task_readme_conflict" },
    });
  });
});
