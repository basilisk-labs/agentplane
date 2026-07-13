# PR Review

Created: 2026-07-13T18:11:52.210Z

## Task

- Task: `202607131808-4XZ5WY`
- Title: Prepare and publish patch release v0.6.23
- Status: DONE
- Branch: `task/202607131808-4XZ5WY/prepare-and-publish-patch-release-v0-6-23`
- Canonical task record: `.agentplane/tasks/202607131808-4XZ5WY/README.md`

## Verification

- State: ok
- Note: Passed on candidate HEAD fc1a82c67633: release:check; docs:readme-header:check via release gate; ci:local:fast (365 files, 2163 tests, 5/5 critical CLI chunks); policy routing; doctor; full release prepublish heavy (81/81 release-ci-base chunks, workflow/significant coverage, 16 release-critical tests). Doctor reported only historical DONE-task commit warnings unrelated to this change.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-13T21:34:20.334Z
- Branch: task/202607131808-4XZ5WY/prepare-and-publish-patch-release-v0-6-23
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/WORKFLOW.md                            |   3 +-
 bun.lock                                           |  12 +-
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
 docs/releases/v0.6.23.md                           |  39 ++++++
 packages/agentplane/package.json                   |   6 +-
 ...-cli.core.pr-flow.integrate-rebase-race.test.ts | 132 +++++++++++++++++++++
 ...n-cli.core.pr-flow.integrate-strategies.test.ts |  98 ---------------
 .../commands/release/release-ci-contract.test.ts   |   5 +
 packages/core/package.json                         |   2 +-
 packages/recipes/package.json                      |   2 +-
 packages/recipes/src/index.ts                      |   2 +-
 packages/spec/examples/acr.json                    |   4 +-
 packages/testkit/package.json                      |   2 +-
 scripts/lib/test-route-registry.mjs                |   1 +
 .../static/img/social/docs/releases/v0.6.23.png    | Bin 0 -> 54823 bytes
 website/static/img/social/manifest.json            |   8 ++
 30 files changed, 233 insertions(+), 145 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
