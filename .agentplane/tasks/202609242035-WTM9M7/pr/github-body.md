Task: `202609242035-WTM9M7`
Title: Bind canonical final verification to the observed verification contract
Canonical task record: `.agentplane/tasks/202609242035-WTM9M7/README.md`

## Summary

Bind canonical final verification to the observed verification contract

Resolve the implementation verification task and observed contract before canonical final checks so dynamically required checks such as docs_contract are present in recorded evidence. Reuse the same snapshot for projection after the canonical validation record.

## Scope

- In scope: Resolve the implementation verification task and observed contract before canonical final checks so dynamically required checks such as docs_contract are present in recorded evidence. Reuse the same snapshot for projection after the canonical validation record.
- Out of scope: unrelated refactors not required for "Bind canonical final verification to the observed verification contract".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-24T20:39:37.177Z
- Branch: task/202609242035-WTM9M7/bind-canonical-final-verification-to-the-observe
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../commands/task/direct-task-verification.test.ts | 47 ++++++++++++++++++++++
 .../src/commands/task/direct-task-verification.ts  | 18 +++++++++
 .../commands/task/kernel-final-validation.test.ts  | 12 ++++++
 .../src/commands/task/kernel-final-validation.ts   | 42 +++++++++++--------
 4 files changed, 103 insertions(+), 16 deletions(-)
```

</details>
