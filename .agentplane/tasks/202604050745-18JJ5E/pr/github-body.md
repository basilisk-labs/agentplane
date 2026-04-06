## Summary

Fix branch_pr shipped-task reconciliation and diagnostics

Detect branch_pr tasks whose work is already shipped on the base branch but whose local task lifecycle was never closed, and make doctor/normalization surface or reconcile that state deterministically.

## Scope

- In scope: Detect branch_pr tasks whose work is already shipped on the base branch but whose local task lifecycle was never closed, and make doctor/normalization surface or reconcile that state deterministically.
- Out of scope: unrelated refactors not required for "Fix branch_pr shipped-task reconciliation and diagnostics".

## Verification

### Plan

1. Reproduce a branch_pr task whose implementation commit is already reachable from the base branch while the task still remains DOING locally. Expected: doctor and/or task normalization report the stale shipped-task state instead of leaving it silent. 2. Run the new reconciliation path on that fixture. Expected: the task is deterministically moved to the correct DONE/commit state without inventing a merge that never happened. 3. Run the targeted workflow tests and package build. Expected: shipped-task reconciliation passes regressions and the touched workflow code still builds cleanly.

### Current Status

- State: ok
- Note: Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.normalize-migrate.test.ts packages/agentplane/src/commands/doctor.command.test.ts packages/agentplane/src/commands/task/hosted-merge-sync.test.ts --reporter=verbose && bunx eslint packages/agentplane/src/cli/run-cli.core.tasks.normalize-migrate.test.ts packages/agentplane/src/commands/doctor.command.test.ts packages/agentplane/src/commands/doctor.run.ts packages/agentplane/src/commands/doctor/branch-pr.ts packages/agentplane/src/commands/task/hosted-merge-sync.ts packages/agentplane/src/commands/task/normalize.command.ts packages/agentplane/src/commands/task/normalize.ts. Result: pass. Evidence: 36 targeted tests passed; doctor reports shipped open branch_pr tasks; normalize sync-path regressions passed; targeted eslint on touched workflow files passed; verification recorded after refreshing PR artifacts so last_verified_sha now matches the current task head.

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

- Updated: 2026-04-06T17:00:57.936Z
- Branch: task/202604050745-18JJ5E/shipped-task-reconcile
- Head: c95c2dc3ea8f

```text
 .agentplane/tasks/202604050745-18JJ5E/README.md    | 113 ++++++++++++++
 .../run-cli.core.tasks.normalize-migrate.test.ts   | 114 ++++++++++++++
 .../agentplane/src/commands/doctor.command.test.ts | 150 +++++++++++++++++++
 packages/agentplane/src/commands/doctor.run.ts     |   2 +
 .../agentplane/src/commands/doctor/branch-pr.ts    |  45 ++++++
 .../src/commands/task/hosted-merge-sync.ts         | 166 ++++++++++++++++++++-
 .../src/commands/task/normalize.command.ts         |  14 ++
 packages/agentplane/src/commands/task/normalize.ts |  21 ++-
 8 files changed, 621 insertions(+), 4 deletions(-)
```

</details>
