import type { ContextInitParsed } from "./context.spec.js";
import { wikiFrontmatter } from "./init-wiki.js";

export function buildContextReadme(profile: ContextInitParsed["profile"]): string {
  const maximumAssimilation =
    profile === "maximum-assimilation"
      ? `
Maximum-assimilation mode adds a stricter wiki maintenance contract:

- Preserve all significant source meaning in wiki, facts, graph, glossary, and coverage
  artifacts so maintained context remains useful even if \`context/raw/**\` is later removed.
- Keep original source identity in a source registry with \`source_id\`, original path,
  \`sha256:\` hash, content type, line count, ingest time, and availability state.
- Use line-addressed source refs as provenance pointers, not retained content; missing raw refs may be non-dereferenceable while wiki/fact/graph artifacts stay self-contained.
- Extract entities, aliases, relations, decisions, requirements, risks, workflows, and conflicts
  before writing narrative articles.
- Choose the wiki structure from source content; do not create the default
  concepts/entities/decisions/modules/contradictions/reports scaffold unless source analysis
  justifies it. Record the topology decision before creating page families.
- Create or maintain the canonical glossary as root file \`context/wiki/glossary.md\`; keep it as navigation/aliases over wiki pages and graph entities, then use canonical terms in prose.
- Create Obsidian page properties automatically for wiki pages: \`aliases\`, \`tags\`, and
  \`cssclasses\` stay alongside AgentPlane frontmatter for better vault rendering.
- Use Obsidian-compatible links whose target case exactly matches a canonical page path, title, or
  alias; prefer \`[[canonical-page|Display Label]]\` when file path and display title differ.
- Cite raw sources in prose with numeric notes like \`[1]\`; keep the raw-data Markdown links in a
  trailing \`## Sources\` section.
- Treat coverage gaps, unresolved entity identity, sensitive-source leakage risk, and missing line refs
  as blockers or explicit approval-required findings.
- Require EVALUATOR review of topology, granularity, wikilinks, coverage, glossary safety,
  raw-deletion resilience, and private leakage risk before finish.
`
      : "";
  return `# Context workspace

Profile: ${profile}

Use this directory as the human-readable context surface.

AgentPlane local context is optional and independent from runner prompt assembly. When enabled, it
uses one llm-wiki contract:

- \`context/raw/**\` keeps source material.
- \`context/wiki/**\` keeps readable synthesis pages with AgentPlane frontmatter.
- \`.agentplane/context/derived/**\` keeps reproducible claims, graph rows, provenance, and reports.
- \`.agentplane/context/service/**\` keeps local caches only.

Agents should create wiki pages when a topic is reusable for future tasks, but keep atomic claims in
derived machine artifacts. \`context init\` creates only \`context/raw/.gitkeep\`,
\`context/wiki/AGENTS.md\`, and \`context/wiki/index.md\`; users own any hierarchy below
\`context/raw/**\`. Source references should preserve user-created raw paths where possible.
${maximumAssimilation}
`;
}

export function buildWikiAgentsMarkdown(profile: ContextInitParsed["profile"]): string {
  const maximumAssimilation =
    profile === "maximum-assimilation"
      ? `
## Maximum assimilation mode

- Use the \`context.maximum_assimilation\` blueprint for new context assimilation tasks.
- Goal: after assimilation, the maintained wiki and derived artifacts preserve all significant
  source meaning without relying on raw files for semantic recall.
- Keep original hashes in the source-set lock and cite source content with concrete line refs such as
  \`context/raw/<user-path>/note.md#lines=12-24\`; treat those refs as audit provenance, not as the
  stored meaning.
- First pass: build or update canonical entities, glossary aliases, relation candidates, conflicts, and coverage notes.
- Glossary output: create or update \`context/wiki/glossary.md\` as the root glossary file; do not scatter canonical glossary state across reports or page-local notes.
- Topology pass: choose wiki structure from source content; do not mechanically create
  \`concepts/\`, \`entities/\`, \`decisions/\`, \`modules/\`, \`contradictions/\`, or \`reports/\`.
- Record a topology decision before page-family creation. It must classify the source shape (book/corpus, codebase, task history, product docs, research notes, ops logs, or another named shape), name canonical page families, justify page-vs-heading granularity, map source-local terms to canonical labels or aliases, and keep ambiguous identities as open questions.
- Second pass: synthesize granular wiki articles from that graph/glossary layer; use canonical terms from \`context/wiki/glossary.md\` and preserve source-local wording as aliases.
- Create separate pages for reusable entities, concepts, decisions, requirements, risks, workflows,
  and modules; use stable headings for smaller objects inside broader pages.
- Ensure each wiki page has Obsidian properties \`aliases\`, \`tags\`, and \`cssclasses\` in YAML
  frontmatter in addition to the \`agentplane_context\` manifest.
- Use Obsidian-compatible wikilinks whose target case exactly matches a canonical page path, title,
  or alias; add a display alias or heading anchor only when display wording differs.
- Cite raw sources in prose with numeric notes like \`[1]\`; keep Markdown raw-data links in a
  trailing \`## Sources\` section rather than scattering long source URLs through prose.
- Record extraction coverage: covered source spans, intentionally omitted boilerplate, redacted
  spans, unresolved conflicts, and open questions.
- Record EVALUATOR review for topology, granularity, wikilinks, line refs, glossary safety,
  coverage gaps, raw-deletion resilience, and private leakage risk before finish.
- If a raw source is missing later, keep its source registry entry with availability state
  \`missing\`; the wiki, facts, graph, glossary, and coverage artifacts must still carry the
  assimilated meaning.
- Do not copy secrets into public wiki pages. Redact sensitive source spans before publication.
`
      : "";
  return `${wikiFrontmatter("wiki.agents", "Context wiki agent notes", "policy")}

# Context wiki agent notes

Profile: ${profile}

- Treat \`context/wiki/**\` as durable, source-backed project knowledge with stable AgentPlane frontmatter.
- Treat \`.agentplane/context/agentplane.context.yaml\` as the machine-readable context contract and \`.agentplane/context/policies/wiki.rules.md\` as the human-readable wiki policy.
- Analyze the base project, existing docs, task history, and raw sources before choosing a wiki structure.
- Choose the smallest wiki hierarchy that fits this project; do not force a universal concepts/entities/decisions/modules layout.
- Keep this initialized wiki minimal until first ingest; project-specific folders should appear from source-backed assimilation, not from empty scaffolding.
- Preserve modality, source refs, cross-links, glossary aliases, and graph alignment when updating pages.
- Write synthesized wiki prose in English by default; preserve source-language terms only for quotes, titles, proper names, aliases, paths, and code identifiers.
- Prefer updating existing canonical pages over creating duplicates; describe small objects under stable headings when that is clearer.
- Use \`agentplane context wiki new\`, \`agentplane context wiki lint\`, \`agentplane context wiki explain\`, \`agentplane context wiki link\`, and \`agentplane context wiki index\`.
- When claims conflict, keep both claims, create a conflict candidate, and ask for review before promotion or overwrite.
- Keep raw inputs in \`context/raw/**\`; preserve the user-created hierarchy when citing sources.
- Add source references for factual claims and run \`agentplane context verify-task <task-id>\` before closing context assimilation work.
${maximumAssimilation}

## Sources

- no-source: generated policy notes from \`agentplane context init\`; add source references before promotion.
`;
}

export function buildCapabilitiesReadme(profile: ContextInitParsed["profile"]): string {
  return `# Context capabilities\n\nProfile: ${profile}\n\nReusable artefacts for prompts, playbooks, templates, checklists and rubrics.\n`;
}

export function buildPolicyMarkdown(name: string): string {
  return `# ${name}\n\n- Keep raw sources in \`context/raw\`.\n- Keep durable machine artifacts under \`.agentplane/context/derived\`.\n- Keep service caches under \`.agentplane/context/service\`.\n`;
}

export function buildRedactionRulesYaml(): string {
  return `mode: explicit\nallowlist: []\ndenylist: []\n`;
}

export function buildSyncRulesYaml(): string {
  return `mode: manual\nallow_external: false\n`;
}
