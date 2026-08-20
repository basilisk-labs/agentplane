import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ runGlabApiJson: vi.fn() }));
vi.mock("./glab-api.js", async (importOriginal) => ({
  ...(await importOriginal<Record<string, unknown>>()),
  runGlabApiJson: mocks.runGlabApiJson,
}));

import {
  observeExistingGitLabMrByBranch,
  observeExistingGitLabMrByNumber,
  tryCreateGitLabMr,
  tryUpdateGitLabMr,
} from "./sync-gitlab.js";

const identity = {
  provider: "gitlab" as const,
  hostname: "gitlab.example.test",
  remote: "fork",
  sourceProject: "denis/project",
  targetProject: "group/sub/project",
  sourceUrl: "git@gitlab.example.test:denis/project.git",
  targetUrl: "https://gitlab.example.test/group/sub/project.git",
};

type GlabCall = { hostname?: string; endpoint?: string; method?: string };

function mr(overrides: Record<string, unknown> = {}) {
  return {
    iid: 42,
    web_url: "https://gitlab.example.test/group/sub/project/-/merge_requests/42",
    state: "opened",
    source_branch: "task/T-1/work",
    target_branch: "main",
    source_project_id: 7,
    sha: "head-sha",
    has_conflicts: false,
    detailed_merge_status: "mergeable",
    diff_refs: { base_sha: "base-sha", head_sha: "head-sha" },
    ...overrides,
  };
}

describe("sync-gitlab", () => {
  beforeEach(() => vi.clearAllMocks());

  it("looks up nested self-managed fork MRs and refreshes exact mergeability", async () => {
    mocks.runGlabApiJson
      .mockResolvedValueOnce({ id: 7 })
      .mockResolvedValueOnce([mr()])
      .mockResolvedValueOnce(mr({ has_conflicts: true, detailed_merge_status: "conflict" }));

    await expect(
      observeExistingGitLabMrByBranch({
        gitRoot: "/repo",
        identity,
        branch: "task/T-1/work",
        baseBranch: "main",
      }),
    ).resolves.toMatchObject({
      state: "found",
      pr: {
        provider: "gitlab",
        prNumber: 42,
        headSha: "head-sha",
        baseSha: "base-sha",
        mergeability: { state: "conflicting", mergeable: false, providerState: "conflict" },
      },
    });
    const lookupCall = (mocks.runGlabApiJson.mock.calls as [GlabCall][])[1]?.[0];
    expect(lookupCall?.hostname).toBe("gitlab.example.test");
    expect(lookupCall?.endpoint).toContain("projects/group%2Fsub%2Fproject/merge_requests?");
  });

  it("recovers an uncertain create by re-observing instead of creating a duplicate MR", async () => {
    mocks.runGlabApiJson
      .mockResolvedValueOnce({ id: 7 })
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce({ id: 9 })
      .mockRejectedValueOnce(new Error("connection reset after request"))
      .mockResolvedValueOnce({ id: 7 })
      .mockResolvedValueOnce([mr()])
      .mockResolvedValueOnce(mr());

    await expect(
      tryCreateGitLabMr({
        gitRoot: "/repo",
        identity,
        branch: "task/T-1/work",
        baseBranch: "main",
        title: "Title",
        body: "Body",
      }),
    ).resolves.toMatchObject({ observed: { prNumber: 42 }, artifactState: null });
    expect(
      (mocks.runGlabApiJson.mock.calls as [GlabCall][]).filter(
        ([call]) => call.method === "POST" && String(call.endpoint).endsWith("/merge_requests"),
      ),
    ).toHaveLength(1);
  });

  it("fails closed when an IID lookup omits the authoritative source project", async () => {
    mocks.runGlabApiJson
      .mockResolvedValueOnce({ id: 7 })
      .mockResolvedValueOnce(mr({ source_project_id: null }));

    await expect(
      observeExistingGitLabMrByNumber({
        gitRoot: "/repo",
        identity,
        prNumber: 42,
        branch: "task/T-1/work",
        baseBranch: "main",
      }),
    ).resolves.toEqual({
      state: "unavailable",
      reason: "GitLab MR lookup omitted source_project_id",
    });
  });

  it("updates the linked MR through the target project and explicit host", async () => {
    mocks.runGlabApiJson.mockResolvedValueOnce(mr());

    await expect(
      tryUpdateGitLabMr({
        gitRoot: "/repo",
        identity,
        observed: {
          provider: "gitlab",
          identity,
          prNumber: 42,
          prUrl: "https://gitlab.example.test/group/sub/project/-/merge_requests/42",
          status: "OPEN",
          mergedAt: null,
          mergeCommit: null,
          base: "main",
          headSha: "head-sha",
          headRef: "task/T-1/work",
        },
        title: "Updated title",
        body: "Updated body",
      }),
    ).resolves.toMatchObject({ observed: { provider: "gitlab", prNumber: 42 } });

    expect(mocks.runGlabApiJson).toHaveBeenCalledWith(
      expect.objectContaining({
        hostname: "gitlab.example.test",
        endpoint: "projects/group%2Fsub%2Fproject/merge_requests/42",
        method: "PUT",
      }),
    );
  });
});
