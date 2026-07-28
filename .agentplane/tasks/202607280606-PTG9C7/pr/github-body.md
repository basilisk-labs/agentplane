Task: `202607280606-PTG9C7`
Title: Prevent self-invalidating side-effect authority records
Canonical task record: `.agentplane/tasks/202607280606-PTG9C7/README.md`

## Summary

Prevent self-invalidating side-effect authority records

Fix the branch_pr lifecycle defect where a task authority grant changes the task revision/state fingerprint and makes the freshly recorded authority invalid before the required pre-merge closure or route refresh can execute. Preserve fail-closed authorization and support the documented grant -> clean commit -> recompute route path without manual GitHub merge.

## Scope

- In scope: Fix the branch_pr lifecycle defect where a task authority grant changes the task revision/state fingerprint and makes the freshly recorded authority invalid before the required pre-merge closure or route refresh can execute. Preserve fail-closed authorization and support the documented grant -> clean commit -> recompute route path without manual GitHub merge.
- Out of scope: unrelated refactors not required for "Prevent self-invalidating side-effect authority records".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-28T06:15:22.323Z
- Branch: task/202607280606-PTG9C7/prevent-self-invalidating-side-effect-authority
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../agentplane/src/runner/context/task-context.ts  | 12 ++++-
 .../usecases/agent-work-order.integration.test.ts  | 61 +++++++++++++++++++++-
 2 files changed, 70 insertions(+), 3 deletions(-)
```

</details>
