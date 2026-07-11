import type { BlueprintRouteDecisionSgrResult, EvaluatorSgrResult } from "./contract-types.js";
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
import { validateReasoningStep, validateSourceRef } from "./contract-shared-validation.js";

export function validateEvaluatorSgrResult(
  raw: unknown,
  field = "evaluator SGR result",
): EvaluatorSgrResult {
  const result = requireRecord(raw, field);
  requireSchemaVersion(result, field);
  if (result.kind !== "evaluator_result") throw invalid(`${field}.kind`, '"evaluator_result"');
  const verdict = requireEnum(result.verdict, `${field}.verdict`, ["pass", "rework", "blocked"]);
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
  if ((verdict === "rework" || verdict === "blocked") && findings.length === 0) {
    throw invalid(`${field}.findings`, "non-empty array for rework or blocked verdict");
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
    recovery_context: optionalString(result.recovery_context, `${field}.recovery_context`),
  };
}

export function validateBlueprintRouteDecisionSgrResult(
  raw: unknown,
  field = "blueprint route decision SGR result",
): BlueprintRouteDecisionSgrResult {
  const result = requireRecord(raw, field);
  requireSchemaVersion(result, field);
  if (result.kind !== "blueprint_route_decision") {
    throw invalid(`${field}.kind`, '"blueprint_route_decision"');
  }
  const selected = requireRecord(result.selected_route, `${field}.selected_route`);
  return {
    schema_version: SGR_CONTRACT_SCHEMA_VERSION,
    kind: "blueprint_route_decision",
    facts: requireNonEmptyArray(result.facts, `${field}.facts`, validateReasoningStep),
    inferences: requireNonEmptyArray(
      result.inferences,
      `${field}.inferences`,
      validateReasoningStep,
    ),
    rejected_routes: requireArray(
      result.rejected_routes,
      `${field}.rejected_routes`,
      (entry, routeField) => {
        const route = requireRecord(entry, routeField);
        return {
          blueprint_id: requireString(route.blueprint_id, `${routeField}.blueprint_id`),
          reason: requireString(route.reason, `${routeField}.reason`),
        };
      },
    ),
    selected_route: {
      blueprint_id: requireString(selected.blueprint_id, `${field}.selected_route.blueprint_id`),
      task_kind: requireEnum(selected.task_kind, `${field}.selected_route.task_kind`, [
        "analysis",
        "content",
        "docs",
        "code",
        "release",
        "ops",
        "context",
      ]),
      rationale: requireString(selected.rationale, `${field}.selected_route.rationale`),
    },
    required_evidence: requireArray(
      result.required_evidence,
      `${field}.required_evidence`,
      (entry, evidenceField) => {
        const evidence = requireRecord(entry, evidenceField);
        return {
          id: requireString(evidence.id, `${evidenceField}.id`),
          kind: requireEnum(evidence.kind, `${evidenceField}.kind`, [
            "sources",
            "assumptions",
            "context_manifest",
            "changed_paths",
            "check_result",
            "artifact",
            "approval",
            "external_link",
            "commit",
            "final_output",
            "weak_links",
            "quality_report",
            "rollback",
          ]),
          description: requireString(evidence.description, `${evidenceField}.description`),
        };
      },
    ),
    stop_rules: requireArray(result.stop_rules, `${field}.stop_rules`, (entry, stopField) => {
      const stop = requireRecord(entry, stopField);
      return {
        id: requireString(stop.id, `${stopField}.id`),
        severity: requireEnum(stop.severity, `${stopField}.severity`, [
          "stop",
          "approval_required",
          "warn",
        ]),
        reason: requireString(stop.reason, `${stopField}.reason`),
      };
    }),
    weak_links: requireStringArray(result.weak_links, `${field}.weak_links`),
  };
}
