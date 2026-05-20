export function buildWikiPolicyMarkdown(): string {
  return `# Wiki rules

- \`.agentplane/context/agentplane.context.yaml\` is the machine-readable context contract.
- This file is the human-readable wiki policy referenced by that manifest.
- \`context/wiki/AGENTS.md\` is agent-facing local guidance; keep it aligned with this policy, not broader than it.

## Format

- Wiki pages live under \`context/wiki/**\` and use AgentPlane frontmatter.
- Each page frontmatter must include a stable \`canonical_id\`, \`title\`, \`modality\`, \`epistemic_status\`, \`visibility\`, \`source_refs\`, \`claims\`, \`graph_refs\`, \`conflicts\`, and \`updated_by\`.
- Use the modalities listed in \`.agentplane/context/agentplane.context.yaml\`.
- Keep source references as Markdown links where possible.
- Use Obsidian-compatible \`[[Page Title]]\` or \`[[Page Title#Section]]\` links for semantic internal wiki links.
- Keep normal Markdown links for source refs, external URLs, file paths, and line-addressed provenance.

## Language

- Write synthesized wiki prose in English by default.
- Source titles, direct quotes, proper names, glossary aliases, file paths, and code identifiers may keep their source language.
- When a non-English source term is important, keep it as an alias or quoted evidence detail and use the canonical English term in synthesized prose when identity is clear.
- If a page intentionally uses a different prose language, state the reason in the page body or frontmatter and treat it as a local exception.

## Topology

- Choose the smallest source-backed wiki hierarchy that fits the project.
- Do not force a universal \`concepts/\`, \`entities/\`, \`decisions/\`, \`modules/\`, \`contradictions/\`, and \`reports/\` layout unless the source analysis justifies it.
- Prefer updating existing canonical pages over creating duplicates.
- Create new pages only when the topic is reusable for future tasks or useful to a human reader.
- Use stable headings inside broader pages for small objects that do not deserve standalone pages.
- Record topology decisions before creating new page families when the source shape is ambiguous or broad.

## Provenance

- Keep raw sources in \`context/raw/**\`; preserve the user-created hierarchy when citing raw sources.
- Keep durable machine artifacts under \`.agentplane/context/derived/**\`.
- Keep service caches under \`.agentplane/context/service/**\`.
- Do not manually edit \`.agentplane/context/derived/**\`; rebuild projections through context commands.
- Every factual claim, decision, risk, workflow, and definition needs source refs or an explicit no-source reason.
- Preserve conflicts and open questions instead of flattening contradictory sources into one unsourced claim.
- Do not copy secrets or non-publishable source spans into public wiki pages.

## Maintenance

- Run \`agentplane context wiki lint <path>\` after creating or materially changing wiki pages.
- Run \`agentplane context wiki index context/wiki\` after adding, moving, or materially renaming wiki pages.
- Run \`agentplane context verify-task <task-id>\` before closing task-bound context work.
`;
}
