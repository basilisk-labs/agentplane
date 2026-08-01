Task: `202608012034-W6F4DM`
Title: Prevent artifact gate buffer overflow on large repositories
Canonical task record: `.agentplane/tasks/202608012034-W6F4DM/README.md`

## Summary

Prevent artifact gate buffer overflow on large repositories

Raise deterministic child-process output bounds in the artifact policy gate so tracked path inventories larger than Node's default 1 MiB buffer remain verifiable without weakening artifact exclusions.

## Scope

- In scope: Raise deterministic child-process output bounds in the artifact policy gate so tracked path inventories larger than Node's default 1 MiB buffer remain verifiable without weakening artifact exclusions.
- Out of scope: unrelated refactors not required for "Prevent artifact gate buffer overflow on large repositories".

## Verification

- State: ok
- Note:

```text
PASS at implementation 390bfc5a8: reproduced ENOBUFS with 1,234,456-byte tracked inventory; after
the bounded fix, the current 1,234,845-byte inventory passes artifacts:check. Targeted
ESLint/Prettier, full ci:contract, diff check, and clean worktree pass.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-01T20:39:24.358Z
- Branch: task/202608012034-W6F4DM/prevent-artifact-gate-buffer-overflow-on-large-r
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 scripts/checks/check-agentplane-artifacts.mjs | 8 +++++++-
 1 file changed, 7 insertions(+), 1 deletion(-)
```

</details>
