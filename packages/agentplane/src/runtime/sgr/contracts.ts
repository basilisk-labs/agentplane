import type {
  ContextExtractionCoverage,
  ContextExtractionConfidenceVector,
  ContextExtractionEntityResolutionRow,
  ContextExtractionGraphEdge,
  ContextExtractionGraphEntity,
  ContextExtractionPageCreationRow,
  ContextExtractionSgrResult,
  ContextExtractionTopologyDecisionRow,
} from "./contract-types.js";
import {
  CONTEXT_EXTRACTION_SGR_CONTRACT_SCHEMA_VERSION,
  SGR_CONTRACT_SCHEMA_VERSION,
} from "./contract-types.js";
import {
  invalid,
  optionalString,
  optionalStringArray,
  requireArray,
  requireEnum,
  requireNonEmptyArray,
  requireRecord,
  requireString,
  validateConfidence,
} from "./contract-validators.js";
import {
  validateEntityResolutionPayload,
  validatePageCreationPayload,
  validateTopologyDecisionPayload,
} from "./context-extraction-payloads.js";
import { validateReasoningStep, validateSourceRef } from "./contract-shared-validation.js";
export {
  validateBlueprintRouteDecisionSgrResult,
  validateEvaluatorSgrResult,
} from "./contract-evaluator-routing.js";

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

function requireContextSchemaVersion(raw: Record<string, unknown>, field: string): 1 | 2 {
  if (
    raw.schema_version !== SGR_CONTRACT_SCHEMA_VERSION &&
    raw.schema_version !== CONTEXT_EXTRACTION_SGR_CONTRACT_SCHEMA_VERSION
  ) {
    throw invalid(
      `${field}.schema_version`,
      `${SGR_CONTRACT_SCHEMA_VERSION} | ${CONTEXT_EXTRACTION_SGR_CONTRACT_SCHEMA_VERSION}`,
    );
  }
  return raw.schema_version;
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
  const inputSchemaVersion = requireContextSchemaVersion(result, field);
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
        const spanRefs = optionalStringArray(item.span_refs, `${itemField}.span_refs`);
        if (
          inputSchemaVersion === CONTEXT_EXTRACTION_SGR_CONTRACT_SCHEMA_VERSION &&
          item.kind === "page_creation" &&
          !spanRefs?.length
        ) {
          throw invalid(`${itemField}.span_refs`, "non-empty string[] for page_creation");
        }
        return {
          id: requireString(item.id, `${itemField}.id`),
          kind: requireEnum(item.kind, `${itemField}.kind`, CONTEXT_EXTRACTION_ITEM_KINDS),
          summary: requireString(item.summary, `${itemField}.summary`),
          source_refs: requireNonEmptyArray(
            item.source_refs,
            `${itemField}.source_refs`,
            validateSourceRef,
          ),
          span_refs: spanRefs,
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
              ? inputSchemaVersion === CONTEXT_EXTRACTION_SGR_CONTRACT_SCHEMA_VERSION
                ? validateEntityResolutionPayload(
                    item.entity_resolution,
                    `${itemField}.entity_resolution`,
                  )
                : validateStructuredPayload<ContextExtractionEntityResolutionRow>(
                    item.entity_resolution,
                    `${itemField}.entity_resolution`,
                  )
              : undefined,
          page_creation:
            item.kind === "page_creation"
              ? inputSchemaVersion === CONTEXT_EXTRACTION_SGR_CONTRACT_SCHEMA_VERSION
                ? validatePageCreationPayload(item.page_creation, `${itemField}.page_creation`)
                : validateStructuredPayload<ContextExtractionPageCreationRow>(
                    item.page_creation,
                    `${itemField}.page_creation`,
                  )
              : undefined,
          topology_decision:
            item.kind === "topology_decision"
              ? inputSchemaVersion === CONTEXT_EXTRACTION_SGR_CONTRACT_SCHEMA_VERSION
                ? validateTopologyDecisionPayload(
                    item.topology_decision,
                    `${itemField}.topology_decision`,
                  )
                : validateStructuredPayload<ContextExtractionTopologyDecisionRow>(
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
