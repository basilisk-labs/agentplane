import path from "node:path";

import type { EvaluatorModule } from "../../evaluators/catalog.js";
import type { EvaluatorRunParsed } from "./evaluator.spec.js";

export const QUALITY_REPORT_FILE = "quality-report.json";
export const EVALUATOR_PROMPT_FILE = "evaluator-prompt.md";
export const EVALUATOR_OPINION_FILE = "evaluator-opinion.md";

export type EvaluatorQualityReport = {
  schema_version: 1;
  task_id: string;
  evaluator_id: string;
  evaluator_profile: string;
  generated_at: string;
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

export function relativeArtifactPath(gitRoot: string, absPath: string): string {
  return path.relative(gitRoot, absPath).replaceAll("\\", "/");
}

export function pathsOutsideTaskArtifacts(
  paths: string[],
  workflowDir: string,
  taskId: string,
): string[] {
  const normalizedWorkflowDir = workflowDir.replaceAll("\\", "/").replaceAll(/\/+$/g, "");
  const taskPrefix = `${normalizedWorkflowDir}/${taskId}/`;
  return paths.filter((changedPath) => {
    const normalizedPath = changedPath.replaceAll("\\", "/");
    return !normalizedPath.startsWith(taskPrefix);
  });
}

export function renderEvaluatorPrompt(opts: {
  evaluator: EvaluatorModule;
  taskId: string;
  taskReadmePath: string;
  reportPath: string;
}): string {
  return [
    "# AgentPlane EVALUATOR quality review",
    "",
    "Use the evaluator module below as binding review procedure.",
    "Do not edit implementation files. Inspect task scope, diff, verification evidence, and residual risk.",
    "Write the final structured review to the report path as JSON matching the requested report shape.",
    "",
    `- task_id: ${opts.taskId}`,
    `- task_readme: ${opts.taskReadmePath}`,
    `- report_path: ${opts.reportPath}`,
    "",
    "Required report fields:",
    "- verdict: pass | rework | blocked | human_review",
    "- summary: concise judgement",
    "- findings: non-empty list for pass/rework/blocked",
    "- evidence_refs: concrete files, checks, PRs, traces, or reports inspected",
    "- missing_tests: tests or checks that should exist but do not",
    "- hidden_assumptions: assumptions the implementation relies on",
    "- residual_risks: known remaining risks",
    "",
    "## Evaluator module",
    "",
    opts.evaluator.content.trim(),
    "",
  ].join("\n");
}

export function renderOpinionMarkdown(report: EvaluatorQualityReport): string {
  return [
    `# EVALUATOR opinion: ${report.verdict}`,
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
