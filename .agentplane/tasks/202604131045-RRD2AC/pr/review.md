# PR Review

Created: 2026-04-13T10:46:31.996Z
Branch: task/202604131045-RRD2AC/local-pr-meta-reconcile

## Summary

Reconcile local integrate PR artifacts to MERGED on base

Eliminate remaining branch_pr release friction where local integrate leaves DONE tasks with OPEN or unmerged pr/meta state, causing doctor warnings and manual reconciliation before the next release.

## Scope

- In scope: Eliminate remaining branch_pr release friction where local integrate leaves DONE tasks with OPEN or unmerged pr/meta state, causing doctor warnings and manual reconciliation before the next release.
- Out of scope: unrelated refactors not required for "Reconcile local integrate PR artifacts to MERGED on base".

## Verification

### Plan

1. Review the requested outcome for "Reconcile local integrate PR artifacts to MERGED on base". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

### Current Status

- State: ok
- Note: Focused integrate/normalize/doctor regressions passed after reconciling local MERGED PR artifact flow.

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

- Updated: 2026-04-13T11:03:06.116Z
- Branch: task/202604131045-RRD2AC/local-pr-meta-reconcile
- Head: 8d1247bbda3e

```text
 .agentplane/tasks/202604131045-RRD2AC/README.md    | 124 ++++++++++++++++++
 .../run-cli.core.tasks.normalize-migrate.test.ts   | 139 +++++++++++++++++++++
 .../agentplane/src/commands/doctor.command.test.ts |   4 +-
 .../agentplane/src/commands/doctor/branch-pr.ts    |   4 +-
 .../agentplane/src/commands/guard/impl/commands.ts |  19 +--
 .../src/commands/guard/impl/commands.unit.test.ts  |  49 ++++++++
 .../pr/integrate/internal/finalize.test.ts         |   1 +
 .../src/commands/pr/integrate/internal/finalize.ts |   3 +
 .../agentplane/src/commands/task/finish-shared.ts  |   2 +
 .../src/commands/task/hosted-merge-sync.ts         |  58 +++++++--
 10 files changed, 381 insertions(+), 22 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
