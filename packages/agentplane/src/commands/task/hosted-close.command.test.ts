import { execFile } from "node:child_process";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it } from "vitest";

import {
  isExplicitHostedCloseFollowupBranch,
  preMergeClosureAllowsMissingBasisCommit,
  preMergeClosureBasisIsAncestor,
  taskIsClosedByPreMergeClosure,
} from "./hosted-close.command.js";
import type { TaskData } from "../../backends/task-backend.js";
import { configureGitUser, mkGitRepoRoot } from "@agentplane/testkit";

const task = { id: "202605131603-PFXN5E" } as TaskData;

describe("isExplicitHostedCloseFollowupBranch", () => {
  it("accepts explicit post-merge and followup task branches", () => {
    for (const branch of [
      "task/202605131603-PFXN5E/post-merge-hotspot",
      "task/202605131603-PFXN5E/hosted-close-followup",
      "task/202605131603-PFXN5E/followup-hosted-close",
    ]) {
      expect(
        isExplicitHostedCloseFollowupBranch({
          branch,
          taskBranchPrefix: "task",
          task,
        }),
      ).toBe(true);
    }
  });

  it("rejects accidental task id reuse and unrelated task branches", () => {
    for (const branch of [
      "task/202605131603-PFXN5E/accidental-reuse",
      "task/202605131603-PFXN5E/feature",
      "task/202605131604-OTHER/hosted-close-followup",
    ]) {
      expect(
        isExplicitHostedCloseFollowupBranch({
          branch,
          taskBranchPrefix: "task",
          task,
        }),
      ).toBe(false);
    }
  });
});

describe("taskIsClosedByPreMergeClosure", () => {
  it("accepts DONE tasks with an explicit pre-merge closure packet", () => {
    for (const prNumber of [4402, undefined]) {
      expect(
        taskIsClosedByPreMergeClosure({
          task: { id: "T-1", status: "DONE", commit: { hash: "abc123", message: "done" } } as never,
          meta: {
            schema_version: 1,
            task_id: "T-1",
            branch: "task/T-1/pre-merge",
            ...(prNumber == null ? {} : { pr_number: prNumber }),
            created_at: "2026-02-09T00:00:00.000Z",
            updated_at: "2026-02-09T00:00:00.000Z",
            pre_merge_closure: {
              state: "closed_before_merge",
              branch: "task/T-1/pre-merge",
              basis_commit: "abc123",
            },
          } as never,
          branch: "task/T-1/pre-merge",
          prNumber: 4402,
        }),
      ).toBe(true);
    }
  });

  it("rejects non-DONE tasks and unrelated marker shapes", () => {
    expect(
      taskIsClosedByPreMergeClosure({
        task: { id: "T-1", status: "DOING", commit: { hash: "head", message: "done" } } as never,
        meta: {
          schema_version: 1,
          task_id: "T-1",
          branch: "task/T-1/pre-merge",
          pr_number: 4402,
          created_at: "2026-02-09T00:00:00.000Z",
          updated_at: "2026-02-09T00:00:00.000Z",
          pre_merge_closure: { state: "planned" },
        } as never,
        branch: "task/T-1/pre-merge",
        prNumber: 4402,
      }),
    ).toBe(false);
  });

  it("accepts legacy markers whose basis is the pre-finish branch head", () => {
    expect(
      taskIsClosedByPreMergeClosure({
        task: {
          id: "T-1",
          status: "DONE",
          commit: { hash: "evidence-commit", message: "done" },
        } as never,
        meta: {
          schema_version: 1,
          task_id: "T-1",
          branch: "task/T-1/pre-merge",
          pr_number: 4402,
          created_at: "2026-02-09T00:00:00.000Z",
          updated_at: "2026-02-09T00:00:00.000Z",
          pre_merge_closure: {
            state: "closed_before_merge",
            branch: "task/T-1/pre-merge",
            basis_commit: "pre-finish-head",
          },
        } as never,
        branch: "task/T-1/pre-merge",
        prNumber: 4402,
      }),
    ).toBe(true);
  });

  it("rejects stale pre-merge markers from another branch or PR", () => {
    const task = {
      id: "T-1",
      status: "DONE",
      commit: { hash: "abc123", message: "done" },
    } as never;
    const meta = {
      schema_version: 1,
      task_id: "T-1",
      branch: "task/T-1/pre-merge",
      pr_number: 4402,
      created_at: "2026-02-09T00:00:00.000Z",
      updated_at: "2026-02-09T00:00:00.000Z",
      pre_merge_closure: {
        state: "closed_before_merge",
        branch: "task/T-1/pre-merge",
        basis_commit: "abc123",
      },
    } as never;

    expect(
      taskIsClosedByPreMergeClosure({
        task,
        meta,
        branch: "task/T-1/reused-branch",
        prNumber: 4402,
      }),
    ).toBe(false);
    expect(
      taskIsClosedByPreMergeClosure({
        task,
        meta,
        branch: "task/T-1/pre-merge",
        prNumber: 4403,
      }),
    ).toBe(false);
    expect(
      taskIsClosedByPreMergeClosure({
        task,
        meta: {
          ...meta,
          pr_number: undefined,
          pre_merge_closure: {
            state: "closed_before_merge",
            branch: "task/T-1/pre-merge",
            basis_commit: "abc123",
            pr_number: 4403,
          },
        } as never,
        branch: "task/T-1/pre-merge",
        prNumber: 4402,
      }),
    ).toBe(false);
  });
});

describe("preMergeClosureBasisIsAncestor", () => {
  it("tolerates a missing basis commit after GitHub rebase merge rewrites the task branch", async () => {
    const root = await mkGitRepoRoot();
    await configureGitUser(root);
    await writeFile(path.join(root, "seed.txt"), "seed\n", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "seed.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "seed"], { cwd: root });
    const { stdout } = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });

    await expect(
      preMergeClosureBasisIsAncestor({
        gitRoot: root,
        mergedHeadSha: stdout.trim(),
        allowMissingBasisCommit: true,
        meta: {
          schema_version: 1,
          task_id: "T-1",
          branch: "task/T-1/pre-merge",
          created_at: "2026-02-09T00:00:00.000Z",
          updated_at: "2026-02-09T00:00:00.000Z",
          pre_merge_closure: {
            state: "closed_before_merge",
            branch: "task/T-1/pre-merge",
            basis_commit: "c6d4d5ed9fcd2c7748200b5ed28b44f01f9fcc18",
          },
        } as never,
      }),
    ).resolves.toBe(true);

    await expect(
      preMergeClosureBasisIsAncestor({
        gitRoot: root,
        mergedHeadSha: stdout.trim(),
        allowMissingBasisCommit: false,
        meta: {
          schema_version: 1,
          task_id: "T-1",
          branch: "task/T-1/pre-merge",
          created_at: "2026-02-09T00:00:00.000Z",
          updated_at: "2026-02-09T00:00:00.000Z",
          pre_merge_closure: {
            state: "closed_before_merge",
            branch: "task/T-1/pre-merge",
            basis_commit: "c6d4d5ed9fcd2c7748200b5ed28b44f01f9fcc18",
          },
        } as never,
      }),
    ).resolves.toBe(false);
  });
});

describe("preMergeClosureAllowsMissingBasisCommit", () => {
  it("accepts legacy no-PR markers after DONE and rejects explicit PR mismatches", () => {
    const task = {
      id: "T-1",
      status: "DONE",
      commit: { hash: "close-commit", message: "done" },
    } as never;
    const meta = {
      schema_version: 1,
      task_id: "T-1",
      branch: "task/T-1/pre-merge",
      created_at: "2026-02-09T00:00:00.000Z",
      updated_at: "2026-02-09T00:00:00.000Z",
      pre_merge_closure: {
        state: "closed_before_merge",
        branch: "task/T-1/pre-merge",
        basis_commit: "pre-finish-head",
      },
    } as never;

    expect(preMergeClosureAllowsMissingBasisCommit({ task, meta, prNumber: 4402 })).toBe(true);
    expect(
      preMergeClosureAllowsMissingBasisCommit({
        task,
        prNumber: 4402,
        meta: {
          ...meta,
          pr_number: 4403,
        } as never,
      }),
    ).toBe(false);
    expect(
      preMergeClosureAllowsMissingBasisCommit({
        task,
        prNumber: 4402,
        meta: {
          ...meta,
          pre_merge_closure: {
            state: "closed_before_merge",
            branch: "task/T-1/pre-merge",
            basis_commit: "pre-finish-head",
            pr_number: 4403,
          },
        } as never,
      }),
    ).toBe(false);
  });
});
