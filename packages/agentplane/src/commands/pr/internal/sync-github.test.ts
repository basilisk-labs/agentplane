import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  execFileAsync: vi.fn(),
  ghEnv: vi.fn((): NodeJS.ProcessEnv => ({ GH_CONFIG_DIR: "/gh-config" })),
  resolveGhCommand: vi.fn(() => ({
    command: "gh-wrapper",
    argsPrefix: ["--hostname", "github.example"],
  })),
  withGhTransportRetry: vi.fn(
    async (run: () => Promise<unknown>, _options: { label: string }): Promise<unknown> => run(),
  ),
}));

vi.mock("@agentplaneorg/core/process", async (importOriginal) => ({
  ...(await importOriginal<Record<string, unknown>>()),
  execFileAsync: mocks.execFileAsync,
}));

vi.mock("../../shared/gh-transport.js", async (importOriginal) => ({
  ...(await importOriginal<Record<string, unknown>>()),
  resolveGhCommand: mocks.resolveGhCommand,
  withGhTransportRetry: mocks.withGhTransportRetry,
}));

vi.mock("./gh-api.js", async (importOriginal) => ({
  ...(await importOriginal<Record<string, unknown>>()),
  ghEnv: mocks.ghEnv,
}));

import {
  observeExistingGithubPrByBranch,
  observeExistingGithubPrByNumber,
  shouldPersistObservedGithubPrIdentity,
  tryLookupExistingGithubPrByBranchPrefix,
} from "./sync-github.js";

function expectGithubApiTransport(endpoint: string): void {
  expect(mocks.resolveGhCommand).toHaveBeenCalledTimes(1);
  expect(mocks.ghEnv).toHaveBeenCalledTimes(1);
  expect(mocks.withGhTransportRetry).toHaveBeenCalledTimes(1);
  expect(mocks.withGhTransportRetry.mock.calls[0]?.[1]).toEqual({
    label: `running gh api ${endpoint}`,
  });
  expect(mocks.execFileAsync).toHaveBeenLastCalledWith(
    "gh-wrapper",
    ["--hostname", "github.example", "api", endpoint],
    {
      cwd: "/repo",
      env: { GH_CONFIG_DIR: "/gh-config" },
      maxBuffer: 10 * 1024 * 1024,
    },
  );
}

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
    expectGithubApiTransport("repos/example/repo/pulls/123");
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
    expectGithubApiTransport(
      "repos/example/repo/pulls?state=all&head=example%3Atask%2FT-1%2Fwork&base=main",
    );
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
    expectGithubApiTransport("repos/example/repo/pulls/123");
  });

  it("keeps branch-prefix lookup transport and filtering semantics", async () => {
    mocks.execFileAsync
      .mockResolvedValueOnce({ stdout: "https://github.com/example/repo.git\n" })
      .mockResolvedValueOnce({
        stdout: JSON.stringify([
          {
            number: 122,
            state: "open",
            head: { ref: "task/T-2/other", sha: "other-head" },
            base: { ref: "main" },
          },
          {
            number: 123,
            html_url: "https://github.com/example/repo/pull/123",
            state: "open",
            merged_at: null,
            head: { ref: "task/T-1/work", sha: "head" },
            base: { ref: "main" },
          },
        ]),
      });

    await expect(
      tryLookupExistingGithubPrByBranchPrefix({
        gitRoot: "/repo",
        branchPrefix: "task/T-1/",
        baseBranch: "main",
      }),
    ).resolves.toMatchObject({
      prNumber: 123,
      status: "OPEN",
      base: "main",
      headSha: "head",
    });
    expectGithubApiTransport("repos/example/repo/pulls?state=all&per_page=100&base=main");
  });

  it("keeps branch-prefix lookup unavailable as null", async () => {
    mocks.execFileAsync
      .mockResolvedValueOnce({ stdout: "https://github.com/example/repo.git\n" })
      .mockRejectedValueOnce(new Error("authentication required"));

    await expect(
      tryLookupExistingGithubPrByBranchPrefix({
        gitRoot: "/repo",
        branchPrefix: "task/T-1/",
      }),
    ).resolves.toBeNull();
  });
});
