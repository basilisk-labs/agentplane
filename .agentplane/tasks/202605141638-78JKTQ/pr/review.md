# PR Review

Created: 2026-05-14T17:36:30.606Z

## Task

- Task: `202605141638-78JKTQ`
- Title: Harden cloud auto-push failure semantics
- Status: DOING
- Branch: `task/202605141638-78JKTQ/v06-audit-followups`
- Canonical task record: `.agentplane/tasks/202605141638-78JKTQ/README.md`

## Verification

- State: ok
- Note: Cloud auto-push failure protection verified: failed auto-push now writes durable pending_push state, prefer-remote pull refuses to overwrite pending local mutations, inspect freshness exposes pendingPush, and explicit successful push clears the marker. Checks: task-backend.cloud.test.ts + cloud-backend-state.test.ts 30 tests passed; agentplane typecheck passed; targeted eslint passed; policy routing passed.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-14T18:04:12.284Z
- Branch: task/202605141638-78JKTQ/v06-audit-followups
- Head: 821790ea1ce4

```text
 .agentplane/tasks/202605141638-3VAJ2V/README.md    |  85 +++-
 .../blueprint/resolved-snapshot.json               | 553 +++++++++++++++++++++
 .../blueprint/resolved-snapshot.json               | 527 ++++++++++++++++++++
 .agentplane/tasks/202605141638-DYD163/README.md    |  85 +++-
 .../blueprint/resolved-snapshot.json               | 416 ++++++++++++++++
 .agentplane/tasks/202605141638-HGNT7H/README.md    |  85 +++-
 .../blueprint/resolved-snapshot.json               | 553 +++++++++++++++++++++
 .agentplane/tasks/202605141638-TTVFMD/README.md    |  85 +++-
 .../blueprint/resolved-snapshot.json               | 527 ++++++++++++++++++++
 package.json                                       |   3 +-
 .../src/backends/task-backend.cloud.test.ts        |  75 ++-
 .../task-backend/cloud-backend-state.test.ts       |  32 +-
 .../backends/task-backend/cloud-backend-state.ts   |  39 +-
 .../src/backends/task-backend/cloud-backend.ts     |  88 +++-
 .../src/backends/task-backend/cloud-pull.ts        |  54 +-
 .../src/backends/task-backend/local-backend.ts     |   5 +
 .../src/backends/task-backend/shared/types.ts      |   4 +
 .../cli/run-cli/commands/core/agent-profiles.ts    |   5 +-
 .../agentplane/src/cli/run-cli/commands/ide.ts     |   5 +-
 packages/agentplane/src/commands/acr/generate.ts   |   5 +-
 packages/agentplane/src/commands/acr/validate.ts   |   5 +-
 packages/agentplane/src/commands/backend.ts        |   5 +-
 .../src/commands/integrate-queue.command.ts        |   5 +-
 .../commands/release/apply.preflight.package.ts    |  24 +-
 .../src/commands/release/release-notes-rules.json  |  16 +
 .../src/commands/task/migrate-doc.readme.ts        |   5 +-
 .../commands/task/shared/branch-pr-list-state.ts   |   5 +-
 packages/agentplane/src/context/context-utils.ts   |   6 +-
 packages/agentplane/src/context/doctor.ts          |   5 +-
 .../src/runner/context/prompt-block-shared.ts      |   5 +-
 .../src/runtime/prompt-modules/schema.ts           |   6 +-
 .../src/runtime/prompt-modules/validation.ts       |   5 +-
 packages/agentplane/src/workflow-runtime/fix.ts    |   5 +-
 .../src/workflow-runtime/validation-helpers.ts     |   5 +-
 packages/agentplane/tsconfig.json                  |   5 +-
 scripts/checks/check-shared-guards.mjs             |  48 ++
 scripts/generate/sync-schemas.mjs                  |  80 +++
 scripts/release/check-release-notes.mjs            |  38 +-
 38 files changed, 3311 insertions(+), 193 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
