Task: `202608271538-T21JCA`
Title: Recover green behind PRs through provider branch update
Canonical task record: `.agentplane/tasks/202608271538-T21JCA/README.md`

## Summary

Preserve the green-behind routing correction and complete its successful-operation contract. Before provider update, validate the exact task checkout, local head and clean state. After exact provider identity and ancestry proof, fetch and fast-forward only to that proven head, then verify local and tracking alignment. Reject drift or dirty state without discarding changes. Cover fresh update, interrupted reconciliation, no-repeat behavior and the next publication route with real local Git fixtures. Do not force push, reset, bypass checks or alter queue ownership.

## Scope

In scope: packages/agentplane/src/commands/shared/provider-update-branch-route.ts, packages/agentplane/src/commands/shared/workflow-step-provider-update-branch.ts, packages/agentplane/src/commands/shared/route-decision-blockers.quality-review.test.ts, packages/agentplane/src/commands/shared/workflow-step-projections.conflict-rework.test.ts, packages/agentplane/src/commands/pr/provider-update-branch.ts, packages/agentplane/src/commands/pr/provider-update-branch.test.ts, packages/agentplane/src/commands/pr/provider-update-branch-local.ts, packages/agentplane/src/commands/pr/provider-update-branch-local.test.ts, packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts, packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts. Complete the exact provider-update-to-local-publication continuity contract described in Plan. Out of scope: policy, CI selection, timeouts, queue ownership, release roadmap changes, force reset/push and unrelated refactoring.

## Verification

- State: needs_rework
- Note: Rework: Declared check failed: bun run ci:local:full
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-27T15:56:08.543Z
- Branch: task/202608271538-T21JCA/recover-green-behind-prs-through-provider-branch
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/pr/head-publication.test.ts       |  34 ++-
 .../agentplane/src/commands/pr/head-publication.ts |  11 +-
 .../pr/provider-update-branch-local.test.ts        | 325 +++++++++++++++++++++
 .../commands/pr/provider-update-branch-local.ts    |  89 ++++++
 .../src/commands/pr/provider-update-branch.test.ts | 101 ++++++-
 .../src/commands/pr/provider-update-branch.ts      | 157 +++++++---
 .../shared/provider-update-branch-route.ts         |  41 ++-
 .../route-decision-blockers.quality-review.test.ts | 124 +++++++-
 .../commands/shared/workflow-operation-prefix.ts   |   2 +-
 .../shared/workflow-operation-projection.ts        |  33 +--
 ...rkflow-step-projections.conflict-rework.test.ts | 258 +++++++++-------
 .../shared/workflow-step-provider-update-branch.ts |   5 +-
 .../task/branch-task-supervisor-operations.test.ts |  42 +--
 .../task/branch-task-supervisor-operations.ts      |   7 +-
 14 files changed, 1021 insertions(+), 208 deletions(-)
```

</details>
