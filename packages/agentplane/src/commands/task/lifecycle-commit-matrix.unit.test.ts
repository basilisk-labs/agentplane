import { defaultConfig } from "@agentplaneorg/core/config";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { CommandContext } from "../shared/task-backend.js";

const mocks = vi.hoisted(() => ({
  gitCurrentBranch: vi.fn(),
  resolveBaseBranch: vi.fn(),
}));

vi.mock("@agentplaneorg/core/git", async () => {
  const actualUnknown: unknown = await vi.importActual("@agentplaneorg/core/git");
  const actual =
    actualUnknown && typeof actualUnknown === "object"
      ? (actualUnknown as Record<string, unknown>)
      : {};
  return {
    ...actual,
    resolveBaseBranch: mocks.resolveBaseBranch,
  };
});

vi.mock("../shared/git-ops.js", async (importOriginal) => {
  const actualUnknown: unknown = await importOriginal();
  const actual =
    actualUnknown && typeof actualUnknown === "object"
      ? (actualUnknown as Record<string, unknown>)
      : {};
  return {
    ...actual,
    gitCurrentBranch: mocks.gitCurrentBranch,
  };
});

function mkCtx(mode: "direct" | "branch_pr"): CommandContext {
  const config = defaultConfig();
  config.workflow_mode = mode;
  return {
    config,
    resolvedProject: {
      gitRoot: "/repo",
      agentplaneDir: "/repo/.agentplane",
    },
  } as CommandContext;
}

describe("lifecycle commit-from-comment matrix", () => {
  beforeEach(() => {
    mocks.gitCurrentBranch.mockReset();
    mocks.resolveBaseBranch.mockReset();
  });

  it("allows task lifecycle comment commits in direct mode without branch lookup", async () => {
    const { ensureLifecycleCommentCommitLocation } = await import("./shared/transitions.js");

    await expect(
      ensureLifecycleCommentCommitLocation({
        enabled: true,
        ctx: mkCtx("direct"),
        cwd: "/repo",
        command: "task start-ready",
        taskId: "T-1",
      }),
    ).resolves.toBeUndefined();

    expect(mocks.resolveBaseBranch).not.toHaveBeenCalled();
    expect(mocks.gitCurrentBranch).not.toHaveBeenCalled();
  });

  it("allows start-ready and set-status comment commits from a branch_pr task worktree", async () => {
    mocks.resolveBaseBranch.mockResolvedValue("main");
    mocks.gitCurrentBranch.mockResolvedValue("task/T-1/work");
    const { ensureLifecycleCommentCommitLocation } = await import("./shared/transitions.js");

    await expect(
      ensureLifecycleCommentCommitLocation({
        enabled: true,
        ctx: mkCtx("branch_pr"),
        cwd: "/repo",
        command: "task start-ready",
        taskId: "T-1",
      }),
    ).resolves.toBeUndefined();
    await expect(
      ensureLifecycleCommentCommitLocation({
        enabled: true,
        ctx: mkCtx("branch_pr"),
        cwd: "/repo",
        command: "task set-status",
        taskId: "T-1",
      }),
    ).resolves.toBeUndefined();
  });

  it("rejects start-ready and set-status comment commits from the branch_pr base checkout", async () => {
    mocks.resolveBaseBranch.mockResolvedValue("main");
    mocks.gitCurrentBranch.mockResolvedValue("main");
    const { ensureLifecycleCommentCommitLocation } = await import("./shared/transitions.js");

    const runStartReady = () =>
      ensureLifecycleCommentCommitLocation({
        enabled: true,
        ctx: mkCtx("branch_pr"),
        cwd: "/repo",
        command: "task start-ready",
        taskId: "T-1",
      });
    await expect(runStartReady()).rejects.toMatchObject({ code: "E_USAGE" });
    await expect(runStartReady()).rejects.toThrow("branch_pr base checkout");
    await expect(
      ensureLifecycleCommentCommitLocation({
        enabled: true,
        ctx: mkCtx("branch_pr"),
        cwd: "/repo",
        command: "task set-status",
        taskId: "T-1",
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
  });

  it("rejects finish comment commits anywhere in branch_pr", async () => {
    const { ensureLifecycleCommentCommitLocation } = await import("./shared/transitions.js");

    const runFinish = () =>
      ensureLifecycleCommentCommitLocation({
        enabled: true,
        ctx: mkCtx("branch_pr"),
        cwd: "/repo",
        command: "finish",
        taskId: "T-1",
      });
    await expect(runFinish()).rejects.toMatchObject({ code: "E_USAGE" });
    await expect(runFinish()).rejects.toThrow("finish --commit-from-comment is not supported");
  });

  it("keeps verify out of the commit-from-comment surface", async () => {
    const { verifySpec } = await import("../verify.spec.js");

    expect(verifySpec.options.some((option) => option.name === "commit-from-comment")).toBe(false);
  });
});
