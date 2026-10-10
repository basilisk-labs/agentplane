import { beforeEach, describe, expect, it, vi } from "vitest";
import type { CommandContext } from "./task-backend.js";
import type { TaskData } from "../../backends/task-backend.js";
import { makeTaskFixture } from "@agentplane/testkit/task";

const mocks = vi.hoisted(() => ({
  load: vi.fn<(request: { taskId: string }) => Promise<TaskData>>(),
  scan: vi.fn(),
  readKernel: vi.fn(),
}));
vi.mock("./task-backend.js", () => ({
  backendUsesLocalTaskStore: () => true,
  loadTaskFromContext: mocks.load,
  listTaskSummariesMemo: mocks.scan,
  loadTaskFromBranchSnapshot: vi.fn(),
}));
vi.mock("../task/kernel-read.js", () => ({ readTaskKernel: mocks.readKernel }));
import { ensureReconciledBeforeMutation } from "./reconcile-check.js";

describe("canonical owner mutation reconciliation", () => {
  beforeEach(() => vi.resetAllMocks());

  it.each([
    "healthy",
    "legacy-dependency",
    "downgraded-dependency",
    "missing-dependency",
    "malformed-dependency",
    "missing-owner",
    "malformed-owner",
  ])("checks only the owner and required dependency closure: %s", async (scenario) => {
    const tasks = new Map<string, TaskData>([
      [
        "owner",
        makeTaskFixture({
          id: "owner",
          depends_on: ["dependency"],
          extensions: { task_kernel: {} },
        }),
      ],
      ["dependency", makeTaskFixture({ id: "dependency", depends_on: ["transitive"] })],
      ["transitive", makeTaskFixture({ id: "transitive" })],
    ]);
    if (scenario === "missing-dependency") tasks.delete("transitive");
    if (scenario === "missing-owner") tasks.delete("owner");
    mocks.load.mockImplementation(({ taskId }) => {
      if (scenario === "downgraded-dependency" && taskId === "dependency") {
        return Promise.reject(
          new Error("Authoritative dependency is missing its known canonical record"),
        );
      }
      const task = tasks.get(taskId);
      if (!task) return Promise.reject(new Error(`Missing required task ${taskId}`));
      return Promise.resolve(task);
    });
    mocks.readKernel.mockImplementation((_ctx, taskId: string) =>
      Promise.resolve({
        kind:
          (scenario === "malformed-dependency" && taskId === "dependency") ||
          (scenario === "malformed-owner" && taskId === "owner")
            ? "malformed"
            : scenario === "legacy-dependency" && taskId !== "owner"
              ? "legacy_unmigrated"
              : "canonical",
      }),
    );
    mocks.scan.mockRejectedValue(new Error("Unrelated task has no README"));
    const ctx = {
      git: { statusChangedPaths: vi.fn().mockResolvedValue([]) },
      taskBackend: { capabilities: { atomic_task_record: true } },
    } as unknown as CommandContext;
    const operation = ensureReconciledBeforeMutation({
      ctx,
      command: "commit",
      taskIds: ["owner"],
    });
    if (scenario === "healthy" || scenario === "legacy-dependency") {
      await expect(operation).resolves.toBeUndefined();
      expect(mocks.load.mock.calls.map(([request]) => request.taskId)).toEqual([
        "owner",
        "dependency",
        "transitive",
      ]);
      expect(mocks.readKernel).toHaveBeenCalledTimes(3);
    } else {
      await expect(operation).rejects.toMatchObject({ code: "E_VALIDATION" });
    }
    expect(mocks.scan).not.toHaveBeenCalled();
  });
});
