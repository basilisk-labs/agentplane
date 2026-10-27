import { beforeEach, describe, expect, it, vi } from "vitest";
import { freshHostedPrReadback } from "./kernel-hosted-readback.js";

const mocks = vi.hoisted(() => ({ identity: vi.fn(), observe: vi.fn() }));
vi.mock("../pr/internal/change-request-provider.js", () => ({
  resolveChangeRequestIdentity: mocks.identity,
  observeExistingChangeRequestByNumber: mocks.observe,
}));

const identity = {
  provider: "github" as const,
  hostname: "github.com",
  remote: "origin",
  source_project: "org/repo",
  target_project: "org/repo",
  pr_number: 42,
  head_ref: "change",
  base_ref: "main",
};
const resolved = {
  provider: "github" as const,
  hostname: "github.com",
  remote: "origin",
  sourceProject: "org/repo",
  targetProject: "org/repo",
  sourceUrl: "https://github.com/org/repo.git",
  targetUrl: "https://github.com/org/repo.git",
};
const observed = {
  provider: "github" as const,
  identity: resolved,
  prNumber: 42,
  prUrl: "https://github.com/org/repo/pull/42",
  status: "OPEN" as const,
  mergedAt: null,
  mergeCommit: null,
  base: "main",
  headSha: "a".repeat(40),
  baseSha: "b".repeat(40),
  headRef: "change",
  mergeability: { state: "not_conflicting" as const, mergeable: true, providerState: "clean" },
};

beforeEach(() => {
  vi.clearAllMocks();
  mocks.identity.mockResolvedValue(resolved);
  mocks.observe.mockResolvedValue({ state: "found", pr: observed });
});

describe("fresh provider-neutral hosted PR readback", () => {
  it("returns exact current head and base with provider observation digest", async () => {
    const readback = await freshHostedPrReadback({ gitRoot: "/repo", identity })();
    expect(readback.current_readback_digest).toMatch(/^sha256:[0-9a-f]{64}$/u);
    expect(readback).toMatchObject({
      identity,
      current_head: observed.headSha,
      current_base: observed.baseSha,
    });
    expect(mocks.observe).toHaveBeenCalledWith(
      expect.objectContaining({
        prNumber: 42,
        branch: "change",
        baseBranch: "main",
        identity: resolved,
      }),
    );
  });

  it.each([
    ["provider", { provider: "gitlab" }],
    ["PR number", { prNumber: 43 }],
    ["source ref", { headRef: "other" }],
    ["base ref", { base: "other" }],
    ["closed state", { status: "CLOSED" }],
    ["conflict", { mergeability: { state: "conflicting" } }],
    ["missing head", { headSha: null }],
  ])("rejects changed %s", async (_label, change) => {
    mocks.observe.mockResolvedValue({ state: "found", pr: { ...observed, ...change } });
    await expect(freshHostedPrReadback({ gitRoot: "/repo", identity })()).rejects.toThrow();
  });

  it("rejects a changed configured remote before reading a PR", async () => {
    mocks.identity.mockResolvedValue({ ...resolved, sourceProject: "other/repo" });
    await expect(freshHostedPrReadback({ gitRoot: "/repo", identity })()).rejects.toThrow();
    expect(mocks.observe).not.toHaveBeenCalled();
  });
});
