Task: `202605191736-EQBZ4M`
Title: Add task observations journal
Canonical task record: `.agentplane/tasks/202605191736-EQBZ4M/README.md`

## Summary

Add task observations journal

Implement a structured task-local observations.jsonl artifact for agent-discovered spec gaps, decisions, risks, issue candidates, incident candidates, context candidates, and agent improvement candidates, with CLI support for adding, listing, checking, and triaging observations.

## Scope

- In scope: Implement a structured task-local observations.jsonl artifact for agent-discovered spec gaps, decisions, risks, issue candidates, incident candidates, context candidates, and agent improvement candidates, with CLI support for adding, listing, checking, and triaging observations.
- Out of scope: unrelated refactors not required for "Add task observations journal".

## Verification

- State: ok
- Note:

```text
Quality review passed for implementation commit bb2904022. Reviewed structured observations journal
schema, CLI registration, ACR evidence integration, docs, and verification evidence; no blocking
observations or unresolved drift found.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-19T17:51:51.746Z
- Branch: task/202605191736-EQBZ4M/task-observations
- Head: bb2904022f1b

```text
 .../blueprint/resolved-snapshot.json               | 572 +++++++++++++++++++++
 .../tasks/202605191736-EQBZ4M/observations.jsonl   |   1 +
 docs/index.mdx                                     |   4 +-
 docs/reference/evidence.mdx                        |   4 +-
 docs/reference/task-observations.mdx               |  60 +++
 docs/start/what-agentplane-writes.mdx              |  12 +
 .../src/cli/run-cli/command-catalog/task.ts        |  37 ++
 .../src/cli/run-cli/command-loaders/task.ts        |  19 +
 packages/agentplane/src/commands/acr/generate.ts   |  16 +
 .../src/commands/task/observations.command.ts      | 433 ++++++++++++++++
 .../agentplane/src/commands/task/observations.ts   | 276 ++++++++++
 .../src/commands/task/observations.unit.test.ts    |  64 +++
 packages/core/schemas/task-observation.schema.json | 148 ++++++
 packages/core/src/index.ts                         |   4 +
 packages/core/src/schemas/index.ts                 |   4 +
 packages/core/src/tasks/index.ts                   |  15 +
 .../src/tasks/task-artifact-schema.observations.ts |  99 ++++
 .../core/src/tasks/task-artifact-schema.test.ts    |  44 ++
 packages/core/src/tasks/task-artifact-schema.ts    |  39 ++
 packages/spec/README.md                            |   2 +
 packages/spec/schemas/task-observation.schema.json | 148 ++++++
 schemas/task-observation.schema.json               | 148 ++++++
 scripts/generate/sync-schemas.mjs                  |   7 +
 23 files changed, 2153 insertions(+), 3 deletions(-)
```

</details>
