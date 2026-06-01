---
tags:
  - agentplane/context
  - agentplane/release-docs-assimilation
cssclasses:
  - agentplane-context
agentplane_context:
  schema_version: 1
  artifact_type: wiki_page
  canonical_id: "wiki.release_docs.concept.commands-reference"
  title: "commands-reference concept"
  modality: observation
  epistemic_status: sourced_claim
  visibility: project
  source_refs:
    - "docs/adr/0002-adr-process.md"
    - "docs/adr/0011-v0.3-surface-freeze.md"
    - "docs/adr/0012-v0.4-surface-transition.md"
    - "docs/adr/0013-zod-contract-ssot.md"
    - "docs/archive/v0-3/cli-bug-ledger-v0-3-x.mdx"
    - "docs/archive/v0-3/framework-refactor-program.mdx"
    - "docs/compare.mdx"
    - "docs/concepts/context-engineering.mdx"
    - "docs/concepts/traces.mdx"
    - "docs/context/quickstart.mdx"
    - "docs/context/review.mdx"
    - "docs/contributing/citation-guidelines.mdx"
    - "docs/developer/agent-change-record-implementation.mdx"
    - "docs/developer/architecture.mdx"
    - "docs/developer/blueprints.mdx"
    - "docs/developer/cli-contract.mdx"
    - "docs/developer/cli-help-json.mdx"
    - "docs/developer/close-taxonomy.mdx"
    - "docs/developer/cloud-backend-integration-plan.mdx"
    - "docs/developer/code-quality.mdx"
  claims: []
  graph_refs:
    entities:
      - "entity.concept.commands-reference"
    edges:
  conflicts: []
  updated_by: CURATOR
---

## Sources

1. [`docs/adr/0002-adr-process.md`](../../docs/adr/0002-adr-process.md)
2. [`docs/adr/0011-v0.3-surface-freeze.md`](../../docs/adr/0011-v0.3-surface-freeze.md)
3. [`docs/adr/0012-v0.4-surface-transition.md`](../../docs/adr/0012-v0.4-surface-transition.md)
4. [`docs/adr/0013-zod-contract-ssot.md`](../../docs/adr/0013-zod-contract-ssot.md)
5. [`docs/archive/v0-3/cli-bug-ledger-v0-3-x.mdx`](../../docs/archive/v0-3/cli-bug-ledger-v0-3-x.mdx)
6. [`docs/archive/v0-3/framework-refactor-program.mdx`](../../docs/archive/v0-3/framework-refactor-program.mdx)
7. [`docs/compare.mdx`](../../docs/compare.mdx)
8. [`docs/concepts/context-engineering.mdx`](../../docs/concepts/context-engineering.mdx)
9. [`docs/concepts/traces.mdx`](../../docs/concepts/traces.mdx)
10. [`docs/context/quickstart.mdx`](../../docs/context/quickstart.mdx)
11. [`docs/context/review.mdx`](../../docs/context/review.mdx)
12. [`docs/contributing/citation-guidelines.mdx`](../../docs/contributing/citation-guidelines.mdx)
13. [`docs/developer/agent-change-record-implementation.mdx`](../../docs/developer/agent-change-record-implementation.mdx)
14. [`docs/developer/architecture.mdx`](../../docs/developer/architecture.mdx)
15. [`docs/developer/blueprints.mdx`](../../docs/developer/blueprints.mdx)
16. [`docs/developer/cli-contract.mdx`](../../docs/developer/cli-contract.mdx)
17. [`docs/developer/cli-help-json.mdx`](../../docs/developer/cli-help-json.mdx)
18. [`docs/developer/close-taxonomy.mdx`](../../docs/developer/close-taxonomy.mdx)
19. [`docs/developer/cloud-backend-integration-plan.mdx`](../../docs/developer/cloud-backend-integration-plan.mdx)
20. [`docs/developer/code-quality.mdx`](../../docs/developer/code-quality.mdx)

# commands-reference concept

Matched in 122 release/docs source files.

## Representative sources

- `docs/adr/0002-adr-process.md`: ADR 0002: Lightweight ADR Process
- `docs/adr/0011-v0.3-surface-freeze.md`: ADR 0011: v0.3 Surface Freeze
- `docs/adr/0012-v0.4-surface-transition.md`: ADR 0012: v0.4 Surface Transition
- `docs/adr/0013-zod-contract-ssot.md`: 0013-zod-contract-ssot
- `docs/archive/v0-3/cli-bug-ledger-v0-3-x.mdx`: cli-bug-ledger-v0-3-x
- `docs/archive/v0-3/framework-refactor-program.mdx`: framework-refactor-program
- `docs/compare.mdx`: Agentplane is the agent-agnostic evidence layer
- `docs/concepts/context-engineering.mdx`: Context engineering for AI agents
- `docs/concepts/traces.mdx`: Traces for AI agent runs
- `docs/context/quickstart.mdx`: Context quickstart
- `docs/context/review.mdx`: Review context changes
- `docs/contributing/citation-guidelines.mdx`: Citation guidelines
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
- `docs/developer/harness-dev.mdx`: harness-dev
- `docs/developer/harness-engineering.mdx`: harness-engineering
- `docs/developer/incident-archive.mdx`: Incident Archive
- `docs/developer/local-context.mdx`: local-context
- `docs/developer/modular-prompt-assembly.mdx`: modular-prompt-assembly
- `docs/developer/module-topology.mdx`: module-topology
- `docs/developer/project-layout.mdx`: project-layout
- `docs/developer/recipes-how-it-works.mdx`: recipes-how-it-works
- `docs/developer/recipes-safety.mdx`: recipes-safety
- `docs/developer/recipes-spec.mdx`: recipes-spec
- `docs/developer/release-and-publishing.mdx`: release-and-publishing
- `docs/developer/schema-validation-strategy.mdx`: schema-validation-strategy
- `docs/developer/testing-and-quality.mdx`: refactor one or two confirmed clone clusters
- `docs/developer/workflow-harness-test-matrix.mdx`: workflow-harness-test-matrix
- `docs/examples/debug-agent-run-with-traces.mdx`: Debug an agent run with traces
- `docs/examples/export-traces.mdx`: Export traces
- `docs/help/glossary.mdx`: glossary
