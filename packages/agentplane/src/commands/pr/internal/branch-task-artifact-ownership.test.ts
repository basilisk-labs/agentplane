import type * as Process from "@agentplaneorg/core/process";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  gitDiffNameStatus: vi.fn(),
  gitMergeBase: vi.fn(),
  gitBranchExists: vi.fn(),
  gitBranchUpstream: vi.fn(),
  gitRevParse: vi.fn(),
  inherited: vi.fn(),
  history: vi.fn(),
}));

vi.mock("../provider-update-verification-proof.js", () => ({
  inheritedProviderUpdatePaths: mocks.inherited,
}));

vi.mock("@agentplaneorg/core/process", async (original) => ({
  ...(await original<typeof Process>()),
  execFileAsync: mocks.history,
}));
vi.mock("@agentplaneorg/core/git", () => ({
  gitProofEnv: () => ({}),
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
    mocks.history.mockResolvedValue({ stdout: "" });
    mocks.inherited.mockResolvedValue([]);
    mocks.gitBranchExists.mockResolvedValue(true);
    mocks.gitBranchUpstream.mockResolvedValue("origin/main");
    mocks.gitRevParse.mockImplementation((_root: string, args: string[]) =>
      Promise.resolve(args[1]?.startsWith("task/") ? "candidate-sha" : "base-sha"),
    );
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

  it("filters only paths authenticated by the native canonical import proof", async () => {
    const file = ".agentplane/tasks/T-FOREIGN/README.md";
    mocks.gitDiffNameStatus.mockResolvedValue([{ statusCode: "M", path: file }]);
    mocks.inherited.mockResolvedValue([file]);
    const command = { resolvedProject: { gitRoot: "/repo" } } as never;
    const options = {
      gitRoot: "/repo",
      baseBranch: "frozen-B",
      branch: "task/T-PRIMARY/change",
      workflowDir: ".agentplane/tasks",
      tasksPath: ".agentplane/tasks.json",
      primaryTaskId: "T-PRIMARY",
      providerUpdate: { command, frozenBase: "frozen-B" },
    };
    await expect(assertBranchTaskArtifactOwnership(options)).resolves.toBeUndefined();
    expect(mocks.inherited).toHaveBeenCalledWith(
      expect.objectContaining({
        command,
        frozen_base: "frozen-B",
        task_id: "T-PRIMARY",
        changed_paths: [file],
      }),
    );
    mocks.inherited.mockResolvedValue([]);
    await expect(assertBranchTaskArtifactOwnership(options)).rejects.toThrow(/other tasks/);
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

  it("does not resolve native import proof for source and own-only history", async () => {
    mocks.gitDiffNameStatus.mockResolvedValue([
      { statusCode: "M", path: "source.ts" },
      { statusCode: "M", path: ".agentplane/tasks/T-PRIMARY/README.md" },
    ]);
    mocks.history.mockResolvedValue({
      stdout: "source.ts\0.agentplane/tasks/T-PRIMARY/README.md\0",
    });
    mocks.inherited.mockRejectedValue(new Error("native journal must not be needed"));
    await expect(
      assertBranchTaskArtifactOwnership({
        gitRoot: "/repo",
        baseBranch: "frozen-B",
        branch: "task/T-PRIMARY/change",
        workflowDir: ".agentplane/tasks",
        tasksPath: ".agentplane/tasks.json",
        primaryTaskId: "T-PRIMARY",
        providerUpdate: {
          command: { resolvedProject: { gitRoot: "/repo" } } as never,
          frozenBase: "frozen-B",
        },
      }),
    ).resolves.toBeUndefined();
    expect(mocks.inherited).not.toHaveBeenCalled();
    expect(mocks.history).toHaveBeenCalled();
  });

  it("still authenticates foreign history hidden by an empty net diff", async () => {
    const file = ".agentplane/tasks/T-FOREIGN/README.md";
    mocks.gitDiffNameStatus.mockResolvedValue([]);
    mocks.history.mockResolvedValue({ stdout: `${file}\0` });
    mocks.inherited.mockRejectedValue(new Error("invalid native proof"));
    await expect(
      assertBranchTaskArtifactOwnership({
        gitRoot: "/repo",
        baseBranch: "frozen-B",
        branch: "task/T-PRIMARY/change",
        workflowDir: ".agentplane/tasks",
        tasksPath: ".agentplane/tasks.json",
        primaryTaskId: "T-PRIMARY",
        providerUpdate: {
          command: { resolvedProject: { gitRoot: "/repo" } } as never,
          frozenBase: "frozen-B",
        },
      }),
    ).rejects.toThrow("invalid native proof");
    expect(mocks.inherited).toHaveBeenCalledWith(
      expect.objectContaining({ changed_paths: [file], evaluated_sha: "candidate-sha" }),
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

  it("rejects deletion-only cleanup of foreign volatile task artifacts without exact authority", async () => {
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
    ).rejects.toMatchObject({
      context: {
        reason_code: "foreign_committed_task_artifacts",
        foreign_task_ids: ["T-FOREIGN"],
      },
    });
  });

  it("allows deletion-only cleanup under an exact foreign task authority root", async () => {
    mocks.gitDiffNameStatus.mockResolvedValue([
      {
        statusCode: "D",
        path: ".agentplane/tasks/T-FOREIGN/evidence/samples/sample.stdout.log",
      },
      {
        statusCode: "D",
        path: ".agentplane/tasks/T-FOREIGN/evidence/samples/sample.events.jsonl",
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
        authorizedForeignArtifactCleanupRoots: [".agentplane/tasks/T-FOREIGN/evidence"],
      }),
    ).resolves.toBeUndefined();
  });

  it("does not widen an exact cleanup root to sibling paths or task-id prefixes", async () => {
    mocks.gitDiffNameStatus.mockResolvedValue([
      {
        statusCode: "D",
        path: ".agentplane/tasks/T-FOREIGN-OTHER/evidence/sample.stdout.log",
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
        branch: "task/T-PRIMARY/unsafe-cleanup",
        workflowDir: ".agentplane/tasks",
        tasksPath: ".agentplane/tasks",
        primaryTaskId: "T-PRIMARY",
        authorizedForeignArtifactCleanupRoots: [".agentplane/tasks/T-FOREIGN/evidence"],
      }),
    ).rejects.toMatchObject({
      context: {
        reason_code: "foreign_committed_task_artifacts",
        foreign_task_ids: ["T-FOREIGN", "T-FOREIGN-OTHER"],
      },
    });
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
