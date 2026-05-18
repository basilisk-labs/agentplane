import type { ResolvedProject } from "@agentplaneorg/core/project";
import { defaultConfig } from "@agentplaneorg/core/config";
import { ensureDocSections, setMarkdownSection } from "@agentplaneorg/core/tasks";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { TaskBackend, TaskData } from "../../backends/task-backend.js";
import type { CommandContext } from "../shared/task-backend.js";
import type { GitContext } from "@agentplaneorg/core/git";
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
      statusStagedPaths: vi.fn().mockResolvedValue([]),
      statusUnstagedTrackedPaths: vi.fn().mockResolvedValue([]),
      commit: vi.fn().mockResolvedValue(void 0),
      invalidateStatus: vi.fn(),
      headCommit: vi.fn().mockResolvedValue("base-head-sha"),
    } as unknown as GitContext,
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

describe("task finish close-tail", () => {
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
    mocks.commitFromComment.mockResolvedValue({
      hash: "new-hash",
      message: "✅ T-1 task: verified",
      staged: ["packages/agentplane"],
    });
    mocks.cmdCommit.mockResolvedValue(0);
    mocks.ensureReconciledBeforeMutation.mockResolvedValue();
  });

  it("rejects branch_pr finish --commit-from-comment before DONE metadata and close-tail commits", async () => {
    const writes: string[] = [];
    const writeSpy = vi.spyOn(process.stdout, "write").mockImplementation((chunk) => {
      writes.push(String(chunk));
      return true;
    });
    const traceWrites: string[] = [];
    const traceSpy = vi.spyOn(process.stderr, "write").mockImplementation((chunk) => {
      traceWrites.push(String(chunk));
      return true;
    });
    vi.stubEnv("AGENTPLANE_TRACE", "1");

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
    const storePatch = vi.fn(
      async (_taskId: string, builder: (task: TaskData) => Promise<TaskStorePatch>) => {
        currentTask = applyStorePatch(currentTask, await builder(currentTask));
        return { changed: true, task: currentTask };
      },
    );
    const storeGet = vi.fn(() => currentTask);
    const ctx = mkCtx({
      taskBackend: {
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
        writeTask,
      } as TaskBackend,
    });
    // Unit test: avoid depending on the direct-mode work lock file (work-start direct-work.json).
    ctx.config.workflow_mode = "branch_pr";
    mocks.backendIsLocalFileBackend.mockReturnValue(true);
    mocks.getTaskStore.mockReturnValue({
      get: storeGet,
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
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });

    expect(storeGet).not.toHaveBeenCalled();
    expect(storePatch).not.toHaveBeenCalled();
    expect(currentTask.status).toBe("DOING");
    expect(mocks.commitFromComment).not.toHaveBeenCalled();
    expect(mocks.cmdCommit).not.toHaveBeenCalled();
    expect(writes.join("")).not.toContain("creating commit from verification comment");
    expect(traceWrites.join("")).toContain('"event":"finish_failed"');
    writeSpy.mockRestore();
    traceSpy.mockRestore();
  });

  it("prints status-commit progress before the finish status commit runs", async () => {
    const writes: string[] = [];
    const writeSpy = vi.spyOn(process.stdout, "write").mockImplementation((chunk) => {
      writes.push(String(chunk));
      return true;
    });

    const ctx = mkCtx();
    mocks.loadTaskFromContext.mockResolvedValue(
      mkTask({ id: "T-1", status: "DOING", tags: ["docs"] }),
    );

    const { cmdFinish } = await import("./finish-command.js");
    const rc = await cmdFinish({
      ctx,
      cwd: "/repo",
      taskIds: ["T-1"],
      author: "A",
      body: "Verified: status commit progress should be visible in stdout.",
      result: "finish-status-commit-progress",
      commit: "abc123",
      breaking: false,
      force: false,
      commitFromComment: false,
      commitAllow: [],
      commitAutoAllow: false,
      commitAllowTasks: false,
      commitRequireClean: false,
      statusCommit: true,
      statusCommitAllow: ["packages/agentplane"],
      statusCommitAutoAllow: false,
      statusCommitRequireClean: false,
      confirmStatusCommit: false,
      quiet: false,
    });

    expect(rc).toBe(0);
    expect(mocks.commitFromComment).toHaveBeenCalledTimes(1);
    expect(writes.join("")).toContain("creating status commit");
    expect(writes.join("")).toContain("finished");

    writeSpy.mockRestore();
  });

  it("prints incident registry unchanged when finish does not promote external findings", async () => {
    const writes: string[] = [];
    const writeSpy = vi.spyOn(process.stdout, "write").mockImplementation((chunk) => {
      writes.push(String(chunk));
      return true;
    });

    const ctx = mkCtx();
    ctx.config.workflow_mode = "branch_pr";
    mocks.loadTaskFromContext.mockResolvedValue(
      mkTask({
        id: "T-1",
        status: "DOING",
        tags: ["docs"],
        commit: { hash: "abc123", message: "feat: T-1" },
      }),
    );
    mocks.readCommitInfo.mockResolvedValue({ hash: "abc123", message: "feat: T-1" });

    const { cmdFinish } = await import("./finish-command.js");
    const rc = await cmdFinish({
      ctx,
      cwd: "/repo",
      taskIds: ["T-1"],
      author: "A",
      body: "Verified: registry should stay unchanged.",
      result: "no incident promotion",
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
      quiet: false,
    });

    expect(rc).toBe(0);
    expect(writes.join("")).toContain("plain finish body/result stayed task-local");
    expect(writes.join("")).toContain("did not update incidents.md");
    expect(writes.join("")).toContain("--observation, --impact, --resolution, and --promote");
    expect(writes.join("")).toContain("agentplane task findings add T-1");
    expect(writes.join("")).toContain("--promote --external");
    expect(writes.join("")).toContain("finished");

    writeSpy.mockRestore();
  });

  it("explains when Findings has plain text but no structured incident blocks", async () => {
    const writes: string[] = [];
    const writeSpy = vi.spyOn(process.stdout, "write").mockImplementation((chunk) => {
      writes.push(String(chunk));
      return true;
    });

    const ctx = mkCtx();
    ctx.config.workflow_mode = "branch_pr";
    mocks.loadTaskFromContext.mockResolvedValue(
      mkTask({
        id: "T-PLAIN",
        status: "DOING",
        tags: ["workflow"],
        commit: { hash: "abc999", message: "feat: T-PLAIN" },
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
          "",
          "## Rollback Plan",
          "Revert commit",
          "",
          "## Findings",
          "Operators noted that incidents.md stayed unchanged after finish, but no structured block was recorded.",
        ].join("\n"),
      }),
    );
    mocks.readCommitInfo.mockResolvedValue({ hash: "abc999", message: "feat: T-PLAIN" });

    const { cmdFinish } = await import("./finish-command.js");
    const rc = await cmdFinish({
      ctx,
      cwd: "/repo",
      taskIds: ["T-PLAIN"],
      author: "A",
      body: "Verified: plain Findings text should explain the no-op reason.",
      result: "incident diagnostics",
      commit: "abc999",
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
      quiet: false,
    });

    expect(rc).toBe(0);
    expect(writes.join("")).toContain("plain Findings text stays task-local");
    expect(writes.join("")).toContain("does not update incidents.md");
    expect(writes.join("")).toContain("Observation/Impact/Resolution");

    writeSpy.mockRestore();
  });

  it("prints skipped structured finding diagnostics when finish parses findings but does not promote them", async () => {
    const writes: string[] = [];
    const writeSpy = vi.spyOn(process.stdout, "write").mockImplementation((chunk) => {
      writes.push(String(chunk));
      return true;
    });

    const ctx = mkCtx();
    ctx.config.workflow_mode = "branch_pr";
    mocks.loadTaskFromContext.mockResolvedValue(
      mkTask({
        id: "T-2",
        status: "DOING",
        tags: ["workflow"],
        commit: { hash: "def456", message: "feat: T-2" },
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
          "",
          "## Rollback Plan",
          "Revert commit",
          "",
          "## Findings",
          "- Observation: transient GitHub transport failures forced manual retries.",
          "  Impact: operators had to repeat the same reconcile loop.",
          "  Resolution: move the flaky path onto resilient polling.",
        ].join("\n"),
      }),
    );
    mocks.readCommitInfo.mockResolvedValue({ hash: "def456", message: "feat: T-2" });

    const { cmdFinish } = await import("./finish-command.js");
    const rc = await cmdFinish({
      ctx,
      cwd: "/repo",
      taskIds: ["T-2"],
      author: "A",
      body: "Verified: skipped structured findings should be reported.",
      result: "incident diagnostics",
      commit: "def456",
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
      quiet: false,
    });

    expect(rc).toBe(0);
    expect(writes.join("")).toContain("structured finding stayed task-local");
    expect(writes.join("")).toContain("use task findings add with --promote --external");

    writeSpy.mockRestore();
  });

  it("records tracked task READMEs in a deterministic close commit for projection-backed backends", async () => {
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
        getTask: () => Promise.resolve(currentTask),
        writeTask,
      } as TaskBackend,
    });
    ctx.config.workflow_mode = "branch_pr";
    mocks.loadTaskFromContext.mockImplementation(() => Promise.resolve(currentTask));
    const { cmdFinish } = await import("./finish-command.js");
    const rc = await cmdFinish({
      ctx,
      cwd: "/repo",
      taskIds: ["T-1"],
      author: "A",
      body: "Verified: this is long enough",
      result: "done",
      risk: "high",
      breaking: true,
      commit: "abc123",
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
    expect(writeTask).toHaveBeenCalledTimes(1);
    expect(mocks.cmdCommit).toHaveBeenCalledWith(
      expect.objectContaining({
        taskId: "T-1",
        close: true,
        allowBase: true,
        closeStageTaskArtifacts: true,
      }),
    );
  });

  it("materializes deterministic close commit on a task-close branch in branch_pr mode", async () => {
    const ctx = mkCtx();
    ctx.config.workflow_mode = "branch_pr";
    mocks.loadTaskFromContext.mockResolvedValue(
      mkTask({
        id: "T-1",
        status: "DOING",
        tags: ["docs"],
        verification: {
          state: "ok",
          updated_at: "2026-02-09T00:00:00.000Z",
          updated_by: "REVIEWER",
          note: "ok",
        },
      }),
    );

    const { cmdFinish } = await import("./finish-command.js");
    const rc = await cmdFinish({
      ctx,
      cwd: "/repo",
      taskIds: ["T-1"],
      author: "INTEGRATOR",
      body: "Verified: base-branch close commit should be allowed in branch_pr mode.",
      result: "branch_pr close commit",
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
      closeCommit: true,
      quiet: true,
    });

    expect(rc).toBe(0);
    expect(mocks.execFileAsync).toHaveBeenCalledWith(
      "git",
      ["checkout", "-b", "task-close/T-1/base-head-sh"],
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

  it("includes every finished task directory in a branch_pr batch close-tail commit", async () => {
    const ctx = mkCtx({
      taskBackend: {
        ...mkCtx().taskBackend,
        writeTask: vi.fn(() => Promise.resolve()),
      } as TaskBackend,
    });
    ctx.config.workflow_mode = "branch_pr";
    mocks.loadTaskFromContext.mockImplementation((opts: { taskId: string }) =>
      Promise.resolve(
        mkTask({
          id: opts.taskId,
          status: "DOING",
          tags: ["docs"],
          commit: { hash: "abc123", message: `feat: ${opts.taskId}` },
          verification: {
            state: "ok",
            updated_at: "2026-02-09T00:00:00.000Z",
            updated_by: "REVIEWER",
            note: "ok",
          },
        }),
      ),
    );

    const { cmdFinish } = await import("./finish-command.js");
    const rc = await cmdFinish({
      ctx,
      cwd: "/repo",
      taskIds: ["T-1", "T-2"],
      author: "INTEGRATOR",
      body: "Verified: batch close commit should stage every finished task directory.",
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
      noWriteAcr: true,
      quiet: true,
    });

    expect(rc).toBe(0);
    expect(mocks.cmdCommit).toHaveBeenCalledWith(
      expect.objectContaining({
        taskId: "T-1",
        close: true,
        allow: [".agentplane/tasks/T-2"],
        allowBase: true,
        closeStageTaskArtifacts: true,
      }),
    );
  });

  it("skips local close-tail materialization when hosted close is already recorded on origin main", async () => {
    const ctx = mkCtx();
    ctx.config.workflow_mode = "branch_pr";
    mocks.execFileAsync.mockImplementation((...args: unknown[]) => {
      const [, gitArgs] = args as [string, string[]];
      if (Array.isArray(gitArgs) && gitArgs[0] === "rev-parse" && gitArgs[1] === "HEAD") {
        return Promise.resolve({ stdout: "merge-head-sha\n", stderr: "" });
      }
      if (Array.isArray(gitArgs) && gitArgs[0] === "log" && gitArgs[1] === "origin/main") {
        return Promise.resolve({
          stdout: "✅ T-1 close: Merged via PR #123. (T-1) [docs]\n",
          stderr: "",
        });
      }
      return Promise.resolve({ stdout: "", stderr: "" });
    });

    const { materializeBranchPrCloseTail } = await import("./finish-close.js");
    const closeBranch = await materializeBranchPrCloseTail({
      ctx,
      cwd: "/repo",
      taskId: "T-1",
      quiet: true,
    });

    expect(closeBranch).toBeNull();
    expect(mocks.execFileAsync).toHaveBeenCalledWith(
      "git",
      ["fetch", "--no-tags", "origin", "main"],
      expect.any(Object),
    );
    expect(mocks.execFileAsync).not.toHaveBeenCalledWith(
      "git",
      expect.arrayContaining(["checkout", "-b"]),
      expect.any(Object),
    );
    expect(mocks.cmdCommit).not.toHaveBeenCalled();
  });

  it("skips local close-tail materialization when a hosted close PR already exists", async () => {
    const ctx = mkCtx();
    ctx.config.workflow_mode = "branch_pr";
    ctx.config.branch.task_close_prefix = "agents/task-close";
    mocks.tryLookupExistingGithubPrByBranch.mockResolvedValue({
      prNumber: 902,
      prUrl: "https://github.com/basilisk-labs/agentplane/pull/902",
      status: "MERGED",
      mergedAt: "2026-05-05T06:13:14Z",
      mergeCommit: "close-merge",
      base: "main",
      headSha: "close-head",
    });

    const { materializeBranchPrCloseTail } = await import("./finish-close.js");
    const closeBranch = await materializeBranchPrCloseTail({
      ctx,
      cwd: "/repo",
      taskId: "T-1",
      quiet: true,
    });

    expect(closeBranch).toBeNull();
    expect(mocks.tryLookupExistingGithubPrByBranch).toHaveBeenCalledWith({
      gitRoot: "/repo",
      branch: "agents/task-close/T-1/base-head-sh",
      baseBranch: "main",
    });
    expect(mocks.gitBranchExists).not.toHaveBeenCalled();
    expect(mocks.cmdCommit).not.toHaveBeenCalled();
  });

  it("prints close-commit progress before the deterministic close commit runs", async () => {
    const writes: string[] = [];
    const writeSpy = vi.spyOn(process.stdout, "write").mockImplementation((chunk) => {
      writes.push(String(chunk));
      return true;
    });

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
    const rc = await cmdFinish({
      ctx,
      cwd: "/repo",
      taskIds: ["T-1"],
      author: "A",
      body: "Verified: close commit progress should be visible in stdout.",
      result: "close-commit-observability",
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
      quiet: false,
    });

    expect(rc).toBe(0);
    expect(mocks.cmdCommit).toHaveBeenCalledTimes(1);
    expect(writes.join("")).toContain("creating deterministic close commit");
    expect(writes.join("")).toContain("finished");

    writeSpy.mockRestore();
  });

  it("retries a partial DONE closeout without duplicating DONE metadata", async () => {
    const staleTask = mkTask({
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
    let currentTask = mkTask({
      id: "T-1",
      status: "DONE",
      tags: ["code"],
      result_summary: "closeout-retry",
      commit: { hash: "impl-hash", message: "feat: implement T-1" },
      verification: {
        state: "ok",
        updated_at: "2026-02-09T00:00:00.000Z",
        updated_by: "TESTER",
        note: "ok",
      },
      comments: [
        {
          author: "INTEGRATOR",
          body: "Verified: retry the deterministic close commit without rewriting DONE metadata.",
        },
      ],
      events: [
        {
          type: "status",
          at: "2026-02-09T00:00:00.000Z",
          author: "INTEGRATOR",
          from: "DOING",
          to: "DONE",
          note: "Verified: retry the deterministic close commit without rewriting DONE metadata.",
        },
      ],
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
    mocks.backendIsLocalFileBackend.mockReturnValue(true);
    mocks.getTaskStore.mockReturnValue(store);
    mocks.readCommitInfo.mockResolvedValue({ hash: "impl-hash", message: "feat: implement T-1" });

    const { cmdFinish } = await import("./finish-command.js");
    const rc = await cmdFinish({
      ctx,
      cwd: "/repo",
      taskIds: ["T-1"],
      author: "INTEGRATOR",
      body: "Verified: retry the deterministic close commit without rewriting DONE metadata.",
      result: "closeout-retry",
      commit: "impl-hash",
      breaking: false,
      force: true,
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
      noCloseCommit: false,
      closeUnstageOthers: false,
      quiet: true,
    });

    expect(rc).toBe(0);
    expect(currentTask.comments).toHaveLength(1);
    expect(currentTask.events).toHaveLength(1);
    expect(currentTask.status).toBe("DONE");
    expect(mocks.cmdCommit).toHaveBeenCalledTimes(1);
  });
});
