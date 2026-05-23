# PR Review

Created: 2026-05-23T01:10:07.020Z

## Task

- Task: `202605221744-GF25D1`
- Title: Add agent task brief command
- Status: DOING
- Branch: `task/202605221744-GF25D1/agent-task-brief`
- Canonical task record: `.agentplane/tasks/202605221744-GF25D1/README.md`

## Verification

- State: ok
- Note: Evaluator check: task brief satisfies approved local-first agent context scope. Evidence covers text and JSON output, no default gh lookup regression, generated CLI docs, typecheck, lint, format, and runtime bootstrap.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-23T01:10:07.020Z
- Branch: task/202605221744-GF25D1/agent-task-brief
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/user/cli-reference.generated.mdx              |  36 ++++
 .../src/cli/run-cli.core.route-decision.test.ts    |  96 ++++++++-
 .../src/cli/run-cli/command-catalog/task.ts        |   3 +
 .../src/cli/run-cli/command-loaders/task.ts        |   4 +
 .../src/commands/shared/route-decision.ts          |   3 +-
 .../agentplane/src/commands/task/brief.command.ts  | 224 +++++++++++++++++++++
 .../agentplane/src/commands/task/task.command.ts   |   4 +
 7 files changed, 368 insertions(+), 2 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
