# PR Review

Created: 2026-04-09T22:37:33.545Z
Branch: task/202604092232-YJ4245/finish-close-dirty-fix

## Summary

Let branch_pr finish close committed task artifacts without self-dirty failure

Fix finish --close-commit so branch_pr closeout can commit the task README and task PR artifacts that finish itself just updated, instead of failing on a self-generated dirty working tree.

## Scope

- In scope: Fix finish --close-commit so branch_pr closeout can commit the task README and task PR artifacts that finish itself just updated, instead of failing on a self-generated dirty working tree.
- Out of scope: unrelated refactors not required for "Let branch_pr finish close committed task artifacts without self-dirty failure".

## Verification

### Plan

1. In a branch_pr base checkout, run finish --close-commit for a verified task whose finish path updates the task README and PR artifacts. Expected: finish completes and creates the deterministic close commit instead of failing with Working tree is dirty.
2. Confirm the close commit stages the task README plus task PR artifacts needed for branch_pr closure. Expected: close commit records only task-scoped artifacts and leaves no unintended tracked changes.
3. Re-run closeout for 9CPEMF, RM6TDD, and C3ZHCX. Expected: all three tasks can be finished canonically after integrate without manual git restore workarounds.

### Current Status

- State: ok
- Note: Invalidated memoized git status after branch_pr PR artifact refresh so deterministic close commits see fresh task artifact changes; verified targeted guard/finish unit tests and eslint.

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

- Updated: 2026-04-09T22:38:59.152Z
- Branch: task/202604092232-YJ4245/finish-close-dirty-fix
- Head: 0f7ebe698302

```text
No changes detected.
```

</details>
<!-- END AUTO SUMMARY -->
