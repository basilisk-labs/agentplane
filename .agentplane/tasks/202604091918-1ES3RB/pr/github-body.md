## Summary

Allow branch_pr integrate to commit tracked task state on base

Base-side integrate currently hard-codes AGENTPLANE_ALLOW_TASKS=0 even though integrate updates tracked task state, so protected-path hooks reject the integrate commit and block closing live branch_pr tasks.

## Scope

- In scope: Base-side integrate currently hard-codes AGENTPLANE_ALLOW_TASKS=0 even though integrate updates tracked task state, so protected-path hooks reject the integrate commit and block closing live branch_pr tasks.
- Out of scope: unrelated refactors not required for "Allow branch_pr integrate to commit tracked task state on base".

## Verification

### Plan

<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->

1. <Action>. Expected: <observable result>.
2. <Action>. Expected: <observable result>.
3. <Action>. Expected: <observable result>.

### Current Status

- State: ok
- Note: Verified that integrate merge paths now allow tracked task-state writes on the base commit path, with targeted merge regressions plus eslint and prettier.

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

- Updated: 2026-04-09T19:21:13.201Z
- Branch: task/202604091918-1ES3RB/integrate-task-state-allow
- Head: 1217966a2f8a

```text
No changes detected.
```

</details>
