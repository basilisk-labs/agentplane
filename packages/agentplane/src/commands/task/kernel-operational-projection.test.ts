import { describe, expect, it, vi } from "vitest";
import { taskKernel as k } from "@agentplaneorg/core/tasks";

import { TASK_KERNEL_EXTENSION } from "../../adapters/task-backend/kernel-record.js";
import { taskRecordToData } from "../../backends/task-backend/shared/record.js";
import type { TaskWriteOptions } from "../../backends/task-backend.js";
import {
  ensureKernelOperationalProjectionEvidence,
  projectKernelOperationalEvidence,
  readKernelOperationalProjection,
  kernelProjectedReviewMatches,
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
  return vi.fn((_task: ProjectedTask, _options?: TaskWriteOptions): Promise<void> =>
    Promise.resolve(),
  );
}

describe("canonical operational evidence projection", () => {
  it("rejects malformed persisted fields even when their digest is recomputed", () => {
    const contents = {
      schema_version: 1,
      source: "task_kernel",
      work_order_id: k.kernelDigest("order"),
      implementation_commit: "a".repeat(40),
      implementation_tree: "b".repeat(40),
      verification_evidence_digest: k.kernelDigest("verification"),
      review_identity_digest: k.kernelDigest("review"),
      evidence_refs: ["evidence"],
      findings: ["reviewed"],
      projected_at: "2026-10-10T00:00:00.000Z",
    };
    const key = "agentplane.kernel_operational_projection";
    const valid = { ...contents, digest: k.kernelDigest(contents) };
    expect(readKernelOperationalProjection({ [key]: valid })).toEqual(valid);

    for (const [field, badValue] of [
      ["work_order_id", undefined],
      ["implementation_commit", 42],
      ["implementation_tree", undefined],
      ["verification_evidence_digest", null],
      ["review_identity_digest", undefined],
      ["evidence_refs", ["evidence", 42]],
      ["findings", undefined],
      ["findings", ["reviewed", false]],
      ["projected_at", {}],
    ] as const) {
      const malformed: Record<string, unknown> = { ...contents };
      if (badValue === undefined) delete malformed[field];
      else malformed[field] = badValue;
      malformed.digest = k.kernelDigest(malformed);
      expect(readKernelOperationalProjection({ [key]: malformed }), field).toBeNull();
    }
  });

  it("projects commit, verification and evaluator evidence without replacing Kernel state", async () => {
    const writeTask = taskWriter();
    const kernel = { kind: "canonical_task", digest: k.kernelDigest("kernel") };
    const task = {
      id: "T-1",
      revision: 7,
      status: "DOING",
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
    expect(written.status).toBe("DOING");
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

  it("preserves accepted verification metadata during the initial projection", async () => {
    const writeTask = taskWriter();
    const verification = {
      state: "ok",
      attempts: 2,
      updated_at: "2026-09-17T00:00:00.000Z",
      updated_by: "SUPERVISOR",
      note: "Verified: canonical Task Kernel final checks passed.",
    };
    const task = {
      id: "T-1",
      revision: 7,
      verification,
      extensions: { [TASK_KERNEL_EXTENSION]: { kind: "canonical_task" } },
    };

    await projectKernelOperationalEvidence({
      command: {
        taskBackend: { getTask: vi.fn().mockResolvedValue(task), writeTask },
      } as never,
      task_id: "T-1",
      repository_evidence: {
        task_id: "T-1",
        work_order_id: k.kernelDigest("order"),
        implementation_commit: "a".repeat(40),
        implementation_tree: "b".repeat(40),
        evaluator_target: "a".repeat(40),
      } as never,
      verification_evidence_digest: k.kernelDigest("verification"),
      review_identity_digest: k.kernelDigest("review"),
      evidence_refs: ["evidence"],
      findings: ["reviewed"],
      projected_at: "2026-09-18T00:00:00.000Z",
    });

    expect(writeTask.mock.calls[0]![0].verification).toEqual(verification);
  });

  it("restores evidence without changing the Kernel-derived status", async () => {
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

    await ensureKernelOperationalProjectionEvidence({
      command: {
        taskBackend: { getTask: vi.fn().mockResolvedValue(task), writeTask },
      } as never,
      task_id: "T-1",
    });

    expect(writeTask).toHaveBeenCalledOnce();
    const [written, options] = writeTask.mock.calls[0]!;
    expect(options).toEqual({ expectedRevision: 9 });
    expect(written).toMatchObject({ ...task, revision: 10, status: "DOING" });
    expect(written.verification).toMatchObject({
      state: "ok",
      attempts: 1,
      note: `Canonical validation ${k.kernelDigest("verification")}`,
    });
  });

  it("projects accepted timing as distinct from PASS after canonical acceptance", async () => {
    const writeTask = taskWriter();
    const fingerprint = k.kernelDigest("current-repository");
    const failureEvidence = k.kernelDigest("failed-final-validation");
    const planDigest = k.kernelDigest("approved-plan");
    const validation = {
      status: "FAILED" as const,
      identity: {
        implementation_identity: fingerprint,
        check_id: "canonical-final-contracts-v2",
        command_digest: k.kernelDigest("commands"),
        toolchain_digest: k.kernelDigest("toolchain"),
        environment_digest: k.kernelDigest("environment"),
      },
      evidence_digests: [failureEvidence],
      observed_at: "2026-10-24T00:00:00.000Z",
    };
    const aggregate = {
      id: "T-1",
      state: "FINAL_VALIDATION",
      current_plan: { state: "APPROVED", revision: 1, digest: planDigest, work_items: [] },
      work_items: {},
      effects: [],
      final_validation: validation,
      final_timing_exception: {
        schema_version: 1,
        kind: "timing_only",
        task_id: "T-1",
        plan_revision: 1,
        plan_digest: planDigest,
        validation_digest: k.kernelDigest(validation),
        failure_evidence_digest: failureEvidence,
        implementation_identity: fingerprint,
        acceptance_fingerprint: fingerprint,
        command_digest: validation.identity.command_digest,
        environment_digest: validation.identity.environment_digest,
        failed_check_id: "full-suite",
        budget_ms: 1_440_000,
        duration_ms: 1_463_240,
        max_overage_ms: 30_000,
        hosted_head_sha: "a".repeat(40),
        hosted_evidence_digest: k.kernelDigest("hosted-green"),
        approval_evidence_digest: k.kernelDigest("user-approval"),
        hosted_required_checks: ["unit", "lint"],
        approval_mode: "signed_user_receipt",
        approval_actor_id: "USER:release-owner@trusted-issuer",
        approved_by: "USER",
        accepted_at: "2026-10-24T00:00:00.000Z",
      },
    };
    const kernelContents = { kind: "canonical_task", aggregate };
    const projectionContents = {
      schema_version: 1 as const,
      source: "task_kernel" as const,
      work_order_id: k.kernelDigest("order"),
      implementation_commit: "a".repeat(40),
      implementation_tree: "b".repeat(40),
      verification_evidence_digest: k.kernelDigest("work-item"),
      review_identity_digest: k.kernelDigest("review"),
      evidence_refs: ["quality-report.json"],
      findings: ["reviewed"],
      projected_at: "2026-10-24T00:00:00.000Z",
    };
    const task = {
      id: "T-1",
      revision: 9,
      verification: { state: "ok", attempts: 1 },
      extensions: {
        task_kernel: { ...kernelContents, digest: k.kernelDigest(kernelContents) },
        "agentplane.kernel_operational_projection": {
          ...projectionContents,
          digest: k.kernelDigest(projectionContents),
        },
      },
    };
    await ensureKernelOperationalProjectionEvidence({
      command: { taskBackend: { getTask: vi.fn().mockResolvedValue(task), writeTask } } as never,
      task_id: "T-1",
      verification_evidence_digest: failureEvidence,
    });
    expect(writeTask.mock.calls[0]![0].verification).toMatchObject({
      state: "accepted_timing_exception",
      note: `Accepted timing exception for FAILED canonical validation ${failureEvidence}`,
    });
  });

  it("synchronizes the projection with restored final-validation evidence", async () => {
    const writeTask = taskWriter();
    const projectionContents = {
      schema_version: 1 as const,
      source: "task_kernel" as const,
      work_order_id: k.kernelDigest("order"),
      implementation_commit: "a".repeat(40),
      implementation_tree: "b".repeat(40),
      verification_evidence_digest: k.kernelDigest("work-item-verification"),
      review_identity_digest: k.kernelDigest("review"),
      evidence_refs: ["evidence"],
      findings: ["reviewed"],
      projected_at: "2026-09-18T00:00:00.000Z",
    };
    const projection = { ...projectionContents, digest: k.kernelDigest(projectionContents) };
    const task = {
      id: "T-1",
      revision: 9,
      status: "DONE",
      verification: { state: "ok", attempts: 1, note: "old" },
      extensions: { "agentplane.kernel_operational_projection": projection },
    };
    const finalEvidence = k.kernelDigest("final-validation");

    await ensureKernelOperationalProjectionEvidence({
      command: {
        taskBackend: { getTask: vi.fn().mockResolvedValue(task), writeTask },
      } as never,
      task_id: "T-1",
      verification_evidence_digest: finalEvidence,
    });

    const written = writeTask.mock.calls[0]![0];
    expect(readKernelOperationalProjection(written.extensions)).toMatchObject({
      verification_evidence_digest: finalEvidence,
      review_identity_digest: k.kernelDigest("review"),
    });
    expect(written.verification).toEqual(task.verification);
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
  it.each([
    ["trailing LF", ["reviewed\n"], ["evidence\n"]],
    [
      "CRLF and outer whitespace",
      [" \treviewed\r\n", "second finding"],
      [" evidence\t", "second evidence"],
    ],
    ["blank entries", ["reviewed", " \r\n"], ["evidence", "\t"]],
  ])(
    "keeps a %s projection idempotent after real Task readback",
    async (_name, findings, evidenceRefs) => {
      const writeTask = taskWriter();
      const backend = { getTask: vi.fn(), writeTask };
      backend.getTask.mockResolvedValue({
        id: "T-1",
        revision: 1,
        extensions: { [TASK_KERNEL_EXTENSION]: {} },
      });
      const input = {
        command: { taskBackend: backend } as never,
        task_id: "T-1",
        repository_evidence: {
          task_id: "T-1",
          work_order_id: k.kernelDigest("order"),
          implementation_commit: "a".repeat(40),
          implementation_tree: "b".repeat(40),
          evaluator_target: "a".repeat(40),
        } as never,
        verification_evidence_digest: k.kernelDigest("validation"),
        review_identity_digest: k.kernelDigest({ findings, evidenceRefs }),
        evidence_refs: evidenceRefs as string[],
        findings: findings as string[],
        projected_at: "2026-10-10T00:00:00Z",
      };
      await projectKernelOperationalEvidence(input);
      const written = writeTask.mock.calls[0]![0];
      const projection = readKernelOperationalProjection(written.extensions)!;
      const rawDigest = k.kernelDigest(projection);
      const readback = taskRecordToData({ id: "T-1", frontmatter: written, body: "" } as never);
      expect(projection.findings).toEqual(findings);
      expect(projection.evidence_refs).toEqual(evidenceRefs);
      expect(readback.quality_review?.findings).toEqual(
        (findings as string[]).map((x) => x.trim()).filter(Boolean),
      );
      expect(kernelProjectedReviewMatches(readback, projection)).toBe(true);
      backend.getTask.mockResolvedValue(readback);
      await projectKernelOperationalEvidence(input);
      expect(writeTask).toHaveBeenCalledTimes(1);
      expect(k.kernelDigest(projection)).toBe(rawDigest);
      expect(projection.review_identity_digest).toBe(input.review_identity_digest);
      for (const changed of [
        { state: "rework" },
        { provenance: "human_supplied" },
        { evaluated_sha: "c".repeat(40) },
        { review_identity_digest: k.kernelDigest("foreign review") },
        { updated_at: "2026-10-11T00:00:00Z" },
        { updated_by: "USER" },
        { note: "different review" },
        { evidence_refs: ["different evidence"] },
        { findings: ["different finding"] },
        { findings: null },
        { findings: [" reviewed "] },
      ]) {
        expect(
          kernelProjectedReviewMatches(
            { quality_review: { ...readback.quality_review, ...changed } } as never,
            projection,
          ),
        ).toBe(false);
      }
      expect(kernelProjectedReviewMatches({ quality_review: null }, projection)).toBe(false);
      if (readback.quality_review!.findings!.length > 1) {
        expect(
          kernelProjectedReviewMatches(
            {
              quality_review: {
                ...readback.quality_review,
                findings: readback.quality_review!.findings!.toReversed(),
              },
            } as never,
            projection,
          ),
        ).toBe(false);
      }
      expect(
        kernelProjectedReviewMatches(
          {
            quality_review: {
              ...readback.quality_review,
              findings: [...readback.quality_review!.findings!, "reviewed"],
            },
          } as never,
          projection,
        ),
      ).toBe(false);
    },
  );
  it("repairs a split compatibility review from the same authenticated projection", async () => {
    const writeTask = taskWriter();
    const backend = { getTask: vi.fn(), writeTask };
    const input = {
      command: { taskBackend: backend } as never,
      task_id: "T-1",
      repository_evidence: {
        task_id: "T-1",
        work_order_id: k.kernelDigest("order"),
        implementation_commit: "a".repeat(40),
        implementation_tree: "b".repeat(40),
        evaluator_target: "a".repeat(40),
      } as never,
      verification_evidence_digest: k.kernelDigest("validation"),
      review_identity_digest: k.kernelDigest("native review"),
      evidence_refs: ["native evidence"],
      findings: ["Native review passed"],
      projected_at: "2026-10-10T00:00:00Z",
    };
    backend.getTask.mockResolvedValue({
      id: "T-1",
      revision: 1,
      extensions: { [TASK_KERNEL_EXTENSION]: {} },
    });
    await projectKernelOperationalEvidence(input);
    const native = writeTask.mock.calls[0]![0];
    backend.getTask.mockResolvedValue({
      ...native,
      quality_review: {
        ...native.quality_review,
        review_identity_digest: k.kernelDigest("compatibility review"),
      },
    });
    await projectKernelOperationalEvidence(input);
    expect(writeTask).toHaveBeenCalledTimes(2);
    expect(writeTask.mock.calls[1]![0].quality_review).toEqual(native.quality_review);
    expect(writeTask.mock.calls[1]![0].extensions).toEqual(native.extensions);
  });
});
