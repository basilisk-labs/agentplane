import { readFile } from "node:fs/promises";

import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ runGlabApiJson: vi.fn() }));
vi.mock("../../internal/glab-api.js", async (importOriginal) => ({
  ...(await importOriginal<Record<string, unknown>>()),
  runGlabApiJson: mocks.runGlabApiJson,
}));

import { runProtectedBaseGitLabMerge } from "./gitlab-mr-merge.js";

const identity = {
  provider: "gitlab" as const,
  hostname: "gitlab.example.test",
  remote: "origin",
  sourceProject: "group/project",
  targetProject: "group/project",
  sourceUrl: "git@gitlab.example.test:group/project.git",
  targetUrl: "git@gitlab.example.test:group/project.git",
};

describe("gitlab-mr-merge", () => {
  beforeEach(() => vi.clearAllMocks());

  it("runs the pre-mutation guard and sends a SHA-guarded merge through explicit hostname", async () => {
    const guard = vi.fn(() => Promise.resolve());
    let payload: Record<string, unknown> | null = null;
    mocks.runGlabApiJson.mockImplementation(async (call: { inputPath: string }) => {
      payload = JSON.parse(await readFile(call.inputPath, "utf8")) as Record<string, unknown>;
      return {
        state: "merged",
        merged_at: "2026-08-20T00:00:00Z",
        merge_commit_sha: "merge-sha",
      };
    });
    await expect(
      runProtectedBaseGitLabMerge({
        gitRoot: "/repo",
        identity,
        prNumber: 42,
        expectedHeadSha: "expected-head",
        preMutationGuard: guard,
      }),
    ).resolves.toMatchObject({ status: "merged" });
    expect(guard).toHaveBeenCalledOnce();
    expect(payload).toMatchObject({ sha: "expected-head" });
    expect(mocks.runGlabApiJson).toHaveBeenCalledWith(
      expect.objectContaining({
        hostname: "gitlab.example.test",
        endpoint: "projects/group%2Fproject/merge_requests/42/merge",
        method: "PUT",
      }),
    );
  });

  it("preserves a pre-mutation race error instead of converting it to a provider handoff", async () => {
    const race = new Error("base advanced before merge");
    await expect(
      runProtectedBaseGitLabMerge({
        gitRoot: "/repo",
        identity,
        prNumber: 42,
        expectedHeadSha: "expected-head",
        preMutationGuard: () => Promise.reject(race),
      }),
    ).rejects.toBe(race);
    expect(mocks.runGlabApiJson).not.toHaveBeenCalled();
  });
});
