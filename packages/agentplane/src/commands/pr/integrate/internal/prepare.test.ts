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
  loadBackendTask: vi.fn(),
  loadCommandContext: vi.fn(),
  ensurePlanApprovedIfRequired: vi.fn(),
  ensureVerificationSatisfiedIfRequired: vi.fn(),
  resolvePrPaths: vi.fn(),
  readAndValidatePrArtifacts: vi.fn(),
  computeVerifyState: vi.fn(),
  parsePrMeta: vi.fn(),
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
  loadBackendTask: mocks.loadBackendTask,
  loadCommandContext: mocks.loadCommandContext,
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
  mocks.loadBackendTask.mockResolvedValue({ task: { id: "T-1", verify: [] } });
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
});
