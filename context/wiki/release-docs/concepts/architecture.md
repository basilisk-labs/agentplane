---
tags:
  - agentplane/context
  - agentplane/release-docs-assimilation
cssclasses:
  - agentplane-context
agentplane_context:
  schema_version: 1
  artifact_type: wiki_page
  canonical_id: "wiki.release_docs.concept.architecture"
  title: "architecture concept"
  modality: observation
  epistemic_status: sourced_claim
  visibility: project
  source_refs:
    - "docs/adr/0002-adr-process.md"
    - "docs/adr/0003-refactor-sequencing.md"
    - "docs/adr/0005-defer-biome-migration.md"
    - "docs/adr/0006-no-effect-fp-ts-migration.md"
    - "docs/adr/0010-core-root-export-compatibility.md"
    - "docs/adr/0013-zod-contract-ssot.md"
    - "docs/adr/README.md"
    - "docs/archive/v0-3/cli-bug-ledger-v0-3-x.mdx"
    - "docs/archive/v0-3/framework-refactor-program.mdx"
    - "docs/context/agent-guide.mdx"
    - "docs/context/index.mdx"
    - "docs/context/ingest.mdx"
    - "docs/context/modes.mdx"
    - "docs/context/review.mdx"
    - "docs/context/troubleshooting.mdx"
    - "docs/developer/architecture.mdx"
    - "docs/developer/blueprints.mdx"
    - "docs/developer/cli-contract.mdx"
    - "docs/developer/design-principles.mdx"
    - "docs/developer/documentation-information-architecture.mdx"
  claims: []
  graph_refs:
    entities:
      - "entity.concept.architecture"
    edges:
  conflicts: []
  updated_by: CURATOR
---

## Sources

1. [`docs/adr/0002-adr-process.md`](../../../../docs/adr/0002-adr-process.md)
2. [`docs/adr/0003-refactor-sequencing.md`](../../../../docs/adr/0003-refactor-sequencing.md)
3. [`docs/adr/0005-defer-biome-migration.md`](../../../../docs/adr/0005-defer-biome-migration.md)
4. [`docs/adr/0006-no-effect-fp-ts-migration.md`](../../../../docs/adr/0006-no-effect-fp-ts-migration.md)
5. [`docs/adr/0010-core-root-export-compatibility.md`](../../../../docs/adr/0010-core-root-export-compatibility.md)
6. [`docs/adr/0013-zod-contract-ssot.md`](../../../../docs/adr/0013-zod-contract-ssot.md)
7. [`docs/adr/README.md`](../../../../docs/adr/README.md)
8. [`docs/archive/v0-3/cli-bug-ledger-v0-3-x.mdx`](../../../../docs/archive/v0-3/cli-bug-ledger-v0-3-x.mdx)
9. [`docs/archive/v0-3/framework-refactor-program.mdx`](../../../../docs/archive/v0-3/framework-refactor-program.mdx)
10. [`docs/context/agent-guide.mdx`](../../../../docs/context/agent-guide.mdx)
11. [`docs/context/index.mdx`](../../../../docs/context/index.mdx)
12. [`docs/context/ingest.mdx`](../../../../docs/context/ingest.mdx)
13. [`docs/context/modes.mdx`](../../../../docs/context/modes.mdx)
14. [`docs/context/review.mdx`](../../../../docs/context/review.mdx)
15. [`docs/context/troubleshooting.mdx`](../../../../docs/context/troubleshooting.mdx)
16. [`docs/developer/architecture.mdx`](../../../../docs/developer/architecture.mdx)
17. [`docs/developer/blueprints.mdx`](../../../../docs/developer/blueprints.mdx)
18. [`docs/developer/cli-contract.mdx`](../../../../docs/developer/cli-contract.mdx)
19. [`docs/developer/design-principles.mdx`](../../../../docs/developer/design-principles.mdx)
20. [`docs/developer/documentation-information-architecture.mdx`](../../../../docs/developer/documentation-information-architecture.mdx)

# architecture concept

Matched in 77 release/docs source files.

## Representative sources

- `docs/adr/0002-adr-process.md`: ADR 0002: Lightweight ADR Process
- `docs/adr/0003-refactor-sequencing.md`: ADR 0003: Refactor Sequencing
- `docs/adr/0005-defer-biome-migration.md`: ADR 0005: Defer Biome Migration
- `docs/adr/0006-no-effect-fp-ts-migration.md`: ADR 0006: No Effect or fp-ts Migration
- `docs/adr/0010-core-root-export-compatibility.md`: ADR 0010: Core Root Export Compatibility
- `docs/adr/0013-zod-contract-ssot.md`: 0013-zod-contract-ssot
- `docs/adr/README.md`: Architecture Decision Records
- `docs/archive/v0-3/cli-bug-ledger-v0-3-x.mdx`: cli-bug-ledger-v0-3-x
- `docs/archive/v0-3/framework-refactor-program.mdx`: framework-refactor-program
- `docs/context/agent-guide.mdx`: Agent guide to project context
- `docs/context/index.mdx`: Context
- `docs/context/ingest.mdx`: Add documents to context
- `docs/context/modes.mdx`: Choose a context mode
- `docs/context/review.mdx`: Review context changes
- `docs/context/troubleshooting.mdx`: Context troubleshooting
- `docs/developer/architecture.mdx`: architecture
- `docs/developer/blueprints.mdx`: blueprints
- `docs/developer/cli-contract.mdx`: cli-contract
- `docs/developer/design-principles.mdx`: design-principles
- `docs/developer/documentation-information-architecture.mdx`: documentation-information-architecture
- `docs/developer/evaluation-and-recursive-improvement.mdx`: evaluation-and-recursive-improvement
- `docs/developer/harness-dev.mdx`: harness-dev
- `docs/developer/incident-archive.mdx`: Incident Archive
- `docs/developer/local-context.mdx`: local-context
- `docs/developer/modular-prompt-assembly.mdx`: modular-prompt-assembly
- `docs/developer/module-topology.mdx`: module-topology
- `docs/developer/project-layout.mdx`: project-layout
- `docs/developer/recipes-how-it-works.mdx`: recipes-how-it-works
- `docs/developer/recipes-spec.mdx`: recipes-spec
- `docs/developer/release-and-publishing.mdx`: release-and-publishing
- `docs/developer/testing-and-quality.mdx`: refactor one or two confirmed clone clusters
- `docs/developer/typescript-esm-imports.mdx`: typescript-esm-imports
- `docs/developer/workflow-harness-test-matrix.mdx`: workflow-harness-test-matrix
- `docs/help/legacy-upgrade-recovery.mdx`: legacy-upgrade-recovery
- `docs/help/troubleshooting-by-symptom.mdx`: troubleshooting-by-symptom
- `docs/help/troubleshooting.mdx`: troubleshooting
- `docs/README.md`: Docs layout
- `docs/recipes/index.mdx`: index
- `docs/releases/v0.1.5.md`: Release Notes — v0.1.5
- `docs/releases/v0.1.7.md`: Release Notes — v0.1.7
