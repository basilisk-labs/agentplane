import { beforeEach, describe, expect, it, vi } from "vitest";

const gh = vi.hoisted(() => ({
  isGhNotFound: vi.fn<(err: unknown) => boolean>(),
  resolveDefaultGithubRepo: vi.fn<() => Promise<string>>(),
  runGhApiNoOutput: vi.fn<() => Promise<void>>(),
}));

vi.mock("../pr/internal/gh-api.js", () => gh);

import {
  deleteCloseRemoteHeadBranch,
  ensureBranchPrCloseWorkflowMode,
  ensureNonEmptyCloseFlag,
  resolveCloseGithubOwner,
  resolveCloseGithubRepo,
} from "./close-precheck.js";

describe("close-precheck helpers", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    gh.isGhNotFound.mockReturnValue(false);
    gh.resolveDefaultGithubRepo.mockResolvedValue("example/repo");
    gh.runGhApiNoOutput.mockResolvedValue();
  });

  it("validates close-family string flags without changing trimmed values", () => {
    expect(ensureNonEmptyCloseFlag("repo", " example/repo ")).toBe("example/repo");
    expect(() => ensureNonEmptyCloseFlag("repo", "   ")).toThrowError("Invalid value for --repo.");
  });

  it("keeps branch_pr workflow validation aligned with command output wording", () => {
    expect(() => ensureBranchPrCloseWorkflowMode("branch_pr")).not.toThrow();
    expect(() => ensureBranchPrCloseWorkflowMode("direct")).toThrowError(
      "Invalid workflow_mode: direct (expected branch_pr)",
    );
  });

  it("resolves explicit repo overrides before falling back to origin", async () => {
    await expect(
      resolveCloseGithubRepo({ gitRoot: "/repo", repoOverride: " override/repo " }),
    ).resolves.toBe("override/repo");
    expect(gh.resolveDefaultGithubRepo).not.toHaveBeenCalled();

    await expect(resolveCloseGithubRepo({ gitRoot: "/repo", repoOverride: null })).resolves.toBe(
      "example/repo",
    );
    expect(gh.resolveDefaultGithubRepo).toHaveBeenCalledWith("/repo");
  });

  it("derives GitHub owners for close-family PR lookups", () => {
    expect(resolveCloseGithubOwner("example/repo")).toBe("example");
    expect(() => resolveCloseGithubOwner("")).toThrowError("Could not derive GitHub owner");
  });

  it("maps missing remote head branches to already-absent", async () => {
    const notFound = new Error("404");
    gh.runGhApiNoOutput.mockRejectedValue(notFound);
    gh.isGhNotFound.mockReturnValue(true);

    await expect(
      deleteCloseRemoteHeadBranch({
        cwd: "/repo",
        repo: "example/repo",
        branch: "task/T-1/cleanup",
      }),
    ).resolves.toBe("already-absent");
    expect(gh.runGhApiNoOutput).toHaveBeenCalledWith("/repo", [
      "repos/example/repo/git/refs/heads/task%2FT-1%2Fcleanup",
      "-X",
      "DELETE",
    ]);
  });

  it("preserves non-404 remote branch deletion failures", async () => {
    const failure = new Error("gh failed");
    gh.runGhApiNoOutput.mockRejectedValue(failure);
    gh.isGhNotFound.mockReturnValue(false);

    await expect(
      deleteCloseRemoteHeadBranch({
        cwd: "/repo",
        repo: "example/repo",
        branch: "task/T-1/cleanup",
      }),
    ).rejects.toBe(failure);
  });
});
