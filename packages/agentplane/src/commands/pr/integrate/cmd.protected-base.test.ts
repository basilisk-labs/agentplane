import { beforeEach, describe, expect, it, vi } from "vitest";
import { CliError } from "../../../shared/errors.js";

const mocks = vi.hoisted(() => ({
  cleanupIntegratedBranch: vi.fn(),
  createCliEmitter: vi.fn(),
  execFileAsync: vi.fn(),
  finalizeIntegrate: vi.fn(),
  gitRevParse: vi.fn(),
  gitProofIsAncestor: vi.fn(),
  resolveCurrentProviderBaseHead: vi.fn(),
  runGhApiJson: vi.fn(),
  resolveDefaultGithubRepo: vi.fn(),
  runGlabApiJson: vi.fn(),
  buildTaskHandoffArtifact: vi.fn(),
  maybeRunPreIntegrateBootstrap: vi.fn(),
  maybeRunPostIntegrateBootstrap: vi.fn(),
  prepareIntegrate: vi.fn(),
  resolveTaskHandoffPaths: vi.fn(),
  resolveWorktreeForIntegrate: vi.fn(),
  runMergeCommit: vi.fn(),
  runRebaseFastForward: vi.fn(),
  runSquashMerge: vi.fn(),
  runVerifyCommands: vi.fn(),
  shouldRecommendPostIntegrateBootstrap: vi.fn(),
  requireOpenGithubPrAtHead: vi.fn(),
  checkGithubUnresolvedReviewThreads: vi.fn(),
  throwIfGithubReviewThreadsUnresolved: vi.fn(),
  writeTaskHandoff: vi.fn(),
  requireCleanTaskWorktree: vi.fn(),
}));

vi.mock("@agentplaneorg/core/git", async (original) => ({
  ...(await original<Record<string, unknown>>()),
  gitProofIsAncestor: mocks.gitProofIsAncestor,
}));
vi.mock("../internal/glab-api.js", () => ({ runGlabApiJson: mocks.runGlabApiJson }));
vi.mock("../internal/provider-base.js", () => ({
  resolveCurrentProviderBaseHead: mocks.resolveCurrentProviderBaseHead,
}));
vi.mock("../internal/gh-api.js", async (original) => ({
  ...(await original<Record<string, unknown>>()),
  runGhApiJson: mocks.runGhApiJson,
  resolveDefaultGithubRepo: mocks.resolveDefaultGithubRepo,
}));

vi.mock("../../../cli/output.js", () => ({
  createCliEmitter: mocks.createCliEmitter,
}));
vi.mock("@agentplaneorg/core/process", () => ({
  execFileAsync: mocks.execFileAsync,
}));
vi.mock("../../shared/merged-branch-cleanup.js", () => ({
  cleanupMergedLocalBranch: mocks.cleanupIntegratedBranch,
}));
vi.mock("./internal/finalize.js", () => ({
  finalizeIntegrate: mocks.finalizeIntegrate,
}));
vi.mock("./internal/pre-integrate-bootstrap.js", () => ({
  maybeRunPreIntegrateBootstrap: mocks.maybeRunPreIntegrateBootstrap,
}));
vi.mock("./internal/post-integrate-bootstrap.js", () => ({
  maybeRunPostIntegrateBootstrap: mocks.maybeRunPostIntegrateBootstrap,
}));
vi.mock("./internal/merge.js", () => ({
  runMergeCommit: mocks.runMergeCommit,
  runRebaseFastForward: mocks.runRebaseFastForward,
  runSquashMerge: mocks.runSquashMerge,
}));
vi.mock("./internal/prepare.js", () => ({
  prepareIntegrate: mocks.prepareIntegrate,
}));
vi.mock("./internal/worktree.js", () => ({
  resolveWorktreeForIntegrate: mocks.resolveWorktreeForIntegrate,
}));
vi.mock("./verify.js", () => ({
  runVerifyCommands: mocks.runVerifyCommands,
}));
vi.mock("./internal/bootstrap-guidance.js", () => ({
  renderPostIntegrateBootstrapGuidance: () =>
    "This merge changed watched runtime sources. Run `bun run framework:dev:bootstrap` before the next command so the repo-local build stays current.",
  renderPostIntegrateBootstrapFailureGuidance: (reason: string) =>
    `This merge changed watched runtime sources and the automatic repo-local runtime refresh failed (${reason}). Run \`bun run framework:dev:bootstrap\` manually before the next command.`,
  shouldRecommendPostIntegrateBootstrap: mocks.shouldRecommendPostIntegrateBootstrap,
}));
vi.mock("../../shared/git-ops.js", () => ({
  gitRevParse: mocks.gitRevParse,
}));
vi.mock("../../shared/task-handoff.js", () => ({
  buildTaskHandoffArtifact: mocks.buildTaskHandoffArtifact,
  resolveTaskHandoffPaths: mocks.resolveTaskHandoffPaths,
  writeTaskHandoff: mocks.writeTaskHandoff,
}));
vi.mock("../provider-head.js", () => ({
  requireOpenGithubPrAtHead: mocks.requireOpenGithubPrAtHead,
}));
vi.mock("../internal/github-review-threads.js", () => ({
  checkGithubUnresolvedReviewThreads: mocks.checkGithubUnresolvedReviewThreads,
  throwIfGithubReviewThreadsUnresolved: mocks.throwIfGithubReviewThreadsUnresolved,
}));
vi.mock("../../shared/task-worktree-cleanliness.js", () => ({
  requireCleanTaskWorktree: mocks.requireCleanTaskWorktree,
}));

describe("pr/integrate/cmd protected-base", () => {
  let emitter: {
    line: ReturnType<typeof vi.fn>;
    lines: ReturnType<typeof vi.fn>;
    json: ReturnType<typeof vi.fn>;
    jsonSection: ReturnType<typeof vi.fn>;
    report: ReturnType<typeof vi.fn>;
    info: ReturnType<typeof vi.fn>;
    warn: ReturnType<typeof vi.fn>;
    success: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
    mocks.resolveDefaultGithubRepo.mockResolvedValue("example/repo");
    mocks.gitProofIsAncestor.mockResolvedValue(true);
    mocks.resolveCurrentProviderBaseHead.mockReset().mockResolvedValue("base-sha");
    mocks.runGhApiJson.mockResolvedValue({
      required_status_checks: { strict: true, contexts: ["ci"] },
      enforce_admins: { enabled: true },
    });
    emitter = {
      line: vi.fn(),
      lines: vi.fn(),
      json: vi.fn(),
      jsonSection: vi.fn(),
      report: vi.fn(),
      info: vi.fn(),
      warn: vi.fn(),
      success: vi.fn(),
    };
    mocks.createCliEmitter.mockReturnValue(emitter);
    mocks.execFileAsync.mockImplementation((_command: string, args: string[]) =>
      Promise.resolve({
        stdout:
          args.includes("api") && args.includes("PUT") ? JSON.stringify({ merged: true }) : "",
        stderr: "",
      }),
    );
    mocks.checkGithubUnresolvedReviewThreads.mockResolvedValue({
      checked: true,
      unresolved: [],
    });
    mocks.requireOpenGithubPrAtHead.mockResolvedValue({
      prNumber: 338,
      prUrl: "https://github.com/example/repo/pull/338",
      status: "OPEN",
      mergedAt: null,
      mergeCommit: null,
      base: "main",
      baseSha: "base-sha",
      headSha: "head-sha",
      identity: {
        provider: "github",
        hostname: "github.com",
        remote: "origin",
        sourceProject: "example/repo",
        targetProject: "example/repo",
        sourceUrl: "https://github.com/example/repo.git",
        targetUrl: "https://github.com/example/repo.git",
      },
    });
    mocks.prepareIntegrate.mockResolvedValue({
      ctx: { config: {}, git: {}, taskBackend: {}, resolvedProject: { gitRoot: "/repo" } },
      resolved: { gitRoot: "/repo" },
      loadedConfig: {
        workflow_mode: "branch_pr",
        paths: {
          worktrees_dir: ".agentplane/worktrees",
          workflow_dir: ".agentplane/tasks",
        },
        commit: { generic_tokens: [] },
      },
      task: { id: "T-1", title: "Task", tags: [], verify: [], status: "DOING" },
      prDir: "/repo/.agentplane/tasks/T-1/pr",
      metaPath: "/repo/.agentplane/tasks/T-1/pr/meta.json",
      diffstatPath: "/repo/.agentplane/tasks/T-1/pr/diffstat.txt",
      verifyLogPath: "/repo/.agentplane/tasks/T-1/pr/verify.log",
      metaSource: {
        base: "main",
        branch: "task/T-1",
        head_sha: "head-sha",
        last_verified_sha: null,
      },
      branch: "task/T-1",
      base: "main",
      verifyLogText: "",
      branchHeadSha: "head-sha",
      baseHeadSha: "base-sha",
      changedPaths: ["packages/agentplane/src/cli.ts"],
      verifyCommands: [],
      alreadyVerifiedSha: null,
      shouldRunVerify: false,
    });
    mocks.resolveWorktreeForIntegrate.mockResolvedValue({
      worktreePath: null,
      tempWorktreePath: null,
      createdTempWorktree: false,
    });
    mocks.gitRevParse
      .mockReset()
      .mockImplementation((_root: string, args: string[]) =>
        Promise.resolve(args[0] === "main" ? "base-sha" : "head-sha"),
      );
    mocks.runSquashMerge.mockResolvedValue("merge-sha");
    mocks.finalizeIntegrate.mockResolvedValue(null);
    mocks.resolveTaskHandoffPaths.mockReturnValue({
      handoff_dir: "/repo/.agentplane/tasks/T-1/handoff",
      latest_path: "/repo/.agentplane/tasks/T-1/handoff/latest.json",
      history_path: "/repo/.agentplane/tasks/T-1/handoff/history.jsonl",
    });
    mocks.buildTaskHandoffArtifact.mockImplementation(
      (payload: Record<string, unknown>) => payload,
    );
    mocks.writeTaskHandoff.mockResolvedValue();
    mocks.requireCleanTaskWorktree.mockResolvedValue({
      state: "clean",
      branch: "task/T-1",
      worktreePath: "/repo/.agentplane/worktrees/T-1",
      changedPaths: [],
    });
    mocks.cleanupIntegratedBranch.mockResolvedValue({
      removedBranch: true,
      removedWorktree: false,
      worktreePath: null,
      skippedReason: null,
    });
    mocks.maybeRunPreIntegrateBootstrap.mockResolvedValue({ status: "not-needed" });
    mocks.maybeRunPostIntegrateBootstrap.mockResolvedValue({ status: "ran" });
    mocks.shouldRecommendPostIntegrateBootstrap.mockReturnValue(true);
  });

  it("refuses protected-base integration when live PR identity cannot be confirmed", async () => {
    mocks.requireOpenGithubPrAtHead.mockRejectedValue(
      new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message: "GitHub PR was not found for task/T-1",
      }),
    );
    mocks.prepareIntegrate.mockResolvedValue({
      ctx: {
        config: { paths: { workflow_dir: ".agentplane/tasks" } },
        git: {},
        taskBackend: {},
        resolvedProject: { gitRoot: "/repo" },
      },
      resolved: { gitRoot: "/repo" },
      loadedConfig: {
        workflow_mode: "branch_pr",
        paths: {
          worktrees_dir: ".agentplane/worktrees",
          workflow_dir: ".agentplane/tasks",
        },
        commit: { generic_tokens: [] },
      },
      task: { id: "T-1", title: "Task", tags: [], verify: [], status: "DOING" },
      prDir: "/repo/.agentplane/tasks/T-1/pr",
      metaPath: "/repo/.agentplane/tasks/T-1/pr/meta.json",
      diffstatPath: "/repo/.agentplane/tasks/T-1/pr/diffstat.txt",
      verifyLogPath: "/repo/.agentplane/tasks/T-1/pr/verify.log",
      metaSource: {
        base: "main",
        branch: "task/T-1",
        head_sha: "head-sha",
      },
      branch: "task/T-1",
      base: "main",
      verifyLogText: "",
      branchHeadSha: "head-sha",
      baseHeadSha: "base-sha",
      changedPaths: [],
      verifyCommands: [],
      alreadyVerifiedSha: null,
      shouldRunVerify: false,
      protectedBaseRequiresPrMerge: true,
    });
    const { cmdIntegrate } = await import("./cmd.js");

    const caught = await cmdIntegrate({
      cwd: "/repo",
      taskId: "T-1",
      mergeStrategy: "squash",
      runVerify: false,
      dryRun: false,
      quiet: false,
    }).catch((err: unknown) => err);

    expect(caught).toMatchObject({ code: "E_VALIDATION" });
    expect(mocks.buildTaskHandoffArtifact).not.toHaveBeenCalled();
    expect(mocks.writeTaskHandoff).not.toHaveBeenCalled();
    expect(mocks.runSquashMerge).not.toHaveBeenCalled();
    expect(mocks.finalizeIntegrate).not.toHaveBeenCalled();
  });

  it("refuses protected-base handoff when GitHub omits the observed base SHA", async () => {
    mocks.requireOpenGithubPrAtHead.mockResolvedValue({
      prNumber: 338,
      prUrl: "https://github.com/example/repo/pull/338",
      status: "OPEN",
      mergedAt: null,
      mergeCommit: null,
      base: "main",
      baseSha: null,
      headSha: "head-sha",
      identity: {
        provider: "github",
        hostname: "github.com",
        remote: "origin",
        sourceProject: "example/repo",
        targetProject: "example/repo",
        sourceUrl: "https://github.com/example/repo.git",
        targetUrl: "https://github.com/example/repo.git",
      },
    });
    mocks.prepareIntegrate.mockResolvedValue({
      ctx: {
        config: { paths: { workflow_dir: ".agentplane/tasks" } },
        git: {},
        taskBackend: {},
        resolvedProject: { gitRoot: "/repo" },
      },
      resolved: { gitRoot: "/repo" },
      loadedConfig: {
        workflow_mode: "branch_pr",
        paths: {
          worktrees_dir: ".agentplane/worktrees",
          workflow_dir: ".agentplane/tasks",
        },
        commit: { generic_tokens: [] },
      },
      task: { id: "T-1", title: "Task", tags: [], verify: [], status: "DOING" },
      prDir: "/repo/.agentplane/tasks/T-1/pr",
      metaPath: "/repo/.agentplane/tasks/T-1/pr/meta.json",
      diffstatPath: "/repo/.agentplane/tasks/T-1/pr/diffstat.txt",
      verifyLogPath: "/repo/.agentplane/tasks/T-1/pr/verify.log",
      metaSource: { base: "main", branch: "task/T-1", head_sha: "head-sha" },
      branch: "task/T-1",
      base: "main",
      verifyLogText: "",
      branchHeadSha: "head-sha",
      baseHeadSha: "base-sha",
      changedPaths: [],
      verifyCommands: [],
      alreadyVerifiedSha: null,
      shouldRunVerify: false,
      protectedBaseRequiresPrMerge: true,
    });
    const { cmdIntegrate } = await import("./cmd.js");

    const caught = await cmdIntegrate({
      cwd: "/repo",
      taskId: "T-1",
      mergeStrategy: "squash",
      runVerify: false,
      dryRun: false,
      quiet: false,
    }).catch((err: unknown) => err);

    expect(caught).toMatchObject({ code: "E_VALIDATION" });
    expect(String((caught as Error).message)).toContain(
      "GitHub PR base differs from the qualified integration base",
    );
    expect(mocks.buildTaskHandoffArtifact).not.toHaveBeenCalled();
    expect(mocks.writeTaskHandoff).not.toHaveBeenCalled();
    expect(
      mocks.execFileAsync.mock.calls.filter((call) => {
        const args: unknown = (call as unknown[])[1];
        return Array.isArray(args) && args.includes("PUT");
      }),
    ).toEqual([]);
  });

  it("resolves the protected-base GitHub PR target from live branch state", async () => {
    mocks.requireOpenGithubPrAtHead.mockResolvedValue({
      prNumber: 339,
      prUrl: "https://github.com/example/repo/pull/339",
      status: "OPEN",
      mergedAt: null,
      mergeCommit: null,
      base: "main",
      baseSha: "base-sha",
      headSha: "head-sha",
      identity: {
        provider: "github",
        hostname: "github.com",
        remote: "origin",
        sourceProject: "example/repo",
        targetProject: "example/repo",
        sourceUrl: "https://github.com/example/repo.git",
        targetUrl: "https://github.com/example/repo.git",
      },
    });
    mocks.prepareIntegrate.mockResolvedValue({
      ctx: {
        config: { paths: { workflow_dir: ".agentplane/tasks" } },
        git: {},
        taskBackend: {},
        resolvedProject: { gitRoot: "/repo" },
      },
      resolved: { gitRoot: "/repo" },
      loadedConfig: {
        workflow_mode: "branch_pr",
        paths: {
          worktrees_dir: ".agentplane/worktrees",
          workflow_dir: ".agentplane/tasks",
        },
        commit: { generic_tokens: [] },
      },
      task: { id: "T-1", title: "Task", tags: [], verify: [], status: "DOING" },
      prDir: "/repo/.agentplane/tasks/T-1/pr",
      metaPath: "/repo/.agentplane/tasks/T-1/pr/meta.json",
      diffstatPath: "/repo/.agentplane/tasks/T-1/pr/diffstat.txt",
      verifyLogPath: "/repo/.agentplane/tasks/T-1/pr/verify.log",
      metaSource: {
        base: "main",
        branch: "task/T-1",
        head_sha: "head-sha",
      },
      branch: "task/T-1",
      base: "main",
      verifyLogText: "",
      branchHeadSha: "head-sha",
      baseHeadSha: "base-sha",
      changedPaths: [],
      verifyCommands: [],
      alreadyVerifiedSha: null,
      shouldRunVerify: false,
      protectedBaseRequiresPrMerge: true,
    });
    const { cmdIntegrate } = await import("./cmd.js");

    const caught = await cmdIntegrate({
      cwd: "/repo",
      taskId: "T-1",
      mergeStrategy: "squash",
      runVerify: false,
      dryRun: false,
      quiet: false,
    }).catch((err: unknown) => err);

    expect(caught).toMatchObject({ code: "E_HANDOFF" });
    expect(mocks.requireOpenGithubPrAtHead).toHaveBeenCalledWith({
      gitRoot: "/repo",
      branch: "task/T-1",
      base: "main",
      expectedHeadSha: "head-sha",
      prNumber: null,
    });
    expect(mocks.execFileAsync).toHaveBeenCalledWith(
      "gh",
      [
        "api",
        "-X",
        "PUT",
        "repos/example/repo/pulls/339/merge",
        "-f",
        "merge_method=rebase",
        "-f",
        "sha=head-sha",
      ],
      expect.objectContaining({ cwd: "/repo" }),
    );
    const handoffCall = mocks.buildTaskHandoffArtifact.mock.calls[0]?.[0] as
      { route?: Record<string, unknown> } | undefined;
    expect(handoffCall?.route).toMatchObject({
      pr_number: 339,
      pr_url: "https://github.com/example/repo/pull/339",
      provider_base_sha: "base-sha",
    });
  });
  it.each([
    ["github", "base"],
    ["github", "head"],
    ["github", "identity"],
    ["gitlab", "base"],
    ["gitlab", "head"],
    ["gitlab", "identity"],
  ])("refuses %s hosted %s drift before mutation", async (provider, drift) => {
    const identity = {
      provider,
      hostname: provider === "github" ? "github.com" : "gitlab.example.test",
      remote: "origin",
      sourceProject: "example/repo",
      targetProject: "example/repo",
      sourceUrl: "https://example.test/example/repo.git",
      targetUrl: "https://example.test/example/repo.git",
    };
    const initial = {
      prNumber: 338,
      prUrl: "https://github.com/example/repo/pull/338",
      provider,
      baseSha: "base-sha",
      headSha: "head-sha",
      identity,
    };
    mocks.requireOpenGithubPrAtHead
      .mockReset()
      .mockResolvedValueOnce(initial)
      .mockResolvedValue({
        ...initial,
        baseSha: drift === "base" ? "advanced-base" : "base-sha",
        headSha: drift === "head" ? "advanced-head" : "head-sha",
        identity: drift === "identity" ? { ...identity, targetProject: "foreign/repo" } : identity,
      });
    mocks.runGlabApiJson.mockResolvedValue({ merge_method: "ff", auto_rebase_enabled: false });
    mocks.gitRevParse.mockReset().mockResolvedValue("head-sha");
    const { handleProtectedBaseIntegrate } = await import("./internal/protected-base-handoff.js");
    await expect(
      handleProtectedBaseIntegrate({
        ctx: {
          config: { paths: { workflow_dir: ".agentplane/tasks" } },
          resolvedProject: { gitRoot: "/repo" },
        } as never,
        taskId: "T-1",
        branch: "task/T-1",
        base: "main",
        branchHeadSha: "head-sha",
        expectedBaseSha: "base-sha",
        metaSource: {},
        preMutationGuard: () => Promise.resolve(),
      }),
    ).rejects.toMatchObject({ code: "E_GIT_RACE" });
    expect(
      mocks.execFileAsync.mock.calls.some(([, args]) => (args as string[]).includes("PUT")),
    ).toBe(false);
    expect(
      mocks.runGlabApiJson.mock.calls.some(
        ([call]) => (call as { method?: string }).method === "PUT",
      ),
    ).toBe(false);
  });

  it.each(["head", "base", "containment"])(
    "refuses qualified %s drift during merge handoff",
    async (drift) => {
      mocks.gitRevParse
        .mockReset()
        .mockResolvedValue(drift === "head" ? "advanced-head" : "head-sha");
      mocks.resolveCurrentProviderBaseHead.mockResolvedValue(
        drift === "base" ? "advanced-base" : "base-sha",
      );
      mocks.gitProofIsAncestor.mockResolvedValue(drift !== "containment");
      const { handleProtectedBaseIntegrate } = await import("./internal/protected-base-handoff.js");
      await expect(
        handleProtectedBaseIntegrate({
          ctx: {
            config: { paths: { workflow_dir: ".agentplane/tasks" } },
            resolvedProject: { gitRoot: "/repo" },
          } as never,
          taskId: "T-1",
          branch: "task/T-1",
          base: "main",
          branchHeadSha: "head-sha",
          expectedBaseSha: "base-sha",
          metaSource: {},
          preMutationGuard: () => Promise.resolve(),
        }),
      ).rejects.toMatchObject({ code: "E_GIT_RACE" });
      expect(
        mocks.execFileAsync.mock.calls.some(([, args]) => (args as string[]).includes("PUT")),
      ).toBe(false);
    },
  );
});
