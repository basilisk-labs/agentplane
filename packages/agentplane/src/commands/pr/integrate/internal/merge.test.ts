import { beforeEach, describe, expect, it, vi } from "vitest";

import type { CliError } from "../../../../shared/errors.js";

const mocks = vi.hoisted(() => ({
  execFileAsync: vi.fn(),
  gitRevParse: vi.fn(),
  extractTaskSuffix: vi.fn(),
  validateCommitSubject: vi.fn(),
}));

vi.mock("@agentplaneorg/core/process", () => ({
  execFileAsync: mocks.execFileAsync,
}));
vi.mock("@agentplaneorg/core/git", () => ({
  gitEnv: () => ({}),
}));
vi.mock("../../../shared/git-ops.js", () => ({
  gitRevParse: mocks.gitRevParse,
}));
vi.mock("@agentplaneorg/core/commit", () => ({
  extractTaskSuffix: mocks.extractTaskSuffix,
  validateCommitSubject: mocks.validateCommitSubject,
}));

describe("pr/integrate/internal/merge", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

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
      taskTitle: "Improve PR UX",
      taskTags: ["workflow", "cli"],
      workflowDir: ".agentplane/tasks",
      changedPaths: [],
      genericTokens: ["wip"],
    });
    expect(hash).toBe("deadbeefcafebabe");
    const commitCall = mocks.execFileAsync.mock.calls.at(-1);
    expect(commitCall?.[0]).toBe("git");
    expect(commitCall?.[1]).toEqual(["commit", "-m", "🧩 ABC123 integrate: Improve PR UX"]);
    expect(commitCall?.[2]).toMatchObject({
      cwd: "/repo",
      env: {
        AGENTPLANE_TASK_ID: "202602111653-X32XPT",
        AGENTPLANE_ALLOW_BASE: "1",
        AGENTPLANE_ALLOW_TASKS: "1",
        AGENTPLANE_ALLOW_CONFIG: "1",
        AGENTPLANE_DEV_ALLOW_STALE_DIST: "1",
      },
    });
  });

  it("runSquashMerge falls back when the branch tip commit only touches task artifacts", async () => {
    const { runSquashMerge } = await import("./merge.js");
    mocks.execFileAsync
      .mockResolvedValueOnce({}) // merge --squash
      .mockResolvedValueOnce({ stdout: "src/app.ts\n" }) // diff --cached
      .mockResolvedValueOnce({
        stdout: "🧩 X32XPT workflow: refresh task artifacts after commit\n",
      }) // log -1 subject
      .mockResolvedValueOnce({
        stdout:
          ".agentplane/tasks/202602111653-X32XPT/pr/meta.json\n.agentplane/tasks/202602111653-X32XPT/pr/review.md\n",
      }) // show changed paths
      .mockResolvedValueOnce({}); // commit
    mocks.validateCommitSubject.mockReturnValue({ ok: true, errors: [] });
    mocks.extractTaskSuffix.mockReturnValue("X32XPT");
    mocks.gitRevParse.mockResolvedValue("deadbeefcafebabe");

    const hash = await runSquashMerge({
      gitRoot: "/repo",
      base: "main",
      branch: "task/T-1",
      headBeforeMerge: "before",
      taskId: "202602111653-X32XPT",
      taskTitle: "Improve PR UX",
      taskTags: ["workflow", "cli"],
      workflowDir: ".agentplane/tasks",
      changedPaths: [],
      genericTokens: ["wip"],
    });
    expect(hash).toBe("deadbeefcafebabe");
    const commitCall = mocks.execFileAsync.mock.calls.at(-1);
    expect(commitCall?.[0]).toBe("git");
    expect(commitCall?.[1]).toEqual(["commit", "-m", "🧩 X32XPT integrate: Improve PR UX"]);
    expect(commitCall?.[2]).toMatchObject({
      cwd: "/repo",
      env: {
        AGENTPLANE_TASK_ID: "202602111653-X32XPT",
        AGENTPLANE_ALLOW_BASE: "1",
        AGENTPLANE_ALLOW_TASKS: "1",
        AGENTPLANE_ALLOW_CONFIG: "1",
        AGENTPLANE_DEV_ALLOW_STALE_DIST: "1",
      },
    });
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
        taskTitle: "Improve PR UX",
        taskTags: ["workflow", "cli"],
        workflowDir: ".agentplane/tasks",
        changedPaths: [],
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
        taskTitle: "Improve PR UX",
        taskTags: ["workflow", "cli"],
        workflowDir: ".agentplane/tasks",
        changedPaths: [],
      }),
    ).rejects.toMatchObject<CliError>({ code: "E_GIT" });
    expect(mocks.execFileAsync).toHaveBeenCalledWith(
      "git",
      ["merge", "--abort"],
      expect.objectContaining({ cwd: "/repo" }),
    );
  });

  it("runMergeCommit allows tracked task state updates on the base commit path", async () => {
    const { runMergeCommit } = await import("./merge.js");
    mocks.extractTaskSuffix.mockReturnValue("ABC123");
    mocks.execFileAsync.mockResolvedValueOnce({}).mockResolvedValueOnce({});
    mocks.gitRevParse.mockResolvedValue("deadbeefcafebabe");

    const hash = await runMergeCommit({
      gitRoot: "/repo",
      branch: "task/T-3",
      taskId: "202602111653-X32XPT",
      taskTitle: "Improve PR UX",
      taskTags: ["workflow", "cli"],
      workflowDir: ".agentplane/tasks",
      changedPaths: [],
    });

    expect(hash).toBe("deadbeefcafebabe");
    const mergeCall = mocks.execFileAsync.mock.calls[0];
    expect(mergeCall?.[0]).toBe("git");
    expect(mergeCall?.[1]).toEqual([
      "merge",
      "--no-ff",
      "--signoff",
      "task/T-3",
      "-m",
      "🔀 ABC123 integrate: Improve PR UX",
    ]);
    expect(mergeCall?.[2]).toMatchObject({
      cwd: "/repo",
      env: {
        AGENTPLANE_TASK_ID: "202602111653-X32XPT",
        AGENTPLANE_ALLOW_BASE: "1",
        AGENTPLANE_ALLOW_TASKS: "1",
        AGENTPLANE_ALLOW_CONFIG: "1",
        AGENTPLANE_DEV_ALLOW_STALE_DIST: "1",
      },
    });
  });
});
