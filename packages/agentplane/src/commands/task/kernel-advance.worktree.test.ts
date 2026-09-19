import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  createKernelRuntime: vi.fn(),
  findWorktreeForBranch: vi.fn(),
  gitCurrentBranch: vi.fn(),
  parseTaskIdFromBranch: vi.fn(),
  taskBranchName: vi.fn(),
}));

vi.mock("./kernel-runtime-context.js", () => ({
  createKernelRuntime: mocks.createKernelRuntime,
  requireKernelCommit: vi.fn(),
}));
vi.mock("./kernel-final-validation.js", () => ({
  restoreKernelFinalValidation: vi.fn(() => null),
  runKernelFinalValidation: vi.fn(),
}));
vi.mock("@agentplaneorg/core/git", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@agentplaneorg/core/git")>()),
  findWorktreeForBranch: mocks.findWorktreeForBranch,
  gitCurrentBranch: mocks.gitCurrentBranch,
  parseTaskIdFromBranch: mocks.parseTaskIdFromBranch,
  taskBranchName: mocks.taskBranchName,
}));

import { advanceCanonicalTask } from "./kernel-advance.js";

describe("canonical task worktree routing", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mocks.gitCurrentBranch.mockResolvedValue("main");
    mocks.parseTaskIdFromBranch.mockReturnValue(null);
    mocks.taskBranchName.mockReturnValue("task/202609192051-QAHTFD/canonical-qahtfd");
    mocks.findWorktreeForBranch.mockResolvedValue("/repo/.agentplane/worktrees/task");
    mocks.createKernelRuntime.mockResolvedValue({
      native: {
        readContext: vi.fn().mockResolvedValue({ repository_fingerprint: "sha256:fingerprint" }),
      },
      lifecycle: {
        read: vi.fn().mockResolvedValue({
          read: {
            kind: "canonical",
            task: {
              owner: "CODER",
              execution_route: { repository_mode: "branch_pr" },
            },
            record: {
              digest: "sha256:record",
              aggregate: {
                revision: 1,
                current_plan: null,
                final_validation: null,
                work_items: { tests: { claim_id: "sha256:claim" } },
              },
            },
          },
          next_action: {
            reason_code: "kernel_work_item_result_required",
            work_item_id: "tests",
          },
        }),
      },
    });
  });

  it("redirects a semantic result episode to an existing canonical task worktree", async () => {
    await expect(
      advanceCanonicalTask({
        command: {
          resolvedProject: { gitRoot: "/repo" },
          config: { branch: { task_prefix: "task/" } },
        } as never,
        task_id: "202609192051-QAHTFD",
        transport: "host",
      }),
    ).resolves.toEqual({
      schema_version: 1,
      task_id: "202609192051-QAHTFD",
      action: {
        kind: "external_wait",
        reason: "canonical_worktree_prepared",
        must_run_from: "/repo/.agentplane/worktrees/task",
      },
    });
    expect(mocks.findWorktreeForBranch).toHaveBeenCalledWith(
      "/repo",
      "task/202609192051-QAHTFD/canonical-qahtfd",
    );
  });
});
