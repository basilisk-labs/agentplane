# PR Review

Created: 2026-08-17T15:50:16.071Z

## Task

- Task: `202608171455-BJ837W`
- Title: Automate next patch beta version after release
- Status: DOING
- Branch: `task/202608171455-BJ837W/automate-next-patch-beta-version-after-release`
- Canonical task record: `.agentplane/tasks/202608171455-BJ837W/README.md`

## Verification

- State: needs_rework
- Note: PR #4838 review and hosted checks require rework before merge.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-17T16:04:57.080Z
- Branch: task/202608171455-BJ837W/automate-next-patch-beta-version-after-release
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/WORKFLOW.md                            |   2 +-
 .github/workflows/publish.yml                      |  57 +++++++-
 docs/developer/release-and-publishing.mdx          |  34 ++++-
 docs/reference/generated-reference.mdx             |  14 +-
 packages/agentplane/package.json                   |   6 +-
 .../release/check-release-version-script.test.ts   |  34 ++++-
 .../open-next-development-version-script.test.ts   | 148 +++++++++++++++++++++
 .../src/commands/release/plan.command.ts           |  17 ++-
 .../src/commands/release/plan.helpers.ts           |  91 ++++++++++++-
 .../agentplane/src/commands/release/plan.test.ts   |  85 ++++++++++++
 .../release/publish-workflow-contract.test.ts      |  18 +++
 .../release/release-task-evidence-script.test.ts   |   8 +-
 packages/core/package.json                         |   2 +-
 packages/recipes/package.json                      |   2 +-
 packages/recipes/src/index.ts                      |   2 +-
 packages/spec/examples/acr.json                    |   4 +-
 packages/testkit/package.json                      |   2 +-
 .../baselines/v0.7-compatibility-candidate.json    |   6 +-
 scripts/lib/next-development-version.mjs           | 119 +++++++++++++++++
 scripts/lib/release-semver.mjs                     |  66 +++++++++
 scripts/lib/release-version-surfaces.mjs           |  63 ++++++++-
 scripts/release/check-release-version.mjs          |  25 +++-
 scripts/release/open-next-development-version.mjs  |  55 ++++++++
 scripts/release/release-task-evidence.mjs          |  19 ++-
 scripts/release/version-bump.mjs                   |  13 +-
 25 files changed, 832 insertions(+), 60 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
