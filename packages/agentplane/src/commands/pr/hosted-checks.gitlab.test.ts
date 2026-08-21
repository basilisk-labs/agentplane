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
