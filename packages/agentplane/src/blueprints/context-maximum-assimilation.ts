import type { EvidenceRequirement, StopRule } from "./model.js";
import { evidence } from "./builtin-builder.js";

export const contextMaximumAssimilationEvidence: readonly EvidenceRequirement[] = [
  evidence("context_max.sources", "sources", "intake", "Selected source set and hashes."),
  evidence(
    "context_max.coverage",
    "artifact",
    "artifact_write",
    "Coverage map proving every significant source span was semantically assimilated, intentionally omitted, duplicated, or redacted.",
  ),
  evidence(
    "context_max.addressing",
    "context_manifest",
    "context_resolve",
    "Source registry with original hashes, availability state, and line-addressed provenance refs for extracted claims, entities, relations, and articles.",
  ),
  evidence(
    "context_max.graph_first",
    "artifact",
    "work_unit",
    "Entity, alias, relation, conflict, and open-question extraction completed before narrative wiki synthesis.",
  ),
  evidence(
    "context_max.topology",
    "artifact",
    "artifact_write",
    "Source-shaped topology decision recorded before page-family creation, including source type, canonical families, page-vs-heading granularity, aliases, unresolved identities, and source-backed evidence for every new family.",
  ),
  evidence(
    "context_max.glossary",
    "artifact",
    "artifact_write",
    "Root wiki glossary file `context/wiki/glossary.md` created or updated for canonical term normalization and alias preservation; semantic wiki links use the source-shaped topology.",
  ),
  evidence(
    "context_max.changed_paths",
    "changed_paths",
    "work_unit",
    "Wiki, derived, glossary, report, task, and ACR paths changed by maximum assimilation.",
  ),
  evidence(
    "context_max.verification",
    "check_result",
    "deterministic_check",
    "reindex, wiki lint, graph validation, context verify-task, doctor, smoke search, and ACR check results.",
  ),
  evidence(
    "context_max.recovery",
    "weak_links",
    "verify_record",
    "Coverage gaps, unresolved identities, conflicts, sensitive-source redactions, or handoff status.",
  ),
  evidence("context_max.quality", "quality_report", "quality_gate", "EVALUATOR quality verdict."),
  evidence("context_max.commit", "commit", "finish", "Close or integration commit."),
];

export const contextMaximumAssimilationStopRules: readonly StopRule[] = [
  {
    id: "context_max_empty_source_set",
    severity: "stop",
    reason: "Maximum assimilation requires at least one selected source with a recorded hash.",
  },
  {
    id: "context_max_pipeline_order_skipped",
    severity: "stop",
    reason:
      "Entity/relation/glossary extraction and pre-write reconciliation must happen before narrative wiki synthesis.",
  },
  {
    id: "context_max_missing_topology_decision",
    severity: "stop",
    reason:
      "Narrative wiki synthesis requires a source-shaped topology decision that classifies source type, canonical page families, page-vs-heading granularity, aliases, and unresolved identities.",
  },
  {
    id: "context_max_page_family_without_source_evidence",
    severity: "approval_required",
    reason:
      "Every new wiki page family requires source-backed evidence in the topology decision; otherwise keep the material under stable headings or request approval.",
  },
  {
    id: "context_max_missing_line_refs",
    severity: "stop",
    reason:
      "Claims, entities, relations, and wiki sections derived from source text require line-addressed source refs.",
  },
  {
    id: "context_max_coverage_gap_without_reason",
    severity: "approval_required",
    reason:
      "Every significant source span must be covered, intentionally omitted as non-significant boilerplate, or redacted with a reason.",
  },
  {
    id: "context_max_glossary_conflict",
    severity: "approval_required",
    reason:
      "Canonical term collisions, alias ambiguity, or identity uncertainty must be kept as conflict/open-question candidates before normalization.",
  },
  {
    id: "context_max_missing_root_glossary_file",
    severity: "stop",
    reason:
      "Maximum assimilation requires the canonical glossary to be created or maintained as `context/wiki/glossary.md`, not scattered across generated reports or page-local notes.",
  },
  {
    id: "context_max_raw_deletion_resilience_unproven",
    severity: "approval_required",
    reason:
      "Finish requires explicit evidence that deleting raw sources would not remove significant meaning from wiki/derived artifacts; line refs may become non-dereferenceable audit pointers.",
  },
  {
    id: "context_max_sensitive_leakage",
    severity: "stop",
    reason:
      "Secrets and non-publishable spans must not be copied into public wiki, task, report, or ACR surfaces.",
  },
  {
    id: "context_max_reindex_missing_after_writes",
    severity: "stop",
    reason:
      "Wiki, fact, graph, glossary, or report edits require a fresh context reindex before finish.",
  },
];
