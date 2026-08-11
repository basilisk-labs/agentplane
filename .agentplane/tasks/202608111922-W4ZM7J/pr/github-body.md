Task: `202608111922-W4ZM7J`
Title: Validate declared checks with the supervised execution grammar
Canonical task record: `.agentplane/tasks/202608111922-W4ZM7J/README.md`

## Summary

Validate declared checks with the supervised execution grammar

Reject unsupported verification commands at every task mutation boundary using the same deterministic parser later used by automatic TESTER execution. Return an actionable error before persisting task state; preserve repository-bound argv execution without shell evaluation; cover task new, add, update, derive, begin/create adapters, and the previously failing bun test path command.

## Scope

- In scope: Reject unsupported verification commands at every task mutation boundary using the same deterministic parser later used by automatic TESTER execution. Return an actionable error before persisting task state; preserve repository-bound argv execution without shell evaluation; cover task new, add, update, derive, begin/create adapters, and the previously failing bun test path command.
- Out of scope: unrelated refactors not required for "Validate declared checks with the supervised execution grammar".

## Verification

- State: ok
- Note: Declared-check mutation and execution parity verified against the committed implementation.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-11T20:20:31.084Z
- Branch: task/202608111922-W4ZM7J/validate-declared-checks-with-the-supervised-exe
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.task-guided.test.ts       |  24 ++
 .../src/cli/run-cli.core.tasks.create.test.ts      |  64 +++++
 .../cli/run-cli.core.tasks.scaffold-derive.test.ts |  59 +++-
 .../src/cli/run-cli.core.tasks.user-create.test.ts |  22 ++
 .../src/commands/shared/declared-check.test.ts     |  48 ++++
 .../src/commands/shared/declared-check.ts          | 320 +++++++++++++++++++++
 .../agentplane/src/commands/shared/pr-meta.test.ts |  10 +-
 .../src/commands/shared/pr-meta/verify-log.ts      |  94 +-----
 packages/agentplane/src/commands/task/add.ts       |   3 +
 packages/agentplane/src/commands/task/derive.ts    |   3 +
 .../commands/task/direct-task-verification.test.ts |  15 +-
 .../src/commands/task/direct-task-verification.ts  |  63 +---
 packages/agentplane/src/commands/task/new.ts       |   2 +
 packages/agentplane/src/commands/task/update.ts    |   4 +
 .../src/commands/task/update.unit.test.ts          |  57 ++++
 15 files changed, 638 insertions(+), 150 deletions(-)
```

</details>
