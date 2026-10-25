import { taskKernel } from "@agentplaneorg/core/tasks";
import type { TaskData } from "../../backends/task-backend.js";
import { makeKernelRecord, readKernelRecord, TASK_KERNEL_EXTENSION } from "./kernel-record.js";
import { projectKernelTask } from "./kernel-projector.js";

export function readTimingExceptionFixture(
  identity: taskKernel.Sha256Digest,
  task: TaskData,
  original: taskKernel.TaskAggregate,
) {
  const failed = { ...original.final_validation!, status: "FAILED" as const };
  const aggregate: taskKernel.TaskAggregate = {
    ...original,
    state: "FINAL_VALIDATION",
    final_validation: failed,
    final_timing_exception: {
      schema_version: 1,
      kind: "timing_only",
      task_id: task.id,
      plan_revision: original.current_plan!.revision,
      plan_digest: original.current_plan!.digest,
      validation_digest: taskKernel.kernelDigest(failed),
      failed_check_id: "full-suite",
      failure_evidence_digest: failed.evidence_digests[0]!,
      implementation_identity: failed.identity.implementation_identity,
      acceptance_fingerprint: failed.identity.implementation_identity,
      command_digest: failed.identity.command_digest,
      environment_digest: failed.identity.environment_digest,
      budget_ms: 1_440_000,
      duration_ms: 1_463_240,
      max_overage_ms: 30_000,
      hosted_head_sha: "a".repeat(40),
      hosted_evidence_digest: taskKernel.kernelDigest("hosted-green"),
      approval_evidence_digest: taskKernel.kernelDigest("user-approval"),
      hosted_required_checks: ["unit", "lint"],
      approval_mode: "signed_user_receipt",
      approval_actor_id: "USER:release-owner@trusted-issuer",
      approved_by: "USER",
      accepted_at: "2026-10-05T00:00:00.000Z",
    },
  };
  const loaded = readKernelRecord(
    {
      ...task,
      status: projectKernelTask(aggregate).status,
      extensions: { [TASK_KERNEL_EXTENSION]: makeKernelRecord(identity, aggregate, []) },
    },
    identity,
  );
  return { aggregate, failed, loaded };
}
