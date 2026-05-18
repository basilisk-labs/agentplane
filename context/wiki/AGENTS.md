---
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

Profile: adaptive

- Treat `context/wiki/**` as durable, source-backed project knowledge with stable AgentPlane frontmatter.
- Analyze the base project, existing docs, task history, and raw sources before choosing a wiki structure.
- Choose the smallest wiki hierarchy that fits this project; do not force a universal concepts/entities/decisions/modules layout.
- Keep this initialized wiki minimal until first ingest; project-specific folders should appear from source-backed assimilation, not from empty scaffolding.
- Preserve modality, source refs, cross-links, glossary aliases, and graph alignment when updating pages.
- Prefer updating existing canonical pages over creating duplicates; describe small objects under stable headings when that is clearer.
- Use `agentplane context wiki new`, `agentplane context wiki lint`, `agentplane context wiki explain`, `agentplane context wiki link`, and `agentplane context wiki index`.
- When claims conflict, keep both claims, create a conflict candidate, and ask for review before promotion or overwrite.
- Keep raw inputs in `context/raw/**`; do not copy private raw sources into public wiki pages.
- Add source references for factual claims and run `agentplane context verify-task <task-id>` before closing context assimilation work.

## Source References

- no-source: generated policy notes from `agentplane context init`; add source references before promotion.
