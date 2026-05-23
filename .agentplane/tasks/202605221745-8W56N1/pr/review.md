# PR Review

Created: 2026-05-23T02:56:36.034Z

## Task

- Task: `202605221745-8W56N1`
- Title: Add source confidence labels to agent route output
- Status: DOING
- Branch: `task/202605221745-8W56N1/source-confidence-labels`
- Canonical task record: `.agentplane/tasks/202605221745-8W56N1/README.md`

## Verification

- State: ok
- Note: Evaluator pass: JSON route outputs expose source_confidence for route, next_action, blockers, and remote; default status/next-action commands are local-only; explicit --remote path is covered by tests and smoke.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-23T02:56:36.034Z
- Branch: task/202605221745-8W56N1/source-confidence-labels
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/user/cli-reference.generated.mdx              |  2 +
 .../src/cli/run-cli.core.route-decision.test.ts    | 87 +++++++++++++++++++++-
 .../src/commands/shared/route-decision.ts          | 87 +++++++++++++++++++++-
 .../src/commands/task/next-action.command.ts       | 15 ++++
 .../agentplane/src/commands/task/status.command.ts | 16 +++-
 5 files changed, 201 insertions(+), 6 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
