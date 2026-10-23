import { beforeEach, describe, expect, it, vi } from "vitest";
import type * as CoreGit from "@agentplaneorg/core/git";

import {
  assertCanonicalWorktreeCreationRoot,
  assertSingleTaskWorktreeRegistration,
  findDuplicateTaskWorktreeRegistrations,
  findNestedWorktreeRegistrations,
  resolveCanonicalWorktreePreparationRoot,
} from "./worktree-topology.js";

const mocks = vi.hoisted(() => ({ listWorktrees: vi.fn(), gitRevParse: vi.fn() }));

vi.mock("@agentplaneorg/core/git", async (importOriginal) => ({
  ...(await importOriginal<typeof CoreGit>()),
  listWorktrees: mocks.listWorktrees,
  gitRevParse: mocks.gitRevParse,
}));

describe("worktree topology invariants", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.gitRevParse.mockResolvedValue("/repo/.git");
  });

  it("selects the same-repository primary while preserving a registered internal base", async () => {
    mocks.listWorktrees.mockResolvedValue([
      { path: "/repo", branch: "refs/heads/main" },
      { path: "/repo/.agentplane/worktrees/base", branch: "refs/heads/integration" },
    ]);
    await expect(
      resolveCanonicalWorktreePreparationRoot({
        routedCheckout: "/repo/.agentplane/worktrees/base",
        registeredBaseCheckout: "/repo/.agentplane/worktrees/base",
        baseBranch: "integration",
      }),
    ).resolves.toBe("/repo");
    expect(mocks.gitRevParse).toHaveBeenCalledTimes(2);
  });

  it("rejects an unregistered or wrong-branch base before preparation", async () => {
    mocks.listWorktrees.mockResolvedValue([
      { path: "/repo", branch: "refs/heads/main" },
      { path: "/repo/.agentplane/worktrees/base", branch: "refs/heads/other" },
    ]);
    await expect(
      resolveCanonicalWorktreePreparationRoot({
        routedCheckout: "/repo/.agentplane/worktrees/base",
        registeredBaseCheckout: "/repo/.agentplane/worktrees/base",
        baseBranch: "integration",
      }),
    ).rejects.toMatchObject({
      context: { reason_code: "worktree_preparation_base_branch_mismatch" },
    });
    expect(mocks.gitRevParse).not.toHaveBeenCalled();
  });

  it("rejects a foreign primary Git common directory", async () => {
    mocks.listWorktrees.mockResolvedValue([
      { path: "/repo", branch: "refs/heads/main" },
      { path: "/repo/.agentplane/worktrees/base", branch: "refs/heads/integration" },
    ]);
    mocks.gitRevParse.mockResolvedValueOnce("/repo/.git").mockResolvedValueOnce("/foreign/.git");
    await expect(
      resolveCanonicalWorktreePreparationRoot({
        routedCheckout: "/repo/.agentplane/worktrees/base",
        registeredBaseCheckout: "/repo/.agentplane/worktrees/base",
        baseBranch: "integration",
      }),
    ).rejects.toMatchObject({
      context: { reason_code: "worktree_preparation_foreign_repository" },
    });
  });

  it("rejects duplicate primary registration", async () => {
    mocks.listWorktrees.mockResolvedValue([
      { path: "/repo", branch: "refs/heads/main" },
      { path: "/repo", branch: "refs/heads/other" },
    ]);
    await expect(
      resolveCanonicalWorktreePreparationRoot({
        routedCheckout: "/repo",
        registeredBaseCheckout: "/repo",
        baseBranch: "main",
      }),
    ).rejects.toMatchObject({
      context: { reason_code: "worktree_preparation_registration_ambiguous" },
    });
  });
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

  it("does not report healthy siblings as nested when doctor runs from a task worktree", () => {
    const worktrees = [
      { path: "/repo", branch: "refs/heads/control" },
      { path: "/repo/.agentplane/worktrees/T1", branch: "refs/heads/task/T1/a" },
      { path: "/repo/.agentplane/worktrees/T2", branch: "refs/heads/task/T2/a" },
    ];
    expect(
      findNestedWorktreeRegistrations({
        projectRoot: "/repo/.agentplane/worktrees/T1",
        worktrees,
      }),
    ).toEqual([]);
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

  it("rejects creation when a recovery checkout temporarily owns the base branch", async () => {
    mocks.listWorktrees.mockResolvedValue([
      { path: "/repo", branch: "refs/heads/control" },
      { path: "/repo/.agentplane/tmp/recovery", branch: "refs/heads/main" },
    ]);
    await expect(
      assertCanonicalWorktreeCreationRoot({
        gitRoot: "/repo/.agentplane/tmp/recovery",
        baseBranch: "main",
      }),
    ).rejects.toMatchObject({
      context: {
        reason_code: "nested_control_worktree_creation_forbidden",
        canonical_project_root: "/repo",
      },
    });
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
