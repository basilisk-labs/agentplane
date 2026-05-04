import { mkdtemp, mkdir, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it, vi } from "vitest";

import {
  checkBranchPrBatchIncludedTaskDrift,
  checkBranchPrDoneTaskOpenPrDrift,
  checkBranchPrShippedTaskDrift,
} from "./doctor/branch-pr.js";

const workspaces: string[] = [];

async function mkWorkspace(): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-doctor-branch-pr-memo-"));
  workspaces.push(root);
  await mkdir(path.join(root, ".agentplane", "tasks"), { recursive: true });
  return root;
}

afterEach(async () => {
  while (workspaces.length > 0) {
    const root = workspaces.pop();
    if (!root) continue;
    await rm(root, { recursive: true, force: true });
  }
});

describe("doctor branch_pr memoization", () => {
  it("reuses the local task scan across branch_pr doctor checks", async () => {
    const root = await mkWorkspace();
    const listTasks = vi.fn().mockResolvedValue([
      { id: "202605041200-ABC123", status: "TODO", commit: null },
      { id: "202605041201-DEF456", status: "DONE", commit: null },
    ]);
    const ctx = {
      backendId: "local",
      config: {
        workflow_mode: "branch_pr",
        paths: { workflow_dir: ".agentplane/tasks" },
      },
      memo: {},
      resolvedProject: { agentplaneDir: path.join(root, ".agentplane"), gitRoot: root },
      taskBackend: { listTasks },
    } as unknown as Parameters<typeof checkBranchPrShippedTaskDrift>[0];

    await checkBranchPrShippedTaskDrift(ctx);
    await checkBranchPrDoneTaskOpenPrDrift(ctx);
    await checkBranchPrBatchIncludedTaskDrift(ctx);

    expect(listTasks).toHaveBeenCalledTimes(1);
  });
});
