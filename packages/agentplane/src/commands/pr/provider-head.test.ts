import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  observeByBranch: vi.fn(),
  observeByNumber: vi.fn(),
}));

vi.mock("./internal/sync-github.js", () => ({
  observeExistingGithubPrByBranch: mocks.observeByBranch,
  observeExistingGithubPrByNumber: mocks.observeByNumber,
}));

import { requireOpenGithubPrAtHead } from "./provider-head.js";

const observed = {
  prNumber: 101,
  prUrl: "https://github.com/example/repo/pull/101",
  status: "OPEN" as const,
  mergedAt: null,
  mergeCommit: null,
  base: "main",
  headSha: "head",
};

describe("GitHub provider head guard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.observeByNumber.mockResolvedValue({ state: "found", pr: observed });
    mocks.observeByBranch.mockResolvedValue({ state: "found", pr: observed });
  });

  it("validates a recorded PR number against branch, base, and exact head", async () => {
    await expect(
      requireOpenGithubPrAtHead({
        gitRoot: "/repo",
        branch: "task/T-1/work",
        base: "main",
        expectedHeadSha: "head",
        prNumber: 101,
      }),
    ).resolves.toEqual(observed);

    expect(mocks.observeByNumber).toHaveBeenCalledWith({
      gitRoot: "/repo",
      prNumber: 101,
      branch: "task/T-1/work",
      baseBranch: "main",
    });
    expect(mocks.observeByBranch).not.toHaveBeenCalled();
  });

  it("fails closed when provider lookup is unavailable", async () => {
    mocks.observeByNumber.mockResolvedValue({
      state: "unavailable",
      reason: "authentication required",
    });

    const caught = await requireOpenGithubPrAtHead({
      gitRoot: "/repo",
      branch: "task/T-1/work",
      base: "main",
      expectedHeadSha: "head",
      prNumber: 101,
    }).catch((err: unknown) => err);
    expect(caught).toMatchObject({
      code: "E_NETWORK",
      context: { reason_code: "github_pr_state_unavailable" },
    });
    expect(caught).toBeInstanceOf(Error);
    if (caught instanceof Error) {
      expect(caught.message).toContain("authentication required");
    }
  });

  it("rejects a hosted head that differs from the prepared branch", async () => {
    mocks.observeByNumber.mockResolvedValue({
      state: "found",
      pr: { ...observed, headSha: "older-head" },
    });

    const caught = await requireOpenGithubPrAtHead({
      gitRoot: "/repo",
      branch: "task/T-1/work",
      base: "main",
      expectedHeadSha: "head",
      prNumber: 101,
    }).catch((err: unknown) => err);
    expect(caught).toMatchObject({ code: "E_VALIDATION" });
    expect(caught).toBeInstanceOf(Error);
    if (caught instanceof Error) {
      expect(caught.message).toContain("hosted=older-head local=head");
    }
  });
});
