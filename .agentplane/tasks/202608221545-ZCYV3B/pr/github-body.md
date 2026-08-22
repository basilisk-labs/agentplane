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

- State: ok
- Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-22T15:47:34.719Z
- Branch: task/202608221545-ZCYV3B/stop-verification-receipts-from-overstating-chec
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.critical.task-centric.test.ts  |   9 +-
 .../shared/task-verification-records.test.ts       |  32 ++++--
 .../commands/shared/task-verification-records.ts   |   4 +-
 .../commands/task/direct-task-verification.test.ts | 115 +++++++++++++++++++++
 .../src/commands/task/direct-task-verification.ts  |  76 +++++++++++---
 .../external-agent-verification-result.test.ts     |  37 ++++++-
 .../task/external-agent-verification-result.ts     |  38 ++++---
 7 files changed, 271 insertions(+), 40 deletions(-)
```

</details>
