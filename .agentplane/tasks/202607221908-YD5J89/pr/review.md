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
- Note: Verified explicit evaluator artifact-write authority at implementation e21e0b573595: focused catalog/kernel/evaluator/registry suite passed 41 tests; real no-record dispatch created an evidence packet without changing task README or resolving task.write; TypeScript 7 typecheck, targeted lint, guards, architecture, hotspots, and all 12 critical CLI chunks passed.
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
 .../src/cli/run-cli/command-catalog.test.ts        |  82 ++++
 .../cli/run-cli/command-catalog/command-session.ts |   2 +
 .../context-evaluator-capability-profiles.ts       |  71 ++++
 .../src/cli/run-cli/command-catalog/kernel.test.ts |  63 +++
 .../src/cli/run-cli/command-catalog/kernel.ts      |  64 +++
 .../src/cli/run-cli/command-catalog/project.ts     | 285 +++++++++++--
 .../src/cli/run-cli/command-loaders/project.ts     | 213 +++++++++-
 .../src/cli/run-cli/registry.run.test.ts           | 147 +++++++
 .../agentplane/src/cli/run-cli/registry.run.ts     |  21 +-
 .../commands/context/context-results.unit.test.ts  | 175 ++++++++
 .../src/commands/context/context-runner.ts         | 339 +++++++++------
 .../agentplane/src/commands/context/finalize.ts    |   5 +-
 packages/agentplane/src/commands/context/graph.ts  | 129 ++++--
 packages/agentplane/src/commands/context/search.ts | 141 +++---
 packages/agentplane/src/commands/context/show.ts   |  35 +-
 .../src/commands/context/wiki-reports.ts           |  28 +-
 packages/agentplane/src/commands/context/wiki.ts   |  94 ++--
 .../evaluator/evaluator-catalog.command.ts         | 122 ++++++
 .../evaluator/evaluator-run.command.test.ts        |  76 +++-
 .../src/commands/evaluator/evaluator.command.ts    | 472 +++++++++++----------
 packages/agentplane/src/context/doctor.ts          |  60 ++-
 packages/agentplane/src/context/ingest.ts          | 121 ++++--
 packages/agentplane/src/context/reindex.ts         | 101 +++--
 scripts/README.md                                  |  40 +-
 24 files changed, 2234 insertions(+), 652 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
