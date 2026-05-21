type ContextInitFile = { relative: string; content: string };
type StarterWikiPage = [relative: string, title: string, modality: string, summary: string];

export function starterWikiPageFiles(): ContextInitFile[] {
  return starterWikiPages().map((page) => starterWikiPage(page));
}

export function wikiFrontmatter(canonicalId: string, title: string, modality: string): string {
  return `---
aliases:
  - "${title}"
tags:
  - agentplane/context
cssclasses:
  - agentplane-context
agentplane_context:
  schema_version: 1
  artifact_type: wiki_page
  canonical_id: "${canonicalId}"
  title: "${title}"
  modality: ${modality}
  epistemic_status: sourced_claim
  visibility: project
  source_refs: []
  claims: []
  graph_refs:
    entities: []
    edges: []
  conflicts: []
  updated_by: context_init
---`;
}

function starterWikiPages(): StarterWikiPage[] {
  return [
    [
      "context/wiki/index.md",
      "Context wiki",
      "definition",
      "Project-specific AgentPlane context wiki entrypoint. Keep the initial hierarchy minimal and let sourced assimilation add navigation as reusable project knowledge appears.",
    ],
    [
      "context/wiki/concepts/index.md",
      "Concepts",
      "definition",
      "Starter index for reusable concepts. Keep this page only if concept-level navigation fits the project.",
    ],
    [
      "context/wiki/entities/index.md",
      "Entities",
      "definition",
      "Starter index for people, systems, organizations, and other entities that recur across sources.",
    ],
    [
      "context/wiki/decisions/index.md",
      "Decisions",
      "decision",
      "Starter index for durable decisions and ADR-style evolution records extracted from source evidence.",
    ],
    [
      "context/wiki/modules/index.md",
      "Modules",
      "definition",
      "Starter index for code modules, runtime surfaces, and implementation areas when they are useful to future tasks.",
    ],
    [
      "context/wiki/contradictions/index.md",
      "Contradictions",
      "risk",
      "Starter index for disputed claims, stale evidence, and source conflicts that need explicit review before promotion.",
    ],
    [
      "context/wiki/reports/index.md",
      "Reports",
      "observation",
      "Starter index for context assimilation reports, audit summaries, and temporary synthesis notes.",
    ],
  ];
}

function starterWikiPage([relative, title, modality, summary]: StarterWikiPage): ContextInitFile {
  return {
    relative,
    content: `${wikiFrontmatter(canonicalIdFor(relative), title, modality)}

# ${title}

## Summary

${summary}

## Sources

- no-source: generated starter page from \`agentplane context init\`; add source references before promotion.
`,
  };
}

function canonicalIdFor(relative: string): string {
  return `wiki.${
    relative
      .replace(/^context\/wiki\//u, "")
      .replace(/\/index\.md$/u, "")
      .replace(/\.md$/u, "")
      .replaceAll(/[^a-z0-9]+/giu, "-")
      .replaceAll(/^-+|-+$/gu, "")
      .toLowerCase() || "index"
  }`;
}
