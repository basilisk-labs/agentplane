Task: `202606010508-88AVPY`
Title: Fix cloud backend failure exit semantics
Canonical task record: `.agentplane/tasks/202606010508-88AVPY/README.md`

## Summary

Fix cloud backend failure exit semantics

Fix GitHub issues #4343 and #4339. Ensure backend/cloud commands that surface E_BACKEND or E_NETWORK failures return nonzero exit codes and expose deterministic tests. No fallback or backwards-compatible aliases.

## Scope

- In scope: Fix GitHub issues #4343 and #4339. Ensure backend/cloud commands that surface E_BACKEND or E_NETWORK failures return nonzero exit codes and expose deterministic tests. No fallback or backwards-compatible aliases.
- Out of scope: unrelated refactors not required for "Fix cloud backend failure exit semantics".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-01T05:09:45.941Z
- Branch: task/202606010508-88AVPY/fix-cloud-backend-failure-exit-semantics
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
No changes detected.
```

</details>
