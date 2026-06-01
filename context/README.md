# Context workspace

Profile: maximum-assimilation

Use this directory as the human-readable context surface.

AgentPlane local context is optional and independent from runner prompt assembly. When enabled, it
uses one llm-wiki contract:

- `context/raw/**` keeps source material.
- `context/wiki/**` keeps readable synthesis pages with AgentPlane frontmatter.
- `.agentplane/context/derived/**` keeps reproducible claims, graph rows, provenance, and reports.
- `.agentplane/context/service/**` keeps local caches only.

Agents should create wiki pages when a topic is reusable for future tasks, but keep atomic claims in
derived machine artifacts. `context init` creates only `context/raw/.gitkeep`,
`context/wiki/AGENTS.md`, and `context/wiki/index.md`; users own any hierarchy below
`context/raw/**`. Source references should preserve user-created raw paths where possible.

Maximum-assimilation mode adds a stricter wiki maintenance contract:

- Preserve all significant source meaning in wiki, facts, graph, glossary, and coverage
  artifacts so maintained context remains useful even if `context/raw/**` is later removed.
- Keep original source identity in a source registry with `source_id`, original path,
  `sha256:` hash, content type, line count, ingest time, and availability state.
- Use line-addressed source refs as provenance pointers, not retained content; missing raw refs may be non-dereferenceable while wiki/fact/graph artifacts stay self-contained.
- Extract entities, aliases, relations, decisions, requirements, risks, workflows, and conflicts
  before writing narrative articles.
- Choose the wiki structure from source content; do not create the default
  concepts/entities/decisions/modules/contradictions/reports scaffold unless source analysis
  justifies it. Record the topology decision before creating page families.
- Create or maintain the canonical glossary as root file `context/wiki/glossary.md`; keep it as navigation/aliases over wiki pages and graph entities, then use canonical terms in prose.
- Create Obsidian page properties automatically for wiki pages: `aliases`, `tags`, and
  `cssclasses` stay alongside AgentPlane frontmatter for better vault rendering.
- Use Obsidian-compatible links whose target case exactly matches a canonical page path, title, or
  alias; prefer `[[canonical-page|Display Label]]` when file path and display title differ.
- Cite raw sources in prose with numeric notes like `[1]`; keep the raw-data Markdown links in a
  trailing `## Sources` section.
- Treat coverage gaps, unresolved entity identity, sensitive-source leakage risk, and missing line refs
  as blockers or explicit approval-required findings.
- Require EVALUATOR review of topology, granularity, wikilinks, coverage, glossary safety,
  raw-deletion resilience, and private leakage risk before finish.
