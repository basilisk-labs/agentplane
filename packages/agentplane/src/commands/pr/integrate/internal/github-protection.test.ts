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
    vi.resetAllMocks();
    mocks.resolveDefaultGithubRepo.mockResolvedValue("owner/repo");
  });

  it("requires the provider PR merge path when reviews are protected", async () => {
    mocks.runGhApiJson
      .mockResolvedValueOnce({ name: "main", protected: true })
      .mockResolvedValueOnce({ required_pull_request_reviews: {} });

    await expect(
      requiresPullRequestMergePath({ gitRoot: "/repo", baseBranch: "main" }),
    ).resolves.toBe(true);
    expect(mocks.runGhApiJson).toHaveBeenCalledWith("/repo", [
      "repos/owner/repo/branches/main/protection",
    ]);
  });

  it("distinguishes a confirmed unprotected base from an unavailable lookup", async () => {
    mocks.runGhApiJson.mockResolvedValue({ name: "main", protected: false });
    await expect(
      resolveGithubBasePullRequestProtection({ gitRoot: "/repo", baseBranch: "main" }),
    ).resolves.toEqual({ state: "unprotected", baseBranch: "main" });
    await expect(
      requiresPullRequestMergePath({ gitRoot: "/repo", baseBranch: "main" }),
    ).resolves.toBe(true);

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

describe("GitHub branch observation validation", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mocks.resolveDefaultGithubRepo.mockResolvedValue("owner/repo");
  });

  it("encodes the exact branch and does not query protection for explicit false", async () => {
    const baseBranch = "release/topic#1%";
    mocks.runGhApiJson.mockResolvedValue({ name: baseBranch, protected: false });
    await expect(requiresPullRequestMergePath({ gitRoot: "/repo", baseBranch })).resolves.toBe(
      true,
    );
    expect(mocks.runGhApiJson.mock.calls).toEqual([
      ["/repo", ["repos/owner/repo/branches/release%2Ftopic%231%25"]],
    ]);
  });

  it("preserves protection detail semantics and encoding for protected branches", async () => {
    mocks.runGhApiJson
      .mockResolvedValueOnce({ name: "release/topic", protected: true })
      .mockResolvedValueOnce({});
    await expect(
      resolveGithubBasePullRequestProtection({ gitRoot: "/repo", baseBranch: "release/topic" }),
    ).resolves.toEqual({ state: "unprotected", baseBranch: "release/topic" });
    expect(mocks.runGhApiJson).toHaveBeenLastCalledWith("/repo", [
      "repos/owner/repo/branches/release%2Ftopic/protection",
    ]);
  });

  it.each([
    null,
    {},
    { name: "other", protected: false },
    { name: "main" },
    { name: "main", protected: "false" },
  ])("rejects invalid branch observation %j", async (value) => {
    mocks.runGhApiJson.mockResolvedValue(value);
    await expect(
      requiresPullRequestMergePath({ gitRoot: "/repo", baseBranch: "main" }),
    ).rejects.toMatchObject({
      code: "E_HANDOFF",
      context: { reason_code: "provider_base_protection_unavailable" },
    });
    expect(mocks.runGhApiJson).toHaveBeenCalledTimes(1);
  });

  it.each(["GitHub 404 Not Found", "GitHub 403 Forbidden", "GitHub 503", "transport timeout"])(
    "does not reinterpret provider failure %s as unprotected",
    async (reason) => {
      mocks.runGhApiJson.mockRejectedValue(new Error(reason));
      await expect(
        resolveGithubBasePullRequestProtection({ gitRoot: "/repo", baseBranch: "main" }),
      ).resolves.toEqual({ state: "unavailable", baseBranch: "main", reason });
    },
  );

  it("retains unavailable on protected detail failure", async () => {
    mocks.runGhApiJson
      .mockResolvedValueOnce({ name: "main", protected: true })
      .mockRejectedValueOnce(new Error("GitHub 404 Branch not protected"));
    await expect(
      requiresPullRequestMergePath({ gitRoot: "/repo", baseBranch: "main" }),
    ).rejects.toMatchObject({ code: "E_HANDOFF" });
  });

  it("retains repository resolution failures without provider requests", async () => {
    mocks.resolveDefaultGithubRepo.mockRejectedValue(new Error("Unknown repository"));
    await expect(
      resolveGithubBasePullRequestProtection({ gitRoot: "/repo", baseBranch: "main" }),
    ).resolves.toEqual({ state: "unavailable", baseBranch: "main", reason: "Unknown repository" });
    expect(mocks.runGhApiJson).not.toHaveBeenCalled();
  });
});
