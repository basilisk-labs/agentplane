Task: `202606030511-73DRFG`
Title: Fix finish quality review target for artifact commits
Canonical task record: `.agentplane/tasks/202606030511-73DRFG/README.md`

## Summary

Fix finish quality review target for artifact commits

Fix finish/evaluator lifecycle mismatch where evaluator records the implementation commit while finish expects a task-artifact commit passed via --commit. Ensure --implementation-commit is used as the quality review target so artifact-only closure commits do not force a stale-review loop.

## Scope

- In scope: Fix finish/evaluator lifecycle mismatch where evaluator records the implementation commit while finish expects a task-artifact commit passed via --commit. Ensure --implementation-commit is used as the quality review target so artifact-only closure commits do not force a stale-review loop.
- Out of scope: unrelated refactors not required for "Fix finish quality review target for artifact commits".

## Verification

- State: ok
- Note:

```text
Verified: current head ef6ae4d33 includes auto-resolved finish implementation commit handling and
refreshed evaluator evidence; focused Vitest suite passed 32 tests, policy routing OK, targeted
Prettier passed, and task verify-show read back the updated contract.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-03T05:12:38.923Z
- Branch: task/202606030511-73DRFG/finish-quality-review-target
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/task/finish-blueprint-evidence.ts |  11 +-
 .../src/commands/task/finish-execute-commit.ts     |  37 +++++-
 .../agentplane/src/commands/task/finish-execute.ts |   8 +-
 .../commands/task/finish.validation.unit.test.ts   | 133 +++++++++++++++++++++
 4 files changed, 181 insertions(+), 8 deletions(-)
```

</details>
