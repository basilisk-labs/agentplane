import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  execFileAsync: vi.fn(),
  gitBranchExists: vi.fn(),
  findWorktreeForBranch: vi.fn(),
}));

vi.mock("../../../shared/git.js", () => ({
  execFileAsync: mocks.execFileAsync,
  gitEnv: () => ({}),
}));
vi.mock("../../../shared/git-ops.js", () => ({
  gitBranchExists: mocks.gitBranchExists,
}));
vi.mock("../../../shared/git-worktree.js", () => ({
  findWorktreeForBranch: mocks.findWorktreeForBranch,
}));

describe("pr/integrate/internal/cleanup", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.findWorktreeForBranch.mockResolvedValue(null);
    mocks.gitBranchExists.mockResolvedValue(true);
  });

  it("removes a repo-local worktree and then deletes the integrated branch", async () => {
    const { cleanupIntegratedBranch } = await import("./cleanup.js");
    mocks.findWorktreeForBranch.mockResolvedValue("/repo/.agentplane/worktrees/task-T1");

    const result = await cleanupIntegratedBranch({
      gitRoot: "/repo",
      branch: "task/T-1",
    });

    expect(result).toEqual({
      removedBranch: true,
      removedWorktree: true,
      worktreePath: "/repo/.agentplane/worktrees/task-T1",
      skippedReason: null,
    });
    expect(mocks.execFileAsync).toHaveBeenNthCalledWith(
      1,
      "git",
      ["worktree", "remove", "--force", "/repo/.agentplane/worktrees/task-T1"],
      expect.objectContaining({ cwd: "/repo" }),
    );
    expect(mocks.execFileAsync).toHaveBeenNthCalledWith(
      2,
      "git",
      ["branch", "-D", "task/T-1"],
      expect.objectContaining({ cwd: "/repo" }),
    );
  });

  it("removes the branch when no worktree is registered", async () => {
    const { cleanupIntegratedBranch } = await import("./cleanup.js");

    const result = await cleanupIntegratedBranch({
      gitRoot: "/repo",
      branch: "task/T-2",
    });

    expect(result).toEqual({
      removedBranch: true,
      removedWorktree: false,
      worktreePath: null,
      skippedReason: null,
    });
    expect(mocks.execFileAsync).toHaveBeenCalledTimes(1);
    expect(mocks.execFileAsync).toHaveBeenCalledWith(
      "git",
      ["branch", "-D", "task/T-2"],
      expect.objectContaining({ cwd: "/repo" }),
    );
  });

  it("skips auto-cleanup when the branch worktree lives outside the repo", async () => {
    const { cleanupIntegratedBranch } = await import("./cleanup.js");
    mocks.findWorktreeForBranch.mockResolvedValue("/tmp/agentplane-external-worktree");

    const result = await cleanupIntegratedBranch({
      gitRoot: "/repo",
      branch: "task/T-3",
    });

    expect(result).toEqual({
      removedBranch: false,
      removedWorktree: false,
      worktreePath: "/tmp/agentplane-external-worktree",
      skippedReason: "outside_repo",
    });
    expect(mocks.execFileAsync).not.toHaveBeenCalled();
  });
});
