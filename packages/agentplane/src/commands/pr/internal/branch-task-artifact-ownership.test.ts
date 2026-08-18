import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  gitDiffNameStatus: vi.fn(),
  gitMergeBase: vi.fn(),
  gitBranchExists: vi.fn(),
  gitBranchUpstream: vi.fn(),
  gitRevParse: vi.fn(),
}));

vi.mock("@agentplaneorg/core/git", () => ({
  gitDiffNameStatus: mocks.gitDiffNameStatus,
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
    mocks.gitDiffNameStatus.mockResolvedValue([
      { statusCode: "M", path: "packages/agentplane/src/index.ts" },
      { statusCode: "M", path: ".agentplane/tasks/T-PRIMARY/README.md" },
      { statusCode: "M", path: ".agentplane/tasks/T-FOREIGN/pr/meta.json" },
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
    expect(mocks.gitDiffNameStatus).toHaveBeenCalledWith(
      "/repo",
      "merge-base-sha",
      "task/T-PRIMARY/change",
    );
    expect(mocks.gitRevParse).toHaveBeenCalledWith("/repo", ["--verify", "origin/main^{commit}"]);
    expect(mocks.gitBranchExists).toHaveBeenCalledTimes(1);
    expect(mocks.gitBranchExists).toHaveBeenCalledWith("/repo", "task/T-PRIMARY/change");
  });

  it("ignores task artifacts introduced only by an advanced base", async () => {
    mocks.gitDiffNameStatus.mockResolvedValue([
      { statusCode: "M", path: "packages/agentplane/src/index.ts" },
      { statusCode: "M", path: ".agentplane/tasks/T-PRIMARY/README.md" },
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
    expect(mocks.gitDiffNameStatus).toHaveBeenCalledWith(
      "/repo",
      "merge-base-sha",
      "task/T-PRIMARY/change",
    );
  });

  it("accepts artifacts explicitly owned by a batch", async () => {
    mocks.gitDiffNameStatus.mockResolvedValue([
      { statusCode: "M", path: ".agentplane/tasks/T-PRIMARY/README.md" },
      { statusCode: "M", path: ".agentplane/tasks/T-INCLUDED/README.md" },
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

  it("allows deletion-only cleanup of foreign volatile task artifacts", async () => {
    mocks.gitDiffNameStatus.mockResolvedValue([
      {
        statusCode: "D",
        path: ".agentplane/tasks/T-FOREIGN/evidence/samples/sample.stdout.log",
      },
      {
        statusCode: "D",
        path: ".agentplane/tasks/T-FOREIGN/runs/run-1/result.json",
      },
    ]);

    await expect(
      assertBranchTaskArtifactOwnership({
        gitRoot: "/repo",
        baseBranch: "main",
        branch: "task/T-PRIMARY/release-hygiene",
        workflowDir: ".agentplane/tasks",
        tasksPath: ".agentplane/tasks",
        primaryTaskId: "T-PRIMARY",
      }),
    ).resolves.toBeUndefined();
  });

  it("rejects edits and durable-evidence deletions for foreign tasks", async () => {
    mocks.gitDiffNameStatus.mockResolvedValue([
      {
        statusCode: "M",
        path: ".agentplane/tasks/T-FOREIGN/evidence/samples/sample.stdout.log",
      },
      {
        statusCode: "D",
        path: ".agentplane/tasks/T-OTHER/evidence/report.json",
      },
      {
        statusCode: "D",
        path: ".agentplane/tasks/T-THIRD/pr/notes.jsonl",
      },
    ]);

    await expect(
      assertBranchTaskArtifactOwnership({
        gitRoot: "/repo",
        baseBranch: "main",
        branch: "task/T-PRIMARY/unsafe-cleanup",
        workflowDir: ".agentplane/tasks",
        tasksPath: ".agentplane/tasks",
        primaryTaskId: "T-PRIMARY",
      }),
    ).rejects.toMatchObject({
      context: {
        reason_code: "foreign_committed_task_artifacts",
        foreign_task_ids: ["T-FOREIGN", "T-OTHER", "T-THIRD"],
      },
    });
  });
});
