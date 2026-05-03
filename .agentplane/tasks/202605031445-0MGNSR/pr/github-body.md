Task: `202605031445-0MGNSR`
Title: Refresh recipes inventory after CMO close drift

## Summary

Refresh recipes inventory after CMO close drift

Regenerate docs/recipes-inventory.json so the pre-push and CI recipes inventory freshness gate matches the current recipe tree before CMO leaf task closure branches are published.

## Scope

- In scope: Regenerate docs/recipes-inventory.json so the pre-push and CI recipes inventory freshness gate matches the current recipe tree before CMO leaf task closure branches are published.
- Out of scope: unrelated refactors not required for "Refresh recipes inventory after CMO close drift".

## Verification

- State: ok
- Note: Regenerated docs/recipes-inventory.json from the current recipe tree; bun run docs:recipes:check passes.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-03T14:46:58.422Z
- Branch: task/202605031445-0MGNSR/refresh-recipes-inventory
- Head: 37d7354800dc

```text
 docs/recipes-inventory.json | 29 -----------------------------
 1 file changed, 29 deletions(-)
```

</details>
