import { beforeEach, describe, expect, it, vi } from "vitest";

import { exitCodeForError } from "../../../cli/exit-codes.js";
import { readDiagnosticContext } from "../../shared/diagnostics.js";
import { CliError } from "../../../shared/errors.js";
import { createGuardCommandContext as mkCtx } from "@agentplane/testkit/guard";

const mocks = vi.hoisted(() => ({
  buildTaskArtifactRefreshCommitSubject: vi.fn(),
  mapCoreError: vi.fn(),
  ensureReconciledBeforeMutation: vi.fn(),
  execFileAsync: vi.fn(),
  gitEnv: vi.fn(),
  refreshBranchPrArtifactsAfterTaskCommit: vi.fn(),
  loadCommandContext: vi.fn(),
  loadTaskFromContext: vi.fn(),
  buildCloseCommitMessage: vi.fn(),
  taskReadmePathForTask: vi.fn(),
  buildGitCommitEnv: vi.fn(),
  resolveCanonicalGitIdentity: vi.fn(),
  guardCommitCheck: vi.fn(),
  resolveIgnoredDirectCloseDirtyPaths: vi.fn(),
}));

vi.mock("@agentplaneorg/core/commit", async (importOriginal) => {
  const actual = await importOriginal<Record<string, unknown>>();
  return {
    ...actual,
    buildTaskArtifactRefreshCommitSubject: mocks.buildTaskArtifactRefreshCommitSubject,
  };
});
vi.mock("../../../cli/error-map.js", () => ({ mapCoreError: mocks.mapCoreError }));
vi.mock("../../shared/task-backend.js", () => ({
  loadCommandContext: mocks.loadCommandContext,
  loadTaskFromContext: mocks.loadTaskFromContext,
}));
vi.mock("../../shared/reconcile-check.js", () => ({
  ensureReconciledBeforeMutation: mocks.ensureReconciledBeforeMutation,
}));
vi.mock("@agentplaneorg/core/process", () => ({
  execFileAsync: mocks.execFileAsync,
}));
vi.mock("@agentplaneorg/core/git", async (importOriginal) => {
  const actual = await importOriginal<Record<string, unknown>>();
  return {
    ...actual,
    gitEnv: mocks.gitEnv,
  };
});
vi.mock("../../shared/post-commit-pr-artifacts.js", () => ({
  refreshBranchPrArtifactsAfterTaskCommit: mocks.refreshBranchPrArtifactsAfterTaskCommit,
}));
vi.mock("./close-message.js", () => ({
  buildCloseCommitMessage: mocks.buildCloseCommitMessage,
  taskReadmePathForTask: mocks.taskReadmePathForTask,
}));
vi.mock("./env.js", () => ({
  buildGitCommitEnv: mocks.buildGitCommitEnv,
  resolveCanonicalGitIdentity: mocks.resolveCanonicalGitIdentity,
}));
vi.mock("./policy.js", () => ({ guardCommitCheck: mocks.guardCommitCheck }));
vi.mock("./close-dirt.js", () => ({
  resolveIgnoredDirectCloseDirtyPaths: mocks.resolveIgnoredDirectCloseDirtyPaths,
}));

describe("guard command implementations: commit close", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mocks.mapCoreError.mockImplementation((err: unknown) =>
      err instanceof Error
        ? err
        : new CliError({
            exitCode: exitCodeForError("E_IO"),
            code: "E_IO",
            message: String(err),
          }),
    );
    mocks.buildTaskArtifactRefreshCommitSubject.mockImplementation(
      ({ taskId, baseSubject }: { taskId: string; baseSubject?: string | null }) =>
        `derived:${taskId}:${baseSubject ?? ""}`,
    );
    mocks.ensureReconciledBeforeMutation.mockResolvedValue();
    mocks.execFileAsync.mockResolvedValue({ stdout: "", stderr: "" });
    mocks.gitEnv.mockReturnValue({});
    mocks.resolveCanonicalGitIdentity.mockResolvedValue(null);
    mocks.resolveIgnoredDirectCloseDirtyPaths.mockResolvedValue([]);
  });

  it("cmdCommit close path stages absolute README when outside gitRoot", async () => {
    const { cmdCommit } = await import("./commit.js");
    const ctx = mkCtx();
    mocks.loadTaskFromContext.mockResolvedValue({ id: "T-2" });
    mocks.buildCloseCommitMessage.mockResolvedValue({
      subject: "✅ ABC123 close: done",
      body: "body",
    });
    mocks.taskReadmePathForTask.mockReturnValue("/outside/README.md");
    mocks.buildGitCommitEnv.mockReturnValue({ AGENTPLANE_TASK_ID: "T-2" });
    const rc = await cmdCommit({
      ctx: ctx as never,
      cwd: "/repo",
      taskId: "T-2",
      message: "",
      close: true,
      allow: [],
      autoAllow: false,
      allowTasks: false,
      allowBase: false,
      allowPolicy: false,
      allowConfig: false,
      allowHooks: false,
      allowCI: false,
      requireClean: false,
      quiet: true,
    });
    expect(rc).toBe(0);
    expect(mocks.ensureReconciledBeforeMutation).toHaveBeenCalledWith({
      ctx,
      command: "commit",
    });
    expect(ctx.git.stage).toHaveBeenCalledWith(["/outside/README.md"]);
    expect(mocks.buildGitCommitEnv).toHaveBeenCalledWith(
      expect.objectContaining({
        taskId: "T-2",
        allowStaleDist: true,
      }),
    );
  });

  it("cmdCommit close --check-only skips reconcile guard", async () => {
    const { cmdCommit } = await import("./commit.js");
    const ctx = mkCtx();
    mocks.loadTaskFromContext.mockResolvedValue({ id: "T-2" });
    mocks.buildCloseCommitMessage.mockResolvedValue({
      subject: "✅ ABC123 close: done",
      body: "body",
    });
    mocks.taskReadmePathForTask.mockReturnValue("/repo/.agentplane/tasks/T-2/README.md");
    const rc = await cmdCommit({
      ctx: ctx as never,
      cwd: "/repo",
      taskId: "T-2",
      message: "",
      close: true,
      allow: [],
      autoAllow: false,
      allowTasks: false,
      allowBase: false,
      allowPolicy: false,
      allowConfig: false,
      allowHooks: false,
      allowCI: false,
      requireClean: false,
      quiet: true,
      closeCheckOnly: true,
      closeUnstageOthers: false,
    });
    expect(rc).toBe(0);
    expect(mocks.ensureReconciledBeforeMutation).not.toHaveBeenCalled();
  });

  it("cmdCommit close rejects a dirty index unless --unstage-others is set", async () => {
    const { cmdCommit } = await import("./commit.js");
    const ctx = mkCtx();
    ctx.git.statusStagedPaths.mockResolvedValue(["src/app.ts"]);

    await expect(
      cmdCommit({
        ctx: ctx as never,
        cwd: "/repo",
        taskId: "T-2",
        message: "",
        close: true,
        allow: [],
        autoAllow: false,
        allowTasks: false,
        allowBase: false,
        allowPolicy: false,
        allowConfig: false,
        allowHooks: false,
        allowCI: false,
        requireClean: false,
        quiet: true,
        closeCheckOnly: false,
        closeUnstageOthers: false,
      }),
    ).rejects.toMatchObject<CliError>({ code: "E_GIT" });
    expect(mocks.loadTaskFromContext).not.toHaveBeenCalled();
    expect(mocks.execFileAsync).not.toHaveBeenCalledWith(
      "git",
      ["restore", "--staged", "--", "."],
      expect.anything(),
    );
  });

  it("cmdCommit close --check-only reports the unstage suffix when it would clear the index", async () => {
    const { cmdCommit } = await import("./commit.js");
    const ctx = mkCtx();
    const stdout = vi.spyOn(process.stdout, "write").mockImplementation(() => true);
    ctx.git.statusStagedPaths.mockResolvedValue(["src/app.ts", "docs/readme.md"]);
    mocks.loadTaskFromContext.mockResolvedValue({ id: "T-2" });
    mocks.buildCloseCommitMessage.mockResolvedValue({
      subject: "✅ ABC123 close: done",
      body: "body",
    });
    mocks.taskReadmePathForTask.mockReturnValue("/repo/.agentplane/tasks/T-2/README.md");

    try {
      const rc = await cmdCommit({
        ctx: ctx as never,
        cwd: "/repo",
        taskId: "T-2",
        message: "",
        close: true,
        allow: [],
        autoAllow: false,
        allowTasks: false,
        allowBase: false,
        allowPolicy: false,
        allowConfig: false,
        allowHooks: false,
        allowCI: false,
        requireClean: false,
        quiet: false,
        closeCheckOnly: true,
        closeUnstageOthers: true,
      });
      expect(rc).toBe(0);
      expect(
        stdout.mock.calls.some(([text]) => String(text).includes("would unstage 2 path(s)")),
      ).toBe(true);
      expect(mocks.execFileAsync).not.toHaveBeenCalled();
    } finally {
      stdout.mockRestore();
    }
  });

  it("cmdCommit close --unstage-others clears the index before committing", async () => {
    const { cmdCommit } = await import("./commit.js");
    const ctx = mkCtx();
    const stdout = vi.spyOn(process.stdout, "write").mockImplementation(() => true);
    ctx.git.statusStagedPaths.mockResolvedValueOnce(["src/app.ts"]).mockResolvedValueOnce([]);
    ctx.git.headHashSubject.mockResolvedValue({
      hash: "fedcba9876543210",
      subject: "✅ ABC123 close: done",
    });
    mocks.loadTaskFromContext.mockResolvedValue({ id: "T-2" });
    mocks.buildCloseCommitMessage.mockResolvedValue({
      subject: "✅ ABC123 close: done",
      body: "body",
    });
    mocks.taskReadmePathForTask.mockReturnValue("/repo/.agentplane/tasks/T-2/README.md");
    mocks.buildGitCommitEnv.mockReturnValue({ AGENTPLANE_TASK_ID: "T-2" });

    try {
      const rc = await cmdCommit({
        ctx: ctx as never,
        cwd: "/repo",
        taskId: "T-2",
        message: "",
        close: true,
        allow: [],
        autoAllow: false,
        allowTasks: false,
        allowBase: false,
        allowPolicy: false,
        allowConfig: false,
        allowHooks: false,
        allowCI: false,
        requireClean: false,
        quiet: false,
        closeCheckOnly: false,
        closeUnstageOthers: true,
      });
      expect(rc).toBe(0);
      expect(mocks.execFileAsync).toHaveBeenCalledWith(
        "git",
        ["restore", "--staged", "--", "."],
        expect.objectContaining({ cwd: "/repo", env: {} }),
      );
      expect(ctx.git.commit).toHaveBeenCalledWith({
        message: "✅ ABC123 close: done",
        body: "body",
        env: { AGENTPLANE_TASK_ID: "T-2" },
      });
      expect(mocks.buildGitCommitEnv).toHaveBeenCalledWith(
        expect.objectContaining({
          taskId: "T-2",
          allowStaleDist: true,
        }),
      );
      expect(
        stdout.mock.calls.some(([text]) =>
          String(text).includes("fedcba987654 ✅ ABC123 close: done"),
        ),
      ).toBe(true);
    } finally {
      stdout.mockRestore();
    }
  });

  it("cmdCommit close stages policy mirrors together with the task README when policy writes are allowed", async () => {
    const { cmdCommit } = await import("./commit.js");
    const ctx = mkCtx();
    ctx.git.statusChangedPaths.mockResolvedValue([
      ".agentplane/policy/incidents.md",
      ".agentplane/tasks/T-2/README.md",
      "packages/agentplane/assets/policy/incidents.md",
      "src/outside.ts",
    ]);
    ctx.git.headHashSubject.mockResolvedValue({
      hash: "fedcba9876543210",
      subject: "✅ ABC123 close: done",
    });
    mocks.loadTaskFromContext.mockResolvedValue({ id: "T-2" });
    mocks.buildCloseCommitMessage.mockResolvedValue({
      subject: "✅ ABC123 close: done",
      body: "body",
    });
    mocks.taskReadmePathForTask.mockReturnValue("/repo/.agentplane/tasks/T-2/README.md");
    mocks.buildGitCommitEnv.mockReturnValue({ AGENTPLANE_TASK_ID: "T-2" });

    const rc = await cmdCommit({
      ctx: ctx as never,
      cwd: "/repo",
      taskId: "T-2",
      message: "",
      close: true,
      allow: [],
      autoAllow: false,
      allowTasks: true,
      allowBase: false,
      allowPolicy: true,
      allowConfig: false,
      allowHooks: false,
      allowCI: false,
      requireClean: false,
      quiet: true,
      closeCheckOnly: false,
      closeUnstageOthers: false,
    });

    expect(rc).toBe(0);
    expect(ctx.git.stage).toHaveBeenCalledWith([
      ".agentplane/policy/incidents.md",
      ".agentplane/tasks/T-2/README.md",
      "packages/agentplane/assets/policy/incidents.md",
    ]);
    expect(mocks.guardCommitCheck).toHaveBeenCalledWith(
      expect.objectContaining({
        allowPolicy: true,
        allowTasks: true,
        requireClean: true,
      }),
    );
  });

  it("cmdCommit close refreshes PR artifacts before staging task artifact scope", async () => {
    const { cmdCommit } = await import("./commit.js");
    const ctx = mkCtx();
    ctx.git.statusChangedPaths.mockResolvedValue([
      ".agentplane/tasks/T-12/pr/meta.json",
      ".agentplane/tasks/T-12/pr/review.md",
    ]);
    mocks.loadTaskFromContext.mockResolvedValue({ id: "T-12" });
    mocks.buildCloseCommitMessage.mockResolvedValue({
      subject: "✅ ABC123 close: done",
      body: "body",
    });
    mocks.taskReadmePathForTask.mockReturnValue("/repo/.agentplane/tasks/T-12/README.md");
    mocks.buildGitCommitEnv.mockReturnValue({ AGENTPLANE_TASK_ID: "T-12" });

    const rc = await cmdCommit({
      ctx: ctx as never,
      cwd: "/repo",
      taskId: "T-12",
      message: "",
      close: true,
      allow: [],
      autoAllow: false,
      allowTasks: false,
      allowBase: false,
      allowPolicy: false,
      allowConfig: false,
      allowHooks: false,
      allowCI: false,
      requireClean: false,
      quiet: true,
      closeStageTaskArtifacts: true,
    });

    expect(rc).toBe(0);
    expect(mocks.refreshBranchPrArtifactsAfterTaskCommit).toHaveBeenCalledWith({
      ctx,
      cwd: "/repo",
      rootOverride: undefined,
      taskId: "T-12",
      quiet: true,
    });
    expect(ctx.git.stage).toHaveBeenCalledWith([
      ".agentplane/tasks/T-12/pr/meta.json",
      ".agentplane/tasks/T-12/pr/review.md",
    ]);
    expect(ctx.git.invalidateStatus).toHaveBeenCalled();
    expect(mocks.refreshBranchPrArtifactsAfterTaskCommit.mock.invocationCallOrder[0]).toBeLessThan(
      ctx.git.stage.mock.invocationCallOrder[0] ?? Number.POSITIVE_INFINITY,
    );
    const lastInvalidateOrder =
      ctx.git.invalidateStatus.mock.invocationCallOrder.at(-1) ?? Number.POSITIVE_INFINITY;
    expect(mocks.refreshBranchPrArtifactsAfterTaskCommit.mock.invocationCallOrder[0]).toBeLessThan(
      lastInvalidateOrder,
    );
    expect(lastInvalidateOrder).toBeLessThan(
      ctx.git.stage.mock.invocationCallOrder[0] ?? Number.POSITIVE_INFINITY,
    );
  });

  it("cmdCommit close can skip PR artifact refresh while still staging task artifact scope", async () => {
    const { cmdCommit } = await import("./commit.js");
    const ctx = mkCtx();
    ctx.git.statusChangedPaths.mockResolvedValue([
      ".agentplane/tasks/T-12/pr/meta.json",
      ".agentplane/tasks/T-12/pr/review.md",
    ]);
    mocks.loadTaskFromContext.mockResolvedValue({ id: "T-12" });
    mocks.buildCloseCommitMessage.mockResolvedValue({
      subject: "✅ ABC123 close: done",
      body: "body",
    });
    mocks.taskReadmePathForTask.mockReturnValue("/repo/.agentplane/tasks/T-12/README.md");
    mocks.buildGitCommitEnv.mockReturnValue({ AGENTPLANE_TASK_ID: "T-12" });

    const rc = await cmdCommit({
      ctx: ctx as never,
      cwd: "/repo",
      taskId: "T-12",
      message: "",
      close: true,
      allow: [],
      autoAllow: false,
      allowTasks: false,
      allowBase: false,
      allowPolicy: false,
      allowConfig: false,
      allowHooks: false,
      allowCI: false,
      requireClean: false,
      quiet: true,
      closeStageTaskArtifacts: true,
      closeRefreshTaskArtifacts: false,
    });

    expect(rc).toBe(0);
    expect(mocks.refreshBranchPrArtifactsAfterTaskCommit).not.toHaveBeenCalled();
    expect(ctx.git.invalidateStatus).toHaveBeenCalled();
    expect(ctx.git.stage).toHaveBeenCalledWith([
      ".agentplane/tasks/T-12/pr/meta.json",
      ".agentplane/tasks/T-12/pr/review.md",
    ]);
    const invalidateOrder =
      ctx.git.invalidateStatus.mock.invocationCallOrder.at(-1) ?? Number.POSITIVE_INFINITY;
    expect(invalidateOrder).toBeLessThan(
      ctx.git.stage.mock.invocationCallOrder[0] ?? Number.POSITIVE_INFINITY,
    );
  });

  it("cmdCommit close ignores other active task READMEs in tolerant direct mode", async () => {
    const { cmdCommit } = await import("./commit.js");
    const ctx = mkCtx();
    ctx.config.workflow_mode = "direct";
    ctx.config.close_commit = { direct_dirty_policy: "allow_other_task_readmes" };
    mocks.loadTaskFromContext.mockResolvedValue({ id: "T-12" });
    mocks.buildCloseCommitMessage.mockResolvedValue({
      subject: "✅ ABC123 close: done",
      body: "body",
    });
    mocks.taskReadmePathForTask.mockReturnValue("/repo/.agentplane/tasks/T-12/README.md");
    mocks.buildGitCommitEnv.mockReturnValue({ AGENTPLANE_TASK_ID: "T-12" });
    mocks.resolveIgnoredDirectCloseDirtyPaths.mockResolvedValue([
      ".agentplane/tasks/T-99/README.md",
    ]);

    const rc = await cmdCommit({
      ctx: ctx as never,
      cwd: "/repo",
      taskId: "T-12",
      message: "",
      close: true,
      allow: [],
      autoAllow: false,
      allowTasks: false,
      allowBase: false,
      allowPolicy: false,
      allowConfig: false,
      allowHooks: false,
      allowCI: false,
      requireClean: false,
      quiet: true,
    });

    expect(rc).toBe(0);
    expect(mocks.resolveIgnoredDirectCloseDirtyPaths).toHaveBeenCalledWith({
      ctx,
      taskId: "T-12",
    });
    expect(mocks.guardCommitCheck).toHaveBeenCalledWith(
      expect.objectContaining({
        ignoredUnstagedTrackedPaths: [".agentplane/tasks/T-99/README.md"],
      }),
    );
  });

  it("cmdCommit close path promotes formatter blockers into close-commit guidance", async () => {
    const { cmdCommit } = await import("./commit.js");
    const ctx = mkCtx();
    mocks.loadTaskFromContext.mockResolvedValue({ id: "T-8" });
    mocks.buildCloseCommitMessage.mockResolvedValue({
      subject: "✅ ABC123 close: done",
      body: "body",
    });
    mocks.taskReadmePathForTask.mockReturnValue("/repo/.agentplane/tasks/T-8/README.md");
    ctx.git.commit.mockRejectedValue(
      Object.assign(new Error("hook failed"), {
        cmd: "git commit -m ✅ ABC123 close: done",
        code: 1,
        stderr: [
          "Checking formatting...",
          "Code style issues found. Run Prettier with --write.",
        ].join("\n"),
      }),
    );

    const err = await cmdCommit({
      ctx: ctx as never,
      cwd: "/repo",
      taskId: "T-8",
      message: "",
      close: true,
      allow: [],
      autoAllow: false,
      allowTasks: false,
      allowBase: false,
      allowPolicy: false,
      allowConfig: false,
      allowHooks: false,
      allowCI: false,
      requireClean: false,
      quiet: true,
    }).catch((error: unknown) => error);

    expect(err).toBeInstanceOf(CliError);
    expect((err as CliError).message).toContain(
      "Code style issues found. Run Prettier with --write.",
    );
    expect(readDiagnosticContext((err as CliError).context)).toMatchObject({
      state: "git rejected the generated close commit",
      likelyCause:
        "a formatting check in the pre-commit path rejected the deterministic close commit after the task README was staged",
      nextAction: {
        command: "bun run format",
        reasonCode: "git_pre_commit_format",
      },
    });
  });

  it("cmdCommit maps generic close-commit hook failures and keeps buffer output readable", async () => {
    const { cmdCommit } = await import("./commit.js");
    const ctx = mkCtx();
    mocks.loadTaskFromContext.mockResolvedValue({ id: "T-11" });
    mocks.buildCloseCommitMessage.mockResolvedValue({
      subject: "✅ ABC123 close: done",
      body: "body",
    });
    mocks.taskReadmePathForTask.mockReturnValue("/repo/.agentplane/tasks/T-11/README.md");
    ctx.git.commit.mockRejectedValue(
      Object.assign(new Error("hook failed"), {
        cmd: "git commit -m ✅ ABC123 close: done",
        stderr: Buffer.from(["first line", "", "X".repeat(220), "last line"].join("\n"), "utf8"),
      }),
    );

    const err = await cmdCommit({
      ctx: ctx as never,
      cwd: "/repo",
      taskId: "T-11",
      message: "",
      close: true,
      allow: [],
      autoAllow: false,
      allowTasks: false,
      allowBase: false,
      allowPolicy: false,
      allowConfig: false,
      allowHooks: false,
      allowCI: false,
      requireClean: false,
      quiet: true,
    }).catch((error: unknown) => error);

    expect(err).toBeInstanceOf(CliError);
    expect((err as CliError).message).toContain("[truncated]");
    expect(readDiagnosticContext((err as CliError).context)).toMatchObject({
      state: "git rejected the generated close commit",
      likelyCause:
        "a hook or commit policy blocked the deterministic task close commit after the task README was staged",
      nextAction: {
        command: "git status --short --untracked-files=no",
        reasonCode: "git_close_commit_blocked",
      },
    });
  });
});
