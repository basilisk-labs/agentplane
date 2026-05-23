import type { ResolvedProject } from "@agentplaneorg/core/project";
import { defaultConfig } from "@agentplaneorg/core/config";
import { ensureDocSections, setMarkdownSection } from "@agentplaneorg/core/tasks";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { TaskBackend, TaskData } from "../../backends/task-backend.js";
import { exitCodeForError } from "../../cli/exit-codes.js";
import { CliError } from "../../shared/errors.js";
import type { CommandContext } from "../shared/task-backend.js";
import { GitContext } from "@agentplaneorg/core/git";
import type { TaskStorePatch } from "../shared/task-store.js";

function makeMocks() {
  return {
    commitFromComment: vi.fn(),
    cmdCommit: vi.fn(),
    ensureReconciledBeforeMutation: vi.fn(),
    loadCommandContext: vi.fn(),
    loadTaskFromContext: vi.fn(),
    backendIsLocalFileBackend: vi.fn(),
    getTaskStore: vi.fn(),
    readCommitInfo: vi.fn(),
    nowIso: vi.fn(),
    resolveBaseBranch: vi.fn(),
    execFileAsync: vi.fn(),
    gitBranchExists: vi.fn(),
    gitCurrentBranch: vi.fn(),
    resolveGitIndexLockInfo: vi.fn(),
  };
}

if (typeof (vi as unknown as { hoisted?: unknown }).hoisted !== "function") {
  (vi as unknown as { hoisted: <T>(factory: () => T) => T }).hoisted = (factory) => factory();
}

const mocks = vi.hoisted(makeMocks);
const describeCompatible = typeof process.versions.bun === "string" ? describe.skip : describe;

vi.mock("../guard/impl/comment-commit.js", () => ({
  commitFromComment: mocks.commitFromComment,
}));
vi.mock("../guard/impl/commit.js", () => ({
  cmdCommit: mocks.cmdCommit,
}));
vi.mock("../shared/reconcile-check.js", () => ({
  ensureReconciledBeforeMutation: mocks.ensureReconciledBeforeMutation,
}));
vi.mock("../shared/task-backend.js", () => ({
  backendUsesLocalTaskStore: mocks.backendIsLocalFileBackend,
  loadCommandContext: mocks.loadCommandContext,
  loadTaskFromContext: mocks.loadTaskFromContext,
}));
vi.mock("../shared/git-ops.js", () => ({
  gitBranchExists: mocks.gitBranchExists,
  gitCurrentBranch: mocks.gitCurrentBranch,
}));
vi.mock("@agentplaneorg/core/process", () => ({
  execFileAsync: mocks.execFileAsync,
}));
vi.mock("../../shared/git-mutation.js", async (importOriginal?: () => Promise<unknown>) => {
  const actualUnknown: unknown = typeof importOriginal === "function" ? await importOriginal() : {};
  const actual =
    actualUnknown && typeof actualUnknown === "object"
      ? (actualUnknown as Record<string, unknown>)
      : {};
  return {
    ...actual,
    resolveGitIndexLockInfo: mocks.resolveGitIndexLockInfo,
  };
});
vi.mock("@agentplaneorg/core/git", async () => {
  const actualUnknown: unknown =
    typeof (vi as unknown as { importActual?: unknown }).importActual === "function"
      ? await vi.importActual("@agentplaneorg/core/git")
      : {};
  const actual =
    actualUnknown && typeof actualUnknown === "object"
      ? (actualUnknown as Record<string, unknown>)
      : {};
  return {
    ...actual,
    gitEnv: () => ({}),
    resolveBaseBranch: mocks.resolveBaseBranch,
  };
});
vi.mock("../shared/task-store.js", async (importOriginal?: () => Promise<unknown>) => {
  const actualUnknown: unknown = typeof importOriginal === "function" ? await importOriginal() : {};
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
vi.mock("./shared.js", async (importOriginal?: () => Promise<unknown>) => {
  const actualUnknown: unknown = typeof importOriginal === "function" ? await importOriginal() : {};
  const actual =
    actualUnknown && typeof actualUnknown === "object"
      ? (actualUnknown as Record<string, unknown>)
      : {};
  return {
    ...actual,
    readCommitInfo: mocks.readCommitInfo,
    nowIso: mocks.nowIso,
  };
});

function mkTask(overrides: Partial<TaskData>): TaskData {
  const qualityReviewSha = overrides.commit?.hash ?? "hc";
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
    quality_review: {
      state: "pass",
      updated_at: "2026-02-09T00:00:00.000Z",
      updated_by: "EVALUATOR",
      note: "Quality gate passed",
      evaluated_sha: qualityReviewSha,
      blueprint_digest: null,
      evidence_refs: [".agentplane/tasks/T-1/quality/run/quality-report.json"],
      findings: ["Reviewed scope, diff, verification evidence, and residual risk."],
    },
    doc: "## Summary\nTask summary\n\n## Scope\nIn-scope files\n\n## Plan\n1. Implement\n\n## Risks\nLow\n\n## Verification\n\n## Rollback Plan\nRevert commit",
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
    capabilities: {
      canonical_source: "local",
      projection: "canonical",
      projection_read_mode: "native",
      reads_from_projection_by_default: true,
      writes_task_readmes: true,
      supports_task_revisions: true,
      supports_revision_guarded_writes: true,
      may_access_network_on_read: false,
      may_access_network_on_write: false,
      supports_projection_refresh: false,
      supports_push_sync: false,
      supports_snapshot_export: true,
    },
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
    git: {
      ...new GitContext({ gitRoot: "/repo" }),
      statusStagedPaths: vi.fn().mockResolvedValue([]),
      statusUnstagedTrackedPaths: vi.fn().mockResolvedValue([]),
      invalidateStatus: vi.fn(),
    } as unknown as CommandContext["git"],
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

describeCompatible("task finish state and errors", () => {
  afterEach(() => {
    vi.unstubAllEnvs?.();
  });

  beforeEach(() => {
    mocks.commitFromComment.mockReset();
    mocks.cmdCommit.mockReset();
    mocks.ensureReconciledBeforeMutation.mockReset();
    mocks.loadCommandContext.mockReset();
    mocks.loadTaskFromContext.mockReset();
    mocks.backendIsLocalFileBackend.mockReset();
    mocks.getTaskStore.mockReset();
    mocks.readCommitInfo.mockReset();
    mocks.nowIso.mockReset();
    mocks.resolveBaseBranch.mockReset();
    mocks.execFileAsync.mockReset();
    mocks.gitBranchExists.mockReset();
    mocks.gitCurrentBranch.mockReset();
    mocks.resolveGitIndexLockInfo.mockReset();

    mocks.backendIsLocalFileBackend.mockReturnValue(false);
    mocks.readCommitInfo.mockResolvedValue({ hash: "hc", message: "mc" });
    mocks.nowIso.mockReturnValue("2026-02-09T00:00:00.000Z");
    mocks.resolveBaseBranch.mockResolvedValue("main");
    mocks.execFileAsync.mockImplementation((...args: unknown[]) => {
      const [, gitArgs] = args as [string, string[]];
      if (Array.isArray(gitArgs) && gitArgs[0] === "rev-parse" && gitArgs[1] === "HEAD") {
        return Promise.resolve({ stdout: "base-head-sha\n", stderr: "" });
      }
      return Promise.resolve({ stdout: "", stderr: "" });
    });
    mocks.gitBranchExists.mockResolvedValue(false);
    mocks.gitCurrentBranch.mockResolvedValue("main");
    mocks.resolveGitIndexLockInfo.mockResolvedValue(null);
    mocks.commitFromComment.mockResolvedValue({
      hash: "new-hash",
      message: "✅ T-1 task: verified",
      staged: ["packages/agentplane"],
    });
    mocks.cmdCommit.mockResolvedValue(0);
    mocks.ensureReconciledBeforeMutation.mockResolvedValue();
  });

  it("rejects implicit HEAD fallback when deterministic close commit lacks implementation metadata", async () => {
    const ctx = mkCtx();
    ctx.config.workflow_mode = "direct";
    mocks.backendIsLocalFileBackend.mockReturnValue(true);
    mocks.getTaskStore.mockReturnValue({
      get: vi.fn(() => mkTask({ id: "T-1", status: "DOING", tags: ["docs"] })),
      patch: vi.fn(
        async (_taskId: string, builder: (task: TaskData) => Promise<TaskStorePatch>) => ({
          changed: true,
          task: applyStorePatch(
            mkTask({ id: "T-1", status: "DOING", tags: ["docs"] }),
            await builder(mkTask({ id: "T-1", status: "DOING", tags: ["docs"] })),
          ),
        }),
      ),
    });

    const { cmdFinish } = await import("./finish-command.js");
    await expect(
      cmdFinish({
        ctx,
        cwd: "/repo",
        taskIds: ["T-1"],
        author: "A",
        body: "Verified: close commit path should require deterministic commit provenance.",
        result: "close-commit-needs-commit",
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

  it("rejects direct close commit before mutating task state when the index is staged", async () => {
    const task = mkTask({
      id: "T-1",
      status: "DOING",
      tags: ["docs"],
      commit: { hash: "impl-hash", message: "feat: implement T-1" },
    });
    const storeMutate = vi.fn((id: string, mutate: (task: TaskData) => TaskStorePatch[]) => {
      const patches = mutate(task);
      for (const patch of patches) Object.assign(task, applyStorePatch(task, patch));
      return { changed: patches.length > 0, task };
    });
    const store = { mutate: storeMutate };
    mocks.backendIsLocalFileBackend.mockReturnValue(true);
    mocks.getTaskStore.mockReturnValue(store);
    mocks.loadTaskFromContext.mockResolvedValue(task);
    const ctx = mkCtx();
    ctx.config.workflow_mode = "direct";
    ctx.git = {
      statusStagedPaths: vi.fn().mockResolvedValue([".agentplane/tasks/T-2/README.md"]),
      statusUnstagedTrackedPaths: vi.fn().mockResolvedValue([]),
      invalidateStatus: vi.fn(),
    } as unknown as CommandContext["git"];

    const { cmdFinish } = await import("./finish-command.js");
    await expect(
      cmdFinish({
        ctx,
        cwd: "/repo",
        taskIds: ["T-1"],
        author: "A",
        body: "Verified: direct finish should reject staged index before task mutation.",
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
        quiet: true,
      }),
    ).rejects.toMatchObject({
      code: "E_GIT",
      context: {
        reason_code: "git_close_commit_dirty_index",
        staged_paths: [".agentplane/tasks/T-2/README.md"],
      },
    });

    expect(storeMutate).toHaveBeenCalledTimes(1);
    expect(task.status).toBe("DOING");
    expect(mocks.cmdCommit).not.toHaveBeenCalled();
  });

  it("preserves fresher README content and comments when store update sees newer task data", async () => {
    const staleTask = mkTask({
      id: "T-1",
      status: "DOING",
      tags: ["code"],
      comments: [{ author: "OLD", body: "stale comment" }],
      doc: [
        "## Summary",
        "Stale summary",
        "",
        "## Scope",
        "scope",
        "",
        "## Plan",
        "plan",
        "",
        "## Risks",
        "Low",
        "",
        "## Verification",
        "done",
        "",
        "## Rollback Plan",
        "rollback",
      ].join("\n"),
    });
    let currentTask = mkTask({
      id: "T-1",
      status: "DOING",
      tags: ["code"],
      commit: { hash: "impl-hash", message: "feat: implement T-1" },
      comments: [{ author: "CURRENT", body: "fresh comment" }],
      doc: [
        "## Summary",
        "Concurrent summary",
        "",
        "## Scope",
        "scope",
        "",
        "## Plan",
        "plan",
        "",
        "## Risks",
        "Low",
        "",
        "## Verification",
        "done",
        "",
        "## Rollback Plan",
        "rollback",
      ].join("\n"),
    });
    const store = {
      get: vi.fn().mockResolvedValue(staleTask),
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
    ctx.config.workflow_mode = "branch_pr";
    ctx.taskBackend.capabilities.writes_task_readmes = false;
    ctx.taskBackend.capabilities.writes_task_readmes = false;
    mocks.backendIsLocalFileBackend.mockReturnValue(true);
    mocks.getTaskStore.mockReturnValue(store);

    const { cmdFinish } = await import("./finish-command.js");
    const rc = await cmdFinish({
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
      quiet: true,
    });

    expect(rc).toBe(0);
    expect(store.get).not.toHaveBeenCalled();
    expect(store.patch).toHaveBeenCalledTimes(2);
    expect(currentTask.status).toBe("DONE");
    expect(currentTask.doc).toContain("## Summary\nConcurrent summary");
    expect(currentTask.comments).toEqual([
      { author: "CURRENT", body: "fresh comment" },
      { author: "A", body: "Verified: this is long enough" },
    ]);
    expect(currentTask.comments).not.toEqual(
      expect.arrayContaining([{ author: "OLD", body: "stale comment" }]),
    );
  });

  it("cmdFinish validates the current local task state instead of a stale initial snapshot", async () => {
    const staleTask = mkTask({
      id: "T-1",
      status: "DOING",
      tags: ["code"],
      verification: { state: "pending", updated_at: null, updated_by: null, note: null },
    });
    let currentTask = mkTask({
      id: "T-1",
      status: "DOING",
      tags: ["code"],
      commit: { hash: "impl-hash", message: "feat: implement T-1" },
      verification: {
        state: "ok",
        updated_at: "2026-02-09T00:00:00.000Z",
        updated_by: "TESTER",
        note: "ok",
      },
    });
    const store = {
      get: vi.fn().mockResolvedValue(staleTask),
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
    ctx.config.agents = {
      approvals: { require_plan: false, require_network: true, require_verify: true },
    };
    mocks.backendIsLocalFileBackend.mockReturnValue(true);
    mocks.getTaskStore.mockReturnValue(store);

    const { cmdFinish } = await import("./finish-command.js");
    const rc = await cmdFinish({
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

    expect(rc).toBe(0);
    expect(store.get).not.toHaveBeenCalled();
    expect(store.patch).toHaveBeenCalledTimes(2);
    expect(currentTask.status).toBe("DONE");
  });

  it("rejects branch_pr finish --commit-from-comment before local store task mutation", async () => {
    const staleTask = mkTask({
      id: "T-1",
      status: "TODO",
      tags: ["meta"],
    });
    let currentTask = mkTask({
      id: "T-1",
      status: "DOING",
      tags: ["code"],
    });
    const store = {
      get: vi.fn().mockResolvedValue(staleTask),
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
    ctx.config.workflow_mode = "branch_pr";
    ctx.taskBackend.capabilities.writes_task_readmes = false;
    ctx.taskBackend.capabilities.writes_task_readmes = false;
    mocks.backendIsLocalFileBackend.mockReturnValue(true);
    mocks.getTaskStore.mockReturnValue(store);

    const { cmdFinish } = await import("./finish-command.js");
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
        quiet: true,
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });

    expect(store.patch).not.toHaveBeenCalled();
    expect(currentTask.status).toBe("DOING");
    expect(mocks.commitFromComment).not.toHaveBeenCalled();
  });

  it("propagates E_VALIDATION when require_verify=true and task is not verified", async () => {
    const ctx = mkCtx();
    ctx.config.agents = {
      approvals: { require_plan: false, require_network: true, require_verify: true },
    };
    mocks.loadTaskFromContext.mockResolvedValue(mkTask({ id: "T-1", tags: ["code"] }));

    const { cmdFinish } = await import("./finish-command.js");
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

  it("fails when required agent-filled doc sections are empty", async () => {
    const ctx = mkCtx();
    ctx.config.tasks.doc.required_sections = [
      "Summary",
      "Scope",
      "Plan",
      "Verification",
      "Verify Steps",
      "Notes",
    ];
    mocks.loadTaskFromContext.mockResolvedValue(
      mkTask({
        id: "T-1",
        tags: ["spike"],
        doc: [
          "## Summary",
          "x",
          "",
          "## Scope",
          "",
          "",
          "## Plan",
          "do",
          "",
          "## Verify Steps",
          "Run checks",
          "",
          "## Notes",
          "n/a",
        ].join("\n"),
      }),
    );

    const { cmdFinish } = await import("./finish-command.js");
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
    mocks.readCommitInfo.mockRejectedValue(new Error("boom"));

    const { cmdFinish } = await import("./finish-command.js");
    await expect(
      cmdFinish({
        ctx,
        cwd: "/repo",
        taskIds: ["T-1"],
        author: "A",
        body: "Verified: this is long enough",
        result: "ok",
        commit: "abc123",
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

  it("fails early when reconcile guard blocks mutation", async () => {
    const ctx = mkCtx();
    mocks.ensureReconciledBeforeMutation.mockRejectedValue(
      new CliError({
        exitCode: exitCodeForError("E_VALIDATION"),
        code: "E_VALIDATION",
        message: "reconcile blocked",
      }),
    );

    const { cmdFinish } = await import("./finish-command.js");
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
});
