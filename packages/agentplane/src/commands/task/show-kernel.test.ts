import { afterEach, describe, expect, it, vi } from "vitest";
import { taskKernel } from "@agentplaneorg/core/tasks";
import {
  makeTaskBackendDouble,
  makeTaskCommandContext,
  makeTaskFixture,
} from "@agentplane/testkit/task";

import {
  makeKernelRecord,
  TASK_KERNEL_EXTENSION,
} from "../../adapters/task-backend/kernel-record.js";
import { cmdTaskShow } from "./show.js";

const mocks = vi.hoisted(() => ({ load: vi.fn(), identity: vi.fn() }));
vi.mock("../shared/task-backend.js", () => ({ loadTaskFromContext: mocks.load }));
vi.mock("./execution-authority-context.js", () => ({
  resolveLogicalRepositoryIdentity: mocks.identity,
}));
afterEach(() => vi.restoreAllMocks());

describe("task show canonical projection", () => {
  it("ignores a contradictory legacy status and rejects corrupted canonical records", async () => {
    const identity = taskKernel.kernelDigest("repository");
    const aggregate: taskKernel.TaskAggregate = {
      schema_version: 1,
      id: "T-1",
      revision: 1,
      state: "PLANNING",
      intent_digest: taskKernel.kernelDigest("intent"),
      current_plan: null,
      plan_history: [],
      work_items: {},
      final_validation: null,
      effects: [],
      mutation_receipts: {},
      controller_transfer: null,
      migration_receipts: [],
    };
    const record = makeKernelRecord(identity, aggregate, []);
    mocks.identity.mockResolvedValue(identity);
    const fixture = makeTaskFixture({
      id: "T-1",
      status: "DONE",
      extensions: { [TASK_KERNEL_EXTENSION]: record },
    });
    mocks.load.mockResolvedValue(fixture);
    const ctx = makeTaskCommandContext({ taskBackend: makeTaskBackendDouble() });
    const stdout = vi.spyOn(process.stdout, "write").mockReturnValue(true);
    await expect(
      cmdTaskShow({ ctx, cwd: ctx.resolvedProject.gitRoot, taskId: "T-1" }),
    ).resolves.toBe(0);
    expect(JSON.parse(String(stdout.mock.calls[0]?.[0]))).toMatchObject({
      source: "task_kernel",
      state: "PLANNING",
      status: "TODO",
    });
    mocks.load.mockResolvedValue({
      ...fixture,
      extensions: {
        [TASK_KERNEL_EXTENSION]: { ...record, digest: taskKernel.kernelDigest("wrong") },
      },
    });
    await expect(
      cmdTaskShow({ ctx, cwd: ctx.resolvedProject.gitRoot, taskId: "T-1" }),
    ).rejects.toMatchObject({ code: "E_VALIDATION" });
    expect(stdout).toHaveBeenCalledTimes(1);
  });
});
