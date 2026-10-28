import { describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  resolveIdentity: vi.fn(),
  observeByNumber: vi.fn(),
}));
vi.mock("./internal/change-request-provider.js", () => ({
  resolveChangeRequestIdentity: mocks.resolveIdentity,
  observeExistingChangeRequestByNumber: mocks.observeByNumber,
}));

import { observeExistingPrClaim } from "./adoption-observe.js";

const identity = {
  provider: "github" as const,
  hostname: "github.com",
  remote: "origin",
  sourceProject: "example/project",
  targetProject: "example/project",
  sourceUrl: "https://github.com/example/project.git",
  targetUrl: "https://github.com/example/project.git",
};
const claim = {
  taskId: "T-1",
  identity,
  prNumber: 42,
  headRef: "automation/update",
  baseRef: "main",
  headSha: "a".repeat(40),
  baseSha: "b".repeat(40),
};
const observed = {
  provider: identity.provider,
  identity,
  prNumber: claim.prNumber,
  prUrl: "https://github.com/example/project/pull/42",
  status: "OPEN" as const,
  mergedAt: null,
  mergeCommit: null,
  base: claim.baseRef,
  baseSha: claim.baseSha,
  headRef: claim.headRef,
  headSha: claim.headSha,
  mergeability: { state: "not_conflicting" as const, mergeable: true, providerState: "clean" },
};

describe("existing PR provider observation", () => {
  it("binds the numbered readback to the configured remote and exact claim", async () => {
    mocks.resolveIdentity.mockResolvedValue(identity);
    mocks.observeByNumber.mockResolvedValue({ state: "found", pr: observed });
    await expect(observeExistingPrClaim({ gitRoot: "/repo", claim })).resolves.toEqual(observed);
    expect(mocks.observeByNumber).toHaveBeenCalledWith({
      gitRoot: "/repo",
      branch: claim.headRef,
      baseBranch: claim.baseRef,
      prNumber: claim.prNumber,
      identity,
    });
  });

  it("fails closed for an unavailable PR or remote identity drift", async () => {
    mocks.resolveIdentity.mockResolvedValue(identity);
    mocks.observeByNumber.mockResolvedValue({ state: "unavailable", reason: "offline" });
    await expect(observeExistingPrClaim({ gitRoot: "/repo", claim })).rejects.toThrow(
      "unavailable",
    );
    mocks.observeByNumber.mockResolvedValue({ state: "found", pr: observed });
    mocks.resolveIdentity.mockResolvedValue({ ...identity, sourceProject: "another/project" });
    await expect(observeExistingPrClaim({ gitRoot: "/repo", claim })).rejects.toThrow(
      "same-repository",
    );
  });

  it("rejects a stale head even when the PR number is unchanged", async () => {
    mocks.resolveIdentity.mockResolvedValue(identity);
    mocks.observeByNumber.mockResolvedValue({
      state: "found",
      pr: { ...observed, headSha: "c".repeat(40) },
    });
    await expect(observeExistingPrClaim({ gitRoot: "/repo", claim })).rejects.toThrow("changed");
  });
});
