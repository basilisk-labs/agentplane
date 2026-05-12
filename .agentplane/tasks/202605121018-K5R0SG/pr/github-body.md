Task: `202605121018-K5R0SG`
Title: Restore scoped init behavior with parent git detection
Canonical task record: `.agentplane/tasks/202605121018-K5R0SG/README.md`

## Summary

Restore scoped init behavior with parent git detection

Keep parent Git detection visible in init planning without blocking the existing contract that init --yes in a child directory initializes that child as the target repository.

## Scope

- In scope: Keep parent Git detection visible in init planning without blocking the existing contract that init --yes in a child directory initializes that child as the target repository.
- Out of scope: unrelated refactors not required for "Restore scoped init behavior with parent git detection".

## Verification

- State: ok
- Note: Verified scoped init behavior after removing the hard nested-root blocker: init dry-run reports parentGitRoot without writing nested state, and critical scope-leak/symlink tests pass.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-12T10:19:18.201Z
- Branch: task/202605121018-K5R0SG/restore-init-scope
- Head: 52c041350896

```text
No changes detected.
```

</details>
