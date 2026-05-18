# Context workspace

Profile: adaptive

Use this directory as the human-readable context surface.

AgentPlane local context uses one adaptive llm-wiki contract:

- `context/raw/**` keeps source material.
- `context/wiki/**` keeps readable synthesis pages with AgentPlane frontmatter.
- `.agentplane/context/derived/**` keeps reproducible claims, graph rows, provenance, and reports.
- `.agentplane/context/service/**` keeps local caches only.

Agents should create wiki pages when a topic is reusable for future tasks, but keep atomic claims in
derived machine artifacts. `context init` creates only `context/wiki/AGENTS.md` and
`context/wiki/index.md`; the first ingest creates starter wiki folders when there is source
material to assimilate. Source references should be markdown links where possible.
