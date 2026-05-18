# PR Review

Created: 2026-05-18T12:05:54.253Z

## Task

- Task: `202605181205-TFMY22`
- Title: Fix feedback opt-in and direct finish recovery issues
- Status: DOING
- Branch: `task/202605181205-TFMY22/fix-feedback-finish-recovery`
- Canonical task record: `.agentplane/tasks/202605181205-TFMY22/README.md`

## Verification

- State: ok
- Note: Implemented one-shot feedback issue opt-in and direct close-commit preflight hardening. Checks passed: focused insights/error tests, finish validation Vitest, typecheck, docs:cli:check, format:changed, lint:core, task scope, policy routing.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-18T12:43:59.196Z
- Branch: task/202605181205-TFMY22/fix-feedback-finish-recovery
- Head: 4e7581a1312b

```text
 .../blueprint/resolved-snapshot.json               | 529 +++++++++++++++++++++
 docs/user/cli-reference.generated.mdx              |   7 +
 docs/user/configuration.mdx                        |   6 +
 packages/agentplane/src/cli/error-map.test.ts      |   1 +
 packages/agentplane/src/cli/error-map.ts           |  13 +-
 packages/agentplane/src/cli/reason-codes.ts        |   2 +-
 .../src/cli/run-cli.core.insights-report.test.ts   |  46 ++
 .../src/commands/insights/insights.command.ts      |   8 +-
 .../src/commands/insights/insights.spec.ts         |  13 +
 .../agentplane/src/commands/task/finish-execute.ts |  44 +-
 .../commands/task/finish.close-tail.unit.test.ts   |   1 +
 .../src/commands/task/finish.state.unit.test.ts    |  81 +++-
 .../commands/task/finish.validation.unit.test.ts   |   2 +-
 13 files changed, 744 insertions(+), 9 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
