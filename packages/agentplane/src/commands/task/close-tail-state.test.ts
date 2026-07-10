import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  execFileAsync: vi.fn(),
}));

vi.mock("@agentplaneorg/core/process", () => ({
  execFileAsync: mocks.execFileAsync,
}));
vi.mock("@agentplaneorg/core/git", () => ({
  gitEnv: () => ({}),
}));

describe("taskCloseAlreadyRecordedOnBase", () => {
  beforeEach(() => {
    mocks.execFileAsync.mockReset();
  });

  it("detects a historical close commit for the task readme on base", async () => {
    mocks.execFileAsync.mockResolvedValue({
      stdout: ["chore: unrelated", "✅ G7YHZY close: done (202604191200-G7YHZY)", ""].join("\n"),
      stderr: "",
    });

    const { taskCloseAlreadyRecordedOnBase } = await import("./close-tail-state.js");
    await expect(
      taskCloseAlreadyRecordedOnBase({
        gitRoot: "/repo",
        workflowDir: ".agentplane/tasks",
        taskId: "202604191200-G7YHZY",
        baseBranch: "main",
      }),
    ).resolves.toBe(true);
  });

  it("returns false when base history has no close commit for the task readme", async () => {
    mocks.execFileAsync.mockResolvedValue({
      stdout: ["seed", "feat: task implementation", ""].join("\n"),
      stderr: "",
    });

    const { taskCloseAlreadyRecordedOnBase } = await import("./close-tail-state.js");
    await expect(
      taskCloseAlreadyRecordedOnBase({
        gitRoot: "/repo",
        workflowDir: ".agentplane/tasks",
        taskId: "202604191200-G7YHZY",
        baseBranch: "main",
      }),
    ).resolves.toBe(false);
  });
});

describe("taskPreMergeClosureRecordedOnBase", () => {
  const branch = "task/T-1/work";

  beforeEach(() => {
    mocks.execFileAsync.mockReset();
  });

  function mockBaseArtifacts(
    opts: {
      taskId?: string;
      status?: string;
      commitHash?: string;
      branch?: string;
      prNumber?: number;
    } = {},
  ): void {
    const resolvedBranch = opts.branch ?? branch;
    const prNumber = opts.prNumber ?? 101;
    mocks.execFileAsync
      .mockResolvedValueOnce({
        stdout: [
          "---",
          `id: "${opts.taskId ?? "T-1"}"`,
          `status: "${opts.status ?? "DONE"}"`,
          `commit: { hash: "${opts.commitHash ?? "closed"}", message: "closed" }`,
          "---",
          "# Task",
          "",
        ].join("\n"),
        stderr: "",
      })
      .mockResolvedValueOnce({
        stdout: `${JSON.stringify({
          schema_version: 1,
          task_id: "T-1",
          branch: resolvedBranch,
          pr_number: prNumber,
          created_at: "2026-07-10T00:00:00.000Z",
          updated_at: "2026-07-10T00:00:00.000Z",
          pre_merge_closure: {
            state: "closed_before_merge",
            branch: resolvedBranch,
            basis_commit: "pre-rebase-basis",
            pr_number: prNumber,
          },
        })}\n`,
        stderr: "",
      });
  }

  async function recorded(
    overrides: Partial<{
      branch: string;
      prNumber: number;
    }> = {},
  ): Promise<boolean> {
    const { taskPreMergeClosureRecordedOnBase } = await import("./close-tail-state.js");
    return taskPreMergeClosureRecordedOnBase({
      gitRoot: "/repo",
      workflowDir: ".agentplane/tasks",
      taskId: "T-1",
      baseBranch: "main",
      branch: overrides.branch ?? branch,
      prNumber: overrides.prNumber ?? 101,
    });
  }

  it("accepts matching DONE task and pre-merge metadata already recorded on base", async () => {
    mockBaseArtifacts();
    await expect(recorded()).resolves.toBe(true);
    expect(mocks.execFileAsync).toHaveBeenCalledWith(
      "git",
      ["show", "main:.agentplane/tasks/T-1/README.md"],
      expect.any(Object),
    );
  });

  it("rejects incomplete or mismatched base evidence", async () => {
    mockBaseArtifacts({ status: "DOING" });
    await expect(recorded()).resolves.toBe(false);

    mockBaseArtifacts({ taskId: "T-2" });
    await expect(recorded()).resolves.toBe(false);

    mockBaseArtifacts({ branch: "task/T-1/other" });
    await expect(recorded()).resolves.toBe(false);

    mockBaseArtifacts({ prNumber: 999 });
    await expect(recorded()).resolves.toBe(false);
  });
});
