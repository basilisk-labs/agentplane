import path from "node:path";

import type { TaskData } from "../../backends/task-backend.js";
import type { EvaluatorRunVerdict } from "./evaluator.spec.js";

export type HumanEvaluatorReviewInput = {
  verdict: EvaluatorRunVerdict;
  summary: string;
  findings: string[];
  evidence_refs: string[];
  missing_tests: string[];
  hidden_assumptions: string[];
  residual_risks: string[];
};

export function relative(gitRoot: string, target: string): string {
  return path.relative(gitRoot, target).replaceAll("\\", "/");
}

export function isWithinRoot(root: string, target: string): boolean {
  const value = path.relative(root, target);
  return (
    value !== "" && !value.startsWith(`..${path.sep}`) && value !== ".." && !path.isAbsolute(value)
  );
}

export function uniqueStrings(values: readonly string[]): string[] {
  return [...new Set(values.map((value) => value.trim()).filter(Boolean))];
}

function taskSection(task: TaskData, name: string): string | null {
  const section = task.sections?.[name];
  return typeof section === "string" && section.trim() ? section.trim() : null;
}

export function evaluatorAcceptanceCriteria(task: TaskData): string[] {
  const criteria = uniqueStrings([
    ...(task.verify ?? []),
    taskSection(task, "Scope") ?? "",
    taskSection(task, "Plan") ?? "",
    taskSection(task, "Verify Steps") ?? "",
  ]).slice(0, 64);
  return criteria.length > 0 ? criteria : [`Review the approved outcome for ${task.title}.`];
}

export function evaluatorObjective(task: TaskData): string {
  return taskSection(task, "Summary") ?? task.description?.trim() ?? task.title;
}
