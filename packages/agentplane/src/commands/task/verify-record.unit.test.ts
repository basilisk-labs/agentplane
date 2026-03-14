import {
  defaultConfig,
  ensureDocSections,
  setMarkdownSection,
  type ResolvedProject,
} from "@agentplaneorg/core";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { TaskBackend, TaskData } from "../../backends/task-backend.js";
import { exitCodeForError } from "../../cli/exit-codes.js";
import { CliError } from "../../shared/errors.js";
import type { CommandContext } from "../shared/task-backend.js";
import { GitContext } from "../shared/git-context.js";
import type { TaskStoreIntent } from "../shared/task-store.js";

const mocks = vi.hoisted(() => ({
  readFile: vi.fn<(p: string, enc: string) => Promise<string>>(),
  ensureReconciledBeforeMutation: vi.fn(),
  loadCommandContext: vi.fn(),
  loadTaskFromContext:
    vi.fn<(opts: { ctx: CommandContext; taskId: string }) => Promise<TaskData>>(),
  backendIsLocalFileBackend: vi.fn<(ctx: CommandContext) => boolean>(),
  getTaskStore: vi.fn(),
}));

vi.mock("node:fs/promises", async (importOriginal) => {
  const actualUnknown: unknown = await importOriginal();
  const actual =
    actualUnknown && typeof actualUnknown === "object"
      ? (actualUnknown as Record<string, unknown>)
      : {};
  return { ...actual, readFile: mocks.readFile };
});

vi.mock("../shared/task-backend.js", () => ({
  loadCommandContext: mocks.loadCommandContext,
  loadTaskFromContext: mocks.loadTaskFromContext,
}));
vi.mock("../shared/reconcile-check.js", () => ({
  ensureReconciledBeforeMutation: mocks.ensureReconciledBeforeMutation,
}));
vi.mock("../shared/task-store.js", () => ({
  appendTaskEventIntent: (event: Record<string, unknown>) => ({
    kind: "append-events",
    events: [event],
  }),
  backendIsLocalFileBackend: mocks.backendIsLocalFileBackend,
  getTaskStore: mocks.getTaskStore,
  setTaskFieldsIntent: (task: Record<string, unknown>) => ({ kind: "set-task-fields", task }),
  setTaskSectionIntent: (opts: Record<string, unknown>) => ({ kind: "set-section", ...opts }),
  touchTaskDocMetaIntent: (opts: Record<string, unknown>) => ({
    kind: "touch-doc-meta",
    ...opts,
  }),
}));

function mkTask(overrides: Partial<TaskData>): TaskData {
  return {
    id: "T-1",
    title: "Title",
    description: "Desc",
    status: "DONE",
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
  // Ensure the doc always includes Verification + Verify Steps for extraction/updates.
  config.tasks.doc.required_sections = ["Summary", "Verify Steps", "Verification"];

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

function applyStoreIntents(current: TaskData, intents: readonly TaskStoreIntent[]): TaskData {
  const next: TaskData = { ...current };
  let touchDoc = false;
  let updatedBy: string | undefined;
  let version: 2 | 3 | undefined;

  for (const intent of intents) {
    switch (intent.kind) {
      case "set-task-fields": {
        Object.assign(next, intent.task);
        break;
      }
      case "append-events": {
        next.events = [...(Array.isArray(next.events) ? next.events : []), ...intent.events];
        break;
      }
      case "replace-doc": {
        next.doc = intent.doc;
        touchDoc = true;
        break;
      }
      case "set-section": {
        const baseDoc = ensureDocSections(String(next.doc ?? ""), intent.requiredSections);
        next.doc = ensureDocSections(
          setMarkdownSection(baseDoc, intent.section, intent.text),
          intent.requiredSections,
        );
        touchDoc = true;
        break;
      }
      case "touch-doc-meta": {
        touchDoc = true;
        updatedBy = intent.updatedBy ?? updatedBy;
        version = intent.version ?? version;
        break;
      }
      case "append-comments": {
        break;
      }
    }
  }

  if (touchDoc) {
    next.doc_version = version ?? next.doc_version;
    next.doc_updated_at = new Date().toISOString();
    next.doc_updated_by = updatedBy ?? next.doc_updated_by;
  }

  return next;
}

describe("task verify record (unit)", () => {
  beforeEach(() => {
    mocks.readFile.mockReset();
    mocks.ensureReconciledBeforeMutation.mockReset();
    mocks.loadCommandContext.mockReset();
    mocks.loadTaskFromContext.mockReset();
    mocks.backendIsLocalFileBackend.mockReset();
    mocks.getTaskStore.mockReset();

    mocks.backendIsLocalFileBackend.mockReturnValue(false);
    mocks.ensureReconciledBeforeMutation.mockResolvedValue();
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-02-09T00:00:00.000Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("cmdTaskVerifyOk validates required inputs and mutually exclusive details/file", async () => {
    const { cmdTaskVerifyOk } = await import("./verify-record.js");

    await expect(
      cmdTaskVerifyOk({ cwd: "/repo", taskId: "T-1", by: "", note: "x", quiet: true }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
    await expect(
      cmdTaskVerifyOk({ cwd: "/repo", taskId: "T-1", by: "A", note: "", quiet: true }),
    ).rejects.toMatchObject({ code: "E_USAGE" });

    await expect(
      cmdTaskVerifyOk({
        cwd: "/repo",
        taskId: "T-1",
        by: "A",
        note: "x",
        details: "d",
        file: "f.txt",
        quiet: true,
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
  });

  it("cmdTaskVerifyOk maps readFile errors when --file is provided", async () => {
    mocks.readFile.mockRejectedValue(new Error("ENOENT: nope"));
    const { cmdTaskVerifyOk } = await import("./verify-record.js");
    await expect(
      cmdTaskVerifyOk({
        cwd: "/repo",
        taskId: "T-1",
        by: "A",
        note: "x",
        file: "missing.txt",
        quiet: true,
      }),
    ).rejects.toMatchObject({ code: "E_IO" });
  });

  it("cmdTaskVerifyRework maps readFile errors when --file is provided", async () => {
    mocks.readFile.mockRejectedValue(new Error("ENOENT: nope"));
    const { cmdTaskVerifyRework } = await import("./verify-record.js");
    await expect(
      cmdTaskVerifyRework({
        cwd: "/repo",
        taskId: "T-1",
        by: "A",
        note: "x",
        file: "missing.txt",
        quiet: true,
      }),
    ).rejects.toMatchObject({ code: "E_IO" });
  });

  it("cmdTaskVerifyOk errors when backend does not support docs", async () => {
    const ctx = mkCtx({
      taskBackend: {
        id: "mock",
        listTasks: () => Promise.resolve([]),
        getTask: () => Promise.resolve(null),
        writeTask: () => Promise.resolve(),
      } as unknown as TaskBackend,
    });
    const { cmdTaskVerifyOk } = await import("./verify-record.js");
    await expect(
      cmdTaskVerifyOk({ ctx, cwd: "/repo", taskId: "T-1", by: "A", note: "x", quiet: true }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
  });

  it("cmdTaskVerifyOk preserves legacy verification scaffold for doc_version=2", async () => {
    const writes: string[] = [];
    const writeSpy = vi.spyOn(process.stdout, "write").mockImplementation((chunk) => {
      writes.push(String(chunk));
      return true;
    });

    const writeTask = vi.fn<(t: TaskData) => Promise<void>>(() => Promise.resolve());
    const getTaskDoc = vi.fn<() => Promise<string>>(() =>
      Promise.resolve(
        [
          "## Summary",
          "x",
          "",
          "## Verify Steps",
          "step",
          "",
          "## Verification",
          "### Plan",
          "",
          "### Results",
          "",
          "<!-- BEGIN VERIFICATION RESULTS -->",
          "<!-- END VERIFICATION RESULTS -->",
          "",
        ].join("\n"),
      ),
    );

    const backend: TaskBackend = {
      id: "mock",
      listTasks: () => Promise.resolve([]),
      getTask: () => Promise.resolve(null),
      writeTask,
      getTaskDoc,
    };
    const ctx = mkCtx({ taskBackend: backend, backend });
    mocks.loadTaskFromContext.mockResolvedValue(
      mkTask({
        status: "DONE",
        commit: { hash: "abc", message: "msg" },
        doc: undefined,
        doc_version: 2,
        doc_updated_at: "2026-02-01T00:00:00Z",
      }),
    );

    const { cmdTaskVerifyOk } = await import("./verify-record.js");
    const rc = await cmdTaskVerifyOk({
      ctx,
      cwd: "/repo",
      taskId: "T-1",
      by: "TESTER",
      note: "ok",
      details: "",
      quiet: false,
    });
    expect(rc).toBe(0);
    expect(getTaskDoc).toHaveBeenCalledTimes(1);
    expect(writeTask).toHaveBeenCalledTimes(1);
    expect(mocks.ensureReconciledBeforeMutation).toHaveBeenCalledWith({
      ctx,
      command: "verify",
    });

    const next = writeTask.mock.calls[0]?.[0];
    expect(next?.verification?.state).toBe("ok");
    expect(next?.verification?.updated_by).toBe("TESTER");
    expect(next?.verification?.updated_at).toBe("2026-02-09T00:00:00.000Z");
    expect(next?.status).toBe("DONE");
    expect(next?.commit).toEqual({ hash: "abc", message: "msg" });
    expect(next?.events?.at(-1)?.type).toBe("verify");
    expect(next?.doc).toContain("### Plan");
    expect(next?.doc).toContain("### Results");
    expect(next?.doc).toContain("#### 2026-02-09T00:00:00.000Z — VERIFY — ok");
    expect(next?.doc).toContain("By: TESTER");
    expect(next?.doc).toContain("Note: ok");
    expect(writes.join("")).toContain(
      "✅ verified T-1 (state=ok readme=.agentplane/tasks/T-1/README.md)",
    );

    writeSpy.mockRestore();
  });

  it("cmdTaskVerifyOk normalizes doc_version=3 verification to results-only layout", async () => {
    const writeTask = vi.fn<(t: TaskData) => Promise<void>>(() => Promise.resolve());
    const backend: TaskBackend = {
      id: "mock",
      listTasks: () => Promise.resolve([]),
      getTask: () => Promise.resolve(null),
      writeTask,
      getTaskDoc: () =>
        Promise.resolve(
          [
            "## Summary",
            "x",
            "",
            "## Verify Steps",
            "step",
            "",
            "## Verification",
            "### Plan",
            "",
            "legacy notes",
            "",
            "### Results",
            "",
            "<!-- BEGIN VERIFICATION RESULTS -->",
            "<!-- END VERIFICATION RESULTS -->",
            "",
          ].join("\n"),
        ),
    };
    const ctx = mkCtx({ taskBackend: backend, backend });
    mocks.loadTaskFromContext.mockResolvedValue(
      mkTask({
        status: "DONE",
        commit: { hash: "abc", message: "msg" },
        doc: undefined,
        doc_version: 3,
        doc_updated_at: "2026-02-01T00:00:00Z",
      }),
    );

    const { cmdTaskVerifyOk } = await import("./verify-record.js");
    const rc = await cmdTaskVerifyOk({
      ctx,
      cwd: "/repo",
      taskId: "T-1",
      by: "TESTER",
      note: "ok",
      details: "",
      quiet: true,
    });
    expect(rc).toBe(0);

    const next = writeTask.mock.calls[0]?.[0];
    expect(next?.doc).toContain("legacy notes");
    expect(next?.doc).not.toContain("### Plan");
    expect(next?.doc).not.toContain("### Results");
    expect(next?.doc).toContain("<!-- BEGIN VERIFICATION RESULTS -->");
    expect(next?.doc).toContain("#### 2026-02-09T00:00:00.000Z — VERIFY — ok");
  });

  it("cmdTaskVerifyOk decodes escaped newlines in verification details", async () => {
    const writeTask = vi.fn<(t: TaskData) => Promise<void>>(() => Promise.resolve());
    const backend: TaskBackend = {
      id: "mock",
      listTasks: () => Promise.resolve([]),
      getTask: () => Promise.resolve(null),
      writeTask,
      getTaskDoc: () =>
        Promise.resolve(
          [
            "## Summary",
            "x",
            "",
            "## Verify Steps",
            "step",
            "",
            "## Verification",
            "<!-- BEGIN VERIFICATION RESULTS -->",
            "<!-- END VERIFICATION RESULTS -->",
            "",
          ].join("\n"),
        ),
    };
    const ctx = mkCtx({ taskBackend: backend, backend });
    mocks.loadTaskFromContext.mockResolvedValue(
      mkTask({
        status: "DONE",
        commit: { hash: "abc", message: "msg" },
        doc: undefined,
        doc_version: 3,
        doc_updated_at: "2026-02-01T00:00:00Z",
      }),
    );

    const { cmdTaskVerifyOk } = await import("./verify-record.js");
    const rc = await cmdTaskVerifyOk({
      ctx,
      cwd: "/repo",
      taskId: "T-1",
      by: "TESTER",
      note: "ok",
      details: String.raw`line one\nline two`,
      quiet: true,
    });
    expect(rc).toBe(0);

    const next = writeTask.mock.calls[0]?.[0];
    expect(next?.doc).toContain("Details:\n\nline one\nline two");
    expect(next?.doc).not.toContain(String.raw`line one\nline two`);
  });

  it("cmdTaskVerifyRework records needs_rework, clears commit, forces status DOING, and does not print when quiet=true", async () => {
    const writeSpy = vi.spyOn(process.stdout, "write").mockImplementation(() => true);

    const writeTask = vi.fn<(t: TaskData) => Promise<void>>(() => Promise.resolve());
    const backend: TaskBackend = {
      id: "mock",
      listTasks: () => Promise.resolve([]),
      getTask: () => Promise.resolve(null),
      writeTask,
      getTaskDoc: () =>
        Promise.resolve(
          [
            "## Summary",
            "x",
            "",
            "## Verify Steps",
            "step",
            "",
            "## Verification",
            "<!-- BEGIN VERIFICATION RESULTS -->",
            "<!-- END VERIFICATION RESULTS -->",
          ].join("\n"),
        ),
    };
    const ctx = mkCtx({ taskBackend: backend, backend });
    mocks.loadTaskFromContext.mockResolvedValue(
      mkTask({
        status: "DONE",
        commit: { hash: "abc", message: "msg" },
      }),
    );

    const { cmdTaskVerifyRework } = await import("./verify-record.js");
    const rc = await cmdTaskVerifyRework({
      ctx,
      cwd: "/repo",
      taskId: "T-1",
      by: "TESTER",
      note: "rework",
      quiet: true,
    });
    expect(rc).toBe(0);
    expect(writeTask).toHaveBeenCalledTimes(1);
    const next = writeTask.mock.calls[0]?.[0];
    expect(next?.verification?.state).toBe("needs_rework");
    expect(next?.status).toBe("DOING");
    expect(next?.commit).toBeNull();
    expect(writeSpy).not.toHaveBeenCalled();

    writeSpy.mockRestore();
  });

  it("cmdTaskVerifyRework prints a status summary when quiet=false", async () => {
    const writes: string[] = [];
    const writeSpy = vi.spyOn(process.stdout, "write").mockImplementation((chunk) => {
      writes.push(String(chunk));
      return true;
    });

    const writeTask = vi.fn<(t: TaskData) => Promise<void>>(() => Promise.resolve());
    const backend: TaskBackend = {
      id: "mock",
      listTasks: () => Promise.resolve([]),
      getTask: () => Promise.resolve(null),
      writeTask,
      getTaskDoc: () =>
        Promise.resolve(
          [
            "## Summary",
            "x",
            "",
            "## Verify Steps",
            "step",
            "",
            "## Verification",
            "<!-- BEGIN VERIFICATION RESULTS -->",
            "<!-- END VERIFICATION RESULTS -->",
          ].join("\n"),
        ),
    };
    const ctx = mkCtx({ taskBackend: backend, backend });
    mocks.loadTaskFromContext.mockResolvedValue(
      mkTask({
        status: "DONE",
        commit: { hash: "abc", message: "msg" },
      }),
    );

    const { cmdTaskVerifyRework } = await import("./verify-record.js");
    const rc = await cmdTaskVerifyRework({
      ctx,
      cwd: "/repo",
      taskId: "T-1",
      by: "TESTER",
      note: "rework",
      quiet: false,
    });
    expect(rc).toBe(0);
    expect(writes.join("")).toContain(
      "✅ verified T-1 (state=needs_rework readme=.agentplane/tasks/T-1/README.md)",
    );

    writeSpy.mockRestore();
  });

  it("cmdVerifyParsed maps malformed markers errors as E_IO via backend error mapping", async () => {
    const writeTask = vi.fn<(t: TaskData) => Promise<void>>(() => Promise.resolve());
    const backend: TaskBackend = {
      id: "mock",
      listTasks: () => Promise.resolve([]),
      getTask: () => Promise.resolve(null),
      writeTask,
      getTaskDoc: () =>
        Promise.resolve(
          [
            "## Verify Steps",
            "step",
            "",
            "## Verification",
            // Both markers exist but in the wrong order; the helper should throw.
            "<!-- END VERIFICATION RESULTS -->",
            "<!-- BEGIN VERIFICATION RESULTS -->",
          ].join("\n"),
        ),
    };
    const ctx = mkCtx({ taskBackend: backend, backend });
    mocks.loadTaskFromContext.mockResolvedValue(mkTask({}));

    const { cmdVerifyParsed } = await import("./verify-record.js");
    await expect(
      cmdVerifyParsed({
        ctx,
        cwd: "/repo",
        taskId: "T-1",
        state: "ok",
        by: "TESTER",
        note: "x",
        quiet: true,
      }),
    ).rejects.toMatchObject({ code: "E_IO" });
  });

  it("cmdVerifyParsed validates required inputs and mutually exclusive details/file", async () => {
    const { cmdVerifyParsed } = await import("./verify-record.js");

    await expect(
      cmdVerifyParsed({
        cwd: "/repo",
        taskId: "T-1",
        state: "ok",
        by: "",
        note: "x",
        quiet: true,
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
    await expect(
      cmdVerifyParsed({
        cwd: "/repo",
        taskId: "T-1",
        state: "ok",
        by: "TESTER",
        note: "",
        quiet: true,
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
    await expect(
      cmdVerifyParsed({
        cwd: "/repo",
        taskId: "T-1",
        state: "ok",
        by: "TESTER",
        note: "x",
        details: "d",
        file: "f.txt",
        quiet: true,
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
  });

  it("cmdVerifyParsed fails early when reconcile guard blocks mutation", async () => {
    const ctx = mkCtx();
    mocks.ensureReconciledBeforeMutation.mockRejectedValue(
      new CliError({
        exitCode: exitCodeForError("E_VALIDATION"),
        code: "E_VALIDATION",
        message: "reconcile blocked",
      }),
    );
    const { cmdVerifyParsed } = await import("./verify-record.js");
    await expect(
      cmdVerifyParsed({
        ctx,
        cwd: "/repo",
        taskId: "T-1",
        state: "ok",
        by: "TESTER",
        note: "ok",
        quiet: true,
      }),
    ).rejects.toMatchObject({ code: "E_VALIDATION" });
  });

  it("cmdTaskVerifyOk preserves fresher README content when store update sees newer task data", async () => {
    const staleTask = mkTask({
      status: "DONE",
      doc_version: 3,
      doc_updated_at: "2026-02-01T00:00:00.000Z",
      doc: [
        "## Summary",
        "Stale summary",
        "",
        "## Verify Steps",
        "Stale verify steps",
        "",
        "## Verification",
        "",
      ].join("\n"),
    });
    let currentTask = mkTask({
      status: "DONE",
      doc_version: 3,
      doc_updated_at: "2026-02-07T00:00:00.000Z",
      doc: [
        "## Summary",
        "Concurrent summary",
        "",
        "## Verify Steps",
        "Concurrent verify steps",
        "",
        "## Verification",
        "",
      ].join("\n"),
    });
    const store = {
      get: vi.fn().mockResolvedValue(staleTask),
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
    mocks.backendIsLocalFileBackend.mockReturnValue(true);
    mocks.getTaskStore.mockReturnValue(store);

    const { cmdTaskVerifyOk } = await import("./verify-record.js");
    const rc = await cmdTaskVerifyOk({
      ctx,
      cwd: "/repo",
      taskId: "T-1",
      by: "TESTER",
      note: "ok",
      quiet: true,
    });

    expect(rc).toBe(0);
    expect(store.get).toHaveBeenCalledTimes(0);
    expect(store.mutate).toHaveBeenCalledTimes(1);
    expect(currentTask.verification?.state).toBe("ok");
    expect(currentTask.doc).toContain("## Summary\nConcurrent summary");
    expect(currentTask.doc).toContain("## Verify Steps\nConcurrent verify steps");
    expect(currentTask.doc).toContain("#### 2026-02-09T00:00:00.000Z — VERIFY — ok");
    expect(currentTask.doc).toContain("VerifyStepsRef: doc_version=3");
    expect(currentTask.doc_updated_by).toBe("TESTER");
  });
});
