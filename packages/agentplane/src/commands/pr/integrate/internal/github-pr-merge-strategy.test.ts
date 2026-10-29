import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  execFileAsync: vi.fn(),
  runGhApiJson: vi.fn(),
  resolveDefaultGithubRepo: vi.fn(),
  checkThreads: vi.fn(),
}));
vi.mock("@agentplaneorg/core/process", async (original) => ({
  ...(await original<Record<string, unknown>>()),
  execFileAsync: mocks.execFileAsync,
}));
vi.mock("../../internal/gh-api.js", async (original) => ({
  ...(await original<Record<string, unknown>>()),
  runGhApiJson: mocks.runGhApiJson,
  resolveDefaultGithubRepo: mocks.resolveDefaultGithubRepo,
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

describe("ordinary GitHub current-base mutation boundary", () => {
  const options = {
    gitRoot: "/repo",
    prTarget: "https://github.com/canonical/target/pull/42",
    expectedHeadSha: "a".repeat(40),
    baseBranch: "main",
    expectedBaseSha: "b".repeat(40),
  };
  beforeEach(() => {
    vi.resetAllMocks();
    mocks.resolveDefaultGithubRepo.mockResolvedValue("canonical/target");
    vi.stubEnv("GH_TOKEN", "");
    vi.stubEnv("GITHUB_TOKEN", "");
    mocks.checkThreads.mockResolvedValue({ checked: true, unresolved: [] });
    mocks.runGhApiJson.mockResolvedValue({
      required_status_checks: { strict: true, contexts: ["ci"] },
      enforce_admins: { enabled: true },
    });
    mocks.execFileAsync.mockResolvedValue({ stdout: JSON.stringify({ merged: true }) });
  });
  afterEach(() => vi.unstubAllEnvs());
  it("rechecks qualified H/R after reviews and before the first PUT", async () => {
    const race = new Error("R advanced during review");
    await expect(
      runProtectedBaseGithubMerge({ ...options, preMutationGuard: () => Promise.reject(race) }),
    ).rejects.toBe(race);
    expect(
      mocks.execFileAsync.mock.calls.filter((c) => (c[1] as string[]).includes("PUT")),
    ).toHaveLength(0);
  });
  it("does not reuse qualification after a failed method", async () => {
    const guard = vi
      .fn()
      .mockResolvedValueOnce(undefined)
      .mockRejectedValueOnce(new Error("R advanced before fallback"));
    mocks.execFileAsync.mockImplementation((_cmd: string, args: string[]) =>
      args.includes("PUT") ? Promise.reject(new Error("405")) : Promise.resolve({ stdout: "" }),
    );
    await expect(
      runProtectedBaseGithubMerge({ ...options, preMutationGuard: guard }),
    ).rejects.toThrow("R advanced before fallback");
    expect(
      mocks.execFileAsync.mock.calls.filter((c) => (c[1] as string[]).includes("PUT")),
    ).toHaveLength(1);
    expect(mocks.runGhApiJson).toHaveBeenCalledTimes(2);
  });
  it("refuses a server policy that no longer enforces strict checks", async () => {
    mocks.runGhApiJson.mockResolvedValue({
      required_status_checks: { strict: false, contexts: ["ci"] },
      enforce_admins: { enabled: true },
    });
    await expect(
      runProtectedBaseGithubMerge({ ...options, preMutationGuard: vi.fn() }),
    ).rejects.toMatchObject({ code: "E_HANDOFF" });
    expect(
      mocks.execFileAsync.mock.calls.filter((c) => (c[1] as string[]).includes("PUT")),
    ).toHaveLength(0);
  });
  it("does not use source-fork review authority for a different target", async () => {
    mocks.resolveDefaultGithubRepo.mockResolvedValue("fork/source");
    await expect(
      runProtectedBaseGithubMerge({ ...options, preMutationGuard: vi.fn() }),
    ).rejects.toMatchObject({
      code: "E_HANDOFF",
      context: { reason_code: "github_target_review_authority_unavailable" },
    });
    expect(
      mocks.execFileAsync.mock.calls.filter((c) => (c[1] as string[]).includes("PUT")),
    ).toHaveLength(0);
  });
});
