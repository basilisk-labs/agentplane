import { beforeEach, expect, it, vi } from "vitest";
import type * as CoreGit from "@agentplaneorg/core/git";
import type { CommandContext } from "../shared/task-backend.js";
import { ensureCanonicalTaskWorktree } from "./kernel-worktree-routing.js";
const mocks = vi.hoisted(() => ({
  adoption: vi.fn(),
  branch: vi.fn(),
  worktrees: vi.fn(),
  route: vi.fn(),
}));
vi.mock("./kernel-adopted-pr-route.js", () => ({ readKernelAdoption: mocks.adoption }));
vi.mock("@agentplaneorg/core/git", async (original) => ({
  ...(await original<typeof CoreGit>()),
  gitCurrentBranch: mocks.branch,
  listWorktrees: mocks.worktrees,
}));
vi.mock("../shared/route-decision.js", () => ({ buildTaskRouteDecision: mocks.route }));
const taskId = "202610310000-ADOPT1";
function input() {
  return {
    command: {
      resolvedProject: { gitRoot: "/control" },
      config: { branch: { task_prefix: "task" } },
    } as CommandContext,
    task: { execution_route: { repository_mode: "branch_pr" } },
    taskId,
    reasonCode: "kernel_work_item_execution_required",
    hasWorkItem: true,
    runtime: {},
  } as unknown as Parameters<typeof ensureCanonicalTaskWorktree>[0];
}
beforeEach(() => {
  vi.resetAllMocks();
  mocks.adoption.mockResolvedValue({ receipt: { task_id: taskId } });
  mocks.branch.mockResolvedValue("main");
  mocks.worktrees.mockResolvedValue([]);
  mocks.route.mockResolvedValue({ workspace: { taskWorktreePath: "/provider-owned" } });
});
it("does not execute adopted semantic work on the base branch", async () => {
  expect(await ensureCanonicalTaskWorktree(input())).toMatchObject({ kind: "external_wait" });
});
it("prefers the registered Task control checkout over the provider branch", async () => {
  mocks.worktrees.mockResolvedValue([
    { path: "/provider-owned", branch: "refs/heads/task/202610300000-SOURCE/provider" },
    { path: "/task-control", branch: `refs/heads/task/${taskId}/adopted-control` },
  ]);
  expect(await ensureCanonicalTaskWorktree(input())).toEqual({
    kind: "external_wait",
    reason: "canonical_worktree_prepared",
    must_run_from: "/task-control",
  });
  expect(mocks.route).not.toHaveBeenCalled();
});
it("permits semantic execution from the dedicated Task control branch", async () => {
  mocks.branch.mockResolvedValue(`task/${taskId}/adopted-control`);
  expect(await ensureCanonicalTaskWorktree(input())).toBeNull();
  expect(mocks.route).not.toHaveBeenCalled();
});
