import type { TaskNewParsed } from "../commands/task/new.js";
import type { PromptModule } from "../runtime/prompt-modules/index.js";
import { PROMPT_MODULE_CONTRACT_SCHEMA_VERSION } from "../runtime/prompt-modules/index.js";
import type { ContextIngestParsed, ManifestEntry } from "./ingest.js";

const CONTEXT_ASSIMILATION_PROMPT_ADDRESS =
  "framework/template/generated.artifact/context_assimilation/v1";

export type ContextWorkspaceMode = "basic" | "maximum-assimilation";

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
  const title = `context assimilation (${modeLabel})`;
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
          "- Use Obsidian-compatible `[[Page Title]]` or `[[Page Title#Section]]` wikilinks for semantic wiki graph links; keep standard Markdown links for source refs and external/file references.",
          "- Maintain a canonical glossary over wiki pages and graph entities; use canonical terms in prose and preserve source-local terms as aliases or evidence details.",
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

function buildContextAssimilationPromptModule(workspaceMode?: ContextWorkspaceMode): PromptModule {
  const maximumAssimilation = isMaximumAssimilation(workspaceMode);
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
    owner: {
      kind: "framework",
      package_name: "agentplane",
    },
    title: "Context assimilation prompt",
    summary:
      "Default CURATOR prompt module for turning raw or changed sources into a linked llm-wiki plus atomic claims, graph rows, and provenance.",
    content_kind: "markdown",
    content: [
      "# Context Assimilation",
      "",
      "You are CURATOR maintaining an AgentPlane llm-wiki. The task is executed by Codex, an IDE agent, or a human-assisted agent working in the repository. Treat this task README and extension as the portable source of instructions.",
      "",
      "Goal: transform the selected sources into durable, human-readable wiki artifacts and machine-readable context artifacts without laundering weak claims into truth.",
      "",
      "Core rules:",
      "- Raw sources remain source-of-truth. Do not mutate `context/raw/**`.",
      `- Treat \`${maximumAssimilation ? "context.maximum_assimilation" : "context.assimilation"}\` as the governing blueprint for lifecycle order, evidence, stop rules, and recovery.`,
      "- Source-set lock and pre-write search/reconciliation happen before wiki edits.",
      "- Wiki pages are synthesis artifacts for humans and agents. They should be readable markdown with YAML frontmatter.",
      "- Atomic claims belong in derived claim/fact rows and graph rows. Do not create one markdown page per minor claim.",
      "- Create a new wiki page when a concept, entity, decision, requirement, policy, risk, definition, workflow, or module is likely to be reused by future tasks.",
      "- Keep related claims on a topic page when that is more readable, but mark every important claim with modality, status, scope, and source_refs.",
      "- Put meaningful wiki links inline in the narrative text at the first useful mention, not only in a trailing Related Pages section.",
      "- When pre-write lookup gives high confidence that a source term matches an existing concept/entity/page, use the canonical term in prose and link it to the canonical page or section.",
      "- Use Markdown links for source_refs. Use meaningful page-to-page references for wiki navigation; in maximum-assimilation mode these should be Obsidian-compatible wikilinks.",
      "- Represent every extracted assertion as a claim candidate until its source and status justify stronger use.",
      "- Preserve modality: factual_claim, observation, assumption, hypothesis, decision, policy, preference, requirement, risk, capability, definition, deprecation.",
      "- Use confidence vectors for factual/requirement/risk claims; do not use one scalar confidence score.",
      "- For decisions from completed task evidence, write ADR/evolution records with source_refs, decision_status, scope, supersedes/superseded_by, and provenance integrity rather than probabilistic confidence.",
      "- If a new claim contradicts existing context, write a conflict candidate, keep both claims, lower conflict_status, and ask the user before promotion or overwrite.",
      "- Keep private or sensitive data out of public wiki artifacts. Preserve visibility/sensitivity metadata when relevant.",
      "- If no facts, graph rows, provenance rows, or report records are produced, record an explicit no-derived-records reason before verification.",
      "- If work stalls or ownership changes, record a handoff with the current source-set, changed files, verification state, and next action before another agent resumes.",
      "",
      "Expected outputs:",
      "- `context/wiki/**` pages with frontmatter manifests.",
      "- `.agentplane/context/derived/facts/**` or claim/fact rows with source_refs and status.",
      "- `.agentplane/context/derived/graph/**` entities, edges, and provenance edges.",
      "- `.agentplane/context/derived/reports/**` when useful for conflict, stale, or open-question summaries.",
      "",
      "Recommended CLI helpers:",
      "- Use `agentplane context reindex --include-raw` after raw/wiki/fact/graph changes and before validation.",
      "- Use `agentplane context wiki new <slug> --modality <type> --source <source-ref>` to create pages with the required AgentPlane frontmatter.",
      "- Use `agentplane context wiki lint context/wiki` before verification.",
      "- Use `agentplane context wiki explain <page>` to inspect page metadata before updating it.",
      "- Use `agentplane context wiki link <page>` to find existing pages that may deserve meaningful cross-links.",
      "- Use `agentplane context wiki index context/wiki` after creating or moving pages so index/navigation pages stay current.",
      '- Use `agentplane context search "<term>"` before creating a new page or entity.',
      "- Use `agentplane context graph show <entity-id>` and `agentplane context graph neighbors <entity-id>` before choosing canonical entity names.",
      "",
      "Before writing:",
      "- Search existing wiki, facts, and graph rows for matching entities, concepts, and claims.",
      "- Prefer updating canonical pages over creating duplicates.",
      "- Prefer existing canonical labels over source-local wording; record source-local names as aliases when useful.",
      "- If a document extends an existing entity, update the existing page or section and add sourced claims/provenance instead of creating a duplicate page.",
      "- If a small object belongs inside a broader topic, describe it under a stable heading and link to that section from related pages.",
      "- Update relevant `index.md` pages when adding, moving, or materially renaming wiki pages; the index is navigation metadata, not semantic truth.",
      "- Use `possibly_same_as` or an open question when entity identity is uncertain.",
      "- If new evidence contradicts existing knowledge, create a conflict candidate and request review before promotion or overwrite.",
      "- Final update step: refresh affected indexes, navigation pages, glossary entries, and tables of contents after wiki and derived artifact changes are complete.",
      ...(maximumAssimilation
        ? [
            "",
            "Maximum-assimilation workflow:",
            "- Intake: classify each selected source span as significant content, boilerplate, redacted, duplicate, or unresolved.",
            "- Source identity: preserve each source's `sha256:`, path, content type, line count, ingest time, and availability state. Cite extracted content with line refs such as `context/raw/<user-path>/note.md#lines=12-24`.",
            "- Extraction pass: identify canonical entities, source-local aliases, relations, decisions, requirements, risks, workflows, definitions, conflicts, and open questions before article writing.",
            "- Topology pass: choose the wiki structure from source evidence, then record the topology decision and rationale before creating page families. Do not mechanically create `concepts/`, `entities/`, `decisions/`, `modules/`, `contradictions/`, or `reports/` just because they are familiar defaults.",
            "- Glossary pass: update the canonical glossary as a navigation index over wiki pages and graph entities; normalize prose to canonical terms where confidence is high.",
            "- Synthesis pass: create granular wiki pages and stable headings from the extracted graph/glossary layer. The wiki should preserve all significant source meaning even without raw files.",
            "- Obsidian pass: use YAML frontmatter plus `[[Canonical Page]]` and `[[Canonical Page#Stable Heading]]` wikilinks for semantic internal links. Use normal Markdown links for source refs and external/file links so AgentPlane source hygiene stays intact.",
            "- Coverage pass: write or update a coverage report naming covered spans, omitted boilerplate, redacted sensitive spans, conflicts, unresolved identities, and any approval-required gaps.",
            "- Evaluation pass: request or record an EVALUATOR quality review that checks source-shaped topology, page granularity, useful wikilinks/backlink potential, line-addressed provenance, glossary alias safety, coverage gaps, raw-deletion resilience, and private leakage.",
            "- Critical check: do not flatten contradictions, do not silently invent canonical terms, do not copy secrets or non-publishable source spans into public wiki/task/ACR surfaces, and do not claim full semantic coverage without self-contained wiki/fact/graph content plus line-addressed provenance.",
          ]
        : []),
      "",
      "Verification:",
      "- Run `agentplane context reindex --include-raw` after the final content change.",
      "- Run `agentplane context wiki lint context/wiki`.",
      "- Run `agentplane context verify-task <task-id>`.",
      "- Run `agentplane context graph validate`.",
      "- Run `agentplane context doctor`.",
      ...(maximumAssimilation
        ? [
            '- Run or record `agentplane verify <task-id> --ok|--rework --by EVALUATOR --note "..."` after CURATOR verification.',
          ]
        : []),
      "- Run a smoke `agentplane context search` query using exact source terminology.",
    ].join("\n"),
    mutability: "replaceable",
    merge: {
      mode: "pick_one",
      conflict: "error",
      precedence: 100,
    },
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
                  "canonical_glossary_updated",
                  "obsidian_wikilinks_reviewed",
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
                  "missing_obsidian_wikilinks",
                  "coverage_gap_without_reason",
                  "glossary_conflict",
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
