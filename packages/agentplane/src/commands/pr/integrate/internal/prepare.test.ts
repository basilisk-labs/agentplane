import { describe, expect, it, vi } from "vitest";

import type { CliError } from "../../../../../shared/errors.js";

const mocks = vi.hoisted(() => ({
  resolveBaseBranch: vi.fn(),
  fileExists: vi.fn(),
  readFile: vi.fn(),
  ensureGitClean: vi.fn(),
  gitDiffNames: vi.fn(),
  gitShowFile: vi.fn(),
  toGitPath: vi.fn((v: string) => v),
  gitBranchExists: vi.fn(),
  gitCurrentBranch: vi.fn(),
  gitRevParse: vi.fn(),
  loadCommandContext: vi.fn(),
  loadTaskFromContext: vi.fn(),
  ensurePlanApprovedIfRequired: vi.fn(),
  ensureVerificationSatisfiedIfRequired: vi.fn(),
  resolvePrPaths: vi.fn(),
  readAndValidatePrArtifacts: vi.fn(),
  computeVerifyState: vi.fn(),
  parsePrMeta: vi.fn(),
  isTaskLocalOnlyAdvance: vi.fn(),
}));

vi.mock("@agentplaneorg/core", () => ({
  resolveBaseBranch: mocks.resolveBaseBranch,
}));
vi.mock("../../../../cli/fs-utils.js", () => ({ fileExists: mocks.fileExists }));
vi.mock("node:fs/promises", () => ({ readFile: mocks.readFile }));
vi.mock("../../../guard/index.js", () => ({ ensureGitClean: mocks.ensureGitClean }));
vi.mock("../../../shared/git-diff.js", () => ({
  gitDiffNames: mocks.gitDiffNames,
  gitShowFile: mocks.gitShowFile,
  toGitPath: mocks.toGitPath,
}));
vi.mock("../../../shared/git-ops.js", () => ({
  gitBranchExists: mocks.gitBranchExists,
  gitCurrentBranch: mocks.gitCurrentBranch,
  gitRevParse: mocks.gitRevParse,
}));
vi.mock("../../../shared/task-backend.js", () => ({
  loadCommandContext: mocks.loadCommandContext,
  loadTaskFromContext: mocks.loadTaskFromContext,
}));
vi.mock("../../../task/shared.js", () => ({
  ensurePlanApprovedIfRequired: mocks.ensurePlanApprovedIfRequired,
  ensureVerificationSatisfiedIfRequired: mocks.ensureVerificationSatisfiedIfRequired,
}));
vi.mock("../../internal/pr-paths.js", () => ({ resolvePrPaths: mocks.resolvePrPaths }));
vi.mock("../artifacts.js", () => ({
  readAndValidatePrArtifacts: mocks.readAndValidatePrArtifacts,
}));
vi.mock("../verify.js", () => ({ computeVerifyState: mocks.computeVerifyState }));
vi.mock("../../../shared/pr-meta.js", () => ({ parsePrMeta: mocks.parsePrMeta }));
vi.mock("../../../shared/task-local-freshness.js", () => ({
  isTaskLocalOnlyAdvance: mocks.isTaskLocalOnlyAdvance,
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
  mocks.resolvePrPaths.mockResolvedValue({
    prDir: "/repo/.agentplane/tasks/T-1/pr",
    metaPath: "/repo/.agentplane/tasks/T-1/pr/meta.json",
    diffstatPath: "/repo/.agentplane/tasks/T-1/pr/diffstat.txt",
    verifyLogPath: "/repo/.agentplane/tasks/T-1/pr/verify.log",
  });
  mocks.fileExists.mockResolvedValue(true);
  mocks.readFile.mockResolvedValue('{"branch":"task/T-1"}');
  mocks.parsePrMeta.mockReturnValue({ branch: "task/T-1", last_verified_sha: null });
  mocks.gitBranchExists.mockResolvedValue(true);
  mocks.readAndValidatePrArtifacts.mockResolvedValue({ verifyLogText: "ok" });
  mocks.gitDiffNames.mockResolvedValue(["src/app.ts"]);
  mocks.gitRevParse.mockResolvedValue("deadbeef");
  mocks.computeVerifyState.mockReturnValue({
    verifyCommands: [],
    alreadyVerifiedSha: null,
    shouldRunVerify: false,
  });
  mocks.isTaskLocalOnlyAdvance.mockResolvedValue(false);
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

  it("rejects single-writer violation when tasks_path is modified", async () => {
    const { prepareIntegrate } = await import("./prepare.js");
    seedCommon();
    mocks.loadCommandContext.mockResolvedValue(mkCtx("branch_pr"));
    mocks.gitDiffNames.mockResolvedValue([".agentplane/tasks.json"]);
    await expect(
      prepareIntegrate({ cwd: "/repo", taskId: "T-1", runVerify: false }),
    ).rejects.toMatchObject<CliError>({
      code: "E_GIT",
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

  it("accepts task-local-only advance between rendered sha and branch head", async () => {
    const { prepareIntegrate } = await import("./prepare.js");
    seedCommon();
    mocks.loadCommandContext.mockResolvedValue(mkCtx("branch_pr"));
    mocks.parsePrMeta.mockReturnValue({
      branch: "task/T-1",
      head_sha: "oldbeef",
      last_verified_sha: "oldbeef",
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
