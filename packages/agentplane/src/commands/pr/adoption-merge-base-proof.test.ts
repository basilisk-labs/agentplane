import { beforeEach, describe, expect, it, vi } from "vitest";
import type { AdoptedPrIdentity } from "./adoption-identity.js";
import { proveAdoptedMergeExactBaseParent } from "./adoption-merge.js";

const mocks = vi.hoisted(() => ({ github: vi.fn(), gitlab: vi.fn() }));
vi.mock("./internal/gh-api.js", () => ({ runGhApiJson: mocks.github }));
vi.mock("./internal/glab-api.js", () => ({ runGlabApiJson: mocks.gitlab }));

const base = "a".repeat(40);
const advancedBase = "c".repeat(40);
const mergeCommit = "b".repeat(40);
const receipt = {
  provider: "github",
  hostname: "github.com",
  target_project: "org/repo",
} as AdoptedPrIdentity;
const input = { gitRoot: "/repo", receipt, expectedBaseSha: base, mergeCommit };

beforeEach(() => vi.clearAllMocks());

describe("adopted merge exact base proof", () => {
  it("binds the GitHub immutable merge commit first parent to the original target base", async () => {
    mocks.github.mockResolvedValue({
      sha: mergeCommit,
      parents: [{ sha: base }, { sha: "d".repeat(40) }],
    });
    await expect(proveAdoptedMergeExactBaseParent(input)).resolves.toBe(true);
    expect(mocks.github).toHaveBeenCalledWith("/repo", [`repos/org/repo/commits/${mergeCommit}`]);
    mocks.github.mockResolvedValue({ sha: mergeCommit, parents: [{ sha: base }] });
    await expect(proveAdoptedMergeExactBaseParent(input)).resolves.toBe(true);
    mocks.github.mockResolvedValue({
      sha: mergeCommit,
      parents: [{ sha: advancedBase }, { sha: base }],
    });
    await expect(proveAdoptedMergeExactBaseParent(input)).resolves.toBe(false);
    // A final rewritten commit from a multi-commit rebase has a rewritten
    // predecessor, not the original target base. Its ancestry is insufficient.
    mocks.github.mockResolvedValue({ sha: mergeCommit, parents: [{ sha: advancedBase }] });
    await expect(proveAdoptedMergeExactBaseParent(input)).resolves.toBe(false);
    mocks.github.mockResolvedValue({ sha: advancedBase, parents: [{ sha: base }] });
    await expect(proveAdoptedMergeExactBaseParent(input)).resolves.toBe(false);
  });

  it("requires the GitLab immutable merge commit first parent to equal the original base", async () => {
    const gitlab = {
      ...receipt,
      provider: "gitlab",
      hostname: "gitlab.example",
    } as AdoptedPrIdentity;
    mocks.gitlab.mockResolvedValue({ id: mergeCommit, parent_ids: [base, "d".repeat(40)] });
    await expect(proveAdoptedMergeExactBaseParent({ ...input, receipt: gitlab })).resolves.toBe(
      true,
    );
    expect(mocks.gitlab).toHaveBeenCalledWith({
      cwd: "/repo",
      hostname: "gitlab.example",
      endpoint: `projects/org%2Frepo/repository/commits/${mergeCommit}`,
    });
    mocks.gitlab.mockResolvedValue({ id: mergeCommit, parent_ids: [advancedBase, base] });
    await expect(proveAdoptedMergeExactBaseParent({ ...input, receipt: gitlab })).resolves.toBe(
      false,
    );
  });
});
