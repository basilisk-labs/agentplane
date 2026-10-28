import type { TaskData } from "../../backends/task-backend.js";
import { hasCanonicalAdoptedHeadEvidence } from "../shared/canonical-pre-merge-evidence.js";
import { assertEvaluatorQualityReviewPassed } from "../task/quality-review-gate.js";

/** Operator adoption requires declared provider intent without delegating writes to semantic agents. */
export function assertAdoptionTaskAuthority(task: TaskData): void {
  const contract = task.execution_contract;
  const declared = contract?.declaration.external_effects ?? [];
  const allowed = contract?.authority.allowed_external_effects ?? [];
  const forbidden = contract?.authority.forbidden_external_effects ?? [];
  if (
    task.plan_approval?.state !== "approved" ||
    !task.extensions?.task_kernel ||
    contract?.selected_mode !== "branch_pr" ||
    !declared.includes("network_read") ||
    !declared.includes("external_write") ||
    !allowed.includes("network_read") ||
    forbidden.includes("network_read")
  ) {
    throw new Error(
      "Existing PR adoption requires an approved branch_pr task whose native execution contract declares network_read and external_write and allows network_read",
    );
  }
}

/** Merge requires independent semantic evidence for the exact provider head. */
export function assertAdoptedPrMergeReadiness(task: TaskData, headSha: string): void {
  assertAdoptionTaskAuthority(task);
  if ((task.status !== "DOING" && task.status !== "DONE") || task.verification?.state !== "ok") {
    throw new Error("Adopted PR merge requires active semantic work with successful verification");
  }
  assertEvaluatorQualityReviewPassed({
    task,
    expectedSha: headSha,
    command: "integrate",
  });
  if (!hasCanonicalAdoptedHeadEvidence(task, headSha)) {
    throw new Error(
      "Adopted PR merge requires completed native Task Kernel validation on the exact head and operational evidence",
    );
  }
}
