Task: `202610111111-52C7VS`
Title: Authenticate blocked-plan rejection evidence for fresh rework execution
Canonical task record: `.agentplane/tasks/202610111111-52C7VS/README.md`

## Summary

Authenticate blocked-plan rejection evidence for fresh rework execution

Generic controller repair: a truthful semantic BLOCKED result followed by USER reject_plan and a newly approved plan must issue the next implementation WorkOrder with authenticated retained blocker and plan-transition evidence. Preserve all existing rejection, authority, task, claim, attempt, fingerprint and digest checks. Do not modify HPA9TM or add project-specific behavior. Use real native/reducer regression and forged/missing/cross-plan negative tests.

## Scope

- In scope: Generic controller repair: a truthful semantic BLOCKED result followed by USER reject_plan and a newly approved plan must issue the next implementation WorkOrder with authenticated retained blocker and plan-transition evidence. Preserve all existing rejection, authority, task, claim, attempt, fingerprint and digest checks. Do not modify HPA9TM or add project-specific behavior. Use real native/reducer regression and forged/missing/cross-plan negative tests.
- Out of scope: unrelated refactors not required for "Authenticate blocked-plan rejection evidence for fresh rework execution".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-11T11:38:23.071Z
- Branch: task/202610111111-52C7VS/blocked-plan-rework
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/task/kernel-exchange.ts           |   3 +
 .../task/kernel-rejected-plan-inputs.test.ts       | 251 +++++++++++++++++++++
 .../commands/task/kernel-rejected-plan-inputs.ts   | 234 +++++++++++++++++++
 3 files changed, 488 insertions(+)
```

</details>
