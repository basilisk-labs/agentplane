# PR Review

Created: 2026-05-03T16:15:20.083Z
Branch: task/202605031524-10ZC1E/batch-drift-diagnostics

## Summary

Add branch_pr batch drift diagnostics and recovery

Extend doctor and normalize so merged primary PRs with included tasks cannot leave verified leaf tasks open silently, and provide scoped recovery commands with tests.

## Scope

- In scope: Extend doctor and normalize so merged primary PRs with included tasks cannot leave verified leaf tasks open silently, and provide scoped recovery commands with tests.
- Out of scope: unrelated refactors not required for "Add branch_pr batch drift diagnostics and recovery".

## Verification

### Plan

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

### Current Status

- State: ok
- Note: Batch drift diagnostics implemented and verified on current HEAD. Checks: focused doctor test, typecheck, format:check, check:types-files, git diff --check, policy routing.

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

- Updated: 2026-05-03T16:17:55.317Z
- Branch: task/202605031524-10ZC1E/batch-drift-diagnostics
- Head: 069369b5cfb4

```text
 .../src/commands/doctor.command.open-pr.test.ts    | 68 ++++++++++++++++++++-
 packages/agentplane/src/commands/doctor.run.ts     |  2 +
 .../agentplane/src/commands/doctor/branch-pr.ts    | 69 ++++++++++++++++++++++
 3 files changed, 138 insertions(+), 1 deletion(-)
```

</details>
<!-- END AUTO SUMMARY -->
