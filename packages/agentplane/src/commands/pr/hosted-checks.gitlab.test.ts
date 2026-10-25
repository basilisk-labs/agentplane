import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  resolveIdentity: vi.fn(),
  runGlabApiJson: vi.fn(),
}));

vi.mock("./internal/change-request-provider.js", () => ({
  observeExistingChangeRequestByNumber: vi.fn(),
  resolveChangeRequestIdentity: mocks.resolveIdentity,
}));
vi.mock("./internal/glab-api.js", async (importOriginal) => ({
  ...(await importOriginal<Record<string, unknown>>()),
  runGlabApiJson: mocks.runGlabApiJson,
}));

import { resolveHostedChecksStatus } from "./hosted-checks.js";

describe("GitLab hosted checks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.resolveIdentity.mockResolvedValue({
      provider: "gitlab",
      hostname: "gitlab.example.test",
      remote: "origin",
      sourceProject: "group/project",
      targetProject: "group/project",
    });
  });

  it("selects only a pipeline at the expected head and summarizes its jobs", async () => {
    mocks.runGlabApiJson
      .mockResolvedValueOnce([
        { id: 10, project_id: 7, sha: "old-head", status: "success" },
        { id: 11, project_id: 7, sha: "exact-head", status: "success" },
      ])
      .mockResolvedValueOnce([
        { name: "test", status: "success" },
        { name: "docs", status: "skipped" },
      ]);

    await expect(
      resolveHostedChecksStatus({
        gitRoot: "/repo",
        prNumber: 42,
        branch: "task/T-1/work",
        expectedHeadSha: "exact-head",
        requiredChecks: ["test"],
      }),
    ).resolves.toMatchObject({ checked: true, total: 2, passing: 2, pending: 0 });
    expect(mocks.runGlabApiJson).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        hostname: "gitlab.example.test",
        endpoint: "projects/7/pipelines/11/jobs?per_page=100",
      }),
    );
  });

  it("rejects a failed exact-head pipeline even if its visible jobs are green", async () => {
    mocks.runGlabApiJson.mockResolvedValueOnce([
      { id: 11, project_id: 7, sha: "exact-head", status: "failed" },
    ]);
    await expect(
      resolveHostedChecksStatus({
        gitRoot: "/repo",
        prNumber: 42,
        branch: "task/T-1/work",
        expectedHeadSha: "exact-head",
        requiredChecks: ["test"],
        requireCompleteSuccess: true,
      }),
    ).resolves.toEqual({
      checked: false,
      reason: "GitLab MR pipeline for exact head is not successful",
    });
    expect(mocks.runGlabApiJson).toHaveBeenCalledTimes(1);
  });

  it("selects the newest exact-head pipeline in strict mode regardless of API order", async () => {
    mocks.runGlabApiJson.mockResolvedValueOnce([
      { id: 10, project_id: 7, sha: "exact-head", status: "success" },
      { id: 11, project_id: 7, sha: "exact-head", status: "failed" },
    ]);
    await expect(
      resolveHostedChecksStatus({
        gitRoot: "/repo",
        prNumber: 42,
        branch: "task/T-1/work",
        expectedHeadSha: "exact-head",
        requiredChecks: ["test"],
        requireCompleteSuccess: true,
      }),
    ).resolves.toEqual({
      checked: false,
      reason: "GitLab MR pipeline for exact head is not successful",
    });
    expect(mocks.runGlabApiJson).toHaveBeenCalledTimes(1);
  });

  it("rejects a page-limit job inventory even when its first hundred jobs are green", async () => {
    mocks.runGlabApiJson
      .mockResolvedValueOnce([{ id: 11, project_id: 7, sha: "exact-head", status: "success" }])
      .mockResolvedValueOnce(
        Array.from({ length: 100 }, (_, index) => ({ name: `job-${index}`, status: "success" })),
      );
    await expect(
      resolveHostedChecksStatus({
        gitRoot: "/repo",
        prNumber: 42,
        branch: "task/T-1/work",
        expectedHeadSha: "exact-head",
        requiredChecks: ["job-1"],
        requireCompleteSuccess: true,
      }),
    ).resolves.toEqual({
      checked: false,
      reason: "GitLab MR job inventory is incomplete or at the page limit",
    });
  });

  it("rejects a page-limit pipeline inventory before choosing an exact-head run", async () => {
    mocks.runGlabApiJson.mockResolvedValueOnce(
      Array.from({ length: 100 }, (_, index) => ({
        id: index + 1,
        project_id: 7,
        sha: "exact-head",
        status: "success",
      })),
    );
    await expect(
      resolveHostedChecksStatus({
        gitRoot: "/repo",
        prNumber: 42,
        branch: "task/T-1/work",
        expectedHeadSha: "exact-head",
        requiredChecks: ["test"],
        requireCompleteSuccess: true,
      }),
    ).resolves.toEqual({
      checked: false,
      reason: "GitLab MR pipeline inventory is incomplete or at the page limit",
    });
    expect(mocks.runGlabApiJson).toHaveBeenCalledTimes(1);
  });

  it("accepts an absent pipeline only when GitLab policy does not require one", async () => {
    mocks.runGlabApiJson
      .mockResolvedValueOnce([{ id: 10, project_id: 7, sha: "old-head", status: "success" }])
      .mockResolvedValueOnce({ only_allow_merge_if_pipeline_succeeds: false });

    await expect(
      resolveHostedChecksStatus({
        gitRoot: "/repo",
        prNumber: 42,
        branch: "task/T-1/work",
        expectedHeadSha: "exact-head",
      }),
    ).resolves.toEqual({
      checked: true,
      total: 1,
      pending: 0,
      failing: 0,
      passing: 1,
      missingRequired: [],
      rows: [{ name: "GitLab pipeline not required", state: "SKIPPED" }],
    });
    expect(mocks.runGlabApiJson).toHaveBeenNthCalledWith(2, {
      cwd: "/repo",
      hostname: "gitlab.example.test",
      endpoint: "projects/group%2Fproject",
    });
  });

  it("fails closed when GitLab policy requires a pipeline", async () => {
    mocks.runGlabApiJson
      .mockResolvedValueOnce([{ id: 10, project_id: 7, sha: "old-head", status: "success" }])
      .mockResolvedValueOnce({ only_allow_merge_if_pipeline_succeeds: true });

    await expect(
      resolveHostedChecksStatus({
        gitRoot: "/repo",
        prNumber: 42,
        branch: "task/T-1/work",
        expectedHeadSha: "exact-head",
      }),
    ).resolves.toEqual({
      checked: false,
      reason: "GitLab has no MR pipeline for exact head exact-head",
    });
  });

  it("fails closed without consulting project policy when named checks are required", async () => {
    mocks.runGlabApiJson.mockResolvedValueOnce([]);

    await expect(
      resolveHostedChecksStatus({
        gitRoot: "/repo",
        prNumber: 42,
        branch: "task/T-1/work",
        expectedHeadSha: "exact-head",
        requiredChecks: ["test"],
      }),
    ).resolves.toEqual({
      checked: false,
      reason: "GitLab has no MR pipeline for exact head exact-head",
    });
    expect(mocks.runGlabApiJson).toHaveBeenCalledTimes(1);
  });
});
