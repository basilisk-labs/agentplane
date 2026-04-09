## Summary

Allow cleanup merged to delete remote task branches

Extend cleanup merged with an opt-in remote-branch deletion mode for merged DONE task branches so operators do not need manual git push --delete cleanup.

## Scope

- In scope: Extend cleanup merged with an opt-in remote-branch deletion mode for merged DONE task branches so operators do not need manual git push --delete cleanup.
- Out of scope: unrelated refactors not required for "Allow cleanup merged to delete remote task branches".

## Verification

### Plan

<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->

1. <Action>. Expected: <observable result>.
2. <Action>. Expected: <observable result>.
3. <Action>. Expected: <observable result>.

### Current Status

- State: ok
- Note: Refreshed CLI reference after adding cleanup merged remote delete mode; targeted cleanup merged parser and remote deletion tests remain green.

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

- Updated: 2026-04-09T22:22:23.980Z
- Branch: task/202604092201-RM6TDD/cleanup-remote-delete
- Head: 50ac0ec65b26

```text
No changes detected.
```

</details>
