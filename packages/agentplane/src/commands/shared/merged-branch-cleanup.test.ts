import { beforeEach, describe, expect, it, vi } from "vitest";
import { realpathSync } from "node:fs";

const mocks = {
  execFileAsync: vi.fn(),
  gitBranchExists: vi.fn(),
  gitRevParse: vi.fn(),
  findWorktreeForBranch: vi.fn(),
  listWorktrees: vi.fn(),
  rm: vi.fn(),
};

vi.mock("node:fs/promises", () => ({
  realpath: (filePath: string) => Promise.resolve(realpathSync(filePath)),
  rm: mocks.rm,
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
  listWorktrees: mocks.listWorktrees,
  gitEnv: () => ({}),
}));

describe("commands/shared/merged-branch-cleanup", () => {
  beforeEach(() => {
    mocks.execFileAsync.mockReset();
    mocks.gitBranchExists.mockReset();
    mocks.gitRevParse.mockReset();
    mocks.findWorktreeForBranch.mockReset();
    mocks.listWorktrees.mockReset();
    mocks.rm.mockReset();
    mocks.findWorktreeForBranch.mockResolvedValue(null);
    mocks.listWorktrees.mockResolvedValue([]);
    mocks.gitBranchExists.mockResolvedValue(true);
    mocks.execFileAsync.mockResolvedValue({ stdout: "", stderr: "" });
    mocks.rm.mockResolvedValue(undefined);
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

  it("fails closed when a caller supplies an unregistered worktree hint", async () => {
    const { cleanupMergedLocalBranch } = await import("./merged-branch-cleanup.js");
    const worktreePathHint = "/repo/.agentplane/worktrees/task-T2-hint";

    const result = await cleanupMergedLocalBranch({
      gitRoot: "/repo",
      branch: "task/T-2-hint",
      worktreePathHint,
    });

    expect(result).toEqual({
      removedBranch: false,
      removedWorktree: false,
      worktreePath: worktreePathHint,
      skippedReason: "unregistered_worktree",
      preservedDirtyState: false,
      stashMessage: null,
    });
    expect(mocks.execFileAsync).not.toHaveBeenCalled();
    expect(mocks.rm).not.toHaveBeenCalled();
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

  it("removes an orphaned directory when git unregisters a clean worktree before reporting failure", async () => {
    const { cleanupMergedLocalBranch } = await import("./merged-branch-cleanup.js");
    const worktreePath = "/repo/.agentplane/worktrees/task-T5-recovery";
    mocks.findWorktreeForBranch.mockResolvedValueOnce(worktreePath).mockResolvedValueOnce(null);
    mocks.execFileAsync.mockImplementation((_command: string, args: string[]) => {
      if (args[0] === "worktree" && args[1] === "remove") {
        return Promise.reject(new Error("failed to delete directory: Directory not empty"));
      }
      return Promise.resolve({ stdout: "", stderr: "" });
    });

    const result = await cleanupMergedLocalBranch({
      gitRoot: "/repo",
      branch: "task/T-5-recovery",
    });

    expect(result).toEqual({
      removedBranch: true,
      removedWorktree: true,
      worktreePath,
      skippedReason: null,
      preservedDirtyState: false,
      stashMessage: null,
    });
    expect(mocks.rm).toHaveBeenCalledWith(worktreePath, {
      recursive: true,
      maxRetries: 3,
      retryDelay: 100,
    });
    expect(mocks.execFileAsync).toHaveBeenCalledWith(
      "git",
      ["branch", "-D", "task/T-5-recovery"],
      expect.objectContaining({ cwd: "/repo" }),
    );
  });

  it("preserves the branch when orphan recovery cannot remove the unregistered directory", async () => {
    const { cleanupMergedLocalBranch } = await import("./merged-branch-cleanup.js");
    const worktreePath = "/repo/.agentplane/worktrees/task-T5-recovery-failed";
    mocks.findWorktreeForBranch.mockResolvedValueOnce(worktreePath).mockResolvedValueOnce(null);
    mocks.execFileAsync.mockImplementation((_command: string, args: string[]) => {
      if (args[0] === "worktree" && args[1] === "remove") {
        return Promise.reject(new Error("failed to delete directory: Directory not empty"));
      }
      return Promise.resolve({ stdout: "", stderr: "" });
    });
    mocks.rm.mockRejectedValue(new Error("permission denied"));

    await expect(
      cleanupMergedLocalBranch({
        gitRoot: "/repo",
        branch: "task/T-5-recovery-failed",
      }),
    ).rejects.toMatchObject({
      code: "E_GIT",
      context: {
        reason_code: "merged_worktree_orphan_recovery_failed",
        branch: "task/T-5-recovery-failed",
        worktree_path: worktreePath,
      },
    });
    expect(mocks.execFileAsync).not.toHaveBeenCalledWith(
      "git",
      ["branch", "-D", "task/T-5-recovery-failed"],
      expect.anything(),
    );
  });

  it("preserves the branch when the failed worktree removal remains registered", async () => {
    const { cleanupMergedLocalBranch } = await import("./merged-branch-cleanup.js");
    const worktreePath = "/repo/.agentplane/worktrees/task-T5-still-registered";
    mocks.findWorktreeForBranch.mockResolvedValue(worktreePath);
    mocks.execFileAsync.mockImplementation((_command: string, args: string[]) => {
      if (args[0] === "worktree" && args[1] === "remove") {
        return Promise.reject(new Error("failed to delete directory: Directory not empty"));
      }
      return Promise.resolve({ stdout: "", stderr: "" });
    });

    await expect(
      cleanupMergedLocalBranch({
        gitRoot: "/repo",
        branch: "task/T-5-still-registered",
      }),
    ).rejects.toThrow("failed to delete directory: Directory not empty");
    expect(mocks.rm).not.toHaveBeenCalled();
    expect(mocks.execFileAsync).not.toHaveBeenCalledWith(
      "git",
      ["branch", "-D", "task/T-5-still-registered"],
      expect.anything(),
    );
  });

  it("preserves the orphaned directory when the branch moves before recovery", async () => {
    const { cleanupMergedLocalBranch } = await import("./merged-branch-cleanup.js");
    const worktreePath = "/repo/.agentplane/worktrees/task-T5-head-race";
    mocks.findWorktreeForBranch.mockResolvedValueOnce(worktreePath).mockResolvedValueOnce(null);
    mocks.gitRevParse.mockResolvedValueOnce("head-1").mockResolvedValueOnce("head-2");
    mocks.execFileAsync.mockImplementation((_command: string, args: string[]) => {
      if (args[0] === "worktree" && args[1] === "remove") {
        return Promise.reject(new Error("failed to delete directory: Directory not empty"));
      }
      return Promise.resolve({ stdout: "", stderr: "" });
    });

    await expect(
      cleanupMergedLocalBranch({
        gitRoot: "/repo",
        branch: "task/T-5-head-race",
        expectedHeadSha: "head-1",
      }),
    ).rejects.toMatchObject({
      code: "E_GIT_RACE",
      context: {
        reason_code: "merged_branch_head_changed",
        expected_head_sha: "head-1",
        current_head_sha: "head-2",
      },
    });
    expect(mocks.rm).not.toHaveBeenCalled();
    expect(mocks.execFileAsync).not.toHaveBeenCalledWith(
      "git",
      ["branch", "-D", "task/T-5-head-race"],
      expect.anything(),
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

  it("removes an external target only when it is nested in a registered sibling base worktree", async () => {
    const { cleanupMergedLocalBranch } = await import("./merged-branch-cleanup.js");
    const siblingBasePath = "/tmp/agentplane-base-main";
    const worktreePath = `${siblingBasePath}/.agentplane/worktrees/task-T8`;
    mocks.findWorktreeForBranch.mockResolvedValue(worktreePath);
    mocks.listWorktrees.mockResolvedValue([
      { path: "/repo", branch: "refs/heads/main" },
      { path: siblingBasePath, branch: "refs/heads/main" },
      { path: worktreePath, branch: "refs/heads/task/T-8" },
    ]);
    mocks.gitRevParse.mockImplementation((_cwd: string, args: string[]) =>
      Promise.resolve(args.includes("--git-common-dir") ? "/repo/.git" : "head-1"),
    );

    const result = await cleanupMergedLocalBranch({
      gitRoot: "/repo",
      branch: "task/T-8",
      registeredSiblingWorktree: {
        baseBranch: "main",
        expectedWorktreePath: worktreePath,
        worktreesDir: ".agentplane/worktrees",
      },
    });

    expect(result).toMatchObject({
      removedBranch: true,
      removedWorktree: true,
      worktreePath,
      skippedReason: null,
    });
    expect(mocks.execFileAsync).toHaveBeenCalledWith(
      "git",
      ["worktree", "remove", worktreePath],
      expect.objectContaining({ cwd: "/repo" }),
    );
    expect(mocks.execFileAsync).toHaveBeenCalledWith(
      "git",
      ["branch", "-D", "task/T-8"],
      expect.objectContaining({ cwd: "/repo" }),
    );
  });

  it("keeps a directly registered /tmp worktree lexical-only even with sibling authorization", async () => {
    const { cleanupMergedLocalBranch } = await import("./merged-branch-cleanup.js");
    const worktreePath = "/tmp/agentplane-direct-registered-worktree";
    mocks.findWorktreeForBranch.mockResolvedValue(worktreePath);
    mocks.listWorktrees.mockResolvedValue([
      { path: "/repo", branch: "refs/heads/main" },
      { path: worktreePath, branch: "refs/heads/task/T-9" },
    ]);

    const result = await cleanupMergedLocalBranch({
      gitRoot: "/repo",
      branch: "task/T-9",
      preserveDirty: true,
      registeredSiblingWorktree: {
        baseBranch: "main",
        expectedWorktreePath: worktreePath,
        worktreesDir: ".agentplane/worktrees",
      },
    });

    expect(result).toMatchObject({
      removedBranch: false,
      removedWorktree: false,
      worktreePath,
      skippedReason: "outside_repo",
    });
    expect(mocks.execFileAsync).not.toHaveBeenCalled();
    expect(mocks.rm).not.toHaveBeenCalled();
  });

  it("rejects a registered arbitrary child of a sibling base worktree", async () => {
    const { cleanupMergedLocalBranch } = await import("./merged-branch-cleanup.js");
    const siblingBasePath = "/tmp/agentplane-base-main-arbitrary";
    const worktreePath = `${siblingBasePath}/arbitrary-child`;
    mocks.findWorktreeForBranch.mockResolvedValue(worktreePath);
    mocks.listWorktrees.mockResolvedValue([
      { path: "/repo", branch: "refs/heads/main" },
      { path: siblingBasePath, branch: "refs/heads/main" },
      { path: worktreePath, branch: "refs/heads/task/T-9-arbitrary" },
    ]);

    const result = await cleanupMergedLocalBranch({
      gitRoot: "/repo",
      branch: "task/T-9-arbitrary",
      registeredSiblingWorktree: {
        baseBranch: "main",
        expectedWorktreePath: worktreePath,
        worktreesDir: ".agentplane/worktrees",
      },
    });

    expect(result).toMatchObject({
      removedBranch: false,
      removedWorktree: false,
      worktreePath,
      skippedReason: "outside_repo",
    });
    expect(mocks.execFileAsync).not.toHaveBeenCalled();
    expect(mocks.rm).not.toHaveBeenCalled();
  });

  it("rejects an external target when fresh branch registration no longer matches the planned path", async () => {
    const { cleanupMergedLocalBranch } = await import("./merged-branch-cleanup.js");
    const worktreePath = "/tmp/agentplane-registered-actual";
    mocks.findWorktreeForBranch.mockResolvedValue(worktreePath);
    mocks.listWorktrees.mockResolvedValue([
      { path: "/repo", branch: "refs/heads/main" },
      { path: "/tmp/agentplane-base-main", branch: "refs/heads/main" },
      { path: worktreePath, branch: "refs/heads/task/T-10" },
    ]);

    const result = await cleanupMergedLocalBranch({
      gitRoot: "/repo",
      branch: "task/T-10",
      registeredSiblingWorktree: {
        baseBranch: "main",
        expectedWorktreePath: "/tmp/agentplane-planned-path",
        worktreesDir: ".agentplane/worktrees",
      },
    });

    expect(result).toMatchObject({
      removedBranch: false,
      removedWorktree: false,
      worktreePath,
      skippedReason: "outside_repo",
    });
    expect(mocks.execFileAsync).not.toHaveBeenCalled();
    expect(mocks.rm).not.toHaveBeenCalled();
  });

  it("rejects an external sibling candidate when its Git common directory differs", async () => {
    const { cleanupMergedLocalBranch } = await import("./merged-branch-cleanup.js");
    const siblingBasePath = "/tmp/agentplane-foreign-base-main";
    const worktreePath = `${siblingBasePath}/.agentplane/worktrees/task-T11`;
    mocks.findWorktreeForBranch.mockResolvedValue(worktreePath);
    mocks.listWorktrees.mockResolvedValue([
      { path: "/repo", branch: "refs/heads/main" },
      { path: siblingBasePath, branch: "refs/heads/main" },
      { path: worktreePath, branch: "refs/heads/task/T-11" },
    ]);
    mocks.gitRevParse.mockImplementation((cwd: string, args: string[]) =>
      Promise.resolve(
        args.includes("--git-common-dir")
          ? cwd === "/repo"
            ? "/repo/.git"
            : "/foreign/.git"
          : "head-1",
      ),
    );

    const result = await cleanupMergedLocalBranch({
      gitRoot: "/repo",
      branch: "task/T-11",
      registeredSiblingWorktree: {
        baseBranch: "main",
        expectedWorktreePath: worktreePath,
        worktreesDir: ".agentplane/worktrees",
      },
    });

    expect(result).toMatchObject({
      removedBranch: false,
      removedWorktree: false,
      worktreePath,
      skippedReason: "outside_repo",
    });
    expect(mocks.execFileAsync).not.toHaveBeenCalled();
    expect(mocks.rm).not.toHaveBeenCalled();
  });

  it("revalidates external sibling registration immediately before removal", async () => {
    const { cleanupMergedLocalBranch } = await import("./merged-branch-cleanup.js");
    const siblingBasePath = "/tmp/agentplane-race-base-main";
    const worktreePath = `${siblingBasePath}/.agentplane/worktrees/task-T12`;
    const registeredTopology = [
      { path: "/repo", branch: "refs/heads/main" },
      { path: siblingBasePath, branch: "refs/heads/main" },
      { path: worktreePath, branch: "refs/heads/task/T-12" },
    ];
    mocks.findWorktreeForBranch.mockResolvedValue(worktreePath);
    mocks.listWorktrees.mockResolvedValueOnce(registeredTopology).mockResolvedValueOnce([
      { path: "/repo", branch: "refs/heads/main" },
      { path: siblingBasePath, branch: "refs/heads/main" },
      { path: "/tmp/agentplane-moved", branch: "refs/heads/task/T-12" },
    ]);
    mocks.gitRevParse.mockImplementation((_cwd: string, args: string[]) =>
      Promise.resolve(args.includes("--git-common-dir") ? "/repo/.git" : "head-1"),
    );

    await expect(
      cleanupMergedLocalBranch({
        gitRoot: "/repo",
        branch: "task/T-12",
        registeredSiblingWorktree: {
          baseBranch: "main",
          expectedWorktreePath: worktreePath,
          worktreesDir: ".agentplane/worktrees",
        },
      }),
    ).rejects.toMatchObject({
      code: "E_GIT_RACE",
      context: {
        reason_code: "merged_worktree_registration_changed_during_cleanup",
        worktree_path: worktreePath,
      },
    });
    expect(mocks.execFileAsync).not.toHaveBeenCalledWith(
      "git",
      ["worktree", "remove", worktreePath],
      expect.anything(),
    );
    expect(mocks.execFileAsync).not.toHaveBeenCalledWith(
      "git",
      ["branch", "-D", "task/T-12"],
      expect.anything(),
    );
    expect(mocks.rm).not.toHaveBeenCalled();
  });

  it("never raw-removes an authorized external sibling after Git unregisters it on removal failure", async () => {
    const { cleanupMergedLocalBranch } = await import("./merged-branch-cleanup.js");
    const siblingBasePath = "/tmp/agentplane-orphan-base-main";
    const worktreePath = `${siblingBasePath}/.agentplane/worktrees/task-T13`;
    const registeredTopology = [
      { path: "/repo", branch: "refs/heads/main" },
      { path: siblingBasePath, branch: "refs/heads/main" },
      { path: worktreePath, branch: "refs/heads/task/T-13" },
    ];
    mocks.findWorktreeForBranch.mockResolvedValueOnce(worktreePath).mockResolvedValueOnce(null);
    mocks.listWorktrees
      .mockResolvedValueOnce(registeredTopology)
      .mockResolvedValueOnce(registeredTopology);
    mocks.gitRevParse.mockImplementation((_cwd: string, args: string[]) =>
      Promise.resolve(args.includes("--git-common-dir") ? "/repo/.git" : "head-1"),
    );
    mocks.execFileAsync.mockImplementation((_command: string, args: string[]) => {
      if (args[0] === "worktree" && args[1] === "remove") {
        return Promise.reject(new Error("failed to remove external worktree"));
      }
      return Promise.resolve({ stdout: "", stderr: "" });
    });

    await expect(
      cleanupMergedLocalBranch({
        gitRoot: "/repo",
        branch: "task/T-13",
        registeredSiblingWorktree: {
          baseBranch: "main",
          expectedWorktreePath: worktreePath,
          worktreesDir: ".agentplane/worktrees",
        },
      }),
    ).rejects.toMatchObject({
      code: "E_GIT",
      context: {
        reason_code: "merged_worktree_orphan_recovery_unsafe",
        worktree_path: worktreePath,
      },
    });
    expect(mocks.execFileAsync).toHaveBeenCalledWith(
      "git",
      ["worktree", "remove", worktreePath],
      expect.objectContaining({ cwd: "/repo" }),
    );
    expect(mocks.rm).not.toHaveBeenCalled();
    expect(mocks.execFileAsync).not.toHaveBeenCalledWith(
      "git",
      ["branch", "-D", "task/T-13"],
      expect.anything(),
    );
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
