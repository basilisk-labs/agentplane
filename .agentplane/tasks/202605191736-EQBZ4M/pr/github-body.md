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
Hosted PR checks are green for head 20be204a after review fixes; unresolved review threads were
addressed and resolved.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-19T19:32:51.553Z
- Branch: task/202605191736-EQBZ4M/task-observations
- Head: 20be204abe54

```text
 .agentplane/tasks/202605191736-EQBZ4M/acr.json     | 521 +++++++++++++++++++
 .../blueprint/resolved-snapshot.json               | 572 +++++++++++++++++++++
 .../tasks/202605191736-EQBZ4M/observations.jsonl   |   2 +
 docs/index.mdx                                     |   4 +-
 docs/reference/evidence.mdx                        |   4 +-
 docs/reference/task-observations.mdx               |  60 +++
 docs/start/what-agentplane-writes.mdx              |  12 +
 .../src/cli/run-cli/command-catalog/task.ts        |  37 ++
 .../src/cli/run-cli/command-loaders/task.ts        |  19 +
 packages/agentplane/src/commands/acr/generate.ts   |  16 +
 .../src/commands/task/observations.command.ts      | 387 ++++++++++++++
 .../agentplane/src/commands/task/observations.ts   | 279 ++++++++++
 .../src/commands/task/observations.unit.test.ts    |  73 +++
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
 website/sidebars.ts                                |   1 +
 25 files changed, 2642 insertions(+), 3 deletions(-)
```

</details>
