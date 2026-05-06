import { defaultConfig } from "@agentplaneorg/core/config";
import { renderTaskDocFromSections, taskDocToSectionMap } from "@agentplaneorg/core/tasks";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { TaskBackend, TaskData, TaskEvent } from "../../backends/task-backend.js";
import {
  makeTaskBackendDouble,
  makeTaskCommandContext,
  makeTaskFixture,
} from "@agentplane/testkit/task";
import type { CommandContext } from "../shared/task-backend.js";

type BackendMode = "local" | "remote";

function cloneTask(task: TaskData): TaskData {
  return structuredClone(task);
}

function mkTask(overrides: Partial<TaskData> = {}): TaskData {
  return makeTaskFixture(overrides);
}

function mkConfig() {
  const config = defaultConfig();
  config.paths.workflow_dir = ".agentplane/tasks";
  config.status_commit_policy = "off";
  config.agents.approvals.require_plan = false;
  config.tasks.comments.blocked = { prefix: "Blocked:", min_chars: 20 };
  config.tasks.comments.start = { prefix: "Start:", min_chars: 20 };
  config.tasks.doc.sections = ["Summary", "Plan", "Verify Steps", "Verification", "Findings"];
  config.tasks.doc.required_sections = [
    "Summary",
    "Plan",
    "Verify Steps",
    "Verification",
    "Findings",
  ];
  config.tasks.verify.required_tags = ["code", "backend", "frontend"];
  config.tasks.verify.spike_tag = "spike";
  config.tasks.verify.enforce_on_start_when_no_plan = true;
  return config;
}

function mkCtx(backend: TaskBackend, overrides: Partial<CommandContext> = {}): CommandContext {
  return makeTaskCommandContext({
    taskBackend: backend,
    overrides,
    configureConfig: (config) => Object.assign(config, mkConfig()),
  });
}

function normalizeComments(task: TaskData): NonNullable<TaskData["comments"]> {
  return Array.isArray(task.comments)
    ? task.comments.filter(
        (item): item is NonNullable<TaskData["comments"]>[number] =>
          !!item && typeof item.author === "string" && typeof item.body === "string",
      )
    : [];
}

function normalizeEvents(task: TaskData): TaskEvent[] {
  return Array.isArray(task.events)
    ? task.events.filter(
        (item): item is TaskEvent =>
          !!item &&
          typeof item.type === "string" &&
          typeof item.at === "string" &&
          typeof item.author === "string",
      )
    : [];
}

function normalizeTaskDocForComparison(doc: unknown): string | undefined {
  if (typeof doc !== "string") return undefined;
  if (doc.trim().length === 0) return undefined;
  return renderTaskDocFromSections(taskDocToSectionMap(doc));
}

async function captureOutput<T>(
  run: () => Promise<T>,
): Promise<{ result: T; stdout: string; stderr: string }> {
  const stdoutChunks: string[] = [];
  const stderrChunks: string[] = [];
  const stdoutSpy = vi.spyOn(process.stdout, "write").mockImplementation((chunk) => {
    stdoutChunks.push(String(chunk));
    return true;
  });
  const stderrSpy = vi.spyOn(process.stderr, "write").mockImplementation((chunk) => {
    stderrChunks.push(String(chunk));
    return true;
  });

  try {
    const result = await run();
    return { result, stdout: stdoutChunks.join(""), stderr: stderrChunks.join("") };
  } finally {
    stdoutSpy.mockRestore();
    stderrSpy.mockRestore();
  }
}

function projectTaskMutation(task: TaskData) {
  return {
    status: task.status,
    comments: normalizeComments(task),
    events: normalizeEvents(task),
    verification: task.verification,
    doc: normalizeTaskDocForComparison(task.doc),
    doc_version: task.doc_version,
    doc_updated_at: task.doc_updated_at,
    doc_updated_by: task.doc_updated_by,
  };
}

function createBackend(overrides: Partial<TaskBackend> = {}): TaskBackend {
  return makeTaskBackendDouble(overrides);
}

async function runCommentScenario(mode: BackendMode) {
  vi.resetModules();
  let currentTask = mkTask();
  const writeTask = vi.fn((task: TaskData) => {
    currentTask = cloneTask(task);
    return Promise.resolve();
  });
  const store = {
    update: vi.fn(async (_taskId: string, updater: (current: TaskData) => unknown) => {
      currentTask = cloneTask((await updater(cloneTask(currentTask))) as TaskData);
      return { changed: true, task: cloneTask(currentTask) };
    }),
  };
  const loadTaskFromContext = vi.fn(() => Promise.resolve(cloneTask(currentTask)));
  const backend = createBackend({ writeTask });
  const ctx = mkCtx(backend);

  vi.doMock("../shared/task-backend.js", () => ({
    backendUsesLocalTaskStore: () => mode === "local",
    loadCommandContext: vi.fn(),
    loadTaskFromContext,
  }));
  vi.doMock("../blueprint/snapshot-artifact.js", () => ({
    writeTaskBlueprintResolvedSnapshot: vi.fn(() =>
      Promise.resolve({ path: "/repo/.agentplane/tasks/T-1/blueprint/resolved-snapshot.json" }),
    ),
  }));
  vi.doMock("../shared/task-store.js", async () => {
    const actual = await vi.importActual("../shared/task-store.js");
    return {
      ...actual,
      backendIsLocalFileBackend: () => mode === "local",
      getTaskStore: () => store,
    };
  });

  const mod = await import("./comment.js");
  const output = await captureOutput(() =>
    mod.cmdTaskComment({
      ctx,
      cwd: "/repo",
      taskId: "T-1",
      author: "CODER",
      body: "Comment body",
    }),
  );

  return { ...output, task: currentTask, writeTask, update: store.update };
}

async function runBlockScenario(mode: BackendMode) {
  vi.resetModules();
  let currentTask = mkTask({ status: "DOING", tags: ["code"] });
  const writeTask = vi.fn((task: TaskData) => {
    currentTask = cloneTask(task);
    return Promise.resolve();
  });
  const store = {
    update: vi.fn(async (_taskId: string, builder: (current: TaskData) => Promise<TaskData>) => {
      currentTask = await builder(cloneTask(currentTask));
      return { changed: true, task: cloneTask(currentTask) };
    }),
  };
  const loadTaskFromContext = vi.fn(() => Promise.resolve(cloneTask(currentTask)));
  const backend = createBackend({ writeTask });
  const ctx = mkCtx(backend);

  vi.doMock("../guard/impl/comment-commit.js", () => ({
    commitFromComment: vi.fn(),
  }));
  vi.doMock("../shared/task-backend.js", () => ({
    backendUsesLocalTaskStore: () => mode === "local",
    loadCommandContext: vi.fn(),
    loadTaskFromContext,
  }));
  vi.doMock("../shared/task-store.js", async () => {
    const actual = await vi.importActual("../shared/task-store.js");
    return {
      ...actual,
      backendIsLocalFileBackend: () => mode === "local",
      getTaskStore: () => store,
    };
  });

  const mod = await import("./block.js");
  const output = await captureOutput(() =>
    mod.cmdBlock({
      ctx,
      cwd: "/repo",
      taskId: "T-1",
      author: "CODER",
      body: "Blocked: this comment is long enough to satisfy the min_chars rule.",
      commitFromComment: false,
      commitAllow: [],
      commitAutoAllow: false,
      commitAllowTasks: false,
      commitRequireClean: false,
      confirmStatusCommit: false,
      force: false,
      quiet: false,
    }),
  );

  return { ...output, task: currentTask, writeTask, update: store.update };
}

async function runStartScenario(mode: BackendMode) {
  vi.resetModules();
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
      "## Verification",
      "<!-- BEGIN VERIFICATION RESULTS -->",
      "<!-- END VERIFICATION RESULTS -->",
      "",
      "## Findings",
      "n/a",
    ].join("\n"),
  });
  const writeTask = vi.fn((task: TaskData) => {
    currentTask = cloneTask(task);
    return Promise.resolve();
  });
  const store = {
    update: vi.fn(async (_taskId: string, builder: (current: TaskData) => Promise<TaskData>) => {
      currentTask = await builder(cloneTask(currentTask));
      return { changed: true, task: cloneTask(currentTask) };
    }),
  };
  const loadTaskFromContext = vi.fn(() => Promise.resolve(cloneTask(currentTask)));
  const backend = createBackend({ writeTask });
  const ctx = mkCtx(backend);

  vi.doMock("../guard/impl/comment-commit.js", () => ({
    commitFromComment: vi.fn(),
  }));
  vi.doMock("../shared/task-backend.js", () => ({
    backendUsesLocalTaskStore: () => mode === "local",
    loadCommandContext: vi.fn(),
    loadTaskFromContext,
  }));
  vi.doMock("../shared/task-store.js", async () => {
    const actual = await vi.importActual("../shared/task-store.js");
    return {
      ...actual,
      backendIsLocalFileBackend: () => mode === "local",
      getTaskStore: () => store,
    };
  });
  vi.doMock("./shared.js", async () => {
    const actual = await vi.importActual("./shared.js");
    return {
      ...actual,
      resolveTaskDependencyState: vi.fn(() => Promise.resolve({ missing: [], incomplete: [] })),
    };
  });

  const mod = await import("./start.js");
  const output = await captureOutput(() =>
    mod.cmdStart({
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
      quiet: false,
    }),
  );

  return { ...output, task: currentTask, writeTask, update: store.update };
}

async function runSetStatusScenario(mode: BackendMode) {
  vi.resetModules();
  let currentTask = mkTask({
    status: "BLOCKED",
    tags: ["code"],
    doc_updated_by: "LEAD",
  });
  const writeTask = vi.fn((task: TaskData) => {
    currentTask = cloneTask(task);
    return Promise.resolve();
  });
  const store = {
    update: vi.fn(async (_taskId: string, builder: (current: TaskData) => Promise<TaskData>) => {
      currentTask = await builder(cloneTask(currentTask));
      return { changed: true, task: cloneTask(currentTask) };
    }),
  };
  const loadTaskFromContext = vi.fn(() => Promise.resolve(cloneTask(currentTask)));
  const backend = createBackend({ writeTask });
  const ctx = mkCtx(backend);

  vi.doMock("../guard/impl/comment-commit.js", () => ({
    commitFromComment: vi.fn(),
  }));
  vi.doMock("../shared/task-backend.js", () => ({
    backendUsesLocalTaskStore: () => mode === "local",
    loadCommandContext: vi.fn(),
    loadTaskFromContext,
    resolveDocUpdatedBy: (task: TaskData, author?: string) =>
      author ?? task.doc_updated_by ?? task.owner,
  }));
  vi.doMock("../shared/task-store.js", async () => {
    const actual = await vi.importActual("../shared/task-store.js");
    return {
      ...actual,
      backendIsLocalFileBackend: () => mode === "local",
      getTaskStore: () => store,
    };
  });
  vi.doMock("./shared.js", async () => {
    const actual = await vi.importActual("./shared.js");
    return {
      ...actual,
      resolveTaskDependencyState: vi.fn(() => Promise.resolve({ missing: [], incomplete: [] })),
    };
  });

  const mod = await import("./set-status.js");
  const output = await captureOutput(() =>
    mod.cmdTaskSetStatus({
      ctx,
      cwd: "/repo",
      taskId: "T-1",
      status: "DOING",
      author: "CODER",
      body: "Resume work after unblock.",
      force: false,
      yes: false,
      commitFromComment: false,
      commitAllow: [],
      commitAutoAllow: false,
      commitAllowTasks: false,
      commitRequireClean: false,
      confirmStatusCommit: false,
      quiet: false,
    }),
  );

  return { ...output, task: currentTask, writeTask, update: store.update };
}

async function runPlanSetScenario(mode: BackendMode) {
  vi.resetModules();
  const baseDoc = [
    "## Summary",
    "x",
    "",
    "## Plan",
    "Old plan",
    "",
    "## Verify Steps",
    "Run current checks",
    "",
    "## Verification",
    "<!-- BEGIN VERIFICATION RESULTS -->",
    "<!-- END VERIFICATION RESULTS -->",
    "",
    "## Findings",
    "n/a",
  ].join("\n");
  let currentTask = mkTask({
    doc: mode === "local" ? baseDoc : "",
    doc_updated_at: "2026-02-08T00:00:00.000Z",
    plan_approval: {
      state: "approved",
      updated_at: "2026-02-08T00:00:00.000Z",
      updated_by: "PLANNER",
      note: "Approved",
    },
  });
  const writeTask = vi.fn((task: TaskData) => {
    currentTask = cloneTask(task);
    return Promise.resolve();
  });
  const store = {
    update: vi.fn(async (_taskId: string, updater: (current: TaskData) => unknown) => {
      currentTask = cloneTask((await updater(cloneTask(currentTask))) as TaskData);
      return { changed: true, task: cloneTask(currentTask) };
    }),
  };
  const loadTaskFromContext = vi.fn(() => Promise.resolve(cloneTask(currentTask)));
  const backend = createBackend({
    writeTask,
    getTaskDoc: vi.fn(() => Promise.resolve(baseDoc)),
  });
  const ctx = mkCtx(backend);

  vi.doMock("../shared/task-backend.js", () => ({
    backendUsesLocalTaskStore: () => mode === "local",
    loadCommandContext: vi.fn(),
    loadTaskFromContext,
  }));
  vi.doMock("../shared/task-store.js", async () => {
    const actual = await vi.importActual("../shared/task-store.js");
    return {
      ...actual,
      backendIsLocalFileBackend: () => mode === "local",
      getTaskStore: () => store,
    };
  });

  const mod = await import("./plan.js");
  const output = await captureOutput(() =>
    mod.cmdTaskPlanSet({
      ctx,
      cwd: "/repo",
      taskId: "T-1",
      text: "New plan text",
      updatedBy: "CODER",
    }),
  );

  return { ...output, task: currentTask, writeTask, update: store.update };
}

async function runVerifyRecordScenario(mode: BackendMode) {
  vi.resetModules();
  const baseDoc = [
    "## Summary",
    "x",
    "",
    "## Plan",
    "do stuff",
    "",
    "## Verify Steps",
    "Run current checks",
    "",
    "## Verification",
    "<!-- BEGIN VERIFICATION RESULTS -->",
    "<!-- END VERIFICATION RESULTS -->",
    "",
    "## Findings",
    "n/a",
  ].join("\n");
  let currentTask = mkTask({
    status: "DONE",
    doc: mode === "local" ? baseDoc : "",
    doc_updated_at: "2026-02-08T00:00:00.000Z",
  });
  const writeTask = vi.fn((task: TaskData) => {
    currentTask = cloneTask(task);
    return Promise.resolve();
  });
  const store = {
    update: vi.fn(async (_taskId: string, updater: (current: TaskData) => unknown) => {
      currentTask = cloneTask((await updater(cloneTask(currentTask))) as TaskData);
      return { changed: true, task: cloneTask(currentTask) };
    }),
  };
  const loadTaskFromContext = vi.fn(() => Promise.resolve(cloneTask(currentTask)));
  const backend = createBackend({
    writeTask,
    getTaskDoc: vi.fn(() => Promise.resolve(baseDoc)),
  });
  const ctx = mkCtx(backend);

  vi.doMock("../shared/reconcile-check.js", () => ({
    ensureReconciledBeforeMutation: vi.fn(() => Promise.resolve()),
  }));
  vi.doMock("../shared/task-backend.js", () => ({
    backendUsesLocalTaskStore: () => mode === "local",
    loadCommandContext: vi.fn(),
    loadTaskFromContext,
  }));
  vi.doMock("../shared/task-store.js", async () => {
    const actual = await vi.importActual("../shared/task-store.js");
    return {
      ...actual,
      backendIsLocalFileBackend: () => mode === "local",
      getTaskStore: () => store,
    };
  });

  const mod = await import("./verify-record.js");
  const output = await captureOutput(() =>
    mod.cmdTaskVerifyOk({
      ctx,
      cwd: "/repo",
      taskId: "T-1",
      by: "QA",
      note: "Looks good",
      details: "Ran focused checks",
      quiet: false,
    }),
  );

  return { ...output, task: currentTask, writeTask, update: store.update };
}

async function runDocSetScenario(mode: BackendMode) {
  vi.resetModules();
  const baseDoc = [
    "## Summary",
    "Fresh summary from concurrent writer",
    "",
    "## Plan",
    "Concurrent plan survives",
    "",
    "## Verify Steps",
    "Run current checks",
    "",
    "## Verification",
    "<!-- BEGIN VERIFICATION RESULTS -->",
    "<!-- END VERIFICATION RESULTS -->",
    "",
    "## Findings",
    "No findings yet",
  ].join("\n");
  let currentTask = mkTask({
    doc: baseDoc,
    sections: taskDocToSectionMap(baseDoc),
  });
  let remoteDoc = baseDoc;
  let remoteUpdatedBy: string | undefined;
  const writeTask = vi.fn((task: TaskData) => {
    remoteDoc = String(task.doc ?? "");
    remoteUpdatedBy = task.doc_updated_by;
    return Promise.resolve();
  });
  const store = {
    update: vi.fn(async (_taskId: string, updater: (current: TaskData) => Promise<TaskData>) => {
      currentTask = await updater(cloneTask(currentTask));
      return { changed: true, task: cloneTask(currentTask) };
    }),
  };
  const backend = createBackend({
    getTaskDoc: vi.fn(() => Promise.resolve(baseDoc)),
    writeTask,
  });
  const ctx = mkCtx(backend);
  const loadTaskFromContext = vi.fn(() => Promise.resolve(cloneTask(currentTask)));

  vi.doMock("../shared/task-backend.js", () => ({
    backendUsesLocalTaskStore: () => mode === "local",
    loadCommandContext: vi.fn(),
    loadTaskFromContext,
  }));
  vi.doMock("../shared/task-store.js", async () => {
    const actual = await vi.importActual("../shared/task-store.js");
    return {
      ...actual,
      backendIsLocalFileBackend: () => mode === "local",
      getTaskStore: () => store,
    };
  });

  const mod = await import("./doc.js");
  const output = await captureOutput(() =>
    mod.cmdTaskDocSet({
      ctx,
      cwd: "/repo",
      taskId: "T-1",
      section: "Summary",
      text: "Replacement summary",
      updatedBy: "CODER",
      fullDoc: false,
    }),
  );

  return {
    ...output,
    task: currentTask,
    remoteDoc,
    remoteUpdatedBy,
    update: store.update,
    writeTask,
  };
}

async function runDocShowScenario(mode: BackendMode) {
  vi.resetModules();
  const canonicalDoc = renderTaskDocFromSections(
    taskDocToSectionMap(
      [
        "## Summary",
        "canonical summary",
        "",
        "## Plan",
        "canonical plan",
        "",
        "## Verify Steps",
        "Run current checks",
        "",
        "## Verification",
        "<!-- BEGIN VERIFICATION RESULTS -->",
        "<!-- END VERIFICATION RESULTS -->",
        "",
        "## Findings",
        "n/a",
      ].join("\n"),
    ),
  );
  const getTaskDoc = vi.fn(() => Promise.resolve(canonicalDoc));
  const store = {
    get: vi.fn(() =>
      cloneTask(
        mkTask({
          doc: "## Summary\n\nstale body\n",
          sections: taskDocToSectionMap(canonicalDoc),
        }),
      ),
    ),
  };
  const backend = createBackend({
    getTaskDoc,
  });
  const ctx = mkCtx(backend);

  vi.doMock("../shared/task-backend.js", () => ({
    backendUsesLocalTaskStore: () => mode === "local",
    loadCommandContext: vi.fn(),
  }));
  vi.doMock("../shared/task-store.js", async () => {
    const actual = await vi.importActual("../shared/task-store.js");
    return {
      ...actual,
      backendIsLocalFileBackend: () => mode === "local",
      getTaskStore: () => store,
    };
  });

  const mod = await import("./doc.js");
  const output = await captureOutput(() =>
    mod.cmdTaskDocShow({
      ctx,
      cwd: "/repo",
      taskId: "T-1",
      quiet: false,
    }),
  );

  return {
    ...output,
    get: store.get,
    getTaskDoc,
  };
}

describe("task mutation parity across local and backend paths", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-03-13T16:00:00.000Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    vi.resetModules();
    vi.unmock("../guard/impl/comment-commit.js");
    vi.unmock("../shared/reconcile-check.js");
    vi.unmock("../shared/task-backend.js");
    vi.unmock("../shared/task-store.js");
    vi.unmock("./shared.js");
  });

  it("keeps task comment behavior aligned", async () => {
    const local = await runCommentScenario("local");
    const remote = await runCommentScenario("remote");

    expect(local.result).toBe(0);
    expect(remote.result).toBe(0);
    expect(projectTaskMutation(local.task)).toEqual(projectTaskMutation(remote.task));
    expect(local.stdout).toBe(remote.stdout);
    expect(local.stderr).toBe(remote.stderr);
    expect(local.update).toHaveBeenCalledTimes(1);
    expect(remote.writeTask).toHaveBeenCalledTimes(1);
  });

  it("keeps task block behavior aligned", async () => {
    const local = await runBlockScenario("local");
    const remote = await runBlockScenario("remote");

    expect(local.result).toBe(0);
    expect(remote.result).toBe(0);
    expect(projectTaskMutation(local.task)).toEqual(projectTaskMutation(remote.task));
    expect(local.stdout).toBe(remote.stdout);
    expect(local.stderr).toBe(remote.stderr);
    expect(local.update).toHaveBeenCalledTimes(1);
    expect(remote.writeTask).toHaveBeenCalledTimes(1);
  });

  it("keeps task start behavior aligned", async () => {
    const local = await runStartScenario("local");
    const remote = await runStartScenario("remote");

    expect(local.result).toBe(0);
    expect(remote.result).toBe(0);
    expect(projectTaskMutation(local.task)).toEqual(projectTaskMutation(remote.task));
    expect(local.stdout).toBe(remote.stdout);
    expect(local.stderr).toBe(remote.stderr);
    expect(local.update).toHaveBeenCalledTimes(1);
    expect(remote.writeTask).toHaveBeenCalledTimes(1);
  });

  it("keeps task set-status behavior aligned", async () => {
    const local = await runSetStatusScenario("local");
    const remote = await runSetStatusScenario("remote");

    expect(local.result).toBe(0);
    expect(remote.result).toBe(0);
    expect(projectTaskMutation(local.task)).toEqual(projectTaskMutation(remote.task));
    expect(local.stdout).toBe(remote.stdout);
    expect(local.stderr).toBe(remote.stderr);
    expect(local.update).toHaveBeenCalledTimes(1);
    expect(remote.writeTask).toHaveBeenCalledTimes(1);
  });

  it("keeps task plan set behavior aligned", async () => {
    const local = await runPlanSetScenario("local");
    const remote = await runPlanSetScenario("remote");

    expect(local.result).toBe(0);
    expect(remote.result).toBe(0);
    expect(projectTaskMutation(local.task)).toEqual(projectTaskMutation(remote.task));
    expect(local.task.plan_approval?.state).toBe("pending");
    expect(remote.task.plan_approval?.state).toBe("pending");
    expect(local.stdout).toBe(remote.stdout);
    expect(local.stderr).toBe(remote.stderr);
    expect(local.update).toHaveBeenCalledTimes(1);
    expect(remote.writeTask).toHaveBeenCalledTimes(1);
  });

  it("keeps task verify ok behavior aligned", async () => {
    const local = await runVerifyRecordScenario("local");
    const remote = await runVerifyRecordScenario("remote");

    expect(local.result).toBe(0);
    expect(remote.result).toBe(0);
    expect(projectTaskMutation(local.task)).toEqual(projectTaskMutation(remote.task));
    expect(local.stdout).toBe(remote.stdout);
    expect(local.stderr).toBe(remote.stderr);
    expect(local.update).toHaveBeenCalledTimes(1);
    expect(remote.writeTask).toHaveBeenCalledTimes(1);
  });

  it("keeps task doc show behavior aligned", async () => {
    const local = await runDocShowScenario("local");
    const remote = await runDocShowScenario("remote");

    expect(local.result).toBe(0);
    expect(remote.result).toBe(0);
    expect(local.stdout).toBe(remote.stdout);
    expect(local.stderr).toBe(remote.stderr);
    expect(local.stdout).toContain("canonical summary");
    expect(local.stdout).toContain("canonical plan");
    expect(local.stdout).not.toContain("stale body");
    expect(local.get).toHaveBeenCalledTimes(1);
    expect(remote.getTaskDoc).toHaveBeenCalledTimes(1);
  });

  it("keeps task doc set behavior aligned", async () => {
    const local = await runDocSetScenario("local");
    const remote = await runDocSetScenario("remote");

    expect(local.result).toBe(0);
    expect(remote.result).toBe(0);
    expect(normalizeTaskDocForComparison(local.task.doc)).toBe(
      normalizeTaskDocForComparison(remote.remoteDoc),
    );
    expect(local.task.doc_updated_by).toBe("CODER");
    expect(remote.remoteUpdatedBy).toBe("CODER");
    expect(local.stdout).toBe(remote.stdout);
    expect(local.stderr).toBe(remote.stderr);
    expect(local.update).toHaveBeenCalledTimes(1);
    expect(remote.writeTask).toHaveBeenCalledTimes(1);
  });
});
