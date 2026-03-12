import { beforeEach, describe, expect, it, vi } from "vitest";

import { exitCodeForError } from "../../../cli/exit-codes.js";
import { CliError } from "../../../shared/errors.js";

const mocks = vi.hoisted(() => ({
  mapCoreError: vi.fn(),
  ensureReconciledBeforeMutation: vi.fn(),
  loadCommandContext: vi.fn(),
  loadTaskFromContext: vi.fn(),
  buildCloseCommitMessage: vi.fn(),
  taskReadmePathForTask: vi.fn(),
  buildGitCommitEnv: vi.fn(),
  guardCommitCheck: vi.fn(),
}));

vi.mock("../../../cli/error-map.js", () => ({ mapCoreError: mocks.mapCoreError }));
vi.mock("../../shared/task-backend.js", () => ({
  loadCommandContext: mocks.loadCommandContext,
  loadTaskFromContext: mocks.loadTaskFromContext,
}));
vi.mock("../../shared/reconcile-check.js", () => ({
  ensureReconciledBeforeMutation: mocks.ensureReconciledBeforeMutation,
}));
vi.mock("./close-message.js", () => ({
  buildCloseCommitMessage: mocks.buildCloseCommitMessage,
  taskReadmePathForTask: mocks.taskReadmePathForTask,
}));
vi.mock("./env.js", () => ({ buildGitCommitEnv: mocks.buildGitCommitEnv }));
vi.mock("./policy.js", () => ({ guardCommitCheck: mocks.guardCommitCheck }));

function mkCtx() {
  return {
    resolvedProject: { gitRoot: "/repo" },
    config: { paths: { tasks_path: ".agentplane/tasks.json", workflow_dir: ".agentplane/tasks" } },
    git: {
      statusChangedPaths: vi.fn().mockResolvedValue([]),
      statusStagedPaths: vi.fn().mockResolvedValue([]),
      stage: vi.fn().mockResolvedValue(),
      commit: vi.fn().mockResolvedValue(),
      headHashSubject: vi.fn().mockResolvedValue({ hash: "abcdef123456", subject: "subject" }),
    },
  };
}

describe("guard/impl/commands", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mocks.ensureReconciledBeforeMutation.mockResolvedValue();
  });

  it("cmdGuardClean maps non-Cli errors with mapCoreError", async () => {
    const { cmdGuardClean } = await import("./commands.js");
    const mapped = new CliError({ exitCode: 5, code: "E_GIT", message: "mapped clean" });
    mocks.mapCoreError.mockReturnValue(mapped);
    mocks.loadCommandContext.mockRejectedValue(new Error("boom"));
    await expect(cmdGuardClean({ cwd: "/repo", rootOverride: "/repo", quiet: true })).rejects.toBe(
      mapped,
    );
    expect(mocks.mapCoreError).toHaveBeenCalledWith(
      expect.any(Error),
      expect.objectContaining({ command: "guard clean", root: "/repo" }),
    );
  });

  it("cmdGuardSuggestAllow covers empty-index usage and maps unknown errors", async () => {
    const { cmdGuardSuggestAllow } = await import("./commands.js");
    const ctx = mkCtx();
    ctx.git.statusStagedPaths.mockResolvedValue([]);
    mocks.loadCommandContext.mockResolvedValue(ctx);
    mocks.mapCoreError.mockImplementation((err: unknown) =>
      err instanceof CliError
        ? err
        : new CliError({
            exitCode: exitCodeForError("E_IO"),
            code: "E_IO",
            message: "mapped suggest usage",
          }),
    );
    await expect(
      cmdGuardSuggestAllow({ cwd: "/repo", format: "lines" }),
    ).rejects.toMatchObject<CliError>({ code: "E_USAGE" });

    const mapped = new CliError({
      exitCode: exitCodeForError("E_IO"),
      code: "E_IO",
      message: "mapped suggest",
    });
    mocks.mapCoreError.mockReturnValue(mapped);
    mocks.loadCommandContext.mockRejectedValue(new Error("io"));
    await expect(
      cmdGuardSuggestAllow({ cwd: "/repo", rootOverride: "/repo", format: "args" }),
    ).rejects.toBe(mapped);
    expect(mocks.mapCoreError).toHaveBeenCalledWith(
      expect.any(Error),
      expect.objectContaining({ command: "guard suggest-allow", root: "/repo" }),
    );
  });

  it("cmdGuardCommit writes OK and maps unknown errors", async () => {
    const { cmdGuardCommit } = await import("./commands.js");
    const ctx = mkCtx();
    mocks.loadCommandContext.mockResolvedValue(ctx);
    await expect(
      cmdGuardCommit({
        cwd: "/repo",
        taskId: "T-0",
        message: "✅ ABC123 task: msg",
        allow: ["src"],
        allowBase: false,
        allowTasks: false,
        allowPolicy: false,
        allowConfig: false,
        allowHooks: false,
        allowCI: false,
        requireClean: false,
        quiet: true,
      }),
    ).resolves.toBe(0);
    expect(mocks.loadCommandContext).toHaveBeenCalledTimes(1);
    expect(mocks.ensureReconciledBeforeMutation).toHaveBeenCalledWith({
      ctx,
      command: "guard commit",
    });

    const mapped = new CliError({
      exitCode: exitCodeForError("E_IO"),
      code: "E_IO",
      message: "mapped commit",
    });
    mocks.mapCoreError.mockReturnValue(mapped);
    mocks.guardCommitCheck.mockRejectedValue(new Error("oops"));
    await expect(
      cmdGuardCommit({
        cwd: "/repo",
        rootOverride: "/repo",
        taskId: "T-0",
        message: "✅ ABC123 task: msg",
        allow: ["src"],
        allowBase: false,
        allowTasks: false,
        allowPolicy: false,
        allowConfig: false,
        allowHooks: false,
        allowCI: false,
        requireClean: false,
        quiet: true,
      }),
    ).rejects.toBe(mapped);
    expect(mocks.mapCoreError).toHaveBeenCalledWith(
      expect.any(Error),
      expect.objectContaining({ command: "guard commit", root: "/repo" }),
    );
  });

  it("cmdCommit non-close path commits with env and provided ctx", async () => {
    const { cmdCommit } = await import("./commands.js");
    const ctx = mkCtx();
    ctx.git.statusStagedPaths.mockResolvedValue(["src/app.ts"]);
    mocks.buildGitCommitEnv.mockReturnValue({ AGENTPLANE_TASK_ID: "T-1" });
    const rc = await cmdCommit({
      ctx: ctx as never,
      cwd: "/repo",
      taskId: "T-1",
      message: "✅ ABC123 task: message",
      close: false,
      allow: ["src"],
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
    expect(mocks.guardCommitCheck).toHaveBeenCalledTimes(1);
    expect(ctx.git.commit).toHaveBeenCalledWith({
      message: "✅ ABC123 task: message",
      env: { AGENTPLANE_TASK_ID: "T-1" },
    });
  });

  it("cmdCommit close path stages absolute README when outside gitRoot", async () => {
    const { cmdCommit } = await import("./commands.js");
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
  });

  it("cmdCommit close --check-only skips reconcile guard", async () => {
    const { cmdCommit } = await import("./commands.js");
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

  it("cmdCommit rejects auto-allow mode", async () => {
    const { cmdCommit } = await import("./commands.js");
    const ctx = mkCtx();
    await expect(
      cmdCommit({
        ctx: ctx as never,
        cwd: "/repo",
        taskId: "T-3",
        message: "✅ ABC123 task: message",
        close: false,
        allow: [],
        autoAllow: true,
        allowTasks: false,
        allowBase: false,
        allowPolicy: false,
        allowConfig: false,
        allowHooks: false,
        allowCI: false,
        requireClean: false,
        quiet: true,
      }),
    ).rejects.toMatchObject<CliError>({ code: "E_USAGE" });
  });

  it("cmdCommit non-close auto-stages allowlist paths when the index is empty", async () => {
    const { cmdCommit } = await import("./commands.js");
    const ctx = mkCtx();
    ctx.git.statusChangedPaths.mockResolvedValue(["src/app.ts", "docs/readme.md"]);
    ctx.git.headHashSubject.mockResolvedValue({
      hash: "abcdef1234567890",
      subject: "✅ ABC123 task: message",
    });
    mocks.buildGitCommitEnv.mockReturnValue({ AGENTPLANE_TASK_ID: "T-6" });

    const rc = await cmdCommit({
      ctx: ctx as never,
      cwd: "/repo",
      taskId: "T-6",
      message: "✅ ABC123 task: message",
      close: false,
      allow: ["src"],
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
    expect(ctx.git.stage).toHaveBeenCalledWith(["src/app.ts"]);
    expect(mocks.guardCommitCheck).toHaveBeenCalledTimes(1);
    expect(ctx.git.commit).toHaveBeenCalledWith({
      message: "✅ ABC123 task: message",
      env: { AGENTPLANE_TASK_ID: "T-6" },
    });
  });

  it("cmdCommit maps unknown errors via mapCoreError when not git-commit shaped", async () => {
    const { cmdCommit } = await import("./commands.js");
    const ctx = mkCtx();
    ctx.git.statusStagedPaths.mockResolvedValue(["src/app.ts"]);
    const mapped = new CliError({
      exitCode: exitCodeForError("E_IO"),
      code: "E_IO",
      message: "mapped",
    });
    mocks.mapCoreError.mockReturnValue(mapped);
    ctx.git.commit.mockRejectedValue(new Error("boom"));
    await expect(
      cmdCommit({
        ctx: ctx as never,
        cwd: "/repo",
        taskId: "T-4",
        message: "✅ ABC123 task: message",
        close: false,
        allow: ["src"],
        autoAllow: false,
        allowTasks: false,
        allowBase: false,
        allowPolicy: false,
        allowConfig: false,
        allowHooks: false,
        allowCI: false,
        requireClean: false,
        quiet: true,
      }),
    ).rejects.toBe(mapped);
  });

  it("cmdCommit preserves salient linter failure lines in git-commit-shaped errors", async () => {
    const { cmdCommit } = await import("./commands.js");
    const ctx = mkCtx();
    ctx.git.statusStagedPaths.mockResolvedValue(["src/app.ts"]);
    ctx.git.commit.mockRejectedValue(
      Object.assign(new Error("hook failed"), {
        cmd: "git commit -m ✅ ABC123 task: message",
        code: 1,
        stderr: [
          "HOOK_LINE_01",
          "HOOK_LINE_02",
          "HOOK_LINE_03",
          "HOOK_LINE_04",
          "HOOK_LINE_05",
          "HOOK_LINE_06",
          "\u001B[31mESLint found 2 problems (2 errors, 0 warnings)\u001B[0m",
          "HOOK_LINE_08",
          "HOOK_LINE_09",
          "HOOK_LINE_10",
          "HOOK_LINE_11",
          "HOOK_LINE_12",
          "HOOK_LINE_13",
        ].join("\n"),
      }),
    );

    const err = await cmdCommit({
      ctx: ctx as never,
      cwd: "/repo",
      taskId: "T-7",
      message: "✅ ABC123 task: message",
      close: false,
      allow: ["src"],
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
    expect((err as CliError).code).toBe("E_GIT");
    expect((err as CliError).message).toContain("ESLint found 2 problems (2 errors, 0 warnings)");
    expect((err as CliError).message).not.toContain("\u001B[31m");
  });

  it("cmdCommit non-close auto-allow rejects when ctx is absent", async () => {
    const { cmdCommit } = await import("./commands.js");
    mocks.loadCommandContext.mockResolvedValue(mkCtx());
    await expect(
      cmdCommit({
        cwd: "/repo",
        taskId: "T-5",
        message: "✅ ABC123 task: auto allow",
        close: false,
        allow: [],
        autoAllow: true,
        allowTasks: false,
        allowBase: false,
        allowPolicy: false,
        allowConfig: false,
        allowHooks: false,
        allowCI: false,
        requireClean: false,
        quiet: true,
      }),
    ).rejects.toMatchObject<CliError>({ code: "E_USAGE" });
    expect(mocks.loadCommandContext).toHaveBeenCalledTimes(1);
  });
});
