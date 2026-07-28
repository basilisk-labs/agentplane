import { readdir } from "node:fs/promises";
import path from "node:path";
import { beforeEach, describe, expect, it, vi } from "vitest";

import * as taskBackend from "../../backends/task-backend.js";
import { cmdTaskAdd } from "../workflow.js";
import { loadCommandContext } from "../shared/task-backend.js";
import { cmdVerifyParsed } from "./verify-record.js";
import { mkGitRepoRoot, writeDefaultConfig } from "@agentplane/testkit";

const mocks = vi.hoisted(() => ({
  writeJsonStableIfChanged: vi.fn(),
}));

vi.mock("../../shared/write-if-changed.js", async (importOriginal) => {
  const actualUnknown: unknown = await importOriginal();
  const actual =
    actualUnknown && typeof actualUnknown === "object"
      ? (actualUnknown as Record<string, unknown>)
      : {};
  return { ...actual, writeJsonStableIfChanged: mocks.writeJsonStableIfChanged };
});

async function makeRepo(): Promise<string> {
  const root = await mkGitRepoRoot();
  await writeDefaultConfig(root);
  return root;
}

async function addTask(root: string, taskId: string): Promise<void> {
  await cmdTaskAdd({
    cwd: root,
    taskIds: [taskId],
    title: "Task",
    description: "Desc",
    status: "TODO",
    priority: "med",
    owner: "CODER",
    tags: ["nodejs"],
    dependsOn: [],
    verify: [],
    commentAuthor: null,
    commentBody: null,
  });
}

describe("task verification durability", () => {
  beforeEach(() => {
    mocks.writeJsonStableIfChanged.mockReset();
  });

  it("fails closed when durable verification record creation fails", async () => {
    const root = await makeRepo();
    const taskId = "202602050900-V1F4F";
    await addTask(root, taskId);
    const ctx = await loadCommandContext({ cwd: root, rootOverride: null });
    mocks.writeJsonStableIfChanged.mockRejectedValueOnce(new Error("disk full"));

    await expect(
      cmdVerifyParsed({
        ctx,
        cwd: root,
        rootOverride: undefined,
        taskId,
        state: "ok",
        by: "REVIEWER",
        note: "Looks good",
        quiet: true,
      }),
    ).rejects.toThrow("disk full");

    const { backend } = await taskBackend.loadTaskBackend({ cwd: root, rootOverride: null });
    const task = await backend.getTask(taskId);
    expect(task?.verification?.state).toBe("pending");
    await expect(
      readdir(path.join(root, ".agentplane", "tasks", taskId, "verification")),
    ).resolves.toEqual([]);
  });
});
