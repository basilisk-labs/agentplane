Task: `202609191809-7KFNQT`
Title: Replace versioned README header generation with one static shared image
Canonical task record: `.agentplane/tasks/202609191809-7KFNQT/README.md`

## Summary

Replace versioned README header generation with one static shared image

Use one version-independent docs/assets/header.svg for all 13 current README surfaces; remove visible version text from that shared image; delete the per-surface SVG variants and their generator; remove the associated package scripts and release gate; regenerate scripts/README.md; preserve generic direct-task verification sequence coverage with neutral fixture names; keep historical docs/releases/** records unchanged. This replaces blocked task 202609191755-BXKBCP whose final shell-style absence check was incompatible with AgentPlane's argv-only verification runner.

## Scope

- In scope: Use one version-independent docs/assets/header.svg for all 13 current README surfaces; remove visible version text from that shared image; delete the per-surface SVG variants and their generator; remove the associated package scripts and release gate; regenerate scripts/README.md; preserve generic direct-task verification sequence coverage with neutral fixture names; keep historical docs/releases/** records unchanged. This replaces blocked task 202609191755-BXKBCP whose final shell-style absence check was incompatible with AgentPlane's argv-only verification runner.
- Out of scope: unrelated refactors not required for "Replace versioned README header generation with one static shared image".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-19T18:13:49.136Z
- Branch: task/202609191809-7KFNQT/canonical-7kfnqt
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 README.md                                          |   2 +-
 docs/README.md                                     |   2 +-
 docs/adr/README.md                                 |   2 +-
 docs/assets/header.svg                             |   3 +-
 docs/assets/readme-headers/adr.svg                 |  36 ---
 docs/assets/readme-headers/agentplane-cli.svg      |  36 ---
 docs/assets/readme-headers/agentplane.svg          |  36 ---
 docs/assets/readme-headers/core.svg                |  36 ---
 docs/assets/readme-headers/docs.svg                |  36 ---
 docs/assets/readme-headers/humanizer.svg           |  36 ---
 docs/assets/readme-headers/recipes.svg             |  36 ---
 docs/assets/readme-headers/releases.svg            |  36 ---
 docs/assets/readme-headers/schemas.svg             |  36 ---
 docs/assets/readme-headers/scripts.svg             |  36 ---
 docs/assets/readme-headers/skills.svg              |  36 ---
 docs/assets/readme-headers/spec.svg                |  36 ---
 docs/assets/readme-headers/testkit.svg             |  36 ---
 docs/releases/README.md                            |   2 +-
 package.json                                       |   4 +-
 packages/agentplane/README.md                      |   2 +-
 .../direct-task-verification.sequence.cases.ts     |   6 +-
 packages/core/README.md                            |   2 +-
 packages/recipes/README.md                         |   2 +-
 packages/spec/README.md                            |   2 +-
 packages/testkit/README.md                         |   2 +-
 schemas/README.md                                  |   2 +-
 scripts/README.md                                  | 116 ++++----
 scripts/generate/generate-readme-header.mjs        | 326 ---------------------
 scripts/generate/generate-scripts-readme.mjs       |   2 +-
 skills/README.md                                   |   2 +-
 skills/humanizer/README.md                         |   2 +-
 31 files changed, 75 insertions(+), 874 deletions(-)
```

</details>
