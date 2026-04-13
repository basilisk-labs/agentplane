import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  execFileAsync: vi.fn(),
  gitBranchExists: vi.fn(),
  findWorktreeForBranch: vi.fn(),
}));

vi.mock("./git.js", () => ({
  execFileAsync: mocks.execFileAsync,
  gitEnv: () => ({}),
}));
vi.mock("./git-ops.js", () => ({
  gitBranchExists: mocks.gitBranchExists,
}));
vi.mock("./git-worktree.js", () => ({
  findWorktreeForBranch: mocks.findWorktreeForBranch,
}));

describe("commands/shared/merged-branch-cleanup", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.findWorktreeForBranch.mockResolvedValue(null);
    mocks.gitBranchExists.mockResolvedValue(true);
  });

  it("removes a repo-local worktree and then deletes the merged branch", async () => {
    const { cleanupMergedLocalBranch } = await import("./merged-branch-cleanup.js");
    mocks.findWorktreeForBranch.mockResolvedValue("/repo/.agentplane/worktrees/task-T1");

    const result = await cleanupMergedLocalBranch({
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
    const { cleanupMergedLocalBranch } = await import("./merged-branch-cleanup.js");

    const result = await cleanupMergedLocalBranch({
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

  it("skips cleanup when the branch worktree lives outside the repo", async () => {
    const { cleanupMergedLocalBranch } = await import("./merged-branch-cleanup.js");
    mocks.findWorktreeForBranch.mockResolvedValue("/tmp/agentplane-external-worktree");

    const result = await cleanupMergedLocalBranch({
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

  it("skips cleanup when the merged branch is the current checkout", async () => {
    const { cleanupMergedLocalBranch } = await import("./merged-branch-cleanup.js");
    mocks.findWorktreeForBranch.mockResolvedValue("/repo");

    const result = await cleanupMergedLocalBranch({
      gitRoot: "/repo",
      branch: "task/T-4",
    });

    expect(result).toEqual({
      removedBranch: false,
      removedWorktree: false,
      worktreePath: "/repo",
      skippedReason: "current_worktree",
    });
    expect(mocks.execFileAsync).not.toHaveBeenCalled();
  });
});
