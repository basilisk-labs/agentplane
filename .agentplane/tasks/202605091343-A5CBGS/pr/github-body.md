Task: `202605091343-A5CBGS`
Title: Deduplicate GitHub transport sleep helper
Canonical task record: `.agentplane/tasks/202605091343-A5CBGS/README.md`

## Summary

Deduplicate GitHub transport sleep helper

Replace the local gh-transport sleep helper with the existing shared task-backend concurrency helper to remove one duplicate sleep implementation without changing retry behavior.

## Scope

- In scope: Replace the local gh-transport sleep helper with the existing shared task-backend concurrency helper to remove one duplicate sleep implementation without changing retry behavior.
- Out of scope: unrelated refactors not required for "Deduplicate GitHub transport sleep helper".

## Verification

- State: ok
- Note: Shared sleep helper reuse verified.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-09T13:44:08.264Z
- Branch: task/202605091343-A5CBGS/dedupe-gh-sleep
- Head: fd8040bef90d

```text
No changes detected.
```

</details>
