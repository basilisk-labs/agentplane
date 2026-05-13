Task: `202605130501-4B49ZZ`
Title: Prepare v0.6 context release readiness
Canonical task record: `.agentplane/tasks/202605130501-4B49ZZ/README.md`

## Summary

Prepare v0.6 context release readiness

Complete v0.6 context release hardening: reconcile checkout, regenerate bundled assets, document context commands, version/release notes, runner handoff smoke, mutation guard/source-ref/redaction/SQLite/install-smoke hardening, and documentation IA cleanup.

## Scope

- In scope: Complete v0.6 context release hardening: reconcile checkout, regenerate bundled assets, document context commands, version/release notes, runner handoff smoke, mutation guard/source-ref/redaction/SQLite/install-smoke hardening, and documentation IA cleanup.
- Out of scope: unrelated refactors not required for "Prepare v0.6 context release readiness".

## Verification

- State: ok
- Note: Local and hosted v0.6 readiness checks passed: typecheck, context release-readiness tests, release parity, release:bun:check, docs cli/IA/bootstrap/onboarding, package install smoke with context commands, release:check, ap doctor, and hosted PR #3612 required checks.
- Canonical workflow state lives in the task README.

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
