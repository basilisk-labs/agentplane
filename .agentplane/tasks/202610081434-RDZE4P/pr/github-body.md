Task: `202610081434-RDZE4P`
Title: Resolve open consumer lifecycle defects 6054 and 6067-6079 before 0.7.13
Canonical task record: `.agentplane/tasks/202610081434-RDZE4P/README.md`

## Summary

Resolve open consumer lifecycle defects 6054 and 6067-6079 before 0.7.13

User requests checking current GitHub issues and fixing all defects before release 0.7.13. Reproduce and repair issues 6054 and 6067 through 6079 against current HEAD. Cover task intake scope and tests, final validation rework, dirty base versus clean worktree authority, shared canonical task read and projection consistency, uncertain write diagnostics, unrelated task scan isolation, canonical comments and duplicate/no-op closure, relocated hook runner, transport ownership diagnostics, Unicode duplicate matching, catalog help resolution, typed authority errors, mixed legacy canonical task selection, and canonical scaffold identity protection. Preserve all authority checks and user data. Add focused regression tests and complete native validation and independent review. Assess proposal 6050 separately without adding an unsolicited third-party integration. Keep package versions unchanged and do not publish the release. Preserve concurrent M05 work and existing task history.

## Scope

- In scope: User requests checking current GitHub issues and fixing all defects before release 0.7.13. Reproduce and repair issues 6054 and 6067 through 6079 against current HEAD. Cover task intake scope and tests, final validation rework, dirty base versus clean worktree authority, shared canonical task read and projection consistency, uncertain write diagnostics, unrelated task scan isolation, canonical comments and duplicate/no-op closure, relocated hook runner, transport ownership diagnostics, Unicode duplicate matching, catalog help resolution, typed authority errors, mixed legacy canonical task selection, and canonical scaffold identity protection. Preserve all authority checks and user data. Add focused regression tests and complete native validation and independent review. Assess proposal 6050 separately without adding an unsolicited third-party integration. Keep package versions unchanged and do not publish the release. Preserve concurrent M05 work and existing task history.
- Out of scope: unrelated refactors not required for "Resolve open consumer lifecycle defects 6054 and 6067-6079 before 0.7.13".

## Verification

- State: ok
- Note: Canonical validation sha256:f678b7484e5a03eadbc520d3d32f83f193d86c1f243346711dc110ee5bf8389b
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-08T15:45:59.205Z
- Branch: task/202610081434-RDZE4P/resolve-open-consumer-lifecycle-defects-6054-and
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/user/task-lifecycle.mdx                       |  92 +++++
 .../task-backend/kernel-authority-schema.ts        |   1 +
 .../task-backend/kernel-backend-adapter.test.ts    |  58 +++
 .../task-backend/kernel-backend-adapter.ts         |  88 ++++-
 .../src/adapters/task-backend/kernel-projector.ts  |   4 +
 .../src/adapters/task-backend/kernel-record.ts     |  22 ++
 packages/agentplane/src/cli/error-map.ts           |   3 +-
 .../src/cli/help.all-commands.contract.test.ts     |  16 +-
 .../src/cli/run-cli.core.help-contract.test.ts     |  10 +-
 packages/agentplane/src/cli/spec/help.ts           |  15 +-
 .../commands/branch/work-start.hook-shim.test.ts   | 120 ++++++-
 .../commands/branch/work-start.materialize.test.ts |  23 ++
 .../src/commands/branch/work-start.materialize.ts  |  22 +-
 .../guard/impl/commands.commit-close.unit.test.ts  |   1 +
 .../impl/commands.commit-non-close.unit.test.ts    |   1 +
 .../src/commands/guard/impl/commit-close.ts        |   6 +-
 .../agentplane/src/commands/guard/impl/commit.ts   |   5 +-
 .../commands/shared/canonical-task-owner.test.ts   | 256 +++++++++++++
 .../src/commands/shared/hook-shim-template.ts      |  66 +++-
 .../shared/reconcile-canonical-scope.test.ts       |  82 +++++
 .../src/commands/shared/reconcile-check.ts         |  31 ++
 .../shared/task-backend-branch-snapshot.ts         |  29 +-
 .../src/commands/shared/task-backend.test.ts       |  31 +-
 .../agentplane/src/commands/shared/task-backend.ts |  76 +++-
 .../src/commands/shared/task-mutation.ts           |  12 +-
 .../agentplane/src/commands/task/active.command.ts |  61 ++--
 .../src/commands/task/active.command.unit.test.ts  | 121 ++++---
 .../src/commands/task/advance-task-step.ts         |   1 +
 .../src/commands/task/close-duplicate.command.ts   |  24 ++
 .../src/commands/task/close-duplicate.ts           |  15 +
 .../src/commands/task/close-noop.command.ts        |  15 +
 .../agentplane/src/commands/task/close-noop.ts     |  13 +
 packages/agentplane/src/commands/task/comment.ts   |  31 +-
 .../src/commands/task/comment.unit.test.ts         |   3 +
 .../src/commands/task/kernel-bookkeeping.test.ts   | 126 +++++++
 .../src/commands/task/kernel-bookkeeping.ts        | 159 ++++++++
 .../src/commands/task/kernel-exchange.test.ts      |  31 +-
 .../src/commands/task/kernel-exchange.ts           |  36 +-
 .../commands/task/kernel-final-validation.test.ts  |  90 ++++-
 .../src/commands/task/kernel-final-validation.ts   | 118 +++++-
 .../src/commands/task/kernel-inspection.test.ts    | 123 +++++++
 .../src/commands/task/kernel-inspection.ts         |   1 +
 .../src/commands/task/kernel-plan-authority.ts     |  11 +-
 .../src/commands/task/kernel-plan-proposal.ts      |  12 +-
 .../task/kernel-repository-coordinator.test.ts     | 275 ++++++++++----
 .../commands/task/kernel-repository-coordinator.ts |  46 ++-
 .../src/commands/task/kernel-runtime-context.ts    |  45 ++-
 .../task/kernel-runtime-diagnostics.test.ts        |  65 ++++
 .../src/commands/task/kernel-scoped-intake.test.ts | 399 +++++++++++++++++++++
 .../task/kernel-worktree-preparation.test.ts       | 185 ++++++++++
 .../commands/task/kernel-worktree-preparation.ts   | 282 +++++++++++++++
 .../src/commands/task/kernel-worktree-routing.ts   |  29 ++
 .../src/commands/task/new-duplicates.test.ts       |  49 +++
 .../agentplane/src/commands/task/new-duplicates.ts |  28 +-
 packages/agentplane/src/commands/task/scaffold.ts  |  22 ++
 .../src/runner/usecases/kernel-authority.ts        |  46 ++-
 .../runner/usecases/kernel-task-lifecycle.test.ts  |  25 +-
 .../src/tasks/task-kernel/authority-lineage.ts     |   8 +
 .../core/src/tasks/task-kernel/bookkeeping.test.ts | 115 ++++++
 .../src/tasks/task-kernel/final-recovery.test.ts   | 136 +++++++
 packages/core/src/tasks/task-kernel/kernel.ts      |  88 ++++-
 packages/core/src/tasks/task-kernel/model.ts       |  33 +-
 62 files changed, 3625 insertions(+), 312 deletions(-)
```

</details>
