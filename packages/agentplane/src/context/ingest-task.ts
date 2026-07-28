import type { TaskNewParsed } from "../commands/task/new.js";
import type { ContextIngestParsed, ManifestEntry } from "./ingest.js";
import {
  buildContextAssimilationPromptModule,
  CONTEXT_ASSIMILATION_PROMPT_ADDRESS,
} from "./ingest-task-prompt.js";

export type ContextWorkspaceMode =
  | "adaptive"
  | "minimal"
  | "wiki"
  | "codebase"
  | "research"
  | "maximum-assimilation";

const MAXIMUM_ASSIMILATION_BLUEPRINT = "context.maximum_assimilation" as const;

function deprecatedModeNote(mode?: ContextWorkspaceMode): string[] {
  if (mode === undefined || mode === "maximum-assimilation") return [];
  return [
    `Deprecated workspace mode alias: ${mode}`,
    "Context ingest now always creates maximum-assimilation tasks; legacy workspace mode names are accepted only for compatibility.",
  ];
}

export function selectedSourceRows(
  opts: Pick<ContextIngestParsed, "mode">,
  sourceRows: ManifestEntry[],
): ManifestEntry[] {
  if (opts.mode === "changed") {
    return sourceRows.filter((entry) => entry.status === "new" || entry.status === "changed");
  }
  return sourceRows;
}

function basenameForTitle(sourcePath: string): string {
  const parts = sourcePath.split(/[\\/]+/u).filter(Boolean);
  return parts.at(-1) ?? sourcePath;
}

function buildTitleSourceHint(rows: ManifestEntry[]): string {
  if (rows.length === 0) {
    return "";
  }
  const names = rows.map((row) => basenameForTitle(row.path));
  if (names.length === 1) {
    return `: ${names[0]}`;
  }
  const first = names.slice(0, 2).join(", ");
  return names.length === 2 ? `: ${first}` : `: ${first} +${names.length - 2}`;
}

function buildIngestMetadata(
  opts: Omit<ContextIngestParsed, "runTask">,
  sourceRows: ManifestEntry[],
  workspaceMode?: ContextWorkspaceMode,
): {
  title: string;
  description: string;
  verify: string[];
} {
  const modeLabel = {
    all: "all tracked sources",
    changed: "changed sources",
    sources: "explicit sources",
  }[opts.mode];
  const modeSource = selectedSourceRows(opts, sourceRows);
  const blueprintId: NonNullable<TaskNewParsed["blueprintRequest"]> =
    MAXIMUM_ASSIMILATION_BLUEPRINT;
  const title = `context assimilation (${modeLabel}${buildTitleSourceHint(modeSource)})`;
  const promptRef = CONTEXT_ASSIMILATION_PROMPT_ADDRESS;
  const description = [
    `Source context assimilation for ${modeLabel}.`,
    "This task is created by `context ingest`.",
    `Selection: mode=${opts.mode}; selected=${modeSource.length}; tracked=${sourceRows.length}.`,
    `Sources: ${JSON.stringify(modeSource.map((row) => row.path))}`,
    `Owner: CURATOR; prompt: ${promptRef}; blueprint: ${blueprintId}.`,
    ...deprecatedModeNote(workspaceMode),
    "",
    "Read the task-bound `context-pack.md`, CLI-owned `task-creation.json` (treat it as immutable), `source-set.lock.json`, `source-spans.skeleton.jsonl`, `canonical-snapshot.json`, `canonical-entity-catalog.json`, `extraction-contract.json`, and `expected-artifacts.json` before mutation.",
    "CURATOR owns semantic entity reconciliation and returns one schema-valid SGR extraction. The CLI supervisor owns validation, atomic materialization, indexes, reports, retrieval checks, evaluation, ACR, and finalization. Raw sources are read-only; unresolved identity or conflict must remain explicit.",
  ].join("\n");
  return {
    title,
    description,
    verify: [
      "Return one schema-valid context_extraction SGR with semantic reconciliation evidence and complete source coverage.",
      "CLI supervisor records every deterministic post-processing gate, evaluator result, ACR, and finalization in the shared durable episode journal.",
    ],
  };
}

function buildContextTaskDocSections(): NonNullable<TaskNewParsed["taskDocSections"]> {
  return {
    Plan: [
      "1. Read every task-bound input and lock the selected source/canonical baseline before writing.",
      "2. Let CURATOR reconcile each entity-bearing term against the complete canonical catalog and record evidence-bearing same_as, alias_of, distinct_entity, possibly_same_as, or new_entity_proposal decisions.",
      "3. Classify source spans and return one schema-valid SGR extraction containing semantic decisions, atomic claims, graph relations, topology/page decisions, and coverage.",
      "4. State unresolved identity, conflict, or evidence gaps in the SGR instead of deciding them mechanically.",
      "5. Stop after the semantic SGR result. CLI supervision owns all materialization, validation, retrieval, evaluation, ACR, and finalization gates.",
    ].join("\n"),
    "Verify Steps": [
      "1. Inspect `context-pack.md`, CLI-owned `task-creation.json` (treat it as immutable), `source-set.lock.json`, `source-spans.skeleton.jsonl`, `canonical-snapshot.json`, `canonical-entity-catalog.json`, `extraction-contract.json`, and `expected-artifacts.json`. Expected: inputs are task-bound, complete, and hashes/counts agree with the selected source set and canonical layer.",
      "2. Validate the SGR extraction before apply. Expected: every entity-bearing term has exactly one supported semantic resolution with candidates checked, comparison dimensions, evidence for and against, rationale, and explicit unresolved questions where needed; same_as/alias_of reuse an existing canonical ID and add no duplicate graph entity.",
      "3. Return the SGR without applying, indexing, validating, evaluating, or finalizing it. Expected: only semantic output and evidence-bearing decisions are produced by CURATOR.",
      "4. Expected from the CLI supervisor: formal and Wiki artifacts are atomically materialized, indexes/reports/graph/task checks pass, and curated retrieval remains useful without raw source dependence.",
      "5. Expected from the CLI supervisor: an independent evaluator records explicit provenance; semantic rework returns a separate bounded CURATOR work order; ACR and finalization artifacts are recorded only after a passing semantic review.",
    ].join("\n"),
    "Rollback Plan":
      "Revert only this task's context and task-artifact commit, restore the previous canonical/derived files, reindex, and rerun the smoke search. Never reverse an accepted semantic merge by inventing a new identity; restore the prior evidence-backed resolution or record a new CURATOR correction task.",
    Findings:
      "Semantic identity is agent-owned. Deterministic AgentPlane surfaces candidate evidence, validates the decision record, and applies canonical identifiers; it must not infer equivalence from IDs, spelling, search rank, or heuristics.",
  };
}

export function createTaskNewParsed(
  opts: ContextIngestParsed,
  sourceRows: ManifestEntry[],
  workspaceMode?: ContextWorkspaceMode,
): TaskNewParsed {
  const metadata = buildIngestMetadata(opts, sourceRows, workspaceMode);
  const now = new Date().toISOString();
  const selectedRows = selectedSourceRows(opts, sourceRows);
  const allowCapabilities = false;
  const blueprintId: NonNullable<TaskNewParsed["blueprintRequest"]> =
    MAXIMUM_ASSIMILATION_BLUEPRINT;
  const allowedOutputs = [
    "context/wiki/**",
    ".agentplane/context/derived/claims/**",
    ".agentplane/context/derived/facts/**",
    ".agentplane/context/derived/graph/**",
    ".agentplane/context/derived/ontology/**",
    ".agentplane/context/derived/reports/**",
    ".agentplane/context/derived/sources/**",
    ".agentplane/context/derived/wiki/**",
    ".agentplane/tasks/${taskId}/README.md",
    ".agentplane/tasks/${taskId}/acr.json",
    ".agentplane/tasks/${taskId}/context-pack.md",
    ".agentplane/tasks/${taskId}/extraction-contract.json",
    ".agentplane/tasks/${taskId}/canonical-snapshot.json",
    ".agentplane/tasks/${taskId}/canonical-entity-catalog.json",
    ".agentplane/tasks/${taskId}/source-set.lock.json",
    ".agentplane/tasks/${taskId}/source-spans.skeleton.jsonl",
    ".agentplane/tasks/${taskId}/expected-artifacts.json",
    ".agentplane/tasks/${taskId}/semantic-results/**",
    ".agentplane/tasks/${taskId}/context-rework/**",
  ];
  if (allowCapabilities) {
    allowedOutputs.push("context/capabilities/**", ".agentplane/context/derived/capabilities/**");
  }
  const promptModule = buildContextAssimilationPromptModule(workspaceMode);
  return {
    title: metadata.title,
    description: metadata.description,
    owner: "CURATOR",
    priority: "med",
    tags: ["meta", "context", "assimilation"],
    taskKind: "context",
    mutationScope: "context",
    blueprintRequest: blueprintId,
    extensions: {
      "agentplane.context": {
        schema_version: 1,
        task_type: "context_assimilation",
        manifest: ".agentplane/context/agentplane.context.yaml",
        workspace: "context",
        mode: "maximum_assimilation",
        source_set: {
          selection: opts.mode,
          generated_at: now,
          files: selectedRows.map((row) => ({
            path: row.path,
            sha256: row.sha256,
            status: row.status,
            content_type: row.content_type,
            size_bytes: row.size_bytes,
          })),
        },
        blueprint: {
          id: blueprintId,
          required_gates: [
            "source_set_locked",
            "prewrite_context_search",
            "semantic_entity_reconciliation_recorded",
            "semantic_resolution_evidence_validated",
            "entity_relation_first_extraction",
            "source_shaped_wiki_topology_recorded",
            "topology_page_family_evidence_recorded",
            "canonical_glossary_updated",
            "root_glossary_file_updated",
            "obsidian_wikilinks_reviewed",
            "obsidian_properties_created",
            "numeric_source_notes_rendered",
            "line_addressed_coverage_map",
            "raw_deletion_resilience_review",
            "evaluator_quality_review",
            "wiki_schema_lint",
            "reindex_after_writes",
            "graph_validate",
            "verify_task",
            "doctor_clean",
            "smoke_search",
          ],
          stop_rules: [
            "empty_source_set",
            "pipeline_order_skipped",
            "missing_source_refs",
            "semantic_resolution_missing",
            "semantic_merge_without_comparative_evidence",
            "semantic_merge_target_missing",
            "forced_semantic_merge_under_uncertainty",
            "missing_line_refs",
            "fixed_starter_scaffold_used_without_source_rationale",
            "missing_source_shaped_topology_decision",
            "page_family_without_source_evidence",
            "missing_obsidian_wikilinks",
            "broken_obsidian_wikilink_case",
            "missing_numeric_source_notes",
            "coverage_gap_without_reason",
            "glossary_conflict",
            "missing_root_glossary_file",
            "raw_deletion_resilience_unproven",
            "evaluator_quality_review_missing",
            "private_leakage",
            "stale_projection_after_reindex",
            "empty_derived_outputs_without_reason",
            "unresolved_conflict_candidate",
            "agent_handoff_missing_after_stalled_work",
          ],
        },
        prompt_modules: [promptModule],
        prompt_module_ref: promptModule.address.value,
        allowed_outputs: allowedOutputs,
        wiki: {
          layout_strategy: "adaptive",
          page_granularity: "granular_topic_artifact",
          claim_granularity: "atomic",
          frontmatter_required: true,
          cross_links_required: true,
          source_refs_as_markdown_links: true,
          maintenance_mode: "maximum_assimilation",
          raw_deletion_resilience_required: true,
          line_refs_required: true,
          entity_relation_first: true,
          canonical_glossary_required: true,
          canonical_glossary_path: "context/wiki/glossary.md",
        },
        assimilation: {
          update_wiki: true,
          extract_entities: true,
          extract_facts: true,
          extract_relations: true,
          detect_contradictions: true,
          detect_open_questions: true,
          propose_capabilities: allowCapabilities,
          update_capabilities: allowCapabilities,
          allow_raw_mutation: false,
        },
        forbidden_outputs: [
          "context/raw/**",
          ".agentplane/cache.sqlite",
          ".agentplane/context/service/**",
        ],
        policies: {
          context_rules: ".agentplane/context/policies/context.rules.md",
          wiki_rules: ".agentplane/context/policies/wiki.rules.md",
          capability_rules: ".agentplane/context/policies/capability.rules.md",
          redaction: ".agentplane/context/policies/redaction.rules.yaml",
        },
      },
    },
    dependsOn: [],
    verify: metadata.verify,
    taskDocSections: buildContextTaskDocSections(),
    showBlueprint: false,
    allowDuplicate: true,
    riskFlags: [],
  };
}
