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

- State: ok
- Note: Canonical validation sha256:1a3bafc4a36da5cd82c173e9f530e184dfb32e10d54346b7ea367e9d5d4f5b3b
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-11T12:40:23.573Z
- Branch: task/202610111206-7Z8JRN/native-timeout-profile
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../task/direct-task-verification-checks.ts        |  4 ++
 .../task/direct-task-verification-timeout.test.ts  | 42 +++++++++++++++
 .../task/direct-task-verification-timeout.ts       | 42 +++++++++++++++
 .../direct-task-verification.qualification.test.ts | 63 +++++++++++++++++++++-
 .../src/commands/task/direct-task-verification.ts  | 45 ++++++++--------
 .../task/kernel-inspection-validation.test.ts      | 30 ++++++++++-
 6 files changed, 202 insertions(+), 24 deletions(-)
```

</details>
