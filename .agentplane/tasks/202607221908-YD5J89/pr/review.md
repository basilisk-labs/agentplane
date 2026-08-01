# PR Review

Created: 2026-08-01T00:38:26.423Z

## Task

- Task: `202607221908-YD5J89`
- Title: Migrate context and evaluator command boundaries
- Status: DOING
- Branch: `task/202607221908-YD5J89/migrate-context-and-evaluator-command-boundaries`
- Canonical task record: `.agentplane/tasks/202607221908-YD5J89/README.md`

## Verification

- State: ok
- Note: Verified hosted static cleanup at implementation 29d67bf21644: reproduced failure was limited to four unused exported types; bun run knip:check now passes the 545/545 baseline, TypeScript 7 typecheck and targeted ESLint pass, and the five focused catalog/kernel/registry/evaluator suites still pass 52 tests.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-01T01:33:10.068Z
- Branch: task/202607221908-YD5J89/migrate-context-and-evaluator-command-boundaries
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 packages/agentplane/src/cli/run-cli.ts             |  13 +
 .../src/cli/run-cli/command-catalog.test.ts        |  89 ++++
 .../cli/run-cli/command-catalog/command-session.ts |  28 +-
 .../context-evaluator-capability-profiles.ts       |  71 +++
 .../src/cli/run-cli/command-catalog/kernel.test.ts |  74 +++
 .../src/cli/run-cli/command-catalog/kernel.ts      |  65 +++
 .../src/cli/run-cli/command-catalog/project.ts     | 285 +++++++++--
 .../src/cli/run-cli/command-loaders/project.ts     | 215 +++++++-
 .../src/cli/run-cli/registry.run.test.ts           | 169 +++++++
 .../agentplane/src/cli/run-cli/registry.run.ts     |  30 +-
 .../commands/context/context-results.unit.test.ts  | 175 +++++++
 .../src/commands/context/context-runner.ts         | 344 ++++++++-----
 .../agentplane/src/commands/context/finalize.ts    |   5 +-
 packages/agentplane/src/commands/context/graph.ts  | 129 +++--
 packages/agentplane/src/commands/context/search.ts | 141 ++++--
 packages/agentplane/src/commands/context/show.ts   |  35 +-
 .../src/commands/context/wiki-reports.ts           |  28 +-
 packages/agentplane/src/commands/context/wiki.ts   |  94 +++-
 .../commands/evaluator/evaluator-artifact-port.ts  |  67 +++
 .../evaluator/evaluator-catalog.command.ts         | 122 +++++
 .../evaluator/evaluator-execute-supervisor.ts      |  11 +-
 .../evaluator/evaluator-run.command.test.ts        |  82 ++-
 .../src/commands/evaluator/evaluator.command.ts    | 561 ++++++++++++---------
 .../task/direct-task-supervisor-evaluator.ts       |   2 +
 packages/agentplane/src/context/doctor.ts          |  60 ++-
 packages/agentplane/src/context/ingest.ts          | 121 +++--
 packages/agentplane/src/context/reindex.ts         | 101 ++--
 scripts/README.md                                  |  40 +-
 28 files changed, 2477 insertions(+), 680 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
