import { taskKernel } from "@agentplaneorg/core/tasks";

import type { TaskData } from "../../backends/task-backend.js";
import { isRecord } from "../../shared/guards.js";

function validatedCanonicalAggregate(task: TaskData): Record<string, unknown> | null {
  const raw = task.extensions?.task_kernel;
  if (!isRecord(raw) || raw.kind !== "canonical_task") return null;
  const { digest, ...recordContents } = raw;
  const aggregate = isRecord(raw.aggregate) ? raw.aggregate : null;
  const finalValidation =
    aggregate && isRecord(aggregate.final_validation) ? aggregate.final_validation : null;
  return typeof digest === "string" &&
    taskKernel.kernelDigest(recordContents) === digest &&
    finalValidation?.status === "PASSED" &&
    Array.isArray(finalValidation.evidence_digests) &&
    finalValidation.evidence_digests.length > 0
    ? aggregate
    : null;
}

export function hasCompletedCanonicalFinalValidation(task: TaskData): boolean {
  return validatedCanonicalAggregate(task)?.state === "COMPLETED";
}

export function hasCanonicalPreMergeEvidence(task: TaskData): boolean {
  const projection = task.extensions?.["agentplane.kernel_operational_projection"];
  if (!validatedCanonicalAggregate(task) || !isRecord(projection)) return false;
  const { digest: projectionDigest, ...projectionContents } = projection;
  const reviewIdentity = projection.review_identity_digest;
  const implementationCommit = projection.implementation_commit;
  const recordedImplementation = isRecord(task.extensions?.implementation_commit)
    ? task.extensions.implementation_commit.hash
    : task.commit?.hash;
  return (
    typeof projectionDigest === "string" &&
    taskKernel.kernelDigest(projectionContents) === projectionDigest &&
    projection.source === "task_kernel" &&
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

/** Canonical adopted work is ready only for the exact head validated by Task Kernel. */
export function hasCanonicalAdoptedHeadEvidence(task: TaskData, headSha: string): boolean {
  const aggregate = validatedCanonicalAggregate(task);
  const projection = task.extensions?.["agentplane.kernel_operational_projection"];
  const validation = aggregate?.final_validation;
  const identity = isRecord(validation) ? validation.identity : null;
  const workItems = aggregate?.work_items;
  const completed = isRecord(workItems)
    ? Object.values(workItems).filter((item) => isRecord(item) && item.state === "COMPLETED")
    : [];
  const hostedDigest = isRecord(identity) ? identity.hosted_head_evidence_digest : null;
  return (
    hasCanonicalPreMergeEvidence(task) &&
    aggregate?.state === "COMPLETED" &&
    isRecord(projection) &&
    projection.implementation_commit === headSha &&
    typeof projection.implementation_tree === "string" &&
    projection.implementation_tree.length > 0 &&
    isRecord(identity) &&
    typeof hostedDigest === "string" &&
    /^sha256:[a-f0-9]{64}$/u.test(hostedDigest) &&
    completed.length > 0 &&
    completed.every((item) => {
      if (!isRecord(item) || !isRecord(item.validation)) return false;
      return (
        item.validation.status === "PASSED" &&
        isRecord(item.validation.identity) &&
        item.validation.identity.hosted_head_evidence_digest === hostedDigest
      );
    })
  );
}
