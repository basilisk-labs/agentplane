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

function isMaximumAssimilation(mode?: ContextWorkspaceMode): boolean {
  return mode === "maximum-assimilation";
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
  const maximumAssimilation = isMaximumAssimilation(workspaceMode);
  const blueprintId: NonNullable<TaskNewParsed["blueprintRequest"]> = maximumAssimilation
    ? "context.maximum_assimilation"
    : "context.assimilation";
  const title = `context assimilation (${modeLabel}${buildTitleSourceHint(modeSource)})`;
  const promptRef = CONTEXT_ASSIMILATION_PROMPT_ADDRESS;
  const description = [
    `Source context assimilation for ${modeLabel}.`,
    "This task is created by `context ingest`.",
    `Source set: ${JSON.stringify(modeSource.map((row) => row.path))}`,
    `Mode detail: mode=${opts.mode}, indexOnly=${opts.indexOnly}, dryRun=${opts.dryRun}`,
    `Total tracked candidates: ${sourceRows.length}`,
    `Changed/new candidates: ${modeSource.length}`,
    `Raw hierarchy: user-owned paths under context/raw/** are included as source paths.`,
    `Run policy: task-owner CURATOR`,
    `Prompt module: ${promptRef}`,
    `Blueprint: ${blueprintId}`,
    "",
    "CURATOR contract:",
    "- Follow the context.assimilation lifecycle: source_set lock -> pre-write search/reconcile -> wiki/facts/graph/report writes -> reindex -> lint -> graph validate -> verify-task -> doctor -> smoke search.",
    "- Maintain `context/wiki/**` as a human-readable, source-backed llm-wiki.",
    "- Use markdown frontmatter as the page manifest for modality, status, source_refs, claims, and graph refs.",
    "- Keep atomic claims and graph rows in derived artifacts; do not turn every claim into a wiki page.",
    "- Create or update wiki pages only when the topic is reusable for future tasks or useful to a human reader.",
    "- Add meaningful cross-links between related wiki pages on first useful mention.",
    "- Represent facts, decisions, policies, requirements, risks, preferences, and definitions as distinct modalities.",
    "- If claims conflict, create a conflict candidate and ask for review before promotion; never overwrite silently.",
    "- Treat completed-task architecture changes as ADR/evolution records with provenance, not as probabilistic facts.",
    ...(maximumAssimilation
      ? [
          "",
          "Maximum-assimilation contract:",
          "- Preserve all significant source meaning in wiki and derived artifacts so semantic recall does not depend on retaining raw files.",
          "- Keep original source identity in a source registry or source-set lock with path, `sha256:`, content type, line count, ingest time, and availability state.",
          "- Use concrete line-addressed source refs for extracted claims, entities, relations, glossary aliases, and article sections as audit provenance, not as retained content.",
          "- Run extraction in two passes: first entities/aliases/relations/conflicts/open questions/coverage, then narrative wiki articles based on that structured layer.",
          "- Choose wiki structure from the selected source content; do not create the default concepts/entities/decisions/modules/contradictions/reports scaffold unless the source analysis justifies that topology.",
          "- Record a wiki topology decision in `context/wiki/index.md`, a source-backed topology page, or an assimilation report before creating new page families.",
          "- The topology decision must classify source shape (book/corpus, codebase, task history, product docs, research notes, ops logs, or another named shape), name canonical page families, justify page-vs-heading granularity, provide source-backed evidence for each family, and list aliases or unresolved identities.",
          "- Use Obsidian-compatible wikilinks whose target case exactly matches a canonical page path, title, or alias; prefer `[[canonical-page|Display Label]]` when display wording differs. Keep standard Markdown links for source refs and external/file references.",
          "- Add Obsidian page properties (`aliases`, `tags`, `cssclasses`) to generated wiki pages so vault navigation and display work without editor-local setup.",
          "- Cite raw sources in prose with numeric notes like `[1]`; put the raw-data Markdown links in a trailing `## Sources` section.",
          "- Create or update the canonical glossary as the root wiki file `context/wiki/glossary.md`, keeping it as an alias/navigation layer over wiki pages and graph entities.",
          "- Use canonical terms from `context/wiki/glossary.md` in prose and preserve source-local terms as aliases or evidence details.",
          "- Record a coverage map: covered source spans, intentionally omitted boilerplate, redacted sensitive spans, unresolved identity questions, and remaining conflicts.",
          "- Treat raw-deletion resilience as a finish gate: if `context/raw/**` were removed, the maintained wiki and derived artifacts should still preserve the significant source meaning. Raw refs may become non-dereferenceable.",
          "- Require an EVALUATOR quality review for source-shaped structure, granularity, wikilinks, coverage, glossary/alias safety, and raw-deletion resilience before finish.",
        ]
      : []),
  ].join("\n");
  return {
    title,
    description,
    verify: [
      "agentplane context reindex --include-raw",
      "agentplane context wiki lint context/wiki",
      "agentplane context wiki index context/wiki",
      "agentplane context verify-task <created-task-id>",
      "agentplane context doctor",
      "agentplane context graph validate",
      'agentplane context search "<smoke-query>" --format json',
      "agentplane acr generate <created-task-id> --write",
      "agentplane acr check <created-task-id>",
    ],
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
  const maximumAssimilation = isMaximumAssimilation(workspaceMode);
  const blueprintId: NonNullable<TaskNewParsed["blueprintRequest"]> = maximumAssimilation
    ? "context.maximum_assimilation"
    : "context.assimilation";
  const allowedOutputs = [
    "context/wiki/**",
    ".agentplane/context/derived/facts/**",
    ".agentplane/context/derived/graph/**",
    ".agentplane/context/derived/reports/**",
    ".agentplane/tasks/${taskId}/README.md",
    ".agentplane/tasks/${taskId}/acr.json",
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
    tags: ["context", "assimilation"],
    taskKind: "context",
    mutationScope: "context",
    blueprintRequest: blueprintId,
    extensions: {
      "agentplane.context": {
        schema_version: 1,
        task_type: "context_assimilation",
        manifest: ".agentplane/context/agentplane.context.yaml",
        workspace: "context",
        mode: maximumAssimilation ? "maximum_assimilation" : "wiki",
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
            ...(maximumAssimilation
              ? [
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
                ]
              : []),
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
            ...(maximumAssimilation
              ? [
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
                ]
              : []),
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
          page_granularity: maximumAssimilation ? "granular_topic_artifact" : "topic_artifact",
          claim_granularity: "atomic",
          frontmatter_required: true,
          cross_links_required: true,
          source_refs_as_markdown_links: true,
          ...(maximumAssimilation
            ? {
                maintenance_mode: "maximum_assimilation",
                raw_deletion_resilience_required: true,
                line_refs_required: true,
                entity_relation_first: true,
                canonical_glossary_required: true,
                canonical_glossary_path: "context/wiki/glossary.md",
              }
            : {}),
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
    showBlueprint: false,
    allowDuplicate: true,
    riskFlags: [],
  };
}
