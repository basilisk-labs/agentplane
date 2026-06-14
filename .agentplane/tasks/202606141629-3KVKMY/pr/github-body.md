Task: `202606141629-3KVKMY`
Title: Add DeepWiki auto-sync badge
Canonical task record: `.agentplane/tasks/202606141629-3KVKMY/README.md`

## Summary

Add a DeepWiki badge to the root README so the repository links to the current DeepWiki page and can use DeepWiki's badge-driven refresh behavior.

## Scope

- In scope: Add the Ask DeepWiki badge to the root README badge block.
- Out of scope: unrelated refactors not required for "Add DeepWiki auto-sync badge".

## Verification

- State: ok
- Note:

```text
Verified: README.md contains the exact Ask DeepWiki badge linking to
https://deepwiki.com/basilisk-labs/agentplane; node .agentplane/policy/check-routing.mjs passed;
agentplane doctor passed with only pre-existing DONE task commit metadata warnings; DeepWiki project
page and badge.svg returned HTTP 200.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-14T16:30:28.150Z
- Branch: task/202606141629-3KVKMY/add-deepwiki-auto-sync-badge
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 README.md | 1 +
 1 file changed, 1 insertion(+)
```

</details>
