import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  cleanupIntegratedBranch: vi.fn(),
  createCliEmitter: vi.fn(),
  finalizeIntegrate: vi.fn(),
  gitRevParse: vi.fn(),
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
  writeTaskHandoff: vi.fn(),
}));

vi.mock("../../../cli/output.js", () => ({
  createCliEmitter: mocks.createCliEmitter,
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

describe("pr/integrate/cmd", () => {
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
    vi.clearAllMocks();
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
    mocks.gitRevParse.mockResolvedValueOnce("base-sha").mockResolvedValueOnce("head-sha");
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

  it("bootstraps the base worktree before merge when runtime layout is missing", async () => {
    mocks.maybeRunPreIntegrateBootstrap.mockResolvedValue({ status: "ran" });
    const { cmdIntegrate } = await import("./cmd.js");

    const exitCode = await cmdIntegrate({
      cwd: "/repo",
      taskId: "T-1",
      mergeStrategy: "squash",
      runVerify: false,
      dryRun: false,
      quiet: false,
    });

    expect(exitCode).toBe(0);
    expect(mocks.maybeRunPreIntegrateBootstrap).toHaveBeenCalledWith({
      gitRoot: "/repo",
      changedPaths: ["packages/agentplane/src/cli.ts"],
    });
    expect(mocks.runSquashMerge).toHaveBeenCalled();
  });

  it("aborts integrate when the base bootstrap fails", async () => {
    mocks.maybeRunPreIntegrateBootstrap.mockResolvedValue({
      status: "failed",
      error: "bootstrap exit 1",
    });
    const { cmdIntegrate } = await import("./cmd.js");

    await expect(
      cmdIntegrate({
        cwd: "/repo",
        taskId: "T-1",
        mergeStrategy: "squash",
        runVerify: false,
        dryRun: false,
        quiet: false,
      }),
    ).rejects.toThrow(
      "Unable to prepare the base worktree for integrate: automatic repo-local runtime refresh failed (bootstrap exit 1). Run `bun run framework:dev:bootstrap` in /repo and retry integrate.",
    );
    expect(mocks.runSquashMerge).not.toHaveBeenCalled();
    expect(mocks.finalizeIntegrate).not.toHaveBeenCalled();
  });

  it("auto-bootstraps after integrate when watched runtime sources changed", async () => {
    const { cmdIntegrate } = await import("./cmd.js");

    const exitCode = await cmdIntegrate({
      cwd: "/repo",
      taskId: "T-1",
      mergeStrategy: "squash",
      runVerify: false,
      dryRun: false,
      quiet: false,
    });

    expect(exitCode).toBe(0);
    expect(mocks.shouldRecommendPostIntegrateBootstrap).toHaveBeenCalledWith([
      "packages/agentplane/src/cli.ts",
    ]);
    expect(mocks.maybeRunPostIntegrateBootstrap).toHaveBeenCalledWith({
      gitRoot: "/repo",
      changedPaths: ["packages/agentplane/src/cli.ts"],
    });
    expect(emitter.warn).not.toHaveBeenCalled();
    expect(mocks.finalizeIntegrate).toHaveBeenCalledWith(
      expect.objectContaining({
        taskId: "T-1",
        mergeHash: "merge-sha",
      }),
    );
  });

  it("warns with manual bootstrap guidance when auto-bootstrap is skipped", async () => {
    mocks.maybeRunPostIntegrateBootstrap.mockResolvedValue({ status: "skipped" });
    const { cmdIntegrate } = await import("./cmd.js");

    await cmdIntegrate({
      cwd: "/repo",
      taskId: "T-1",
      mergeStrategy: "squash",
      runVerify: false,
      dryRun: false,
      quiet: false,
    });

    expect(emitter.warn).toHaveBeenCalledWith(
      "This merge changed watched runtime sources. Run `bun run framework:dev:bootstrap` before the next command so the repo-local build stays current.",
    );
  });

  it("warns explicitly when auto-bootstrap fails", async () => {
    mocks.maybeRunPostIntegrateBootstrap.mockResolvedValue({
      status: "failed",
      error: "bootstrap exit 1",
    });
    const { cmdIntegrate } = await import("./cmd.js");

    await cmdIntegrate({
      cwd: "/repo",
      taskId: "T-1",
      mergeStrategy: "squash",
      runVerify: false,
      dryRun: false,
      quiet: false,
    });

    expect(emitter.warn).toHaveBeenCalledWith(
      "This merge changed watched runtime sources and the automatic repo-local runtime refresh failed (bootstrap exit 1). Run `bun run framework:dev:bootstrap` manually before the next command.",
    );
  });

  it("does not warn when integrate did not touch watched runtime sources", async () => {
    mocks.shouldRecommendPostIntegrateBootstrap.mockReturnValue(false);
    const { cmdIntegrate } = await import("./cmd.js");

    await cmdIntegrate({
      cwd: "/repo",
      taskId: "T-1",
      mergeStrategy: "squash",
      runVerify: false,
      dryRun: false,
      quiet: false,
    });

    expect(mocks.shouldRecommendPostIntegrateBootstrap).toHaveBeenCalled();
    expect(mocks.maybeRunPostIntegrateBootstrap).not.toHaveBeenCalled();
    expect(emitter.warn).not.toHaveBeenCalled();
  });

  it("records a first-class protected-base handoff route before raising E_HANDOFF", async () => {
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
        pr_number: 338,
        pr_url: "https://github.com/example/repo/pull/338",
      },
      branch: "task/T-1",
      base: "main",
      verifyLogText: "",
      branchHeadSha: "head-sha",
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

    expect(caught).toMatchObject({
      code: "E_HANDOFF",
    });
    expect(caught).toBeTruthy();
    const cliError = caught as { context?: Record<string, unknown> };
    expect(cliError.context?.diagnostic_next_action_command).toBe(
      "agentplane task handoff show T-1",
    );

    expect(mocks.buildTaskHandoffArtifact).toHaveBeenCalled();
    const handoffCall = mocks.buildTaskHandoffArtifact.mock.calls[0]?.[0] as
      | {
          route?: Record<string, unknown>;
          next_actions?: string[];
        }
      | undefined;
    expect(handoffCall?.route).toMatchObject({
      kind: "protected_base_integrate",
      status: "awaiting_github_merge",
      local_mutation: "not_performed",
      finalize_via: "github_pr_merge_then_hosted_close",
      pr_number: 338,
      pr_url: "https://github.com/example/repo/pull/338",
      handoff_show_command: "agentplane task handoff show T-1",
      base_pull_command: "git pull --ff-only",
    });
    expect(handoffCall?.next_actions).toEqual(
      expect.arrayContaining(["agentplane task handoff show T-1", "git pull --ff-only"]),
    );
    expect(mocks.writeTaskHandoff).toHaveBeenCalled();
    expect(mocks.runSquashMerge).not.toHaveBeenCalled();
    expect(mocks.finalizeIntegrate).not.toHaveBeenCalled();
  });
});
