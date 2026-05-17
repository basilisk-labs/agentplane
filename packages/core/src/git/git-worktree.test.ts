import { describe, expect, it } from "vitest";

import {
  parseTaskIdFromBranch,
  parseTaskIdFromCloseBranch,
  taskBranchName,
  taskCloseBranchName,
} from "./git-worktree.js";

describe("git worktree branch naming", () => {
  it("builds and parses default task branches", () => {
    const branch = taskBranchName({
      taskPrefix: "task",
      taskId: "202605171455-ZS8AE7",
      slug: "branch-naming-contract",
    });

    expect(branch).toBe("task/202605171455-ZS8AE7/branch-naming-contract");
    expect(parseTaskIdFromBranch("task", branch)).toBe("202605171455-ZS8AE7");
    expect(parseTaskIdFromBranch("task", `refs/heads/${branch}`)).toBe("202605171455-ZS8AE7");
  });

  it("builds and parses configured task branches", () => {
    const branch = taskBranchName({
      taskPrefix: "agents/task",
      taskId: "202605171455-ZS8AE7",
      slug: "branch-naming-contract",
    });

    expect(branch).toBe("agents/task/202605171455-ZS8AE7/branch-naming-contract");
    expect(parseTaskIdFromBranch("agents/task", branch)).toBe("202605171455-ZS8AE7");
    expect(parseTaskIdFromBranch("task", branch)).toBeNull();
  });

  it("builds and parses default close branches", () => {
    const branch = taskCloseBranchName({
      taskId: "202605171455-ZS8AE7",
      commit: "1234567890abcdef",
    });

    expect(branch).toBe("task-close/202605171455-ZS8AE7/1234567890ab");
    expect(parseTaskIdFromCloseBranch(branch)).toBe("202605171455-ZS8AE7");
    expect(parseTaskIdFromCloseBranch(`refs/heads/${branch}`)).toBe("202605171455-ZS8AE7");
  });

  it("builds and parses configured close branches", () => {
    const branch = taskCloseBranchName({
      taskClosePrefix: "agents/task-close",
      taskId: "202605171455-ZS8AE7",
      commit: "abcdef1234567890",
    });

    expect(branch).toBe("agents/task-close/202605171455-ZS8AE7/abcdef123456");
    expect(parseTaskIdFromCloseBranch(branch, "agents/task-close")).toBe("202605171455-ZS8AE7");
    expect(parseTaskIdFromCloseBranch(branch)).toBeNull();
  });
});
