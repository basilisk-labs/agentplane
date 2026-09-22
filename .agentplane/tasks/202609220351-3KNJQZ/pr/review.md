# PR Review

Created: 2026-09-22T04:01:31.671Z

## Task

- Task: `202609220351-3KNJQZ`
- Title: Remove marketing and recipes Git submodules
- Status: DOING
- Branch: `task/202609220351-3KNJQZ/remove-marketing-and-recipes-git-submodules`
- Canonical task record: `.agentplane/tasks/202609220351-3KNJQZ/README.md`

## Verification

- State: ok
- Note: Canonical validation sha256:d8428d26dc4fb4ab379526ebef96e0450f811b589a32ac72a5d8edea7013647f
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-22T04:01:31.671Z
- Branch: task/202609220351-3KNJQZ/remove-marketing-and-recipes-git-submodules
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .github/workflows/ci.yml                           |   5 -
 .github/workflows/publish-distribution-module.yml  |   1 -
 .github/workflows/publish.yml                      |  26 ----
 .gitmodules                                        |   6 -
 .prettierignore                                    |   2 -
 agentplane-recipes                                 |   1 -
 docs/README.md                                     |   7 +-
 docs/developer/project-layout.mdx                  |   4 +-
 docs/developer/recipes-development.mdx             |  19 +++
 docs/developer/testing-and-quality.mdx             |   1 -
 docs/help/troubleshooting.mdx                      |   1 -
 docs/recipes-inventory.json                        |  45 +------
 eslint.config.cjs                                  |   1 -
 marketing                                          |   1 -
 packages/agentplane/bin/framework-dev-contract.js  |   1 -
 .../src/cli/bootstrap-framework-dev-script.test.ts | 143 +++------------------
 .../cli/generate-recipes-inventory-script.test.ts  |  63 ++++-----
 .../cli/run-cli.core.pr-conflict-rework.test.ts    |   2 +-
 .../run-cli.core.pr-flow.worktree-runtime.test.ts  |   9 --
 ...i.core.task-advance.worktree-resolution.test.ts |   3 +-
 .../commands/branch/work-start.materialize.test.ts |   6 +-
 .../src/commands/branch/work-start.materialize.ts  |   2 +-
 scripts/checks/check-recipes-inventory-fresh.mjs   |  64 +++++++--
 scripts/generate/generate-recipes-inventory.mjs    |  54 +++++---
 scripts/lib/github-ci-capabilities.mjs             |   7 +-
 scripts/workflow/bootstrap-framework-dev.mjs       |  58 +--------
 26 files changed, 172 insertions(+), 360 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
