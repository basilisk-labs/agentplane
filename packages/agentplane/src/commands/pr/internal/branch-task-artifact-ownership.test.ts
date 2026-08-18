import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  gitDiffNames: vi.fn(),
  gitMergeBase: vi.fn(),
  gitBranchExists: vi.fn(),
  gitBranchUpstream: vi.fn(),
  gitRevParse: vi.fn(),
}));

vi.mock("@agentplaneorg/core/git", () => ({
  gitDiffNames: mocks.gitDiffNames,
  gitMergeBase: mocks.gitMergeBase,
}));
vi.mock("../../shared/git-ops.js", () => ({
  gitBranchExists: mocks.gitBranchExists,
  gitBranchUpstream: mocks.gitBranchUpstream,
  gitRevParse: mocks.gitRevParse,
}));

import { assertBranchTaskArtifactOwnership } from "./branch-task-artifact-ownership.js";

describe("committed task artifact ownership", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.gitBranchExists.mockResolvedValue(true);
    mocks.gitBranchUpstream.mockResolvedValue("origin/main");
    mocks.gitRevParse.mockResolvedValue("base-sha");
    mocks.gitMergeBase.mockResolvedValue("merge-base-sha");
  });

  it("compares against upstream and rejects foreign task history", async () => {
    mocks.gitDiffNames.mockResolvedValue([
      "packages/agentplane/src/index.ts",
      ".agentplane/tasks/T-PRIMARY/README.md",
      ".agentplane/tasks/T-FOREIGN/pr/meta.json",
    ]);

    await expect(
      assertBranchTaskArtifactOwnership({
        gitRoot: "/repo",
        baseBranch: "main",
        branch: "task/T-PRIMARY/change",
        workflowDir: ".agentplane/tasks",
        tasksPath: ".agentplane/tasks",
        primaryTaskId: "T-PRIMARY",
      }),
    ).rejects.toMatchObject({
      code: "E_VALIDATION",
      context: {
        reason_code: "foreign_committed_task_artifacts",
        comparison_base: "origin/main",
        comparison_merge_base: "merge-base-sha",
        foreign_task_ids: ["T-FOREIGN"],
      },
    });
    expect(mocks.gitDiffNames).toHaveBeenCalledWith(
      "/repo",
      "merge-base-sha",
      "task/T-PRIMARY/change",
    );
    expect(mocks.gitRevParse).toHaveBeenCalledWith("/repo", ["--verify", "origin/main^{commit}"]);
    expect(mocks.gitBranchExists).toHaveBeenCalledTimes(1);
    expect(mocks.gitBranchExists).toHaveBeenCalledWith("/repo", "task/T-PRIMARY/change");
  });

  it("ignores task artifacts introduced only by an advanced base", async () => {
    mocks.gitDiffNames.mockResolvedValue([
      "packages/agentplane/src/index.ts",
      ".agentplane/tasks/T-PRIMARY/README.md",
    ]);

    await expect(
      assertBranchTaskArtifactOwnership({
        gitRoot: "/repo",
        baseBranch: "main",
        branch: "task/T-PRIMARY/change",
        workflowDir: ".agentplane/tasks",
        tasksPath: ".agentplane/tasks",
        primaryTaskId: "T-PRIMARY",
      }),
    ).resolves.toBeUndefined();

    expect(mocks.gitMergeBase).toHaveBeenCalledWith(
      "/repo",
      "origin/main",
      "task/T-PRIMARY/change",
    );
    expect(mocks.gitDiffNames).toHaveBeenCalledWith(
      "/repo",
      "merge-base-sha",
      "task/T-PRIMARY/change",
    );
  });

  it("accepts artifacts explicitly owned by a batch", async () => {
    mocks.gitDiffNames.mockResolvedValue([
      ".agentplane/tasks/T-PRIMARY/README.md",
      ".agentplane/tasks/T-INCLUDED/README.md",
    ]);

    await expect(
      assertBranchTaskArtifactOwnership({
        gitRoot: "/repo",
        baseBranch: "main",
        branch: "task/T-PRIMARY/change",
        workflowDir: ".agentplane/tasks",
        tasksPath: ".agentplane/tasks",
        primaryTaskId: "T-PRIMARY",
        includedTaskIds: ["T-INCLUDED"],
      }),
    ).resolves.toBeUndefined();
  });
});
