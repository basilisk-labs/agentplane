import { describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  resolveBaseBranch: vi.fn(),
  evaluatePolicy: vi.fn(),
  gitCurrentBranch: vi.fn(),
  throwIfPolicyDenied: vi.fn(),
  loadCommandContext: vi.fn(),
}));

vi.mock("@agentplaneorg/core", () => ({ resolveBaseBranch: mocks.resolveBaseBranch }));
vi.mock("../../../policy/evaluate.js", () => ({ evaluatePolicy: mocks.evaluatePolicy }));
vi.mock("../../shared/git-ops.js", () => ({ gitCurrentBranch: mocks.gitCurrentBranch }));
vi.mock("../../shared/policy-deny.js", () => ({ throwIfPolicyDenied: mocks.throwIfPolicyDenied }));
vi.mock("../../shared/task-backend.js", () => ({ loadCommandContext: mocks.loadCommandContext }));

function mkCtx(mode: "direct" | "branch_pr") {
  return {
    config: { workflow_mode: mode },
    resolvedProject: { gitRoot: "/repo" },
    git: {
      statusStagedPaths: vi.fn().mockResolvedValue(["src/app.ts"]),
      statusUnstagedTrackedPaths: vi.fn().mockResolvedValue(["src/dirty.ts"]),
    },
  };
}

describe("guard/impl/policy", () => {
  it("builds policy input without branch data in direct mode", async () => {
    const { guardCommitCheck } = await import("./policy.js");
    const ctx = mkCtx("direct");
    mocks.evaluatePolicy.mockReturnValue({ ok: true, errors: [] });
    await guardCommitCheck({
      ctx: ctx as never,
      cwd: "/repo",
      taskId: "T-1",
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
    });
    expect(ctx.git.statusUnstagedTrackedPaths).not.toHaveBeenCalled();
    const arg = mocks.evaluatePolicy.mock.calls[0]?.[0] as Record<string, unknown>;
    const gitArg = arg.git as Record<string, unknown>;
    expect(gitArg.baseBranch).toBeNull();
    expect(gitArg.currentBranch).toBeUndefined();
    expect(mocks.throwIfPolicyDenied).toHaveBeenCalledTimes(1);
  });

  it("collects branch/base data in branch_pr mode and enforces requireClean", async () => {
    const { guardCommitCheck } = await import("./policy.js");
    const ctx = mkCtx("branch_pr");
    mocks.resolveBaseBranch.mockResolvedValue("main");
    mocks.gitCurrentBranch.mockResolvedValue("main");
    mocks.evaluatePolicy.mockReturnValue({ ok: true, errors: [] });
    await guardCommitCheck({
      ctx: ctx as never,
      cwd: "/repo",
      rootOverride: "/repo",
      taskId: "T-2",
      message: "✅ DEF456 task: msg",
      allow: ["src"],
      allowBase: true,
      allowTasks: true,
      allowPolicy: false,
      allowConfig: false,
      allowHooks: false,
      allowCI: false,
      requireClean: true,
      quiet: true,
    });
    expect(ctx.git.statusUnstagedTrackedPaths).toHaveBeenCalledTimes(1);
    const arg = mocks.evaluatePolicy.mock.calls.at(-1)?.[0] as Record<string, unknown>;
    const gitArg = arg.git as Record<string, unknown>;
    expect(gitArg.baseBranch).toBe("main");
    expect(gitArg.currentBranch).toBe("main");
    expect(mocks.resolveBaseBranch).toHaveBeenCalledTimes(1);
    expect(mocks.gitCurrentBranch).toHaveBeenCalledTimes(1);
  });

  it("loads context when ctx is not provided", async () => {
    const { guardCommitCheck } = await import("./policy.js");
    mocks.loadCommandContext.mockResolvedValue(mkCtx("direct"));
    mocks.evaluatePolicy.mockReturnValue({ ok: true, errors: [] });
    await guardCommitCheck({
      cwd: "/repo",
      taskId: "T-3",
      message: "✅ XYZ789 task: msg",
      allow: ["src"],
      allowBase: false,
      allowTasks: false,
      allowPolicy: false,
      allowConfig: false,
      allowHooks: false,
      allowCI: false,
      requireClean: false,
      quiet: true,
    });
    expect(mocks.loadCommandContext).toHaveBeenCalledTimes(1);
  });
});
