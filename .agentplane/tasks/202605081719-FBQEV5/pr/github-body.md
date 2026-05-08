Task: `202605081719-FBQEV5`
Title: Blueprint catalog contracts and cache
Canonical task record: `.agentplane/tasks/202605081719-FBQEV5/README.md`

## Summary

Blueprint catalog contracts and cache

Add AgentPlane core contracts and local cache primitives for external blueprint catalog indexes, individual catalog blueprints, and blueprint packs without activating project routes.

## Scope

- In scope: Add AgentPlane core contracts and local cache primitives for external blueprint catalog indexes, individual catalog blueprints, and blueprint packs without activating project routes.
- Out of scope: unrelated refactors not required for "Blueprint catalog contracts and cache".

## Verification

- State: ok
- Note: Verified: fixed Codex Review P1 path traversal findings by rejecting unsafe catalog manifest ids and blueprint definition ids before filesystem writes/deletes; focused blueprint CLI tests and agentplane typecheck passed.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-08T20:05:10.361Z
- Branch: task/202605081719-FBQEV5/blueprint-catalog-install
- Head: 5b70d95f5e6a

```text
No changes detected.
```

</details>
