import type {
  BlueprintId,
  EvidenceKind,
  StopRuleSeverity,
  TaskKind,
} from "../../blueprints/model.js";

export const SGR_CONTRACT_SCHEMA_VERSION = 1 as const;
export const CONTEXT_EXTRACTION_SGR_CONTRACT_SCHEMA_VERSION = 2 as const;

export type SgrContractSchemaVersion =
  | typeof SGR_CONTRACT_SCHEMA_VERSION
  | typeof CONTEXT_EXTRACTION_SGR_CONTRACT_SCHEMA_VERSION;

export type SgrSourceRef = {
  path: string;
  sha256?: `sha256:${string}`;
  line?: number;
  lines?: string;
  section?: string;
};

export type SgrReasoningStep = {
  label: string;
  summary: string;
  evidence_refs?: SgrSourceRef[];
};

export type ContextExtractionItemStatus =
  | "proposed"
  | "accepted"
  | "stale"
  | "conflict"
  | "unresolved";
export type ContextExtractionItemKind =
  | "wiki_update"
  | "claim"
  | "fact"
  | "definition"
  | "decision"
  | "requirement"
  | "constraint"
  | "invariant"
  | "procedure"
  | "workflow"
  | "api_contract"
  | "code_symbol"
  | "risk"
  | "open_question"
  | "contradiction"
  | "example"
  | "deprecation"
  | "graph_entity"
  | "graph_edge"
  | "entity_resolution"
  | "page_creation"
  | "topology_decision"
  | "coverage"
  | "capability_note";

export type ContextExtractionCoverageStatus =
  | "covered"
  | "omitted_boilerplate"
  | "redacted"
  | "duplicate"
  | "conflict"
  | "out_of_scope"
  | "unresolved";

export type ContextExtractionGraphEntity = {
  id: string;
  kind: string;
  label: string;
  aliases?: string[];
  status?: string;
};

export type ContextExtractionGraphEdge = {
  id?: string;
  from: string;
  to: string;
  relation: string;
  status?: string;
};

export type ContextExtractionCoverage = {
  source_path: string;
  span_id?: string;
  status: ContextExtractionCoverageStatus;
  reason: string;
  covered_item_ids?: string[];
  duplicate_of_span_id?: string;
  target_paths?: string[];
};

export type ContextExtractionConfidenceVector = {
  extraction: number;
  source_quality: number;
  entity_resolution: number;
  freshness: number;
};

export type ContextExtractionCandidateEntity = {
  entity_id: string;
  label?: string;
  reason: string;
  evidence_for?: string[];
  evidence_against?: string[];
};

export type ContextExtractionEntityResolutionDecision =
  | "same_as"
  | "alias_of"
  | "distinct_entity"
  | "possibly_same_as"
  | "new_entity_proposal";

export type ContextExtractionEntityResolutionRow = Record<string, unknown> & {
  source_term: string;
  resolution: ContextExtractionEntityResolutionDecision;
  canonical_entity_id?: string;
  proposed_entity_id?: string;
  candidate_entities_checked: ContextExtractionCandidateEntity[];
  comparison_dimensions: string[];
  evidence_for: string[];
  evidence_against: string[];
  decision_rationale: string;
  unresolved_questions?: string[];
  why_not_existing?: string;
  why_not_alias_of_existing?: string;
};

export type ContextExtractionPageCreationRow = Record<string, unknown> & {
  path: string;
  page_type: string;
  family_id: string;
  decision: string;
  canonical_entity_ids?: string[];
};

export type ContextExtractionSourceShape = {
  primary: string;
  rationale: string;
  evidence_span_ids: string[];
};

export type ContextExtractionPageFamily = {
  family_id: string;
  path_template: string;
  page_type: string;
  creation_rule: string;
  page_vs_heading_rule: string;
  source_evidence_span_ids: string[];
};

export type ContextExtractionCanonicalPage = {
  path: string;
  page_type: string;
  canonical_entity_ids?: string[];
  required_sections?: string[];
  source_evidence_span_ids: string[];
};

export type ContextExtractionTopologyDecisionRow = Record<string, unknown> & {
  source_shape: ContextExtractionSourceShape;
  canonical_page_families: ContextExtractionPageFamily[];
  topology_version?: number;
  canonical_pages?: ContextExtractionCanonicalPage[];
  forbidden_creation_patterns?: string[];
};

export type ContextExtractionItem = {
  id: string;
  kind: ContextExtractionItemKind;
  summary: string;
  source_refs: SgrSourceRef[];
  span_refs?: string[];
  confidence?: number;
  confidence_vector?: ContextExtractionConfidenceVector;
  status: ContextExtractionItemStatus;
  validity?: "current" | "historical" | "deprecated" | "conflicting" | "unknown";
  scope?: string;
  target_path?: string;
  canonical_refs?: string[];
  supersedes?: string[];
  superseded_by?: string[];
  contradicts?: string[];
  depends_on?: string[];
  entity?: ContextExtractionGraphEntity;
  edge?: ContextExtractionGraphEdge;
  coverage?: ContextExtractionCoverage;
  entity_resolution?: ContextExtractionEntityResolutionRow;
  page_creation?: ContextExtractionPageCreationRow;
  topology_decision?: ContextExtractionTopologyDecisionRow;
  stale_markers?: string[];
  conflict_markers?: string[];
};

export type ContextExtractionSgrResult = {
  schema_version: SgrContractSchemaVersion;
  kind: "context_extraction";
  task_id?: string;
  reasoning: SgrReasoningStep[];
  source_refs: SgrSourceRef[];
  extracted_items: ContextExtractionItem[];
};

export type EvaluatorVerdict = "pass" | "rework" | "blocked";
export type EvaluatorFindingSeverity = "low" | "medium" | "high";

export type EvaluatorFinding = {
  id: string;
  severity: EvaluatorFindingSeverity;
  summary: string;
  broken_invariant: string;
  evidence_refs: SgrSourceRef[];
};

export type EvaluatorSgrResult = {
  schema_version: typeof SGR_CONTRACT_SCHEMA_VERSION;
  kind: "evaluator_result";
  evaluator_id: string;
  verdict: EvaluatorVerdict;
  findings: EvaluatorFinding[];
  missing_tests: string[];
  hidden_assumptions: string[];
  recovery_context?: string;
};

export type BlueprintRejectedRoute = {
  blueprint_id: BlueprintId;
  reason: string;
};

export type BlueprintSelectedRoute = {
  blueprint_id: BlueprintId;
  task_kind: TaskKind;
  rationale: string;
};

export type BlueprintDecisionEvidenceRequirement = {
  id: string;
  kind: EvidenceKind;
  description: string;
};

export type BlueprintDecisionStopRule = {
  id: string;
  severity: StopRuleSeverity;
  reason: string;
};

export type BlueprintRouteDecisionSgrResult = {
  schema_version: typeof SGR_CONTRACT_SCHEMA_VERSION;
  kind: "blueprint_route_decision";
  facts: SgrReasoningStep[];
  inferences: SgrReasoningStep[];
  rejected_routes: BlueprintRejectedRoute[];
  selected_route: BlueprintSelectedRoute;
  required_evidence: BlueprintDecisionEvidenceRequirement[];
  stop_rules: BlueprintDecisionStopRule[];
  weak_links: string[];
};
