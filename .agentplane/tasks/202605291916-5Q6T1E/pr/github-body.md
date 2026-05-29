Task: `202605291916-5Q6T1E`
Title: Add provider-neutral task sync envelope
Canonical task record: `.agentplane/tasks/202605291916-5Q6T1E/README.md`

## Batch Tasks

- Primary: `202605291916-5Q6T1E`
- Closure policy: `all_or_fail`
- Included: `202605291916-YGJASQ`
- Included: `202605291917-4RF08R`

## Summary

Add provider-neutral task sync envelope

Extend the AgentPlane task README/frontmatter contract with a provider-neutral sync envelope for external references, field ownership, projection freshness, and conflict summaries without adding connector-specific fields to task bodies.

## Scope

- In scope: Extend the AgentPlane task README/frontmatter contract with a provider-neutral sync envelope for external references, field ownership, projection freshness, and conflict summaries without adding connector-specific fields to task bodies.
- Out of scope: unrelated refactors not required for "Add provider-neutral task sync envelope".

## Verification

- State: ok
- Note:

```text
Implemented provider-neutral sync envelope contract with schema/export coverage, generated schema
snapshots, and docs. Verified with focused schema/export/projection/cloud tests, typecheck,
schemas:check, docs IA, and policy routing.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-29T19:36:23.621Z
- Branch: task/202605291916-5Q6T1E/task-sync-contract
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/tasks/202605291916-YGJASQ/README.md    | 144 ++++++
 .../blueprint/resolved-snapshot.json               | 570 +++++++++++++++++++++
 .agentplane/tasks/202605291917-4RF08R/README.md    | 144 ++++++
 .../blueprint/resolved-snapshot.json               | 570 +++++++++++++++++++++
 docs/developer/cloud-backend-integration-plan.mdx  |  11 +-
 docs/user/tasks-and-backends.mdx                   |  47 ++
 .../backends/task-backend.cloud-regression.test.ts |   7 +-
 ...task-backend.cloud-remote-create-policy.test.ts | 154 ++++++
 .../task-backend.cloud-start-refresh.test.ts       |   1 +
 .../src/backends/task-backend.cloud.test.ts        |   6 +-
 .../task-backend/cloud-backend-settings.ts         |   3 +
 .../backends/task-backend/cloud-backend-sync.ts    |  55 +-
 .../src/backends/task-backend/cloud-backend.ts     |   9 +
 .../src/backends/task-backend/cloud-pull.ts        |  87 +++-
 .../src/backends/task-backend/redmine/state.ts     |   7 +
 .../src/backends/task-backend/shared/record.ts     |   1 +
 .../src/backends/task-backend/shared/types.ts      |   3 +
 .../schemas/task-readme-frontmatter.schema.json    | 191 +++++++
 packages/core/schemas/tasks-export.schema.json     | 198 +++++++
 packages/core/src/index.ts                         |  14 +
 packages/core/src/tasks/index.ts                   |  14 +
 .../core/src/tasks/task-artifact-schema.task.ts    |  88 ++++
 .../tasks/task-provider-safe-projection.test.ts    | 155 ++++++
 .../src/tasks/task-provider-safe-projection.ts     | 193 +++++++
 packages/core/src/tasks/task-store.ts              |  63 +++
 .../src/tasks/task-sync-envelope-schema.test.ts    | 168 ++++++
 packages/core/src/tasks/tasks-export.ts            | 178 +++++++
 .../schemas/task-readme-frontmatter.schema.json    | 191 +++++++
 packages/spec/schemas/tasks-export.schema.json     | 198 +++++++
 schemas/task-readme-frontmatter.schema.json        | 191 +++++++
 schemas/tasks-export.schema.json                   | 198 +++++++
 31 files changed, 3843 insertions(+), 16 deletions(-)
```

</details>
