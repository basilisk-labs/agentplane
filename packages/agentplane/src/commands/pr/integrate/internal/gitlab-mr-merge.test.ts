import { readFile } from "node:fs/promises";

import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ runGlabApiJson: vi.fn() }));
vi.mock("../../internal/glab-api.js", async (importOriginal) => ({
  ...(await importOriginal<Record<string, unknown>>()),
  runGlabApiJson: mocks.runGlabApiJson,
}));

import {
  assertGitLabExactBaseMergeCapability,
  runProtectedBaseGitLabMerge,
} from "./gitlab-mr-merge.js";

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

  it("rejects a fast-forward or rebase project before any hosted merge effect", async () => {
    for (const merge_method of ["ff", "rebase_merge", null]) {
      expect(() => assertGitLabExactBaseMergeCapability({ merge_method })).toThrow();
    }
    const guard = vi.fn(() => Promise.resolve());
    mocks.runGlabApiJson.mockResolvedValue({ merge_method: "ff", automatic_rebase_enabled: false });
    await expect(
      runProtectedBaseGitLabMerge({
        gitRoot: "/repo",
        identity,
        prNumber: 42,
        expectedHeadSha: "expected-head",
        expectedBaseSha: "base",
        baseBranch: "main",
        preMutationGuard: guard,
        exactBaseParentProof: true,
      }),
    ).rejects.toThrow("merge-commit method");
    expect(guard).not.toHaveBeenCalled();
    expect(mocks.runGlabApiJson).toHaveBeenCalledTimes(1);
  });

  it("runs the pre-mutation guard and sends a SHA-guarded merge through explicit hostname", async () => {
    const guard = vi.fn(() => Promise.resolve());
    let payload: Record<string, unknown> | null = null;
    mocks.runGlabApiJson.mockImplementation(async (call: { inputPath?: string }) => {
      if (!call.inputPath) return { merge_method: "ff", automatic_rebase_enabled: false };
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
        expectedBaseSha: "base",
        baseBranch: "main",
        preMutationGuard: guard,
      }),
    ).resolves.toMatchObject({ status: "merged" });
    expect(guard).toHaveBeenCalledOnce();
    expect(payload).toEqual({
      sha: "expected-head",
      should_remove_source_branch: false,
      squash: false,
    });
    expect(mocks.runGlabApiJson).toHaveBeenCalledTimes(2);
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
    mocks.runGlabApiJson.mockResolvedValue({ merge_method: "ff", automatic_rebase_enabled: false });
    await expect(
      runProtectedBaseGitLabMerge({
        gitRoot: "/repo",
        identity,
        prNumber: 42,
        expectedHeadSha: "expected-head",
        expectedBaseSha: "base",
        baseBranch: "main",
        preMutationGuard: () => Promise.reject(race),
      }),
    ).rejects.toBe(race);
    expect(
      mocks.runGlabApiJson.mock.calls.some(
        ([call]) => (call as { method?: string }).method === "PUT",
      ),
    ).toBe(false);
  });
});

describe("GitLab current-base server contract", () => {
  beforeEach(() => vi.resetAllMocks());
  it.each(["merge", "rebase_merge", undefined])(
    "refuses unsupported server method %s before PUT",
    async (merge_method) => {
      mocks.runGlabApiJson.mockResolvedValue({ merge_method });
      await expect(
        runProtectedBaseGitLabMerge({
          gitRoot: "/repo",
          identity,
          prNumber: 42,
          expectedHeadSha: "H",
          expectedBaseSha: "R",
          baseBranch: "main",
          preMutationGuard: vi.fn(),
        }),
      ).rejects.toMatchObject({
        code: "E_HANDOFF",
        context: { reason_code: "provider_current_base_merge_contract_unavailable" },
      });
      expect(mocks.runGlabApiJson).toHaveBeenCalledTimes(1);
      expect((mocks.runGlabApiJson.mock.calls[0]?.[0] as { method?: string }).method).not.toBe(
        "PUT",
      );
    },
  );
  it("preserves an unavailable server contract as a typed boundary", async () => {
    mocks.runGlabApiJson.mockRejectedValue(new Error("403 policy unavailable"));
    await expect(
      runProtectedBaseGitLabMerge({
        gitRoot: "/repo",
        identity,
        prNumber: 42,
        expectedHeadSha: "H",
        expectedBaseSha: "R",
        baseBranch: "main",
        preMutationGuard: vi.fn(),
      }),
    ).rejects.toMatchObject({
      code: "E_HANDOFF",
      context: { reason_code: "provider_current_base_merge_contract_unavailable" },
    });
    expect(
      mocks.runGlabApiJson.mock.calls.some(
        ([call]) => (call as { method?: string }).method === "PUT",
      ),
    ).toBe(false);
  });
  it.each([true, undefined, null, "false", 0, {}])(
    "refuses enabled or malformed automatic rebase capability: %s",
    async (automatic_rebase_enabled) => {
      mocks.runGlabApiJson.mockResolvedValue({ merge_method: "ff", automatic_rebase_enabled });
      await expect(
        runProtectedBaseGitLabMerge({
          gitRoot: "/repo",
          identity,
          prNumber: 42,
          expectedHeadSha: "H",
          expectedBaseSha: "R",
          baseBranch: "main",
          preMutationGuard: vi.fn(),
        }),
      ).rejects.toMatchObject({
        code: "E_HANDOFF",
        context: { reason_code: "provider_current_base_merge_contract_unavailable" },
      });
      expect(
        mocks.runGlabApiJson.mock.calls.some(
          ([call]) => (call as { method?: string }).method === "PUT",
        ),
      ).toBe(false);
      expect(mocks.runGlabApiJson).toHaveBeenCalledTimes(1);
    },
  );

  it.each(["16.11.10", "17.11.0", "17.11.7-ee", "17.11.7-ce"])(
    "qualifies an absent capability only with same-host stable legacy version %s",
    async (version) => {
      let payload: Record<string, unknown> | null = null;
      const guard = vi.fn(() => Promise.resolve());
      mocks.runGlabApiJson.mockImplementation(
        async (call: { endpoint: string; inputPath?: string }) => {
          if (call.endpoint === "version") return { version };
          if (!call.inputPath) return { merge_method: "ff" };
          payload = JSON.parse(await readFile(call.inputPath, "utf8")) as Record<string, unknown>;
          return { state: "merged", merge_commit_sha: "H" };
        },
      );
      await expect(
        runProtectedBaseGitLabMerge({
          gitRoot: "/repo",
          identity: { ...identity, sourceProject: "fork/project" },
          prNumber: 42,
          expectedHeadSha: "H",
          expectedBaseSha: "R",
          baseBranch: "main",
          preMutationGuard: guard,
        }),
      ).resolves.toMatchObject({ status: "merged" });
      expect(guard).toHaveBeenCalledOnce();
      expect(mocks.runGlabApiJson).toHaveBeenCalledWith({
        cwd: "/repo",
        hostname: identity.hostname,
        endpoint: "version",
      });
      expect(mocks.runGlabApiJson).toHaveBeenCalledTimes(3);
      expect(payload).toEqual({ sha: "H", should_remove_source_branch: false, squash: false });
    },
  );

  it.each([
    "18.0.0",
    "19.1.2-ee",
    "17.11.0-rc1",
    "17.11.0-pre",
    "17.11.0+dev",
    "17.11",
    "v17.11.0",
    " 17.11.0 ",
    "017.11.0",
    "0.0.0",
    "17.9007199254740992.0",
    "9007199254740992.0.0",
    "unknown",
    null,
    17,
    undefined,
  ])("rejects absent capability without stable pre-18 version proof: %s", async (version) => {
    mocks.runGlabApiJson.mockImplementation((call: { endpoint: string }) =>
      Promise.resolve(call.endpoint === "version" ? { version } : { merge_method: "ff" }),
    );
    await expect(
      runProtectedBaseGitLabMerge({
        gitRoot: "/repo",
        identity,
        prNumber: 42,
        expectedHeadSha: "H",
        expectedBaseSha: "R",
        baseBranch: "main",
        preMutationGuard: vi.fn(),
      }),
    ).rejects.toMatchObject({
      code: "E_HANDOFF",
      context: { reason_code: "provider_current_base_merge_contract_unavailable" },
    });
    expect(mocks.runGlabApiJson).toHaveBeenCalledTimes(2);
    expect(
      mocks.runGlabApiJson.mock.calls.some(
        ([call]) => (call as { method?: string }).method === "PUT",
      ),
    ).toBe(false);
  });

  it("does not trust the similarly named undocumented field on a modern server", async () => {
    mocks.runGlabApiJson
      .mockResolvedValueOnce({ merge_method: "ff", auto_rebase_enabled: false })
      .mockResolvedValueOnce({ version: "18.0.0" });
    await expect(
      runProtectedBaseGitLabMerge({
        gitRoot: "/repo",
        identity,
        prNumber: 42,
        expectedHeadSha: "H",
        expectedBaseSha: "R",
        baseBranch: "main",
        preMutationGuard: vi.fn(),
      }),
    ).rejects.toMatchObject({ code: "E_HANDOFF" });
    expect(mocks.runGlabApiJson).toHaveBeenCalledTimes(2);
    expect(mocks.runGlabApiJson.mock.calls[1]?.[0]).toMatchObject({ endpoint: "version" });
  });

  it.each([new Error("403 version unavailable"), null, {}])(
    "rejects unavailable or malformed version responses before PUT: %s",
    async (response) => {
      mocks.runGlabApiJson.mockResolvedValueOnce({ merge_method: "ff" });
      if (response instanceof Error) mocks.runGlabApiJson.mockRejectedValueOnce(response);
      else mocks.runGlabApiJson.mockResolvedValueOnce(response);
      await expect(
        runProtectedBaseGitLabMerge({
          gitRoot: "/repo",
          identity,
          prNumber: 42,
          expectedHeadSha: "H",
          expectedBaseSha: "R",
          baseBranch: "main",
          preMutationGuard: vi.fn(),
        }),
      ).rejects.toMatchObject({
        code: "E_HANDOFF",
        context: { reason_code: "provider_current_base_merge_contract_unavailable" },
      });
      expect(mocks.runGlabApiJson).toHaveBeenCalledTimes(2);
      expect(mocks.runGlabApiJson.mock.calls[1]?.[0]).toMatchObject({ endpoint: "version" });
    },
  );

  it("checks current server enforcement after the read-only pre-mutation guard", async () => {
    let mergeMethod = "ff";
    mocks.runGlabApiJson.mockImplementation(() =>
      Promise.resolve({ merge_method: mergeMethod, automatic_rebase_enabled: false }),
    );
    const guard = vi.fn(() => {
      mergeMethod = "merge";
      return Promise.resolve();
    });
    await expect(
      runProtectedBaseGitLabMerge({
        gitRoot: "/repo",
        identity,
        prNumber: 42,
        expectedHeadSha: "H",
        expectedBaseSha: "R",
        baseBranch: "main",
        preMutationGuard: guard,
      }),
    ).rejects.toMatchObject({
      code: "E_HANDOFF",
      context: { reason_code: "provider_current_base_merge_contract_unavailable" },
    });
    expect(guard).toHaveBeenCalledOnce();
    expect(mocks.runGlabApiJson).toHaveBeenCalledTimes(1);
    expect((mocks.runGlabApiJson.mock.calls[0]?.[0] as { method?: string }).method).not.toBe("PUT");
  });

  it("preserves the source branch without changing exact-base adoption semantics", async () => {
    let payload: Record<string, unknown> | null = null;
    mocks.runGlabApiJson.mockImplementation(async (call: { inputPath?: string }) => {
      if (!call.inputPath) return { merge_method: "merge" };
      payload = JSON.parse(await readFile(call.inputPath, "utf8")) as Record<string, unknown>;
      return { state: "merged", merge_commit_sha: "merge-sha" };
    });
    const guard = vi.fn(() => Promise.resolve());
    await expect(
      runProtectedBaseGitLabMerge({
        gitRoot: "/repo",
        identity,
        prNumber: 42,
        expectedHeadSha: "H",
        preMutationGuard: guard,
        exactBaseParentProof: true,
      }),
    ).resolves.toMatchObject({ status: "merged" });
    expect(guard).toHaveBeenCalledOnce();
    expect(payload).toEqual({ sha: "H", should_remove_source_branch: false });
  });
});
