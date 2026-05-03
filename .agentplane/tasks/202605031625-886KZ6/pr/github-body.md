Task: `202605031625-886KZ6`
Title: ACR v0.1 core schema contract

## Summary

ACR v0.1 core schema contract

Add the Agent Change Record v0.1 TypeScript/Zod contract, JSON Schema renderer, synchronized schema artifacts, and schema-focused tests. ACR remains a derived evidence projection from AgentPlane task and Git state.

## Scope

- In scope: Add the Agent Change Record v0.1 TypeScript/Zod contract, JSON Schema renderer, synchronized schema artifacts, and schema-focused tests. ACR remains a derived evidence projection from AgentPlane task and Git state.
- Out of scope: unrelated refactors not required for "ACR v0.1 core schema contract".

## Verification

- State: ok
- Note: Command: bun run schemas:check. Result: pass. Evidence: schemas OK. Scope: synchronized ACR v0.1 schema artifacts. Command: bun run test:project core packages/core/src/tasks packages/core/src/schemas. Result: pass. Evidence: 9 files and 75 tests passed. Scope: core task/schema bucket. Command: bun run --filter=@agentplaneorg/core typecheck. Result: pass. Evidence: core typecheck exited 0. Scope: exported ACR types/helpers. Command: bunx prettier --check changed ACR/schema files. Result: pass. Evidence: all matched files use Prettier style. Scope: changed source and generated schema artifacts.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-03T16:42:26.573Z
- Branch: task/202605031625-886KZ6/acr-core-schema
- Head: d2e5c50be7e6

```text
 packages/core/schemas/acr-v0.1.schema.json         | 684 +++++++++++++++++++++
 packages/core/src/index.ts                         |   4 +
 packages/core/src/schemas/index.ts                 |   4 +
 packages/core/src/tasks/index.ts                   |   8 +
 .../core/src/tasks/task-artifact-schema.acr.ts     | 310 ++++++++++
 .../core/src/tasks/task-artifact-schema.test.ts    | 168 +++++
 packages/core/src/tasks/task-artifact-schema.ts    |  22 +
 packages/spec/schemas/acr-v0.1.schema.json         | 684 +++++++++++++++++++++
 scripts/sync-schemas.mjs                           |   9 +
 9 files changed, 1893 insertions(+)
```

</details>
