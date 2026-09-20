import { beforeEach, describe, expect, it, vi } from "vitest";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import { TASK_KERNEL_EXTENSION } from "../../adapters/task-backend/kernel-record.js";

if (typeof vi.hoisted !== "function") {
  Object.defineProperty(vi, "hoisted", { value: <T>(factory: () => T): T => factory() });
}

const mocks = vi.hoisted(() => ({
  createKernelRuntime: vi.fn(),
  requireKernelCommit: vi.fn((value: unknown): unknown => value),
  legacyReject: vi.fn(),
}));

vi.mock("./kernel-runtime-context.js", () => ({
  createKernelRuntime: mocks.createKernelRuntime,
  requireKernelCommit: mocks.requireKernelCommit,
}));
vi.mock("./plan.js", () => ({ cmdTaskPlanReject: mocks.legacyReject }));

import { makeRunTaskPlanRejectHandler } from "./plan-reject.command.js";

describe("task plan reject canonical routing", () => {
  beforeEach(() => vi.clearAllMocks());

  it("rejects the canonical plan instead of mutating only the task-centric projection", async () => {
    const plan = { revision: 2, digest: k.kernelDigest("plan"), state: "APPROVED" };
    const apply = vi.fn().mockResolvedValue({ committed: true });
    const input = vi.fn().mockImplementation((payload: unknown) =>
      Promise.resolve({
        command: payload,
        actor: { id: "agentplane:kernel-controller", kind: "SYSTEM", transport: "manual" },
      }),
    );
    const readApproval = vi.fn().mockResolvedValue({
      kind: "manual_operator",
      actor_id: "USER",
      invocation_id: `task-plan-reject:T-1:${k.kernelDigest("Revise verification scope")}`,
    });
    mocks.createKernelRuntime.mockResolvedValue({
      observe: vi.fn().mockResolvedValue({ fingerprint: k.kernelDigest("repository") }),
      checkpoint: vi.fn().mockResolvedValue(undefined),
      adapter: {
        read: vi.fn().mockResolvedValue({
          kind: "canonical",
          record: { aggregate: { current_plan: plan } },
        }),
      },
      native: { readApproval },
      input,
      lifecycle: { apply },
    });
    mocks.requireKernelCommit.mockReturnValue({
      record: { aggregate: { revision: 9 } },
    });
    const command = {
      taskBackend: {
        getTask: vi.fn().mockResolvedValue({
          id: "T-1",
          extensions: { [TASK_KERNEL_EXTENSION]: { schema_version: 1 } },
        }),
      },
    } as never;
    const write = vi.spyOn(process.stdout, "write").mockImplementation(() => true);

    const run = makeRunTaskPlanRejectHandler(() => Promise.resolve(command));
    await expect(
      run({ cwd: "/repo" } as never, {
        taskId: "T-1",
        by: "USER",
        note: "Revise verification scope",
      }),
    ).resolves.toBe(0);

    expect(mocks.legacyReject).not.toHaveBeenCalled();
    const [runtimeOptions] = mocks.createKernelRuntime.mock.calls[0] as [
      {
        task_id: string;
        transport: string;
        approval: { kind: string; actor_id: string };
      },
    ];
    expect(runtimeOptions).toMatchObject({ task_id: "T-1", transport: "manual" });
    expect(runtimeOptions.approval).toMatchObject({ kind: "manual_operator", actor_id: "USER" });
    const [payload, mutationId] = input.mock.calls[0] as [
      {
        kind: string;
        plan_revision: number;
        plan_digest: string;
        rejection_evidence_digest: string;
      },
      string,
    ];
    expect(payload).toMatchObject({
      kind: "reject_plan",
      plan_revision: 2,
      plan_digest: plan.digest,
    });
    expect(payload.rejection_evidence_digest).toMatch(/^sha256:[0-9a-f]{64}$/u);
    expect(mutationId).toMatch(/^reject:sha256:[0-9a-f]{64}$/u);
    const [appliedInput] = apply.mock.calls[0] as [{ actor: { id: string; kind: string } }];
    expect(appliedInput.actor).toEqual(expect.objectContaining({ id: "USER", kind: "USER" }));
    write.mockRestore();
  });
});
