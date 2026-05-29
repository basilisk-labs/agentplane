import type { PromptModule } from "../runtime/prompt-modules/index.js";
import { PROMPT_MODULE_CONTRACT_SCHEMA_VERSION } from "../runtime/prompt-modules/index.js";
import type { ContextWorkspaceMode } from "./ingest-task.js";

export const CONTEXT_ASSIMILATION_PROMPT_ADDRESS =
  "framework/template/generated.artifact/context_assimilation/v1";

function isMaximumAssimilation(mode?: ContextWorkspaceMode): boolean {
  return mode === "maximum-assimilation";
}

export function buildContextAssimilationPromptModule(
  workspaceMode?: ContextWorkspaceMode,
): PromptModule {
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
      "- Use Markdown links for source_refs. Use meaningful page-to-page references for wiki navigation; in maximum-assimilation mode these should be Obsidian-compatible wikilinks with target case matching canonical paths, titles, or aliases.",
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
      "- `.agentplane/context/derived/reports/**`, including `coverage.jsonl` in maximum-assimilation mode.",
      "",
      "Supported derived writer:",
      "- First produce a valid `context_extraction` SGR JSON result with `graph_entity`, `fact`, `graph_edge`, and maximum-assimilation `coverage` items.",
      "- Apply it with `agentplane context extraction apply <sgr-json> --task-id <task-id>` before narrative wiki synthesis so the formal layer exists before articles.",
      "- Do not hand-edit derived JSONL rows when the supported writer can materialize and validate the formal layer.",
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
            "- Extraction pass: identify canonical entities, source-local aliases, relations, decisions, requirements, risks, workflows, definitions, conflicts, open questions, and per-source coverage before article writing.",
            "- Writer pass: save the extraction result as `context_extraction` SGR JSON and run `agentplane context extraction apply <sgr-json> --task-id <task-id>` so facts, graph entities, graph edges, provenance, and coverage rows are non-empty before wiki synthesis.",
            "- Topology pass: choose the wiki structure from source evidence, then record the topology decision and rationale before creating page families. Do not mechanically create `concepts/`, `entities/`, `decisions/`, `modules/`, `contradictions/`, or `reports/` just because they are familiar defaults.",
            "- The topology decision must classify source shape (book/corpus, codebase, task history, product docs, research notes, ops logs, or another named shape), name canonical page families, justify page-vs-heading granularity, provide source-backed evidence for every new family, map source-local terms to canonical labels or aliases, and keep ambiguous identities as open questions.",
            "- Glossary pass: create or update `context/wiki/glossary.md` as the root canonical glossary and navigation index over wiki pages and graph entities; normalize prose to canonical terms where confidence is high.",
            "- Synthesis pass: create granular wiki pages and stable headings from the extracted graph/glossary layer. The wiki should preserve all significant source meaning even without raw files.",
            "- Obsidian pass: use YAML frontmatter plus Obsidian properties (`aliases`, `tags`, `cssclasses`) and case-stable wikilinks such as `[[canonical-page|Canonical Page]]` or `[[canonical-page#Stable Heading|Canonical Page]]` for semantic internal links. Use normal Markdown links for source refs and external/file links so AgentPlane source hygiene stays intact.",
            "- Source-note pass: cite source-backed prose with numeric notes like `[1]`, then collect raw-data links in a trailing `## Sources` section so the page stays readable while provenance remains dereferenceable.",
            "- Coverage pass: include `coverage` SGR items for every selected source path. Mark each source as `covered`, `omitted_boilerplate`, `redacted`, or `unresolved`; include a reason and covered item ids when status is `covered`.",
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
            '- Run `agentplane evaluator run <task-id> --verdict pass|rework|blocked|human_review --summary "..." --finding "..." --evidence <path-or-check>` after CURATOR verification.',
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
