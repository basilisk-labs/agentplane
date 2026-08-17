import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  resolveDefaultGithubRepo: vi.fn(),
  runGhApiJson: vi.fn(),
}));

vi.mock("../../internal/gh-api.js", () => mocks);

import {
  requiresPullRequestMergePath,
  resolveGithubBasePullRequestProtection,
} from "./github-protection.js";

describe("GitHub base protection", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.resolveDefaultGithubRepo.mockResolvedValue("owner/repo");
  });

  it("requires the provider PR merge path when reviews are protected", async () => {
    mocks.runGhApiJson.mockResolvedValue({ required_pull_request_reviews: {} });

    await expect(
      requiresPullRequestMergePath({ gitRoot: "/repo", baseBranch: "main" }),
    ).resolves.toBe(true);
    expect(mocks.runGhApiJson).toHaveBeenCalledWith("/repo", [
      "repos/owner/repo/branches/main/protection",
    ]);
  });

  it("distinguishes a confirmed unprotected base from an unavailable lookup", async () => {
    mocks.runGhApiJson.mockResolvedValue({});
    await expect(
      resolveGithubBasePullRequestProtection({ gitRoot: "/repo", baseBranch: "main" }),
    ).resolves.toEqual({ state: "unprotected", baseBranch: "main" });

    mocks.runGhApiJson.mockRejectedValue(new Error("GitHub 503"));
    await expect(
      resolveGithubBasePullRequestProtection({ gitRoot: "/repo", baseBranch: "main" }),
    ).resolves.toEqual({ state: "unavailable", baseBranch: "main", reason: "GitHub 503" });
  });

  it("fails closed instead of selecting a local merge path on provider failure", async () => {
    mocks.runGhApiJson.mockRejectedValue(new Error("GitHub 503"));

    await expect(
      requiresPullRequestMergePath({ gitRoot: "/repo", baseBranch: "main" }),
    ).rejects.toMatchObject({
      code: "E_HANDOFF",
      context: {
        reason_code: "provider_base_protection_unavailable",
        base_branch: "main",
        provider_reason: "GitHub 503",
      },
    });
  });
});
