import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  execFileAsync: vi.fn(),
  runGhApiJson: vi.fn(),
  checkThreads: vi.fn(),
}));
vi.mock("@agentplaneorg/core/process", async (original) => ({
  ...(await original<Record<string, unknown>>()),
  execFileAsync: mocks.execFileAsync,
}));
vi.mock("../../internal/gh-api.js", async (original) => ({
  ...(await original<Record<string, unknown>>()),
  runGhApiJson: mocks.runGhApiJson,
}));
vi.mock("../../internal/github-review-threads.js", async (original) => ({
  ...(await original<Record<string, unknown>>()),
  checkGithubUnresolvedReviewThreads: mocks.checkThreads,
}));

import {
  assertGithubExactBaseMergeCapability,
  runProtectedBaseGithubMerge,
} from "./github-pr-merge.js";

describe("GitHub exact-base merge strategy", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv("GH_TOKEN", "");
    vi.stubEnv("GITHUB_TOKEN", "");
    mocks.checkThreads.mockResolvedValue({ checked: true, unresolved: [] });
    mocks.runGhApiJson.mockResolvedValue({ allow_merge_commit: true });
    mocks.execFileAsync.mockResolvedValue({ stdout: JSON.stringify({ merged: true }) });
  });
  afterEach(() => vi.unstubAllEnvs());

  it("uses one merge-commit PUT for a multi-commit adopted PR", async () => {
    const guard = vi.fn().mockResolvedValue(undefined);
    await expect(
      runProtectedBaseGithubMerge({
        gitRoot: "/repo",
        prTarget: "https://github.com/acme/repo/pull/42",
        expectedHeadSha: "a".repeat(40),
        preMutationGuard: guard,
        exactBaseParentProof: true,
      }),
    ).resolves.toMatchObject({ status: "merged" });
    expect(guard).toHaveBeenCalledOnce();
    expect(mocks.execFileAsync).toHaveBeenCalledTimes(1);
    const args = mocks.execFileAsync.mock.calls[0]?.[1] as string[];
    expect(args).toContain("merge_method=merge");
    expect(args).not.toContain("merge_method=rebase");
  });

  it("rejects unavailable merge commits before any PUT", async () => {
    expect(() => assertGithubExactBaseMergeCapability({ allow_merge_commit: false })).toThrow();
    mocks.runGhApiJson.mockResolvedValue({ allow_merge_commit: false });
    const guard = vi.fn().mockResolvedValue(undefined);
    await expect(
      runProtectedBaseGithubMerge({
        gitRoot: "/repo",
        prTarget: "https://github.com/acme/repo/pull/42",
        expectedHeadSha: "a".repeat(40),
        preMutationGuard: guard,
        exactBaseParentProof: true,
      }),
    ).rejects.toThrow("merge-commit method");
    expect(guard).not.toHaveBeenCalled();
    expect(mocks.execFileAsync).not.toHaveBeenCalled();
  });

  it("does not attempt a second method after an uncertain merge response", async () => {
    mocks.execFileAsync.mockRejectedValue(new Error("transport dropped after PUT"));
    await expect(
      runProtectedBaseGithubMerge({
        gitRoot: "/repo",
        prTarget: "https://github.com/acme/repo/pull/42",
        expectedHeadSha: "a".repeat(40),
        preMutationGuard: vi.fn().mockResolvedValue(undefined),
        exactBaseParentProof: true,
      }),
    ).rejects.toThrow("transport dropped");
    expect(mocks.execFileAsync).toHaveBeenCalledTimes(1);
  });
});
