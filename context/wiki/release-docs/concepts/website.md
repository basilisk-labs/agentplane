---
tags:
  - agentplane/context
  - agentplane/release-docs-assimilation
cssclasses:
  - agentplane-context
agentplane_context:
  schema_version: 1
  artifact_type: wiki_page
  canonical_id: "wiki.release_docs.concept.website"
  title: "website concept"
  modality: observation
  epistemic_status: sourced_claim
  visibility: project
  source_refs:
    - "docs/adr/0002-adr-process.md"
    - "docs/adr/0003-refactor-sequencing.md"
    - "docs/adr/0004-keep-custom-cli-stack.md"
    - "docs/adr/0005-defer-biome-migration.md"
    - "docs/adr/0006-no-effect-fp-ts-migration.md"
    - "docs/adr/0007-freeze-yaml-parser-stack.md"
    - "docs/adr/0009-recipes-index-signing-algorithm-policy.md"
    - "docs/adr/0013-zod-contract-ssot.md"
    - "docs/archive/v0-3/cli-bug-ledger-v0-3-x.mdx"
    - "docs/archive/v0-3/framework-refactor-program.mdx"
    - "docs/concepts/context-engineering.mdx"
    - "docs/concepts/harness-engineering.mdx"
    - "docs/context/agent-guide.mdx"
    - "docs/context/files.mdx"
    - "docs/context/index.mdx"
    - "docs/context/ingest.mdx"
    - "docs/context/modes.mdx"
    - "docs/context/quickstart.mdx"
    - "docs/context/review.mdx"
    - "docs/context/troubleshooting.mdx"
  claims: []
  graph_refs:
    entities:
      - "entity.concept.website"
    edges:
  conflicts: []
  updated_by: CURATOR
---

## Sources

1. [`docs/adr/0002-adr-process.md`](../../docs/adr/0002-adr-process.md)
2. [`docs/adr/0003-refactor-sequencing.md`](../../docs/adr/0003-refactor-sequencing.md)
3. [`docs/adr/0004-keep-custom-cli-stack.md`](../../docs/adr/0004-keep-custom-cli-stack.md)
4. [`docs/adr/0005-defer-biome-migration.md`](../../docs/adr/0005-defer-biome-migration.md)
5. [`docs/adr/0006-no-effect-fp-ts-migration.md`](../../docs/adr/0006-no-effect-fp-ts-migration.md)
6. [`docs/adr/0007-freeze-yaml-parser-stack.md`](../../docs/adr/0007-freeze-yaml-parser-stack.md)
7. [`docs/adr/0009-recipes-index-signing-algorithm-policy.md`](../../docs/adr/0009-recipes-index-signing-algorithm-policy.md)
8. [`docs/adr/0013-zod-contract-ssot.md`](../../docs/adr/0013-zod-contract-ssot.md)
9. [`docs/archive/v0-3/cli-bug-ledger-v0-3-x.mdx`](../../docs/archive/v0-3/cli-bug-ledger-v0-3-x.mdx)
10. [`docs/archive/v0-3/framework-refactor-program.mdx`](../../docs/archive/v0-3/framework-refactor-program.mdx)
11. [`docs/concepts/context-engineering.mdx`](../../docs/concepts/context-engineering.mdx)
12. [`docs/concepts/harness-engineering.mdx`](../../docs/concepts/harness-engineering.mdx)
13. [`docs/context/agent-guide.mdx`](../../docs/context/agent-guide.mdx)
14. [`docs/context/files.mdx`](../../docs/context/files.mdx)
15. [`docs/context/index.mdx`](../../docs/context/index.mdx)
16. [`docs/context/ingest.mdx`](../../docs/context/ingest.mdx)
17. [`docs/context/modes.mdx`](../../docs/context/modes.mdx)
18. [`docs/context/quickstart.mdx`](../../docs/context/quickstart.mdx)
19. [`docs/context/review.mdx`](../../docs/context/review.mdx)
20. [`docs/context/troubleshooting.mdx`](../../docs/context/troubleshooting.mdx)

# website concept

Matched in 157 release/docs source files.

## Representative sources

- `docs/adr/0002-adr-process.md`: ADR 0002: Lightweight ADR Process
- `docs/adr/0003-refactor-sequencing.md`: ADR 0003: Refactor Sequencing
- `docs/adr/0004-keep-custom-cli-stack.md`: ADR 0004: Keep Custom CLI Stack
- `docs/adr/0005-defer-biome-migration.md`: ADR 0005: Defer Biome Migration
- `docs/adr/0006-no-effect-fp-ts-migration.md`: ADR 0006: No Effect or fp-ts Migration
- `docs/adr/0007-freeze-yaml-parser-stack.md`: ADR 0007: Freeze YAML Parser Stack
- `docs/adr/0009-recipes-index-signing-algorithm-policy.md`: ADR 0009: Recipes Index Signing Algorithm Policy
- `docs/adr/0013-zod-contract-ssot.md`: 0013-zod-contract-ssot
- `docs/archive/v0-3/cli-bug-ledger-v0-3-x.mdx`: cli-bug-ledger-v0-3-x
- `docs/archive/v0-3/framework-refactor-program.mdx`: framework-refactor-program
- `docs/concepts/context-engineering.mdx`: Context engineering for AI agents
- `docs/concepts/harness-engineering.mdx`: Harness engineering for AI agents
- `docs/context/agent-guide.mdx`: Agent guide to project context
- `docs/context/files.mdx`: What context writes
- `docs/context/index.mdx`: Context
- `docs/context/ingest.mdx`: Add documents to context
- `docs/context/modes.mdx`: Choose a context mode
- `docs/context/quickstart.mdx`: Context quickstart
- `docs/context/review.mdx`: Review context changes
- `docs/context/troubleshooting.mdx`: Context troubleshooting
- `docs/contributing/citation-guidelines.mdx`: Citation guidelines
- `docs/developer/agent-change-record-implementation.mdx`: agent-change-record-implementation
- `docs/developer/architecture.mdx`: architecture
- `docs/developer/blueprints.mdx`: blueprints
- `docs/developer/cli-contract.mdx`: cli-contract
- `docs/developer/cli-help-json.mdx`: cli-help-json
- `docs/developer/close-taxonomy.mdx`: close-taxonomy
- `docs/developer/cloud-backend-integration-plan.mdx`: cloud-backend-integration-plan
- `docs/developer/code-quality.mdx`: code-quality
- `docs/developer/contributing.mdx`: contributing
- `docs/developer/documentation-information-architecture.mdx`: documentation-information-architecture
- `docs/developer/evaluation-and-recursive-improvement.mdx`: evaluation-and-recursive-improvement
- `docs/developer/harness-engineering.mdx`: harness-engineering
- `docs/developer/incident-archive.mdx`: Incident Archive
- `docs/developer/local-context.mdx`: local-context
- `docs/developer/modular-prompt-assembly.mdx`: modular-prompt-assembly
- `docs/developer/performance-baselines.mdx`: before
- `docs/developer/project-layout.mdx`: project-layout
- `docs/developer/recipes-development.mdx`: recipes-development
- `docs/developer/recipes-how-it-works.mdx`: recipes-how-it-works
