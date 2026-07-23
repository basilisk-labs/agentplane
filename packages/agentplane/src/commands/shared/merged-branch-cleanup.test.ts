import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  execFileAsync: vi.fn(),
  gitBranchExists: vi.fn(),
  gitRevParse: vi.fn(),
  findWorktreeForBranch: vi.fn(),
}));

vi.mock("@agentplaneorg/core/process", () => ({
  execFileAsync: mocks.execFileAsync,
}));
vi.mock("./git-ops.js", () => ({
  gitBranchExists: mocks.gitBranchExists,
  gitRevParse: mocks.gitRevParse,
}));
vi.mock("@agentplaneorg/core/git", () => ({
  findWorktreeForBranch: mocks.findWorktreeForBranch,
  gitEnv: () => ({}),
}));

describe("commands/shared/merged-branch-cleanup", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.findWorktreeForBranch.mockResolvedValue(null);
    mocks.gitBranchExists.mockResolvedValue(true);
    mocks.execFileAsync.mockResolvedValue({ stdout: "", stderr: "" });
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
      preservedDirtyState: false,
      stashMessage: null,
    });
    expect(mocks.execFileAsync).toHaveBeenNthCalledWith(
      1,
      "git",
      ["status", "--porcelain", "--untracked-files=all"],
      expect.objectContaining({ cwd: "/repo/.agentplane/worktrees/task-T1" }),
    );
    expect(mocks.execFileAsync).toHaveBeenNthCalledWith(
      2,
      "git",
      ["worktree", "remove", "/repo/.agentplane/worktrees/task-T1"],
      expect.objectContaining({ cwd: "/repo" }),
    );
    expect(mocks.execFileAsync).toHaveBeenNthCalledWith(
      3,
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
      preservedDirtyState: false,
      stashMessage: null,
    });
    expect(mocks.execFileAsync).toHaveBeenCalledTimes(1);
    expect(mocks.execFileAsync).toHaveBeenCalledWith(
      "git",
      ["branch", "-D", "task/T-2"],
      expect.objectContaining({ cwd: "/repo" }),
    );
  });

  it("treats a branch that disappears after worktree removal as already cleaned up", async () => {
    const { cleanupMergedLocalBranch } = await import("./merged-branch-cleanup.js");
    mocks.findWorktreeForBranch.mockResolvedValue("/repo/.agentplane/worktrees/task-T5");
    mocks.gitBranchExists.mockResolvedValue(false);

    const result = await cleanupMergedLocalBranch({
      gitRoot: "/repo",
      branch: "task/T-5",
    });

    expect(result).toEqual({
      removedBranch: false,
      removedWorktree: true,
      worktreePath: "/repo/.agentplane/worktrees/task-T5",
      skippedReason: null,
      preservedDirtyState: false,
      stashMessage: null,
    });
    expect(mocks.execFileAsync).toHaveBeenCalledTimes(2);
    expect(mocks.execFileAsync).toHaveBeenCalledWith(
      "git",
      ["worktree", "remove", "/repo/.agentplane/worktrees/task-T5"],
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
      preservedDirtyState: false,
      stashMessage: null,
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
      preservedDirtyState: false,
      stashMessage: null,
    });
    expect(mocks.execFileAsync).not.toHaveBeenCalled();
  });

  it("preserves the worktree and H2 branch when atomic H1 deletion loses the race", async () => {
    const { cleanupMergedLocalBranch } = await import("./merged-branch-cleanup.js");
    mocks.findWorktreeForBranch.mockResolvedValue("/repo/.agentplane/worktrees/task-T6");
    mocks.gitRevParse
      .mockResolvedValueOnce("head-1")
      .mockResolvedValueOnce("head-1")
      .mockResolvedValueOnce("head-2");
    mocks.execFileAsync.mockImplementation((_command: string, args: string[]) => {
      if (args[0] === "update-ref") return Promise.reject(new Error("reference changed"));
      return Promise.resolve({ stdout: "", stderr: "" });
    });

    await expect(
      cleanupMergedLocalBranch({
        gitRoot: "/repo",
        branch: "task/T-6",
        expectedHeadSha: "head-1",
      }),
    ).rejects.toMatchObject({
      code: "E_GIT_RACE",
      context: {
        reason_code: "merged_branch_delete_race",
        expected_head_sha: "head-1",
        current_head_sha: "head-2",
      },
    });

    expect(mocks.execFileAsync).toHaveBeenCalledWith(
      "git",
      ["update-ref", "-d", "refs/heads/task/T-6", "head-1"],
      expect.objectContaining({ cwd: "/repo" }),
    );
    expect(mocks.execFileAsync).toHaveBeenCalledWith(
      "git",
      ["worktree", "remove", "/repo/.agentplane/worktrees/task-T6"],
      expect.objectContaining({ cwd: "/repo" }),
    );
    expect(mocks.execFileAsync).toHaveBeenCalledWith(
      "git",
      ["worktree", "add", "/repo/.agentplane/worktrees/task-T6", "task/T-6"],
      expect.objectContaining({ cwd: "/repo" }),
    );
  });

  it("refuses cleanup when the worktree becomes dirty after head validation", async () => {
    const { cleanupMergedLocalBranch } = await import("./merged-branch-cleanup.js");
    mocks.findWorktreeForBranch.mockResolvedValue("/repo/.agentplane/worktrees/task-T7");
    mocks.gitRevParse.mockResolvedValue("head-1");
    mocks.execFileAsync.mockImplementation((_command: string, args: string[]) =>
      Promise.resolve({
        stdout: args[0] === "status" ? " M src/changed.ts\n" : "",
        stderr: "",
      }),
    );

    await expect(
      cleanupMergedLocalBranch({
        gitRoot: "/repo",
        branch: "task/T-7",
        expectedHeadSha: "head-1",
      }),
    ).rejects.toMatchObject({
      code: "E_GIT_RACE",
      context: {
        reason_code: "merged_worktree_changed_during_cleanup",
      },
    });

    expect(mocks.execFileAsync).not.toHaveBeenCalledWith(
      "git",
      expect.arrayContaining(["worktree", "remove"]),
      expect.anything(),
    );
    expect(mocks.execFileAsync).not.toHaveBeenCalledWith(
      "git",
      expect.arrayContaining(["update-ref"]),
      expect.anything(),
    );
  });
});
