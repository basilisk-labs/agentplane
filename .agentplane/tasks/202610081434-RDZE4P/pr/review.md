# PR Review

Created: 2026-10-08T15:45:59.205Z

## Task

- Task: `202610081434-RDZE4P`
- Title: Resolve open consumer lifecycle defects 6054 and 6067-6079 before 0.7.13
- Status: DOING
- Branch: `task/202610081434-RDZE4P/resolve-open-consumer-lifecycle-defects-6054-and`
- Canonical task record: `.agentplane/tasks/202610081434-RDZE4P/README.md`

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
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
<!-- END AUTO SUMMARY -->
