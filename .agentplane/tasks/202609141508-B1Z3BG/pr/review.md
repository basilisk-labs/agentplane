# PR Review

Created: 2026-09-14T15:10:38.998Z

## Task

- Task: `202609141508-B1Z3BG`
- Title: Release AgentPlane v0.6.29
- Status: TODO
- Branch: `task/202609141508-B1Z3BG/release-v0-6-29`
- Canonical task record: `.agentplane/tasks/202609141508-B1Z3BG/README.md`

## Verification

- State: ok
- Note: Verified: release.strict blueprint snapshot e4beed472f52ff7eacb96653f841fd6989d2bf0019ec20a9312f059008846122 is current; prior release gate 82/82, local ci:local:fast 371/371 files and 2190/2190 tests, and hosted CI on implementation/projection head remain passed.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
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
<!-- END AUTO SUMMARY -->
