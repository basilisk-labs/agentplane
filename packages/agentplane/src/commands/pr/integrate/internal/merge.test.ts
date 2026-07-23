import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { CliError } from "../../../../shared/errors.js";

const mocks = vi.hoisted(() => ({
  execFileAsync: vi.fn(),
  gitRevParse: vi.fn(),
  extractTaskSuffix: vi.fn(),
  validateCommitSubject: vi.fn(),
  requireCleanTaskWorktree: vi.fn(),
}));

vi.mock("@agentplaneorg/core/process", () => ({
  execFileAsync: mocks.execFileAsync,
}));
vi.mock("@agentplaneorg/core/git", () => ({
  gitEnv: () => ({}),
  gitRevParse: (cwd: string, args: string[]) =>
    args.includes("--git-common-dir") || args.includes("--git-dir") ? ".git" : `${cwd}/.git`,
}));
vi.mock("../../../shared/git-ops.js", () => ({
  gitRevParse: mocks.gitRevParse,
}));
vi.mock("@agentplaneorg/core/commit", () => ({
  extractTaskSuffix: mocks.extractTaskSuffix,
  validateCommitSubject: mocks.validateCommitSubject,
}));
vi.mock("../../../shared/task-worktree-cleanliness.js", () => ({
  requireCleanTaskWorktree: mocks.requireCleanTaskWorktree,
}));

async function withTempGitRoot<T>(run: (gitRoot: string) => Promise<T>): Promise<T> {
  const gitRoot = await mkdtemp(path.join(tmpdir(), "agentplane-merge-test-"));
  try {
    return await run(gitRoot);
  } finally {
    await rm(gitRoot, { recursive: true, force: true }).catch(() => null);
  }
}

function expectGitCommandOptions(value: unknown): void {
  const options = value as { cwd?: unknown; env?: Record<string, string> };
  expect(options.cwd).toEqual(expect.stringMatching(/agentplane-merge-test-/));
  expect(options.env).toMatchObject({
    AGENTPLANE_TASK_ID: "202602111653-X32XPT",
    AGENTPLANE_ALLOW_BASE: "1",
    AGENTPLANE_ALLOW_TASKS: "1",
    AGENTPLANE_ALLOW_CONFIG: "1",
    AGENTPLANE_DEV_ALLOW_STALE_DIST: "1",
  });
}

describe("pr/integrate/internal/merge", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.gitRevParse.mockResolvedValue("deadbeefcafebabe");
    mocks.requireCleanTaskWorktree.mockResolvedValue({
      state: "clean",
      branch: "task/T-1",
      worktreePath: "/repo/.agentplane/worktrees/T-1",
      changedPaths: [],
    });
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

    const hash = await withTempGitRoot((gitRoot) =>
      runSquashMerge({
        gitRoot,
        base: "main",
        branch: "task/T-1",
        sourceSha: "deadbeefcafebabe",
        expectedBaseSha: "deadbeefcafebabe",
        headBeforeMerge: "before",
        taskId: "202602111653-X32XPT",
        taskTitle: "Improve PR UX",
        taskTags: ["workflow", "cli"],
        workflowDir: ".agentplane/tasks",
        changedPaths: [],
        genericTokens: ["wip"],
      }),
    );
    expect(hash).toBe("deadbeefcafebabe");
    const commitCall = mocks.execFileAsync.mock.calls.at(-1);
    expect(commitCall?.[0]).toBe("git");
    expect(commitCall?.[1]).toEqual(["commit", "-m", "🧩 ABC123 integrate: Improve PR UX"]);
    expectGitCommandOptions(commitCall?.[2]);
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

    const hash = await withTempGitRoot((gitRoot) =>
      runSquashMerge({
        gitRoot,
        base: "main",
        branch: "task/T-1",
        sourceSha: "deadbeefcafebabe",
        expectedBaseSha: "deadbeefcafebabe",
        headBeforeMerge: "before",
        taskId: "202602111653-X32XPT",
        taskTitle: "Improve PR UX",
        taskTags: ["workflow", "cli"],
        workflowDir: ".agentplane/tasks",
        changedPaths: [],
        genericTokens: ["wip"],
      }),
    );
    expect(hash).toBe("deadbeefcafebabe");
    const commitCall = mocks.execFileAsync.mock.calls.at(-1);
    expect(commitCall?.[0]).toBe("git");
    expect(commitCall?.[1]).toEqual(["commit", "-m", "🧩 X32XPT integrate: Improve PR UX"]);
    expectGitCommandOptions(commitCall?.[2]);
  });

  it("runSquashMerge resets and fails when there is nothing staged after squash", async () => {
    const { runSquashMerge } = await import("./merge.js");
    mocks.execFileAsync
      .mockResolvedValueOnce({}) // merge --squash
      .mockResolvedValueOnce({ stdout: "  \n" }) // diff --cached empty
      .mockResolvedValueOnce({}); // reset --hard

    await withTempGitRoot(async (gitRoot) => {
      await expect(
        runSquashMerge({
          gitRoot,
          base: "main",
          branch: "task/T-2",
          sourceSha: "deadbeefcafebabe",
          expectedBaseSha: "deadbeefcafebabe",
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
        expect.objectContaining({ cwd: gitRoot }),
      );
    });
  });

  it("runMergeCommit aborts merge and raises E_GIT on failure", async () => {
    const { runMergeCommit } = await import("./merge.js");
    mocks.extractTaskSuffix.mockReturnValue("ABC123");
    mocks.execFileAsync.mockRejectedValueOnce(new Error("merge failed")).mockResolvedValueOnce({});

    await withTempGitRoot(async (gitRoot) => {
      await expect(
        runMergeCommit({
          gitRoot,
          base: "main",
          branch: "task/T-3",
          sourceSha: "deadbeefcafebabe",
          expectedBaseSha: "deadbeefcafebabe",
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
        expect.objectContaining({ cwd: gitRoot }),
      );
    });
  });

  it("runMergeCommit allows tracked task state updates on the base commit path", async () => {
    const { runMergeCommit } = await import("./merge.js");
    mocks.extractTaskSuffix.mockReturnValue("ABC123");
    mocks.execFileAsync.mockResolvedValueOnce({}).mockResolvedValueOnce({});
    mocks.gitRevParse.mockResolvedValue("deadbeefcafebabe");

    const hash = await withTempGitRoot((gitRoot) =>
      runMergeCommit({
        gitRoot,
        base: "main",
        branch: "task/T-3",
        sourceSha: "deadbeefcafebabe",
        expectedBaseSha: "deadbeefcafebabe",
        taskId: "202602111653-X32XPT",
        taskTitle: "Improve PR UX",
        taskTags: ["workflow", "cli"],
        workflowDir: ".agentplane/tasks",
        changedPaths: [],
      }),
    );

    expect(hash).toBe("deadbeefcafebabe");
    const mergeCall = mocks.execFileAsync.mock.calls[0];
    expect(mergeCall?.[0]).toBe("git");
    expect(mergeCall?.[1]).toEqual([
      "merge",
      "--no-ff",
      "--signoff",
      "deadbeefcafebabe",
      "-m",
      "🔀 ABC123 integrate: Improve PR UX",
    ]);
    expectGitCommandOptions(mergeCall?.[2]);
  });

  it("runMergeCommit refuses to merge when the pinned base advances", async () => {
    const { runMergeCommit } = await import("./merge.js");
    mocks.extractTaskSuffix.mockReturnValue("ABC123");
    mocks.gitRevParse.mockResolvedValueOnce("base-after");

    await withTempGitRoot(async (gitRoot) => {
      await expect(
        runMergeCommit({
          gitRoot,
          base: "main",
          branch: "task/T-3",
          sourceSha: "head-1",
          expectedBaseSha: "base-before",
          taskId: "202602111653-X32XPT",
          taskTitle: "Improve PR UX",
          taskTags: ["workflow", "cli"],
          workflowDir: ".agentplane/tasks",
          changedPaths: [],
        }),
      ).rejects.toMatchObject<CliError>({
        code: "E_GIT_RACE",
        context: {
          reason_code: "integration_queue_base_changed",
          expected_base_sha: "base-before",
          current_base_sha: "base-after",
        },
      });
    });

    expect(mocks.execFileAsync).not.toHaveBeenCalledWith(
      "git",
      expect.arrayContaining(["--no-ff"]),
      expect.anything(),
    );
  });

  it("runRebaseFastForward rechecks the task worktree before fast-forwarding base", async () => {
    const { runRebaseFastForward } = await import("./merge.js");
    mocks.execFileAsync.mockResolvedValue({});
    mocks.requireCleanTaskWorktree.mockRejectedValueOnce(
      new CliError({
        code: "E_VALIDATION",
        message: "Task worktree contains uncommitted changes",
        context: { reason_code: "task_worktree_dirty" },
      }),
    );

    await withTempGitRoot(async (gitRoot) => {
      await expect(
        runRebaseFastForward({
          gitRoot,
          worktreePath: path.join(gitRoot, ".agentplane", "worktrees", "T-1"),
          base: "main",
          branch: "task/T-1",
          expectedBranchHeadSha: "deadbeefcafebabe",
          expectedBaseSha: "deadbeefcafebabe",
          headBeforeMerge: "deadbeefcafebabe",
          rawVerify: [],
          metaSource: null,
          verifyLogText: "",
          runVerify: false,
          verifyCommands: [],
          alreadyVerifiedSha: null,
          shouldRunVerify: false,
          quiet: true,
          taskId: "202602111653-X32XPT",
          workflowDir: ".agentplane/tasks",
          changedPaths: [],
        }),
      ).rejects.toMatchObject<CliError>({
        code: "E_VALIDATION",
        context: { reason_code: "task_worktree_dirty" },
      });
    });
    expect(mocks.execFileAsync).not.toHaveBeenCalledWith(
      "git",
      expect.arrayContaining(["merge", "--ff-only"]),
      expect.anything(),
    );
  });
});
