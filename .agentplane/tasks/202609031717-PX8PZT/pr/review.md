# PR Review

Created: 2026-09-03T17:26:07.913Z

## Task

- Task: `202609031717-PX8PZT`
- Title: Port the minimal missing Clean Core lifecycle boundary contracts from audited unfinished branches
- Status: DOING
- Branch: `task/202609031717-PX8PZT/port-the-minimal-missing-clean-core-lifecycle-bo`
- Canonical task record: `.agentplane/tasks/202609031717-PX8PZT/README.md`

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-03T17:26:07.913Z
- Branch: task/202609031717-PX8PZT/port-the-minimal-missing-clean-core-lifecycle-bo
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.task-handoff.test.ts      | 103 ++++++++++++-
 packages/agentplane/src/commands/pr/flow-status.ts |  12 +-
 .../commands/shared/task-handoff-reader.test.ts    | 163 +++++++++++++++++++++
 .../src/commands/shared/task-handoff-reader.ts     |  78 ++++++++++
 .../src/commands/task/handoff-show.command.ts      |  37 ++++-
 .../agentplane/src/commands/task/handoff.shared.ts |  27 ++--
 6 files changed, 390 insertions(+), 30 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
