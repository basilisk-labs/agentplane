# PR Review

Created: 2026-07-13T18:11:52.210Z

## Task

- Task: `202607131808-4XZ5WY`
- Title: Prepare and publish patch release v0.6.23
- Status: DOING
- Branch: `task/202607131808-4XZ5WY/prepare-and-publish-patch-release-v0-6-23`
- Canonical task record: `.agentplane/tasks/202607131808-4XZ5WY/README.md`

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-13T18:11:52.210Z
- Branch: task/202607131808-4XZ5WY/prepare-and-publish-patch-release-v0-6-23
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/WORKFLOW.md                            |   3 +-
 docs/reference/generated-reference.mdx             |   6 +-
 docs/releases/v0.6.23.md                           |  39 ++++++
 packages/agentplane/package.json                   |   6 +-
 ...-cli.core.pr-flow.integrate-rebase-race.test.ts | 132 +++++++++++++++++++++
 ...n-cli.core.pr-flow.integrate-strategies.test.ts |  98 ---------------
 .../commands/release/release-ci-contract.test.ts   |   5 +
 packages/core/package.json                         |   2 +-
 packages/recipes/package.json                      |   2 +-
 packages/recipes/src/index.ts                      |   2 +-
 packages/spec/examples/acr.json                    |  22 +++-
 packages/testkit/package.json                      |   2 +-
 scripts/lib/test-route-registry.mjs                |   1 +
 .../static/img/social/docs/releases/v0.6.23.png    | Bin 0 -> 54823 bytes
 website/static/img/social/manifest.json            |   8 ++
 15 files changed, 213 insertions(+), 115 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
