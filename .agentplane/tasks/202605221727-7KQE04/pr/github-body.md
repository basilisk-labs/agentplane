Task: `202605221727-7KQE04`
Title: Split mutable hosted metadata from tracked evidence
Canonical task record: `.agentplane/tasks/202605221727-7KQE04/README.md`

## Summary

Split mutable hosted metadata from tracked evidence

Move volatile PR/check/head metadata out of tracked task artifacts or make it computed live so evidence updates do not invalidate reviewed implementation commits.

## Scope

- In scope: Move volatile PR/check/head metadata out of tracked task artifacts or make it computed live so evidence updates do not invalidate reviewed implementation commits.
- Out of scope: unrelated refactors not required for "Split mutable hosted metadata from tracked evidence".

## Verification

- State: ok
- Note:

```text
Verified: reviewed recovery closure for 7KQE04; implementation contract is already in main commit
77531d807 and targeted PR metadata suites passed in this worktree.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-22T20:28:15.540Z
- Branch: task/202605221727-7KQE04/hosted-metadata-split
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
No changes detected.
```

</details>
