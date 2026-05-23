Task: `202605221744-XBKXEW`
Title: Add active work selector for agents
Canonical task record: `.agentplane/tasks/202605221744-XBKXEW/README.md`

## Summary

Add active work selector for agents

Add an agent-oriented active work selector that ranks TODO, DOING, BLOCKED, and anomaly tasks by actionable next step, ownership, dependency readiness, and route blockers instead of forcing agents to scan the full backlog.

## Scope

- In scope: Add an agent-oriented active work selector that ranks TODO, DOING, BLOCKED, and anomaly tasks by actionable next step, ownership, dependency readiness, and route blockers instead of forcing agents to scan the full backlog.
- Out of scope: unrelated refactors not required for "Add active work selector for agents".

## Verification

- State: ok
- Note:

```text
Evaluator pass: active selector output includes ranked active TODO/DOING backlog only, dependency
readiness, next actions, blocker counts, owner/priority, and live_local freshness; focused and full
query-listing tests, typecheck, lint, format, docs check, knip baseline, task-scope check,
bootstrap, smoke, and benchmark evidence passed.
```
- Canonical workflow state lives in the task README.

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
