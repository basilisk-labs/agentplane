import { exitCodeForError } from "../../cli/exit-codes.js";
import type { TaskData } from "../../backends/task-backend.js";
import { CliError } from "../../shared/errors.js";

export function assertEvaluatorQualityReviewPassed(opts: {
  task: TaskData;
  expectedSha?: string | null;
  expectedBlueprintDigest?: string | null;
  command: "finish" | "integrate";
}): void {
  const review = opts.task.quality_review;
  const fix =
    `agentplane verify ${opts.task.id} --ok --by EVALUATOR --note ` +
    `"EVALUATOR quality gate passed with cited evidence."`;

  if (!review) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message: [
        `${opts.command} requires an EVALUATOR quality review after verification.`,
        `task=${opts.task.id}`,
        "quality_review=missing",
        `Fix: ${fix}`,
      ].join("\n"),
    });
  }

  if (review.state !== "pass" || review.updated_by !== "EVALUATOR") {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message: [
        `${opts.command} requires quality_review.state=pass by EVALUATOR.`,
        `task=${opts.task.id}`,
        `quality_review.state=${review.state}`,
        `quality_review.updated_by=${review.updated_by ?? "missing"}`,
        `Fix: ${fix}`,
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
        `Fix: ${fix}`,
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
        `Fix: ${fix}`,
      ].join("\n"),
    });
  }
}
