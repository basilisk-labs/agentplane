import { lstat } from "node:fs/promises";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { mkGitRepoRoot } from "@agentplane/testkit";
import { resolveSupervisorTaskRunnerPaths } from "../task-run-paths.js";
import { readTaskRunnerActiveClaim } from "./task-run-active-claim.js";

describe("task-run active claim read-only inspection", () => {
  it("returns absent without creating runner claim directories", async () => {
    const root = await mkGitRepoRoot();
    const taskId = "TASK-READ-ONLY-ABSENT";
    const paths = await resolveSupervisorTaskRunnerPaths({
      git_root: root,
      workflow_dir: ".agentplane/tasks",
      task_id: taskId,
      run_id: "run-read-only-absent",
    });

    await expect(
      readTaskRunnerActiveClaim({
        git_root: root,
        workflow_dir: ".agentplane/tasks",
        task_id: taskId,
        run_id: "run-read-only-absent",
      }),
    ).resolves.toBeNull();
    await expect(lstat(path.join(paths.artifact_root, "agentplane"))).rejects.toMatchObject({
      code: "ENOENT",
    });
  });
});
