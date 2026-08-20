import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  observeByBranch: vi.fn(),
  observeByNumber: vi.fn(),
}));

vi.mock("../pr/internal/change-request-provider.js", () => ({
  observeExistingChangeRequestByBranch: mocks.observeByBranch,
  observeExistingChangeRequestByNumber: mocks.observeByNumber,
}));

import { observeProviderPr } from "./cleanup-merged-provider-reconciliation.js";

const recorded = {
  schema_version: 1 as const,
  kind: "gitlab" as const,
  hostname: "gitlab.example.test",
  remote: "origin",
  source_project: "group/project",
  target_project: "group/project",
};

describe("observeProviderPr", () => {
  beforeEach(() => vi.clearAllMocks());

  it("uses the provider-neutral numbered lookup with recorded GitLab identity", async () => {
    mocks.observeByNumber.mockResolvedValue({ state: "not_found" });

    await expect(
      observeProviderPr({
        gitRoot: "/repo",
        branch: "task/T-1/work",
        baseBranch: "main",
        prNumber: 42,
        recorded,
      }),
    ).resolves.toEqual({ state: "not_found" });

    expect(mocks.observeByNumber).toHaveBeenCalledWith({
      gitRoot: "/repo",
      branch: "task/T-1/work",
      baseBranch: "main",
      prNumber: 42,
      recorded,
    });
    expect(mocks.observeByBranch).not.toHaveBeenCalled();
  });

  it("uses the provider-neutral exact branch lookup when no number is recorded", async () => {
    mocks.observeByBranch.mockResolvedValue({ state: "not_found" });

    await observeProviderPr({
      gitRoot: "/repo",
      branch: "task/T-1/work",
      baseBranch: "main",
      prNumber: null,
      recorded,
    });

    expect(mocks.observeByBranch).toHaveBeenCalledWith({
      gitRoot: "/repo",
      branch: "task/T-1/work",
      baseBranch: "main",
      requireUnique: true,
      recorded,
    });
  });
});
