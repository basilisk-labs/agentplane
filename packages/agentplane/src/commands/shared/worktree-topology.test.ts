import { describe, expect, it, vi } from "vitest";
import type * as CoreGit from "@agentplaneorg/core/git";

import {
  assertCanonicalWorktreeCreationRoot,
  assertSingleTaskWorktreeRegistration,
  findDuplicateTaskWorktreeRegistrations,
  findNestedWorktreeRegistrations,
} from "./worktree-topology.js";

const mocks = vi.hoisted(() => ({ listWorktrees: vi.fn() }));

vi.mock("@agentplaneorg/core/git", async (importOriginal) => ({
  ...(await importOriginal<typeof CoreGit>()),
  listWorktrees: mocks.listWorktrees,
}));

describe("worktree topology invariants", () => {
  it("allows different active tasks while finding duplicate ownership for one task", () => {
    const worktrees = [
      { path: "/repo", branch: "refs/heads/main" },
      { path: "/repo/.agentplane/worktrees/T1-a", branch: "refs/heads/task/T1/a" },
      { path: "/repo/.agentplane/worktrees/T2-a", branch: "refs/heads/task/T2/a" },
    ];
    expect(findDuplicateTaskWorktreeRegistrations({ taskPrefix: "task", worktrees })).toEqual([]);

    expect(
      findDuplicateTaskWorktreeRegistrations({
        taskPrefix: "task",
        worktrees: [
          ...worktrees,
          { path: "/repo/.agentplane/tmp/recovery/T1-b", branch: "refs/heads/task/T1/b" },
        ],
      }),
    ).toMatchObject([{ taskId: "T1", worktrees: [{}, {}] }]);
  });

  it("finds a historical task worktree registered below a recovery base", () => {
    const nested = findNestedWorktreeRegistrations({
      projectRoot: "/repo",
      worktrees: [
        { path: "/repo", branch: "refs/heads/main" },
        { path: "/repo/.agentplane/tmp/recovery", branch: "refs/heads/recovery/main" },
        {
          path: "/repo/.agentplane/tmp/recovery/.agentplane/worktrees/T1",
          branch: "refs/heads/task/T1/a",
        },
      ],
    });
    expect(nested).toEqual([
      expect.objectContaining({
        parentPath: "/repo/.agentplane/tmp/recovery",
        path: "/repo/.agentplane/tmp/recovery/.agentplane/worktrees/T1",
      }),
    ]);
  });

  it("rejects worktree creation from internal recovery and task checkouts", async () => {
    mocks.listWorktrees.mockResolvedValue([
      { path: "/repo", branch: "refs/heads/main" },
      { path: "/repo/.agentplane/tmp/recovery", branch: "refs/heads/recovery/main" },
    ]);
    await expect(
      assertCanonicalWorktreeCreationRoot({
        gitRoot: "/repo/.agentplane/tmp/recovery",
        baseBranch: "main",
      }),
    ).rejects.toMatchObject({
      context: { reason_code: "nested_control_worktree_creation_forbidden" },
    });
  });

  it("allows the registered base checkout to create task worktrees", async () => {
    mocks.listWorktrees.mockResolvedValue([
      { path: "/repo", branch: "refs/heads/main" },
      { path: "/repo/.agentplane/worktrees/T1", branch: "refs/heads/task/T1/a" },
    ]);
    await expect(
      assertCanonicalWorktreeCreationRoot({ gitRoot: "/repo", baseBranch: "main" }),
    ).resolves.toBeUndefined();
  });

  it("reports the authoritative checkout when the same task already owns a worktree", async () => {
    mocks.listWorktrees.mockResolvedValue([
      { path: "/repo", branch: "refs/heads/main" },
      { path: "/repo/.agentplane/worktrees/T1-a", branch: "refs/heads/task/T1/a" },
    ]);
    await expect(
      assertSingleTaskWorktreeRegistration({ gitRoot: "/repo", taskPrefix: "task", taskId: "T1" }),
    ).rejects.toMatchObject({
      context: {
        reason_code: "task_worktree_already_registered",
        authoritative_worktree: "/repo/.agentplane/worktrees/T1-a",
      },
    });
  });
});
