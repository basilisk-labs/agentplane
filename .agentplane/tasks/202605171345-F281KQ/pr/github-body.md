Task: `202605171345-F281KQ`
Title: Add guided task begin and complete shortcuts
Canonical task record: `.agentplane/tasks/202605171345-F281KQ/README.md`

## Summary

Add guided task begin and complete shortcuts

Add thin user-facing workflow shortcuts over existing task lifecycle primitives so users can begin and complete a task through policy-aware commands while preserving the generated audit trail and explicit stop gates.

## Scope

- In scope: Add thin user-facing workflow shortcuts over existing task lifecycle primitives so users can begin and complete a task through policy-aware commands while preserving the generated audit trail and explicit stop gates.
- Out of scope: unrelated refactors not required for "Add guided task begin and complete shortcuts".

## Verification

- State: ok
- Note:

```text
Implemented guided task begin and complete shortcuts. Checks passed: guided CLI tests;
command-guide/help snapshots; docs freshness; policy routing; typecheck; lint; lifecycle unit tests
via Vitest after bun-test runner mismatch was reported as issue #3845; clean temp-repo smoke for
init -> task begin -> task complete.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-17T17:27:09.110Z
- Branch: task/202605171345-F281KQ/guided-task-shortcuts
- Head: 4dbbe339e38d

```text
No changes detected.
```

</details>
