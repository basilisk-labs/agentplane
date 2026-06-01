---
aliases: []
tags:
  - agentplane/context
  - agentplane/source-architecture-assimilation
cssclasses:
  - agentplane-context
agentplane_context:
  schema_version: 1
  artifact_type: wiki_page
  canonical_id: "wiki.source_architecture.test_coverage"
  title: "Test Coverage Map"
  modality: observation
  epistemic_status: sourced_claim
  visibility: project
  source_refs:
    - "packages/agentplane/src/adapters/task-backend/task-backend-adapter.test.ts"
    - "packages/agentplane/src/agents/agents-template.test.ts"
    - "packages/agentplane/src/agents/policy-routing-check.test.ts"
    - "packages/agentplane/src/architecture/layering.imports.test.ts"
    - "packages/agentplane/src/backends/task-backend.cloud-regression.test.ts"
    - "packages/agentplane/src/backends/task-backend.cloud-remote-create-policy.test.ts"
    - "packages/agentplane/src/backends/task-backend.cloud-start-refresh.test.ts"
    - "packages/agentplane/src/backends/task-backend.cloud.test.ts"
    - "packages/agentplane/src/backends/task-backend.load.test.ts"
    - "packages/agentplane/src/backends/task-backend.local-handoff.test.ts"
    - "packages/agentplane/src/backends/task-backend.local-sqlite-gitignore.test.ts"
    - "packages/agentplane/src/backends/task-backend.local.test.ts"
    - "packages/agentplane/src/backends/task-backend.test.ts"
    - "packages/agentplane/src/backends/task-backend/cloud-backend-state.test.ts"
    - "packages/agentplane/src/backends/task-backend/cloud-backend-utils.test.ts"
    - "packages/agentplane/src/backends/task-backend/local-task-sqlite-cache.test.ts"
    - "packages/agentplane/src/backends/task-index.test.ts"
    - "packages/agentplane/src/blueprints/execution.test.ts"
    - "packages/agentplane/src/blueprints/project-local.test.ts"
    - "packages/agentplane/src/blueprints/recipe-hints.test.ts"
    - "packages/agentplane/src/blueprints/resolve.test.ts"
    - "packages/agentplane/src/blueprints/snapshot.test.ts"
    - "packages/agentplane/src/blueprints/validate.test.ts"
    - "packages/agentplane/src/cli/archive.test.ts"
    - "packages/agentplane/src/cli/bootstrap-doc-build-freshness.test.ts"
    - "packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts"
    - "packages/agentplane/src/cli/check-cli-cold-baseline-script.test.ts"
    - "packages/agentplane/src/cli/check-github-protection-contract-script.test.ts"
    - "packages/agentplane/src/cli/check-knip-baseline-script.test.ts"
    - "packages/agentplane/src/cli/check-no-console-script.test.ts"
    - "packages/agentplane/src/cli/checksum.test.ts"
    - "packages/agentplane/src/cli/cli-contract.test.ts"
    - "packages/agentplane/src/cli/cli-smoke.test.ts"
    - "packages/agentplane/src/cli/command-guide.test.ts"
    - "packages/agentplane/src/cli/dist-guard.test.ts"
  claims: []
  graph_refs:
    entities:
      - "entity.source_concept.testing"
    edges:
  conflicts: []
  updated_by: CURATOR
---

## Sources

1. [`packages/agentplane/src/adapters/task-backend/task-backend-adapter.test.ts`](../../../packages/agentplane/src/adapters/task-backend/task-backend-adapter.test.ts)
2. [`packages/agentplane/src/agents/agents-template.test.ts`](../../../packages/agentplane/src/agents/agents-template.test.ts)
3. [`packages/agentplane/src/agents/policy-routing-check.test.ts`](../../../packages/agentplane/src/agents/policy-routing-check.test.ts)
4. [`packages/agentplane/src/architecture/layering.imports.test.ts`](../../../packages/agentplane/src/architecture/layering.imports.test.ts)
5. [`packages/agentplane/src/backends/task-backend.cloud-regression.test.ts`](../../../packages/agentplane/src/backends/task-backend.cloud-regression.test.ts)
6. [`packages/agentplane/src/backends/task-backend.cloud-remote-create-policy.test.ts`](../../../packages/agentplane/src/backends/task-backend.cloud-remote-create-policy.test.ts)
7. [`packages/agentplane/src/backends/task-backend.cloud-start-refresh.test.ts`](../../../packages/agentplane/src/backends/task-backend.cloud-start-refresh.test.ts)
8. [`packages/agentplane/src/backends/task-backend.cloud.test.ts`](../../../packages/agentplane/src/backends/task-backend.cloud.test.ts)
9. [`packages/agentplane/src/backends/task-backend.load.test.ts`](../../../packages/agentplane/src/backends/task-backend.load.test.ts)
10. [`packages/agentplane/src/backends/task-backend.local-handoff.test.ts`](../../../packages/agentplane/src/backends/task-backend.local-handoff.test.ts)
11. [`packages/agentplane/src/backends/task-backend.local-sqlite-gitignore.test.ts`](../../../packages/agentplane/src/backends/task-backend.local-sqlite-gitignore.test.ts)
12. [`packages/agentplane/src/backends/task-backend.local.test.ts`](../../../packages/agentplane/src/backends/task-backend.local.test.ts)
13. [`packages/agentplane/src/backends/task-backend.test.ts`](../../../packages/agentplane/src/backends/task-backend.test.ts)
14. [`packages/agentplane/src/backends/task-backend/cloud-backend-state.test.ts`](../../../packages/agentplane/src/backends/task-backend/cloud-backend-state.test.ts)
15. [`packages/agentplane/src/backends/task-backend/cloud-backend-utils.test.ts`](../../../packages/agentplane/src/backends/task-backend/cloud-backend-utils.test.ts)
16. [`packages/agentplane/src/backends/task-backend/local-task-sqlite-cache.test.ts`](../../../packages/agentplane/src/backends/task-backend/local-task-sqlite-cache.test.ts)
17. [`packages/agentplane/src/backends/task-index.test.ts`](../../../packages/agentplane/src/backends/task-index.test.ts)
18. [`packages/agentplane/src/blueprints/execution.test.ts`](../../../packages/agentplane/src/blueprints/execution.test.ts)
19. [`packages/agentplane/src/blueprints/project-local.test.ts`](../../../packages/agentplane/src/blueprints/project-local.test.ts)
20. [`packages/agentplane/src/blueprints/recipe-hints.test.ts`](../../../packages/agentplane/src/blueprints/recipe-hints.test.ts)
21. [`packages/agentplane/src/blueprints/resolve.test.ts`](../../../packages/agentplane/src/blueprints/resolve.test.ts)
22. [`packages/agentplane/src/blueprints/snapshot.test.ts`](../../../packages/agentplane/src/blueprints/snapshot.test.ts)
23. [`packages/agentplane/src/blueprints/validate.test.ts`](../../../packages/agentplane/src/blueprints/validate.test.ts)
24. [`packages/agentplane/src/cli/archive.test.ts`](../../../packages/agentplane/src/cli/archive.test.ts)
25. [`packages/agentplane/src/cli/bootstrap-doc-build-freshness.test.ts`](../../../packages/agentplane/src/cli/bootstrap-doc-build-freshness.test.ts)
26. [`packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts`](../../../packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts)
27. [`packages/agentplane/src/cli/check-cli-cold-baseline-script.test.ts`](../../../packages/agentplane/src/cli/check-cli-cold-baseline-script.test.ts)
28. [`packages/agentplane/src/cli/check-github-protection-contract-script.test.ts`](../../../packages/agentplane/src/cli/check-github-protection-contract-script.test.ts)
29. [`packages/agentplane/src/cli/check-knip-baseline-script.test.ts`](../../../packages/agentplane/src/cli/check-knip-baseline-script.test.ts)
30. [`packages/agentplane/src/cli/check-no-console-script.test.ts`](../../../packages/agentplane/src/cli/check-no-console-script.test.ts)
31. [`packages/agentplane/src/cli/checksum.test.ts`](../../../packages/agentplane/src/cli/checksum.test.ts)
32. [`packages/agentplane/src/cli/cli-contract.test.ts`](../../../packages/agentplane/src/cli/cli-contract.test.ts)
33. [`packages/agentplane/src/cli/cli-smoke.test.ts`](../../../packages/agentplane/src/cli/cli-smoke.test.ts)
34. [`packages/agentplane/src/cli/command-guide.test.ts`](../../../packages/agentplane/src/cli/command-guide.test.ts)
35. [`packages/agentplane/src/cli/dist-guard.test.ts`](../../../packages/agentplane/src/cli/dist-guard.test.ts)

# Test Coverage Map

The selected source set contains 472 test/spec/snapshot files. Tests are represented as file entities and linked to packages, layers, command groups, and recurring concepts by path and source terms.

| Layer            | Files | Lines  | Tests |
| ---------------- | ----- | ------ | ----- |
| commands         | 663   | 111692 | 191   |
| cli-runtime      | 256   | 67875  | 162   |
| other-source     | 115   | 16072  | 35    |
| runtime          | 86    | 12012  | 19    |
| runner           | 79    | 12780  | 18    |
| task-backends    | 50    | 8814   | 14    |
| shared-core      | 30    | 2624   | 11    |
| workflow-runtime | 22    | 2615   | 7     |
| blueprints       | 34    | 5848   | 6     |
| policy-engine    | 16    | 1395   | 3     |
| recipes          | 19    | 2574   | 3     |
| testkit          | 27    | 3240   | 3     |

## Retrieval Use

Use this page to locate the likely verification surface before changing a command, workflow route, context behavior, release path, or schema contract.
