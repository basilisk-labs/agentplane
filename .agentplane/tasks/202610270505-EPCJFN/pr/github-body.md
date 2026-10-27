Task: `202610270505-EPCJFN`
Title: Authenticate retained native validation across approved Plan corrections
Canonical task record: `.agentplane/tasks/202610270505-EPCJFN/README.md`

## Summary

Authenticate retained native validation across approved Plan corrections

Generic recovery: preserve original WorkOrder and immutable validation proof, verify native USER-approved Plan correction lineage, and issue the next bounded action without treating a historical Plan as the current Plan. Add regression tests for missing or tampered transitions.

## Scope

- In scope: Generic recovery: preserve original WorkOrder and immutable validation proof, verify native USER-approved Plan correction lineage, and issue the next bounded action without treating a historical Plan as the current Plan. Add regression tests for missing or tampered transitions.
- Out of scope: unrelated refactors not required for "Authenticate retained native validation across approved Plan corrections".

## Verification

- State: ok
- Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-27T16:07:55.773Z
- Branch: task/202610270505-EPCJFN/authenticate-retained-native-validation-across-a
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../commands/task/kernel-recovery-evidence.test.ts | 162 ----
 .../src/commands/task/kernel-recovery-evidence.ts  | 258 +++---
 .../commands/task/kernel-recovery-lineage.test.ts  | 986 +++++++++++++++++++++
 .../src/commands/task/kernel-recovery-lineage.ts   | 231 +++++
 4 files changed, 1338 insertions(+), 299 deletions(-)
```

</details>
