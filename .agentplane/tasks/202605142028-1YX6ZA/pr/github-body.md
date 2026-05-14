Task: `202605142028-1YX6ZA`
Title: Remove duplicate Recipes navbar link
Canonical task record: `.agentplane/tasks/202605142028-1YX6ZA/README.md`

## Summary

Remove duplicate Recipes navbar link

Fix the website navbar regression introduced by the OSS polish so Recipes appears only once while preserving docs onboarding expectations.

## Scope

- In scope: Fix the website navbar regression introduced by the OSS polish so Recipes appears only once while preserving docs onboarding expectations.
- Out of scope: unrelated refactors not required for "Remove duplicate Recipes navbar link".

## Verification

- State: ok
- Note: Verified duplicate Recipes navbar regression is fixed.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-14T20:30:29.559Z
- Branch: task/202605142028-1YX6ZA/fix-duplicate-recipes-nav
- Head: e791add752ab

```text
 website/docusaurus.config.ts | 6 ------
 1 file changed, 6 deletions(-)
```

</details>
