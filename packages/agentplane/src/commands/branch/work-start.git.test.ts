import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  gitAheadBehind: vi.fn(),
  gitBranchUpstream: vi.fn(),
}));

vi.mock("@agentplaneorg/core/git", () => ({ gitAheadBehind: mocks.gitAheadBehind }));
vi.mock("../shared/git-ops.js", () => ({ gitBranchUpstream: mocks.gitBranchUpstream }));

import { ensureCurrentBaseBranch } from "./work-start.git.js";

describe("work start base/upstream isolation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.gitBranchUpstream.mockResolvedValue("origin/main");
  });

  it.each([
    { ahead: 1, behind: 0, summary: "ahead by 1 commit" },
    { ahead: 0, behind: 2, summary: "behind by 2 commit" },
    { ahead: 3, behind: 4, summary: "ahead by 3 commit(s) and behind by 4 commit" },
  ])("rejects a non-identical tracked base: $summary", async ({ ahead, behind }) => {
    mocks.gitAheadBehind.mockResolvedValue({ ahead, behind });

    await expect(ensureCurrentBaseBranch("/repo", "main")).rejects.toMatchObject({
      code: "E_GIT",
      context: {
        reason_code: "base_branch_upstream_mismatch",
        ahead,
        behind,
      },
    });
  });

  it("accepts an exact tracked base", async () => {
    mocks.gitAheadBehind.mockResolvedValue({ ahead: 0, behind: 0 });
    await expect(ensureCurrentBaseBranch("/repo", "main")).resolves.toBeUndefined();
  });
});
