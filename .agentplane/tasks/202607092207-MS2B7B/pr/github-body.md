Task: `202607092207-MS2B7B`
Title: Make context extraction writes transactional for v0.6.22
Canonical task record: `.agentplane/tasks/202607092207-MS2B7B/README.md`

## Summary

Make context extraction writes transactional for v0.6.22

Refactor context extraction persistence so all derived artifacts are staged and committed as one recoverable operation, with rollback on partial write or validation failure.

## Scope

- In scope: Refactor context extraction persistence so all derived artifacts are staged and committed as one recoverable operation, with rollback on partial write or validation failure.
- Out of scope: unrelated refactors not required for "Make context extraction writes transactional for v0.6.22".

## Verification

- State: ok
- Note:

```text
Verified: transactional staging, validation-failure safety, mid-promotion rollback, focused
extraction tests, typecheck, and the full ci:contract gate all pass.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-09T23:16:44.979Z
- Branch: task/202607092207-MS2B7B/make-context-extraction-writes-transactional-for
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
No changes detected.
```

</details>
