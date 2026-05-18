import { fromZodIssue, type ZodIssue } from "zod-validation-error/v4";

export function formatZodIssues(prefix: string, issues: readonly ZodIssue[]): string {
  if (issues.length === 0) return prefix;
  return issues.map((issue) => fromZodIssue(issue, { prefix }).message).join("; ");
}
