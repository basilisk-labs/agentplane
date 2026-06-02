---
tags:
  - agentplane/context
  - agentplane/release-docs-assimilation
cssclasses:
  - agentplane-context
agentplane_context:
  schema_version: 1
  artifact_type: wiki_page
  canonical_id: "wiki.release_docs.concept.policy"
  title: "policy concept"
  modality: observation
  epistemic_status: sourced_claim
  visibility: project
  source_refs:
    - "docs/adr/0001-zod-config-parity.md"
    - "docs/adr/0003-refactor-sequencing.md"
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
    - "docs/context/agent-guide.mdx"
    - "docs/context/index.mdx"
    - "docs/context/modes.mdx"
    - "docs/developer/agent-change-record-implementation.mdx"
    - "docs/developer/architecture.mdx"
    - "docs/developer/blueprints.mdx"
    - "docs/developer/cli-contract.mdx"
  claims: []
  graph_refs:
    entities:
      - "entity.concept.policy"
    edges:
  conflicts: []
  updated_by: CURATOR
---

## Sources

1. [`docs/adr/0001-zod-config-parity.md`](../../../../docs/adr/0001-zod-config-parity.md)
2. [`docs/adr/0003-refactor-sequencing.md`](../../../../docs/adr/0003-refactor-sequencing.md)
3. [`docs/adr/0008-keep-yauzl-for-zip-validation.md`](../../../../docs/adr/0008-keep-yauzl-for-zip-validation.md)
4. [`docs/adr/0009-recipes-index-signing-algorithm-policy.md`](../../../../docs/adr/0009-recipes-index-signing-algorithm-policy.md)
5. [`docs/adr/0010-core-root-export-compatibility.md`](../../../../docs/adr/0010-core-root-export-compatibility.md)
6. [`docs/adr/0011-v0.3-surface-freeze.md`](../../../../docs/adr/0011-v0.3-surface-freeze.md)
7. [`docs/adr/0012-v0.4-surface-transition.md`](../../../../docs/adr/0012-v0.4-surface-transition.md)
8. [`docs/adr/0013-zod-contract-ssot.md`](../../../../docs/adr/0013-zod-contract-ssot.md)
9. [`docs/adr/README.md`](../../../../docs/adr/README.md)
10. [`docs/archive/v0-3/cli-bug-ledger-v0-3-x.mdx`](../../../../docs/archive/v0-3/cli-bug-ledger-v0-3-x.mdx)
11. [`docs/archive/v0-3/framework-refactor-program.mdx`](../../../../docs/archive/v0-3/framework-refactor-program.mdx)
12. [`docs/compare.mdx`](../../../../docs/compare.mdx)
13. [`docs/concepts/agent-workflows.mdx`](../../../../docs/concepts/agent-workflows.mdx)
14. [`docs/context/agent-guide.mdx`](../../../../docs/context/agent-guide.mdx)
15. [`docs/context/index.mdx`](../../../../docs/context/index.mdx)
16. [`docs/context/modes.mdx`](../../../../docs/context/modes.mdx)
17. [`docs/developer/agent-change-record-implementation.mdx`](../../../../docs/developer/agent-change-record-implementation.mdx)
18. [`docs/developer/architecture.mdx`](../../../../docs/developer/architecture.mdx)
19. [`docs/developer/blueprints.mdx`](../../../../docs/developer/blueprints.mdx)
20. [`docs/developer/cli-contract.mdx`](../../../../docs/developer/cli-contract.mdx)

# policy concept

Matched in 143 release/docs source files.

## Representative sources

- `docs/adr/0001-zod-config-parity.md`: ADR 0001: Config Zod Parity Baseline
- `docs/adr/0003-refactor-sequencing.md`: ADR 0003: Refactor Sequencing
- `docs/adr/0008-keep-yauzl-for-zip-validation.md`: ADR 0008: Keep yauzl for ZIP Validation
- `docs/adr/0009-recipes-index-signing-algorithm-policy.md`: ADR 0009: Recipes Index Signing Algorithm Policy
- `docs/adr/0010-core-root-export-compatibility.md`: ADR 0010: Core Root Export Compatibility
- `docs/adr/0011-v0.3-surface-freeze.md`: ADR 0011: v0.3 Surface Freeze
- `docs/adr/0012-v0.4-surface-transition.md`: ADR 0012: v0.4 Surface Transition
- `docs/adr/0013-zod-contract-ssot.md`: 0013-zod-contract-ssot
- `docs/adr/README.md`: Architecture Decision Records
- `docs/archive/v0-3/cli-bug-ledger-v0-3-x.mdx`: cli-bug-ledger-v0-3-x
- `docs/archive/v0-3/framework-refactor-program.mdx`: framework-refactor-program
- `docs/compare.mdx`: Agentplane is the agent-agnostic evidence layer
- `docs/concepts/agent-workflows.mdx`: Agent workflows
- `docs/context/agent-guide.mdx`: Agent guide to project context
- `docs/context/index.mdx`: Context
- `docs/context/modes.mdx`: Choose a context mode
- `docs/developer/agent-change-record-implementation.mdx`: agent-change-record-implementation
- `docs/developer/architecture.mdx`: architecture
- `docs/developer/blueprints.mdx`: blueprints
- `docs/developer/cli-contract.mdx`: cli-contract
- `docs/developer/cli-help-json.mdx`: cli-help-json
- `docs/developer/close-taxonomy.mdx`: close-taxonomy
- `docs/developer/cloud-backend-integration-plan.mdx`: cloud-backend-integration-plan
- `docs/developer/code-quality.mdx`: code-quality
- `docs/developer/design-principles.mdx`: design-principles
- `docs/developer/documentation-information-architecture.mdx`: documentation-information-architecture
- `docs/developer/evaluation-and-recursive-improvement.mdx`: evaluation-and-recursive-improvement
- `docs/developer/harness-engineering.mdx`: harness-engineering
- `docs/developer/incident-archive.mdx`: Incident Archive
- `docs/developer/local-context.mdx`: local-context
- `docs/developer/modular-prompt-assembly.mdx`: modular-prompt-assembly
- `docs/developer/module-topology.mdx`: module-topology
- `docs/developer/performance-baselines.mdx`: before
- `docs/developer/recipes-development.mdx`: recipes-development
- `docs/developer/recipes-how-it-works.mdx`: recipes-how-it-works
- `docs/developer/recipes-safety.mdx`: recipes-safety
- `docs/developer/recipes-spec.mdx`: recipes-spec
- `docs/developer/release-and-publishing.mdx`: release-and-publishing
- `docs/developer/schema-validation-strategy.mdx`: schema-validation-strategy
- `docs/developer/testing-and-quality.mdx`: refactor one or two confirmed clone clusters
