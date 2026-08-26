import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  observeExistingChangeRequestByNumber: vi.fn(),
  runGhApiJson: vi.fn(),
}));

vi.mock("./internal/change-request-provider.js", () => ({
  observeExistingChangeRequestByNumber: mocks.observeExistingChangeRequestByNumber,
}));
vi.mock("./internal/gh-api.js", () => ({ runGhApiJson: mocks.runGhApiJson }));

import type { ObservedChangeRequest } from "./internal/change-request-model.js";
import type { GitHostIdentity } from "./internal/git-host-identity.js";
import { updateProviderBranch } from "./provider-update-branch.js";

const oldHead = "1".repeat(40);
const baseHead = "2".repeat(40);
const newHead = "3".repeat(40);
const identity: GitHostIdentity = {
  provider: "github",
  hostname: "github.com",
  remote: "origin",
  sourceProject: "owner/repo",
  targetProject: "owner/repo",
  sourceUrl: "git@github.com:owner/repo.git",
  targetUrl: "https://github.com/owner/repo.git",
};

function observed(overrides: Partial<ObservedChangeRequest> = {}): ObservedChangeRequest {
  return {
    provider: "github",
    identity,
    prNumber: 42,
    prUrl: "https://github.com/owner/repo/pull/42",
    status: "OPEN",
    mergedAt: null,
    mergeCommit: null,
    base: "main",
    baseSha: baseHead,
    headSha: oldHead,
    headRef: "task/T-1/work",
    mergeability: { state: "not_conflicting", mergeable: true, providerState: "behind" },
    ...overrides,
  };
}

function request(overrides: Record<string, unknown> = {}) {
  return {
    gitRoot: "/repo",
    identity,
    prNumber: 42,
    branch: "task/T-1/work",
    baseBranch: "main",
    expectedHeadSha: oldHead,
    expectedBaseSha: baseHead,
    ...overrides,
  };
}

function comparison(ancestor: string) {
  return {
    status: "ahead",
    base_commit: { sha: ancestor },
    merge_base_commit: { sha: ancestor },
  };
}

describe("provider update-branch effect", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("binds the GitHub mutation to the expected head and proves both ancestors", async () => {
    mocks.observeExistingChangeRequestByNumber
      .mockResolvedValueOnce({ state: "found", pr: observed() })
      .mockResolvedValueOnce({ state: "found", pr: observed({ headSha: newHead }) });
    mocks.runGhApiJson
      .mockResolvedValueOnce({ message: "Updating pull request branch." })
      .mockResolvedValueOnce(comparison(oldHead))
      .mockResolvedValueOnce(comparison(baseHead));

    await expect(updateProviderBranch(request())).resolves.toMatchObject({
      state: "updated",
      effect: "applied",
      evidence: {
        expectedHeadSha: oldHead,
        expectedBaseSha: baseHead,
        observedHeadSha: newHead,
        containsExpectedHead: true,
        containsExpectedBase: true,
      },
    });
    expect(mocks.runGhApiJson).toHaveBeenNthCalledWith(1, "/repo", [
      "repos/owner/repo/pulls/42/update-branch",
      "-X",
      "PUT",
      "-f",
      `expected_head_sha=${oldHead}`,
    ]);
  });

  it("reconciles an already-updated head without repeating the mutation", async () => {
    mocks.observeExistingChangeRequestByNumber.mockResolvedValueOnce({
      state: "found",
      pr: observed({ headSha: newHead }),
    });
    mocks.runGhApiJson
      .mockResolvedValueOnce(comparison(oldHead))
      .mockResolvedValueOnce(comparison(baseHead));

    await expect(updateProviderBranch(request())).resolves.toMatchObject({
      state: "updated",
      effect: "reconciled",
    });
    expect(mocks.runGhApiJson).toHaveBeenCalledTimes(2);
    expect(mocks.runGhApiJson.mock.calls.flat()).not.toContain(
      "repos/owner/repo/pulls/42/update-branch",
    );
  });

  it.each([
    ["head drift", { headSha: "4".repeat(40) }, "head_drift"],
    ["base drift", { baseSha: "5".repeat(40) }, "base_drift"],
    ["branch drift", { headRef: "task/T-2/other" }, "branch_drift"],
    ["closed PR", { status: "CLOSED" as const }, "pr_not_open"],
  ])("fails closed before effect on %s", async (_label, override, reason) => {
    mocks.observeExistingChangeRequestByNumber.mockResolvedValueOnce({
      state: "found",
      pr: observed(override),
    });
    if (reason === "head_drift") {
      mocks.runGhApiJson.mockResolvedValueOnce({ status: "diverged" });
    }

    await expect(updateProviderBranch(request())).resolves.toMatchObject({
      state: "not_applied",
      reason,
    });
    expect(mocks.runGhApiJson.mock.calls.flat()).not.toContain(
      "repos/owner/repo/pulls/42/update-branch",
    );
  });

  it("fails closed for conflicts and unsupported providers", async () => {
    mocks.observeExistingChangeRequestByNumber.mockResolvedValueOnce({
      state: "found",
      pr: observed({
        mergeability: { state: "conflicting", mergeable: false, providerState: "dirty" },
      }),
    });
    await expect(updateProviderBranch(request())).resolves.toMatchObject({
      state: "not_applied",
      reason: "conflict",
    });

    await expect(
      updateProviderBranch(
        request({ identity: { ...identity, provider: "gitlab", hostname: "gitlab.com" } }),
      ),
    ).resolves.toMatchObject({ state: "not_applied", reason: "unsupported_provider" });
  });

  it("returns effect-in-doubt after a transport error until exact readback proves success", async () => {
    mocks.observeExistingChangeRequestByNumber
      .mockResolvedValueOnce({ state: "found", pr: observed() })
      .mockResolvedValueOnce({ state: "found", pr: observed() });
    mocks.runGhApiJson.mockRejectedValueOnce(new Error("network timeout"));

    await expect(updateProviderBranch(request())).resolves.toMatchObject({
      state: "effect_in_doubt",
      reason: "readback_unproven",
      observed: { headSha: oldHead },
    });
    expect(mocks.runGhApiJson).toHaveBeenCalledTimes(1);
  });

  it("accepts uncertain transport only after exact provider ancestry readback", async () => {
    mocks.observeExistingChangeRequestByNumber
      .mockResolvedValueOnce({ state: "found", pr: observed() })
      .mockResolvedValueOnce({ state: "found", pr: observed({ headSha: newHead }) });
    mocks.runGhApiJson
      .mockRejectedValueOnce(new Error("connection reset after send"))
      .mockResolvedValueOnce(comparison(oldHead))
      .mockResolvedValueOnce(comparison(baseHead));

    await expect(updateProviderBranch(request())).resolves.toMatchObject({
      state: "updated",
      effect: "applied",
      evidence: { observedHeadSha: newHead },
    });
  });

  it("keeps a changed head in doubt when exact base ancestry is missing", async () => {
    mocks.observeExistingChangeRequestByNumber
      .mockResolvedValueOnce({ state: "found", pr: observed() })
      .mockResolvedValueOnce({ state: "found", pr: observed({ headSha: newHead }) });
    mocks.runGhApiJson
      .mockResolvedValueOnce({ message: "Updating pull request branch." })
      .mockResolvedValueOnce(comparison(oldHead))
      .mockResolvedValueOnce({
        status: "diverged",
        base_commit: { sha: baseHead },
        merge_base_commit: { sha: "6".repeat(40) },
      });

    await expect(updateProviderBranch(request())).resolves.toMatchObject({
      state: "effect_in_doubt",
      reason: "readback_unproven",
    });
  });
});
