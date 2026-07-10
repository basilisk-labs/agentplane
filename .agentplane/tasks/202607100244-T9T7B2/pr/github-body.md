Task: `202607100244-T9T7B2`
Title: Prefer merged PR commit when reconciling included batch tasks
Canonical task record: `.agentplane/tasks/202607100244-T9T7B2/README.md`

## Summary

Prefer merged PR commit when reconciling included batch tasks

For v0.6.22, make release task reconciliation close verified included batch tasks after GitHub rebase merges by preferring the primary PR merge_commit over the rewritten-away branch task commit, while preserving the task commit fallback when merged PR metadata is unavailable.

## Scope

- In scope: For v0.6.22, make release task reconciliation close verified included batch tasks after GitHub rebase merges by preferring the primary PR merge_commit over the rewritten-away branch task commit, while preserving the task commit fallback when merged PR metadata is unavailable.
- Out of scope: unrelated refactors not required for "Prefer merged PR commit when reconciling included batch tasks".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-10T02:47:15.009Z
- Branch: task/202607100244-T9T7B2/prefer-merged-pr-commit-when-reconciling-include
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
No changes detected.
```

</details>
