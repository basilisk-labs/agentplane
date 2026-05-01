import { beforeEach, describe, expect, it, vi } from "vitest";

import { exitCodeForError } from "../../../cli/exit-codes.js";
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

describe("guard command implementations: guard commands", () => {
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

  it("cmdGuardClean maps non-Cli errors with mapCoreError", async () => {
    const { cmdGuardClean } = await import("./clean.js");
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
    const { cmdGuardSuggestAllow } = await import("./suggest.js");
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
    const { cmdGuardCommit } = await import("./guard-commit.js");
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
});
