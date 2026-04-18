# PR Review

Created: 2026-04-18T07:17:11.025Z
Branch: task/202604180617-8RSXN9/task-command-capabilities

## Summary

Migrate task command paths onto backend capability facade

Route task show and task mutation command helpers through capability-aware service helpers so command logic no longer special-cases the local backend directly.

## Scope

- In scope: Route task show and task mutation command helpers through capability-aware service helpers so command logic no longer special-cases the local backend directly.
- Out of scope: unrelated refactors not required for "Migrate task command paths onto backend capability facade".

## Verification

### Plan

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

### Current Status

- State: ok
- Note: branch_pr drift detection and hosted merge sync now route through backend capabilities with backward-safe fallback for older backend doubles; targeted tests, typecheck, and lint passed.

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

- Updated: 2026-04-18T07:45:43.084Z
- Branch: task/202604180617-8RSXN9/task-command-capabilities
- Head: ea3e28ca4af7

```text
 packages/agentplane/src/commands/doctor/branch-pr.ts | 10 +++++++---
 .../src/commands/shared/reconcile-check.ts           |  3 ++-
 .../agentplane/src/commands/shared/task-backend.ts   | 20 +++++++++++++++++++-
 .../src/commands/task/hosted-merge-sync.ts           |  9 +++++----
 4 files changed, 33 insertions(+), 9 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
