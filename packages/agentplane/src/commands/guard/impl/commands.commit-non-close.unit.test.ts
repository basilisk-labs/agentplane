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
  gitCurrentBranch: vi.fn(),
  gitRevParse: vi.fn(),
  refreshBranchPrArtifactsAfterTaskCommit: vi.fn(),
  loadCommandContext: vi.fn(),
  loadTaskFromContext: vi.fn(),
  buildCloseCommitMessage: vi.fn(),
  taskReadmePathForTask: vi.fn(),
  buildGitCommitEnv: vi.fn(),
  resolveCanonicalGitIdentity: vi.fn(),
  guardCommitCheck: vi.fn(),
  resolveIgnoredDirectCloseDirtyPaths: vi.fn(),
  withGitMutationMutex: vi.fn(),
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
    gitCurrentBranch: mocks.gitCurrentBranch,
    gitEnv: mocks.gitEnv,
    gitRevParse: mocks.gitRevParse,
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
vi.mock("../../../shared/git-mutation.js", async (importOriginal) => {
  const actual = await importOriginal<Record<string, unknown>>();
  return {
    ...actual,
    withGitMutationMutex: mocks.withGitMutationMutex,
  };
});

describe("guard command implementations: commit non-close", () => {
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
    mocks.gitCurrentBranch.mockResolvedValue("task/test");
    mocks.gitEnv.mockReturnValue({});
    mocks.gitRevParse.mockResolvedValue(".git");
    mocks.resolveCanonicalGitIdentity.mockResolvedValue(null);
    mocks.resolveIgnoredDirectCloseDirtyPaths.mockResolvedValue([]);
    mocks.withGitMutationMutex.mockImplementation(
      async (_opts: unknown, run: (ctx: unknown) => Promise<unknown>) => await run({}),
    );
  });

  it("cmdCommit non-close path commits with env and provided ctx", async () => {
    const { cmdCommit } = await import("./commit.js");
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

  it("cmdCommit amends task artifacts into the implementation commit when PR refresh leaves task-local drift", async () => {
    const { cmdCommit } = await import("./commit.js");
    const ctx = mkCtx();
    ctx.git.statusStagedPaths.mockResolvedValue(["src/app.ts"]);
    ctx.git.statusChangedPaths.mockResolvedValue([
      ".agentplane/tasks/202604130818-7SRWEX/pr/meta.json",
      ".agentplane/tasks/202604130818-7SRWEX/pr/review.md",
    ]);
    ctx.git.headHashSubject.mockResolvedValue({
      hash: "feedfacecafebeef",
      subject: "derived:202604130818-7SRWEX:🧩 7SRWEX workflow: implementation body",
    });
    mocks.buildGitCommitEnv
      .mockReturnValueOnce({ AGENTPLANE_TASK_ID: "202604130818-7SRWEX" })
      .mockReturnValueOnce({
        AGENTPLANE_TASK_ID: "202604130818-7SRWEX",
        AGENTPLANE_ALLOW_TASKS: "1",
      });

    const rc = await cmdCommit({
      ctx: ctx as never,
      cwd: "/repo",
      taskId: "202604130818-7SRWEX",
      message: "🧩 7SRWEX workflow: implementation body",
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
    expect(mocks.refreshBranchPrArtifactsAfterTaskCommit).toHaveBeenCalledTimes(1);
    expect(ctx.git.invalidateStatus).toHaveBeenCalledTimes(1);
    expect(ctx.git.stage).toHaveBeenCalledWith([
      ".agentplane/tasks/202604130818-7SRWEX/pr/meta.json",
      ".agentplane/tasks/202604130818-7SRWEX/pr/review.md",
    ]);
    expect(mocks.guardCommitCheck).toHaveBeenCalledTimes(2);
    expect(ctx.git.commit).toHaveBeenNthCalledWith(1, {
      message: "🧩 7SRWEX workflow: implementation body",
      env: { AGENTPLANE_TASK_ID: "202604130818-7SRWEX" },
    });
    expect(ctx.git.commit).toHaveBeenCalledTimes(1);
    expect(ctx.git.commitAmendNoEdit).toHaveBeenCalledWith({
      env: {
        AGENTPLANE_TASK_ID: "202604130818-7SRWEX",
        AGENTPLANE_ALLOW_TASKS: "1",
      },
    });
  });

  it("cmdCommit non-close path does not opt into stale-dist bypass", async () => {
    const { cmdCommit } = await import("./commit.js");
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
    const envCall = mocks.buildGitCommitEnv.mock.calls.at(-1)?.[0] as
      | { taskId: string; allowStaleDist?: boolean }
      | undefined;
    expect(envCall).toMatchObject({ taskId: "T-1" });
    expect(envCall).not.toHaveProperty("allowStaleDist");
  });

  it("cmdCommit rejects auto-allow mode", async () => {
    const { cmdCommit } = await import("./commit.js");
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
    const { cmdCommit } = await import("./commit.js");
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

  it("cmdCommit non-close rejects an empty index when no explicit scope is provided", async () => {
    const { cmdCommit } = await import("./commit.js");
    const ctx = mkCtx();
    ctx.git.statusStagedPaths.mockResolvedValue([]);

    await expect(
      cmdCommit({
        ctx: ctx as never,
        cwd: "/repo",
        taskId: "T-9",
        message: "✅ ABC123 task: message",
        close: false,
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
      }),
    ).rejects.toMatchObject<CliError>({ code: "E_USAGE" });
    expect(ctx.git.commit).not.toHaveBeenCalled();
  });

  it("cmdCommit non-close prints auto-stage details and success output when allowTasks provides the scope", async () => {
    const { cmdCommit } = await import("./commit.js");
    const ctx = mkCtx();
    const stdout = vi.spyOn(process.stdout, "write").mockImplementation(() => true);
    ctx.git.statusStagedPaths.mockResolvedValue([]);
    ctx.git.statusChangedPaths.mockResolvedValue([
      ".agentplane/tasks/T-10/README.md",
      "docs/readme.md",
    ]);
    ctx.git.headHashSubject
      .mockResolvedValueOnce({
        hash: "1122334455667788",
        subject: "✅ ABC123 task: message",
      })
      .mockResolvedValueOnce({
        hash: "99aabbccddeeff00",
        subject: "♻️ ABC123 task: refresh task artifacts after commit",
      });
    mocks.buildGitCommitEnv.mockReturnValue({ AGENTPLANE_TASK_ID: "T-10" });

    try {
      const rc = await cmdCommit({
        ctx: ctx as never,
        cwd: "/repo",
        taskId: "T-10",
        message: "✅ ABC123 task: message",
        close: false,
        allow: [],
        autoAllow: false,
        allowTasks: true,
        allowBase: false,
        allowPolicy: false,
        allowConfig: false,
        allowHooks: false,
        allowCI: false,
        requireClean: false,
        quiet: false,
      });

      expect(rc).toBe(0);
      expect(ctx.git.stage).toHaveBeenCalledWith([".agentplane/tasks/T-10/README.md"]);
      expect(
        stdout.mock.calls.some(([text]) =>
          String(text).includes("commit auto-staged 1 path(s) from allowlist"),
        ),
      ).toBe(true);
      expect(
        stdout.mock.calls.some(([text]) =>
          String(text).includes("staged=.agentplane/tasks/T-10/README.md"),
        ),
      ).toBe(true);
      expect(
        stdout.mock.calls.some(([text]) =>
          String(text).includes(
            "amended=99aabbccddee ♻️ ABC123 task: refresh task artifacts after commit",
          ),
        ),
      ).toBe(true);
    } finally {
      stdout.mockRestore();
    }
  });

  it("cmdCommit non-close stages active task artifacts from allowTasks when the index is already populated", async () => {
    const { cmdCommit } = await import("./commit.js");
    const ctx = mkCtx();
    ctx.git.statusStagedPaths.mockResolvedValue(["src/app.ts"]);
    ctx.git.statusChangedPaths
      .mockResolvedValueOnce(["src/app.ts", ".agentplane/tasks/T-11/README.md"])
      .mockResolvedValueOnce([]);
    ctx.git.headHashSubject.mockResolvedValue({
      hash: "1122334455667788",
      subject: "✅ ABC123 task: message",
    });
    mocks.buildGitCommitEnv.mockReturnValue({ AGENTPLANE_TASK_ID: "T-11" });

    const rc = await cmdCommit({
      ctx: ctx as never,
      cwd: "/repo",
      taskId: "T-11",
      message: "✅ ABC123 task: message",
      close: false,
      allow: ["src"],
      autoAllow: false,
      allowTasks: true,
      allowBase: false,
      allowPolicy: false,
      allowConfig: false,
      allowHooks: false,
      allowCI: false,
      requireClean: false,
      quiet: true,
    });

    expect(rc).toBe(0);
    expect(ctx.git.stage).toHaveBeenCalledWith([".agentplane/tasks/T-11/README.md"]);
    expect(ctx.git.stage.mock.invocationCallOrder[0]).toBeLessThan(
      mocks.guardCommitCheck.mock.invocationCallOrder[0],
    );
    expect(mocks.guardCommitCheck).toHaveBeenCalledWith(
      expect.objectContaining({
        allow: ["src"],
        allowTasks: true,
        taskId: "T-11",
      }),
    );
  });

  it("cmdCommit non-close auto-stages CI changes when --allow-ci provides the scope", async () => {
    const { cmdCommit } = await import("./commit.js");
    const ctx = mkCtx();
    ctx.git.statusStagedPaths.mockResolvedValue([]);
    ctx.git.statusChangedPaths.mockResolvedValue([
      ".github/workflows/publish.yml",
      "docs/releases/v0.3.6.md",
    ]);
    mocks.buildGitCommitEnv.mockReturnValue({ AGENTPLANE_TASK_ID: "T-CI" });

    const rc = await cmdCommit({
      ctx: ctx as never,
      cwd: "/repo",
      taskId: "T-CI",
      message: "✅ ABC123 task: message",
      close: false,
      allow: [],
      autoAllow: false,
      allowTasks: false,
      allowBase: false,
      allowPolicy: false,
      allowConfig: false,
      allowHooks: false,
      allowCI: true,
      requireClean: false,
      quiet: true,
      closeUnstageOthers: false,
      closeCheckOnly: false,
    });

    expect(rc).toBe(0);
    expect(ctx.git.stage).toHaveBeenCalledWith([".github/workflows/publish.yml"]);
    expect(mocks.guardCommitCheck).toHaveBeenCalledWith(
      expect.objectContaining({
        allow: [],
        allowCI: true,
      }),
    );
    expect(ctx.git.commit).toHaveBeenCalledWith({
      message: "✅ ABC123 task: message",
      env: { AGENTPLANE_TASK_ID: "T-CI" },
    });
  });

  it("cmdCommit maps unknown git-commit failures to git-commit diagnostics", async () => {
    const { cmdCommit } = await import("./commit.js");
    const ctx = mkCtx();
    ctx.git.statusStagedPaths.mockResolvedValue(["src/app.ts"]);
    const errorMatcher: { code: string; context: unknown; exitCode: number; message: string } = {
      exitCode: exitCodeForError("E_GIT"),
      code: "E_GIT",
      message: "git commit failed: boom",
      context: expect.objectContaining({
        diagnostic_state: "git commit failed",
        diagnostic_likely_cause: expect.stringContaining("The commit pre-conditions") as unknown,
      }),
    };
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
    ).rejects.toMatchObject(errorMatcher);
  });

  it("cmdCommit preserves salient linter failure lines in git-commit-shaped errors", async () => {
    const { cmdCommit } = await import("./commit.js");
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
    expect(readDiagnosticContext((err as CliError).context)).toMatchObject({
      state: "git rejected the requested task-scoped commit",
      likelyCause: "a lint check in the pre-commit path rejected the staged task-scoped commit",
      nextAction: {
        command: "bun run lint:core",
        reasonCode: "git_pre_commit_lint",
      },
    });
  });

  it("cmdCommit recognizes execa-style git commit failures without legacy err.cmd", async () => {
    const { cmdCommit } = await import("./commit.js");
    const ctx = mkCtx();
    ctx.git.statusStagedPaths.mockResolvedValue(["src/app.ts"]);
    ctx.git.commit.mockRejectedValue(
      Object.assign(
        new Error("Command failed with exit code 1: git commit -m ✅ ABC123 task: message"),
        {
          shortMessage: "Command failed with exit code 1: git commit -m ✅ ABC123 task: message",
          code: 1,
          stderr: "Code style issues found. Run Prettier with --write.",
        },
      ),
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
    expect((err as CliError).message).toContain("git commit failed");
    expect(readDiagnosticContext((err as CliError).context)).toMatchObject({
      state: "git rejected the requested task-scoped commit",
      nextAction: {
        command: "bun run format",
        reasonCode: "git_pre_commit_format",
      },
    });
  });

  it("cmdCommit non-close auto-allow rejects when ctx is absent", async () => {
    const { cmdCommit } = await import("./commit.js");
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
