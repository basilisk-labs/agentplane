# PR Review

Created: 2026-07-03T07:34:55.967Z

## Task

- Task: `202607030734-7S66KX`
- Title: Context graph: align SGR vocabulary and diagnostics
- Status: DOING
- Branch: `task/202607030734-7S66KX/context-graph-align-sgr-vocabulary-and-diagnosti`
- Canonical task record: `.agentplane/tasks/202607030734-7S66KX/README.md`

## Verification

- State: ok
- Note: Command: bunx vitest run packages/agentplane/src/commands/context/extraction-apply.unit.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts; Result: pass; Evidence: 2 files, 18 tests passed. Command: bun run --filter=agentplane typecheck; Result: pass; Evidence: agentplane typecheck exited 0. Command: CLI smoke for advanced context help, system/tests graph validation, and invalid graph diagnostics; Result: pass; Evidence: cli smoke passed. Scope: context graph validation and advanced context help.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-03T07:34:55.967Z
- Branch: task/202607030734-7S66KX/context-graph-align-sgr-vocabulary-and-diagnosti
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/tasks/202607030734-6T937A/README.md    | 182 +++++++
 .../blueprint/resolved-snapshot.json               | 572 +++++++++++++++++++++
 .../evaluator-opinion.md                           |  18 +
 .../evaluator-prompt.md                            |  74 +++
 .../quality-report.json                            |  20 +
 .../src/cli/run-cli.core.help-contract.test.ts     |  38 ++
 packages/agentplane/src/cli/run-cli.ts             |   7 +-
 .../commands/context/extraction-apply.unit.test.ts | 103 ++++
 packages/agentplane/src/commands/context/graph.ts  |   7 +-
 9 files changed, 1019 insertions(+), 2 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
