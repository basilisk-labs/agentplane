import type { PromptModule } from "../runtime/prompt-modules/index.js";
import { PROMPT_MODULE_CONTRACT_SCHEMA_VERSION } from "../runtime/prompt-modules/index.js";
import type { ContextWorkspaceMode } from "./ingest-task.js";

export const CONTEXT_ASSIMILATION_PROMPT_ADDRESS =
  "framework/template/generated.artifact/context_assimilation/v1";

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
      name: "context_assimilation_v1",
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
      "- `extraction-contract.json`: authoritative SGR v2 payload fields and a complete valid example.",
      "- `expected-artifacts.json`: finish contract.",
      "",
      "## Execute in order",
      "",
      "1. Reconcile: compare the source lock with the canonical snapshot. Run `agentplane context search`, `agentplane context graph show`, and `agentplane context graph neighbors` for candidate identities. Reuse canonical pages/entities; keep uncertain identity as `possibly_same_as` or an open question.",
      "2. Classify every selected span as significant, boilerplate, redacted, duplicate, conflict, out-of-scope, or unresolved.",
      "3. Extract entities, aliases, typed claims, relations, conflicts, open questions, page decisions, a source-shaped topology decision, and coverage into one SGR v2 `context_extraction` JSON file matching `extraction-contract.json`.",
      "4. Compile the formal layer and linked wiki atomically with `agentplane context extraction apply <sgr-json> --task-id <task-id> --synthesize-wiki`. Do not hand-edit writer-owned JSONL or managed wiki blocks when the supported writer can materialize them.",
      "5. Review the compiled `context/wiki/**` pages. The compiler updates existing canonical pages before creating new ones, preserves human prose outside managed blocks, records stable atoms and graph references, and appends an idempotent entry to `context/wiki/log.md`. Create page decisions only for reusable concepts/entities/decisions/requirements/policies/risks/definitions/workflows/modules; keep local detail under stable headings.",
      "6. Link first meaningful mentions with case-stable Obsidian wikilinks such as `[[canonical-page|Label]]` or `[[canonical-page#Stable Heading|Label]]`. Use Markdown links for source refs and external/file links. Keep `context/wiki/glossary.md` a thin alias/navigation index over canonical pages/entities.",
      "7. Cite source-backed prose with numeric notes and put line-addressed raw Markdown links in a trailing `## Sources`. Preserve modality, validity, status, scope, supersession, confidence, visibility, and contradictions; never overwrite conflicting knowledge silently.",
      "8. Refresh indexes and reports, then evaluate practical retrieval through wiki/derived entrypoints. The result must remain useful if raw files disappear, while private/sensitive source content must not leak into public wiki/task/ACR surfaces.",
      "",
      "## Required quality",
      "",
      "- The topology decision must name the source shape, rationale, evidence spans, canonical page families, path templates, creation rules, and page-vs-heading rules. Do not emit a familiar default scaffold without source evidence.",
      "- Wiki pages require YAML frontmatter for stable identity, modality/status, source refs, aliases, tags, and graph refs.",
      "- `context/wiki/index.md` must expose one-line page summaries and source counts; `context/wiki/log.md` is append-only and parseable by humans and agents.",
      "- Every significant span needs a coverage row or an explicit reason. Every factual output needs precise `source_refs`; every new/changed page needs page-creation and topology support.",
      "- Graph entities must be reconciled before creation and linked by useful edges. Aliases must resolve to one canonical entity unless explicitly uncertain.",
      "- Record stale, conflict, unresolved, or no-derived-record outcomes explicitly. Do not promote weak claims, invent canonical terms, flatten contradictions, or claim completeness from raw-only recall.",
      "- If work stalls or ownership changes, record a handoff with source set, changed files, verification state, and next action.",
      "",
      "## Verify",
      "",
      "Run after the final content change:",
      "- `agentplane context reindex --include-raw`",
      "- `agentplane context wiki lint context/wiki`",
      "- `agentplane context wiki index context/wiki`",
      "- `agentplane context wiki report context/wiki`",
      "- `agentplane context graph validate`",
      "- `agentplane context verify-task <task-id>`",
      "- `agentplane context doctor`",
      "- a smoke `agentplane context search` using exact source terminology",
      "- `agentplane evaluator run <task-id> ...` with evidence for topology, granularity, links, provenance, coverage, alias safety, raw-deletion resilience, and leakage review.",
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
