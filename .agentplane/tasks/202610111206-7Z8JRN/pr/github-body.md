Task: `202610111206-7Z8JRN`
Title: Bind finite native verification timeout profiles
Canonical task record: `.agentplane/tasks/202610111206-7Z8JRN/README.md`

## Summary

Bind finite native verification timeout profiles

Allow explicit finite operator timeout profiles for native canonical declared checks. Preserve default budgets and explicit per-command precedence, bind effective budgets into cache identity and evidence, reject invalid/unbounded values before execution. Preserve shared sequence deadlines, assertions and per-test timeouts. No active-run mutation or project exceptions.

## Scope

- In scope: Allow explicit finite operator timeout profiles for native canonical declared checks. Preserve default budgets and explicit per-command precedence, bind effective budgets into cache identity and evidence, reject invalid/unbounded values before execution. Preserve shared sequence deadlines, assertions and per-test timeouts. No active-run mutation or project exceptions.
- Out of scope: unrelated refactors not required for "Bind finite native verification timeout profiles".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-11T12:18:50.258Z
- Branch: task/202610111206-7Z8JRN/native-timeout-profile
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../task/direct-task-verification-checks.ts        |  4 ++
 .../task/direct-task-verification-timeout.test.ts  | 42 +++++++++++++++++
 .../task/direct-task-verification-timeout.ts       | 42 +++++++++++++++++
 .../direct-task-verification.qualification.test.ts | 54 ++++++++++++++++++++++
 .../src/commands/task/direct-task-verification.ts  | 43 +++++++++--------
 .../task/kernel-inspection-validation.test.ts      | 30 +++++++++++-
 6 files changed, 192 insertions(+), 23 deletions(-)
```

</details>
