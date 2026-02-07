import type { PolicyProblem, PolicyResult } from "./types.js";

export function okResult(): PolicyResult {
  return { ok: true, errors: [], warnings: [] };
}

export function policyError(message: string): PolicyProblem {
  return { code: "E_POLICY", message };
}

export function mergeResults(...items: PolicyResult[]): PolicyResult {
  const out: PolicyResult = okResult();
  for (const item of items) {
    out.errors.push(...item.errors);
    out.warnings.push(...item.warnings);
  }
  out.ok = out.errors.length === 0;
  return out;
}
