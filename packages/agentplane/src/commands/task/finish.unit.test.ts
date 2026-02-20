import { defaultConfig, type ResolvedProject } from "@agentplaneorg/core";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { TaskBackend, TaskData } from "../../backends/task-backend.js";
import type { CommandContext } from "../shared/task-backend.js";
import { GitContext } from "../shared/git-context.js";

const mocks = vi.hoisted(() => ({
  commitFromComment: vi.fn(),
  cmdCommit: vi.fn(),
  buildGitCommitEnv: vi.fn(),
  loadCommandContext: vi.fn(),
  loadTaskFromContext: vi.fn(),
  backendIsLocalFileBackend: vi.fn(),
  getTaskStore: vi.fn(),
  readHeadCommit: vi.fn(),
  readCommitInfo: vi.fn(),
  nowIso: vi.fn(),
}));

vi.mock("../guard/index.js", () => ({
  commitFromComment: mocks.commitFromComment,
  cmdCommit: mocks.cmdCommit,
  buildGitCommitEnv: mocks.buildGitCommitEnv,
}));
vi.mock("../shared/task-backend.js", () => ({
  loadCommandContext: mocks.loadCommandContext,
  loadTaskFromContext: mocks.loadTaskFromContext,
}));
vi.mock("../shared/task-store.js", () => ({
  backendIsLocalFileBackend: mocks.backendIsLocalFileBackend,
  getTaskStore: mocks.getTaskStore,
}));
vi.mock("./shared.js", async (importOriginal) => {
  const actualUnknown: unknown = await importOriginal();
  const actual =
    actualUnknown && typeof actualUnknown === "object"
      ? (actualUnknown as Record<string, unknown>)
      : {};
  return {
    ...actual,
    readHeadCommit: mocks.readHeadCommit,
    readCommitInfo: mocks.readCommitInfo,
    nowIso: mocks.nowIso,
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
  // Match the repo's current config defaults: verification is not required at runtime unless enabled.
  config.agents = {
    approvals: { require_plan: false, require_network: true, require_verify: false },
  };
  config.status_commit_policy = "off";
  config.paths.workflow_dir = ".agentplane/tasks";
  config.tasks.comments.verified = { prefix: "Verified:", min_chars: 10 };

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
    git: new GitContext({ gitRoot: "/repo" }),
    memo: {},
    resolved,
    backend,
  };
  return { ...ctx, ...overrides };
}

describe("task finish (unit)", () => {
  beforeEach(() => {
    mocks.commitFromComment.mockReset();
    mocks.cmdCommit.mockReset();
    mocks.loadCommandContext.mockReset();
    mocks.loadTaskFromContext.mockReset();
    mocks.backendIsLocalFileBackend.mockReset();
    mocks.getTaskStore.mockReset();
    mocks.readHeadCommit.mockReset();
    mocks.readCommitInfo.mockReset();
    mocks.nowIso.mockReset();

    mocks.backendIsLocalFileBackend.mockReturnValue(false);
    mocks.readHeadCommit.mockResolvedValue({ hash: "h", message: "m" });
    mocks.readCommitInfo.mockResolvedValue({ hash: "hc", message: "mc" });
    mocks.nowIso.mockReturnValue("2026-02-09T00:00:00.000Z");
    mocks.commitFromComment.mockResolvedValue({
      hash: "new-hash",
      message: "✅ T-1 task: verified",
      staged: ["packages/agentplane"],
    });
    mocks.cmdCommit.mockResolvedValue(0);
    mocks.buildGitCommitEnv.mockReturnValue({});
  });

  it("rejects --commit-from-comment/--status-commit with multiple task ids", async () => {
    const { cmdFinish } = await import("./finish.js");
    await expect(
      cmdFinish({
        ctx: mkCtx(),
        cwd: "/repo",
        taskIds: ["T-1", "T-2"],
        author: "A",
        body: "Verified: this is long enough",
        breaking: false,
        force: false,
        commitFromComment: true,
        commitAllow: [],
        commitAutoAllow: false,
        commitAllowTasks: false,
        commitRequireClean: false,
        statusCommit: false,
        statusCommitAllow: [],
        statusCommitAutoAllow: false,
        statusCommitRequireClean: false,
        confirmStatusCommit: false,
        quiet: true,
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
  });

  it("rejects --commit-from-comment without explicit allowlist or auto-allow", async () => {
    const { cmdFinish } = await import("./finish.js");
    await expect(
      cmdFinish({
        ctx: mkCtx(),
        cwd: "/repo",
        taskIds: ["T-1"],
        author: "A",
        body: "Verified: this is long enough",
        breaking: false,
        force: false,
        commitFromComment: true,
        commitAllow: [],
        commitAutoAllow: false,
        commitAllowTasks: false,
        commitRequireClean: false,
        statusCommit: false,
        statusCommitAllow: [],
        statusCommitAutoAllow: false,
        statusCommitRequireClean: false,
        confirmStatusCommit: false,
        quiet: true,
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
  });

  it("rejects --status-commit without explicit allowlist or auto-allow", async () => {
    const { cmdFinish } = await import("./finish.js");
    await expect(
      cmdFinish({
        ctx: mkCtx(),
        cwd: "/repo",
        taskIds: ["T-1"],
        author: "A",
        body: "Verified: this is long enough",
        breaking: false,
        force: false,
        commitFromComment: false,
        commitAllow: [],
        commitAutoAllow: false,
        commitAllowTasks: false,
        commitRequireClean: false,
        statusCommit: true,
        statusCommitAllow: [],
        statusCommitAutoAllow: false,
        statusCommitRequireClean: false,
        confirmStatusCommit: false,
        quiet: true,
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
  });

  it("runs deterministic close commit when --close-commit is enabled", async () => {
    const ctx = mkCtx();
    mocks.loadTaskFromContext.mockResolvedValue(mkTask({ id: "T-1", tags: ["meta"] }));

    const { cmdFinish } = await import("./finish.js");
    await cmdFinish({
      ctx,
      cwd: "/repo",
      taskIds: ["T-1"],
      author: "A",
      body: "Verified: this is long enough",
      result: "done",
      breaking: false,
      force: false,
      commitFromComment: false,
      commitAllow: [],
      commitAutoAllow: false,
      commitAllowTasks: false,
      commitRequireClean: false,
      statusCommit: false,
      statusCommitAllow: [],
      statusCommitAutoAllow: false,
      statusCommitRequireClean: false,
      confirmStatusCommit: false,
      closeCommit: true,
      closeUnstageOthers: true,
      quiet: true,
    });

    expect(mocks.cmdCommit).toHaveBeenCalledWith(
      expect.objectContaining({
        taskId: "T-1",
        close: true,
        closeUnstageOthers: true,
      }),
    );
  });

  it("rejects commit/status commit flags when primary task id is empty", async () => {
    const { cmdFinish } = await import("./finish.js");
    await expect(
      cmdFinish({
        ctx: mkCtx(),
        cwd: "/repo",
        taskIds: [""],
        author: "A",
        body: "Verified: this is long enough",
        breaking: false,
        force: false,
        commitFromComment: false,
        commitAllow: [],
        commitAutoAllow: false,
        commitAllowTasks: false,
        commitRequireClean: false,
        statusCommit: true,
        statusCommitAllow: [],
        statusCommitAutoAllow: false,
        statusCommitRequireClean: false,
        confirmStatusCommit: false,
        quiet: true,
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
  });

  it("requires exactly one task id when --result/--risk/--breaking metadata is requested", async () => {
    const { cmdFinish } = await import("./finish.js");
    await expect(
      cmdFinish({
        ctx: mkCtx(),
        cwd: "/repo",
        taskIds: ["T-1", "T-2"],
        author: "A",
        body: "Verified: this is long enough",
        result: "x",
        breaking: false,
        force: false,
        commitFromComment: false,
        commitAllow: [],
        commitAutoAllow: false,
        commitAllowTasks: false,
        commitRequireClean: false,
        statusCommit: false,
        statusCommitAllow: [],
        statusCommitAutoAllow: false,
        statusCommitRequireClean: false,
        confirmStatusCommit: false,
        quiet: true,
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
  });

  it("requires --result for non-spike tasks when finishing a single task", async () => {
    const ctx = mkCtx();
    mocks.loadTaskFromContext.mockResolvedValue(mkTask({ id: "T-1", tags: ["code"] }));

    const { cmdFinish } = await import("./finish.js");
    await expect(
      cmdFinish({
        ctx,
        cwd: "/repo",
        taskIds: ["T-1"],
        author: "A",
        body: "Verified: this is long enough",
        breaking: false,
        force: false,
        commitFromComment: false,
        commitAllow: [],
        commitAutoAllow: false,
        commitAllowTasks: false,
        commitRequireClean: false,
        statusCommit: false,
        statusCommitAllow: [],
        statusCommitAutoAllow: false,
        statusCommitRequireClean: false,
        confirmStatusCommit: false,
        quiet: true,
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
  });

  it("uses readCommitInfo when --commit is provided; otherwise uses readHeadCommit", async () => {
    const ctx = mkCtx();
    mocks.loadTaskFromContext.mockResolvedValue(mkTask({ id: "T-1", tags: ["code"] }));

    const { cmdFinish } = await import("./finish.js");
    await cmdFinish({
      ctx,
      cwd: "/repo",
      taskIds: ["T-1"],
      author: "A",
      body: "Verified: this is long enough",
      result: "ok",
      breaking: false,
      commit: "abc",
      force: false,
      commitFromComment: false,
      commitAllow: [],
      commitAutoAllow: false,
      commitAllowTasks: false,
      commitRequireClean: false,
      statusCommit: false,
      statusCommitAllow: [],
      statusCommitAutoAllow: false,
      statusCommitRequireClean: false,
      confirmStatusCommit: false,
      quiet: true,
    });
    expect(mocks.readCommitInfo).toHaveBeenCalled();

    mocks.readCommitInfo.mockClear();
    mocks.readHeadCommit.mockClear();
    await cmdFinish({
      ctx,
      cwd: "/repo",
      taskIds: ["T-1"],
      author: "A",
      body: "Verified: this is long enough",
      result: "ok",
      breaking: false,
      force: false,
      commitFromComment: false,
      commitAllow: [],
      commitAutoAllow: false,
      commitAllowTasks: false,
      commitRequireClean: false,
      statusCommit: false,
      statusCommitAllow: [],
      statusCommitAutoAllow: false,
      statusCommitRequireClean: false,
      confirmStatusCommit: false,
      quiet: true,
    });
    expect(mocks.readHeadCommit).toHaveBeenCalled();
  });

  it("rejects finishing already DONE when --force is not set", async () => {
    const ctx = mkCtx();
    mocks.loadTaskFromContext.mockResolvedValue(
      mkTask({ id: "T-1", status: "DONE", tags: ["spike"] }),
    );

    const { cmdFinish } = await import("./finish.js");
    await expect(
      cmdFinish({
        ctx,
        cwd: "/repo",
        taskIds: ["T-1"],
        author: "A",
        body: "Verified: this is long enough",
        result: "ok",
        breaking: false,
        force: false,
        commitFromComment: false,
        commitAllow: [],
        commitAutoAllow: false,
        commitAllowTasks: false,
        commitRequireClean: false,
        statusCommit: false,
        statusCommitAllow: [],
        statusCommitAutoAllow: false,
        statusCommitRequireClean: false,
        confirmStatusCommit: false,
        quiet: true,
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
  });

  it("writes DONE status, then refreshes commit metadata from commitFromComment and amends in local mode", async () => {
    const writes: string[] = [];
    const writeSpy = vi.spyOn(process.stdout, "write").mockImplementation((chunk) => {
      writes.push(String(chunk));
      return true;
    });

    let currentTask = mkTask({
      id: "T-1",
      status: "DOING",
      tags: ["spike"],
      comments: [{ author: "X", body: "old" }],
    });
    const writeTask = vi.fn<(t: TaskData) => Promise<void>>((t) => {
      currentTask = { ...t };
      return Promise.resolve();
    });
    const storeUpdate = vi.fn((_taskId: string, updater: (task: TaskData) => TaskData) => {
      currentTask = updater(currentTask);
      return currentTask;
    });
    const storeGet = vi.fn(() => currentTask);
    const ctx = mkCtx({
      taskBackend: {
        id: "mock",
        listTasks: () => Promise.resolve([]),
        getTask: () => Promise.resolve(null),
        writeTask,
      } as TaskBackend,
    });
    // Unit test: avoid depending on the direct-mode work lock file (work-start direct-work.json).
    ctx.config.workflow_mode = "branch_pr";
    mocks.backendIsLocalFileBackend.mockReturnValue(true);
    mocks.getTaskStore.mockReturnValue({
      get: storeGet,
      update: storeUpdate,
    });
    const stageSpy = vi.spyOn(ctx.git, "stage").mockResolvedValue();
    const amendSpy = vi.spyOn(ctx.git, "commitAmendNoEdit").mockResolvedValue();

    const { cmdFinish } = await import("./finish.js");
    const rc = await cmdFinish({
      ctx,
      cwd: "/repo",
      taskIds: ["T-1"],
      author: "A",
      body: "Verified: this is long enough",
      result: "done",
      risk: "high",
      breaking: true,
      force: false,
      commitFromComment: true,
      commitEmoji: "✅",
      commitAllow: ["packages/agentplane"],
      commitAutoAllow: false,
      commitAllowTasks: true,
      commitRequireClean: false,
      statusCommit: false,
      statusCommitAllow: [],
      statusCommitAutoAllow: false,
      statusCommitRequireClean: false,
      confirmStatusCommit: false,
      quiet: false,
    });
    expect(rc).toBe(0);
    expect(storeUpdate).toHaveBeenCalledTimes(2);
    expect(currentTask.status).toBe("DONE");
    expect(currentTask.commit).toEqual({ hash: "new-hash", message: "✅ T-1 task: verified" });
    expect(currentTask.comments?.at(-1)).toEqual({
      author: "A",
      body: "Verified: this is long enough",
    });
    expect(currentTask.result_summary).toBe("done");
    expect(currentTask.risk_level).toBe("high");
    expect(currentTask.breaking).toBe(true);
    expect(currentTask.doc_updated_at).toBe("2026-02-09T00:00:00.000Z");

    expect(mocks.commitFromComment).toHaveBeenCalledTimes(1);
    const call = mocks.commitFromComment.mock.calls[0]?.[0] as { emoji?: string; taskId?: string };
    expect(call.taskId).toBe("T-1");
    expect(call.emoji).toBe("✅");
    expect(stageSpy).toHaveBeenCalledWith([".agentplane/tasks/T-1/README.md"]);
    expect(amendSpy).toHaveBeenCalledTimes(1);
    expect(writes.join("")).toContain("finished");

    stageSpy.mockRestore();
    amendSpy.mockRestore();
    writeSpy.mockRestore();
  });

  it("propagates E_VALIDATION when require_verify=true and task is not verified", async () => {
    const ctx = mkCtx();
    ctx.config.agents = {
      approvals: { require_plan: false, require_network: true, require_verify: true },
    };
    mocks.loadTaskFromContext.mockResolvedValue(mkTask({ id: "T-1", tags: ["code"] }));

    const { cmdFinish } = await import("./finish.js");
    await expect(
      cmdFinish({
        ctx,
        cwd: "/repo",
        taskIds: ["T-1"],
        author: "A",
        body: "Verified: this is long enough",
        result: "ok",
        breaking: false,
        force: false,
        commitFromComment: false,
        commitAllow: [],
        commitAutoAllow: false,
        commitAllowTasks: false,
        commitRequireClean: false,
        statusCommit: false,
        statusCommitAllow: [],
        statusCommitAutoAllow: false,
        statusCommitRequireClean: false,
        confirmStatusCommit: false,
        quiet: true,
      }),
    ).rejects.toMatchObject({ code: "E_VALIDATION" });
  });

  it("maps non-CliError failures as E_IO via backend error mapping", async () => {
    const ctx = mkCtx();
    mocks.loadTaskFromContext.mockResolvedValue(mkTask({ id: "T-1", tags: ["spike"] }));
    mocks.readHeadCommit.mockRejectedValue(new Error("boom"));

    const { cmdFinish } = await import("./finish.js");
    await expect(
      cmdFinish({
        ctx,
        cwd: "/repo",
        taskIds: ["T-1"],
        author: "A",
        body: "Verified: this is long enough",
        result: "ok",
        breaking: false,
        force: false,
        commitFromComment: false,
        commitAllow: [],
        commitAutoAllow: false,
        commitAllowTasks: false,
        commitRequireClean: false,
        statusCommit: false,
        statusCommitAllow: [],
        statusCommitAutoAllow: false,
        statusCommitRequireClean: false,
        confirmStatusCommit: false,
        quiet: true,
      }),
    ).rejects.toMatchObject({ code: "E_IO" });
  });
});
