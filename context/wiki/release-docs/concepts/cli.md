---
tags:
  - agentplane/context
  - agentplane/release-docs-assimilation
cssclasses:
  - agentplane-context
agentplane_context:
  schema_version: 1
  artifact_type: wiki_page
  canonical_id: "wiki.release_docs.concept.cli"
  title: "cli concept"
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
    - "docs/adr/0008-keep-yauzl-for-zip-validation.md"
    - "docs/adr/0009-recipes-index-signing-algorithm-policy.md"
    - "docs/adr/0010-core-root-export-compatibility.md"
    - "docs/adr/0011-v0.3-surface-freeze.md"
    - "docs/adr/0012-v0.4-surface-transition.md"
    - "docs/adr/README.md"
    - "docs/archive/v0-3/cli-bug-ledger-v0-3-x.mdx"
    - "docs/archive/v0-3/framework-refactor-program.mdx"
    - "docs/compare.mdx"
    - "docs/concepts/agent-workflows.mdx"
    - "docs/concepts/context-engineering.mdx"
    - "docs/concepts/harness-engineering.mdx"
    - "docs/concepts/traces.mdx"
    - "docs/context/agent-guide.mdx"
  claims: []
  graph_refs:
    entities:
      - "entity.concept.cli"
    edges:
  conflicts: []
  updated_by: CURATOR
---

## Sources

1. [`docs/adr/0002-adr-process.md`](../../../../docs/adr/0002-adr-process.md)
2. [`docs/adr/0003-refactor-sequencing.md`](../../../../docs/adr/0003-refactor-sequencing.md)
3. [`docs/adr/0004-keep-custom-cli-stack.md`](../../../../docs/adr/0004-keep-custom-cli-stack.md)
4. [`docs/adr/0005-defer-biome-migration.md`](../../../../docs/adr/0005-defer-biome-migration.md)
5. [`docs/adr/0006-no-effect-fp-ts-migration.md`](../../../../docs/adr/0006-no-effect-fp-ts-migration.md)
6. [`docs/adr/0007-freeze-yaml-parser-stack.md`](../../../../docs/adr/0007-freeze-yaml-parser-stack.md)
7. [`docs/adr/0008-keep-yauzl-for-zip-validation.md`](../../../../docs/adr/0008-keep-yauzl-for-zip-validation.md)
8. [`docs/adr/0009-recipes-index-signing-algorithm-policy.md`](../../../../docs/adr/0009-recipes-index-signing-algorithm-policy.md)
9. [`docs/adr/0010-core-root-export-compatibility.md`](../../../../docs/adr/0010-core-root-export-compatibility.md)
10. [`docs/adr/0011-v0.3-surface-freeze.md`](../../../../docs/adr/0011-v0.3-surface-freeze.md)
11. [`docs/adr/0012-v0.4-surface-transition.md`](../../../../docs/adr/0012-v0.4-surface-transition.md)
12. [`docs/adr/README.md`](../../../../docs/adr/README.md)
13. [`docs/archive/v0-3/cli-bug-ledger-v0-3-x.mdx`](../../../../docs/archive/v0-3/cli-bug-ledger-v0-3-x.mdx)
14. [`docs/archive/v0-3/framework-refactor-program.mdx`](../../../../docs/archive/v0-3/framework-refactor-program.mdx)
15. [`docs/compare.mdx`](../../../../docs/compare.mdx)
16. [`docs/concepts/agent-workflows.mdx`](../../../../docs/concepts/agent-workflows.mdx)
17. [`docs/concepts/context-engineering.mdx`](../../../../docs/concepts/context-engineering.mdx)
18. [`docs/concepts/harness-engineering.mdx`](../../../../docs/concepts/harness-engineering.mdx)
19. [`docs/concepts/traces.mdx`](../../../../docs/concepts/traces.mdx)
20. [`docs/context/agent-guide.mdx`](../../../../docs/context/agent-guide.mdx)

# cli concept

Matched in 197 release/docs source files.

## Representative sources

- `docs/adr/0002-adr-process.md`: ADR 0002: Lightweight ADR Process
- `docs/adr/0003-refactor-sequencing.md`: ADR 0003: Refactor Sequencing
- `docs/adr/0004-keep-custom-cli-stack.md`: ADR 0004: Keep Custom CLI Stack
- `docs/adr/0005-defer-biome-migration.md`: ADR 0005: Defer Biome Migration
- `docs/adr/0006-no-effect-fp-ts-migration.md`: ADR 0006: No Effect or fp-ts Migration
- `docs/adr/0007-freeze-yaml-parser-stack.md`: ADR 0007: Freeze YAML Parser Stack
- `docs/adr/0008-keep-yauzl-for-zip-validation.md`: ADR 0008: Keep yauzl for ZIP Validation
- `docs/adr/0009-recipes-index-signing-algorithm-policy.md`: ADR 0009: Recipes Index Signing Algorithm Policy
- `docs/adr/0010-core-root-export-compatibility.md`: ADR 0010: Core Root Export Compatibility
- `docs/adr/0011-v0.3-surface-freeze.md`: ADR 0011: v0.3 Surface Freeze
- `docs/adr/0012-v0.4-surface-transition.md`: ADR 0012: v0.4 Surface Transition
- `docs/adr/README.md`: Architecture Decision Records
- `docs/archive/v0-3/cli-bug-ledger-v0-3-x.mdx`: cli-bug-ledger-v0-3-x
- `docs/archive/v0-3/framework-refactor-program.mdx`: framework-refactor-program
- `docs/compare.mdx`: Agentplane is the agent-agnostic evidence layer
- `docs/concepts/agent-workflows.mdx`: Agent workflows
- `docs/concepts/context-engineering.mdx`: Context engineering for AI agents
- `docs/concepts/harness-engineering.mdx`: Harness engineering for AI agents
- `docs/concepts/traces.mdx`: Traces for AI agent runs
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
- `docs/developer/design-principles.mdx`: design-principles
- `docs/developer/documentation-information-architecture.mdx`: documentation-information-architecture
- `docs/developer/evaluation-and-recursive-improvement.mdx`: evaluation-and-recursive-improvement
