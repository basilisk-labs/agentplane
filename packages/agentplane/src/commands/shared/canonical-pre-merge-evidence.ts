import { taskKernel } from "@agentplaneorg/core/tasks";

import type { TaskData } from "../../backends/task-backend.js";
import { isRecord } from "../../shared/guards.js";

export function hasCanonicalPreMergeEvidence(task: TaskData): boolean {
  const raw = task.extensions?.task_kernel;
  const projection = task.extensions?.["agentplane.kernel_operational_projection"];
  if (!isRecord(raw) || raw.kind !== "canonical_task" || !isRecord(projection)) return false;
  const { digest, ...recordContents } = raw;
  const { digest: projectionDigest, ...projectionContents } = projection;
  const aggregate = isRecord(raw.aggregate) ? raw.aggregate : null;
  const finalValidation =
    aggregate && isRecord(aggregate.final_validation) ? aggregate.final_validation : null;
  const reviewIdentity = projection.review_identity_digest;
  const implementationCommit = projection.implementation_commit;
  const recordedImplementation = isRecord(task.extensions?.implementation_commit)
    ? task.extensions.implementation_commit.hash
    : task.commit?.hash;
  return (
    typeof digest === "string" &&
    taskKernel.kernelDigest(recordContents) === digest &&
    typeof projectionDigest === "string" &&
    taskKernel.kernelDigest(projectionContents) === projectionDigest &&
    projection.source === "task_kernel" &&
    finalValidation?.status === "PASSED" &&
    Array.isArray(finalValidation.evidence_digests) &&
    finalValidation.evidence_digests.length > 0 &&
    typeof implementationCommit === "string" &&
    recordedImplementation === implementationCommit &&
    task.quality_review?.state === "pass" &&
    task.quality_review.provenance === "evaluator_supplied" &&
    task.quality_review.evaluated_sha === implementationCommit &&
    task.quality_review.review_identity_digest === reviewIdentity &&
    Array.isArray(projection.evidence_refs) &&
    projection.evidence_refs.length > 0 &&
    Array.isArray(projection.findings) &&
    projection.findings.length > 0
  );
}
