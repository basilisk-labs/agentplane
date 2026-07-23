import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  execFileAsync: vi.fn(),
}));

vi.mock("@agentplaneorg/core/process", async (importOriginal) => ({
  ...(await importOriginal<Record<string, unknown>>()),
  execFileAsync: mocks.execFileAsync,
}));

vi.mock("../../shared/gh-transport.js", async (importOriginal) => ({
  ...(await importOriginal<Record<string, unknown>>()),
  resolveGhCommand: () => ({ command: "gh", argsPrefix: [] }),
  withGhTransportRetry: (run: () => Promise<unknown>) => run(),
}));

import {
  observeExistingGithubPrByBranch,
  observeExistingGithubPrByNumber,
  shouldPersistObservedGithubPrIdentity,
} from "./sync-github.js";

describe("sync-github", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

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

  it("treats transport or API 404 as unavailable rather than authoritative absence", async () => {
    mocks.execFileAsync
      .mockResolvedValueOnce({ stdout: "https://github.com/example/repo.git\n" })
      .mockRejectedValueOnce(new Error("HTTP 404 Not Found"));

    const observation = await observeExistingGithubPrByNumber({
      gitRoot: "/repo",
      prNumber: 123,
      branch: "task/T-1/work",
      baseBranch: "main",
    });
    expect(observation.state).toBe("unavailable");
    expect(observation.reason).toMatch(/404|not found/iu);
  });

  it("treats a successful nonempty malformed branch payload as unavailable", async () => {
    mocks.execFileAsync
      .mockResolvedValueOnce({ stdout: "https://github.com/example/repo.git\n" })
      .mockResolvedValueOnce({ stdout: JSON.stringify([{ state: "open" }]) });

    await expect(
      observeExistingGithubPrByBranch({
        gitRoot: "/repo",
        branch: "task/T-1/work",
        baseBranch: "main",
      }),
    ).resolves.toEqual({
      state: "unavailable",
      reason: "GitHub branch lookup returned no valid PR records",
    });
  });

  it("keeps a valid successful identity mismatch as authoritative absence", async () => {
    mocks.execFileAsync
      .mockResolvedValueOnce({ stdout: "https://github.com/example/repo.git\n" })
      .mockResolvedValueOnce({
        stdout: JSON.stringify({
          number: 123,
          html_url: "https://github.com/example/repo/pull/123",
          state: "open",
          merged_at: null,
          head: { ref: "task/T-2/other", sha: "head" },
          base: { ref: "main" },
        }),
      });

    await expect(
      observeExistingGithubPrByNumber({
        gitRoot: "/repo",
        prNumber: 123,
        branch: "task/T-1/work",
        baseBranch: "main",
      }),
    ).resolves.toEqual({ state: "not_found" });
  });
});
