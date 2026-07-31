Task: `202607311554-99FMGV`
Title: Allow fast-forward publication before conflict rework
Canonical task record: `.agentplane/tasks/202607311554-99FMGV/README.md`

## Summary

Allow fast-forward publication before conflict rework

When an OPEN protected-base PR reports conflicts but the local task branch is a clean descendant of the provider head, route the task through guarded PR head publication before preparing the conflict packet. Preserve fail-closed behavior for divergent or unrelated heads, unknown mergeability, dirty worktrees, and semantic conflict resolution.

## Scope

- In scope: When an OPEN protected-base PR reports conflicts but the local task branch is a clean descendant of the provider head, route the task through guarded PR head publication before preparing the conflict packet. Preserve fail-closed behavior for divergent or unrelated heads, unknown mergeability, dirty worktrees, and semantic conflict resolution.
- Out of scope: unrelated refactors not required for "Allow fast-forward publication before conflict rework".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-31T15:55:48.023Z
- Branch: task/202607311554-99FMGV/allow-fast-forward-publication-before-conflict-r
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
No changes detected.
```

</details>
