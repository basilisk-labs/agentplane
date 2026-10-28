import type { TaskData } from "../../backends/task-backend.js";
import { hasCanonicalAdoptedHeadEvidence } from "../shared/canonical-pre-merge-evidence.js";
import { assertEvaluatorQualityReviewPassed } from "../task/quality-review-gate.js";

/** Adoption cannot launder a task whose native execution contract forbids provider effects. */
export function assertAdoptionTaskAuthority(task: TaskData): void {
  const contract = task.execution_contract;
  const allowed = contract?.authority.allowed_external_effects ?? [];
  const forbidden = contract?.authority.forbidden_external_effects ?? [];
  if (
    task.plan_approval?.state !== "approved" ||
    !task.extensions?.task_kernel ||
    contract?.selected_mode !== "branch_pr" ||
    !allowed.includes("network_read") ||
    !allowed.includes("external_write") ||
    forbidden.includes("network_read") ||
    forbidden.includes("external_write")
  ) {
    throw new Error(
      "Existing PR adoption requires an approved branch_pr task whose native execution contract allows network_read and external_write",
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
