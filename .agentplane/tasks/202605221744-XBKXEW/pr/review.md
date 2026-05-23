# PR Review

Created: 2026-05-23T02:15:04.510Z

## Task

- Task: `202605221744-XBKXEW`
- Title: Add active work selector for agents
- Status: DOING
- Branch: `task/202605221744-XBKXEW/active-work-selector`
- Canonical task record: `.agentplane/tasks/202605221744-XBKXEW/README.md`

## Verification

- State: ok
- Note: Evaluator pass: active selector output includes ranked active TODO/DOING backlog only, dependency readiness, next actions, blocker counts, owner/priority, and live_local freshness; focused and full query-listing tests, typecheck, lint, format, docs check, knip baseline, task-scope check, bootstrap, smoke, and benchmark evidence passed.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-23T02:15:04.510Z
- Branch: task/202605221744-XBKXEW/active-work-selector
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/user/cli-reference.generated.mdx              |  41 +++
 .../cli/run-cli.core.tasks.query-listing.test.ts   |  94 ++++++
 .../src/cli/run-cli/command-catalog/task.ts        |   3 +
 .../src/cli/run-cli/command-loaders/task.ts        |   4 +
 .../agentplane/src/commands/task/active.command.ts | 336 +++++++++++++++++++++
 5 files changed, 478 insertions(+)
```

</details>
<!-- END AUTO SUMMARY -->
