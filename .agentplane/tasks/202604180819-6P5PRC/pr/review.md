# PR Review

Created: 2026-04-18T08:19:48.153Z
Branch: task/202604180819-6P5PRC/branch-pr-close-tail-helper

## Summary

Materialize branch_pr close tails without dirtying base

Remove the manual branch_pr finish loop where finish marks a task DONE on base but still leaves tracked task artifact changes that must be hand-packaged into a follow-up task-close branch. Add a canonical helper so the close tail can be materialized deterministically without dirtying the base checkout.

## Scope

- In scope: Remove the manual branch_pr finish loop where finish marks a task DONE on base but still leaves tracked task artifact changes that must be hand-packaged into a follow-up task-close branch. Add a canonical helper so the close tail can be materialized deterministically without dirtying the base checkout.
- Out of scope: unrelated refactors not required for "Materialize branch_pr close tails without dirtying base".

## Verification

### Plan

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

### Current Status

- State: ok
- Note: branch_pr finish now materializes a local task-close branch before the deterministic close commit, returns the checkout to the base branch, and keeps hosted-close/cleanup flows intact; typecheck, finish.unit, targeted cleanup-merged, targeted hosted-close-pr, and focused lint passed.

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

- Updated: 2026-04-18T08:24:33.798Z
- Branch: task/202604180819-6P5PRC/branch-pr-close-tail-helper
- Head: a8ed7ef44066

```text
 packages/agentplane/src/commands/task/finish.ts    | 134 +++++++++++++++++++--
 .../src/commands/task/finish.unit.test.ts          |  45 ++++++-
 2 files changed, 164 insertions(+), 15 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
