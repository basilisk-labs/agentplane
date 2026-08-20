import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ runGlabApiJson: vi.fn() }));
vi.mock("../../pr/internal/glab-api.js", async (importOriginal) => ({
  ...(await importOriginal<Record<string, unknown>>()),
  runGlabApiJson: mocks.runGlabApiJson,
}));

import { resolveGitLabMergedMr } from "./gitlab.js";

const identity = {
  provider: "gitlab" as const,
  hostname: "gitlab.example.test",
  remote: "fork",
  sourceProject: "denis/project",
  targetProject: "group/project",
  sourceUrl: "git@gitlab.example.test:denis/project.git",
  targetUrl: "https://gitlab.example.test/group/project.git",
};

describe("GitLab merged MR lookup", () => {
  beforeEach(() => vi.clearAllMocks());

  it("ignores a same-named branch from another fork", async () => {
    mocks.runGlabApiJson.mockResolvedValueOnce({ id: 7 }).mockResolvedValueOnce([
      {
        iid: 41,
        state: "merged",
        source_project_id: 8,
        source_branch: "task/T-1/work",
        merge_commit_sha: "wrong-fork-merge",
        merged_at: "2026-08-20T01:00:00Z",
      },
      {
        iid: 42,
        state: "merged",
        source_project_id: 7,
        source_branch: "task/T-1/work",
        target_branch: "main",
        sha: "head-sha",
        merge_commit_sha: "correct-merge",
        merged_at: "2026-08-20T00:00:00Z",
      },
    ]);

    await expect(
      resolveGitLabMergedMr({ cwd: "/repo", branch: "task/T-1/work", identity }),
    ).resolves.toMatchObject({
      provider: "gitlab",
      number: 42,
      mergeCommit: { oid: "correct-merge" },
    });
  });
});
