import { describe, expect, it } from "vitest";

import { matchesMergedPreMergeClosure, type RemotePrStatus } from "./flow-status.js";

const mergedPr: RemotePrStatus = {
  provider: "github",
  state: "MERGED",
  source: "lookup",
  prNumber: 4567,
  prUrl: "https://example.invalid/pull/4567",
  base: "main",
  headSha: "head",
  mergeCommit: "landed",
};

describe("pre-merge closure flow status", () => {
  it("accepts a merged PR whose closure marker matches its branch and PR", () => {
    expect(
      matchesMergedPreMergeClosure({
        pr: mergedPr,
        branch: "task/T-1/work",
        marker: {
          state: "closed_before_merge",
          branch: "task/T-1/work",
          basisCommit: "implementation",
          prNumber: 4567,
        },
      }),
    ).toBe(true);
  });

  it("rejects open PRs and markers owned by another branch or PR", () => {
    const marker = {
      state: "closed_before_merge" as const,
      branch: "task/T-1/work",
      basisCommit: "implementation",
      prNumber: 4567,
    };
    expect(
      matchesMergedPreMergeClosure({
        pr: { ...mergedPr, state: "OPEN" },
        branch: marker.branch,
        marker,
      }),
    ).toBe(false);
    expect(matchesMergedPreMergeClosure({ pr: mergedPr, branch: "task/T-1/other", marker })).toBe(
      false,
    );
    expect(
      matchesMergedPreMergeClosure({
        pr: mergedPr,
        branch: marker.branch,
        marker: { ...marker, prNumber: 999 },
      }),
    ).toBe(false);
  });
});
