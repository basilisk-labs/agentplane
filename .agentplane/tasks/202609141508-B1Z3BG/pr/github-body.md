Task: `202609141508-B1Z3BG`
Title: Release AgentPlane v0.6.29
Canonical task record: `.agentplane/tasks/202609141508-B1Z3BG/README.md`

## Summary

Release AgentPlane v0.6.29

Prepare, review, merge, and publish the next 0.6 patch release from the merged maintenance fixes, with exact-SHA release evidence and post-publish install verification.

## Scope

- In scope: Prepare, review, merge, and publish the next 0.6 patch release from the merged maintenance fixes, with exact-SHA release evidence and post-publish install verification.
- Out of scope: unrelated refactors not required for "Release AgentPlane v0.6.29".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-14T16:08:51.776Z
- Branch: task/202609141508-B1Z3BG/release-v0-6-29
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/WORKFLOW.md                            |   3 +-
 .agentplane/workflows/last-known-good.md           |   3 +-
 .github/path-filters.yml                           |   2 +-
 bun.lock                                           |  12 +-
 docs/adr/0005-defer-biome-migration.md             |   2 +-
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
 docs/developer/code-quality.mdx                    |   2 +-
 docs/reference/generated-reference.mdx             |   6 +-
 docs/releases/v0.6.29.md                           |  45 ++
 eslint.config.mjs                                  | 561 +++++++++++++++++++++
 knip.json                                          |   2 +-
 package.json                                       |   2 +-
 packages/agentplane/package.json                   |   6 +-
 .../run-cli.core.hooks.pre-push-full-fast.test.ts  |  20 +
 .../run-cli.core.pr-flow.worktree-runtime.test.ts  |   1 +
 packages/agentplane/src/shared/runtime-env.test.ts |   7 +-
 packages/agentplane/src/shared/runtime-env.ts      |  12 +-
 packages/core/package.json                         |   2 +-
 packages/recipes/package.json                      |   2 +-
 packages/recipes/src/index.ts                      |   2 +-
 packages/spec/examples/acr.json                    |   4 +-
 packages/testkit/package.json                      |   2 +-
 scripts/README.md                                  |   2 +-
 scripts/checks/check-docs-ia.mjs                   |   2 +-
 scripts/checks/run-pre-push-hook.mjs               |   6 +-
 turbo.json                                         |   2 +-
 .../static/img/social/docs/releases/v0.6.29.png    | Bin 0 -> 54128 bytes
 website/static/img/social/manifest.json            |   8 +
 41 files changed, 711 insertions(+), 63 deletions(-)
```

</details>
