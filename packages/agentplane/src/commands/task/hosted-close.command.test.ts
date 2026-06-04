import { describe, expect, it } from "vitest";

import {
  isExplicitHostedCloseFollowupBranch,
  taskIsClosedByPreMergeClosure,
} from "./hosted-close.command.js";
import type { TaskData } from "../../backends/task-backend.js";

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
    expect(
      taskIsClosedByPreMergeClosure({
        task: { id: "T-1", status: "DONE", commit: { hash: "head", message: "done" } } as never,
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
            basis_commit: "abc123",
          },
        } as never,
        branch: "task/T-1/pre-merge",
        prNumber: 4402,
      }),
    ).toBe(true);
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

  it("rejects stale pre-merge markers from another branch or PR", () => {
    const task = {
      id: "T-1",
      status: "DONE",
      commit: { hash: "head", message: "done" },
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
  });
});
