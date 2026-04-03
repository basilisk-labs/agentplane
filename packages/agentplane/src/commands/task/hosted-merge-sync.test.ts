import { describe, expect, it } from "vitest";

import { buildUpdatedPrMeta } from "../shared/pr-meta.js";

import { resolveHostedMergeTargetFromEvent, syncHostedMergedTasks } from "./hosted-merge-sync.js";

describe("syncHostedMergedTasks", () => {
  it("no-ops outside local branch_pr mode", async () => {
    const result = await syncHostedMergedTasks({
      // @ts-expect-error narrow test stub
      ctx: {
        backendId: "redmine",
        config: { workflow_mode: "branch_pr" },
      },
      tasks: [],
    });
    expect(result).toEqual({ tasks: [], synced: 0 });
  });

  it("keeps buildUpdatedPrMeta semantics intact for non-merged updates", () => {
    const updated = buildUpdatedPrMeta({
      meta: {
        schema_version: 1,
        task_id: "202603271724-HJXDV0",
        branch: "task/202603271724-HJXDV0/reconcile",
        created_at: "2026-03-27T17:24:00.000Z",
        updated_at: "2026-03-27T17:24:00.000Z",
        last_verified_sha: null,
        last_verified_at: null,
        verify: { status: "skipped" },
      },
      branch: "task/202603271724-HJXDV0/reconcile",
      at: "2026-03-27T17:30:00.000Z",
    });
    expect(updated.updated_at).toBe("2026-03-27T17:24:00.000Z");
    expect(updated.status).toBeUndefined();
  });

  it("derives a hosted merge target from a merged task PR event", () => {
    const target = resolveHostedMergeTargetFromEvent({
      branchPrefix: "task",
      event: {
        pull_request: {
          merged: true,
          number: 42,
          title: "Hosted close test",
          html_url: "https://github.com/basilisk-labs/agentplane/pull/42",
          merged_at: "2026-03-27T17:40:00.000Z",
          merge_commit_sha: "1234567890abcdef1234567890abcdef12345678",
          base: { ref: "main" },
          head: {
            ref: "task/202603271940-EG3B0C/hosted-close",
            sha: "abcdef1234567890abcdef1234567890abcdef12",
          },
        },
      },
    });

    expect(target).toEqual({
      taskId: "202603271940-EG3B0C",
      branch: "task/202603271940-EG3B0C/hosted-close",
      mergedPr: {
        number: 42,
        title: "Hosted close test",
        url: "https://github.com/basilisk-labs/agentplane/pull/42",
        mergedAt: "2026-03-27T17:40:00.000Z",
        baseRefName: "main",
        headRefName: "task/202603271940-EG3B0C/hosted-close",
        headRefOid: "abcdef1234567890abcdef1234567890abcdef12",
        mergeCommit: {
          oid: "1234567890abcdef1234567890abcdef12345678",
        },
      },
    });
  });
});
