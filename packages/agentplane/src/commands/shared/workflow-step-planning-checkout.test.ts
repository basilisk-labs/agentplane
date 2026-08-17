import { describe, expect, it } from "vitest";

import { planningCheckout } from "./workflow-step-reducer.js";

describe("planning checkout", () => {
  it("uses an existing branch task worktree for replanning and plan approval", () => {
    expect(
      planningCheckout({
        workflowMode: "branch_pr",
        taskWorktree: {
          state: "dirty",
          branch: "task/202608171106-XFN696/recovery",
          worktreePath: "/repo/.agentplane/worktrees/202608171106-XFN696-recovery",
          changedPaths: [".agentplane/tasks/202608171106-XFN696/README.md"],
        },
      } as never),
    ).toBe("task_worktree");
  });

  it("keeps initial planning in the base checkout before a worktree exists", () => {
    expect(
      planningCheckout({
        workflowMode: "branch_pr",
        taskWorktree: {
          state: "not_present",
          branch: "task/202608171106-XFN696/recovery",
          worktreePath: null,
          changedPaths: [],
        },
      } as never),
    ).toBe("base_checkout");
  });
});
