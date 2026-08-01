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
- Note: Focused 97/97, doctor/wiki 20/20, critical 12/12 chunks (77 tests), format, schemas, guards, TS7 typecheck, full lint, architecture, knip, and diff checks passed.
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
 .../src/cli/run-cli/command-catalog.test.ts        |  77 ++++
 .../context-evaluator-capability-profiles.ts       |  63 +++
 .../src/cli/run-cli/command-catalog/kernel.test.ts |  43 +++
 .../src/cli/run-cli/command-catalog/project.ts     | 270 ++++++++++---
 .../src/cli/run-cli/command-loaders/project.ts     | 198 +++++++++-
 .../commands/context/context-results.unit.test.ts  | 175 +++++++++
 .../src/commands/context/context-runner.ts         | 339 +++++++++-------
 .../agentplane/src/commands/context/finalize.ts    |   5 +-
 packages/agentplane/src/commands/context/graph.ts  | 129 +++++--
 packages/agentplane/src/commands/context/search.ts | 141 ++++---
 packages/agentplane/src/commands/context/show.ts   |  35 +-
 .../src/commands/context/wiki-reports.ts           |  28 +-
 packages/agentplane/src/commands/context/wiki.ts   |  94 +++--
 .../evaluator/evaluator-run.command.test.ts        |  79 +++-
 .../src/commands/evaluator/evaluator.command.ts    | 424 ++++++++++++++-------
 packages/agentplane/src/context/doctor.ts          |  60 ++-
 packages/agentplane/src/context/ingest.ts          | 121 ++++--
 packages/agentplane/src/context/reindex.ts         | 101 ++---
 18 files changed, 1831 insertions(+), 551 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
