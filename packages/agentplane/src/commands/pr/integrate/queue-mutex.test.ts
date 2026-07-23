import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { withGitMutationMutex } from "../../../shared/git-mutation.js";
import {
  emptyIntegrationQueue,
  readIntegrationQueue,
  upsertQueuedEntry,
  withIntegrationQueueMutex,
  writeIntegrationQueue,
} from "./queue-state.js";

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

  it("rejects a legacy enqueue writer while the final integration critical section is held", async () => {
    const root = await makeRoot("legacy-writer");
    const initial = upsertQueuedEntry(emptyIntegrationQueue(), {
      task_id: "T-1",
      branch: "task/T-1/work",
      base: "main",
      head_sha: "head-1",
      base_sha: "base-1",
      changed_paths: ["src/work.ts"],
      pr_number: 101,
      pr_url: "https://example.invalid/pull/101",
      priority: 0,
    });
    await writeIntegrationQueue(root, initial);

    let release!: () => void;
    const critical = withIntegrationQueueMutex(root, async () => {
      await new Promise<void>((resolve) => {
        release = resolve;
      });
    });
    await new Promise((resolve) => setTimeout(resolve, 10));

    await expect(
      withIntegrationQueueMutex(root, async () => {
        const current = await readIntegrationQueue(root);
        await writeIntegrationQueue(
          root,
          upsertQueuedEntry(current, {
            task_id: "T-1",
            branch: "task/T-1/work",
            base: "main",
            head_sha: "head-2",
            base_sha: "base-1",
            changed_paths: ["src/work.ts"],
            pr_number: 101,
            pr_url: "https://example.invalid/pull/101",
            priority: 0,
          }),
        );
      }),
    ).rejects.toMatchObject({ code: "E_GIT_RACE" });
    const currentQueue = await readIntegrationQueue(root);
    expect(currentQueue.entries[0]?.head_sha).toBe("head-1");

    release();
    await critical;
  });
});
