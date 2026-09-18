import { describe, expect, it } from "vitest";
import { taskKernel as k } from "@agentplaneorg/core/tasks";

import { hasCanonicalPreMergeEvidence } from "./route-decision-blockers.js";

function canonicalTask() {
  const verificationEvidence = k.kernelDigest("verification");
  const reviewIdentity = k.kernelDigest("review");
  const implementationCommit = "a".repeat(40);
  const aggregate = {
    final_validation: {
      status: "PASSED",
      evidence_digests: [verificationEvidence],
    },
  };
  const recordContents = {
    kind: "canonical_task",
    aggregate,
  };
  const projectionContents = {
    schema_version: 1,
    source: "task_kernel",
    implementation_commit: implementationCommit,
    verification_evidence_digest: verificationEvidence,
    review_identity_digest: reviewIdentity,
    evidence_refs: ["quality-report.json"],
    findings: ["reviewed"],
  };
  return {
    commit: { hash: implementationCommit, message: "canonical implementation" },
    quality_review: {
      state: "pass",
      provenance: "evaluator_supplied",
      evaluated_sha: implementationCommit,
      review_identity_digest: reviewIdentity,
    },
    extensions: {
      task_kernel: { ...recordContents, digest: k.kernelDigest(recordContents) },
      "agentplane.kernel_operational_projection": {
        ...projectionContents,
        digest: k.kernelDigest(projectionContents),
      },
    },
  } as never;
}

describe("canonical pre-merge evidence", () => {
  it("uses passed Kernel final validation plus its immutable operational projection", () => {
    expect(hasCanonicalPreMergeEvidence(canonicalTask())).toBe(true);
  });

  it("fails closed after either projection is changed", () => {
    const task = canonicalTask() as {
      extensions: {
        task_kernel: { aggregate: { final_validation: { status: string } } };
      };
    };
    task.extensions.task_kernel.aggregate.final_validation.status = "FAILED";
    expect(hasCanonicalPreMergeEvidence(task as never)).toBe(false);

    const projectionTampered = canonicalTask() as {
      extensions: { "agentplane.kernel_operational_projection": { findings: string[] } };
    };
    projectionTampered.extensions["agentplane.kernel_operational_projection"].findings = [];
    expect(hasCanonicalPreMergeEvidence(projectionTampered as never)).toBe(false);
  });
});
