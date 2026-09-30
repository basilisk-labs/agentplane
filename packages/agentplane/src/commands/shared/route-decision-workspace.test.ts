import { beforeEach, describe, expect, it, vi } from "vitest";

import { findWorktreeForBranch, gitRevParse, listWorktrees } from "@agentplaneorg/core/git";
import type { TaskResumeContext } from "../task/handoff.shared.js";
import {
  deriveRouteCheckoutRole,
  findRouteWorktreePath,
  inferTaskRouteBranch,
} from "./route-decision-workspace.js";

vi.mock("@agentplaneorg/core/git", () => ({
  findWorktreeForBranch: vi.fn(),
  gitRevParse: vi.fn(),
  listWorktrees: vi.fn(),
}));

beforeEach(() => vi.resetAllMocks());

function resume(overrides: Partial<TaskResumeContext> = {}): TaskResumeContext {
  return {
    task_id: "202609230938-QFMVQ0",
    task_status: "DOING",
    branch: "main",
    base_branch: "origin/main",
    head_sha: "1111111111111111111111111111111111111111",
    workspace_root: "/repo",
    pr_branch: null,
    latest_handoff: null,
    runner: {
      run_id: null,
      status: null,
      heartbeat_at: null,
      state_path: null,
      trace_path: null,
      next_action: "run",
      next_command: "agentplane task run 202609230938-QFMVQ0",
      resume_command: "agentplane task run 202609230938-QFMVQ0",
      retry_command: null,
    },
    ...overrides,
  };
}

describe("route decision workspace", () => {
  it("resolves an exact commit only when one registered checkout has that HEAD", async () => {
    const sha = "a".repeat(40);
    vi.mocked(findWorktreeForBranch).mockResolvedValue(null);
    vi.mocked(listWorktrees).mockResolvedValue([
      { path: "/repo", branch: "refs/heads/main" },
      { path: "/base", branch: null },
    ]);
    vi.mocked(gitRevParse).mockResolvedValueOnce("b".repeat(40)).mockResolvedValueOnce(sha);
    await expect(findRouteWorktreePath("/repo", sha)).resolves.toBe("/base");
  });

  it.each([{ paths: [] }, { paths: ["/one", "/two"] }])(
    "does not guess a SHA checkout from $paths",
    async ({ paths }) => {
      const sha = "a".repeat(40);
      vi.mocked(findWorktreeForBranch).mockResolvedValue(null);
      vi.mocked(listWorktrees).mockResolvedValue(paths.map((p) => ({ path: p, branch: null })));
      vi.mocked(gitRevParse).mockResolvedValue(sha);
      await expect(findRouteWorktreePath("/repo", sha)).resolves.toBeNull();
    },
  );

  it("does not reinterpret a missing named branch as another checkout", async () => {
    vi.mocked(findWorktreeForBranch).mockResolvedValue(null);
    await expect(findRouteWorktreePath("/repo", "missing")).resolves.toBeNull();
    expect(listWorktrees).not.toHaveBeenCalled();
  });

  it.each(["origin/main", "refs/remotes/origin/main"])(
    "treats local main as the base checkout for %s",
    (baseBranch) => {
      const context = resume({ base_branch: baseBranch });

      expect(deriveRouteCheckoutRole(context)).toBe("base");
      expect(inferTaskRouteBranch(context, null)).toBeNull();
    },
  );

  it("keeps a distinct task branch classified as a task worktree", () => {
    const context = resume({ branch: "task/202609230938-QFMVQ0/fix-route" });

    expect(deriveRouteCheckoutRole(context)).toBe("task_worktree");
    expect(inferTaskRouteBranch(context, null)).toBe("task/202609230938-QFMVQ0/fix-route");
  });

  it("resolves an origin-tracking base through its local branch worktree", async () => {
    vi.mocked(findWorktreeForBranch).mockResolvedValueOnce(null).mockResolvedValueOnce("/repo");

    await expect(findRouteWorktreePath("/repo", "origin/main")).resolves.toBe("/repo");
    expect(findWorktreeForBranch).toHaveBeenNthCalledWith(1, "/repo", "origin/main");
    expect(findWorktreeForBranch).toHaveBeenNthCalledWith(2, "/repo", "main");
  });
});
