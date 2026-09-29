import type { EvaluatorSgrResult } from "./contract-types.js";
import { SGR_CONTRACT_SCHEMA_VERSION } from "./contract-types.js";
import {
  invalid,
  optionalString,
  requireArray,
  requireEnum,
  requireNonEmptyArray,
  requireRecord,
  requireSchemaVersion,
  requireString,
  requireStringArray,
} from "./contract-validators.js";
import { validateSourceRef } from "./contract-shared-validation.js";

export function validateEvaluatorSgrResult(
  raw: unknown,
  field = "evaluator SGR result",
): EvaluatorSgrResult {
  const result = requireRecord(raw, field);
  requireSchemaVersion(result, field);
  if (result.kind !== "evaluator_result") throw invalid(`${field}.kind`, '"evaluator_result"');
  const verdict = requireEnum(result.verdict, `${field}.verdict`, [
    "pass",
    "rework",
    "blocked",
    "human_review",
  ]);
  const findings = requireArray(result.findings, `${field}.findings`, (entry, findingField) => {
    const finding = requireRecord(entry, findingField);
    return {
      id: requireString(finding.id, `${findingField}.id`),
      severity: requireEnum(finding.severity, `${findingField}.severity`, [
        "low",
        "medium",
        "high",
      ]),
      summary: requireString(finding.summary, `${findingField}.summary`),
      broken_invariant: requireString(finding.broken_invariant, `${findingField}.broken_invariant`),
      evidence_refs: requireNonEmptyArray(
        finding.evidence_refs,
        `${findingField}.evidence_refs`,
        validateSourceRef,
      ),
    };
  });
  if (findings.length === 0) {
    throw invalid(`${field}.findings`, "non-empty array for every evaluator verdict");
  }
  const recoveryContext = optionalString(result.recovery_context, `${field}.recovery_context`);
  const recoveryReason =
    result.recovery_reason === undefined
      ? undefined
      : requireEnum(result.recovery_reason, `${field}.recovery_reason`, [
          "deterministic_evidence_gap",
        ]);
  if (recoveryReason && verdict !== "blocked") {
    throw invalid(`${field}.recovery_reason`, '"deterministic_evidence_gap" only for blocked');
  }
  return {
    schema_version: SGR_CONTRACT_SCHEMA_VERSION,
    kind: "evaluator_result",
    evaluator_id: requireString(result.evaluator_id, `${field}.evaluator_id`),
    verdict,
    findings,
    missing_tests: requireStringArray(result.missing_tests, `${field}.missing_tests`),
    hidden_assumptions: requireStringArray(
      result.hidden_assumptions,
      `${field}.hidden_assumptions`,
    ),
    recovery_context: recoveryContext,
    ...(recoveryReason ? { recovery_reason: recoveryReason } : {}),
  };
}
