import type {
  BlueprintId,
  EvidenceKind,
  StopRuleSeverity,
  TaskKind,
} from "../../blueprints/model.js";

export const SGR_CONTRACT_SCHEMA_VERSION = 1 as const;

export type SgrContractSchemaVersion = typeof SGR_CONTRACT_SCHEMA_VERSION;

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

export type ContextExtractionItemStatus = "proposed" | "accepted" | "stale" | "conflict";
export type ContextExtractionItemKind =
  | "wiki_update"
  | "fact"
  | "graph_entity"
  | "graph_edge"
  | "coverage"
  | "capability_note";

export type ContextExtractionCoverageStatus =
  | "covered"
  | "omitted_boilerplate"
  | "redacted"
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
  status: ContextExtractionCoverageStatus;
  reason: string;
  covered_item_ids?: string[];
};

export type ContextExtractionItem = {
  id: string;
  kind: ContextExtractionItemKind;
  summary: string;
  source_refs: SgrSourceRef[];
  confidence: number;
  status: ContextExtractionItemStatus;
  target_path?: string;
  entity?: ContextExtractionGraphEntity;
  edge?: ContextExtractionGraphEdge;
  coverage?: ContextExtractionCoverage;
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
  schema_version: SgrContractSchemaVersion;
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
  schema_version: SgrContractSchemaVersion;
  kind: "blueprint_route_decision";
  facts: SgrReasoningStep[];
  inferences: SgrReasoningStep[];
  rejected_routes: BlueprintRejectedRoute[];
  selected_route: BlueprintSelectedRoute;
  required_evidence: BlueprintDecisionEvidenceRequirement[];
  stop_rules: BlueprintDecisionStopRule[];
  weak_links: string[];
};
