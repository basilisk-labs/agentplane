import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";

import type { TaskData } from "../../backends/task-backend.js";

const gitRevParse = vi.hoisted(() => vi.fn());

vi.mock("@agentplaneorg/core/git", async (importOriginal) => ({
  ...(await importOriginal<Record<string, unknown>>()),
  gitRevParse,
}));

import { verificationRecordPaths } from "./task-verification-records.js";

const tempRoots: string[] = [];

afterEach(async () => {
  gitRevParse.mockReset();
  await Promise.all(tempRoots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
});

describe("task verification records", () => {
  it("rejects stale record metadata before resolving semantic Git history", async () => {
    const gitRoot = await mkdtemp(path.join(os.tmpdir(), "agentplane-verification-record-"));
    tempRoots.push(gitRoot);
    const taskId = "T-1";
    const taskRoot = path.join(gitRoot, ".agentplane", "tasks", taskId);
    const verificationDir = path.join(taskRoot, "verification");
    await mkdir(verificationDir, { recursive: true });
    await writeFile(
      path.join(verificationDir, "stale.json"),
      `${JSON.stringify({
        implementation_sha: "b".repeat(40),
        recorded_at: "2026-01-01T00:00:00.000Z",
      })}\n`,
      "utf8",
    );
    const task = {
      id: taskId,
      title: "Task",
      description: "Task",
      status: "DOING",
      priority: "med",
      owner: "CODER",
      depends_on: [],
      tags: ["code"],
      verify: ["bun test"],
      verification: {
        state: "ok" as const,
        updated_at: "2026-01-02T00:00:00.000Z",
        updated_by: "TESTER",
        note: "Current verification",
      },
      sections: { "Verify Steps": "Run bun test. Expected: pass." },
    } satisfies TaskData;

    await expect(
      verificationRecordPaths(taskRoot, task, "a".repeat(40), {
        gitRoot,
        workflowDir: ".agentplane/tasks",
        taskIds: [taskId],
        workflowMode: "branch_pr",
      }),
    ).resolves.toEqual([]);
    expect(gitRevParse).not.toHaveBeenCalled();
  });
});
