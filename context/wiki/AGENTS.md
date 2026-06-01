---
aliases:
  - "Context wiki agent notes"
tags:
  - agentplane/context
cssclasses:
  - agentplane-context
agentplane_context:
  schema_version: 1
  artifact_type: wiki_page
  canonical_id: "wiki.agents"
  title: "Context wiki agent notes"
  modality: policy
  epistemic_status: sourced_claim
  visibility: project
  source_refs: []
  claims: []
  graph_refs:
    entities: []
    edges: []
  conflicts: []
  updated_by: context_init
---

# Context wiki agent notes

Profile: maximum-assimilation

- Treat `context/wiki/**` as durable, source-backed project knowledge with stable AgentPlane frontmatter.
- Treat `.agentplane/context/agentplane.context.yaml` as the machine-readable context contract and `.agentplane/context/policies/wiki.rules.md` as the human-readable wiki policy.
- Analyze the base project, existing docs, task history, and raw sources before choosing a wiki structure.
- Choose the smallest wiki hierarchy that fits this project; do not force a universal concepts/entities/decisions/modules layout.
- Keep this initialized wiki minimal until first ingest; project-specific folders should appear from source-backed assimilation, not from empty scaffolding.
- Preserve modality, source refs, cross-links, glossary aliases, and graph alignment when updating pages.
- Write synthesized wiki prose in English by default; preserve source-language terms only for quotes, titles, proper names, aliases, paths, and code identifiers.
- Prefer updating existing canonical pages over creating duplicates; describe small objects under stable headings when that is clearer.
- Use `agentplane context wiki new`, `agentplane context wiki lint`, `agentplane context wiki explain`, `agentplane context wiki link`, and `agentplane context wiki index`.
- When claims conflict, keep both claims, create a conflict candidate, and ask for review before promotion or overwrite.
- Keep raw inputs in `context/raw/**`; preserve the user-created hierarchy when citing sources.
- Add source references for factual claims and run `agentplane context verify-task <task-id>` before closing context assimilation work.

## Maximum assimilation mode

- Use the `context.maximum_assimilation` blueprint for new context assimilation tasks.
- Goal: after assimilation, the maintained wiki and derived artifacts preserve all significant
  source meaning without relying on raw files for semantic recall.
- Keep original hashes in the source-set lock and cite source content with concrete line refs such as
  `context/raw/<user-path>/note.md#lines=12-24`; treat those refs as audit provenance, not as the
  stored meaning.
- First pass: build or update canonical entities, glossary aliases, relation candidates, conflicts, and coverage notes.
- Glossary output: create or update `context/wiki/glossary.md` as the root glossary file; do not scatter canonical glossary state across reports or page-local notes.
- Topology pass: choose wiki structure from source content; do not mechanically create
  `concepts/`, `entities/`, `decisions/`, `modules/`, `contradictions/`, or `reports/`.
- Record a topology decision before page-family creation. It must classify the source shape (book/corpus, codebase, task history, product docs, research notes, ops logs, or another named shape), name canonical page families, justify page-vs-heading granularity, map source-local terms to canonical labels or aliases, and keep ambiguous identities as open questions.
- Second pass: synthesize granular wiki articles from that graph/glossary layer; use canonical terms from `context/wiki/glossary.md` and preserve source-local wording as aliases.
- Create separate pages for reusable entities, concepts, decisions, requirements, risks, workflows,
  and modules; use stable headings for smaller objects inside broader pages.
- Ensure each wiki page has Obsidian properties `aliases`, `tags`, and `cssclasses` in YAML
  frontmatter in addition to the `agentplane_context` manifest.
- Use Obsidian-compatible wikilinks whose target case exactly matches a canonical page path, title,
  or alias; add a display alias or heading anchor only when display wording differs.
- Cite raw sources in prose with numeric notes like `[1]`; keep Markdown raw-data links in a
  trailing `## Sources` section rather than scattering long source URLs through prose.
- Record extraction coverage: covered source spans, intentionally omitted boilerplate, redacted
  spans, unresolved conflicts, and open questions.
- Record EVALUATOR review for topology, granularity, wikilinks, line refs, glossary safety,
  coverage gaps, raw-deletion resilience, and private leakage risk before finish.
- If a raw source is missing later, keep its source registry entry with availability state
  `missing`; the wiki, facts, graph, glossary, and coverage artifacts must still carry the
  assimilated meaning.
- Do not copy secrets into public wiki pages. Redact sensitive source spans before publication.

## Sources

- no-source: generated policy notes from `agentplane context init`; add source references before promotion.
