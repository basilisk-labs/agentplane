Task: `202605031625-886KZ6`
Title: ACR v0.1 core schema contract

## Batch Tasks

- Primary: `202605031625-886KZ6`
- Closure policy: `all_or_fail`
- Included: `202605031625-BM686J`
- Included: `202605031626-83YQTA`
- Included: `202605031626-EQYR7H`
- Included: `202605031626-M8GRHS`
- Included: `202605031626-QPTPBD`
- Included: `202605031626-RX30C6`
- Included: `202605031626-ZN55PB`

## Summary

ACR v0.1 core schema contract

Add the Agent Change Record v0.1 TypeScript/Zod contract, JSON Schema renderer, synchronized schema artifacts, and schema-focused tests. ACR remains a derived evidence projection from AgentPlane task and Git state.

## Scope

- In scope: Add the Agent Change Record v0.1 TypeScript/Zod contract, JSON Schema renderer, synchronized schema artifacts, and schema-focused tests. ACR remains a derived evidence projection from AgentPlane task and Git state.
- Out of scope: unrelated refactors not required for "ACR v0.1 core schema contract".

## Verification

- State: ok
- Note: Command: bun run schemas:check. Result: pass. Evidence: schemas OK. Scope: ACR and config schemas. Command: bun run --filter=@agentplaneorg/core typecheck && build checked separately. Result: pass. Evidence: core typecheck/build exited 0. Scope: ACR schema exports. Command: bun run --filter=agentplane typecheck && build checked separately. Result: pass. Evidence: agentplane typecheck/build exited 0. Scope: ACR CLI and finish integration. Command: bun test packages/core/src/tasks/task-artifact-schema.test.ts. Result: pass. Evidence: 10 tests passed. Scope: ACR schema contract. Command: bun run test:project core packages/core/src/tasks packages/core/src/schemas. Result: pass. Evidence: 75 tests passed. Scope: core task/schema bucket. Command: ACR CLI smokes generate/validate/check/explain/schema. Result: pass. Evidence: acr.json generated, validate/check ok=true, explain merge ready yes.
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
