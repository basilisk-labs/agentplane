Task: `202608222055-1DKNTY`
Title: Fix task scope extend state-binding option parsing
Canonical task record: `.agentplane/tasks/202608222055-1DKNTY/README.md`

## Summary

Fix task scope extend state-binding option parsing

Repair the release-blocking control-plane regression where task scope extend receives scalar --state-scope-digest or --state-fingerprint options but optionalStringOption reads only arrays, so the command always rejects the required binding as missing. Change only the parser helper and focused tests. Do not alter scope-extension authority, digest validation, release semantics, context behavior, or Knowledge Assimilation scope.

## Scope

- In scope: Repair the release-blocking control-plane regression where task scope extend receives scalar --state-scope-digest or --state-fingerprint options but optionalStringOption reads only arrays, so the command always rejects the required binding as missing. Change only the parser helper and focused tests. Do not alter scope-extension authority, digest validation, release semantics, context behavior, or Knowledge Assimilation scope.
- Out of scope: unrelated refactors not required for "Fix task scope extend state-binding option parsing".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-22T21:05:41.629Z
- Branch: task/202608222055-1DKNTY/fix-task-scope-extend-state-binding-option-parsi
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
No changes detected.
```

</details>
