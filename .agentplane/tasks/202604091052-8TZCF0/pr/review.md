# PR Review

Created: 2026-04-09T11:00:58.802Z
Branch: task/202604091052-8TZCF0/task-readme-seeding

## Summary

Fix task lifecycle README seeding and base artifact preservation

Make task creation/work-start preserve canonical base README artifacts and refuse to leave empty .agentplane/tasks/<id> directories without README.md in branch_pr flows.

## Scope

- In scope: Make task creation/work-start preserve canonical base README artifacts and refuse to leave empty .agentplane/tasks/<id> directories without README.md in branch_pr flows.
- Out of scope: unrelated refactors not required for "Fix task lifecycle README seeding and base artifact preservation".

## Verification

### Plan

1. Reproduce task creation plus `work start --worktree` on a fresh task in the focused regression harness. Expected: the base checkout keeps a readable `.agentplane/tasks/<id>/README.md` and no empty task directory is left behind.
2. Run the focused lifecycle test slice that covers task creation/work-start artifact handling. Expected: the new atomic README-seeding path passes and strict task scans remain clean.
3. Run lint on touched lifecycle files. Expected: no lint regressions in the modified task/worktree command path.

### Current Status

- State: ok
- Note: README seeding now preserves the canonical base README and leaves the worktree snapshot intact.

## Risks

- Risk level: not recorded
- Breaking change: no

### Rollback

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-09T11:04:49.814Z
- Branch: task/202604091052-8TZCF0/task-readme-seeding
- Head: 555ae389b771

```text
No changes detected.
```

</details>
<!-- END AUTO SUMMARY -->
