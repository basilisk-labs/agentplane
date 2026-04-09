import { beforeEach, describe, expect, it, vi } from "vitest";

import { buildUpdatedPrMeta } from "../shared/pr-meta.js";
import { execFileAsync } from "../shared/git.js";

import {
  resolveHostedMergeTargetFromEvent,
  resolveHostedMergedPr,
  resolveLocalMergedPrMeta,
  syncHostedMergedTasks,
} from "./hosted-merge-sync.js";

vi.mock("../shared/git.js", () => ({
  execFileAsync: vi.fn(),
}));

const mockedExecFileAsync = execFileAsync as unknown as {
  mock: { calls: unknown[][] };
  mockReset: () => void;
  mockRejectedValueOnce: (value: unknown) => typeof mockedExecFileAsync;
  mockResolvedValueOnce: (value: unknown) => typeof mockedExecFileAsync;
};

beforeEach(() => {
  mockedExecFileAsync.mockReset();
});

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

  it("normalizes merged local PR metadata for the fast-path reconcile", () => {
    expect(
      resolveLocalMergedPrMeta({
        schema_version: 1,
        task_id: "202604061815-01F3CY",
        branch: "task/202604061815-01F3CY/fast-path",
        base: "main",
        created_at: "2026-04-06T18:15:00.000Z",
        updated_at: "2026-04-06T18:20:00.000Z",
        status: "MERGED",
        merged_at: "2026-04-06T18:19:00.000Z",
        merge_commit: "1234567890abcdef1234567890abcdef12345678",
        head_sha: "abcdef1234567890abcdef1234567890abcdef12",
        last_verified_sha: null,
        last_verified_at: null,
        verify: { status: "pass" },
      }),
    ).toEqual({
      branch: "task/202604061815-01F3CY/fast-path",
      base: "main",
      mergedAt: "2026-04-06T18:19:00.000Z",
      mergeCommit: "1234567890abcdef1234567890abcdef12345678",
      headSha: "abcdef1234567890abcdef1234567890abcdef12",
    });
    expect(
      resolveLocalMergedPrMeta({
        schema_version: 1,
        task_id: "202604061815-01F3CY",
        branch: "task/202604061815-01F3CY/fast-path",
        created_at: "2026-04-06T18:15:00.000Z",
        updated_at: "2026-04-06T18:20:00.000Z",
        last_verified_sha: null,
        last_verified_at: null,
        verify: { status: "pass" },
      }),
    ).toBeNull();
  });

  it("retries transient gh transport failures before succeeding", async () => {
    mockedExecFileAsync
      .mockRejectedValueOnce(new Error('gh: Post "https://api.github.com/graphql": EOF'))
      .mockResolvedValueOnce({
        stdout: JSON.stringify([
          {
            number: 42,
            title: "Merged PR",
            mergedAt: "2026-04-06T18:19:00.000Z",
            baseRefName: "main",
            headRefName: "task/202604061815-01F3CY/retry",
            headRefOid: "abcdef1234567890abcdef1234567890abcdef12",
            mergeCommit: { oid: "1234567890abcdef1234567890abcdef12345678" },
          },
        ]),
        stderr: "",
      });

    await expect(
      resolveHostedMergedPr({
        cwd: "/repo",
        branch: "task/202604061815-01F3CY/retry",
      }),
    ).resolves.toEqual({
      number: 42,
      title: "Merged PR",
      url: null,
      mergedAt: "2026-04-06T18:19:00.000Z",
      baseRefName: "main",
      headRefName: "task/202604061815-01F3CY/retry",
      headRefOid: "abcdef1234567890abcdef1234567890abcdef12",
      mergeCommit: {
        oid: "1234567890abcdef1234567890abcdef12345678",
      },
    });
    expect(mockedExecFileAsync).toHaveBeenCalledTimes(2);
  });

  it("sanitizes git override env while preserving gh auth inputs", async () => {
    const originalGhToken = process.env.GH_TOKEN;
    const originalGitDir = process.env.GIT_DIR;
    const originalGitWorkTree = process.env.GIT_WORK_TREE;
    const originalHome = process.env.HOME;
    process.env.GH_TOKEN = "token-from-parent-env";
    process.env.GIT_DIR = "/tmp/should-not-leak.git";
    process.env.GIT_WORK_TREE = "/tmp/should-not-leak-tree";
    process.env.HOME = "/tmp/test-home";

    mockedExecFileAsync.mockResolvedValueOnce({
      stdout: JSON.stringify([
        {
          number: 42,
          title: "Merged PR",
          mergedAt: "2026-04-06T18:19:00.000Z",
          baseRefName: "main",
          headRefName: "task/202604061815-01F3CY/env-sanitized",
          headRefOid: "abcdef1234567890abcdef1234567890abcdef12",
          mergeCommit: { oid: "1234567890abcdef1234567890abcdef12345678" },
        },
      ]),
      stderr: "",
    });

    try {
      await resolveHostedMergedPr({
        cwd: "/repo",
        branch: "task/202604061815-01F3CY/env-sanitized",
      });
    } finally {
      if (originalGhToken === undefined) delete process.env.GH_TOKEN;
      else process.env.GH_TOKEN = originalGhToken;
      if (originalGitDir === undefined) delete process.env.GIT_DIR;
      else process.env.GIT_DIR = originalGitDir;
      if (originalGitWorkTree === undefined) delete process.env.GIT_WORK_TREE;
      else process.env.GIT_WORK_TREE = originalGitWorkTree;
      if (originalHome === undefined) delete process.env.HOME;
      else process.env.HOME = originalHome;
    }

    expect(mockedExecFileAsync).toHaveBeenCalledTimes(1);
    const execOptions = mockedExecFileAsync.mock.calls[0]?.[2] as
      | { env?: NodeJS.ProcessEnv }
      | undefined;
    expect(execOptions?.env?.GH_TOKEN).toBe("token-from-parent-env");
    expect(execOptions?.env?.HOME).toBe("/tmp/test-home");
    expect(execOptions?.env?.GIT_DIR).toBeUndefined();
    expect(execOptions?.env?.GIT_WORK_TREE).toBeUndefined();
  });

  it("does not retry permanent gh auth failures", async () => {
    mockedExecFileAsync.mockRejectedValueOnce(new Error("gh: authentication required"));

    await expect(
      resolveHostedMergedPr({
        cwd: "/repo",
        branch: "task/202604061815-01F3CY/retry",
      }),
    ).rejects.toThrow("authentication required");
    expect(mockedExecFileAsync).toHaveBeenCalledTimes(1);
  });
});
