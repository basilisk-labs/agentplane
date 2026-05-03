import { describe, expect, it } from "vitest";

import type { TaskData } from "../../../backends/task-backend.js";
import type { CommandContext } from "../../shared/task-backend.js";
import { validateBranchPrBatchIncludedTasks } from "./batch-validation.js";

function makeTask(overrides: Partial<TaskData> = {}): TaskData {
  return {
    id: "202601010102-BBBBB",
    title: "Included task",
    description: "Included task",
    status: "DOING",
    priority: "high",
    owner: "CODER",
    depends_on: [],
    tags: ["code"],
    verify: [],
    verification: { state: "ok", updated_at: null, updated_by: null, note: null },
    ...overrides,
  };
}

function makeCtx(tasks: Map<string, TaskData>): CommandContext {
  return {
    taskBackend: {
      getTask: async (taskId: string) => tasks.get(taskId) ?? null,
    },
    config: {
      paths: { workflow_dir: ".agentplane/tasks" },
    },
    resolvedProject: { gitRoot: "/repo" },
  } as CommandContext;
}

describe("validateBranchPrBatchIncludedTasks", () => {
  it("returns sorted included task ids when each included task is verified and unowned", async () => {
    const tasks = new Map([
      ["202601010103-CCCCC", makeTask({ id: "202601010103-CCCCC" })],
      ["202601010102-BBBBB", makeTask({ id: "202601010102-BBBBB" })],
    ]);

    await expect(
      validateBranchPrBatchIncludedTasks({
        ctx: makeCtx(tasks),
        primaryTaskId: "202601010101-AAAAA",
        includeTaskIds: ["202601010103-CCCCC", "202601010102-BBBBB"],
        primaryBranch: "task/202601010101-AAAAA/primary",
        deps: {
          resolveTaskBranch: async () => null,
          readPrMeta: async () => null,
        },
      }),
    ).resolves.toEqual(["202601010102-BBBBB", "202601010103-CCCCC"]);
  });

  it("rejects invalid batch membership before PR artifacts are published", async () => {
    const doneTask = makeTask({ id: "202601010102-BBBBB", status: "DONE" });
    const pendingTask = makeTask({
      id: "202601010103-CCCCC",
      verification: { state: "pending", updated_at: null, updated_by: null, note: null },
    });
    const tasks = new Map([
      [doneTask.id, doneTask],
      [pendingTask.id, pendingTask],
      ["202601010105-EEEEE", makeTask({ id: "202601010105-EEEEE" })],
    ]);

    await expect(
      validateBranchPrBatchIncludedTasks({
        ctx: makeCtx(tasks),
        primaryTaskId: "202601010101-AAAAA",
        includeTaskIds: [
          "202601010101-AAAAA",
          "202601010102-BBBBB",
          "202601010102-BBBBB",
          "202601010103-CCCCC",
          "202601010104-DDDDD",
          "202601010105-EEEEE",
        ],
        primaryBranch: "task/202601010101-AAAAA/primary",
        deps: {
          resolveTaskBranch: async (taskId) =>
            taskId === "202601010103-CCCCC" ? "task/202601010103-CCCCC/owned" : null,
          readPrMeta: async (taskId) =>
            taskId === "202601010105-EEEEE"
              ? {
                  schema_version: 1,
                  task_id: "202601010105-EEEEE",
                  branch: "task/202601010105-EEEEE/pr",
                  created_at: "2026-01-27T00:00:00Z",
                  updated_at: "2026-01-27T00:00:00Z",
                  verify: { status: "skipped" },
                }
              : null,
        },
      }),
    ).rejects.toThrow(
      [
        "Invalid branch_pr batch include-task selection:",
        "include-task 202601010101-AAAAA points at the primary task",
        "include-task 202601010102-BBBBB is already DONE",
        "include-task 202601010102-BBBBB is duplicated",
        "include-task 202601010103-CCCCC already owns branch task/202601010103-CCCCC/owned",
        "include-task 202601010103-CCCCC does not have ok verification",
        "include-task 202601010104-DDDDD does not exist",
        "include-task 202601010105-EEEEE already has PR metadata for branch task/202601010105-EEEEE/pr",
      ].join("\n- "),
    );
  });
});
