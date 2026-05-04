Task: `202605040755-KF1EWC`
Title: Fix launch README example role leakage

## Summary

Fix launch README example role leakage

Replace public quickstart examples that foreground internal role IDs with role-free commands and a single configurable-agents note.

## Scope

- In scope: Replace public quickstart examples that foreground internal role IDs with role-free commands and a single configurable-agents note.
- Out of scope: unrelated refactors not required for "Fix launch README example role leakage".

## Verification

- State: ok
- Note: Public examples no longer expose concrete internal role IDs; targeted homepage import and lint passed.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-04T07:57:07.226Z
- Branch: task/202605040755-KF1EWC/launch-punch-list
- Head: 3fb4f0809359

```text
No changes detected.
```

</details>
