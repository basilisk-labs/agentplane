import { mkdtemp, readdir, rm, stat } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { CliError } from "./errors.js";

const mocks = vi.hoisted(() => ({
  gitCurrentBranch: vi.fn(),
  gitRevParse: vi.fn(),
}));

vi.mock("@agentplaneorg/core/git", () => ({
  gitCurrentBranch: mocks.gitCurrentBranch,
  gitRevParse: mocks.gitRevParse,
}));

type GitIdentity = {
  gitDir: string;
  gitCommonDir: string;
};

const roots: string[] = [];
let identities: Map<string, GitIdentity>;

async function makeRoot(name: string, identity: GitIdentity): Promise<string> {
  const root = await mkdtemp(path.join(tmpdir(), `agentplane-${name}-`));
  roots.push(root);
  identities.set(root, identity);
  return root;
}

async function waitForLock(root: string): Promise<string> {
  const locksDir = path.join(root, ".agentplane", "cache", "locks");
  for (let attempt = 0; attempt < 50; attempt++) {
    try {
      const entries = await readdir(locksDir);
      const lock = entries.find((entry) => entry.endsWith(".git-add.lock"));
      if (lock) return path.join(locksDir, lock);
    } catch {
      // keep polling until the holder creates the lock directory
    }
    await new Promise((resolve) => setTimeout(resolve, 10));
  }
  throw new Error("Timed out waiting for Git mutation mutex");
}

describe("Git mutation mutex", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    identities = new Map();
    mocks.gitCurrentBranch.mockResolvedValue("task/202601010101-ABCDEF/example");
    mocks.gitRevParse.mockImplementation((cwd: string, args: string[]) => {
      const identity = identities.get(cwd);
      if (!identity) throw new Error(`missing identity for ${cwd}`);
      if (args[0] === "--git-dir") return Promise.resolve(identity.gitDir);
      if (args[0] === "--git-common-dir") return Promise.resolve(identity.gitCommonDir);
      throw new Error(`unexpected rev-parse args: ${args.join(" ")}`);
    });
  });

  afterEach(async () => {
    for (const root of roots.splice(0)) {
      await rm(root, { recursive: true, force: true });
    }
  });

  it("conflicts cleanly for concurrent writers in the same worktree", async () => {
    const commonDir = path.join(tmpdir(), "agentplane-common.git");
    const root = await makeRoot("same-worktree", {
      gitCommonDir: commonDir,
      gitDir: path.join(commonDir, "worktrees", "one"),
    });
    const { withGitMutationMutex } = await import("./git-mutation.js");

    let release!: () => void;
    const holder = withGitMutationMutex(
      {
        repoRoot: root,
        operation: "git-add",
        workflowMode: "branch_pr",
        mutationKind: "implementation_commit",
        taskId: "202601010101-ABCDEF",
      },
      async () => {
        await new Promise<void>((resolve) => {
          release = resolve;
        });
      },
    );

    const lockPath = await waitForLock(root);
    await expect(
      withGitMutationMutex(
        {
          repoRoot: root,
          operation: "git-add",
          workflowMode: "branch_pr",
          mutationKind: "implementation_commit",
          taskId: "202601010101-ABCDEF",
        },
        () => Promise.resolve(null),
      ),
    ).rejects.toMatchObject<CliError>({
      code: "E_GIT_RACE",
      context: {
        git_mutation_lock_path: lockPath,
        mutation_kind: "implementation_commit",
        task_id: "202601010101-ABCDEF",
      },
    });

    release();
    await holder;
    await expect(stat(lockPath)).rejects.toMatchObject({ code: "ENOENT" });
  });

  it("uses independent mutex keys for different worktree gitdirs", async () => {
    const commonDir = path.join(tmpdir(), "agentplane-common.git");
    const rootA = await makeRoot("worktree-a", {
      gitCommonDir: commonDir,
      gitDir: path.join(commonDir, "worktrees", "a"),
    });
    const rootB = await makeRoot("worktree-b", {
      gitCommonDir: commonDir,
      gitDir: path.join(commonDir, "worktrees", "b"),
    });
    const { resolveGitMutationMutexContext, withGitMutationMutex } =
      await import("./git-mutation.js");

    const [ctxA, ctxB] = await Promise.all([
      resolveGitMutationMutexContext({ repoRoot: rootA, operation: "git-add" }),
      resolveGitMutationMutexContext({ repoRoot: rootB, operation: "git-add" }),
    ]);
    expect(ctxA.worktreeId).not.toBe(ctxB.worktreeId);

    const results = await Promise.all([
      withGitMutationMutex({ repoRoot: rootA, operation: "git-add" }, () => Promise.resolve("a")),
      withGitMutationMutex({ repoRoot: rootB, operation: "git-add" }, () => Promise.resolve("b")),
    ]);
    expect(results).toEqual(["a", "b"]);
  });
});
