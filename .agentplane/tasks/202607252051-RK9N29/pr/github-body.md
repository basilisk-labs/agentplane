Task: `202607252051-RK9N29`
Title: Make branch_pr route resolution branch-snapshot aware
Canonical task record: `.agentplane/tasks/202607252051-RK9N29/README.md`

## Summary

Make branch_pr route resolution branch-snapshot aware

Correct branch_pr control-plane truth: routes, flow status, blockers, and resume must prefer the active task branch snapshot (live worktree, local branch, then origin) for task README and PR metadata, falling back to base only when no branch snapshot exists. Regress stale base TODO versus task-branch DONE/open PR so the CLI selects publication or integration, never a false plan approval. Keep typed route semantics unchanged.

## Scope

In scope: make branch_pr route, PR flow, blocker, and resume reads prefer a verified task-branch snapshot over stale base-local task artifacts; preserve base fallback; add a stale-base versus DONE-branch regression. Out of scope: changing workflow phases, TaskData schema, or provider semantics.

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-25T20:53:29.950Z
- Branch: task/202607252051-RK9N29/make-branch-pr-route-resolution-branch-snapshot
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
No changes detected.
```

</details>
