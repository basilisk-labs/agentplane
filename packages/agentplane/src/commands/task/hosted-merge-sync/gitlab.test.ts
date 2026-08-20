import { describe, expect, it } from "vitest";

import { resolveGitLabMergeTargetFromEvent } from "./gitlab.js";

describe("GitLab hosted merge reconciliation", () => {
  it("normalizes a merged GitLab MR webhook into the existing hosted-close target", () => {
    expect(
      resolveGitLabMergeTargetFromEvent({
        branchPrefix: "task/",
        event: {
          object_kind: "merge_request",
          object_attributes: {
            iid: 42,
            title: "Provider support",
            url: "https://gitlab.example.test/group/project/-/merge_requests/42",
            web_url: "https://gitlab.example.test/group/project/-/merge_requests/42",
            state: "merged",
            merged_at: "2026-08-20T00:00:00Z",
            source_branch: "task/202608201524-TRM5DT/provider-support",
            target_branch: "main",
            sha: "head-sha",
            merge_commit_sha: "merge-sha",
          },
        },
      }),
    ).toMatchObject({
      taskId: "202608201524-TRM5DT",
      branch: "task/202608201524-TRM5DT/provider-support",
      mergedPr: { provider: "gitlab", number: 42, mergeCommit: { oid: "merge-sha" } },
    });
  });
});
