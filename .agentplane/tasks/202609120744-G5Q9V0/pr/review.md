# PR Review

Created: 2026-09-12T07:48:41.870Z

## Task

- Task: `202609120744-G5Q9V0`
- Title: Fail fast on incomplete ops task intent
- Status: DOING
- Branch: `task/202609120744-G5Q9V0/fail-fast-on-incomplete-ops-task-intent`
- Canonical task record: `.agentplane/tasks/202609120744-G5Q9V0/README.md`

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-12T07:48:41.870Z
- Branch: task/202609120744-G5Q9V0/fail-fast-on-incomplete-ops-task-intent
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.route-decision.test.ts    |  4 ++
 .../src/cli/run-cli.core.tasks.create.test.ts      | 70 ++++++++++++++++++++++
 .../agentplane/src/commands/task/brief-model.ts    |  9 +++
 .../agentplane/src/commands/task/brief-render.ts   |  7 +++
 packages/agentplane/src/commands/task/new.spec.ts  |  5 ++
 packages/agentplane/src/commands/task/new.ts       | 44 ++++++++++++++
 6 files changed, 139 insertions(+)
```

</details>
<!-- END AUTO SUMMARY -->
