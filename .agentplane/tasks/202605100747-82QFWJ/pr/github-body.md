Task: `202605100747-82QFWJ`
Title: Optimize branch_pr workflow resilience
Canonical task record: `.agentplane/tasks/202605100747-82QFWJ/README.md`

## Summary

Optimize branch_pr workflow resilience

Audit the branch_pr task lifecycle, map state transitions, identify redundant/error-prone steps, and implement a narrow refactor that makes the workflow faster, simpler, and more fault-tolerant without weakening verification or traceability.

## Scope

- In scope: Audit the branch_pr task lifecycle, map state transitions, identify redundant/error-prone steps, and implement a narrow refactor that makes the workflow faster, simpler, and more fault-tolerant without weakening verification or traceability.
- Out of scope: unrelated refactors not required for "Optimize branch_pr workflow resilience".

## Verification

- State: ok
- Note: Verified: task-new backend readiness now fails before stale cloud setup emits task-doc warnings or writes task cache; focused tests, formatting, lint, policy routing, and doctor passed.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-10T07:48:28.215Z
- Branch: task/202605100747-82QFWJ/branch-pr-resilience
- Head: 41998526ec8a

```text
No changes detected.
```

</details>
