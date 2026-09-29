# PR Review

Created: 2026-09-29T19:37:33.025Z

## Task

- Task: `202609291221-3DMW1P`
- Title: Fix issue 6020: task new must admit bounded source and test plans
- Status: DOING
- Branch: `task/202609291221-3DMW1P/fix-issue-6020-task-new-must-admit-bounded-sourc`
- Canonical task record: `.agentplane/tasks/202609291221-3DMW1P/README.md`

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-29T19:37:33.025Z
- Branch: task/202609291221-3DMW1P/fix-issue-6020-task-new-must-admit-bounded-sourc
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../agentplane/src/commands/task/create.command.ts | 128 +----------------
 .../src/commands/task/execution-contract-intake.ts |  93 ++++++++++++
 .../commands/task/execution-contract-options.ts    |  59 ++++++++
 .../commands/task/new-execution-contract.test.ts   | 159 +++++++++++++++++++++
 packages/agentplane/src/commands/task/new.spec.ts  |   7 +
 packages/agentplane/src/commands/task/new.ts       |  49 +++----
 6 files changed, 349 insertions(+), 146 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
