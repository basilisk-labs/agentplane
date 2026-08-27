import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { TaskBackend, TaskData } from "../../backends/task-backend.js";
import { exitCodeForError } from "../../cli/exit-codes.js";
import { CliError } from "../../shared/errors.js";
import type { CommandContext } from "../shared/task-backend.js";
import {
  makeVerificationExecutionContext as executionContext,
  makeVerifyRecordDoc as mkDoc,
  makeVerifyRecordContext as mkCtx,
  makeVerifyRecordTask as mkTask,
  makeWriteThroughVerificationBackend as makeWriteThroughBackend,
} from "./verify-record.testkit.js";

const mocks = vi.hoisted(() => ({
  readFile: vi.fn<(p: string, enc: string) => Promise<string>>(),
  mkdir: vi.fn(),
  writeJsonStableIfChanged: vi.fn(),
  ensureReconciledBeforeMutation: vi.fn(),
  loadCommandContext: vi.fn(),
  loadTaskFromContext:
    vi.fn<(opts: { ctx: CommandContext; taskId: string }) => Promise<TaskData>>(),
  loadTaskCommandContext: vi.fn(),
  resolveTaskExecutionContext: vi.fn(),
  backendIsLocalFileBackend: vi.fn<(ctx: CommandContext) => boolean>(),
  getTaskStore: vi.fn(),
  collectTaskIncidents: vi.fn(),
  inspectTaskIncidents: vi.fn(),
  renderIncidentCollectionPlanOutcome: vi.fn(),
  ensurePrArtifactsSynced: vi.fn(),
  resolveQualityReviewTargetSha: vi.fn(),
}));

vi.mock("node:fs/promises", async (importOriginal) => {
  const actualUnknown: unknown = await importOriginal();
  const actual =
    actualUnknown && typeof actualUnknown === "object"
      ? (actualUnknown as Record<string, unknown>)
      : {};
  return { ...actual, readFile: mocks.readFile, mkdir: mocks.mkdir };
});

vi.mock("../../shared/write-if-changed.js", () => ({
  writeJsonStableIfChanged: mocks.writeJsonStableIfChanged,
}));

vi.mock("../shared/task-backend.js", () => ({
  backendUsesLocalTaskStore: mocks.backendIsLocalFileBackend,
  loadCommandContext: mocks.loadCommandContext,
  loadTaskFromContext: mocks.loadTaskFromContext,
}));
vi.mock("../shared/reconcile-check.js", () => ({
  ensureReconciledBeforeMutation: mocks.ensureReconciledBeforeMutation,
}));
vi.mock("../../runtime/task-execution-context/index.js", () => ({
  loadTaskCommandContext: mocks.loadTaskCommandContext,
  resolveTaskExecutionContext: mocks.resolveTaskExecutionContext,
}));
vi.mock("../incidents/shared.js", () => ({
  collectTaskIncidents: mocks.collectTaskIncidents,
  inspectTaskIncidents: mocks.inspectTaskIncidents,
  renderIncidentCollectionPlanOutcome: mocks.renderIncidentCollectionPlanOutcome,
}));
vi.mock("../pr/internal/sync.js", () => ({
  ensurePrArtifactsSynced: mocks.ensurePrArtifactsSynced,
}));
vi.mock("../shared/quality-review-target.js", async (importOriginal) => ({
  ...(await importOriginal()),
  resolveQualityReviewTargetSha: mocks.resolveQualityReviewTargetSha,
}));
vi.mock("../shared/task-store.js", async (importOriginal) => {
  const actualUnknown: unknown = await importOriginal();
  const actual =
    actualUnknown && typeof actualUnknown === "object"
      ? (actualUnknown as Record<string, unknown>)
      : {};
  return {
    ...actual,
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
  };
});

describe("task verify record (unit)", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mocks.mkdir.mockResolvedValue(undefined);
    mocks.writeJsonStableIfChanged.mockResolvedValue(true);
    mocks.loadTaskFromContext.mockResolvedValue(mkTask({}));
    mocks.loadTaskCommandContext.mockImplementation(
      async ({ ctx, taskIds }: { ctx: CommandContext; taskIds: string[] }) => {
        const tasks = await Promise.all(
          taskIds.map((taskId) => mocks.loadTaskFromContext({ ctx, taskId })),
        );
        const primaryTask = tasks[0];
        if (!primaryTask) throw new Error("Missing primary task fixture.");
        return {
          command: ctx,
          execution: executionContext(ctx, primaryTask.id),
          primary_task: primaryTask,
          tasks,
        };
      },
    );
    mocks.resolveTaskExecutionContext.mockImplementation(
      ({ ctx, primaryTaskId }: { ctx: CommandContext; primaryTaskId?: string }) =>
        Promise.resolve(executionContext(ctx, primaryTaskId)),
    );
    mocks.resolveQualityReviewTargetSha.mockResolvedValue(null);

    mocks.backendIsLocalFileBackend.mockReturnValue(false);
    mocks.ensureReconciledBeforeMutation.mockResolvedValue();
    mocks.collectTaskIncidents.mockResolvedValue({
      loaded: null,
      registryPath: "/repo/.agentplane/policy/incidents.md",
      registryText: "",
      registry: null,
      plan: { promotable: [], skipped: [], duplicates: [] },
      wrote: false,
    });
    mocks.inspectTaskIncidents.mockResolvedValue({
      loaded: null,
      registryPath: "/repo/.agentplane/policy/incidents.md",
      registryText: "",
      registry: null,
      plan: { promotable: [], skipped: [], duplicates: [], issues: [] },
    });
    mocks.renderIncidentCollectionPlanOutcome.mockReturnValue(
      'incident registry unchanged (plain verify note stayed task-local and did not update incidents.md: add --observation, --impact, --resolution, and --promote for a reusable incident, then rerun with --collect-incidents or collect later on the base branch. next: agentplane task findings add T-1 --observation "<observation>" --impact "<impact>" --resolution "<resolution>" --promote --external)',
    );
    mocks.ensurePrArtifactsSynced.mockResolvedValue(false);
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-02-09T00:00:00.000Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("prints an explicit no-op explanation when verify records no structured incident finding", async () => {
    const writes: string[] = [];
    const writeSpy = vi.spyOn(process.stdout, "write").mockImplementation((chunk) => {
      writes.push(String(chunk));
      return true;
    });
    const writeTask = vi.fn<(task: TaskData) => Promise<void>>(() => Promise.resolve());
    const backend = makeWriteThroughBackend({
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
            "## Findings",
            "",
          ].join("\n"),
        ),
    });
    const ctx = mkCtx({ taskBackend: backend, backend });
    ctx.config.workflow_mode = "branch_pr";
    mocks.loadTaskFromContext.mockResolvedValue(
      mkTask({
        status: "DONE",
        commit: { hash: "metadata-sha", message: "pre-merge closure" },
        extensions: { implementation_commit: { hash: "implementation-sha" } },
        doc: undefined,
        doc_version: 3,
        doc_updated_at: "2026-02-01T00:00:00Z",
      }),
    );

    const { cmdTaskVerifyOk } = await import("./verify-record.js");
    await expect(
      cmdTaskVerifyOk({
        ctx,
        cwd: "/repo",
        taskId: "T-1",
        by: "A",
        note: "Looks good",
        details: "Command: focused check\nResult: pass\nEvidence: exited 0\nScope: committed task",
        quiet: false,
      }),
    ).resolves.toBe(0);

    expect(writes.join("")).toContain("plain verify note stayed task-local");
    expect(writes.join("")).toContain("did not update incidents.md");
    expect(writes.join("")).toContain("--observation, --impact, --resolution, and --promote");
    expect(writes.join("")).toContain("agentplane task findings add T-1");
    expect(writes.join("")).toContain("--promote --external");
    expect(mocks.resolveQualityReviewTargetSha).toHaveBeenCalledWith(
      expect.objectContaining({ previousEvaluatedSha: "implementation-sha" }),
    );
    expect(writeTask.mock.calls[0]?.[0].extensions?.implementation_commit).toEqual({
      hash: "implementation-sha",
    });
    expect(writeTask.mock.calls[0]?.[0].extensions?.task_execution_context).toBeDefined();

    writeSpy.mockRestore();
  });

  it("cmdTaskVerifyOk validates note sources and mutually exclusive details/file", async () => {
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
        noteFile: "note.txt",
        quiet: true,
      }),
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

  it("cmdTaskVerifyOk rejects scaffolded Verify Steps before writing verification", async () => {
    const backend: TaskBackend = {
      id: "mock",
      listTasks: () => Promise.resolve([]),
      getTask: () => Promise.resolve(null),
      writeTask: () => Promise.resolve(),
      getTaskDoc: () =>
        Promise.resolve(
          [
            "## Summary",
            "x",
            "",
            "## Verify Steps",
            "<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->",
            "",
            "1. <Action>. Expected: <observable result>.",
            "2. <Action>. Expected: <observable result>.",
            "",
            "## Verification",
            "<!-- BEGIN VERIFICATION RESULTS -->",
            "<!-- END VERIFICATION RESULTS -->",
            "",
            "## Findings",
            "",
          ].join("\n"),
        ),
    };
    const ctx = mkCtx({ taskBackend: backend, backend });
    mocks.loadTaskFromContext.mockResolvedValue(
      mkTask({
        status: "DONE",
        doc: undefined,
        doc_version: 3,
        doc_updated_at: "2026-02-01T00:00:00Z",
      }),
    );

    const { cmdTaskVerifyOk } = await import("./verify-record.js");
    await expect(
      cmdTaskVerifyOk({
        ctx,
        cwd: "/repo",
        taskId: "T-1",
        by: "A",
        note: "Looks good",
        quiet: true,
      }),
    ).rejects.toMatchObject({ code: "E_VALIDATION" });
  });

  it("cmdTaskVerifyOk maps readFile errors when --note-file is provided", async () => {
    mocks.readFile.mockRejectedValue(new Error("ENOENT: nope"));
    const { cmdTaskVerifyOk } = await import("./verify-record.js");
    await expect(
      cmdTaskVerifyOk({
        cwd: "/repo",
        taskId: "T-1",
        by: "A",
        note: "",
        noteFile: "missing-note.txt",
        quiet: true,
      }),
    ).rejects.toMatchObject({ code: "E_IO" });
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

  it("cmdTaskVerifyOk can collect incidents explicitly after recording verification", async () => {
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
          "<!-- BEGIN VERIFICATION RESULTS -->",
          "<!-- END VERIFICATION RESULTS -->",
          "",
          "## Findings",
          "",
        ].join("\n"),
      ),
    );

    const backend = makeWriteThroughBackend({
      writeTask,
      getTaskDoc,
    });
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
      by: "REVIEWER",
      note: "Looks good",
      collectIncidents: true,
      quiet: false,
    });

    expect(rc).toBe(0);
    expect(mocks.collectTaskIncidents).toHaveBeenCalledWith({
      ctx,
      taskId: "T-1",
      write: true,
    });
    expect(writes.join("")).toContain("✅ verified T-1");
    writeSpy.mockRestore();
  });

  it("cmdTaskVerifyOk emits early progress before backend context load when quiet=false", async () => {
    const writes: string[] = [];
    const writeSpy = vi.spyOn(process.stdout, "write").mockImplementation((chunk) => {
      writes.push(String(chunk));
      return true;
    });
    mocks.loadCommandContext.mockImplementationOnce(() => {
      expect(writes.join("")).toContain("recording verification T-1 state=ok");
      return Promise.reject(new Error("stop after early progress"));
    });

    const { cmdTaskVerifyOk } = await import("./verify-record.js");
    await expect(
      cmdTaskVerifyOk({
        cwd: "/repo",
        taskId: "T-1",
        by: "REVIEWER",
        note: "Looks good",
        quiet: false,
      }),
    ).rejects.toThrow();

    writeSpy.mockRestore();
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

    const backend = makeWriteThroughBackend({
      writeTask,
      getTaskDoc,
    });
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
      taskIds: ["T-1"],
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
    expect(next?.doc).toContain("### 2026-02-09T00:00:00.000Z — VERIFY — ok");
    expect(next?.doc).toContain("By: TESTER");
    expect(next?.doc).toContain("Note: ok");
    expect(writes.join("")).toContain(
      "✅ verified T-1 (state=ok readme=.agentplane/tasks/T-1/README.md)",
    );

    writeSpy.mockRestore();
  });

  it("cmdTaskVerifyOk normalizes doc_version=3 verification to results-only layout", async () => {
    const writeTask = vi.fn<(t: TaskData) => Promise<void>>(() => Promise.resolve());
    const backend = makeWriteThroughBackend({
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
    });
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
    expect(next?.doc).toContain("### 2026-02-09T00:00:00.000Z — VERIFY — ok");
  });

  it("cmdTaskVerifyOk decodes escaped newlines in verification details", async () => {
    const writeTask = vi.fn<(t: TaskData) => Promise<void>>(() => Promise.resolve());
    const backend = makeWriteThroughBackend({
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
    });
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

  it("cmdTaskVerifyOk normalizes note-file content to a single verification line", async () => {
    mocks.readFile.mockResolvedValue("Looks\\n\\n good   from file\n");
    const writeTask = vi.fn<(t: TaskData) => Promise<void>>(() => Promise.resolve());
    const backend = makeWriteThroughBackend({
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
    });
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
      note: "",
      noteFile: "verify-note.txt",
      quiet: true,
    });
    expect(rc).toBe(0);

    const next = writeTask.mock.calls[0]?.[0];
    expect(next?.doc).toContain("Note: Looks good from file");
    expect(next?.doc).not.toContain("Note: Looks\n");
  });

  it("cmdTaskVerifyRework records needs_rework, clears commit, forces status DOING, and does not print when quiet=true", async () => {
    const writeSpy = vi.spyOn(process.stdout, "write").mockImplementation(() => true);

    const writeTask = vi.fn<(t: TaskData) => Promise<void>>(() => Promise.resolve());
    const backend = makeWriteThroughBackend({
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
    });
    const ctx = mkCtx({ taskBackend: backend, backend });
    mocks.loadTaskFromContext.mockResolvedValue(
      mkTask({
        status: "DONE",
        commit: { hash: "abc", message: "msg" },
        extensions: {
          implementation_commit: { hash: "implementation-sha" },
          preserved: { value: true },
        },
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
    expect(next?.extensions?.implementation_commit).toBeUndefined();
    expect(next?.extensions?.preserved).toEqual({ value: true });
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
    const backend = makeWriteThroughBackend({
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
    });
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

  it("cmdVerifyParsed validates note sources and mutually exclusive details/file", async () => {
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
        noteFile: "note.txt",
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

  it("cmdTaskVerifyOk uses mergeable Verification section intents on the local store", async () => {
    let currentTask = mkTask({
      status: "DONE",
      doc_version: 3,
      doc_updated_at: "2026-02-07T00:00:00.000Z",
      doc: mkDoc({
        summary: "Concurrent summary",
        verifySteps: "Concurrent verify steps",
        verificationLines: [
          "<!-- BEGIN VERIFICATION RESULTS -->",
          "",
          "### 2026-02-08T00:00:00.000Z — VERIFY — ok",
          "",
          "By: OTHER",
          "",
          "Note: prior",
          "",
          "<!-- END VERIFICATION RESULTS -->",
        ],
      }),
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
    expect(store.update).toHaveBeenCalledTimes(1);
    expect(currentTask.doc).toContain("### 2026-02-08T00:00:00.000Z — VERIFY — ok");
    expect(currentTask.doc).toContain("Note: prior");
    expect(currentTask.doc).toContain("### 2026-02-09T00:00:00.000Z — VERIFY — ok");
    expect(currentTask.doc).toContain("VerifyStepsRef: doc_version=3");
    expect(currentTask.doc).toContain("BlueprintSnapshotRef:");
    expect(currentTask.doc).toContain("- safe_command: agentplane blueprint snapshot T-1");
  });
  it("cmdTaskVerifyOk preserves fresher README content when store update sees newer task data", async () => {
    let currentTask = mkTask({
      status: "DONE",
      doc_version: 3,
      doc_updated_at: "2026-02-07T00:00:00.000Z",
      doc: mkDoc({
        summary: "Concurrent summary",
        verifySteps: "Concurrent verify steps",
      }),
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
    expect(store.update).toHaveBeenCalledTimes(1);
    expect(currentTask.verification?.state).toBe("ok");
    expect(currentTask.doc).toContain("## Summary\nConcurrent summary");
    expect(currentTask.doc).toContain("## Verify Steps\nConcurrent verify steps");
    expect(currentTask.doc).toContain("### 2026-02-09T00:00:00.000Z — VERIFY — ok");
    expect(currentTask.doc).toContain("VerifyStepsRef: doc_version=3");
    expect(currentTask.doc_updated_by).toBe("TESTER");
  });
});
