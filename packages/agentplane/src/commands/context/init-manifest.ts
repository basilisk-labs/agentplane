import type { ContextInitParsed } from "./context.spec.js";

export function buildContextManifestYaml(
  projectName: string,
  profile: ContextInitParsed["profile"],
  now: string,
): string {
  return `version: 1
project:
  name: "${projectName.replaceAll('"', String.raw`\"`)}"
  root: "."
workspace:
  namespace: local.project
  mode: ${profile}
  layout_strategy: adaptive
  page_granularity: topic_artifact
  claim_granularity: atomic
  root: context
  raw: context/raw
  wiki: context/wiki
  capabilities: context/capabilities
control:
  root: .agentplane/context
  policies:
    rules: .agentplane/context/policies/context.rules.md
    wiki_rules: .agentplane/context/policies/wiki.rules.md
    capability_rules: .agentplane/context/policies/capability.rules.md
    redaction: .agentplane/context/policies/redaction.rules.yaml
    sync: .agentplane/context/policies/sync.rules.yaml
lock:
  path: .agentplane/context/manifest.lock.json
derived:
  root: .agentplane/context/derived
  facts: .agentplane/context/derived/facts/facts.jsonl
  graph:
    entities: .agentplane/context/derived/graph/entities.jsonl
    edges: .agentplane/context/derived/graph/edges.jsonl
    provenance_edges: .agentplane/context/derived/graph/provenance_edges.jsonl
  capabilities:
    registry: .agentplane/context/derived/capabilities/capabilities.jsonl
    edges: .agentplane/context/derived/capabilities/capability_edges.jsonl
  reports:
    events: .agentplane/context/derived/reports/assimilation-events.jsonl
wiki:
  contract:
    manifest: .agentplane/context/agentplane.context.yaml
    rules: .agentplane/context/policies/wiki.rules.md
    agent_notes: context/wiki/AGENTS.md
  frontmatter_required: true
  source_refs_as_markdown_links: true
  cross_links_required: true
  language:
    synthesized_prose: en
    allow_source_language_for:
      - direct_quotes
      - source_titles
      - proper_names
      - glossary_aliases
      - file_paths
      - code_identifiers
    translation_note_required: true
  maintenance_mode: ${profile === "maximum-assimilation" ? "maximum_assimilation" : "adaptive"}
  raw_deletion_resilience_required: ${profile === "maximum-assimilation" ? "true" : "false"}
  entity_relation_first: ${profile === "maximum-assimilation" ? "true" : "false"}
  glossary:
    canonical_required: ${profile === "maximum-assimilation" ? "true" : "false"}
    alias_normalization_required: ${profile === "maximum-assimilation" ? "true" : "false"}
  source_addressing:
    original_hash_required: true
    line_refs_required: ${profile === "maximum-assimilation" ? "true" : "false"}
  modalities:
    - factual_claim
    - observation
    - assumption
    - hypothesis
    - decision
    - policy
    - preference
    - requirement
    - risk
    - capability
    - definition
    - deprecation
agentplane:
  tasks_root: .agentplane/tasks
service:
  root: .agentplane/context/service
  index:
    type: sqlite
    path: .agentplane/cache.sqlite
    fts: true
    cache_task_readmes: true
    cache_acr_summaries: true
generated_at: "${now}"
remotes: []
`;
}
