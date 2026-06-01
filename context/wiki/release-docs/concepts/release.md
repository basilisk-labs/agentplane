---
tags:
  - agentplane/context
  - agentplane/release-docs-assimilation
cssclasses:
  - agentplane-context
agentplane_context:
  schema_version: 1
  artifact_type: wiki_page
  canonical_id: "wiki.release_docs.concept.release"
  title: "release concept"
  modality: observation
  epistemic_status: sourced_claim
  visibility: project
  source_refs:
    - "docs/adr/0008-keep-yauzl-for-zip-validation.md"
    - "docs/adr/0009-recipes-index-signing-algorithm-policy.md"
    - "docs/adr/0010-core-root-export-compatibility.md"
    - "docs/adr/0011-v0.3-surface-freeze.md"
    - "docs/adr/0012-v0.4-surface-transition.md"
    - "docs/adr/0013-zod-contract-ssot.md"
    - "docs/adr/README.md"
    - "docs/archive/v0-3/cli-bug-ledger-v0-3-x.mdx"
    - "docs/archive/v0-3/framework-refactor-program.mdx"
    - "docs/concepts/context-engineering.mdx"
    - "docs/context/ingest.mdx"
    - "docs/context/quickstart.mdx"
    - "docs/developer/agent-change-record-implementation.mdx"
    - "docs/developer/architecture.mdx"
    - "docs/developer/blueprints.mdx"
    - "docs/developer/cli-contract.mdx"
    - "docs/developer/cloud-backend-integration-plan.mdx"
    - "docs/developer/code-quality.mdx"
    - "docs/developer/design-principles.mdx"
    - "docs/developer/documentation-information-architecture.mdx"
  claims: []
  graph_refs:
    entities:
      - "entity.concept.release"
    edges:
  conflicts: []
  updated_by: CURATOR
---

## Sources

1. [`docs/adr/0008-keep-yauzl-for-zip-validation.md`](../../docs/adr/0008-keep-yauzl-for-zip-validation.md)
2. [`docs/adr/0009-recipes-index-signing-algorithm-policy.md`](../../docs/adr/0009-recipes-index-signing-algorithm-policy.md)
3. [`docs/adr/0010-core-root-export-compatibility.md`](../../docs/adr/0010-core-root-export-compatibility.md)
4. [`docs/adr/0011-v0.3-surface-freeze.md`](../../docs/adr/0011-v0.3-surface-freeze.md)
5. [`docs/adr/0012-v0.4-surface-transition.md`](../../docs/adr/0012-v0.4-surface-transition.md)
6. [`docs/adr/0013-zod-contract-ssot.md`](../../docs/adr/0013-zod-contract-ssot.md)
7. [`docs/adr/README.md`](../../docs/adr/README.md)
8. [`docs/archive/v0-3/cli-bug-ledger-v0-3-x.mdx`](../../docs/archive/v0-3/cli-bug-ledger-v0-3-x.mdx)
9. [`docs/archive/v0-3/framework-refactor-program.mdx`](../../docs/archive/v0-3/framework-refactor-program.mdx)
10. [`docs/concepts/context-engineering.mdx`](../../docs/concepts/context-engineering.mdx)
11. [`docs/context/ingest.mdx`](../../docs/context/ingest.mdx)
12. [`docs/context/quickstart.mdx`](../../docs/context/quickstart.mdx)
13. [`docs/developer/agent-change-record-implementation.mdx`](../../docs/developer/agent-change-record-implementation.mdx)
14. [`docs/developer/architecture.mdx`](../../docs/developer/architecture.mdx)
15. [`docs/developer/blueprints.mdx`](../../docs/developer/blueprints.mdx)
16. [`docs/developer/cli-contract.mdx`](../../docs/developer/cli-contract.mdx)
17. [`docs/developer/cloud-backend-integration-plan.mdx`](../../docs/developer/cloud-backend-integration-plan.mdx)
18. [`docs/developer/code-quality.mdx`](../../docs/developer/code-quality.mdx)
19. [`docs/developer/design-principles.mdx`](../../docs/developer/design-principles.mdx)
20. [`docs/developer/documentation-information-architecture.mdx`](../../docs/developer/documentation-information-architecture.mdx)

# release concept

Matched in 157 release/docs source files.

## Representative sources

- `docs/adr/0008-keep-yauzl-for-zip-validation.md`: ADR 0008: Keep yauzl for ZIP Validation
- `docs/adr/0009-recipes-index-signing-algorithm-policy.md`: ADR 0009: Recipes Index Signing Algorithm Policy
- `docs/adr/0010-core-root-export-compatibility.md`: ADR 0010: Core Root Export Compatibility
- `docs/adr/0011-v0.3-surface-freeze.md`: ADR 0011: v0.3 Surface Freeze
- `docs/adr/0012-v0.4-surface-transition.md`: ADR 0012: v0.4 Surface Transition
- `docs/adr/0013-zod-contract-ssot.md`: 0013-zod-contract-ssot
- `docs/adr/README.md`: Architecture Decision Records
- `docs/archive/v0-3/cli-bug-ledger-v0-3-x.mdx`: cli-bug-ledger-v0-3-x
- `docs/archive/v0-3/framework-refactor-program.mdx`: framework-refactor-program
- `docs/concepts/context-engineering.mdx`: Context engineering for AI agents
- `docs/context/ingest.mdx`: Add documents to context
- `docs/context/quickstart.mdx`: Context quickstart
- `docs/developer/agent-change-record-implementation.mdx`: agent-change-record-implementation
- `docs/developer/architecture.mdx`: architecture
- `docs/developer/blueprints.mdx`: blueprints
- `docs/developer/cli-contract.mdx`: cli-contract
- `docs/developer/cloud-backend-integration-plan.mdx`: cloud-backend-integration-plan
- `docs/developer/code-quality.mdx`: code-quality
- `docs/developer/design-principles.mdx`: design-principles
- `docs/developer/documentation-information-architecture.mdx`: documentation-information-architecture
- `docs/developer/evaluation-and-recursive-improvement.mdx`: evaluation-and-recursive-improvement
- `docs/developer/harness-dev.mdx`: harness-dev
- `docs/developer/incident-archive.mdx`: Incident Archive
- `docs/developer/local-context.mdx`: local-context
- `docs/developer/modular-prompt-assembly.mdx`: modular-prompt-assembly
- `docs/developer/module-topology.mdx`: module-topology
- `docs/developer/project-layout.mdx`: project-layout
- `docs/developer/recipes-development.mdx`: recipes-development
- `docs/developer/recipes-how-it-works.mdx`: recipes-how-it-works
- `docs/developer/recipes-safety.mdx`: recipes-safety
- `docs/developer/recipes-spec.mdx`: recipes-spec
- `docs/developer/release-and-publishing.mdx`: release-and-publishing
- `docs/developer/schema-validation-strategy.mdx`: schema-validation-strategy
- `docs/developer/testing-and-quality.mdx`: refactor one or two confirmed clone clusters
- `docs/developer/workflow-contract.mdx`: workflow-contract
- `docs/developer/workflow-harness-test-matrix.mdx`: workflow-harness-test-matrix
- `docs/help/legacy-upgrade-recovery.mdx`: legacy-upgrade-recovery
- `docs/help/troubleshooting-by-symptom.mdx`: troubleshooting-by-symptom
- `docs/help/troubleshooting.mdx`: troubleshooting
- `docs/internal/git-mutation-model.mdx`: git-mutation-model
