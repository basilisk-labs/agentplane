Task: `202609132330-RP315R`
Title: Repair task-state validation for immutable quality-object directories without task README artifacts so the stable 0.7...
Canonical task record: `.agentplane/tasks/202609132330-RP315R/README.md`

## Summary

Repair task-state validation for immutable quality-object directories without task README artifacts so the stable 0.7.9 release gate passes without weakening validation for real task records

Repair task-state validation for immutable quality-object directories without task README artifacts so the stable 0.7.9 release gate passes without weakening validation for real task records

## Scope

- In scope: Repair task-state validation for immutable quality-object directories without task README artifacts so the stable 0.7.9 release gate passes without weakening validation for real task records.
- Out of scope: unrelated refactors not required for "Repair task-state validation for immutable quality-object directories without task README artifacts so the stable 0.7.9 release gate passes without weakening validation for real task records".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-13T23:35:19.456Z
- Branch: task/202609132330-RP315R/repair-task-state-validation-for-immutable-quali
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/release/task-state-script.test.ts | 57 ++++++++++++++++++++++
 scripts/checks/check-task-state.mjs                | 46 +++++++++++++++++
 2 files changed, 103 insertions(+)
```

</details>
