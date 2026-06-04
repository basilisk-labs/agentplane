Task: `202606041816-ZWT71K`
Title: Make hosted-close tolerate pre-merge closed tasks
Canonical task record: `.agentplane/tasks/202606041816-ZWT71K/README.md`

## Summary

Make hosted-close tolerate pre-merge closed tasks

Post-merge hosted-close failed after PR #4439 because the task was already DONE in the merged PR with a close commit that is an ancestor of the GitHub merge commit. Treat that state as an idempotent noop when the PR metadata matches the merged task branch/number and the recorded DONE commit is reachable from the merge commit.

## Scope

- In scope: Post-merge hosted-close failed after PR #4439 because the task was already DONE in the merged PR with a close commit that is an ancestor of the GitHub merge commit. Treat that state as an idempotent noop when the PR metadata matches the merged task branch/number and the recorded DONE commit is reachable from the merge commit.
- Out of scope: unrelated refactors not required for "Make hosted-close tolerate pre-merge closed tasks".

## Verification

- State: ok
- Note:

```text
Verified hosted-close pre-merge closure idempotency: targeted hosted-close.command unit test passed
(5 tests), format:changed passed, typecheck passed, policy routing checks passed, hotspots check
passed, agentplane package build passed, and synthetic PR #4439 hosted-close event exited 0 without
creating a commit.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-04T18:16:34.305Z
- Branch: task/202606041816-ZWT71K/post-merge-hosted-close-preclosed
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
No changes detected.
```

</details>
