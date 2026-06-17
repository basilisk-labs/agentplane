import { describe, expect, it } from "vitest";

import { shouldPersistObservedGithubPrIdentity } from "./sync-github.js";

describe("sync-github", () => {
  it("persists open and merged PR identity in local metadata", () => {
    const base = {
      prNumber: 123,
      prUrl: "https://github.com/example/repo/pull/123",
      mergedAt: null,
      mergeCommit: null,
      base: "main",
      headSha: "abc123",
    };

    expect(shouldPersistObservedGithubPrIdentity({ ...base, status: "OPEN" })).toBe(true);
    expect(shouldPersistObservedGithubPrIdentity({ ...base, status: "MERGED" })).toBe(true);
    expect(shouldPersistObservedGithubPrIdentity({ ...base, status: "CLOSED" })).toBe(false);
    expect(shouldPersistObservedGithubPrIdentity(null)).toBe(false);
  });
});
