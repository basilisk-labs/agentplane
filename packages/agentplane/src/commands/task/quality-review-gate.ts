import { exitCodeForError } from "../../cli/exit-codes.js";
import type { QualityReviewSubject } from "@agentplaneorg/core/tasks";
import type { TaskData } from "../../backends/task-backend.js";
import { CliError } from "../../shared/errors.js";

export function hasAcceptedQualityReviewProvenance(review: TaskData["quality_review"]): boolean {
  if (!review) return false;
  if (review.provenance === "human_supplied") return review.updated_by === "HUMAN";
  if (review.provenance === "evaluator_supplied") return review.updated_by === "EVALUATOR";
  return review.provenance === undefined && review.updated_by === "EVALUATOR";
}

export function assertEvaluatorQualityReviewPassed(opts: {
  task: TaskData;
  expectedSha?: string | null;
  expectedSubject?: QualityReviewSubject | null;
  expectedBlueprintDigest?: string | null;
  command: "finish" | "integrate";
}): void {
  const review = opts.task.quality_review;
  const requestedSubject =
    opts.expectedSubject ??
    (opts.expectedSha ? { kind: "git_commit" as const, value: opts.expectedSha } : null);
  const reviewAgain =
    requestedSubject?.kind === "git_commit"
      ? `agentplane evaluator prepare ${opts.task.id} --commit ${requestedSubject.value}`
      : `agentplane evaluator prepare ${opts.task.id}`;
  const fix =
    `agentplane evaluator run ${opts.task.id} --provenance <human_supplied|evaluator_supplied> ` +
    `--verdict <pass|rework|blocked|human_review> --summary "<supplied-summary>" ` +
    `--finding "<supplied-finding>" --evidence <path-or-check>`;

  if (!review) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message: [
        `${opts.command} requires a semantic quality review after verification.`,
        `task=${opts.task.id}`,
        "quality_review=missing",
        "quality_review_required: run an EVALUATOR episode or obtain an explicit human decision; formal checks must not choose the verdict.",
        `Human record: ${fix}`,
      ].join("\n"),
    });
  }

  if (review.state !== "pass" || !hasAcceptedQualityReviewProvenance(review)) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message: [
        `${opts.command} requires quality_review.state=pass from an EVALUATOR or an explicit HUMAN record.`,
        `task=${opts.task.id}`,
        `quality_review.state=${review.state}`,
        `quality_review.updated_by=${review.updated_by ?? "missing"}`,
        `quality_review.provenance=${review.provenance ?? "legacy_or_missing"}`,
        `Human record: ${fix}`,
      ].join("\n"),
    });
  }

  const expectedSubject = requestedSubject;
  const evaluatedSubject =
    review.evaluated_subject ??
    (review.evaluated_sha ? { kind: "git_commit" as const, value: review.evaluated_sha } : null);
  if (
    expectedSubject &&
    (evaluatedSubject?.kind !== expectedSubject.kind ||
      evaluatedSubject?.value !== expectedSubject.value)
  ) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message: [
        `${opts.command} requires a fresh EVALUATOR quality review for the current review subject.`,
        `task=${opts.task.id}`,
        `quality_review.evaluated_subject=${formatReviewSubject(evaluatedSubject)}`,
        `expected_subject=${formatReviewSubject(expectedSubject)}`,
        `Review again: ${reviewAgain}`,
        `Human record: ${fix}`,
      ].join("\n"),
    });
  }

  if (opts.expectedBlueprintDigest && review.blueprint_digest !== opts.expectedBlueprintDigest) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message: [
        `${opts.command} requires EVALUATOR quality review against the current blueprint snapshot.`,
        `task=${opts.task.id}`,
        `quality_review.blueprint_digest=${review.blueprint_digest}`,
        `expected_blueprint_digest=${opts.expectedBlueprintDigest}`,
        `Human record: ${fix}`,
      ].join("\n"),
    });
  }

  if (!review.evidence_refs.some((ref) => ref.endsWith("/quality-report.json"))) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message: [
        `${opts.command} requires a structured semantic quality report.`,
        `task=${opts.task.id}`,
        "quality_review.evidence_refs=missing quality-report.json",
        `Human record: ${fix}`,
      ].join("\n"),
    });
  }

  if (review.findings.length === 0) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message: [
        `${opts.command} requires non-empty semantic findings for pass reviews.`,
        `task=${opts.task.id}`,
        "quality_review.findings=empty",
        `Human record: ${fix}`,
      ].join("\n"),
    });
  }
}

function formatReviewSubject(subject: QualityReviewSubject | null): string {
  return subject ? `${subject.kind}:${subject.value}` : "missing";
}
