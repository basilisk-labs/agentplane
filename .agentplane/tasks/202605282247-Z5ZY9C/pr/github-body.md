Task: `202605282247-Z5ZY9C`
Title: Cloud backend sync decomposition
Canonical task record: `.agentplane/tasks/202605282247-Z5ZY9C/README.md`

## Summary

Cloud backend sync decomposition

Decompose packages/agentplane/src/backends/task-backend/cloud-backend.ts by extracting cloud sync orchestration and sync-state request handling into focused helper modules while preserving CloudBackend public behavior and reducing hotspot warning count.

## Scope

- In scope: Decompose packages/agentplane/src/backends/task-backend/cloud-backend.ts by extracting cloud sync orchestration and sync-state request handling into focused helper modules while preserving CloudBackend public behavior and reducing hotspot warning count.
- Out of scope: unrelated refactors not required for "Cloud backend sync decomposition".

## Verification

- State: ok
- Note:

```text
Cloud backend sync decomposition completed. Verified with backend load/sync tests, typecheck, arch
deps, lint, format, and hotspot threshold check (runtime warnings 38 -> 37).
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-28T22:48:16.959Z
- Branch: task/202605282247-Z5ZY9C/cloud-backend-sync-decomposition
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
No changes detected.
```

</details>
