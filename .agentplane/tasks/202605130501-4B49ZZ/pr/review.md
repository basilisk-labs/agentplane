# PR Review

Created: 2026-05-13T05:03:23.187Z

## Task

- Task: `202605130501-4B49ZZ`
- Title: Prepare v0.6 context release readiness
- Status: DOING
- Branch: `task/202605130501-4B49ZZ/v06-context-release-readiness`
- Canonical task record: `.agentplane/tasks/202605130501-4B49ZZ/README.md`

## Verification

- State: ok
- Note: Local and hosted v0.6 readiness checks passed: typecheck, context release-readiness tests, release parity, release:bun:check, docs cli/IA/bootstrap/onboarding, package install smoke with context commands, release:check, ap doctor, and hosted PR #3612 required checks.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-13T06:09:49.413Z
- Branch: task/202605130501-4B49ZZ/v06-context-release-readiness
- Head: 14b37d436d85

```text
 .agentplane/WORKFLOW.md                            |   3 +-
 .../blueprint/resolved-snapshot.json               | 550 +++++++++++++++++++++
 .agentplane/workflows/last-known-good.md           |   3 +-
 .github/workflows/ci.yml                           |   2 +-
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
 .../agentplane/src/commands/context/capability.ts  |  23 +-
 .../src/commands/context/context-utils.ts          |  88 ++--
 .../src/commands/context/context.command.ts        |   1 +
 .../src/commands/context/context.spec.ts           |   5 +-
 packages/agentplane/src/commands/context/doctor.ts |   9 +-
 packages/agentplane/src/commands/context/graph.ts  |   9 +-
 .../src/commands/context/ingest.command.ts         |   1 +
 .../agentplane/src/commands/context/ingest.spec.ts |   1 +
 packages/agentplane/src/commands/context/ingest.ts |  15 +-
 .../src/commands/context/init.command.ts           |  21 -
 packages/agentplane/src/commands/context/init.ts   |   9 +-
 .../agentplane/src/commands/context/reindex.ts     | 138 +++++-
 .../src/commands/context/release-readiness.test.ts | 176 +++++++
 packages/agentplane/src/commands/context/search.ts |   3 +-
 packages/agentplane/src/commands/context/show.ts   |   1 +
 packages/agentplane/src/commands/context/sqlite.ts |  16 +-
 .../agentplane/src/commands/context/verify-task.ts | 198 +++++++-
 .../src/shared/builtin-assets.generated.ts         |  65 +--
 packages/core/package.json                         |   2 +-
 packages/recipes/package.json                      |   2 +-
 packages/recipes/src/index.ts                      |   2 +-
 packages/spec/examples/acr.json                    |   4 +-
 packages/testkit/package.json                      |   2 +-
 scripts/README.md                                  |   8 +-
 scripts/check-local-tarball-install-smoke.mjs      |  12 +
 scripts/generate-builtin-assets.mjs                | 110 +++++
 website/sidebars.ts                                |  12 +-
 44 files changed, 1891 insertions(+), 298 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
