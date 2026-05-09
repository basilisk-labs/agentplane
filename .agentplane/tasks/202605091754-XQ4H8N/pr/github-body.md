Task: `202605091754-XQ4H8N`
Title: Clean unused exported API surface
Canonical task record: `.agentplane/tasks/202605091754-XQ4H8N/README.md`

## Summary

Clean unused exported API surface

Resolve the current knip baseline failures by removing accidental exports or adding real consumers for the reported unused constants/types, then update baseline only if reviewed debt remains intentional.

## Scope

- In scope: Resolve the current knip baseline failures by removing accidental exports or adding real consumers for the reported unused constants/types, then update baseline only if reviewed debt remains intentional.
- Out of scope: unrelated refactors not required for "Clean unused exported API surface".

## Verification

- State: ok
- Note: Verified: removed/narrowed unused exported API surface and stale knip baseline entry; knip:check passed, typecheck passed, Prettier passed, knip baseline helper test passed (1 file, 2 tests), and clone:check passed without baseline update.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-09T19:23:56.949Z
- Branch: task/202605091754-XQ4H8N/knip-unused-surface
- Head: 148f626f1314

```text
No changes detected.
```

</details>
