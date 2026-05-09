Task: `202605091753-96X7WA`
Title: Deduplicate built-in blueprint builders
Canonical task record: `.agentplane/tasks/202605091753-96X7WA/README.md`

## Summary

Deduplicate built-in blueprint builders

Extract the shared built-in blueprint node/builder primitives from builtins.ts and builtins-specialized.ts so specialized blueprints reuse the canonical builder instead of duplicating the route construction code.

## Scope

- In scope: Extract the shared built-in blueprint node/builder primitives from builtins.ts and builtins-specialized.ts so specialized blueprints reuse the canonical builder instead of duplicating the route construction code.
- Out of scope: unrelated refactors not required for "Deduplicate built-in blueprint builders".

## Verification

- State: ok
- Note: Verified: extracted shared blueprint builder and branch_pr route helpers; focused blueprint tests passed (3 files, 51 tests), typecheck passed, clone:report improved duplicatedLines 1708->1546 and duplicatedTokens 17574->16193, and clone:check passed without baseline update.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-09T17:55:52.997Z
- Branch: task/202605091753-96X7WA/blueprint-builder
- Head: e2218d7ad7b1

```text
No changes detected.
```

</details>
