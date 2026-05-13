# PR Review

Created: 2026-05-13T05:03:23.187Z

## Task

- Task: `202605130501-4B49ZZ`
- Title: Prepare v0.6 context release readiness
- Status: DOING
- Branch: `task/202605130501-4B49ZZ/v06-context-release-readiness`
- Canonical task record: `.agentplane/tasks/202605130501-4B49ZZ/README.md`

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-13T05:23:35.512Z
- Branch: task/202605130501-4B49ZZ/v06-context-release-readiness
- Head: b58727ba0aa5

```text
 .agentplane/WORKFLOW.md                            |   3 +-
 .../blueprint/resolved-snapshot.json               | 550 +++++++++++++++++++++
 .agentplane/workflows/last-known-good.md           |   3 +-
 .../documentation-information-architecture.mdx     |  16 +-
 .../evaluation-and-recursive-improvement.mdx       |   7 +-
 docs/developer/local-context.mdx                   |  69 +++
 docs/index.mdx                                     | 137 ++---
 docs/reference/generated-reference.mdx             |   6 +-
 docs/releases/v0.6.0.md                            |  24 +
 docs/user/cli-reference.generated.mdx              | 274 +++++++++-
 docs/user/commands.mdx                             |  21 +
 docs/user/local-context.mdx                        |  83 ++++
 docs/user/overview.mdx                             |  25 +-
 docs/user/setup.mdx                                |  24 +-
 package.json                                       |   6 +-
 packages/agentplane/package.json                   |   6 +-
 .../src/commands/context/context-utils.ts          |   8 +-
 packages/agentplane/src/commands/context/ingest.ts |   8 +-
 .../agentplane/src/commands/context/reindex.ts     | 116 ++++-
 .../src/commands/context/release-readiness.test.ts | 175 +++++++
 packages/agentplane/src/commands/context/sqlite.ts |   8 +-
 .../agentplane/src/commands/context/verify-task.ts | 189 ++++++-
 .../src/shared/builtin-assets.generated.ts         |  65 +--
 packages/core/package.json                         |   2 +-
 packages/recipes/package.json                      |   2 +-
 packages/recipes/src/index.ts                      |   2 +-
 packages/spec/examples/acr.json                    |   4 +-
 packages/testkit/package.json                      |   2 +-
 scripts/check-local-tarball-install-smoke.mjs      |  12 +
 scripts/generate-builtin-assets.mjs                | 110 +++++
 website/sidebars.ts                                |  12 +-
 31 files changed, 1790 insertions(+), 179 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
