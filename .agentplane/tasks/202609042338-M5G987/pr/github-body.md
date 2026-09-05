Task: `202609042338-M5G987`
Title: Repair atomic scope extension projection and accepted-result recovery
Canonical task record: `.agentplane/tasks/202609042338-M5G987/README.md`

## Summary

Repair atomic scope extension projection and accepted-result recovery

Blocking dependency of 202609041801-ZVX69C / PR 5897 after integrated XR979S. A supported task scope extend on pre-merge DONE rework with all required WorkItems completed persisted legacy DOING revision 37 but retained canonical BLOCKED revision 35. The next accepted EXECUTOR result was committed as 682089ad3 and remains result_received; task set-status refuses expected 38 observed 35. Repair scope extension at its canonical persistence owner so lifecycle, revision, plan authority and projections advance atomically. Provide narrow idempotent recovery for the already-applied scope-extension receipt and accepted implementation, without replacing results, weakening mismatch checks, fabricating product diffs, or manually editing task state. Reproduce the complete blocker, scope extension, implementation result and retry sequence; preserve unrelated and truly stale rejection. Return to ZVX69C after integration. Exclude Factory clean-check ordering/worktree recovery owned by PH5N6S, releases, versions, publication, dependencies and MPXQBK.

## Scope

- In scope: Blocking dependency of 202609041801-ZVX69C / PR 5897 after integrated XR979S. A supported task scope extend on pre-merge DONE rework with all required WorkItems completed persisted legacy DOING revision 37 but retained canonical BLOCKED revision 35. The next accepted EXECUTOR result was committed as 682089ad3 and remains result_received; task set-status refuses expected 38 observed 35. Repair scope extension at its canonical persistence owner so lifecycle, revision, plan authority and projections advance atomically. Provide narrow idempotent recovery for the already-applied scope-extension receipt and accepted implementation, without replacing results, weakening mismatch checks, fabricating product diffs, or manually editing task state. Reproduce the complete blocker, scope extension, implementation result and retry sequence; preserve unrelated and truly stale rejection. Return to ZVX69C after integration. Exclude Factory clean-check ordering/worktree recovery owned by PH5N6S, releases, versions, publication, dependencies and MPXQBK.
- Out of scope: unrelated refactors not required for "Repair atomic scope extension projection and accepted-result recovery".

## Verification

- State: pending
- Note: Invalidated by USER-approved execution scope extension.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-05T01:54:44.088Z
- Branch: task/202609042338-M5G987/repair-atomic-scope-extension-projection-and-acc
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../task-backend/task-centric-backend-runtime.ts   |  78 ++++++
 ...un-cli.core.task-advance.blocked-result.test.ts | 179 ++++++++----
 ...n-cli.core.task-advance.branch-worktree.test.ts |  66 ++++-
 .../shared/task-scope-extension-request.ts         | 228 +++++++++++++++-
 .../src/commands/shared/workflow-step-branch.ts    |   3 +-
 .../src/commands/shared/workflow-step-factory.ts   |   6 +-
 .../commands/shared/workflow-step-policy-scope.ts  |  16 ++
 .../src/commands/shared/workflow-step.test.ts      |  65 +++++
 .../commands/task/external-agent-blocked-result.ts |  16 +-
 .../task/external-agent-evaluator-recovery.test.ts | 124 ++++++++-
 .../task/external-agent-evaluator-recovery.ts      | 137 +++++++++-
 .../external-agent-implementation-recovery.test.ts |  85 +++++-
 .../task/external-agent-implementation-recovery.ts |  42 +--
 .../src/commands/task/external-agent-supervisor.ts |  43 ++-
 packages/agentplane/src/commands/task/plan.ts      |  35 ++-
 .../agentplane/src/commands/task/plan.unit.test.ts |  93 +++++++
 .../src/commands/task/scope-extend.test.ts         | 301 +++++++++++++++------
 .../src/commands/task/set-status.unit.test.ts      |  19 +-
 .../task/shared/workflow-transition-service.ts     |  66 ++++-
 packages/agentplane/src/commands/task/update.ts    |   6 +-
 .../src/commands/task/update.unit.test.ts          |  49 ++++
 21 files changed, 1449 insertions(+), 208 deletions(-)
```

</details>
