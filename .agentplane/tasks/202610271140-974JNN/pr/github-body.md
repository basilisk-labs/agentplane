Task: `202610271140-974JNN`
Title: Synchronize adopted PR metadata schema with formatted generation
Canonical task record: `.agentplane/tasks/202610271140-974JNN/README.md`

## Summary

Synchronize adopted PR metadata schema with formatted generation

Provide the typed provider-neutral adopted-PR metadata schema prerequisite for MY0JZE. Add strict core schema and tests, make canonical pr-meta schema generation Prettier-stable, and sync exactly three pr-meta.schema.json snapshots. Supersedes RSHVSQ because its immutable five-file criterion omitted the generator. Merge before MY0JZE finalization; do not edit MY0JZE artifacts or add a task-graph depends_on edge.

## Scope

- In scope: Provide the typed provider-neutral adopted-PR metadata schema prerequisite for MY0JZE. Add strict core schema and tests, make canonical pr-meta schema generation Prettier-stable, and sync exactly three pr-meta.schema.json snapshots. Supersedes RSHVSQ because its immutable five-file criterion omitted the generator. Merge before MY0JZE finalization; do not edit MY0JZE artifacts or add a task-graph depends_on edge.
- Out of scope: unrelated refactors not required for "Synchronize adopted PR metadata schema with formatted generation".

## Verification

- State: ok
- Note: Verified: canonical Task Kernel final checks passed.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-27T12:28:36.271Z
- Branch: task/202610271140-974JNN/synchronize-adopted-pr-metadata-schema-with-form
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 packages/core/schemas/pr-meta.schema.json          | 85 ++++++++++++++++++++++
 .../src/tasks/task-artifact-schema.pr-metadata.ts  | 33 ++++++++-
 .../core/src/tasks/task-artifact-schema.test.ts    | 49 +++++++++++++
 packages/spec/schemas/pr-meta.schema.json          | 85 ++++++++++++++++++++++
 schemas/pr-meta.schema.json                        | 85 ++++++++++++++++++++++
 scripts/generate/sync-schemas.mjs                  |  2 +-
 6 files changed, 337 insertions(+), 2 deletions(-)
```

</details>
