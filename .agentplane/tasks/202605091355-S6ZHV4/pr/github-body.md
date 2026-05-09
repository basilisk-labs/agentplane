Task: `202605091355-S6ZHV4`
Title: Deduplicate core type guards
Canonical task record: `.agentplane/tasks/202605091355-S6ZHV4/README.md`

## Summary

Deduplicate core type guards

Create one internal core type guard helper and replace duplicated isRecord/isStringArray implementations inside packages/core without changing public package exports.

## Scope

- In scope: Create one internal core type guard helper and replace duplicated isRecord/isStringArray implementations inside packages/core without changing public package exports.
- Out of scope: unrelated refactors not required for "Deduplicate core type guards".

## Verification

- State: ok
- Note: Core guard deduplication verified.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-09T13:55:54.492Z
- Branch: task/202605091355-S6ZHV4/core-guards
- Head: d3113c57e940

```text
No changes detected.
```

</details>
