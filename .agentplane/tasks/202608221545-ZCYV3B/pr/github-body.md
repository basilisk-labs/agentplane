Task: `202608221545-ZCYV3B`
Title: Stop verification receipts from overstating check coverage
Canonical task record: `.agentplane/tasks/202608221545-ZCYV3B/README.md`

## Summary

Stop verification receipts from overstating check coverage

Fix only the proven task-centric verification regression from PR #4873: one focused declared command must not be recorded as full_regression or hosted_integration evidence. Preserve separate hosted-provider gating, run a real repository full-regression command when the contract requires it, and bind each recorded check to concrete executed evidence. Add regression tests. Do not change context or Knowledge Assimilation behavior.

## Scope

- In scope: Fix only the proven task-centric verification regression from PR #4873: one focused declared command must not be recorded as full_regression or hosted_integration evidence. Preserve separate hosted-provider gating, run a real repository full-regression command when the contract requires it, and bind each recorded check to concrete executed evidence. Add regression tests. Do not change context or Knowledge Assimilation behavior.
- Out of scope: unrelated refactors not required for "Stop verification receipts from overstating check coverage".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-22T15:47:34.719Z
- Branch: task/202608221545-ZCYV3B/stop-verification-receipts-from-overstating-chec
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../shared/task-verification-records.test.ts       |  21 +++++
 .../commands/shared/task-verification-records.ts   |   4 +-
 .../commands/task/direct-task-verification.test.ts | 100 +++++++++++++++++++++
 .../src/commands/task/direct-task-verification.ts  |  67 +++++++++++---
 .../external-agent-verification-result.test.ts     |  33 ++++++-
 .../task/external-agent-verification-result.ts     |  38 +++++---
 6 files changed, 236 insertions(+), 27 deletions(-)
```

</details>
