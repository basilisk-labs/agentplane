import type { ResolvedProject } from "@agentplaneorg/core/project";
import { defaultConfig } from "@agentplaneorg/core/config";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, it, vi } from "vitest";

import type { GitContext } from "@agentplaneorg/core/git";
import type { CommandContext } from "../shared/task-backend.js";
import type { FinishExecutionPlan, FinishOptions } from "./finish-types.js";

const mocks = vi.hoisted(() => ({
  createTaskCloseCommit: vi.fn(),
  gitCurrentBranch: vi.fn(),
  materializeBranchPrCloseTail: vi.fn(),
}));

vi.mock("./finish-shared.js", () => ({
  createTaskCloseCommit: mocks.createTaskCloseCommit,
}));
vi.mock("./finish-close.js", () => ({
  materializeBranchPrCloseTail: mocks.materializeBranchPrCloseTail,
}));
vi.mock("../shared/git-ops.js", () => ({
  gitCurrentBranch: mocks.gitCurrentBranch,
}));

function mkCtx(root: string): CommandContext {
  return {
    config: {
      ...defaultConfig(),
      workflow_mode: "branch_pr",
    },
    resolvedProject: {
      gitRoot: root,
      agentplaneDir: path.join(root, ".agentplane"),
    } as unknown as ResolvedProject,
    git: {
      headCommit: vi.fn().mockResolvedValue("implementation-head"),
      invalidateStatus: vi.fn(),
    } as unknown as GitContext,
  } as CommandContext;
}

function mkOptions(cwd: string): FinishOptions {
  return {
    cwd,
    taskIds: ["T-1"],
    author: "CODER",
    body: "Verified: pre-merge closure packet is ready for the task PR.",
    result: "pre-merge closure",
    commit: "implementation-head",
    breaking: false,
    force: false,
    commitFromComment: false,
    commitAllow: [],
    commitAutoAllow: false,
    commitAllowTasks: false,
    commitRequireClean: false,
    statusCommit: false,
    statusCommitAllow: [],
    statusCommitAutoAllow: false,
    statusCommitRequireClean: false,
    confirmStatusCommit: false,
    preMergeClosure: true,
    quiet: true,
  };
}

describe("finish pre-merge closure", () => {
  it("records closure on the task branch without materializing a task-close branch", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-pre-merge-close-"));
    try {
      const taskDir = path.join(root, ".agentplane", "tasks", "T-1");
      const prDir = path.join(taskDir, "pr");
      await mkdir(prDir, { recursive: true });
      await writeFile(
        path.join(prDir, "meta.json"),
        `${JSON.stringify(
          {
            schema_version: 1,
            task_id: "T-1",
            branch: "task/T-1/pre-merge",
            created_at: "2026-02-09T00:00:00.000Z",
            updated_at: "2026-02-09T00:00:00.000Z",
            status: "OPEN",
          },
          null,
          2,
        )}\n`,
      );

      mocks.gitCurrentBranch.mockResolvedValue("task/T-1/pre-merge");
      const { finalizeCloseTail } = await import("./finish-execute-close.js");
      await finalizeCloseTail({
        ctx: mkCtx(root),
        options: mkOptions(root),
        plan: {
          shouldCloseCommit: true,
          preMergeClosure: true,
          primaryTaskId: "T-1",
          closeAdditionalTaskIds: [],
        } as FinishExecutionPlan,
        primaryTaskId: "T-1",
        promotedIncidents: 0,
      });

      expect(mocks.materializeBranchPrCloseTail).not.toHaveBeenCalled();
      expect(mocks.createTaskCloseCommit).toHaveBeenCalledWith(
        expect.objectContaining({ taskId: "T-1", additionalTaskIds: [] }),
      );
      const meta = JSON.parse(await readFile(path.join(prDir, "meta.json"), "utf8")) as {
        pre_merge_closure?: { state?: string; basis_commit?: string; branch?: string };
      };
      expect(meta.pre_merge_closure).toMatchObject({
        state: "closed_before_merge",
        basis_commit: "implementation-head",
        branch: "task/T-1/pre-merge",
      });
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });
});
