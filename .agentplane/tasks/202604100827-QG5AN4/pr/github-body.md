## Summary

Clean merged stale repo-local task branches and worktrees

Remove finished repo-local task worktrees and local branches that are already merged into main, while preserving the active task branch/worktree and leaving detached ~/.codex worktrees out of scope.

## Scope

- In scope: Remove finished repo-local task worktrees and local branches that are already merged into main, while preserving the active task branch/worktree and leaving detached ~/.codex worktrees out of scope.
- Out of scope: unrelated refactors not required for "Clean merged stale repo-local task branches and worktrees".

## Verification

### Plan

1. Run git -C /Users/densmirnov/Github/agentplane worktree list --porcelain. Expected: only main, task/202604100318-2Z6N94/harden-task-lifecycle-status, task/202604100827-QG5AN4/cleanup-stale-worktrees, and detached ~/.codex worktrees remain.
2. Run git -C /Users/densmirnov/Github/agentplane branch --format=%(refname:short). Expected: only main, task/202604100318-2Z6N94/harden-task-lifecycle-status, and task/202604100827-QG5AN4/cleanup-stale-worktrees remain.
3. Run git -C /Users/densmirnov/Github/agentplane status --short --untracked-files=no. Expected: no output.

### Current Status

- State: ok
- Note: Removed 9 DONE repo-local worktrees, deleted their 9 local task branches, and dropped merged task-close/202604092006-BGDQEG/root-close while preserving active worktrees and detached ~/.codex checkouts.

## Risks

- Risk level: not recorded
- Breaking change: no

### Rollback

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-10T08:34:06.859Z
- Branch: task/202604100827-QG5AN4/cleanup-stale-worktrees
- Head: 3fe2b1a83753

```text
No changes detected.
```

</details>
