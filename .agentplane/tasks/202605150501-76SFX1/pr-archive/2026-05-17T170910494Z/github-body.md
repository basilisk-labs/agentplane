Task: `202605150501-76SFX1`
Title: Align website minimal OSS style and fix README image generator
Canonical task record: `.agentplane/tasks/202605150501-76SFX1/README.md`

## Summary

Align website minimal OSS style and fix README image generator

Refine website to minimalist informative OSS style aligned with basilisk-labs.com, remove excess hovers/rounding, and fix README preview image generator to output only logo/version/title.

## Scope

- In scope: Refine website to minimalist informative OSS style aligned with basilisk-labs.com, remove excess hovers/rounding, and fix README preview image generator to output only logo/version/title.
- Out of scope: unrelated refactors not required for "Align website minimal OSS style and fix README image generator".

## Verification

- State: ok
- Note:

```text
Website surface simplified to minimal OSS style and README header generator rewritten to
deterministic minimal output (logo + version + latest release blog title subtitle). Verified with
node scripts/generate/generate-readme-header.mjs --check after regeneration. Website build remains
environment-blocked due missing 'sharp' dependency in this worktree runtime.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-15T05:45:28.086Z
- Branch: task/202605150501-76SFX1/minimal-oss-site
- Head: 238f2f24afc4

```text
 docs/assets/header.svg                        |  19 +-
 docs/assets/readme-headers/adr.svg            |  19 +-
 docs/assets/readme-headers/agentplane-cli.svg |  19 +-
 docs/assets/readme-headers/agentplane.svg     |  19 +-
 docs/assets/readme-headers/core.svg           |  19 +-
 docs/assets/readme-headers/docs.svg           |  19 +-
 docs/assets/readme-headers/humanizer.svg      |  19 +-
 docs/assets/readme-headers/recipes.svg        |  19 +-
 docs/assets/readme-headers/releases.svg       |  19 +-
 docs/assets/readme-headers/schemas.svg        |  19 +-
 docs/assets/readme-headers/scripts.svg        |  19 +-
 docs/assets/readme-headers/skills.svg         |  19 +-
 docs/assets/readme-headers/spec.svg           |  19 +-
 docs/assets/readme-headers/testkit.svg        |  19 +-
 scripts/generate/generate-readme-header.mjs   | 180 ++++-----------
 website/src/css/custom.css                    |  29 +++
 website/src/pages/_home.module.css            | 318 +++++++-------------------
 website/src/pages/blog/index.module.css       |  30 +--
 18 files changed, 230 insertions(+), 593 deletions(-)
```

</details>
