Task: `202605051842-BEJAY8`
Title: Add blueprint core model and validation
Canonical task record: `.agentplane/tasks/202605051842-BEJAY8/README.md`

## Summary

Add blueprint core model and validation

Implement the first blueprint code layer: typed model, built-in blueprint registry, registry lookup, validation invariants, and focused tests without resolver, CLI commands, or execution.

## Scope

- In scope: Implement the first blueprint code layer: typed model, built-in blueprint registry, registry lookup, validation invariants, and focused tests without resolver, CLI commands, or execution.
- Out of scope: unrelated refactors not required for "Add blueprint core model and validation".

## Verification

- State: ok
- Note: Implemented blueprint core model, built-ins, registry, validation, and focused tests. Checks passed: agentplane task verify-show 202605051842-BEJAY8; bun test packages/agentplane/src/blueprints/validate.test.ts; bun test packages/agentplane/src/backends/task-backend.cloud.test.ts packages/agentplane/src/blueprints/validate.test.ts; bun run typecheck; bunx eslint packages/agentplane/src/blueprints packages/agentplane/src/backends/task-backend/cloud-backend.ts packages/agentplane/src/backends/task-backend.cloud.test.ts; bun run docs:ia:check; node .agentplane/policy/check-routing.mjs; node packages/agentplane/bin/agentplane.js doctor; AGENTPLANE_FAST_CHANGED_FILES=... bun run ci:local:fast.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-05T18:43:07.892Z
- Branch: task/202605051842-BEJAY8/blueprint-core-model
- Head: 8dd6eaa8801f

```text
No changes detected.
```

</details>
