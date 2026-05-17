Task: `202605170957-59F5AJ`
Title: Update README header image generator
Canonical task record: `.agentplane/tasks/202605170957-59F5AJ/README.md`

## Summary

Update README header image generator

Update the README header image generation algorithm to use the new release header template while keeping layout stable and varying only release version plus generated release-heading text.

## Scope

- In scope: Update the README header image generation algorithm to use the new release header template while keeping layout stable and varying only release version plus generated release-heading text.
- Out of scope: unrelated refactors not required for "Update README header image generator".

## Verification

- State: ok
- Note:

```text
Final block layout verification passed: release text is a separate bottom-anchored block, README
header artifacts are fresh, generator syntax is valid, whitespace check passes, and rendered PNG
keeps the bottom text offset aligned with the 52px left inset.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-17T09:58:50.653Z
- Branch: task/202605170957-59F5AJ/readme-header-template
- Head: c4ca9d1cc587

```text
No changes detected.
```

</details>
