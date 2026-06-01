---
tags:
  - agentplane/context
  - agentplane/release-docs-assimilation
cssclasses:
  - agentplane-context
agentplane_context:
  schema_version: 1
  artifact_type: wiki_page
  canonical_id: "wiki.release_docs.concept.schemas"
  title: "schemas concept"
  modality: observation
  epistemic_status: sourced_claim
  visibility: project
  source_refs:
    - "docs/adr/0001-zod-config-parity.md"
    - "docs/adr/0002-adr-process.md"
    - "docs/adr/0003-refactor-sequencing.md"
    - "docs/adr/0004-keep-custom-cli-stack.md"
    - "docs/adr/0006-no-effect-fp-ts-migration.md"
    - "docs/adr/0007-freeze-yaml-parser-stack.md"
    - "docs/adr/0009-recipes-index-signing-algorithm-policy.md"
    - "docs/adr/0010-core-root-export-compatibility.md"
    - "docs/adr/0011-v0.3-surface-freeze.md"
    - "docs/adr/0012-v0.4-surface-transition.md"
    - "docs/adr/0013-zod-contract-ssot.md"
    - "docs/adr/README.md"
    - "docs/archive/v0-3/cli-bug-ledger-v0-3-x.mdx"
    - "docs/archive/v0-3/framework-refactor-program.mdx"
    - "docs/compare.mdx"
    - "docs/context/index.mdx"
    - "docs/context/modes.mdx"
    - "docs/context/quickstart.mdx"
    - "docs/developer/agent-change-record-implementation.mdx"
    - "docs/developer/architecture.mdx"
  claims: []
  graph_refs:
    entities:
      - "entity.concept.schemas"
    edges:
  conflicts: []
  updated_by: CURATOR
---

## Sources

1. [`docs/adr/0001-zod-config-parity.md`](../../docs/adr/0001-zod-config-parity.md)
2. [`docs/adr/0002-adr-process.md`](../../docs/adr/0002-adr-process.md)
3. [`docs/adr/0003-refactor-sequencing.md`](../../docs/adr/0003-refactor-sequencing.md)
4. [`docs/adr/0004-keep-custom-cli-stack.md`](../../docs/adr/0004-keep-custom-cli-stack.md)
5. [`docs/adr/0006-no-effect-fp-ts-migration.md`](../../docs/adr/0006-no-effect-fp-ts-migration.md)
6. [`docs/adr/0007-freeze-yaml-parser-stack.md`](../../docs/adr/0007-freeze-yaml-parser-stack.md)
7. [`docs/adr/0009-recipes-index-signing-algorithm-policy.md`](../../docs/adr/0009-recipes-index-signing-algorithm-policy.md)
8. [`docs/adr/0010-core-root-export-compatibility.md`](../../docs/adr/0010-core-root-export-compatibility.md)
9. [`docs/adr/0011-v0.3-surface-freeze.md`](../../docs/adr/0011-v0.3-surface-freeze.md)
10. [`docs/adr/0012-v0.4-surface-transition.md`](../../docs/adr/0012-v0.4-surface-transition.md)
11. [`docs/adr/0013-zod-contract-ssot.md`](../../docs/adr/0013-zod-contract-ssot.md)
12. [`docs/adr/README.md`](../../docs/adr/README.md)
13. [`docs/archive/v0-3/cli-bug-ledger-v0-3-x.mdx`](../../docs/archive/v0-3/cli-bug-ledger-v0-3-x.mdx)
14. [`docs/archive/v0-3/framework-refactor-program.mdx`](../../docs/archive/v0-3/framework-refactor-program.mdx)
15. [`docs/compare.mdx`](../../docs/compare.mdx)
16. [`docs/context/index.mdx`](../../docs/context/index.mdx)
17. [`docs/context/modes.mdx`](../../docs/context/modes.mdx)
18. [`docs/context/quickstart.mdx`](../../docs/context/quickstart.mdx)
19. [`docs/developer/agent-change-record-implementation.mdx`](../../docs/developer/agent-change-record-implementation.mdx)
20. [`docs/developer/architecture.mdx`](../../docs/developer/architecture.mdx)

# schemas concept

Matched in 127 release/docs source files.

## Representative sources

- `docs/adr/0001-zod-config-parity.md`: ADR 0001: Config Zod Parity Baseline
- `docs/adr/0002-adr-process.md`: ADR 0002: Lightweight ADR Process
- `docs/adr/0003-refactor-sequencing.md`: ADR 0003: Refactor Sequencing
- `docs/adr/0004-keep-custom-cli-stack.md`: ADR 0004: Keep Custom CLI Stack
- `docs/adr/0006-no-effect-fp-ts-migration.md`: ADR 0006: No Effect or fp-ts Migration
- `docs/adr/0007-freeze-yaml-parser-stack.md`: ADR 0007: Freeze YAML Parser Stack
- `docs/adr/0009-recipes-index-signing-algorithm-policy.md`: ADR 0009: Recipes Index Signing Algorithm Policy
- `docs/adr/0010-core-root-export-compatibility.md`: ADR 0010: Core Root Export Compatibility
- `docs/adr/0011-v0.3-surface-freeze.md`: ADR 0011: v0.3 Surface Freeze
- `docs/adr/0012-v0.4-surface-transition.md`: ADR 0012: v0.4 Surface Transition
- `docs/adr/0013-zod-contract-ssot.md`: 0013-zod-contract-ssot
- `docs/adr/README.md`: Architecture Decision Records
- `docs/archive/v0-3/cli-bug-ledger-v0-3-x.mdx`: cli-bug-ledger-v0-3-x
- `docs/archive/v0-3/framework-refactor-program.mdx`: framework-refactor-program
- `docs/compare.mdx`: Agentplane is the agent-agnostic evidence layer
- `docs/context/index.mdx`: Context
- `docs/context/modes.mdx`: Choose a context mode
- `docs/context/quickstart.mdx`: Context quickstart
- `docs/developer/agent-change-record-implementation.mdx`: agent-change-record-implementation
- `docs/developer/architecture.mdx`: architecture
- `docs/developer/blueprints.mdx`: blueprints
- `docs/developer/cli-contract.mdx`: cli-contract
- `docs/developer/cli-help-json.mdx`: cli-help-json
- `docs/developer/cloud-backend-integration-plan.mdx`: cloud-backend-integration-plan
- `docs/developer/code-quality.mdx`: code-quality
- `docs/developer/contributing.mdx`: contributing
- `docs/developer/design-principles.mdx`: design-principles
- `docs/developer/documentation-information-architecture.mdx`: documentation-information-architecture
- `docs/developer/evaluation-and-recursive-improvement.mdx`: evaluation-and-recursive-improvement
- `docs/developer/harness-dev.mdx`: harness-dev
- `docs/developer/harness-engineering.mdx`: harness-engineering
- `docs/developer/incident-archive.mdx`: Incident Archive
- `docs/developer/local-context.mdx`: local-context
- `docs/developer/modular-prompt-assembly.mdx`: modular-prompt-assembly
- `docs/developer/module-topology.mdx`: module-topology
- `docs/developer/project-layout.mdx`: project-layout
- `docs/developer/recipes-how-it-works.mdx`: recipes-how-it-works
- `docs/developer/recipes-spec.mdx`: recipes-spec
- `docs/developer/release-and-publishing.mdx`: release-and-publishing
- `docs/developer/schema-validation-strategy.mdx`: schema-validation-strategy
