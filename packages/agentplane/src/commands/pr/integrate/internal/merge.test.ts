import { describe, expect, it, vi } from "vitest";

import type { CliError } from "../../../../../shared/errors.js";

const mocks = vi.hoisted(() => ({
  execFileAsync: vi.fn(),
  gitRevParse: vi.fn(),
  extractTaskSuffix: vi.fn(),
  validateCommitSubject: vi.fn(),
}));

vi.mock("../../../shared/git.js", () => ({
  execFileAsync: mocks.execFileAsync,
  gitEnv: () => ({}),
}));
vi.mock("../../../shared/git-ops.js", () => ({
  gitRevParse: mocks.gitRevParse,
}));
vi.mock("@agentplaneorg/core", () => ({
  extractTaskSuffix: mocks.extractTaskSuffix,
  validateCommitSubject: mocks.validateCommitSubject,
}));

describe("pr/integrate/internal/merge", () => {
  it("runSquashMerge falls back to deterministic subject when branch head subject is invalid", async () => {
    const { runSquashMerge } = await import("./merge.js");
    mocks.execFileAsync
      .mockResolvedValueOnce({}) // merge --squash
      .mockResolvedValueOnce({ stdout: "src/app.ts\n" }) // diff --cached
      .mockResolvedValueOnce({ stdout: "wip commit\n" }) // log -1 subject
      .mockResolvedValueOnce({}); // commit
    mocks.validateCommitSubject.mockReturnValue({ ok: false, errors: ["bad"] });
    mocks.extractTaskSuffix.mockReturnValue("ABC123");
    mocks.gitRevParse.mockResolvedValue("deadbeefcafebabe");

    const hash = await runSquashMerge({
      gitRoot: "/repo",
      base: "main",
      branch: "task/T-1",
      headBeforeMerge: "before",
      taskId: "202602111653-X32XPT",
      genericTokens: ["wip"],
    });
    expect(hash).toBe("deadbeefcafebabe");
    expect(mocks.execFileAsync).toHaveBeenCalledWith(
      "git",
      ["commit", "-m", "🧩 ABC123 integrate: squash task/T-1"],
      expect.objectContaining({ cwd: "/repo" }),
    );
  });

  it("runSquashMerge resets and fails when there is nothing staged after squash", async () => {
    const { runSquashMerge } = await import("./merge.js");
    mocks.execFileAsync
      .mockResolvedValueOnce({}) // merge --squash
      .mockResolvedValueOnce({ stdout: "  \n" }) // diff --cached empty
      .mockResolvedValueOnce({}); // reset --hard

    await expect(
      runSquashMerge({
        gitRoot: "/repo",
        base: "main",
        branch: "task/T-2",
        headBeforeMerge: "before",
        taskId: "202602111653-X32XPT",
        genericTokens: ["wip"],
      }),
    ).rejects.toMatchObject<CliError>({ code: "E_USAGE" });
    expect(mocks.execFileAsync).toHaveBeenCalledWith(
      "git",
      ["reset", "--hard", "before"],
      expect.objectContaining({ cwd: "/repo" }),
    );
  });

  it("runMergeCommit aborts merge and raises E_GIT on failure", async () => {
    const { runMergeCommit } = await import("./merge.js");
    mocks.extractTaskSuffix.mockReturnValue("ABC123");
    mocks.execFileAsync.mockRejectedValueOnce(new Error("merge failed")).mockResolvedValueOnce({});

    await expect(
      runMergeCommit({
        gitRoot: "/repo",
        branch: "task/T-3",
        taskId: "202602111653-X32XPT",
      }),
    ).rejects.toMatchObject<CliError>({ code: "E_GIT" });
    expect(mocks.execFileAsync).toHaveBeenCalledWith(
      "git",
      ["merge", "--abort"],
      expect.objectContaining({ cwd: "/repo" }),
    );
  });
});
