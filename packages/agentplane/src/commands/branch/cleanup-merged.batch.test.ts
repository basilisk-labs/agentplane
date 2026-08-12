import { beforeEach, describe, expect, it, vi } from "vitest";
import type * as CleanupProof from "./cleanup-merged-proof.js";
import type * as GitOps from "../shared/git-ops.js";
import type * as MergedCleanup from "../shared/merged-branch-cleanup.js";

import { cmdCleanupMerged } from "./cleanup-merged.js";

const mocks = vi.hoisted(() => ({
  cleanupMergedLocalBranch: vi.fn(),
  gitBranchExists: vi.fn(),
  gitCurrentBranch: vi.fn(),
  resolveCleanupPlan: vi.fn(),
}));

vi.mock("@agentplaneorg/core/git", () => ({
  gitEnv: () => ({}),
  resolveBaseBranch: () => Promise.resolve("main"),
}));
vi.mock("../guard/index.js", () => ({ ensureGitClean: vi.fn() }));
vi.mock("../shared/git-ops.js", async (importOriginal) => ({
  ...(await importOriginal<typeof GitOps>()),
  gitBranchExists: mocks.gitBranchExists,
  gitCurrentBranch: mocks.gitCurrentBranch,
}));
vi.mock("../shared/merged-branch-cleanup.js", async (importOriginal) => ({
  ...(await importOriginal<typeof MergedCleanup>()),
  cleanupMergedLocalBranch: mocks.cleanupMergedLocalBranch,
}));
vi.mock("./cleanup-merged-proof.js", async (importOriginal) => ({
  ...(await importOriginal<typeof CleanupProof>()),
  revalidateCleanupCandidate: vi.fn(() => Promise.resolve(null)),
  resolveCleanupPlan: mocks.resolveCleanupPlan,
}));

describe("cleanup merged batch isolation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.gitBranchExists.mockResolvedValue(true);
    mocks.gitCurrentBranch.mockResolvedValue("main");
    mocks.cleanupMergedLocalBranch.mockResolvedValue({
      preservedDirtyState: false,
      removedBranch: true,
      removedWorktree: false,
      stashMessage: null,
    });
  });

  it("deletes proven targets while retaining an independent blocked target", async () => {
    const candidate = {
      taskId: "T-PROVEN",
      branch: "task/T-PROVEN/change",
      worktreePath: null,
      expectedHeadSha: "a".repeat(40),
      proof: "provider_merge" as const,
    };
    mocks.resolveCleanupPlan.mockResolvedValue({
      blocked: [
        {
          taskId: "T-BLOCKED",
          branch: "task/T-BLOCKED/change",
          worktreePath: null,
          reason: "task status is DOING, not DONE",
        },
      ],
      candidates: [candidate],
      matchedTaskIds: new Set(["T-PROVEN", "T-BLOCKED"]),
    });

    const result = await cmdCleanupMerged({
      ctx: {
        config: {
          workflow_mode: "branch_pr",
          paths: { workflow_dir: ".agentplane/tasks", worktrees_dir: ".agentplane/worktrees" },
        },
        resolvedProject: { gitRoot: "/repo" },
      } as never,
      cwd: "/repo",
      yes: true,
      archive: false,
      deleteRemoteBranches: false,
      fetch: false,
      quiet: true,
      taskIds: ["T-PROVEN", "T-BLOCKED"],
    });

    expect(result).toBe(0);
    expect(mocks.cleanupMergedLocalBranch).toHaveBeenCalledOnce();
    expect(mocks.cleanupMergedLocalBranch).toHaveBeenCalledWith(
      expect.objectContaining({ branch: candidate.branch }),
    );
  });
});
