import { describe, expect, it, vi } from "vitest";
import { taskKernel as k } from "@agentplaneorg/core/tasks";

import { TASK_KERNEL_EXTENSION } from "../../adapters/task-backend/kernel-record.js";
import type { TaskWriteOptions } from "../../backends/task-backend.js";
import {
  ensureKernelOperationalProjectionStatus,
  projectKernelOperationalEvidence,
  readKernelOperationalProjection,
} from "./kernel-operational-projection.js";

type ProjectedTask = {
  id: string;
  revision?: number;
  status?: string;
  commit?: { hash: string; message: string } | null;
  plan_approval?: { state: string; updated_at: string; updated_by: string; note: string };
  verification?: {
    state: string;
    attempts: number;
    updated_at?: string;
    updated_by?: string;
    note?: string;
  };
  quality_review?: {
    state: string;
    updated_by?: string;
    evaluated_sha?: string;
  };
  extensions?: Record<string, unknown>;
};

function taskWriter() {
  return vi.fn(
    (_task: ProjectedTask, _options?: TaskWriteOptions): Promise<void> => Promise.resolve(),
  );
}

describe("canonical operational evidence projection", () => {
  it("projects commit, verification and evaluator evidence without replacing Kernel state", async () => {
    const writeTask = taskWriter();
    const kernel = { kind: "canonical_task", digest: k.kernelDigest("kernel") };
    const task = {
      id: "T-1",
      revision: 7,
      verification: { state: "pending", attempts: 0 },
      extensions: { [TASK_KERNEL_EXTENSION]: kernel },
    };
    const evidence = {
      task_id: "T-1",
      work_order_id: k.kernelDigest("order"),
      implementation_commit: "a".repeat(40),
      implementation_tree: "b".repeat(40),
      evaluator_target: "a".repeat(40),
    } as never;

    await projectKernelOperationalEvidence({
      command: {
        taskBackend: { getTask: vi.fn().mockResolvedValue(task), writeTask },
      } as never,
      task_id: "T-1",
      repository_evidence: evidence,
      verification_evidence_digest: k.kernelDigest("verification"),
      review_identity_digest: k.kernelDigest("review"),
      evidence_refs: [".git/agentplane/kernel/exchanges/T-1/order/quality-report.json"],
      findings: ["Reviewed the canonical implementation and native evidence."],
      projected_at: "2026-09-18T00:00:00.000Z",
    });

    expect(writeTask).toHaveBeenCalledOnce();
    const [written, options] = writeTask.mock.calls[0]!;
    expect(options).toEqual({ expectedRevision: 7 });
    expect(written.revision).toBe(8);
    expect(written.status).toBe("DONE");
    expect(written.commit?.hash).toBe("a".repeat(40));
    expect(written.commit?.message).toBeTruthy();
    expect(written.plan_approval).toMatchObject({ state: "approved", updated_by: "USER" });
    expect(written.verification).toMatchObject({
      state: "ok",
      attempts: 1,
      updated_by: "SUPERVISOR",
    });
    expect(written.quality_review).toMatchObject({
      state: "pass",
      updated_by: "EVALUATOR",
      evaluated_sha: "a".repeat(40),
    });
    expect(written.extensions?.[TASK_KERNEL_EXTENSION]).toEqual(kernel);
    expect(readKernelOperationalProjection(written.extensions)).toMatchObject({
      source: "task_kernel",
      implementation_commit: "a".repeat(40),
    });
  });

  it("restores the pre-merge status projection after a Kernel effect write", async () => {
    const writeTask = taskWriter();
    const projectionContents = {
      schema_version: 1 as const,
      source: "task_kernel" as const,
      work_order_id: k.kernelDigest("order"),
      implementation_commit: "a".repeat(40),
      implementation_tree: "b".repeat(40),
      verification_evidence_digest: k.kernelDigest("verification"),
      review_identity_digest: k.kernelDigest("review"),
      evidence_refs: ["evidence"],
      findings: ["reviewed"],
      projected_at: "2026-09-18T00:00:00.000Z",
    };
    const projection = { ...projectionContents, digest: k.kernelDigest(projectionContents) };
    const task = {
      id: "T-1",
      revision: 9,
      status: "DOING",
      extensions: { "agentplane.kernel_operational_projection": projection },
    };

    await ensureKernelOperationalProjectionStatus({
      command: {
        taskBackend: { getTask: vi.fn().mockResolvedValue(task), writeTask },
      } as never,
      task_id: "T-1",
    });

    expect(writeTask).toHaveBeenCalledWith(
      { ...task, revision: 10, status: "DONE" },
      { expectedRevision: 9 },
    );
  });

  it("is idempotent for an identical evidence projection", async () => {
    const writeTask = taskWriter();
    const backend = {
      getTask: vi.fn(),
      writeTask,
    };
    const command = { taskBackend: backend } as never;
    const evidence = {
      task_id: "T-1",
      work_order_id: k.kernelDigest("order"),
      implementation_commit: "a".repeat(40),
      implementation_tree: "b".repeat(40),
      evaluator_target: "a".repeat(40),
    } as never;
    backend.getTask.mockResolvedValueOnce({
      id: "T-1",
      revision: 1,
      extensions: { [TASK_KERNEL_EXTENSION]: {} },
    });
    const input = {
      command,
      task_id: "T-1",
      repository_evidence: evidence,
      verification_evidence_digest: k.kernelDigest("verification"),
      review_identity_digest: k.kernelDigest("review"),
      evidence_refs: [".git/agentplane/kernel/exchanges/T-1/order/quality-report.json"],
      findings: ["Reviewed the canonical implementation and native evidence."],
      projected_at: "2026-09-18T00:00:00.000Z",
    };
    await projectKernelOperationalEvidence(input);
    const written = writeTask.mock.calls[0]![0];
    backend.getTask.mockResolvedValueOnce(written);
    await projectKernelOperationalEvidence(input);

    expect(writeTask).toHaveBeenCalledTimes(1);
  });
});
