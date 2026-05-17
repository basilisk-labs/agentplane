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
- Note: README header target verification passed for all 13 README surfaces before merge.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-17T10:14:51.871Z
- Branch: task/202605170957-59F5AJ/readme-header-template
- Head: ad767e8aebfc

```text
 .../blueprint/resolved-snapshot.json               | 416 +++++++++++++++++++++
 docs/assets/header.svg                             |  39 +-
 docs/assets/readme-headers/adr.svg                 |  39 +-
 docs/assets/readme-headers/agentplane-cli.svg      |  39 +-
 docs/assets/readme-headers/agentplane.svg          |  39 +-
 docs/assets/readme-headers/core.svg                |  39 +-
 docs/assets/readme-headers/docs.svg                |  39 +-
 docs/assets/readme-headers/humanizer.svg           |  39 +-
 docs/assets/readme-headers/recipes.svg             |  39 +-
 docs/assets/readme-headers/releases.svg            |  39 +-
 docs/assets/readme-headers/schemas.svg             |  39 +-
 docs/assets/readme-headers/scripts.svg             |  39 +-
 docs/assets/readme-headers/skills.svg              |  39 +-
 docs/assets/readme-headers/spec.svg                |  39 +-
 docs/assets/readme-headers/testkit.svg             |  39 +-
 scripts/generate/generate-readme-header.mjs        | 169 +++++++--
 16 files changed, 973 insertions(+), 158 deletions(-)
```

</details>
