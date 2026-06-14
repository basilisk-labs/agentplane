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
Command: rg -n 'Ask DeepWiki|deepwiki.com/basilisk-labs/agentplane|deepwiki.com/badge.svg'
README.md; Result: pass; Evidence: README.md line 23 contains the exact Ask DeepWiki badge and
project link. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy
routing OK. Command: agentplane doctor; Result: pass; Evidence: doctor OK with warnings limited to
global-in-framework runtime and pre-existing DONE task commit metadata. Command: curl -L --head
--max-time 20 https://deepwiki.com/basilisk-labs/agentplane and https://deepwiki.com/badge.svg;
Result: pass; Evidence: both returned HTTP 200. Scope: README.md and task evidence.
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
