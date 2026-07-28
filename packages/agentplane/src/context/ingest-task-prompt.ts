import type { PromptModule } from "../runtime/prompt-modules/index.js";
import { PROMPT_MODULE_CONTRACT_SCHEMA_VERSION } from "../runtime/prompt-modules/index.js";
import type { ContextWorkspaceMode } from "./ingest-task.js";

export const CONTEXT_ASSIMILATION_PROMPT_ADDRESS =
  "framework/template/generated.artifact/context_assimilation/v2";

export function buildContextAssimilationPromptModule(
  workspaceMode?: ContextWorkspaceMode,
): PromptModule {
  const deprecatedModeAlias =
    workspaceMode !== undefined && workspaceMode !== "maximum-assimilation"
      ? `Legacy mode \`${workspaceMode}\` is accepted as an alias for \`maximum-assimilation\`.`
      : undefined;
  return {
    schema_version: PROMPT_MODULE_CONTRACT_SCHEMA_VERSION,
    address: {
      value: CONTEXT_ASSIMILATION_PROMPT_ADDRESS,
      namespace: "framework",
      surface: "template",
      target: "generated.artifact",
      slot: "body",
      name: "context_assimilation_v2",
    },
    owner: { kind: "framework", package_name: "agentplane" },
    title: "Context assimilation prompt",
    summary:
      "Compact CURATOR workflow for converting selected sources into a linked wiki and validated formal context.",
    content_kind: "markdown",
    content: [
      "# Context Assimilation",
      "",
      "Goal: execute the `context.maximum_assimilation` blueprint by preserving reusable source meaning in a linked human/agent wiki plus typed claims, ontology, graph, provenance, and coverage artifacts. Raw sources remain source-of-truth and must not be edited.",
      ...(deprecatedModeAlias ? ["", deprecatedModeAlias] : []),
      "",
      "## Task-bound inputs",
      "",
      "Read these before writing:",
      "- `source-set.lock.json`: exact selected paths, hashes, status, type, and size.",
      "- `source-spans.skeleton.jsonl`: stable span ids for line-addressed extraction and coverage.",
      "- `canonical-snapshot.json`: current surface counts/digests plus bounded existing page/entity candidates.",
      "- `canonical-entity-catalog.json`: complete existing entity inventory with aliases, source refs, wiki targets, and graph neighborhoods. Treat it as evidence to inspect, not as an automatic matching result.",
      "- `extraction-contract.json`: authoritative SGR v2 payload fields and a complete valid example.",
      "- `expected-artifacts.json`: finish contract.",
      "",
      "## Semantic work",
      "",
      "1. Reconcile semantically: compare each source term with the complete canonical entity catalog and the task-bound evidence for plausible candidates. CURATOR owns this judgment; deterministic AgentPlane code must not infer equivalence from spelling, identifiers, embeddings, or heuristics.",
      "2. For every entity-bearing term, compare kind, scope, time/validity, ownership, defining properties, aliases, source evidence, wiki use, and graph neighborhood. Record candidates checked, decision dimensions, evidence for and against, rationale, and unresolved questions in one `entity_resolution` row.",
      "3. Choose exactly one resolution: `same_as`, `alias_of`, `distinct_entity`, `possibly_same_as`, or `new_entity_proposal`. `same_as` and `alias_of` must reuse `canonical_entity_id` and must not emit a duplicate `graph_entity`. `possibly_same_as` must preserve both identities and state what evidence is missing. `new_entity_proposal` requires evidence that checked candidates do not match.",
      "4. Classify every selected span as significant, boilerplate, redacted, duplicate, conflict, out-of-scope, or unresolved.",
      "5. Extract entities, aliases, typed claims, relations, conflicts, open questions, page decisions, a source-shaped topology decision, and coverage into one SGR v2 `context_extraction` JSON file matching `extraction-contract.json`.",
      "6. Return only that semantic result and its evidence-bearing decisions. CLI supervision materializes the formal layer and linked wiki, validates every deterministic gate, performs retrieval checks, invokes independent evaluation, records ACR, and finalizes the run.",
      "7. If a later semantic rework work order arrives, use only its bounded evaluator feedback plus the task-bound inputs to return a new corrected SGR. Do not replay or operate lifecycle steps.",
      "",
      "## Required quality",
      "",
      "- The topology decision must name the source shape, rationale, evidence spans, canonical page families, path templates, creation rules, and page-vs-heading rules. Do not emit a familiar default scaffold without source evidence.",
      "- Page decisions must support stable identity, modality/status, source refs, aliases, tags, graph refs, summaries, and an append-only parseable history.",
      "- Every significant span needs a coverage row or an explicit reason. Every factual output needs precise `source_refs`; every new/changed page needs page-creation and topology support.",
      "- Graph entities must be reconciled before creation and linked by useful edges. Semantic identity requires comparative evidence; stable IDs and lexical similarity are lookup keys, not proof. Aliases must resolve to one canonical entity unless explicitly uncertain.",
      "- Stop rather than merge when kind, scope, validity, ownership, or defining properties conflict. Keep `possibly_same_as` and `distinct_entity` decisions visible for later review.",
      "- Record stale, conflict, unresolved, or no-derived-record outcomes explicitly. Do not promote weak claims, invent canonical terms, flatten contradictions, or claim completeness from raw-only recall.",
      "- If work stalls or ownership changes, record a handoff with source set, changed files, verification state, and next action.",
      "",
      "## Output and stop rules",
      "",
      "- Output: one schema-valid `context_extraction` SGR under the task-owned `semantic-results/` directory. Include all required entity-resolution evidence, source refs, topology/page decisions, graph relations, conflicts, open questions, and coverage rows.",
      "- Evidence: preserve modality, validity, status, scope, supersession, confidence, visibility, and contradictions; never overwrite conflicting knowledge silently.",
      "- Stop: do not apply artifacts, rebuild indexes, run checks, invoke evaluators, write ACR, or finalize. Those are CLI-owned mechanical operations.",
      "- Budget: one CURATOR semantic result per work order. A semantic rework is a new bounded work order with only the relevant evaluator feedback.",
    ].join("\n"),
    mutability: "replaceable",
    merge: { mode: "pick_one", conflict: "error", precedence: 100 },
    load: {
      roles: ["CURATOR"],
      commands: ["context ingest", "context learn files", "context learn changes"],
      task_tags_any: ["context", "assimilation"],
    },
    provenance: {
      source_kind: "framework_builtin",
      source_ref: "context.ingest#create-context-assimilation-task",
      generated_by: "context.ingest",
    },
  };
}
