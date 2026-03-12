import {
  defaultConfig,
  ensureDocSections,
  setMarkdownSection,
  type ResolvedProject,
} from "@agentplaneorg/core";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { TaskBackend, TaskData } from "../../backends/task-backend.js";
import { CliError } from "../../shared/errors.js";
import type { CommandContext } from "../shared/task-backend.js";
import { GitContext } from "../shared/git-context.js";
import type { TaskStorePatch } from "../shared/task-store.js";

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

function applyStorePatch(current: TaskData, patch: TaskStorePatch | null | undefined): TaskData {
  if (!patch) return current;
  const next: TaskData = patch.task ? { ...current, ...patch.task } : { ...current };
  if (patch.appendComments && patch.appendComments.length > 0) {
    next.comments = [
      ...(Array.isArray(current.comments) ? current.comments : []),
      ...patch.appendComments,
    ];
  }
  if (patch.appendEvents && patch.appendEvents.length > 0) {
    next.events = [...(Array.isArray(current.events) ? current.events : []), ...patch.appendEvents];
  }
  if (patch.doc) {
    if (patch.doc.kind === "replace-doc") {
      next.doc = patch.doc.doc;
    } else {
      const baseDoc = ensureDocSections(String(current.doc ?? ""), patch.doc.requiredSections);
      next.doc = ensureDocSections(
        setMarkdownSection(baseDoc, patch.doc.section, patch.doc.text),
        patch.doc.requiredSections,
      );
    }
  }
  if (patch.doc || patch.docMeta?.touch === true) {
    next.doc_version = patch.docMeta?.version ?? next.doc_version;
    next.doc_updated_at = new Date().toISOString();
    next.doc_updated_by = patch.docMeta?.updatedBy ?? next.doc_updated_by;
  }
  return next;
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
      patch: vi
        .fn()
        .mockImplementation(
          async (_taskId: string, builder: (current: TaskData) => Promise<TaskStorePatch>) => {
            currentTask = applyStorePatch(currentTask, await builder(currentTask));
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
    expect(store.patch).toHaveBeenCalledTimes(1);
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
      patch: vi
        .fn()
        .mockImplementation(
          async (_taskId: string, builder: (current: TaskData) => Promise<TaskStorePatch>) => {
            currentTask = applyStorePatch(currentTask, await builder(currentTask));
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

  it("cmdTaskDocSet surfaces semantic section conflicts from the task store", async () => {
    const ctx = mkCtx();
    mocks.backendIsLocalFileBackend.mockReturnValue(true);
    mocks.getTaskStore.mockReturnValue({
      patch: vi.fn().mockRejectedValue(
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
});
