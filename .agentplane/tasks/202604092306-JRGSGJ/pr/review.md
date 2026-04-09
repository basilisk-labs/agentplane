# PR Review

Created: 2026-04-09T23:21:28.810Z
Branch: task/202604092306-JRGSGJ/doctor-safe-cleanup

## Summary

Doctor --fix safe-removes legacy untracked task README collisions

Extend doctor --fix with a safe cleanup for legacy untracked .agentplane/tasks/<task-id>/README.md collisions that would be overwritten by tracked task artifacts from origin/main and block git pull or rebase.

## Scope

- In scope: Extend doctor --fix with a safe cleanup for legacy untracked .agentplane/tasks/<task-id>/README.md collisions that would be overwritten by tracked task artifacts from origin/main and block git pull or rebase.
- Out of scope: unrelated refactors not required for "Doctor --fix safe-removes legacy untracked task README collisions".

## Verification

### Plan

1. Create a repo state with an untracked .agentplane/tasks/<task-id>/README.md that would be overwritten by a tracked task README on origin/main, then run doctor. Expected: doctor reports the collision clearly.
2. Run agentplane doctor --fix on that state. Expected: the safe collision is removed and the next doctor run is clean.
3. Leave an unrelated untracked task artifact outside the safe-collision rule and rerun doctor --fix. Expected: doctor does not delete the unrelated file.

### Current Status

- State: ok
- Note: Verified: doctor --fix now removes only untracked DONE task README collisions; doctor fast/command tests and eslint passed.

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

- Updated: 2026-04-09T23:21:28.810Z
- Branch: task/202604092306-JRGSGJ/doctor-safe-cleanup
- Head: 9e0a2ff77553

```text
No changes detected.
```

</details>
<!-- END AUTO SUMMARY -->
