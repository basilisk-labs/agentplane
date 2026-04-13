## Summary

Reconcile local integrate PR artifacts to MERGED on base

Eliminate remaining branch_pr release friction where local integrate leaves DONE tasks with OPEN or unmerged pr/meta state, causing doctor warnings and manual reconciliation before the next release.

## Scope

- In scope: Eliminate remaining branch_pr release friction where local integrate leaves DONE tasks with OPEN or unmerged pr/meta state, causing doctor warnings and manual reconciliation before the next release.
- Out of scope: unrelated refactors not required for "Reconcile local integrate PR artifacts to MERGED on base".

## Verification

- State: ok
- Note: Focused integrate/normalize/doctor regressions passed after reconciling local MERGED PR artifact flow.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-13T10:59:22.562Z
- Branch: task/202604131045-RRD2AC/local-pr-meta-reconcile
- Head: ae4734bcb82e

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
