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
  canonical_id: "wiki.source_architecture.command_surface"
  title: "Command Surface"
  modality: observation
  epistemic_status: sourced_claim
  visibility: project
  source_refs:
    - "packages/agentplane/src/commands/acr/acr.command.test.ts"
    - "packages/agentplane/src/commands/acr/acr.command.ts"
    - "packages/agentplane/src/commands/acr/acr.specs.ts"
    - "packages/agentplane/src/commands/acr/diff.ts"
    - "packages/agentplane/src/commands/acr/generate-extensions.ts"
    - "packages/agentplane/src/commands/acr/generate.ts"
    - "packages/agentplane/src/commands/acr/remediation.ts"
    - "packages/agentplane/src/commands/acr/summary.ts"
    - "packages/agentplane/src/commands/acr/validate.ts"
    - "packages/agentplane/src/commands/backend-connect.ts"
    - "packages/agentplane/src/commands/backend.test.ts"
    - "packages/agentplane/src/commands/backend.ts"
    - "packages/agentplane/src/commands/backend/sync.command.ts"
    - "packages/agentplane/src/commands/block.run.ts"
    - "packages/agentplane/src/commands/block.spec.ts"
    - "packages/agentplane/src/commands/blueprint/blueprint-listing.ts"
    - "packages/agentplane/src/commands/blueprint/blueprint.command.ts"
    - "packages/agentplane/src/commands/blueprint/blueprint.specs.ts"
    - "packages/agentplane/src/commands/blueprint/snapshot-artifact.test.ts"
    - "packages/agentplane/src/commands/blueprint/snapshot-artifact.ts"
    - "packages/agentplane/src/commands/blueprint/task-input.test.ts"
    - "packages/agentplane/src/commands/blueprint/task-input.ts"
    - "packages/agentplane/src/commands/blueprints/blueprints.command.ts"
    - "packages/agentplane/src/commands/blueprints/catalog-cache.test.ts"
    - "packages/agentplane/src/commands/blueprints/catalog-cache.ts"
    - "packages/agentplane/src/commands/blueprints/catalog-model.ts"
    - "packages/agentplane/src/commands/blueprints/catalog.ts"
    - "packages/agentplane/src/commands/branch/base.command.ts"
    - "packages/agentplane/src/commands/branch/base.ts"
    - "packages/agentplane/src/commands/branch/cleanup-merged.ts"
    - "packages/agentplane/src/commands/branch/index.ts"
    - "packages/agentplane/src/commands/branch/internal/archive-pr.ts"
    - "packages/agentplane/src/commands/branch/internal/work-validate.ts"
    - "packages/agentplane/src/commands/branch/remove.command.ts"
    - "packages/agentplane/src/commands/branch/remove.ts"
  claims: []
  graph_refs:
    entities:
      - "entity.command_group.acr"
      - "entity.command_group.root"
      - "entity.command_group.backend"
      - "entity.command_group.blueprint"
      - "entity.command_group.blueprints"
      - "entity.command_group.branch"
      - "entity.command_group.cleanup"
      - "entity.command_group.codex"
      - "entity.command_group.context"
      - "entity.command_group.docs"
      - "entity.command_group.doctor"
      - "entity.command_group.evaluator"
      - "entity.command_group.evidence"
      - "entity.command_group.flow"
      - "entity.command_group.guard"
      - "entity.command_group.hermes"
      - "entity.command_group.hooks"
      - "entity.command_group.incidents"
      - "entity.command_group.insights"
      - "entity.command_group.pr"
      - "entity.command_group.recipes"
      - "entity.command_group.release"
      - "entity.command_group.scenario"
      - "entity.command_group.shared"
      - "entity.command_group.task"
      - "entity.command_group.upgrade"
    edges:
  conflicts: []
  updated_by: CURATOR
---

## Sources

1. [`packages/agentplane/src/commands/acr/acr.command.test.ts`](../../../packages/agentplane/src/commands/acr/acr.command.test.ts)
2. [`packages/agentplane/src/commands/acr/acr.command.ts`](../../../packages/agentplane/src/commands/acr/acr.command.ts)
3. [`packages/agentplane/src/commands/acr/acr.specs.ts`](../../../packages/agentplane/src/commands/acr/acr.specs.ts)
4. [`packages/agentplane/src/commands/acr/diff.ts`](../../../packages/agentplane/src/commands/acr/diff.ts)
5. [`packages/agentplane/src/commands/acr/generate-extensions.ts`](../../../packages/agentplane/src/commands/acr/generate-extensions.ts)
6. [`packages/agentplane/src/commands/acr/generate.ts`](../../../packages/agentplane/src/commands/acr/generate.ts)
7. [`packages/agentplane/src/commands/acr/remediation.ts`](../../../packages/agentplane/src/commands/acr/remediation.ts)
8. [`packages/agentplane/src/commands/acr/summary.ts`](../../../packages/agentplane/src/commands/acr/summary.ts)
9. [`packages/agentplane/src/commands/acr/validate.ts`](../../../packages/agentplane/src/commands/acr/validate.ts)
10. [`packages/agentplane/src/commands/backend-connect.ts`](../../../packages/agentplane/src/commands/backend-connect.ts)
11. [`packages/agentplane/src/commands/backend.test.ts`](../../../packages/agentplane/src/commands/backend.test.ts)
12. [`packages/agentplane/src/commands/backend.ts`](../../../packages/agentplane/src/commands/backend.ts)
13. [`packages/agentplane/src/commands/backend/sync.command.ts`](../../../packages/agentplane/src/commands/backend/sync.command.ts)
14. [`packages/agentplane/src/commands/block.run.ts`](../../../packages/agentplane/src/commands/block.run.ts)
15. [`packages/agentplane/src/commands/block.spec.ts`](../../../packages/agentplane/src/commands/block.spec.ts)
16. [`packages/agentplane/src/commands/blueprint/blueprint-listing.ts`](../../../packages/agentplane/src/commands/blueprint/blueprint-listing.ts)
17. [`packages/agentplane/src/commands/blueprint/blueprint.command.ts`](../../../packages/agentplane/src/commands/blueprint/blueprint.command.ts)
18. [`packages/agentplane/src/commands/blueprint/blueprint.specs.ts`](../../../packages/agentplane/src/commands/blueprint/blueprint.specs.ts)
19. [`packages/agentplane/src/commands/blueprint/snapshot-artifact.test.ts`](../../../packages/agentplane/src/commands/blueprint/snapshot-artifact.test.ts)
20. [`packages/agentplane/src/commands/blueprint/snapshot-artifact.ts`](../../../packages/agentplane/src/commands/blueprint/snapshot-artifact.ts)
21. [`packages/agentplane/src/commands/blueprint/task-input.test.ts`](../../../packages/agentplane/src/commands/blueprint/task-input.test.ts)
22. [`packages/agentplane/src/commands/blueprint/task-input.ts`](../../../packages/agentplane/src/commands/blueprint/task-input.ts)
23. [`packages/agentplane/src/commands/blueprints/blueprints.command.ts`](../../../packages/agentplane/src/commands/blueprints/blueprints.command.ts)
24. [`packages/agentplane/src/commands/blueprints/catalog-cache.test.ts`](../../../packages/agentplane/src/commands/blueprints/catalog-cache.test.ts)
25. [`packages/agentplane/src/commands/blueprints/catalog-cache.ts`](../../../packages/agentplane/src/commands/blueprints/catalog-cache.ts)
26. [`packages/agentplane/src/commands/blueprints/catalog-model.ts`](../../../packages/agentplane/src/commands/blueprints/catalog-model.ts)
27. [`packages/agentplane/src/commands/blueprints/catalog.ts`](../../../packages/agentplane/src/commands/blueprints/catalog.ts)
28. [`packages/agentplane/src/commands/branch/base.command.ts`](../../../packages/agentplane/src/commands/branch/base.command.ts)
29. [`packages/agentplane/src/commands/branch/base.ts`](../../../packages/agentplane/src/commands/branch/base.ts)
30. [`packages/agentplane/src/commands/branch/cleanup-merged.ts`](../../../packages/agentplane/src/commands/branch/cleanup-merged.ts)
31. [`packages/agentplane/src/commands/branch/index.ts`](../../../packages/agentplane/src/commands/branch/index.ts)
32. [`packages/agentplane/src/commands/branch/internal/archive-pr.ts`](../../../packages/agentplane/src/commands/branch/internal/archive-pr.ts)
33. [`packages/agentplane/src/commands/branch/internal/work-validate.ts`](../../../packages/agentplane/src/commands/branch/internal/work-validate.ts)
34. [`packages/agentplane/src/commands/branch/remove.command.ts`](../../../packages/agentplane/src/commands/branch/remove.command.ts)
35. [`packages/agentplane/src/commands/branch/remove.ts`](../../../packages/agentplane/src/commands/branch/remove.ts)

# Command Surface

| Command    | Files | Tests | Lines |
| ---------- | ----- | ----- | ----- |
| acr        | 9     | 1     | 1742  |
| backend    | 1     | 0     | 261   |
| blueprint  | 7     | 2     | 1383  |
| blueprints | 5     | 1     | 1054  |
| branch     | 19    | 2     | 1858  |
| cleanup    | 1     | 0     | 151   |
| codex      | 2     | 1     | 423   |
| context    | 47    | 13    | 8233  |
| docs       | 1     | 0     | 62    |
| doctor     | 12    | 1     | 1835  |
| evaluator  | 4     | 2     | 877   |
| evidence   | 3     | 1     | 699   |
| flow       | 2     | 0     | 238   |
| guard      | 33    | 10    | 6138  |
| hermes     | 3     | 1     | 1419  |
| hooks      | 18    | 2     | 1682  |
| incidents  | 5     | 1     | 807   |
| insights   | 7     | 2     | 1226  |
| pr         | 61    | 17    | 11690 |
| recipes    | 56    | 6     | 5167  |
| release    | 54    | 35    | 10710 |
| root       | 66    | 39    | 14016 |
| scenario   | 7     | 1     | 574   |
| shared     | 57    | 14    | 8367  |
| task       | 175   | 39    | 29553 |
| upgrade    | 8     | 0     | 1527  |

## Interpretation

Command groups are the primary operational interface of AgentPlane. The graph links each command-group entity to its implementation files, test files when colocated by path, and recurring concepts such as task lifecycle, release, context, policy, and GitHub PR integration.
