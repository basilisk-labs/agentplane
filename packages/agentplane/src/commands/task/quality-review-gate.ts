import { exitCodeForError } from "../../cli/exit-codes.js";
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
  expectedBlueprintDigest?: string | null;
  command: "finish" | "integrate";
}): void {
  const review = opts.task.quality_review;
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

  if (opts.expectedSha && review.evaluated_sha !== opts.expectedSha) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message: [
        `${opts.command} requires a fresh EVALUATOR quality review for the current commit.`,
        `task=${opts.task.id}`,
        `quality_review.evaluated_sha=${review.evaluated_sha ?? "missing"}`,
        `expected_sha=${opts.expectedSha}`,
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
