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

- State: ok
- Note:

```text
Verified exact backend/task/Git capability separation on cef1b58cb88c: focused context/evaluator
51/51, TypeScript 7 typecheck, guards, schemas, and all 12 critical CLI chunks passed.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-01T01:33:10.068Z
- Branch: task/202607221908-YD5J89/migrate-context-and-evaluator-command-boundaries
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 packages/agentplane/src/cli/run-cli.ts             |  13 +
 .../src/cli/run-cli/command-catalog.test.ts        |  89 ++++
 .../command-catalog/command-context-port.ts        | 153 ++++++
 .../cli/run-cli/command-catalog/command-session.ts |  45 +-
 .../context-evaluator-capability-profiles.ts       |  71 +++
 .../src/cli/run-cli/command-catalog/kernel.test.ts | 224 +++++++-
 .../src/cli/run-cli/command-catalog/kernel.ts      |  65 +++
 .../src/cli/run-cli/command-catalog/project.ts     | 285 +++++++++--
 .../src/cli/run-cli/command-loaders/project.ts     | 215 +++++++-
 .../src/cli/run-cli/registry.run.test.ts           | 377 ++++++++++++++
 .../agentplane/src/cli/run-cli/registry.run.ts     |  42 +-
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
 29 files changed, 3004 insertions(+), 693 deletions(-)
```

</details>
