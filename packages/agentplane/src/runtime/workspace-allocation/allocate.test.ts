import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { access, unlink, writeFile } from "node:fs/promises";
import path from "node:path";

import { mkGitRepoRootWithBranch } from "@agentplane/testkit";
import { defaultConfig } from "@agentplane/testkit/cli-core-pr-flow";
import { describe, expect, it } from "vitest";

import type { CommandContext } from "../../commands/shared/task-backend.js";
import type { TaskExecutionContext } from "../task-execution-context/index.js";
import {
  allocateTaskWorkspace,
  cleanupTaskWorkspace,
  workspaceAllocationIdentity,
} from "./allocate.js";

const execFileAsync = promisify(execFile);

async function fixture(): Promise<{
  root: string;
  ctx: CommandContext;
  execution: TaskExecutionContext;
}> {
  const root = await mkGitRepoRootWithBranch("main");
  await execFileAsync("git", ["commit", "--allow-empty", "-m", "base"], { cwd: root });
  const { stdout } = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });
  const execution = Object.freeze({
    schema_version: 1,
    primary_task_id: "TASK-1",
    task_ids: Object.freeze(["TASK-1"]),
    repository_mode: "direct",
    selected_mode: "direct",
    requested_mode: "auto",
    route_source: "execution_route",
    reason_codes: Object.freeze(["automatic_safe_direct"]),
    base_ref: "main",
    base_sha: stdout.trim(),
    authoritative_task_source: "base_checkout",
  }) satisfies TaskExecutionContext;
  return {
    root,
    execution,
    ctx: {
      resolvedProject: { gitRoot: root },
      config: defaultConfig(),
      memo: {},
    } as unknown as CommandContext,
  };
}

describe("workspace allocation", () => {
  it("allocates direct work outside the primary checkout and keeps identity path-neutral", async () => {
    const { root, ctx, execution } = await fixture();
    const allocation = await allocateTaskWorkspace({ ctx, execution });

    expect(allocation.workspace_root).not.toBe(root);
    expect(allocation.branch).toBe("agentplane/workspace/TASK-1");
    expect(allocation.identity).toBe(workspaceAllocationIdentity(execution));
    await expect(allocateTaskWorkspace({ ctx: { ...ctx, memo: {} }, execution })).rejects.toThrow(
      /already owns workspace lease/u,
    );

    await cleanupTaskWorkspace(allocation);
    const { stdout } = await execFileAsync("git", ["worktree", "list", "--porcelain"], {
      cwd: root,
    });
    expect(stdout).not.toContain(allocation.workspace_root);
    const reallocated = await allocateTaskWorkspace({ ctx: { ...ctx, memo: {} }, execution });
    expect(reallocated.workspace_root).toBe(allocation.workspace_root);
    await cleanupTaskWorkspace(reallocated);
  });

  it("isolates three parallel direct tasks without cross-task filesystem contamination", async () => {
    const { root, ctx, execution } = await fixture();
    const executions = ["TASK-A", "TASK-B", "TASK-C"].map(
      (taskId) =>
        ({
          ...execution,
          primary_task_id: taskId,
          task_ids: [taskId],
        }) satisfies TaskExecutionContext,
    );
    const allocations = await Promise.all(
      executions.map((taskExecution) =>
        allocateTaskWorkspace({ ctx: { ...ctx, memo: {} }, execution: taskExecution }),
      ),
    );
    expect(new Set(allocations.map((allocation) => allocation.workspace_root)).size).toBe(3);

    await Promise.all(
      allocations.map((allocation, index) =>
        writeFile(
          path.join(allocation.workspace_root, `private-${index}.txt`),
          `${index}\n`,
          "utf8",
        ),
      ),
    );
    await expect(access(path.join(root, "private-0.txt"))).rejects.toMatchObject({
      code: "ENOENT",
    });
    for (const [index, allocation] of allocations.entries()) {
      for (const otherIndex of [0, 1, 2].filter((candidate) => candidate !== index)) {
        await expect(
          access(path.join(allocation.workspace_root, `private-${otherIndex}.txt`)),
        ).rejects.toMatchObject({ code: "ENOENT" });
      }
    }

    await Promise.all(
      allocations.map(async (allocation, index) => {
        await unlink(path.join(allocation.workspace_root, `private-${index}.txt`));
        await cleanupTaskWorkspace(allocation);
      }),
    );
  });
});
