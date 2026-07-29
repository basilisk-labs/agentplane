import path from "node:path";

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
