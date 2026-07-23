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

  it("keeps legacy DONE tasks with pending verification out of integration", () => {
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
        verification: { state: "pending" },
      },
    });

    expect(blockers).toEqual([
      {
        code: "verification_required",
        summary: "the committed task implementation does not have a passing verification record",
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
