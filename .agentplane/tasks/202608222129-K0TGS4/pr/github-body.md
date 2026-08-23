Task: `202608222129-K0TGS4`
Title: Propagate approved scope extension into task-centric WorkItem plan
Canonical task record: `.agentplane/tasks/202608222129-K0TGS4/README.md`

## Summary

Propagate approved scope extension into task-centric WorkItem plan

Repair the proven task-centric regression where task scope extend updates the legacy execution contract but the next executor work order still uses the old current_plan WorkItem scope_roots. On exact state-bound USER approval, create and approve a new TaskPlanRevision that monotonically extends only the uniquely selected WorkItem scope, preserves all other WorkItems and runtime state, archives the prior revision, and leaves production behavior unchanged otherwise. Add focused unit coverage. Do not redesign planning, authority, context, release, or Knowledge Assimilation.

## Scope

- In scope: Repair the proven task-centric regression where task scope extend updates the legacy execution contract but the next executor work order still uses the old current_plan WorkItem scope_roots. On exact state-bound USER approval, create and approve a new TaskPlanRevision that monotonically extends only the uniquely selected WorkItem scope, preserves all other WorkItems and runtime state, archives the prior revision, and leaves production behavior unchanged otherwise. Add focused unit coverage. Do not redesign planning, authority, context, release, or Knowledge Assimilation.
- Out of scope: unrelated refactors not required for "Propagate approved scope extension into task-centric WorkItem plan".

## Verification

- State: needs_rework
- Note: Rework: Declared check failed: bun run ci:local:full
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-22T21:31:27.901Z
- Branch: task/202608222129-K0TGS4/propagate-approved-scope-extension-into-task-cen
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../shared/task-scope-extension-request.ts         |  91 ++++++++++-
 .../src/commands/task/scope-extend.test.ts         | 177 +++++++++++++++++++++
 2 files changed, 266 insertions(+), 2 deletions(-)
```

</details>
