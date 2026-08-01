Task: `202607221908-YD5J89`
Title: Migrate context and evaluator command boundaries
Canonical task record: `.agentplane/tasks/202607221908-YD5J89/README.md`

## Summary

Migrate context and evaluator command boundaries

RF-24/RF-25 vertical slice: give context/evaluator operations granular knowledge/backend/Git/policy capabilities and typed in-process results/renderers.

## Scope

- In scope: context search/show/ingest/reindex/wiki/graph/doctor and evaluator prepare/apply/run compatibility commands, typed use cases, granular capabilities, output renderers, and elimination of subprocess/stdout orchestration in this family.
- Out of scope: runner/Hermes, general task lifecycle, or provider/release commands.

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-01T00:38:26.423Z
- Branch: task/202607221908-YD5J89/migrate-context-and-evaluator-command-boundaries
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli/command-catalog.test.ts        |  70 ++++
 .../context-evaluator-capability-profiles.ts       |  56 +++
 .../src/cli/run-cli/command-catalog/kernel.test.ts |  31 ++
 .../src/cli/run-cli/command-catalog/project.ts     | 269 ++++++++++---
 .../src/cli/run-cli/command-loaders/project.ts     | 193 +++++++++-
 .../commands/context/context-results.unit.test.ts  | 136 +++++++
 .../src/commands/context/context-runner.ts         | 287 ++++++++------
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
 17 files changed, 1722 insertions(+), 532 deletions(-)
```

</details>
