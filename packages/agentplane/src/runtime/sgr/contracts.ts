import { isRecord } from "../../shared/guards.js";
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

function invalid(field: string, expected: string): Error {
  return new Error(`Invalid field ${field}: expected ${expected}`);
}

function requireRecord(raw: unknown, field: string): Record<string, unknown> {
  if (!isRecord(raw)) throw invalid(field, "object");
  return raw;
}

function requireString(raw: unknown, field: string): string {
  if (typeof raw !== "string" || !raw.trim()) throw invalid(field, "non-empty string");
  return raw.trim();
}

function optionalString(raw: unknown, field: string): string | undefined {
  if (raw === undefined) return undefined;
  return requireString(raw, field);
}

function requireNumber(raw: unknown, field: string): number {
  if (typeof raw !== "number" || Number.isNaN(raw)) throw invalid(field, "number");
  return raw;
}

function optionalNumber(raw: unknown, field: string): number | undefined {
  if (raw === undefined) return undefined;
  return requireNumber(raw, field);
}

function requireSchemaVersion(raw: Record<string, unknown>, field: string): void {
  if (raw.schema_version !== SGR_CONTRACT_SCHEMA_VERSION) {
    throw invalid(`${field}.schema_version`, String(SGR_CONTRACT_SCHEMA_VERSION));
  }
}

function requireEnum<T extends string>(raw: unknown, field: string, allowed: readonly T[]): T {
  const value = requireString(raw, field);
  if (!allowed.includes(value as T)) {
    throw invalid(field, allowed.map((item) => `"${item}"`).join(" | "));
  }
  return value as T;
}

function requireStringArray(raw: unknown, field: string): string[] {
  if (!Array.isArray(raw)) throw invalid(field, "string[]");
  return raw.map((entry, index) => requireString(entry, `${field}[${index}]`));
}

function optionalStringArray(raw: unknown, field: string): string[] | undefined {
  if (raw === undefined) return undefined;
  return requireStringArray(raw, field);
}

function requireArray<T>(
  raw: unknown,
  field: string,
  validate: (entry: unknown, entryField: string) => T,
): T[] {
  if (!Array.isArray(raw)) throw invalid(field, "array");
  return raw.map((entry, index) => validate(entry, `${field}[${index}]`));
}

function requireNonEmptyArray<T>(
  raw: unknown,
  field: string,
  validate: (entry: unknown, entryField: string) => T,
): T[] {
  const items = requireArray(raw, field, validate);
  if (items.length === 0) throw invalid(field, "non-empty array");
  return items;
}

function optionalSourceRefs(raw: unknown, field: string): SgrSourceRef[] | undefined {
  if (raw === undefined) return undefined;
  return requireNonEmptyArray(raw, field, validateSourceRef);
}

function validateConfidence(raw: unknown, field: string): number {
  const confidence = requireNumber(raw, field);
  if (confidence < 0 || confidence > 1) throw invalid(field, "number between 0 and 1");
  return confidence;
}

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
    evidence_refs: optionalSourceRefs(step.evidence_refs, `${field}.evidence_refs`),
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
    status: requireEnum(coverage.status, `${field}.status`, [
      "covered",
      "omitted_boilerplate",
      "redacted",
      "unresolved",
    ]),
    reason: requireString(coverage.reason, `${field}.reason`),
    covered_item_ids: optionalStringArray(coverage.covered_item_ids, `${field}.covered_item_ids`),
  };
}

export function validateContextExtractionSgrResult(
  raw: unknown,
  field = "context extraction SGR result",
): ContextExtractionSgrResult {
  const result = requireRecord(raw, field);
  requireSchemaVersion(result, field);
  if (result.kind !== "context_extraction") throw invalid(`${field}.kind`, '"context_extraction"');
  return {
    schema_version: SGR_CONTRACT_SCHEMA_VERSION,
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
        return {
          id: requireString(item.id, `${itemField}.id`),
          kind: requireEnum(item.kind, `${itemField}.kind`, [
            "wiki_update",
            "fact",
            "graph_entity",
            "graph_edge",
            "coverage",
            "capability_note",
          ]),
          summary: requireString(item.summary, `${itemField}.summary`),
          source_refs: requireNonEmptyArray(
            item.source_refs,
            `${itemField}.source_refs`,
            validateSourceRef,
          ),
          confidence: validateConfidence(item.confidence, `${itemField}.confidence`),
          status,
          target_path: optionalString(item.target_path, `${itemField}.target_path`),
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
