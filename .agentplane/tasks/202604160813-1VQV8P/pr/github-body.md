## Summary

Clean stale merged local task branches and worktrees

Remove only local task/task-close branches and task worktrees that are already merged into main and no longer needed, while preserving active or unmerged worktrees.

## Scope

- In scope: Remove only local task/task-close branches and task worktrees that are already merged into main and no longer needed, while preserving active or unmerged worktrees.
- Out of scope: unrelated refactors not required for "Clean stale merged local task branches and worktrees".

## Verification

- State: ok
- Note: Verified stale remote-tracking cleanup by comparing git remote prune origin --dry-run with the actual prune result; only stale origin/task refs were removed and active local task worktrees remained intact.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-16T08:14:04.305Z
- Branch: task/202604160813-1VQV8P/cleanup-stale-local-branches
- Head: 51d078d20b2a

```text
No changes detected.
```

</details>
