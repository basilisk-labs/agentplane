Task: `202608131730-BHEAQT`
Title: Qualify and publish AgentPlane 0.7.6
Canonical task record: `.agentplane/tasks/202608131730-BHEAQT/README.md`

## Summary

Qualify and publish AgentPlane 0.7.6

Publish the 0.7.6 patch only after EZZZYH is merged and closed. Freeze the exact protected-main release scope; generate the patch plan and English release notes from actual changes since v0.7.5; run the complete 20-scenario provider-enabled release qualification on the exact clean candidate; run canonical release prepublish gates; prepare a branch_pr release candidate without creating a tag; require exact-SHA hosted checks and no unresolved reviews; integrate through the protected main lane; dispatch GitHub-only publication for the exact merged release SHA; verify release-ready and publish-result artifacts, tag, GitHub Release, and all three public npm packages; then clean the release worktree and report efficiency and residual lifecycle debt.

## Scope

- In scope: Publish the 0.7.6 patch only after EZZZYH is merged and closed. Freeze the exact protected-main release scope; generate the patch plan and English release notes from actual changes since v0.7.5; run the complete 20-scenario provider-enabled release qualification on the exact clean candidate; run canonical release prepublish gates; prepare a branch_pr release candidate without creating a tag; require exact-SHA hosted checks and no unresolved reviews; integrate through the protected main lane; dispatch GitHub-only publication for the exact merged release SHA; verify release-ready and publish-result artifacts, tag, GitHub Release, and all three public npm packages; then clean the release worktree and report efficiency and residual lifecycle debt.
- Out of scope: unrelated refactors not required for "Qualify and publish AgentPlane 0.7.6".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-13T17:32:00.151Z
- Branch: task/202608131730-BHEAQT/qualify-and-publish-agentplane-0-7-6
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/WORKFLOW.md                            |  23 +-
 .agentplane/workflows/last-known-good.md           |  23 +-
 docs/assets/header.svg                             |   4 +-
 docs/assets/readme-headers/adr.svg                 |   4 +-
 docs/assets/readme-headers/agentplane-cli.svg      |   4 +-
 docs/assets/readme-headers/agentplane.svg          |   4 +-
 docs/assets/readme-headers/core.svg                |   4 +-
 docs/assets/readme-headers/docs.svg                |   4 +-
 docs/assets/readme-headers/humanizer.svg           |   4 +-
 docs/assets/readme-headers/recipes.svg             |   4 +-
 docs/assets/readme-headers/releases.svg            |   4 +-
 docs/assets/readme-headers/schemas.svg             |   4 +-
 docs/assets/readme-headers/scripts.svg             |   4 +-
 docs/assets/readme-headers/skills.svg              |   4 +-
 docs/assets/readme-headers/spec.svg                |   4 +-
 docs/assets/readme-headers/testkit.svg             |   4 +-
 docs/reference/generated-reference.mdx             |   6 +-
 docs/releases/v0.7.6.md                            | 363 +++++++++++++++++++++
 packages/agentplane/package.json                   |   6 +-
 packages/core/package.json                         |   2 +-
 packages/recipes/package.json                      |   2 +-
 packages/recipes/src/index.ts                      |   2 +-
 packages/spec/examples/acr.json                    |  22 +-
 packages/testkit/package.json                      |   2 +-
 website/static/img/social/docs/releases/v0.7.6.png | Bin 0 -> 53331 bytes
 website/static/img/social/manifest.json            |   8 +
 26 files changed, 469 insertions(+), 46 deletions(-)
```

</details>
