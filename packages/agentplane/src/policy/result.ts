import type { PolicyProblem, PolicyResult } from "./types.js";

export function okResult(): PolicyResult {
  return { ok: true, errors: [], warnings: [] };
}

export function usageError(message: string): PolicyProblem {
  return { code: "E_USAGE", exitCode: 2, message };
}

export function gitError(message: string): PolicyProblem {
  return { code: "E_GIT", exitCode: 5, message };
}

export function internalError(message: string): PolicyProblem {
  return { code: "E_INTERNAL", exitCode: 1, message };
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
