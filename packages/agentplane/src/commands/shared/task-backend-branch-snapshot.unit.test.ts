import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import * as git from "@agentplaneorg/core/git";
import * as process from "@agentplaneorg/core/process";
import type { CommandContext } from "./task-backend.js";
import {
  resolveAuthoritativeTaskWorktree,
  resolveTaskBranchFromContext,
} from "./task-backend-branch-snapshot.js";

function makeContext(): CommandContext {
  return {
    resolvedProject: { gitRoot: "/repo" },
    config: { branch: { task_prefix: "task" } },
    taskBackend: {
      capabilities: {
        canonical_source: "local",
        writes_task_readmes: true,
      },
    },
    backendId: "local",
    memo: {},
  } as unknown as CommandContext;
}

describe("task branch snapshot inventory", () => {
  beforeEach(() => {
    vi.spyOn(git, "gitListTaskBranches").mockResolvedValue([
      "task/202607260001-ALPHA/local",
      "task/202607260002-BRAVO/local",
    ]);
    vi.spyOn(process, "execFileAsync").mockResolvedValue({
      stdout: [
        "origin/task/202607260001-ALPHA/local",
        "origin/task/202607260003-CHARLIE/remote",
      ].join("\n"),
      stderr: "",
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("shares one local and remote inventory across concurrent route lookups", async () => {
    const ctx = makeContext();
    const [alpha, bravo, charlie] = await Promise.all([
      resolveTaskBranchFromContext({ ctx, taskId: "202607260001-ALPHA" }),
      resolveTaskBranchFromContext({ ctx, taskId: "202607260002-BRAVO" }),
      resolveTaskBranchFromContext({ ctx, taskId: "202607260003-CHARLIE" }),
    ]);

    expect(alpha).toBe("task/202607260001-ALPHA/local");
    expect(bravo).toBe("task/202607260002-BRAVO/local");
    expect(charlie).toBe("task/202607260003-CHARLIE/remote");
    expect(git.gitListTaskBranches).toHaveBeenCalledTimes(1);
    expect(process.execFileAsync).toHaveBeenCalledTimes(1);
  });

  it("does not reuse an inventory from a previous command context", async () => {
    await resolveTaskBranchFromContext({
      ctx: makeContext(),
      taskId: "202607260001-ALPHA",
    });
    await resolveTaskBranchFromContext({
      ctx: makeContext(),
      taskId: "202607260001-ALPHA",
    });

    expect(git.gitListTaskBranches).toHaveBeenCalledTimes(2);
    expect(process.execFileAsync).toHaveBeenCalledTimes(2);
  });

  it("resolves exactly one registered worktree as the authoritative task checkout", async () => {
    vi.spyOn(git, "listWorktrees").mockResolvedValue([
      { path: "/repo", branch: "refs/heads/main" },
      {
        path: "/repo/.agentplane/worktrees/alpha",
        branch: "refs/heads/task/202607260001-ALPHA/local",
      },
    ]);

    await expect(
      resolveAuthoritativeTaskWorktree({
        ctx: makeContext(),
        taskId: "202607260001-ALPHA",
        branch: "task/202607260001-ALPHA/local",
        requireRegistration: true,
      }),
    ).resolves.toEqual({
      path: "/repo/.agentplane/worktrees/alpha",
      branch: "task/202607260001-ALPHA/local",
    });
  });

  it("rejects duplicate same-task worktree registrations", async () => {
    vi.spyOn(git, "listWorktrees").mockResolvedValue([
      {
        path: "/repo/.agentplane/worktrees/alpha-a",
        branch: "refs/heads/task/202607260001-ALPHA/local",
      },
      {
        path: "/repo/.agentplane/worktrees/alpha-b",
        branch: "refs/heads/task/202607260001-ALPHA/recovery",
      },
    ]);

    await expect(
      resolveAuthoritativeTaskWorktree({
        ctx: makeContext(),
        taskId: "202607260001-ALPHA",
        branch: "task/202607260001-ALPHA/local",
      }),
    ).rejects.toMatchObject({
      code: "E_VALIDATION",
      context: { reason_code: "duplicate_task_worktree_registration" },
    });
  });

  it("rejects foreign branches and missing local registrations", async () => {
    const ctx = makeContext();
    vi.spyOn(git, "listWorktrees").mockResolvedValue([
      { path: "/repo", branch: "refs/heads/main" },
    ]);

    await expect(
      resolveAuthoritativeTaskWorktree({
        ctx,
        taskId: "202607260001-ALPHA",
        branch: "task/202607260002-BRAVO/local",
      }),
    ).rejects.toMatchObject({
      context: { reason_code: "foreign_task_branch" },
    });
    await expect(
      resolveAuthoritativeTaskWorktree({
        ctx,
        taskId: "202607260001-ALPHA",
        branch: "task/202607260001-ALPHA/local",
        requireRegistration: true,
      }),
    ).rejects.toMatchObject({
      context: { reason_code: "task_worktree_registration_missing" },
    });
  });
});
