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

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-08T15:45:59.205Z
- Branch: task/202610081434-RDZE4P/resolve-open-consumer-lifecycle-defects-6054-and
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/help.all-commands.contract.test.ts     |  16 +-
 .../src/cli/run-cli.core.help-contract.test.ts     |  10 +-
 packages/agentplane/src/cli/spec/help.ts           |  15 +-
 .../agentplane/src/commands/task/active.command.ts |  61 ++----
 .../src/commands/task/active.command.unit.test.ts  | 120 ++++++----
 .../src/commands/task/kernel-exchange.test.ts      |  31 ++-
 .../src/commands/task/kernel-exchange.ts           |  36 ++-
 .../task/kernel-repository-coordinator.test.ts     | 241 +++++++++++++++------
 .../commands/task/kernel-repository-coordinator.ts |  44 +++-
 .../src/commands/task/new-duplicates.test.ts       |  49 +++++
 .../agentplane/src/commands/task/new-duplicates.ts |  28 +--
 11 files changed, 453 insertions(+), 198 deletions(-)
```

</details>
