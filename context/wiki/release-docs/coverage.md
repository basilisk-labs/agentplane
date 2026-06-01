---
tags:
  - agentplane/context
  - agentplane/release-docs-assimilation
cssclasses:
  - agentplane-context
agentplane_context:
  schema_version: 1
  artifact_type: wiki_page
  canonical_id: "wiki.release_docs.coverage"
  title: "Release docs coverage"
  modality: observation
  epistemic_status: sourced_claim
  visibility: project
  source_refs:
    - "docs/adr/0001-zod-config-parity.md"
    - "docs/adr/0002-adr-process.md"
    - "docs/adr/0003-refactor-sequencing.md"
    - "docs/adr/0004-keep-custom-cli-stack.md"
    - "docs/adr/0005-defer-biome-migration.md"
    - "docs/adr/0006-no-effect-fp-ts-migration.md"
    - "docs/adr/0007-freeze-yaml-parser-stack.md"
    - "docs/adr/0008-keep-yauzl-for-zip-validation.md"
    - "docs/adr/0009-recipes-index-signing-algorithm-policy.md"
    - "docs/adr/0010-core-root-export-compatibility.md"
    - "docs/adr/0011-v0.3-surface-freeze.md"
    - "docs/adr/0012-v0.4-surface-transition.md"
    - "docs/adr/0013-zod-contract-ssot.md"
    - "docs/adr/README.md"
    - "docs/archive/v0-3/cli-bug-ledger-v0-3-x.mdx"
    - "docs/archive/v0-3/framework-refactor-program.mdx"
    - "docs/compare.mdx"
    - "docs/concepts/agent-workflows.mdx"
    - "docs/concepts/context-engineering.mdx"
    - "docs/concepts/harness-engineering.mdx"
  claims: []
  graph_refs:
    entities:
      - "entity.release_docs_corpus"
    edges:
  conflicts: []
  updated_by: CURATOR
---

## Sources

1. [`docs/adr/0001-zod-config-parity.md`](../../docs/adr/0001-zod-config-parity.md)
2. [`docs/adr/0002-adr-process.md`](../../docs/adr/0002-adr-process.md)
3. [`docs/adr/0003-refactor-sequencing.md`](../../docs/adr/0003-refactor-sequencing.md)
4. [`docs/adr/0004-keep-custom-cli-stack.md`](../../docs/adr/0004-keep-custom-cli-stack.md)
5. [`docs/adr/0005-defer-biome-migration.md`](../../docs/adr/0005-defer-biome-migration.md)
6. [`docs/adr/0006-no-effect-fp-ts-migration.md`](../../docs/adr/0006-no-effect-fp-ts-migration.md)
7. [`docs/adr/0007-freeze-yaml-parser-stack.md`](../../docs/adr/0007-freeze-yaml-parser-stack.md)
8. [`docs/adr/0008-keep-yauzl-for-zip-validation.md`](../../docs/adr/0008-keep-yauzl-for-zip-validation.md)
9. [`docs/adr/0009-recipes-index-signing-algorithm-policy.md`](../../docs/adr/0009-recipes-index-signing-algorithm-policy.md)
10. [`docs/adr/0010-core-root-export-compatibility.md`](../../docs/adr/0010-core-root-export-compatibility.md)
11. [`docs/adr/0011-v0.3-surface-freeze.md`](../../docs/adr/0011-v0.3-surface-freeze.md)
12. [`docs/adr/0012-v0.4-surface-transition.md`](../../docs/adr/0012-v0.4-surface-transition.md)
13. [`docs/adr/0013-zod-contract-ssot.md`](../../docs/adr/0013-zod-contract-ssot.md)
14. [`docs/adr/README.md`](../../docs/adr/README.md)
15. [`docs/archive/v0-3/cli-bug-ledger-v0-3-x.mdx`](../../docs/archive/v0-3/cli-bug-ledger-v0-3-x.mdx)
16. [`docs/archive/v0-3/framework-refactor-program.mdx`](../../docs/archive/v0-3/framework-refactor-program.mdx)
17. [`docs/compare.mdx`](../../docs/compare.mdx)
18. [`docs/concepts/agent-workflows.mdx`](../../docs/concepts/agent-workflows.mdx)
19. [`docs/concepts/context-engineering.mdx`](../../docs/concepts/context-engineering.mdx)
20. [`docs/concepts/harness-engineering.mdx`](../../docs/concepts/harness-engineering.mdx)

# Release docs coverage

Coverage degree: 210/210 source files covered.

- covered: title, heading outline, docs domain, release line/version where applicable, recurring concept matches.
- omitted_boilerplate: navigation chrome, repeated installation snippets, generated CLI exhaustive details are summarized by domain/concept rather than repeated verbatim.
- redacted: no secrets were copied into wiki synthesis.
- unresolved: semantic extraction is deterministic keyword/domain based; it is useful for navigation but not a substitute for later human curation of subtle design decisions.
