Task: `202605022208-9QYS5D`
Title: Add recipes catalog section to website homepage

## Summary

Add recipes catalog section to website homepage

Add a dedicated Recipes section on the website homepage with cards loaded from remote index and copy-to-clipboard install commands.

## Scope

- In scope: Add a dedicated Recipes section on the website homepage with cards loaded from remote index and copy-to-clipboard install commands.
- Out of scope: unrelated refactors not required for "Add recipes catalog section to website homepage".

## Verification

- State: ok
- Note: Verified frontend homepage changes in branch worktree: added recipes catalog loader, cards, and copy-to-clipboard install commands without touching backend code.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-02T22:18:37.004Z
- Branch: task/202605022208-9QYS5D/homepage-recipes-catalog
- Head: af1af4aec40e

```text
 website/src/data/homepage-content.ts |   7 ++
 website/src/pages/_home.module.css   |  55 ++++++++++
 website/src/pages/index.tsx          | 205 ++++++++++++++++++++++++++++++++++-
 3 files changed, 265 insertions(+), 2 deletions(-)
```

</details>
