Task: `202605141002-R9MPV5`
Title: Generate README header image
Canonical task record: `.agentplane/tasks/202605141002-R9MPV5/README.md`

## Summary

Generate README header image

Add an algorithmic README header image generator that includes the AgentPlane logo, release-derived wording, and version number, then wire the generated asset into the root README.

## Scope

- In scope: Add an algorithmic README header image generator that includes the AgentPlane logo, release-derived wording, and version number, then wire the generated asset into the root README.
- Out of scope: unrelated refactors not required for "Generate README header image".

## Verification

- State: ok
- Note: Post-commit verification remains green for README header generator.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-14T10:09:36.505Z
- Branch: task/202605141002-R9MPV5/readme-header-image
- Head: 224991f8ca1f

```text
 .../blueprint/resolved-snapshot.json               | 526 +++++++++++++++++++++
 README.md                                          |   2 +-
 docs/assets/header.svg                             |  49 +-
 package.json                                       |   2 +
 scripts/generate/generate-readme-header.mjs        | 186 ++++++++
 5 files changed, 731 insertions(+), 34 deletions(-)
```

</details>
