import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  execFileAsync: vi.fn(),
  gitBranchUpstream: vi.fn(),
  gitCurrentBranch: vi.fn(),
  gitDiffStat: vi.fn(),
}));

vi.mock("@agentplaneorg/core/process", () => ({
  execFileAsync: mocks.execFileAsync,
}));

vi.mock("../../shared/git-ops.js", () => ({
  gitBranchUpstream: mocks.gitBranchUpstream,
  gitCurrentBranch: mocks.gitCurrentBranch,
}));

vi.mock("@agentplaneorg/core/git", () => ({
  gitDiffStat: mocks.gitDiffStat,
  gitEnv: () => ({ GIT_TERMINAL_PROMPT: "0" }),
  parseTaskIdFromBranch: (taskPrefix: string, branch: string) =>
    branch.startsWith(taskPrefix) ? branch.split("/")[1] : null,
}));

describe("pr/internal/sync-branch", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    mocks.gitBranchUpstream.mockResolvedValue(null);
    mocks.gitCurrentBranch.mockResolvedValue("task/T-1/example");
    mocks.gitDiffStat.mockResolvedValue("diffstat");
    mocks.execFileAsync.mockResolvedValue({ stdout: "abc123\n", stderr: "" });
  });

  it("applies a bounded timeout to PR sync git lookups", async () => {
    const { resolveRenderableBranchHead } = await import("./sync-branch.js");

    await expect(
      resolveRenderableBranchHead({
        gitRoot: "/repo",
        taskId: "T-1",
        branch: "task/T-1/example",
      }),
    ).resolves.toEqual({ headSha: "abc123", artifactRefresh: false });

    expect(mocks.execFileAsync).toHaveBeenCalledWith(
      "git",
      ["rev-parse", "task/T-1/example"],
      expect.objectContaining({ cwd: "/repo", timeout: 10_000 }),
    );
  });

  it("surfaces upstream ancestry timeouts instead of rendering stale diffstat", async () => {
    const { computePrDiffstat } = await import("./sync-branch.js");
    mocks.gitBranchUpstream.mockResolvedValue("origin/main");
    mocks.execFileAsync
      .mockResolvedValueOnce({ stdout: "origin-main-sha\n", stderr: "" })
      .mockRejectedValueOnce(Object.assign(new Error("Command timed out"), { timedOut: true }));

    await expect(
      computePrDiffstat({
        gitRoot: "/repo",
        baseBranch: "main",
        branch: "task/T-1/example",
        prDir: "/repo/.agentplane/tasks/T-1/pr",
      }),
    ).rejects.toMatchObject({ timedOut: true });

    expect(mocks.gitDiffStat).not.toHaveBeenCalled();
  });

  it("surfaces git diff lookup timeouts instead of reporting an empty diffstat", async () => {
    const { computePrDiffstat } = await import("./sync-branch.js");
    mocks.gitDiffStat.mockRejectedValue(
      Object.assign(new Error("Command timed out"), {
        timedOut: true,
      }),
    );

    await expect(
      computePrDiffstat({
        gitRoot: "/repo",
        baseBranch: "main",
        branch: "task/T-1/example",
        prDir: "/repo/.agentplane/tasks/T-1/pr",
      }),
    ).rejects.toMatchObject({ timedOut: true });

    expect(mocks.gitDiffStat).toHaveBeenCalledWith(
      "/repo",
      "main",
      "task/T-1/example",
      expect.objectContaining({ timeoutMs: 10_000 }),
    );
  });
});
