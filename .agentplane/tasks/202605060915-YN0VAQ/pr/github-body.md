Task: `202605060915-YN0VAQ`
Title: Define resolved blueprint snapshot schema

## Summary

Define resolved blueprint snapshot schema

Define the persisted task-local resolved blueprint snapshot schema for v0.5, including blueprint id/version, route, evidence checklist, policy modules, context budget, stop rules, recipe contributions, resolver input digest, and compatibility metadata.

## Scope

- In scope: Define the persisted task-local resolved blueprint snapshot schema for v0.5, including blueprint id/version, route, evidence checklist, policy modules, context budget, stop rules, recipe contributions, resolver input digest, and compatibility metadata.
- Out of scope: unrelated refactors not required for "Define resolved blueprint snapshot schema".

## Verification

- State: ok
- Note: Implemented resolved blueprint snapshot schema, deterministic sha256 digest helpers, canonical JSON serialization, and snapshot validation without adding command execution. Verification passed: bun test packages/agentplane/src/blueprints/snapshot.test.ts packages/agentplane/src/blueprints/resolve.test.ts; bun run typecheck; prettier/eslint on touched blueprint files; git diff --check; bun run framework:dev:bootstrap.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-06T09:20:45.367Z
- Branch: task/202605060915-YN0VAQ/blueprint-lifecycle
- Head: b749384f69f4

```text
No changes detected.
```

</details>
