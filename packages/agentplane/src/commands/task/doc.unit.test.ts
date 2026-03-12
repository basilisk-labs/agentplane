import { defaultConfig, type ResolvedProject } from "@agentplaneorg/core";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { TaskBackend, TaskData } from "../../backends/task-backend.js";
import type { CommandContext } from "../shared/task-backend.js";
import { GitContext } from "../shared/git-context.js";

const mocks = vi.hoisted(() => ({
  loadCommandContext: vi.fn(),
  backendIsLocalFileBackend: vi.fn<(ctx: CommandContext) => boolean>(),
  getTaskStore: vi.fn(),
}));

vi.mock("../shared/task-backend.js", () => ({
  loadCommandContext: mocks.loadCommandContext,
}));
vi.mock("../shared/task-store.js", () => ({
  backendIsLocalFileBackend: mocks.backendIsLocalFileBackend,
  getTaskStore: mocks.getTaskStore,
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
        .mockImplementation((_taskId: string, updater: (current: TaskData) => TaskData) => {
          currentTask = updater(currentTask);
          return { changed: true, task: currentTask };
        }),
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
});
