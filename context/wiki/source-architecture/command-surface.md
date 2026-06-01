---
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
      - "entity.command_group.backend-connect-ts"
      - "entity.command_group.backend-test-ts"
      - "entity.command_group.backend-ts"
      - "entity.command_group.backend"
      - "entity.command_group.block-run-ts"
      - "entity.command_group.block-spec-ts"
      - "entity.command_group.blueprint"
      - "entity.command_group.blueprints"
      - "entity.command_group.branch"
      - "entity.command_group.cleanup"
      - "entity.command_group.codex"
      - "entity.command_group.commit-command-ts"
      - "entity.command_group.commit-spec-ts"
      - "entity.command_group.context"
      - "entity.command_group.docs"
      - "entity.command_group.doctor-git-locks-run-ts"
      - "entity.command_group.doctor-git-locks-spec-ts"
      - "entity.command_group.doctor-branch-pr-memo-test-ts"
      - "entity.command_group.doctor-command-open-pr-test-ts"
      - "entity.command_group.doctor-command-runtime-test-ts"
      - "entity.command_group.doctor-command-task-docs-test-ts"
      - "entity.command_group.doctor-fast-test-ts"
      - "entity.command_group.doctor-run-ts"
      - "entity.command_group.doctor-spec-ts"
      - "entity.command_group.doctor"
      - "entity.command_group.evaluator"
      - "entity.command_group.evidence"
      - "entity.command_group.finish-run-ts"
      - "entity.command_group.finish-spec-shared-ts"
      - "entity.command_group.finish-spec-ts"
      - "entity.command_group.flow"
      - "entity.command_group.guard"
      - "entity.command_group.hermes"
      - "entity.command_group.hooks"
      - "entity.command_group.incidents"
      - "entity.command_group.insights"
      - "entity.command_group.integrate-queue-doctor-command-ts"
      - "entity.command_group.integrate-queue-doctor-ts"
      - "entity.command_group.integrate-queue-lane-ts"
      - "entity.command_group.integrate-queue-recovery-test-ts"
      - "entity.command_group.integrate-queue-recovery-ts"
      - "entity.command_group.integrate-queue-command-ts"
      - "entity.command_group.integrate-queue-spec-test-ts"
      - "entity.command_group.integrate-queue-spec-ts"
      - "entity.command_group.integrate-command-ts"
      - "entity.command_group.integrate-spec-ts"
      - "entity.command_group.pr"
      - "entity.command_group.ready-command-ts"
      - "entity.command_group.recipes-cache-test-ts"
      - "entity.command_group.recipes-catalog-install-test-ts"
      - "entity.command_group.recipes-list-test-ts"
      - "entity.command_group.recipes-scenario-test-ts"
      - "entity.command_group.recipes-transaction-test-ts"
      - "entity.command_group.recipes"
      - "entity.command_group.release"
      - "entity.command_group.runtime-command-test-ts"
      - "entity.command_group.runtime-command-ts"
      - "entity.command_group.runtime-spec-ts"
      - "entity.command_group.scenario-ts"
      - "entity.command_group.scenario"
      - "entity.command_group.shared"
      - "entity.command_group.start-run-ts"
      - "entity.command_group.start-spec-ts"
      - "entity.command_group.sync-command-ts"
      - "entity.command_group.task"
      - "entity.command_group.upgrade-agent-mode-test-ts"
      - "entity.command_group.upgrade-cleanup-test-ts"
      - "entity.command_group.upgrade-command-ts"
      - "entity.command_group.upgrade-json-merge-stability-test-ts"
      - "entity.command_group.upgrade-merge-test-ts"
      - "entity.command_group.upgrade-release-assets-unit-test-ts"
      - "entity.command_group.upgrade-safety-test-ts"
      - "entity.command_group.upgrade-spec-parse-test-ts"
      - "entity.command_group.upgrade-spec-ts"
      - "entity.command_group.upgrade-tarball-url-unit-test-ts"
      - "entity.command_group.upgrade-ts"
      - "entity.command_group.upgrade-unit-test-ts"
      - "entity.command_group.upgrade"
      - "entity.command_group.verify-run-ts"
      - "entity.command_group.verify-spec-ts"
      - "entity.command_group.workflow-build-command-ts"
      - "entity.command_group.workflow-playbook-command-ts"
      - "entity.command_group.workflow-playbook-spec-ts"
      - "entity.command_group.workflow-restore-command-ts"
      - "entity.command_group.workflow-command-ts"
      - "entity.command_group.workflow-maintenance-test-ts"
      - "entity.command_group.workflow-task-doc-test-ts"
      - "entity.command_group.workflow-test-ts"
      - "entity.command_group.workflow-ts"
      - "entity.command_group.workflow-verify-hooks-test-ts"
    edges:
  conflicts: []
  updated_by: CURATOR
---

## Sources

1. [`packages/agentplane/src/commands/acr/acr.command.test.ts`](../../packages/agentplane/src/commands/acr/acr.command.test.ts)
2. [`packages/agentplane/src/commands/acr/acr.command.ts`](../../packages/agentplane/src/commands/acr/acr.command.ts)
3. [`packages/agentplane/src/commands/acr/acr.specs.ts`](../../packages/agentplane/src/commands/acr/acr.specs.ts)
4. [`packages/agentplane/src/commands/acr/diff.ts`](../../packages/agentplane/src/commands/acr/diff.ts)
5. [`packages/agentplane/src/commands/acr/generate-extensions.ts`](../../packages/agentplane/src/commands/acr/generate-extensions.ts)
6. [`packages/agentplane/src/commands/acr/generate.ts`](../../packages/agentplane/src/commands/acr/generate.ts)
7. [`packages/agentplane/src/commands/acr/remediation.ts`](../../packages/agentplane/src/commands/acr/remediation.ts)
8. [`packages/agentplane/src/commands/acr/summary.ts`](../../packages/agentplane/src/commands/acr/summary.ts)
9. [`packages/agentplane/src/commands/acr/validate.ts`](../../packages/agentplane/src/commands/acr/validate.ts)
10. [`packages/agentplane/src/commands/backend-connect.ts`](../../packages/agentplane/src/commands/backend-connect.ts)
11. [`packages/agentplane/src/commands/backend.test.ts`](../../packages/agentplane/src/commands/backend.test.ts)
12. [`packages/agentplane/src/commands/backend.ts`](../../packages/agentplane/src/commands/backend.ts)
13. [`packages/agentplane/src/commands/backend/sync.command.ts`](../../packages/agentplane/src/commands/backend/sync.command.ts)
14. [`packages/agentplane/src/commands/block.run.ts`](../../packages/agentplane/src/commands/block.run.ts)
15. [`packages/agentplane/src/commands/block.spec.ts`](../../packages/agentplane/src/commands/block.spec.ts)
16. [`packages/agentplane/src/commands/blueprint/blueprint-listing.ts`](../../packages/agentplane/src/commands/blueprint/blueprint-listing.ts)
17. [`packages/agentplane/src/commands/blueprint/blueprint.command.ts`](../../packages/agentplane/src/commands/blueprint/blueprint.command.ts)
18. [`packages/agentplane/src/commands/blueprint/blueprint.specs.ts`](../../packages/agentplane/src/commands/blueprint/blueprint.specs.ts)
19. [`packages/agentplane/src/commands/blueprint/snapshot-artifact.test.ts`](../../packages/agentplane/src/commands/blueprint/snapshot-artifact.test.ts)
20. [`packages/agentplane/src/commands/blueprint/snapshot-artifact.ts`](../../packages/agentplane/src/commands/blueprint/snapshot-artifact.ts)
21. [`packages/agentplane/src/commands/blueprint/task-input.test.ts`](../../packages/agentplane/src/commands/blueprint/task-input.test.ts)
22. [`packages/agentplane/src/commands/blueprint/task-input.ts`](../../packages/agentplane/src/commands/blueprint/task-input.ts)
23. [`packages/agentplane/src/commands/blueprints/blueprints.command.ts`](../../packages/agentplane/src/commands/blueprints/blueprints.command.ts)
24. [`packages/agentplane/src/commands/blueprints/catalog-cache.test.ts`](../../packages/agentplane/src/commands/blueprints/catalog-cache.test.ts)
25. [`packages/agentplane/src/commands/blueprints/catalog-cache.ts`](../../packages/agentplane/src/commands/blueprints/catalog-cache.ts)
26. [`packages/agentplane/src/commands/blueprints/catalog-model.ts`](../../packages/agentplane/src/commands/blueprints/catalog-model.ts)
27. [`packages/agentplane/src/commands/blueprints/catalog.ts`](../../packages/agentplane/src/commands/blueprints/catalog.ts)
28. [`packages/agentplane/src/commands/branch/base.command.ts`](../../packages/agentplane/src/commands/branch/base.command.ts)
29. [`packages/agentplane/src/commands/branch/base.ts`](../../packages/agentplane/src/commands/branch/base.ts)
30. [`packages/agentplane/src/commands/branch/cleanup-merged.ts`](../../packages/agentplane/src/commands/branch/cleanup-merged.ts)
31. [`packages/agentplane/src/commands/branch/index.ts`](../../packages/agentplane/src/commands/branch/index.ts)
32. [`packages/agentplane/src/commands/branch/internal/archive-pr.ts`](../../packages/agentplane/src/commands/branch/internal/archive-pr.ts)
33. [`packages/agentplane/src/commands/branch/internal/work-validate.ts`](../../packages/agentplane/src/commands/branch/internal/work-validate.ts)
34. [`packages/agentplane/src/commands/branch/remove.command.ts`](../../packages/agentplane/src/commands/branch/remove.command.ts)
35. [`packages/agentplane/src/commands/branch/remove.ts`](../../packages/agentplane/src/commands/branch/remove.ts)

# Command Surface

| Command                              | Files | Tests | Lines |
| ------------------------------------ | ----- | ----- | ----- |
| acr                                  | 9     | 1     | 1742  |
| backend                              | 1     | 0     | 261   |
| backend-connect.ts                   | 1     | 0     | 141   |
| backend.test.ts                      | 1     | 1     | 48    |
| backend.ts                           | 1     | 0     | 353   |
| block.run.ts                         | 1     | 0     | 36    |
| block.spec.ts                        | 1     | 1     | 183   |
| blueprint                            | 7     | 2     | 1383  |
| blueprints                           | 5     | 1     | 1054  |
| branch                               | 19    | 2     | 1858  |
| cleanup                              | 1     | 0     | 151   |
| codex                                | 2     | 1     | 423   |
| commit.command.ts                    | 1     | 0     | 33    |
| commit.spec.ts                       | 1     | 1     | 214   |
| context                              | 47    | 13    | 8233  |
| docs                                 | 1     | 0     | 62    |
| doctor                               | 12    | 1     | 1835  |
| doctor-git-locks.run.ts              | 1     | 0     | 48    |
| doctor-git-locks.spec.ts             | 1     | 1     | 26    |
| doctor.branch-pr.memo.test.ts        | 1     | 1     | 55    |
| doctor.command.open-pr.test.ts       | 1     | 1     | 1097  |
| doctor.command.runtime.test.ts       | 1     | 1     | 1037  |
| doctor.command.task-docs.test.ts     | 1     | 1     | 683   |
| doctor.fast.test.ts                  | 1     | 1     | 322   |
| doctor.run.ts                        | 1     | 0     | 115   |
| doctor.spec.ts                       | 1     | 1     | 56    |
| evaluator                            | 4     | 2     | 877   |
| evidence                             | 3     | 1     | 699   |
| finish.run.ts                        | 1     | 0     | 78    |
| finish.spec.shared.ts                | 1     | 0     | 281   |
| finish.spec.ts                       | 1     | 1     | 227   |
| flow                                 | 2     | 0     | 238   |
| guard                                | 33    | 10    | 6138  |
| hermes                               | 3     | 1     | 1419  |
| hooks                                | 18    | 2     | 1682  |
| incidents                            | 5     | 1     | 807   |
| insights                             | 7     | 2     | 1226  |
| integrate-queue-doctor-command.ts    | 1     | 0     | 93    |
| integrate-queue-doctor.ts            | 1     | 0     | 38    |
| integrate-queue-lane.ts              | 1     | 0     | 194   |
| integrate-queue-recovery.test.ts     | 1     | 1     | 161   |
| integrate-queue-recovery.ts          | 1     | 0     | 65    |
| integrate-queue.command.ts           | 1     | 0     | 349   |
| integrate-queue.spec.test.ts         | 1     | 1     | 115   |
| integrate-queue.spec.ts              | 1     | 1     | 307   |
| integrate.command.ts                 | 1     | 0     | 22    |
| integrate.spec.ts                    | 1     | 1     | 58    |
| pr                                   | 61    | 17    | 11690 |
| ready.command.ts                     | 1     | 0     | 36    |
| recipes                              | 56    | 6     | 5167  |
| recipes.cache.test.ts                | 1     | 1     | 158   |
| recipes.catalog-install.test.ts      | 1     | 1     | 399   |
| recipes.list.test.ts                 | 1     | 1     | 306   |
| recipes.scenario.test.ts             | 1     | 1     | 489   |
| recipes.transaction.test.ts          | 1     | 1     | 366   |
| release                              | 54    | 35    | 10710 |
| runtime.command.test.ts              | 1     | 1     | 329   |
| runtime.command.ts                   | 1     | 0     | 275   |
| runtime.spec.ts                      | 1     | 1     | 43    |
| scenario                             | 7     | 1     | 574   |
| scenario.ts                          | 1     | 0     | 6     |
| shared                               | 57    | 14    | 8367  |
| start.run.ts                         | 1     | 0     | 36    |
| start.spec.ts                        | 1     | 1     | 183   |
| sync.command.ts                      | 1     | 0     | 70    |
| task                                 | 175   | 39    | 29553 |
| upgrade                              | 8     | 0     | 1527  |
| upgrade.agent-mode.test.ts           | 1     | 1     | 143   |
| upgrade.cleanup.test.ts              | 1     | 1     | 76    |
| upgrade.command.ts                   | 1     | 0     | 9     |
| upgrade.json-merge.stability.test.ts | 1     | 1     | 72    |
| upgrade.merge.test.ts                | 1     | 1     | 639   |
| upgrade.release-assets.unit.test.ts  | 1     | 1     | 37    |
| upgrade.safety.test.ts               | 1     | 1     | 295   |
| upgrade.spec-parse.test.ts           | 1     | 1     | 108   |
| upgrade.spec.ts                      | 1     | 1     | 192   |
| upgrade.tarball-url.unit.test.ts     | 1     | 1     | 34    |
| upgrade.ts                           | 1     | 0     | 400   |
| upgrade.unit.test.ts                 | 1     | 1     | 35    |
| verify.run.ts                        | 1     | 0     | 37    |
| verify.spec.ts                       | 1     | 1     | 134   |
| workflow-build.command.ts            | 1     | 0     | 143   |
| workflow-playbook.command.ts         | 1     | 0     | 211   |
| workflow-playbook.spec.ts            | 1     | 1     | 28    |
| workflow-restore.command.ts          | 1     | 0     | 51    |
| workflow.command.ts                  | 1     | 0     | 28    |
| workflow.maintenance.test.ts         | 1     | 1     | 433   |
| workflow.task-doc.test.ts            | 1     | 1     | 370   |
| workflow.test.ts                     | 1     | 1     | 924   |
| workflow.ts                          | 1     | 0     | 36    |
| workflow.verify-hooks.test.ts        | 1     | 1     | 450   |

## Interpretation

Command groups are the primary operational interface of AgentPlane. The graph links each command-group entity to its implementation files, test files when colocated by path, and recurring concepts such as task lifecycle, release, context, policy, and GitHub PR integration.
