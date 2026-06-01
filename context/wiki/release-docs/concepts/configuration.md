---
tags:
  - agentplane/context
  - agentplane/release-docs-assimilation
cssclasses:
  - agentplane-context
agentplane_context:
  schema_version: 1
  artifact_type: wiki_page
  canonical_id: "wiki.release_docs.concept.configuration"
  title: "configuration concept"
  modality: observation
  epistemic_status: sourced_claim
  visibility: project
  source_refs:
    - "docs/adr/0001-zod-config-parity.md"
    - "docs/adr/0005-defer-biome-migration.md"
    - "docs/adr/0011-v0.3-surface-freeze.md"
    - "docs/adr/0012-v0.4-surface-transition.md"
    - "docs/adr/0013-zod-contract-ssot.md"
    - "docs/adr/README.md"
    - "docs/archive/v0-3/cli-bug-ledger-v0-3-x.mdx"
    - "docs/archive/v0-3/framework-refactor-program.mdx"
    - "docs/compare.mdx"
    - "docs/concepts/harness-engineering.mdx"
    - "docs/developer/agent-change-record-implementation.mdx"
    - "docs/developer/architecture.mdx"
    - "docs/developer/blueprints.mdx"
    - "docs/developer/cli-contract.mdx"
    - "docs/developer/cloud-backend-integration-plan.mdx"
    - "docs/developer/code-quality.mdx"
    - "docs/developer/contributing.mdx"
    - "docs/developer/design-principles.mdx"
    - "docs/developer/documentation-information-architecture.mdx"
    - "docs/developer/evaluation-and-recursive-improvement.mdx"
  claims: []
  graph_refs:
    entities:
      - "entity.concept.configuration"
    edges:
  conflicts: []
  updated_by: CURATOR
---

## Sources

1. [`docs/adr/0001-zod-config-parity.md`](../../docs/adr/0001-zod-config-parity.md)
2. [`docs/adr/0005-defer-biome-migration.md`](../../docs/adr/0005-defer-biome-migration.md)
3. [`docs/adr/0011-v0.3-surface-freeze.md`](../../docs/adr/0011-v0.3-surface-freeze.md)
4. [`docs/adr/0012-v0.4-surface-transition.md`](../../docs/adr/0012-v0.4-surface-transition.md)
5. [`docs/adr/0013-zod-contract-ssot.md`](../../docs/adr/0013-zod-contract-ssot.md)
6. [`docs/adr/README.md`](../../docs/adr/README.md)
7. [`docs/archive/v0-3/cli-bug-ledger-v0-3-x.mdx`](../../docs/archive/v0-3/cli-bug-ledger-v0-3-x.mdx)
8. [`docs/archive/v0-3/framework-refactor-program.mdx`](../../docs/archive/v0-3/framework-refactor-program.mdx)
9. [`docs/compare.mdx`](../../docs/compare.mdx)
10. [`docs/concepts/harness-engineering.mdx`](../../docs/concepts/harness-engineering.mdx)
11. [`docs/developer/agent-change-record-implementation.mdx`](../../docs/developer/agent-change-record-implementation.mdx)
12. [`docs/developer/architecture.mdx`](../../docs/developer/architecture.mdx)
13. [`docs/developer/blueprints.mdx`](../../docs/developer/blueprints.mdx)
14. [`docs/developer/cli-contract.mdx`](../../docs/developer/cli-contract.mdx)
15. [`docs/developer/cloud-backend-integration-plan.mdx`](../../docs/developer/cloud-backend-integration-plan.mdx)
16. [`docs/developer/code-quality.mdx`](../../docs/developer/code-quality.mdx)
17. [`docs/developer/contributing.mdx`](../../docs/developer/contributing.mdx)
18. [`docs/developer/design-principles.mdx`](../../docs/developer/design-principles.mdx)
19. [`docs/developer/documentation-information-architecture.mdx`](../../docs/developer/documentation-information-architecture.mdx)
20. [`docs/developer/evaluation-and-recursive-improvement.mdx`](../../docs/developer/evaluation-and-recursive-improvement.mdx)

# configuration concept

Matched in 88 release/docs source files.

## Representative sources

- `docs/adr/0001-zod-config-parity.md`: ADR 0001: Config Zod Parity Baseline
- `docs/adr/0005-defer-biome-migration.md`: ADR 0005: Defer Biome Migration
- `docs/adr/0011-v0.3-surface-freeze.md`: ADR 0011: v0.3 Surface Freeze
- `docs/adr/0012-v0.4-surface-transition.md`: ADR 0012: v0.4 Surface Transition
- `docs/adr/0013-zod-contract-ssot.md`: 0013-zod-contract-ssot
- `docs/adr/README.md`: Architecture Decision Records
- `docs/archive/v0-3/cli-bug-ledger-v0-3-x.mdx`: cli-bug-ledger-v0-3-x
- `docs/archive/v0-3/framework-refactor-program.mdx`: framework-refactor-program
- `docs/compare.mdx`: Agentplane is the agent-agnostic evidence layer
- `docs/concepts/harness-engineering.mdx`: Harness engineering for AI agents
- `docs/developer/agent-change-record-implementation.mdx`: agent-change-record-implementation
- `docs/developer/architecture.mdx`: architecture
- `docs/developer/blueprints.mdx`: blueprints
- `docs/developer/cli-contract.mdx`: cli-contract
- `docs/developer/cloud-backend-integration-plan.mdx`: cloud-backend-integration-plan
- `docs/developer/code-quality.mdx`: code-quality
- `docs/developer/contributing.mdx`: contributing
- `docs/developer/design-principles.mdx`: design-principles
- `docs/developer/documentation-information-architecture.mdx`: documentation-information-architecture
- `docs/developer/evaluation-and-recursive-improvement.mdx`: evaluation-and-recursive-improvement
- `docs/developer/incident-archive.mdx`: Incident Archive
- `docs/developer/modular-prompt-assembly.mdx`: modular-prompt-assembly
- `docs/developer/project-layout.mdx`: project-layout
- `docs/developer/recipes-how-it-works.mdx`: recipes-how-it-works
- `docs/developer/release-and-publishing.mdx`: release-and-publishing
- `docs/developer/schema-validation-strategy.mdx`: schema-validation-strategy
- `docs/developer/testing-and-quality.mdx`: refactor one or two confirmed clone clusters
- `docs/developer/typescript-esm-imports.mdx`: typescript-esm-imports
- `docs/developer/workflow-contract.mdx`: workflow-contract
- `docs/help/broken-workflow-runbook.mdx`: broken-workflow-runbook
- `docs/help/glossary.mdx`: glossary
- `docs/help/legacy-upgrade-recovery.mdx`: legacy-upgrade-recovery
- `docs/help/troubleshooting-by-symptom.mdx`: troubleshooting-by-symptom
- `docs/help/troubleshooting.mdx`: troubleshooting
- `docs/launch/checklist.md`: Launch Checklist
- `docs/manifesto.mdx`: Why AI work needs a Git-native evidence layer
- `docs/README.md`: Docs layout
- `docs/recipes/hermes-agentplane.mdx`: Hermes Agentplane recipe
- `docs/reference/runner-handoff.mdx`: Runner handoff contract
- `docs/reference/workflow-file.mdx`: Workflow file reference
