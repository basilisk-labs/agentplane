import { describe, expect, it } from "vitest";

import {
  addTaskWorktreeCleanlinessBlocker,
  addVerificationRequiredBlocker,
} from "./route-decision-blockers.js";
import type { RouteBlocker } from "./route-oracle.js";

function collect(opts: { changedPaths: string[]; requireAllChanges: boolean }): RouteBlocker[] {
  const blockers: RouteBlocker[] = [];
  addTaskWorktreeCleanlinessBlocker({
    blockers,
    cleanliness: {
      state: "dirty",
      branch: "task/T-1/work",
      worktreePath: "/repo/.agentplane/worktrees/T-1",
      changedPaths: opts.changedPaths,
    },
    workflowDir: ".agentplane/tasks",
    tasksPath: ".agentplane/tasks.json",
    requireAllChanges: opts.requireAllChanges,
  });
  return blockers;
}

describe("route task-worktree blockers", () => {
  it("ignores lifecycle artifacts while DOING but blocks uncommitted implementation", () => {
    expect(
      collect({
        changedPaths: [
          ".agentplane/tasks/T-1/README.md",
          ".agentplane/tasks.json",
          "src/implementation.ts",
        ],
        requireAllChanges: false,
      }),
    ).toEqual([
      {
        code: "task_worktree_dirty",
        summary: "task worktree contains uncommitted changes (src/implementation.ts)",
      },
    ]);
  });

  it("keeps a DOING task with a recorded implementation and pending verification out of integration", () => {
    const blockers: RouteBlocker[] = [];
    addVerificationRequiredBlocker({
      blockers,
      task: {
        id: "T-1",
        title: "Task",
        description: "Task",
        status: "DOING",
        priority: "med",
        owner: "CODER",
        depends_on: [],
        tags: [],
        verify: ["bun test"],
        verification: { state: "pending" },
        commit: { hash: "abc123", message: "feat: implementation" },
      },
    });

    expect(blockers).toEqual([
      {
        code: "verification_required",
        summary: "the recorded task implementation does not have a passing verification record",
      },
    ]);
  });

  it("keeps an unrecorded DOING task with CODER instead of sending it to verification", () => {
    const blockers: RouteBlocker[] = [];
    addVerificationRequiredBlocker({
      blockers,
      task: {
        id: "T-1",
        title: "Task",
        description: "Task",
        status: "DOING",
        priority: "med",
        owner: "CODER",
        depends_on: [],
        tags: [],
        verify: ["bun test"],
        verification: { state: "pending" },
      },
    });

    expect(blockers).toEqual([]);
  });

  it("requires a fresh accepted verification record for the current implementation", () => {
    const task = {
      id: "T-1",
      title: "Task",
      description: "Task",
      status: "DOING",
      priority: "med",
      owner: "CODER",
      depends_on: [],
      tags: [],
      verify: ["bun test"],
      verification: { state: "ok" as const },
      commit: { hash: "abc123", message: "feat: implementation" },
    };
    const staleBlockers: RouteBlocker[] = [];
    addVerificationRequiredBlocker({
      blockers: staleBlockers,
      task,
      acceptedVerificationRecord: false,
      verificationReason: "verification_implementation_changed",
    });
    expect(staleBlockers).toEqual([
      {
        code: "verification_required",
        summary:
          "the passing verification record does not cover the current verification input (reason_code=verification_implementation_changed)",
      },
    ]);

    const freshBlockers: RouteBlocker[] = [];
    addVerificationRequiredBlocker({
      blockers: freshBlockers,
      task,
      acceptedVerificationRecord: true,
    });
    expect(freshBlockers).toEqual([]);
  });

  it("keeps a merged and close-tail-finalized DONE task terminal after lifecycle drift", () => {
    const blockers: RouteBlocker[] = [];
    addVerificationRequiredBlocker({
      blockers,
      task: {
        id: "T-1",
        title: "Task",
        description: "Task",
        status: "DONE",
        priority: "med",
        owner: "CODER",
        depends_on: [],
        tags: [],
        verify: ["bun test"],
        verification: {
          state: "ok",
          attempts: 0,
          updated_at: "2026-08-10T00:00:00.000Z",
          updated_by: "TESTER",
          note: "Verified before lifecycle closeout.",
        },
      },
      acceptedVerificationRecord: false,
      verificationReason: "verification_implementation_changed",
      finalizedDoneTask: true,
    });

    expect(blockers).toEqual([]);
  });

  it("invalidates stale verification before the active task records its final commit", () => {
    const blockers: RouteBlocker[] = [];
    addVerificationRequiredBlocker({
      blockers,
      task: {
        id: "T-1",
        title: "Task",
        description: "Task",
        status: "DOING",
        priority: "med",
        owner: "CODER",
        depends_on: [],
        tags: [],
        verify: ["bun test"],
        verification: { state: "ok" },
      },
      acceptedVerificationRecord: false,
    });

    expect(blockers).toEqual([
      {
        code: "verification_required",
        summary: "the passing verification record does not cover the current implementation head",
      },
    ]);
  });

  it("requires every path to be clean once the route reaches integration", () => {
    expect(
      collect({
        changedPaths: [".agentplane/tasks/T-1/pr/meta.json"],
        requireAllChanges: true,
      }),
    ).toEqual([
      {
        code: "task_worktree_dirty",
        summary: "task worktree contains uncommitted changes (.agentplane/tasks/T-1/pr/meta.json)",
      },
    ]);
  });

  it("fails closed when the task worktree state cannot be inspected", () => {
    const blockers: RouteBlocker[] = [];
    addTaskWorktreeCleanlinessBlocker({
      blockers,
      cleanliness: {
        state: "unavailable",
        branch: "task/T-1/work",
        worktreePath: "/repo/.agentplane/worktrees/T-1",
        changedPaths: [],
        reason: "git status failed",
      },
      workflowDir: ".agentplane/tasks",
      tasksPath: ".agentplane/tasks.json",
      requireAllChanges: false,
    });

    expect(blockers).toEqual([
      {
        code: "task_worktree_state_unavailable",
        summary: "task worktree state could not be inspected: git status failed",
      },
    ]);
  });
});
