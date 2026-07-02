import type {
  BlueprintRouteDecisionSgrResult,
  ContextExtractionCoverage,
  ContextExtractionConfidenceVector,
  ContextExtractionEntityResolutionRow,
  ContextExtractionGraphEdge,
  ContextExtractionGraphEntity,
  ContextExtractionPageCreationRow,
  ContextExtractionSgrResult,
  ContextExtractionTopologyDecisionRow,
  EvaluatorSgrResult,
  SgrReasoningStep,
  SgrSourceRef,
} from "./contract-types.js";
import {
  CONTEXT_EXTRACTION_SGR_CONTRACT_SCHEMA_VERSION,
  SGR_CONTRACT_SCHEMA_VERSION,
} from "./contract-types.js";
import {
  invalid,
  optionalNumber,
  optionalSourceRefs,
  optionalString,
  optionalStringArray,
  requireArray,
  requireEnum,
  requireNonEmptyArray,
  requireRecord,
  requireSchemaVersion,
  requireString,
  requireStringArray,
  validateConfidence,
} from "./contract-validators.js";

export {
  CONTEXT_EXTRACTION_SGR_CONTRACT_SCHEMA_VERSION,
  SGR_CONTRACT_SCHEMA_VERSION,
  type BlueprintDecisionEvidenceRequirement,
  type BlueprintDecisionStopRule,
  type BlueprintRejectedRoute,
  type BlueprintRouteDecisionSgrResult,
  type BlueprintSelectedRoute,
  type ContextExtractionCoverage,
  type ContextExtractionCoverageStatus,
  type ContextExtractionGraphEdge,
  type ContextExtractionGraphEntity,
  type ContextExtractionItem,
  type ContextExtractionItemKind,
  type ContextExtractionItemStatus,
  type ContextExtractionSgrResult,
  type EvaluatorFinding,
  type EvaluatorFindingSeverity,
  type EvaluatorSgrResult,
  type EvaluatorVerdict,
  type SgrContractSchemaVersion,
  type SgrReasoningStep,
  type SgrSourceRef,
} from "./contract-types.js";

function validateSourceRef(raw: unknown, field = "source ref"): SgrSourceRef {
  const source = requireRecord(raw, field);
  const sha256 = optionalString(source.sha256, `${field}.sha256`);
  if (sha256 !== undefined && !/^sha256:[a-fA-F0-9]{64}$/.test(sha256)) {
    throw invalid(`${field}.sha256`, "sha256:<64 hex chars>");
  }
  return {
    path: requireString(source.path, `${field}.path`),
    sha256: sha256 as SgrSourceRef["sha256"],
    line: optionalNumber(source.line, `${field}.line`),
    lines: optionalString(source.lines, `${field}.lines`),
    section: optionalString(source.section, `${field}.section`),
  };
}

function validateReasoningStep(raw: unknown, field = "reasoning step"): SgrReasoningStep {
  const step = requireRecord(raw, field);
  return {
    label: requireString(step.label, `${field}.label`),
    summary: requireString(step.summary, `${field}.summary`),
    evidence_refs: optionalSourceRefs(
      step.evidence_refs,
      `${field}.evidence_refs`,
      validateSourceRef,
    ),
  };
}

function validateGraphEntity(raw: unknown, field: string): ContextExtractionGraphEntity {
  const entity = requireRecord(raw, field);
  return {
    id: requireString(entity.id, `${field}.id`),
    kind: requireString(entity.kind, `${field}.kind`),
    label: requireString(entity.label, `${field}.label`),
    aliases: optionalStringArray(entity.aliases, `${field}.aliases`),
    status: optionalString(entity.status, `${field}.status`),
  };
}

function validateGraphEdge(raw: unknown, field: string): ContextExtractionGraphEdge {
  const edge = requireRecord(raw, field);
  return {
    id: optionalString(edge.id, `${field}.id`),
    from: requireString(edge.from, `${field}.from`),
    to: requireString(edge.to, `${field}.to`),
    relation: requireString(edge.relation, `${field}.relation`),
    status: optionalString(edge.status, `${field}.status`),
  };
}

function validateCoverage(raw: unknown, field: string): ContextExtractionCoverage {
  const coverage = requireRecord(raw, field);
  return {
    source_path: requireString(coverage.source_path, `${field}.source_path`),
    span_id: optionalString(coverage.span_id, `${field}.span_id`),
    status: requireEnum(coverage.status, `${field}.status`, [
      "covered",
      "omitted_boilerplate",
      "redacted",
      "duplicate",
      "conflict",
      "out_of_scope",
      "unresolved",
    ]),
    reason: requireString(coverage.reason, `${field}.reason`),
    covered_item_ids: optionalStringArray(coverage.covered_item_ids, `${field}.covered_item_ids`),
    duplicate_of_span_id: optionalString(
      coverage.duplicate_of_span_id,
      `${field}.duplicate_of_span_id`,
    ),
    target_paths: optionalStringArray(coverage.target_paths, `${field}.target_paths`),
  };
}

function validateConfidenceVector(
  raw: unknown,
  field: string,
): ContextExtractionConfidenceVector | undefined {
  if (raw === undefined) return undefined;
  const vector = requireRecord(raw, field);
  return {
    extraction: validateConfidence(vector.extraction, `${field}.extraction`),
    source_quality: validateConfidence(vector.source_quality, `${field}.source_quality`),
    entity_resolution: validateConfidence(vector.entity_resolution, `${field}.entity_resolution`),
    freshness: validateConfidence(vector.freshness, `${field}.freshness`),
  };
}

function validateStructuredPayload<T extends Record<string, unknown>>(
  raw: unknown,
  field: string,
): T {
  const record = requireRecord(raw, field);
  if (Object.keys(record).length === 0) throw invalid(field, "non-empty object");
  return record as T;
}

function requireContextSchemaVersion(raw: Record<string, unknown>, field: string): void {
  if (
    raw.schema_version !== SGR_CONTRACT_SCHEMA_VERSION &&
    raw.schema_version !== CONTEXT_EXTRACTION_SGR_CONTRACT_SCHEMA_VERSION
  ) {
    throw invalid(
      `${field}.schema_version`,
      `${SGR_CONTRACT_SCHEMA_VERSION} | ${CONTEXT_EXTRACTION_SGR_CONTRACT_SCHEMA_VERSION}`,
    );
  }
}

const CONTEXT_EXTRACTION_ITEM_KINDS = [
  "wiki_update",
  "claim",
  "fact",
  "definition",
  "decision",
  "requirement",
  "constraint",
  "invariant",
  "procedure",
  "workflow",
  "api_contract",
  "code_symbol",
  "risk",
  "open_question",
  "contradiction",
  "example",
  "deprecation",
  "graph_entity",
  "graph_edge",
  "entity_resolution",
  "page_creation",
  "topology_decision",
  "coverage",
  "capability_note",
] as const;

export function validateContextExtractionSgrResult(
  raw: unknown,
  field = "context extraction SGR result",
): ContextExtractionSgrResult {
  const result = requireRecord(raw, field);
  requireContextSchemaVersion(result, field);
  if (result.kind !== "context_extraction") throw invalid(`${field}.kind`, '"context_extraction"');
  return {
    schema_version: CONTEXT_EXTRACTION_SGR_CONTRACT_SCHEMA_VERSION,
    kind: "context_extraction",
    task_id: optionalString(result.task_id, `${field}.task_id`),
    reasoning: requireNonEmptyArray(result.reasoning, `${field}.reasoning`, validateReasoningStep),
    source_refs: requireNonEmptyArray(
      result.source_refs,
      `${field}.source_refs`,
      validateSourceRef,
    ),
    extracted_items: requireArray(
      result.extracted_items,
      `${field}.extracted_items`,
      (entry, itemField) => {
        const item = requireRecord(entry, itemField);
        const status = requireEnum(item.status, `${itemField}.status`, [
          "proposed",
          "accepted",
          "stale",
          "conflict",
          "unresolved",
        ]);
        const staleMarkers = optionalStringArray(item.stale_markers, `${itemField}.stale_markers`);
        const conflictMarkers = optionalStringArray(
          item.conflict_markers,
          `${itemField}.conflict_markers`,
        );
        if (status === "stale" && !staleMarkers?.length) {
          throw invalid(`${itemField}.stale_markers`, "non-empty string[] for stale status");
        }
        if (status === "conflict" && !conflictMarkers?.length) {
          throw invalid(`${itemField}.conflict_markers`, "non-empty string[] for conflict status");
        }
        const validity =
          item.validity === undefined
            ? undefined
            : requireEnum(item.validity, `${itemField}.validity`, [
                "current",
                "historical",
                "deprecated",
                "conflicting",
                "unknown",
              ]);
        return {
          id: requireString(item.id, `${itemField}.id`),
          kind: requireEnum(item.kind, `${itemField}.kind`, CONTEXT_EXTRACTION_ITEM_KINDS),
          summary: requireString(item.summary, `${itemField}.summary`),
          source_refs: requireNonEmptyArray(
            item.source_refs,
            `${itemField}.source_refs`,
            validateSourceRef,
          ),
          span_refs: optionalStringArray(item.span_refs, `${itemField}.span_refs`),
          confidence:
            item.confidence === undefined
              ? undefined
              : validateConfidence(item.confidence, `${itemField}.confidence`),
          confidence_vector: validateConfidenceVector(
            item.confidence_vector,
            `${itemField}.confidence_vector`,
          ),
          status,
          validity,
          scope: optionalString(item.scope, `${itemField}.scope`),
          target_path: optionalString(item.target_path, `${itemField}.target_path`),
          canonical_refs: optionalStringArray(item.canonical_refs, `${itemField}.canonical_refs`),
          supersedes: optionalStringArray(item.supersedes, `${itemField}.supersedes`),
          superseded_by: optionalStringArray(item.superseded_by, `${itemField}.superseded_by`),
          contradicts: optionalStringArray(item.contradicts, `${itemField}.contradicts`),
          depends_on: optionalStringArray(item.depends_on, `${itemField}.depends_on`),
          entity:
            item.kind === "graph_entity"
              ? validateGraphEntity(item.entity, `${itemField}.entity`)
              : undefined,
          edge:
            item.kind === "graph_edge"
              ? validateGraphEdge(item.edge, `${itemField}.edge`)
              : undefined,
          coverage:
            item.kind === "coverage"
              ? validateCoverage(item.coverage, `${itemField}.coverage`)
              : undefined,
          entity_resolution:
            item.kind === "entity_resolution"
              ? validateStructuredPayload<ContextExtractionEntityResolutionRow>(
                  item.entity_resolution,
                  `${itemField}.entity_resolution`,
                )
              : undefined,
          page_creation:
            item.kind === "page_creation"
              ? validateStructuredPayload<ContextExtractionPageCreationRow>(
                  item.page_creation,
                  `${itemField}.page_creation`,
                )
              : undefined,
          topology_decision:
            item.kind === "topology_decision"
              ? validateStructuredPayload<ContextExtractionTopologyDecisionRow>(
                  item.topology_decision,
                  `${itemField}.topology_decision`,
                )
              : undefined,
          stale_markers: staleMarkers,
          conflict_markers: conflictMarkers,
        };
      },
    ),
  };
}

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
