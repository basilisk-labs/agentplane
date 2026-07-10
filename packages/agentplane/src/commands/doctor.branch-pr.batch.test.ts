import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it, vi } from "vitest";

import { checkBranchPrBatchIncludedTaskDrift } from "./doctor/branch-pr.js";

describe("doctor branch_pr batch consistency", () => {
  const roots: string[] = [];

  afterEach(async () => {
    await Promise.all(roots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
  });

  it("accepts an included task closed on the landed commit after a primary PR rebase", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "agentplane-doctor-batch-rebase-"));
    roots.push(root);
    const primaryTaskId = "202604051200-PRIMARY";
    const includedTaskId = "202604051200-INCLUD";
    const preRebaseCommit = "1111111111111111111111111111111111111111";
    const landedCommit = "2222222222222222222222222222222222222222";
    await mkdir(path.join(root, ".agentplane", "tasks", primaryTaskId, "pr"), {
      recursive: true,
    });
    await writeFile(
      path.join(root, ".agentplane", "tasks", primaryTaskId, "pr", "meta.json"),
      JSON.stringify(
        {
          schema_version: 1,
          task_id: primaryTaskId,
          branch: `task/${primaryTaskId}/batch`,
          batch: {
            schema_version: 1,
            primary_task_id: primaryTaskId,
            included_task_ids: [includedTaskId],
            closure_policy: "all_or_fail",
          },
          created_at: "2026-04-05T11:00:00.000Z",
          updated_at: "2026-04-05T12:00:00.000Z",
          status: "MERGED",
          head_sha: preRebaseCommit,
          merge_commit: landedCommit,
          merged_at: "2026-04-05T12:00:00.000Z",
          verify: { status: "pass" },
        },
        null,
        2,
      ),
      "utf8",
    );

    const ctx = {
      backendId: "local",
      config: {
        workflow_mode: "branch_pr",
        paths: { workflow_dir: ".agentplane/tasks" },
      },
      resolvedProject: { gitRoot: root },
      taskBackend: {
        listTasks: vi.fn().mockResolvedValue([
          {
            id: primaryTaskId,
            status: "DONE",
            commit: { hash: preRebaseCommit, message: "Primary implementation before rebase" },
          },
          {
            id: includedTaskId,
            status: "DONE",
            commit: { hash: landedCommit, message: "Included task landed with primary PR" },
          },
        ]),
      },
    } as unknown as Parameters<typeof checkBranchPrBatchIncludedTaskDrift>[0];

    expect(await checkBranchPrBatchIncludedTaskDrift(ctx)).toHaveLength(0);
  });
});
