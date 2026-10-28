import { describe, expect, it } from "vitest";
import { taskKernel } from "@agentplaneorg/core/tasks";

import type { TaskData } from "../../backends/task-backend.js";
import {
  assertAdoptedPrMergeReadiness,
  assertAdoptionTaskAuthority,
} from "./adoption-task-authority.js";

const task = {
  plan_approval: { state: "approved" },
  execution_contract: {
    selected_mode: "branch_pr",
    authority: {
      allowed_external_effects: ["network_read", "external_write"],
      forbidden_external_effects: [],
    },
  },
  extensions: { task_kernel: { kind: "canonical_task" } },
} as TaskData;

describe("adoption task authority", () => {
  it("requires an approved native contract before an operator can bind or mutate a hosted PR", () => {
    expect(() => assertAdoptionTaskAuthority(task)).not.toThrow();
    expect(() =>
      assertAdoptionTaskAuthority({
        ...task,
        plan_approval: { ...task.plan_approval, state: "pending" },
      }),
    ).toThrow("native execution contract");
    expect(() =>
      assertAdoptionTaskAuthority({
        ...task,
        execution_contract: {
          ...task.execution_contract!,
          authority: {
            ...task.execution_contract!.authority,
            allowed_external_effects: ["network_read"],
            forbidden_external_effects: ["external_write"],
          },
        },
      }),
    ).toThrow("native execution contract");
  });

  it("requires verification and independent review on the exact hosted head before merge", () => {
    const head = "a".repeat(40);
    const hostedDigest = `sha256:${"9".repeat(64)}`;
    const reviewDigest = `sha256:${"8".repeat(64)}`;
    const canonical = {
      kind: "canonical_task",
      aggregate: {
        state: "COMPLETED",
        work_items: {
          W1: {
            state: "COMPLETED",
            validation: {
              status: "PASSED",
              identity: { hosted_head_evidence_digest: hostedDigest },
            },
          },
        },
        final_validation: {
          status: "PASSED",
          identity: { hosted_head_evidence_digest: hostedDigest },
          evidence_digests: [hostedDigest],
        },
      },
    };
    const projection = {
      source: "task_kernel",
      implementation_commit: head,
      implementation_tree: "7".repeat(40),
      review_identity_digest: reviewDigest,
      evidence_refs: ["exact-head-native-validation"],
      findings: ["Reviewed exact hosted head"],
    };
    const reviewed = {
      ...task,
      status: "DOING",
      commit: { hash: head, message: "Hosted PR" },
      verification: { state: "ok" },
      quality_review: {
        state: "pass",
        updated_by: "EVALUATOR",
        provenance: "evaluator_supplied",
        evaluated_sha: head,
        review_identity_digest: reviewDigest,
        findings: ["Reviewed the exact hosted change"],
        evidence_refs: [".agentplane/tasks/T-1/quality-report.json"],
      },
      extensions: {
        ...task.extensions,
        task_kernel: { ...canonical, digest: taskKernel.kernelDigest(canonical) },
        "agentplane.kernel_operational_projection": {
          ...projection,
          digest: taskKernel.kernelDigest(projection),
        },
      },
    } as TaskData;
    expect(() => assertAdoptedPrMergeReadiness(reviewed, head)).not.toThrow();
    expect(() =>
      assertAdoptedPrMergeReadiness(
        { ...reviewed, extensions: { task_kernel: { kind: "canonical_task" } } } as TaskData,
        head,
      ),
    ).toThrow("native Task Kernel validation");
    expect(() =>
      assertAdoptedPrMergeReadiness(
        { ...reviewed, verification: { state: "pending" } } as TaskData,
        head,
      ),
    ).toThrow("successful verification");
    expect(() =>
      assertAdoptedPrMergeReadiness(
        {
          ...reviewed,
          quality_review: { ...reviewed.quality_review!, evaluated_sha: "b".repeat(40) },
        },
        head,
      ),
    ).toThrow("fresh EVALUATOR quality review");
  });
});
