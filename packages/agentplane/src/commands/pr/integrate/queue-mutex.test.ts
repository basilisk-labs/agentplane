import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { withGitMutationMutex } from "../../../shared/git-mutation.js";
import { withIntegrationQueueMutex } from "./queue-state.js";

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

async function makeRoot(name: string, identity?: GitIdentity): Promise<string> {
  const root = await mkdtemp(path.join(tmpdir(), `agentplane-${name}-`));
  roots.push(root);
  if (identity) identities.set(root, identity);
  return root;
}

describe("integration queue mutex coordination", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    identities = new Map();
    mocks.gitCurrentBranch.mockResolvedValue("main");
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

  it("keeps the integration queue lane independent from task worktree Git writers", async () => {
    const commonDir = path.join(tmpdir(), "agentplane-common.git");
    const baseRoot = await makeRoot("base");
    const taskRootA = await makeRoot("task-a", {
      gitCommonDir: commonDir,
      gitDir: path.join(commonDir, "worktrees", "task-a"),
    });
    const taskRootB = await makeRoot("task-b", {
      gitCommonDir: commonDir,
      gitDir: path.join(commonDir, "worktrees", "task-b"),
    });

    let release!: () => void;
    const queueHolder = withIntegrationQueueMutex(baseRoot, async () => {
      await new Promise<void>((resolve) => {
        release = resolve;
      });
    });

    const results = await Promise.all([
      withGitMutationMutex(
        {
          repoRoot: taskRootA,
          operation: "git-add",
          workflowMode: "branch_pr",
          mutationKind: "implementation_commit",
          taskId: "202601010101-TASKA",
        },
        () => Promise.resolve("task-a"),
      ),
      withGitMutationMutex(
        {
          repoRoot: taskRootB,
          operation: "git-add",
          workflowMode: "branch_pr",
          mutationKind: "implementation_commit",
          taskId: "202601010101-TASKB",
        },
        () => Promise.resolve("task-b"),
      ),
    ]);

    expect(results).toEqual(["task-a", "task-b"]);
    release();
    await queueHolder;
  });
});
