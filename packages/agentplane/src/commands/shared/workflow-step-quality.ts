import type { WorkflowRouteState } from "./workflow-step.js";

export function needsQualityEvidenceRefresh(state: WorkflowRouteState): boolean {
  const review = state.task.quality_review;
  return (
    String(state.task.status).toUpperCase() === "DOING" &&
    state.task.verification?.state === "ok" &&
    review?.state === "blocked" &&
    review.provenance === "evaluator_supplied" &&
    review.recovery_reason === "deterministic_evidence_gap" &&
    review.evaluated_sha === state.qualityReviewTargetSha &&
    typeof review.updated_at === "string" &&
    typeof state.task.verification.updated_at === "string" &&
    state.task.verification.updated_at <= review.updated_at &&
    review.evidence_refs.some((ref) => ref.endsWith("/quality-report.json")) &&
    review.findings.length > 0
  );
}
