import type { ResolvedProject } from "@agentplaneorg/core/project";
import { defaultConfig } from "@agentplaneorg/core/config";
import { ensureDocSections, setMarkdownSection } from "@agentplaneorg/core/tasks";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { TaskBackend, TaskData } from "../../backends/task-backend.js";
import type { CommandContext } from "../shared/task-backend.js";
import { GitContext } from "@agentplaneorg/core/git";
import type { TaskStorePatch } from "../shared/task-store.js";

const mocks = vi.hoisted(() => ({
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
  tryLookupExistingGithubPrByBranch: vi.fn(),
  generateAcr: vi.fn(),
  writeAcrFile: vi.fn(),
  checkTaskBlueprintSnapshotDrift: vi.fn(),
}));

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
vi.mock("../pr/internal/sync-github.js", () => ({
  tryLookupExistingGithubPrByBranch: mocks.tryLookupExistingGithubPrByBranch,
}));
vi.mock("../acr/acr.command.js", () => ({
  generateAcr: mocks.generateAcr,
  writeAcrFile: mocks.writeAcrFile,
}));
vi.mock("../blueprint/snapshot-artifact.js", () => ({
  checkTaskBlueprintSnapshotDrift: mocks.checkTaskBlueprintSnapshotDrift,
}));
vi.mock("@agentplaneorg/core/process", () => ({
  execFileAsync: mocks.execFileAsync,
}));
vi.mock("@agentplaneorg/core/git", async () => {
  const actualUnknown: unknown = await vi.importActual("@agentplaneorg/core/git");
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
vi.mock("./shared.js", async (importOriginal) => {
  const actualUnknown: unknown = await importOriginal();
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
    doc: [
      "## Summary",
      "Task summary",
      "",
      "## Scope",
      "In-scope files",
      "",
      "## Plan",
      "1. Implement",
      "",
      "## Risks",
      "Low",
      "",
      "## Verification",
      "BlueprintSnapshotRef:",
      "- state: current",
      "",
      "## Rollback Plan",
      "Revert commit",
    ].join("\n"),
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

describe("task finish validation", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
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
    mocks.tryLookupExistingGithubPrByBranch.mockReset();
    mocks.generateAcr.mockReset();
    mocks.writeAcrFile.mockReset();
    mocks.checkTaskBlueprintSnapshotDrift.mockReset();

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
    mocks.tryLookupExistingGithubPrByBranch.mockResolvedValue(null);
    mocks.generateAcr.mockResolvedValue({
      acrPath: "/repo/.agentplane/tasks/T-1/acr.json",
      record: { record_type: "agent_change_record" },
    });
    mocks.writeAcrFile.mockResolvedValue();
    mocks.checkTaskBlueprintSnapshotDrift.mockResolvedValue({
      path: "/repo/.agentplane/tasks/T-1/blueprint/resolved-snapshot.json",
      state: "current",
      previous: { digest: "d1", blueprintId: "code.branch_pr", route: [], errors: [] },
      current: { digest: "d1", blueprintId: "code.branch_pr", route: [] },
      routeChanged: false,
      safeCommand: "agentplane blueprint snapshot T-1",
    });
    mocks.commitFromComment.mockResolvedValue({
      hash: "new-hash",
      message: "✅ T-1 task: verified",
      staged: ["packages/agentplane"],
    });
    mocks.cmdCommit.mockResolvedValue(0);
    mocks.ensureReconciledBeforeMutation.mockResolvedValue();
  });

  it("rejects --commit-from-comment/--status-commit with multiple task ids", async () => {
    const { cmdFinish } = await import("./finish-command.js");
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
    const { cmdFinish } = await import("./finish-command.js");
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
    const { cmdFinish } = await import("./finish-command.js");
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

  it("rejects confirm-gated comment-driven finish before mutating task state", async () => {
    let currentTask = mkTask({
      id: "T-1",
      status: "DOING",
      tags: ["spike"],
    });
    const storePatch = vi.fn(
      async (_taskId: string, builder: (task: TaskData) => Promise<TaskStorePatch>) => {
        currentTask = applyStorePatch(currentTask, await builder(currentTask));
        return { changed: true, task: currentTask };
      },
    );
    const ctx = mkCtx();
    ctx.config.status_commit_policy = "confirm";
    mocks.backendIsLocalFileBackend.mockReturnValue(true);
    mocks.getTaskStore.mockReturnValue({
      get: vi.fn(() => currentTask),
      patch: storePatch,
    });

    const { cmdFinish } = await import("./finish-command.js");
    await expect(
      cmdFinish({
        ctx,
        cwd: "/repo",
        taskIds: ["T-1"],
        author: "A",
        body: "Verified: this is long enough",
        result: "done",
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

    expect(currentTask.status).toBe("DOING");
    expect(currentTask.commit ?? null).toBeNull();
    expect(storePatch).toHaveBeenCalledTimes(1);
    expect(mocks.commitFromComment).not.toHaveBeenCalled();
  });

  it("rejects DONE structured-finding finish without mutating the task README", async () => {
    const originalDoc = [
      "## Summary",
      "Task summary",
      "",
      "## Scope",
      "In-scope files",
      "",
      "## Plan",
      "1. Implement",
      "",
      "## Verification",
      "",
      "## Rollback Plan",
      "Revert commit",
      "",
      "## Findings",
      "",
    ].join("\n");
    let currentTask = mkTask({
      id: "T-1",
      status: "DONE",
      tags: ["code"],
      doc: originalDoc,
      verification: {
        state: "ok",
        updated_at: "2026-02-09T00:00:00.000Z",
        updated_by: "TESTER",
        note: "ok",
      },
      commit: { hash: "impl-hash", message: "feat: implement T-1" },
    });
    const storePatch = vi.fn(
      async (_taskId: string, builder: (task: TaskData) => Promise<TaskStorePatch>) => {
        currentTask = applyStorePatch(currentTask, await builder(currentTask));
        return { changed: true, task: currentTask };
      },
    );
    const ctx = mkCtx();
    mocks.backendIsLocalFileBackend.mockReturnValue(true);
    mocks.getTaskStore.mockReturnValue({
      get: vi.fn(() => currentTask),
      patch: storePatch,
    });

    const { cmdFinish } = await import("./finish-command.js");
    await expect(
      cmdFinish({
        ctx,
        cwd: "/repo",
        taskIds: ["T-1"],
        author: "INTEGRATOR",
        body: "Verified: do not mutate DONE task docs before validation rejects the retry.",
        result: "done",
        commit: "impl-hash",
        breaking: false,
        force: false,
        observation: "Observed partial closeout retry path.",
        impact: "Task docs mutated before finish rejected the retry.",
        resolution: "Validate DONE and force semantics before writing structured findings.",
        repoFixable: true,
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

    expect(currentTask.doc).toBe(originalDoc);
    expect(storePatch).toHaveBeenCalledTimes(1);
    expect(currentTask.comments ?? []).toHaveLength(0);
    expect(currentTask.events ?? []).toHaveLength(0);
    expect(mocks.cmdCommit).not.toHaveBeenCalled();
  });

  it("runs deterministic close commit when --close-commit is enabled", async () => {
    const ctx = mkCtx();
    mocks.loadTaskFromContext.mockResolvedValue(
      mkTask({
        id: "T-1",
        tags: ["meta"],
        commit: { hash: "impl-hash", message: "feat: implement T-1" },
      }),
    );

    const { cmdFinish } = await import("./finish-command.js");
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
    expect(mocks.ensureReconciledBeforeMutation).toHaveBeenCalledWith({
      ctx,
      command: "finish",
    });
  });

  it("rejects branch_pr close commit before mutating task state when other tracked files are dirty", async () => {
    const currentTask = mkTask({
      id: "T-1",
      status: "DOING",
      tags: ["code"],
      verification: { state: "ok", updated_at: "2026-02-09T00:00:00.000Z", updated_by: "A" },
      commit: { hash: "impl-hash", message: "feat: implement T-1" },
    });
    const storeMutate = vi.fn((id: string, mutate: (task: TaskData) => TaskStorePatch[]) => {
      const patches = mutate(currentTask);
      for (const patch of patches) Object.assign(currentTask, applyStorePatch(currentTask, patch));
      return { changed: patches.length > 0, task: currentTask };
    });
    mocks.getTaskStore.mockReturnValue({
      mutate: storeMutate,
    });
    mocks.backendIsLocalFileBackend.mockReturnValue(true);
    const ctx = mkCtx({
      config: {
        ...mkCtx().config,
        workflow_mode: "branch_pr",
      },
      git: {
        statusStagedPaths: vi.fn().mockResolvedValue([]),
        statusUnstagedTrackedPaths: vi.fn().mockResolvedValue([".agentplane/tasks/T-2/README.md"]),
        invalidateStatus: vi.fn(),
      } as unknown as CommandContext["git"],
    });

    const { cmdFinish } = await import("./finish-command.js");
    await expect(
      cmdFinish({
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
        quiet: true,
      }),
    ).rejects.toMatchObject({ code: "E_GIT" });

    expect(currentTask.status).toBe("DOING");
    expect(mocks.cmdCommit).not.toHaveBeenCalled();
  });

  it("rejects finish when blueprint snapshot evidence is stale", async () => {
    const ctx = mkCtx();
    mocks.loadTaskFromContext.mockResolvedValue(
      mkTask({
        id: "T-1",
        tags: ["code"],
        commit: { hash: "impl-hash", message: "feat: implement T-1" },
      }),
    );
    mocks.checkTaskBlueprintSnapshotDrift.mockResolvedValue({
      path: "/repo/.agentplane/tasks/T-1/blueprint/resolved-snapshot.json",
      state: "stale",
      previous: { digest: "old", blueprintId: "code.branch_pr", route: [], errors: [] },
      current: { digest: "new", blueprintId: "code.branch_pr", route: [] },
      routeChanged: false,
      safeCommand: "agentplane blueprint snapshot T-1",
    });

    const { cmdFinish } = await import("./finish-command.js");
    await expect(
      cmdFinish({
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
        quiet: true,
      }),
    ).rejects.toMatchObject({ code: "E_VALIDATION" });
    expect(mocks.cmdCommit).not.toHaveBeenCalled();
  });

  it("rejects finish when verification did not record a blueprint snapshot ref", async () => {
    const ctx = mkCtx();
    mocks.loadTaskFromContext.mockResolvedValue(
      mkTask({
        id: "T-1",
        tags: ["code"],
        doc: [
          "## Summary",
          "Task summary",
          "",
          "## Scope",
          "In-scope files",
          "",
          "## Plan",
          "1. Implement",
          "",
          "## Verification",
          "Verified without a snapshot reference.",
          "",
          "## Rollback Plan",
          "Revert commit",
        ].join("\n"),
        commit: { hash: "impl-hash", message: "feat: implement T-1" },
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
        quiet: true,
      }),
    ).rejects.toMatchObject({ code: "E_VALIDATION" });
    expect(mocks.cmdCommit).not.toHaveBeenCalled();
  });

  it("auto-runs deterministic close commit by default in direct mode with local backend", async () => {
    const ctx = mkCtx();
    ctx.config.workflow_mode = "direct";
    const task = mkTask({
      id: "T-1",
      tags: ["meta"],
      commit: { hash: "impl-hash", message: "feat: implement T-1" },
    });
    const store = {
      get: vi.fn().mockResolvedValue(task),
      patch: vi
        .fn()
        .mockImplementation(
          async (_taskId: string, builder: (current: TaskData) => Promise<TaskStorePatch>) => {
            applyStorePatch(task, await builder(task));
            return { changed: true, task };
          },
        ),
    };
    mocks.backendIsLocalFileBackend.mockReturnValue(true);
    mocks.getTaskStore.mockReturnValue(store);

    const { cmdFinish } = await import("./finish-command.js");
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
      quiet: true,
    });

    expect(mocks.cmdCommit).toHaveBeenCalledWith(
      expect.objectContaining({
        taskId: "T-1",
        close: true,
        closeUnstageOthers: false,
      }),
    );
  });

  it("auto-runs deterministic close commit by default in direct mode with a projection-backed backend", async () => {
    const task = mkTask({
      id: "T-1",
      tags: ["meta"],
      commit: { hash: "impl-hash", message: "feat: implement T-1" },
    });
    const ctx = mkCtx({
      taskBackend: {
        id: "redmine",
        capabilities: {
          canonical_source: "remote",
          projection: "cache",
          projection_read_mode: "native",
          reads_from_projection_by_default: true,
          writes_task_readmes: true,
          supports_task_revisions: false,
          supports_revision_guarded_writes: false,
          may_access_network_on_read: false,
          may_access_network_on_write: true,
          supports_projection_refresh: true,
          supports_push_sync: true,
          supports_snapshot_export: true,
        },
        listTasks: () => Promise.resolve([]),
        getTask: () => Promise.resolve(task),
        writeTask: () => Promise.resolve(),
      } as TaskBackend,
    });
    ctx.config.workflow_mode = "direct";
    mocks.loadTaskFromContext.mockResolvedValue(task);

    const { cmdFinish } = await import("./finish-command.js");
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
      quiet: true,
    });

    expect(mocks.cmdCommit).toHaveBeenCalledWith(
      expect.objectContaining({
        taskId: "T-1",
        close: true,
        closeUnstageOthers: false,
      }),
    );
  });

  it("auto-materializes a task-close branch by default in branch_pr mode", async () => {
    const ctx = mkCtx();
    ctx.config.workflow_mode = "branch_pr";
    const task = mkTask({
      id: "T-1",
      tags: ["meta"],
      commit: { hash: "impl-hash", message: "feat: implement T-1" },
    });
    const store = {
      get: vi.fn().mockResolvedValue(task),
      patch: vi
        .fn()
        .mockImplementation(
          async (_taskId: string, builder: (current: TaskData) => Promise<TaskStorePatch>) => {
            applyStorePatch(task, await builder(task));
            return { changed: true, task };
          },
        ),
    };
    mocks.backendIsLocalFileBackend.mockReturnValue(true);
    mocks.getTaskStore.mockReturnValue(store);

    const { cmdFinish } = await import("./finish-command.js");
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
      quiet: true,
    });

    expect(mocks.execFileAsync).toHaveBeenCalledWith(
      "git",
      ["checkout", "-b", "task-close/T-1/base-head-sh"],
      expect.any(Object),
    );
    expect(mocks.execFileAsync).toHaveBeenCalledWith(
      "git",
      ["checkout", "main"],
      expect.any(Object),
    );
    expect(mocks.cmdCommit).toHaveBeenCalledWith(
      expect.objectContaining({
        taskId: "T-1",
        close: true,
        allowBase: true,
        closeStageTaskArtifacts: true,
      }),
    );
  });

  it("skips branch_pr task artifact writes when hosted close is already recorded on origin main", async () => {
    const ctx = mkCtx();
    ctx.config.workflow_mode = "branch_pr";
    ctx.config.acr.enabled = true;
    ctx.config.acr.write_on_finish = true;
    const store = {
      get: vi
        .fn()
        .mockResolvedValue(
          mkTask({ id: "T-1", commit: { hash: "impl-hash", message: "feat: implement T-1" } }),
        ),
      patch: vi.fn().mockResolvedValue({ changed: true, task: mkTask({ id: "T-1" }) }),
    };
    mocks.backendIsLocalFileBackend.mockReturnValue(true);
    mocks.getTaskStore.mockReturnValue(store);
    mocks.execFileAsync.mockImplementation((...args: unknown[]) => {
      const [, gitArgs] = args as [string, string[]];
      if (Array.isArray(gitArgs) && gitArgs[0] === "rev-parse" && gitArgs[1] === "HEAD") {
        return Promise.resolve({ stdout: "base-head-sha\n", stderr: "" });
      }
      if (Array.isArray(gitArgs) && gitArgs[0] === "log" && gitArgs[1] === "origin/main") {
        return Promise.resolve({
          stdout: "✅ T-1 close: Merged via PR #123. (T-1) [code]\n",
          stderr: "",
        });
      }
      return Promise.resolve({ stdout: "", stderr: "" });
    });

    const { cmdFinish } = await import("./finish-command.js");
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
      quiet: true,
    });

    expect(store.patch).not.toHaveBeenCalled();
    expect(mocks.generateAcr).not.toHaveBeenCalled();
    expect(mocks.writeAcrFile).not.toHaveBeenCalled();
    expect(mocks.cmdCommit).not.toHaveBeenCalledWith(
      expect.objectContaining({
        taskId: "T-1",
        close: true,
      }),
    );
  });

  it("suppresses default direct close commit with --no-close-commit", async () => {
    const ctx = mkCtx();
    ctx.config.workflow_mode = "direct";
    const task = mkTask({
      id: "T-1",
      tags: ["meta"],
      commit: { hash: "impl-hash", message: "feat: implement T-1" },
    });
    const store = {
      get: vi.fn().mockResolvedValue(task),
      patch: vi
        .fn()
        .mockImplementation(
          async (_taskId: string, builder: (current: TaskData) => Promise<TaskStorePatch>) => {
            applyStorePatch(task, await builder(task));
            return { changed: true, task };
          },
        ),
    };
    mocks.backendIsLocalFileBackend.mockReturnValue(true);
    mocks.getTaskStore.mockReturnValue(store);

    const { cmdFinish } = await import("./finish-command.js");
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
      noCloseCommit: true,
      quiet: true,
    });

    expect(mocks.cmdCommit).not.toHaveBeenCalled();
  });

  it("rejects commit/status commit flags when primary task id is empty", async () => {
    const { cmdFinish } = await import("./finish-command.js");
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
    const { cmdFinish } = await import("./finish-command.js");
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

    const { cmdFinish } = await import("./finish-command.js");
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

  it("explains how to choose a commit when finish lacks commit metadata", async () => {
    const ctx = mkCtx();
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
    ).rejects.toThrow(/tasks_missing_commit=T-1[\s\S]*git log --oneline --decorate -n 10/);
  });

  it("uses readCommitInfo only when --commit is provided", async () => {
    const ctx = mkCtx();
    mocks.loadTaskFromContext.mockResolvedValue(
      mkTask({
        id: "T-1",
        status: "DOING",
        tags: ["code"],
        commit: { hash: "existing-hash", message: "existing" },
      }),
    );

    const { cmdFinish } = await import("./finish-command.js");
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
    expect(mocks.readCommitInfo).not.toHaveBeenCalled();
  });

  it("refreshes ACR from existing task commit metadata", async () => {
    const ctx = mkCtx();
    ctx.config.acr.enabled = true;
    ctx.config.acr.write_on_finish = true;
    mocks.loadTaskFromContext.mockResolvedValue(
      mkTask({
        id: "T-1",
        status: "DOING",
        tags: ["code"],
        commit: { hash: "existing-hash", message: "existing" },
      }),
    );

    const { cmdFinish } = await import("./finish-command.js");
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

    expect(mocks.generateAcr).toHaveBeenCalledWith(
      expect.objectContaining({
        taskId: "T-1",
        workCommit: "existing-hash",
        write: true,
        refresh: true,
      }),
    );
    expect(mocks.writeAcrFile).toHaveBeenCalledWith(
      expect.objectContaining({
        acrPath: "/repo/.agentplane/tasks/T-1/acr.json",
        refresh: true,
      }),
    );
  });

  it("rejects combining --commit-from-comment with --status-commit", async () => {
    const ctx = mkCtx();
    mocks.loadTaskFromContext.mockResolvedValue(mkTask({ id: "T-1", status: "DOING" }));

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
        commitAllow: ["packages/agentplane"],
        commitAutoAllow: false,
        commitAllowTasks: true,
        commitRequireClean: false,
        statusCommit: true,
        statusCommitAllow: ["packages/agentplane"],
        statusCommitAutoAllow: false,
        statusCommitRequireClean: false,
        confirmStatusCommit: false,
        quiet: true,
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
  });

  it("rejects finishing already DONE when --force is not set", async () => {
    const ctx = mkCtx();
    mocks.loadTaskFromContext.mockResolvedValue(
      mkTask({ id: "T-1", status: "DONE", tags: ["spike"] }),
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
    ).rejects.toMatchObject({ code: "E_USAGE" });
  });
});
