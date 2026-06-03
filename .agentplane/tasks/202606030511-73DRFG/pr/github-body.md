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
Verified: implementation commit 63d2862a5 preserves focused test pass (31 tests across 2 files),
policy routing OK, and targeted Prettier check pass after the finish quality-review target change.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-03T05:12:38.923Z
- Branch: task/202606030511-73DRFG/finish-quality-review-target
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/task/finish-blueprint-evidence.ts | 11 +++-
 .../agentplane/src/commands/task/finish-execute.ts |  1 +
 .../commands/task/finish.validation.unit.test.ts   | 64 ++++++++++++++++++++++
 3 files changed, 73 insertions(+), 3 deletions(-)
```

</details>
