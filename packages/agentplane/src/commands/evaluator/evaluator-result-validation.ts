import {
  validateEvaluatorSgrResult,
  type EvaluatorSgrResult,
} from "../../evaluators/sgr-result.js";
import { CliError } from "../../shared/errors.js";

function assertExactKeys(
  value: unknown,
  keys: readonly string[],
  field: string,
): asserts value is Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new CliError({ code: "E_VALIDATION", message: `${field} must be an object.` });
  }
  const unexpected = Object.keys(value).filter((key) => !keys.includes(key));
  if (unexpected.length > 0) {
    throw new CliError({
      code: "E_VALIDATION",
      message: `${field} contains forbidden fields: ${unexpected.join(", ")}. Evaluator results are read-only.`,
    });
  }
}

function normalizeEvaluatorStructuredNulls(raw: Record<string, unknown>): Record<string, unknown> {
  const normalized: Record<string, unknown> = { ...raw };
  if (normalized.recovery_context === null) delete normalized.recovery_context;
  if (normalized.recovery_reason === null) delete normalized.recovery_reason;
  if (!Array.isArray(normalized.findings)) return normalized;
  normalized.findings = (normalized.findings as unknown[]).map((finding: unknown): unknown => {
    if (!finding || typeof finding !== "object" || Array.isArray(finding)) return finding;
    const normalizedFinding: Record<string, unknown> = { ...finding };
    if (!Array.isArray(normalizedFinding.evidence_refs)) return normalizedFinding;
    normalizedFinding.evidence_refs = (normalizedFinding.evidence_refs as unknown[]).map(
      (evidence: unknown): unknown => {
        if (!evidence || typeof evidence !== "object" || Array.isArray(evidence)) return evidence;
        const normalizedEvidence: Record<string, unknown> = { ...evidence };
        for (const field of ["sha256", "line", "lines", "section"] as const) {
          if (normalizedEvidence[field] === null) delete normalizedEvidence[field];
        }
        return normalizedEvidence;
      },
    );
    return normalizedFinding;
  });
  return normalized;
}

export function validateStrictEvaluatorResult(raw: unknown): EvaluatorSgrResult {
  assertExactKeys(
    raw,
    [
      "schema_version",
      "kind",
      "evaluator_id",
      "verdict",
      "findings",
      "missing_tests",
      "hidden_assumptions",
      "recovery_context",
      "recovery_reason",
    ],
    "EvaluatorSgrResult",
  );
  const record = raw as Record<string, unknown>;
  if (Array.isArray(record.findings)) {
    for (const [index, finding] of record.findings.entries()) {
      assertExactKeys(
        finding,
        ["id", "severity", "summary", "broken_invariant", "evidence_refs"],
        `EvaluatorSgrResult.findings[${index}]`,
      );
      if (
        finding &&
        typeof finding === "object" &&
        Array.isArray((finding as Record<string, unknown>).evidence_refs)
      ) {
        for (const [evidenceIndex, evidence] of (
          (finding as Record<string, unknown>).evidence_refs as unknown[]
        ).entries()) {
          assertExactKeys(
            evidence,
            ["path", "sha256", "line", "lines", "section"],
            `EvaluatorSgrResult.findings[${index}].evidence_refs[${evidenceIndex}]`,
          );
        }
      }
    }
  }
  return validateEvaluatorSgrResult(normalizeEvaluatorStructuredNulls(record));
}
