import type { WorkflowRouteState } from "./workflow-step.js";

export function needsQualityEvidenceRefresh(state: WorkflowRouteState): boolean {
  const review = state.task.quality_review;
  const reviewUpdatedAt = Date.parse(review?.updated_at ?? "");
  const verificationUpdatedAt = Date.parse(state.task.verification?.updated_at ?? "");
  return (
    String(state.task.status).toUpperCase() === "DOING" &&
    state.task.verification?.state === "ok" &&
    review?.state === "blocked" &&
    review.provenance === "evaluator_supplied" &&
    review.recovery_reason === "deterministic_evidence_gap" &&
    review.evaluated_sha === state.qualityReviewTargetSha &&
    Number.isFinite(reviewUpdatedAt) &&
    Number.isFinite(verificationUpdatedAt) &&
    verificationUpdatedAt <= reviewUpdatedAt &&
    review.evidence_refs.some((ref) => ref.endsWith("/quality-report.json")) &&
    review.findings.length > 0
  );
}
