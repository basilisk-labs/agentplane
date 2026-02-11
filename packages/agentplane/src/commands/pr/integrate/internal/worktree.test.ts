import path from "node:path";

import { beforeEach, describe, expect, it, vi } from "vitest";

import type { CliError } from "../../../../../shared/errors.js";

const mocks = vi.hoisted(() => ({
  fileExists: vi.fn(),
  findWorktreeForBranch: vi.fn(),
  execFileAsync: vi.fn(),
  mkdir: vi.fn(),
}));

vi.mock("../../../../cli/fs-utils.js", () => ({ fileExists: mocks.fileExists }));
vi.mock("../../../shared/git-worktree.js", () => ({
  findWorktreeForBranch: mocks.findWorktreeForBranch,
}));
vi.mock("../../../shared/git.js", () => ({
  execFileAsync: mocks.execFileAsync,
  gitEnv: () => ({}),
}));
vi.mock("node:fs/promises", () => ({ mkdir: mocks.mkdir }));

describe("pr/integrate/internal/worktree", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.fileExists.mockResolvedValue(false);
    mocks.findWorktreeForBranch.mockResolvedValue(null);
  });

  it("rebase strategy requires existing worktree", async () => {
    const { resolveWorktreeForIntegrate } = await import("./worktree.js");
    mocks.findWorktreeForBranch.mockResolvedValue(null);
    await expect(
      resolveWorktreeForIntegrate({
        gitRoot: "/repo",
        worktreesDirRel: ".agentplane/worktrees",
        branch: "task/T-1",
        taskId: "T-1",
        mergeStrategy: "rebase",
        shouldRunVerify: false,
      }),
    ).rejects.toMatchObject<CliError>({ code: "E_USAGE" });
  });

  it("rejects worktrees_dir outside repository", async () => {
    const { resolveWorktreeForIntegrate } = await import("./worktree.js");
    mocks.findWorktreeForBranch.mockResolvedValue(null);
    await expect(
      resolveWorktreeForIntegrate({
        gitRoot: "/repo",
        worktreesDirRel: "../outside",
        branch: "task/T-2",
        taskId: "T-2",
        mergeStrategy: "squash",
        shouldRunVerify: true,
      }),
    ).rejects.toMatchObject<CliError>({ code: "E_GIT" });
  });

  it("fails when temp worktree path exists but branch is not registered", async () => {
    const { resolveWorktreeForIntegrate } = await import("./worktree.js");
    mocks.findWorktreeForBranch.mockResolvedValueOnce(null).mockResolvedValueOnce(null);
    mocks.fileExists.mockResolvedValue(true);
    await expect(
      resolveWorktreeForIntegrate({
        gitRoot: "/repo",
        worktreesDirRel: ".agentplane/worktrees",
        branch: "task/T-3",
        taskId: "T-3",
        mergeStrategy: "squash",
        shouldRunVerify: true,
      }),
    ).rejects.toMatchObject<CliError>({ code: "E_GIT" });
  });

  it("creates temporary worktree when verify requires it", async () => {
    const { resolveWorktreeForIntegrate } = await import("./worktree.js");
    mocks.findWorktreeForBranch.mockResolvedValue(null);
    mocks.fileExists.mockResolvedValue(false);
    const out = await resolveWorktreeForIntegrate({
      gitRoot: "/repo",
      worktreesDirRel: ".agentplane/worktrees",
      branch: "task/T-4",
      taskId: "T-4",
      mergeStrategy: "squash",
      shouldRunVerify: true,
    });
    const expected = path.join("/repo", ".agentplane/worktrees", "_integrate_tmp_T-4");
    expect(mocks.mkdir).toHaveBeenCalledWith(path.join("/repo", ".agentplane/worktrees"), {
      recursive: true,
    });
    expect(mocks.execFileAsync).toHaveBeenCalledWith(
      "git",
      ["worktree", "add", expected, "task/T-4"],
      expect.objectContaining({ cwd: "/repo" }),
    );
    expect(out.worktreePath).toBe(expected);
    expect(out.createdTempWorktree).toBe(true);
  });

  it("uses existing worktree when already present", async () => {
    const { resolveWorktreeForIntegrate } = await import("./worktree.js");
    mocks.findWorktreeForBranch.mockResolvedValue("/repo/.agentplane/worktrees/task-T5");
    const out = await resolveWorktreeForIntegrate({
      gitRoot: "/repo",
      worktreesDirRel: ".agentplane/worktrees",
      branch: "task/T-5",
      taskId: "T-5",
      mergeStrategy: "squash",
      shouldRunVerify: true,
    });
    expect(out.worktreePath).toBe("/repo/.agentplane/worktrees/task-T5");
    expect(out.createdTempWorktree).toBe(false);
    expect(mocks.execFileAsync).not.toHaveBeenCalled();
  });
});
