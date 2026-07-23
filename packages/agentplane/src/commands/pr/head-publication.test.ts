import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  gitBranchUpstream: vi.fn(),
  gitRevParse: vi.fn(),
}));

vi.mock("../shared/git-ops.js", () => ({
  gitBranchUpstream: mocks.gitBranchUpstream,
  gitRevParse: mocks.gitRevParse,
}));

import { resolvePrHeadPublicationStatus } from "./head-publication.js";

describe("PR head publication status", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.gitBranchUpstream.mockResolvedValue("origin/task/T-1/work");
    mocks.gitRevParse.mockResolvedValue("head");
  });

  it("reports a local branch without upstream as unpublished", async () => {
    mocks.gitBranchUpstream.mockResolvedValue(null);

    await expect(
      resolvePrHeadPublicationStatus({
        gitRoot: "/repo",
        branch: "task/T-1/work",
        localHeadSha: "head",
        providerObservation: null,
      }),
    ).resolves.toMatchObject({
      state: "unpublished",
      reason: "missing_upstream",
      localHeadSha: "head",
      upstreamHeadSha: null,
    });
  });

  it("requires local, upstream, and hosted heads to match", async () => {
    await expect(
      resolvePrHeadPublicationStatus({
        gitRoot: "/repo",
        branch: "task/T-1/work",
        localHeadSha: "head",
        providerObservation: { state: "found", headSha: "head" },
      }),
    ).resolves.toMatchObject({
      state: "aligned",
      upstreamRef: "origin/task/T-1/work",
      upstreamHeadSha: "head",
      hostedHeadSha: "head",
    });

    await expect(
      resolvePrHeadPublicationStatus({
        gitRoot: "/repo",
        branch: "task/T-1/work",
        localHeadSha: "head",
        providerObservation: { state: "found", headSha: "older-head" },
      }),
    ).resolves.toMatchObject({
      state: "hosted_mismatch",
      hostedHeadSha: "older-head",
    });
  });

  it("keeps provider lookup failure distinct from a confirmed missing PR", async () => {
    await expect(
      resolvePrHeadPublicationStatus({
        gitRoot: "/repo",
        branch: "task/T-1/work",
        localHeadSha: "head",
        providerObservation: { state: "unavailable", reason: "authentication required" },
      }),
    ).resolves.toMatchObject({
      state: "unavailable",
      reason: "authentication required",
    });

    await expect(
      resolvePrHeadPublicationStatus({
        gitRoot: "/repo",
        branch: "task/T-1/work",
        localHeadSha: "head",
        providerObservation: { state: "not_found" },
      }),
    ).resolves.toMatchObject({
      state: "not_applicable",
      reason: "remote_pr_not_found",
    });
  });
});
