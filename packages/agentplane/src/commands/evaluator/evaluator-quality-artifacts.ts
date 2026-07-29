import type { EvaluatorModule } from "../../evaluators/catalog.js";
import type { EvaluatorRunParsed, EvaluatorRunProvenance } from "./evaluator.spec.js";

export const QUALITY_REPORT_FILE = "quality-report.json";
export const EVALUATOR_PROMPT_FILE = "evaluator-prompt.md";
export const EVALUATOR_OPINION_FILE = "evaluator-opinion.md";
export const EVALUATOR_FOLLOW_UP_FILE = "evaluator-follow-up.json";

export type EvaluatorQualityReport = {
  schema_version: 1;
  task_id: string;
  evaluator_id: string;
  evaluator_profile: string;
  generated_at: string;
  provenance: EvaluatorRunProvenance;
  verdict: EvaluatorRunParsed["verdict"];
  summary: string;
  evaluated_sha: string | null;
  blueprint_digest: string | null;
  findings: string[];
  evidence_refs: string[];
  missing_tests: string[];
  hidden_assumptions: string[];
  residual_risks: string[];
};

export function safePathSegment(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replaceAll(/[^a-z0-9._-]+/g, "-")
    .replaceAll(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function timestampPathSegment(at: string): string {
  return at.replaceAll(/[-:.]/g, "").replace("T", "-").replace("Z", "");
}

export function renderEvaluatorPrompt(opts: {
  evaluator: EvaluatorModule;
  taskId: string;
  taskReadmePath: string;
  workOrderPath: string;
  resultPath: string;
  reportPath: string;
  provenance: EvaluatorRunProvenance;
}): string {
  return [
    "# AgentPlane EVALUATOR episode",
    "",
    "AgentPlane prepared and froze the authoritative review input. Perform the semantic evaluation; do not reproduce CLI discovery or lifecycle work.",
    "This prompt does not execute an evaluator. A caller must run the evaluator in the work-order authority boundary and persist its returned typed result at the declared output path.",
    "Do not edit implementation, task lifecycle, policy, or evidence files. You may read the frozen evidence and run read-only checks only.",
    "",
    `- task_id: ${opts.taskId}`,
    `- task_readme: ${opts.taskReadmePath}`,
    `- work_order: ${opts.workOrderPath}`,
    `- result_output: ${opts.resultPath}`,
    `- report_path: ${opts.reportPath}`,
    `- provenance: ${opts.provenance}`,
    "",
    "## Required result",
    "",
    "Return exactly one `sgr.evaluator_result.v1` JSON object through the evaluator result channel. The caller, not the read-only evaluator, persists it at `result_output`. It must contain:",
    "- schema_version: 1",
    "- kind: evaluator_result",
    "- evaluator_id: the evaluator id from the work order",
    "- verdict: pass | rework | blocked | human_review",
    "- findings: typed findings with id, severity, summary, broken_invariant, and non-empty evidence_refs",
    "- missing_tests and hidden_assumptions: string arrays",
    "- recovery_context: required non-empty string for rework, blocked, or human_review; for human_review it must be the single decision question for the human owner",
    "- recovery_reason: null unless blocked solely because current deterministic verification evidence is absent; use deterministic_evidence_gap only for that case",
    "",
    "Every findings[].evidence_refs[].path must be an exact path from work_order.evidence. Do not add fields, commands, patches, lifecycle transitions, or a verdict outside this JSON result.",
    "The CLI validates the schema, frozen evidence digests, task revision, evaluated SHA, and blueprint before it records quality state.",
    "",
    "## Evaluator module",
    "",
    opts.evaluator.content.trim(),
    "",
  ].join("\n");
}

export function renderOpinionMarkdown(report: EvaluatorQualityReport): string {
  return [
    `# Semantic quality review: ${report.verdict}`,
    "",
    `Provenance: ${report.provenance}`,
    "",
    report.summary,
    "",
    "## Findings",
    ...report.findings.map((finding) => `- ${finding}`),
    "",
    "## Evidence",
    ...report.evidence_refs.map((ref) => `- ${ref}`),
    "",
    "## Missing Tests",
    ...(report.missing_tests.length > 0
      ? report.missing_tests.map((row) => `- ${row}`)
      : ["- none recorded"]),
    "",
    "## Hidden Assumptions",
    ...(report.hidden_assumptions.length > 0
      ? report.hidden_assumptions.map((row) => `- ${row}`)
      : ["- none recorded"]),
    "",
    "## Residual Risks",
    ...(report.residual_risks.length > 0
      ? report.residual_risks.map((row) => `- ${row}`)
      : ["- none recorded"]),
    "",
  ].join("\n");
}
