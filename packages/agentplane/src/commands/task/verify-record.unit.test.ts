import { defaultConfig, type ResolvedProject } from "@agentplaneorg/core";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { TaskBackend, TaskData } from "../../backends/task-backend.js";
import type { CommandContext } from "../shared/task-backend.js";
import { GitContext } from "../shared/git-context.js";

const mocks = vi.hoisted(() => ({
  readFile: vi.fn<(p: string, enc: string) => Promise<string>>(),
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
vi.mock("../shared/task-store.js", () => ({
  backendIsLocalFileBackend: mocks.backendIsLocalFileBackend,
  getTaskStore: mocks.getTaskStore,
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

describe("task verify record (unit)", () => {
  beforeEach(() => {
    mocks.readFile.mockReset();
    mocks.loadCommandContext.mockReset();
    mocks.loadTaskFromContext.mockReset();
    mocks.backendIsLocalFileBackend.mockReset();
    mocks.getTaskStore.mockReset();

    mocks.backendIsLocalFileBackend.mockReturnValue(false);
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

  it("cmdTaskVerifyOk records ok result, appends entry, and prints README path (quiet=false)", async () => {
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

    const next = writeTask.mock.calls[0]?.[0];
    expect(next?.verification?.state).toBe("ok");
    expect(next?.verification?.updated_by).toBe("TESTER");
    expect(next?.verification?.updated_at).toBe("2026-02-09T00:00:00.000Z");
    expect(next?.status).toBe("DONE");
    expect(next?.commit).toEqual({ hash: "abc", message: "msg" });
    expect(next?.events?.at(-1)?.type).toBe("verify");
    expect(next?.doc).toContain("#### 2026-02-09T00:00:00.000Z — VERIFY — ok");
    expect(next?.doc).toContain("By: TESTER");
    expect(next?.doc).toContain("Note: ok");
    expect(writes.join("")).toContain("/repo/.agentplane/tasks/T-1/README.md");

    writeSpy.mockRestore();
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
});
