# PR Review

Created: 2026-04-06T19:52:25.011Z
Branch: task/202604061916-40FZNK/stale-open-pr-doctor

## Summary

Detect stale open PR drift for DONE tasks

Surface DONE tasks whose GitHub PRs remain open and diverged so operators can reconcile stale remote task branches before they linger for weeks.

## Scope

- In scope: Surface DONE tasks whose GitHub PRs remain open and diverged so operators can reconcile stale remote task branches before they linger for weeks.
- Out of scope: unrelated refactors not required for "Detect stale open PR drift for DONE tasks".

## Verification

### Plan

<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->

1. <Action>. Expected: <observable result>.
2. <Action>. Expected: <observable result>.
3. <Action>. Expected: <observable result>.

### Current Status

- State: ok
- Note: Doctor regression test passed for DONE branch_pr tasks with open PR artifacts; eslint passed; detection no longer depends on a surviving local task branch.

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

- Updated: 2026-04-06T19:54:49.122Z
- Branch: task/202604061916-40FZNK/stale-open-pr-doctor
- Head: 155d32912d07

```text
No changes detected.
```

</details>
<!-- END AUTO SUMMARY -->
