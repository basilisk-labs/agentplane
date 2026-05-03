import { describe, expect, it, vi } from "vitest";

import { CliError } from "../../../../shared/errors.js";

const mocks = vi.hoisted(() => ({
  resolveBaseBranch: vi.fn(),
  fileExists: vi.fn(),
  readFile: vi.fn(),
  ensureGitClean: vi.fn(),
  gitDiffNames: vi.fn(),
  gitBranchExists: vi.fn(),
  gitCurrentBranch: vi.fn(),
  gitRevParse: vi.fn(),
  findWorktreeForBranch: vi.fn(),
  loadCommandContext: vi.fn(),
  loadTaskFromContext: vi.fn(),
  resolveTaskBranchFromContext: vi.fn(),
  ensurePlanApprovedIfRequired: vi.fn(),
  ensureVerificationSatisfiedIfRequired: vi.fn(),
  resolvePrPaths: vi.fn(),
  readPrArtifact: vi.fn(),
  readAndValidatePrArtifacts: vi.fn(),
  ensureCommittedPrArtifactsOnBranch: vi.fn(),
  computeVerifyState: vi.fn(),
  parsePrMeta: vi.fn(),
  extractLastVerifiedSha: vi.fn(),
  isTaskLocalOnlyAdvance: vi.fn(),
  ensurePrArtifactsSynced: vi.fn(),
}));

vi.mock("../../../../cli/fs-utils.js", () => ({ fileExists: mocks.fileExists }));
vi.mock("node:fs/promises", () => ({ readFile: mocks.readFile }));
vi.mock("../../../guard/index.js", () => ({ ensureGitClean: mocks.ensureGitClean }));
vi.mock("@agentplaneorg/core/git", () => ({
  findWorktreeForBranch: mocks.findWorktreeForBranch,
  gitDiffNames: mocks.gitDiffNames,
  resolveBaseBranch: mocks.resolveBaseBranch,
}));
vi.mock("../../../shared/git-ops.js", () => ({
  gitBranchExists: mocks.gitBranchExists,
  gitCurrentBranch: mocks.gitCurrentBranch,
  gitRevParse: mocks.gitRevParse,
}));
vi.mock("../../../shared/task-backend.js", () => ({
  loadCommandContext: mocks.loadCommandContext,
  loadTaskFromContext: mocks.loadTaskFromContext,
  resolveTaskBranchFromContext: mocks.resolveTaskBranchFromContext,
}));
vi.mock("../../../task/shared.js", () => ({
  ensurePlanApprovedIfRequired: mocks.ensurePlanApprovedIfRequired,
  ensureVerificationSatisfiedIfRequired: mocks.ensureVerificationSatisfiedIfRequired,
}));
vi.mock("../../internal/pr-paths.js", () => ({
  resolvePrPaths: mocks.resolvePrPaths,
  readPrArtifact: mocks.readPrArtifact,
}));
vi.mock("../artifacts.js", () => ({
  readAndValidatePrArtifacts: mocks.readAndValidatePrArtifacts,
  ensureCommittedPrArtifactsOnBranch: mocks.ensureCommittedPrArtifactsOnBranch,
}));
vi.mock("../verify.js", () => ({ computeVerifyState: mocks.computeVerifyState }));
vi.mock("../../../shared/pr-meta.js", () => ({
  parsePrMeta: mocks.parsePrMeta,
  parsePrMetaForwardCompatible: mocks.parsePrMeta,
  extractLastVerifiedSha: mocks.extractLastVerifiedSha,
}));
vi.mock("../../../shared/task-local-freshness.js", () => ({
  isTaskLocalOnlyAdvance: mocks.isTaskLocalOnlyAdvance,
}));
vi.mock("../../internal/sync.js", () => ({
  ensurePrArtifactsSynced: mocks.ensurePrArtifactsSynced,
}));

function mkCtx(workflowMode: "direct" | "branch_pr" = "branch_pr") {
  return {
    resolvedProject: { gitRoot: "/repo", agentplaneDir: "/repo/.agentplane" },
    config: {
      workflow_mode: workflowMode,
      paths: { tasks_path: ".agentplane/tasks.json" },
    },
  };
}

function seedCommon(): void {
  mocks.loadTaskFromContext.mockResolvedValue({ id: "T-1", verify: [] });
  mocks.ensurePlanApprovedIfRequired.mockReturnValue();
  mocks.ensureVerificationSatisfiedIfRequired.mockReturnValue();
  mocks.ensureGitClean.mockResolvedValue();
  mocks.resolveBaseBranch.mockResolvedValue("main");
  mocks.gitCurrentBranch.mockResolvedValue("main");
  mocks.findWorktreeForBranch.mockResolvedValue(null);
  mocks.resolvePrPaths.mockResolvedValue({
    prDir: "/repo/.agentplane/tasks/T-1/pr",
    metaPath: "/repo/.agentplane/tasks/T-1/pr/meta.json",
    diffstatPath: "/repo/.agentplane/tasks/T-1/pr/diffstat.txt",
    verifyLogPath: "/repo/.agentplane/tasks/T-1/pr/verify.log",
  });
  mocks.fileExists.mockResolvedValue(true);
  mocks.readFile.mockResolvedValue('{"branch":"task/T-1"}');
  mocks.readPrArtifact.mockResolvedValue('{"branch":"task/T-1"}');
  mocks.parsePrMeta.mockReturnValue({ branch: "task/T-1", last_verified_sha: null });
  mocks.gitBranchExists.mockResolvedValue(true);
  mocks.readAndValidatePrArtifacts.mockResolvedValue({ verifyLogText: "ok" });
  mocks.ensureCommittedPrArtifactsOnBranch.mockResolvedValue();
  mocks.gitDiffNames.mockResolvedValue(["src/app.ts"]);
  mocks.gitRevParse.mockResolvedValue("deadbeef");
  mocks.resolveTaskBranchFromContext.mockResolvedValue(null);
  mocks.computeVerifyState.mockReturnValue({
    verifyCommands: [],
    alreadyVerifiedSha: null,
    shouldRunVerify: false,
  });
  mocks.extractLastVerifiedSha.mockReturnValue(null);
  mocks.isTaskLocalOnlyAdvance.mockResolvedValue(false);
  mocks.ensurePrArtifactsSynced.mockResolvedValue({ branch: "task/T-1" });
}

describe("pr/integrate/internal/prepare", () => {
  it("rejects when workflow mode is not branch_pr", async () => {
    const { prepareIntegrate } = await import("./prepare.js");
    seedCommon();
    mocks.loadCommandContext.mockResolvedValue(mkCtx("direct"));
    await expect(
      prepareIntegrate({ cwd: "/repo", taskId: "T-1", runVerify: false }),
    ).rejects.toMatchObject<CliError>({
      code: "E_USAGE",
    });
  });

  it("rejects blank --base value", async () => {
    const { prepareIntegrate } = await import("./prepare.js");
    seedCommon();
    mocks.loadCommandContext.mockResolvedValue(mkCtx("branch_pr"));
    await expect(
      prepareIntegrate({ cwd: "/repo", taskId: "T-1", runVerify: false, base: "   " }),
    ).rejects.toMatchObject<CliError>({ code: "E_USAGE", message: "Invalid value for --base." });
  });

  it("explains the base-checkout rerun route when integrate is invoked from the task branch worktree", async () => {
    const { prepareIntegrate } = await import("./prepare.js");
    seedCommon();
    mocks.loadCommandContext.mockResolvedValue(mkCtx("branch_pr"));
    mocks.gitCurrentBranch.mockResolvedValue("task/T-1");
    mocks.findWorktreeForBranch
      .mockResolvedValueOnce("/repo-base")
      .mockResolvedValueOnce("/repo-task");

    const caught = await prepareIntegrate({
      cwd: "/repo-task",
      taskId: "T-1",
      runVerify: false,
    }).catch((err: unknown) => err);

    expect(caught).toBeInstanceOf(CliError);
    expect(caught).toMatchObject<CliError>({
      code: "E_GIT",
      message:
        "integrate must run from the main base checkout, not from task branch task/T-1. Rerun it against the base checkout after leaving this task worktree.",
    });
    if (!(caught instanceof CliError)) {
      throw new Error("expected CliError");
    }
    expect(caught.context).toMatchObject({
      reason_code: "integrate_base_checkout_required",
      diagnostic_next_action_command:
        "agentplane integrate T-1 --branch task/T-1 --root /repo-base",
    });
  });

  it("rejects when base branch cannot be resolved", async () => {
    const { prepareIntegrate } = await import("./prepare.js");
    seedCommon();
    mocks.loadCommandContext.mockResolvedValue(mkCtx("branch_pr"));
    mocks.resolveBaseBranch.mockResolvedValue(null);
    await expect(
      prepareIntegrate({ cwd: "/repo", taskId: "T-1", runVerify: false }),
    ).rejects.toMatchObject<CliError>({
      code: "E_USAGE",
    });
  });

  it("rejects when current branch differs from base branch", async () => {
    const { prepareIntegrate } = await import("./prepare.js");
    seedCommon();
    mocks.loadCommandContext.mockResolvedValue(mkCtx("branch_pr"));
    mocks.gitCurrentBranch.mockResolvedValue("feature/x");
    await expect(
      prepareIntegrate({ cwd: "/repo", taskId: "T-1", runVerify: false }),
    ).rejects.toMatchObject<CliError>({
      code: "E_GIT",
    });
  });

  it("rejects when branch cannot be resolved", async () => {
    const { prepareIntegrate } = await import("./prepare.js");
    seedCommon();
    mocks.loadCommandContext.mockResolvedValue(mkCtx("branch_pr"));
    mocks.fileExists.mockResolvedValue(false); // no meta file; no --branch
    await expect(
      prepareIntegrate({ cwd: "/repo", taskId: "T-1", runVerify: false }),
    ).rejects.toMatchObject<CliError>({
      code: "E_USAGE",
    });
  });

  it("resolves the task branch from the active task branch snapshot when pr metadata is missing", async () => {
    const { prepareIntegrate } = await import("./prepare.js");
    seedCommon();
    mocks.loadCommandContext.mockResolvedValue(mkCtx("branch_pr"));
    mocks.fileExists.mockResolvedValue(false);
    mocks.resolveTaskBranchFromContext.mockResolvedValue("task/T-1");
    mocks.parsePrMeta.mockReturnValue({
      branch: "task/T-1",
      head_sha: "deadbeef",
      last_verified_sha: null,
    });
    mocks.readPrArtifact.mockResolvedValue(
      JSON.stringify({ branch: "task/T-1", head_sha: "deadbeef", last_verified_sha: null }),
    );

    await expect(
      prepareIntegrate({ cwd: "/repo", taskId: "T-1", runVerify: false }),
    ).resolves.toMatchObject({
      branch: "task/T-1",
      base: "main",
      branchHeadSha: "deadbeef",
    });
  });

  it("allows branches to remove the optional tasks export snapshot from tracked state", async () => {
    const { prepareIntegrate } = await import("./prepare.js");
    seedCommon();
    mocks.loadCommandContext.mockResolvedValue(mkCtx("branch_pr"));
    mocks.gitDiffNames.mockResolvedValue([".agentplane/tasks.json"]);
    mocks.parsePrMeta.mockReturnValue({
      branch: "task/T-1",
      head_sha: "deadbeef",
      last_verified_sha: null,
    });
    await expect(
      prepareIntegrate({ cwd: "/repo", taskId: "T-1", runVerify: false }),
    ).resolves.toMatchObject({
      branch: "task/T-1",
      base: "main",
    });
  });

  it("rejects stale PR metadata when head_sha no longer matches the branch head", async () => {
    const { prepareIntegrate } = await import("./prepare.js");
    seedCommon();
    mocks.loadCommandContext.mockResolvedValue(mkCtx("branch_pr"));
    mocks.parsePrMeta.mockReturnValue({
      branch: "task/T-1",
      head_sha: "stalebeef",
      last_verified_sha: null,
    });
    mocks.gitRevParse.mockResolvedValue("deadbeef");
    const promise = prepareIntegrate({ cwd: "/repo", taskId: "T-1", runVerify: false });
    await expect(promise).rejects.toMatchObject<CliError>({
      code: "E_VALIDATION",
    });
    await expect(promise).rejects.toThrow(/meta\.head_sha=stalebeef/u);
  });

  it("repairs stale PR metadata from the task worktree before integrate fails", async () => {
    const { prepareIntegrate } = await import("./prepare.js");
    seedCommon();
    mocks.loadCommandContext.mockResolvedValue(mkCtx("branch_pr"));
    mocks.findWorktreeForBranch.mockResolvedValue("/repo/.agentplane/worktrees/T-1");
    mocks.parsePrMeta
      .mockReturnValueOnce({
        branch: "task/T-1",
        head_sha: "deadbeef",
        last_verified_sha: null,
      })
      .mockReturnValueOnce({
        branch: "task/T-1",
        head_sha: "stalebeef",
        last_verified_sha: null,
      })
      .mockReturnValueOnce({
        branch: "task/T-1",
        head_sha: "deadbeef",
        last_verified_sha: null,
      });
    mocks.readPrArtifact
      .mockResolvedValueOnce(
        JSON.stringify({ branch: "task/T-1", head_sha: "stalebeef", last_verified_sha: null }),
      )
      .mockResolvedValueOnce(
        JSON.stringify({ branch: "task/T-1", head_sha: "deadbeef", last_verified_sha: null }),
      );

    await expect(
      prepareIntegrate({ cwd: "/repo", taskId: "T-1", runVerify: false }),
    ).resolves.toMatchObject({
      branch: "task/T-1",
      branchHeadSha: "deadbeef",
      metaSource: { head_sha: "deadbeef" },
    });
    expect(mocks.ensurePrArtifactsSynced).toHaveBeenCalledWith({
      cwd: "/repo/.agentplane/worktrees/T-1",
      taskId: "T-1",
      branch: "task/T-1",
    });
  });

  it("accepts task-local-only advance between rendered sha and branch head", async () => {
    const { prepareIntegrate } = await import("./prepare.js");
    seedCommon();
    mocks.loadCommandContext.mockResolvedValue(mkCtx("branch_pr"));
    mocks.parsePrMeta.mockReturnValue({
      branch: "task/T-1",
      head_sha: "oldbeef",
      last_verified_sha: "oldbeef",
      verify: { status: "pass" },
    });
    mocks.gitRevParse.mockResolvedValue("deadbeef");
    mocks.isTaskLocalOnlyAdvance.mockResolvedValue(true);

    await expect(
      prepareIntegrate({ cwd: "/repo", taskId: "T-1", runVerify: false }),
    ).resolves.toMatchObject({
      branchHeadSha: "deadbeef",
      shouldRunVerify: false,
      alreadyVerifiedSha: null,
    });
    expect(mocks.computeVerifyState).toHaveBeenCalledWith(
      expect.objectContaining({
        metaLastVerifiedSha: null,
        branchHeadSha: "deadbeef",
      }),
    );
  });

  it("accepts verify-log-backed verification when meta verify sha is missing", async () => {
    const { prepareIntegrate } = await import("./prepare.js");
    seedCommon();
    mocks.loadCommandContext.mockResolvedValue(mkCtx("branch_pr"));
    mocks.parsePrMeta.mockReturnValue({
      branch: "task/T-1",
      head_sha: "deadbeef",
      last_verified_sha: null,
      verify: { status: "skipped" },
    });
    mocks.loadTaskFromContext.mockResolvedValue({
      id: "T-1",
      verify: ["echo ok"],
      title: "Branch-backed task",
    });
    mocks.readAndValidatePrArtifacts.mockResolvedValue({
      verifyLogText: "[2026-04-07T20:00:00.000Z] ✅ verified_sha=deadbeef\n",
    });
    mocks.extractLastVerifiedSha.mockReturnValue("deadbeef");

    await expect(
      prepareIntegrate({ cwd: "/repo", taskId: "T-1", runVerify: false }),
    ).resolves.toMatchObject({
      branchHeadSha: "deadbeef",
      shouldRunVerify: false,
      alreadyVerifiedSha: null,
    });
    expect(mocks.computeVerifyState).toHaveBeenCalledWith(
      expect.objectContaining({
        metaLastVerifiedSha: "deadbeef",
        branchHeadSha: "deadbeef",
      }),
    );
  });

  it("reloads the task via an integrate-scoped branch snapshot preference", async () => {
    const { prepareIntegrate } = await import("./prepare.js");
    seedCommon();
    mocks.loadCommandContext.mockResolvedValue(mkCtx("branch_pr"));
    mocks.loadTaskFromContext.mockResolvedValue({
      id: "T-1",
      verify: [],
      title: "Branch-backed task",
    });
    mocks.parsePrMeta.mockReturnValue({
      branch: "task/T-1",
      head_sha: "deadbeef",
      last_verified_sha: null,
    });

    const prepared = await prepareIntegrate({ cwd: "/repo", taskId: "T-1", runVerify: false });
    expect(prepared.branch).toBe("task/T-1");
    expect(prepared.task).toMatchObject({ title: "Branch-backed task" });

    expect(mocks.loadTaskFromContext).toHaveBeenCalledWith({
      ctx: prepared.ctx,
      taskId: "T-1",
      preferBranchSnapshot: true,
      branchSnapshotBranch: "task/T-1",
    });
  });
});
