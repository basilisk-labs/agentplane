Task: `202605181816-3W350X`
Title: Add maximum context assimilation mode
Canonical task record: `.agentplane/tasks/202605181816-3W350X/README.md`

## Summary

Add maximum context assimilation mode

Define an extended context assimilation mode for context init/wiki workflows that fully preserves significant source content in wiki, records original hashes and line-addressed provenance, extracts entities and relations before article synthesis, and maintains glossary-driven terminology normalization.

## Scope

- In scope: Define an extended context assimilation mode for context init/wiki workflows that fully preserves significant source content in wiki, records original hashes and line-addressed provenance, extracts entities and relations before article synthesis, and maintains glossary-driven terminology normalization.
- Out of scope: unrelated refactors not required for "Add maximum context assimilation mode".

## Verification

- State: ok
- Note:

```text
Verified: maximum context assimilation profile and blueprint behavior covered by focused tests,
typecheck, lint, generated CLI docs, routing, and doctor.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-18T18:30:25.365Z
- Branch: task/202605181816-3W350X/maximum-context-assimilation
- Head: 77e75c12b261

```text
 .../blueprint/resolved-snapshot.json               | 572 +++++++++++++++++++++
 docs/user/cli-reference.generated.mdx              |   6 +-
 docs/user/local-context.mdx                        |  33 ++
 .../src/backends/task-backend/shared/record.ts     |   1 +
 .../src/backends/task-backend/shared/types.ts      |   1 +
 packages/agentplane/src/blueprints/builtins.ts     | 131 +++++
 packages/agentplane/src/blueprints/model.ts        |   1 +
 .../agentplane/src/blueprints/validate.test.ts     |  31 +-
 .../run-cli.core.help-snap.test.ts.snap            | 339 +++++++++++-
 .../src/commands/blueprint/task-input.test.ts      |  20 +
 .../src/commands/blueprint/task-input.ts           |   1 +
 .../src/commands/context/context.spec.ts           |  18 +-
 packages/agentplane/src/commands/context/init.ts   |  53 +-
 .../src/commands/context/release-readiness.test.ts | 112 ++++
 .../agentplane/src/commands/hooks/task-context.ts  |   1 +
 .../agentplane/src/commands/task/begin.command.ts  |   1 +
 packages/agentplane/src/commands/task/new.spec.ts  |   1 +
 packages/agentplane/src/commands/task/new.ts       |   1 +
 packages/agentplane/src/context/ingest-task.ts     |  92 +++-
 packages/agentplane/src/context/ingest.ts          |  36 +-
 packages/agentplane/src/context/verify-task.ts     |   5 +-
 21 files changed, 1428 insertions(+), 28 deletions(-)
```

</details>
