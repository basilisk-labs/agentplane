import { describe, expect, it } from "vitest";

import { reduceRouteState } from "./workflow-step-reducer.js";
import { resume, routeState, task, withNativeIdentity } from "./workflow-step.testkit.js";

describe("branch worktree preparation priority", () => {
  it("prepares a missing task worktree before resolving dirt in the base checkout", () => {
    const step = reduceRouteState(
      routeState({
        task: withNativeIdentity(task, "READY"),
        taskWorktree: {
          state: "not_present",
          branch: resume.base_branch,
          worktreePath: null,
          changedPaths: ["unrelated-local-change.ts"],
        },
        blockers: [
          { code: "task_worktree_dirty", summary: "base checkout contains unrelated changes" },
          { code: "on_base_checkout", summary: "task has no dedicated worktree" },
        ],
      }),
    );

    expect(step).toMatchObject({
      kind: "cli_operation",
      phase: "worktree_needed",
      operation: { id: "worktree.prepare" },
    });
  });
});
