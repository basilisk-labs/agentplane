Task: `202607300627-SFQ30G`
Title: Repair the active beta.2 dependency path after beta.1 non-publication
Canonical task record: `.agentplane/tasks/202607300627-SFQ30G/README.md`

## Summary

Repair the active beta.2 dependency path after beta.1 non-publication

Replace the only active beta.2 implementation dependency that still points to the blocked legacy beta.1 gate with the merged successor decision task; preserve the legacy gate as BLOCKED and prove no remaining active beta.2 task depends on it.

## Scope

- In scope: Replace the only active beta.2 implementation dependency that still points to the blocked legacy beta.1 gate with the merged successor decision task; preserve the legacy gate as BLOCKED and prove no remaining active beta.2 task depends on it.
- Out of scope: unrelated refactors not required for "Repair the active beta.2 dependency path after beta.1 non-publication".

## Verification

- State: ok
- Note:

```text
Active beta.2 graph no longer depends on the blocked legacy beta.1 gate; successor linkage and docs
workflow checks pass.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-30T06:29:20.783Z
- Branch: task/202607300627-SFQ30G/repair-the-active-beta-2-dependency-path-after-b
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/tasks/202607221852-J910P6/README.md | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)
```

</details>
