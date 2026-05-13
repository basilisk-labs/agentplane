Task: `202605131815-Y9VGVQ`
Title: Use shared root env for hosted sync
Canonical task record: `.agentplane/tasks/202605131815-Y9VGVQ/README.md`

## Summary

Use shared root env for hosted sync

Load hosted backend credentials from the canonical repository root .env across branch_pr worktrees, and prevent cloud push from using stale task projections.

## Scope

- In scope: Load hosted backend credentials from the canonical repository root .env across branch_pr worktrees, and prevent cloud push from using stale task projections.
- Out of scope: unrelated refactors not required for "Use shared root env for hosted sync".

## Verification

- State: ok
- Note: Verified: bun test packages/agentplane/src/backends/task-backend.load.test.ts packages/agentplane/src/cli/run-cli.core.backend-sync.test.ts passed (29 tests); node .agentplane/policy/check-routing.mjs passed; ap doctor OK with pre-existing cloud backend sync degraded warning reason=rate_limited.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-13T18:51:38.284Z
- Branch: task/202605131815-Y9VGVQ/shared-root-env-sync
- Head: ebcb625a0132

```text
 .../blueprint/resolved-snapshot.json               | 392 +++++++++++++++++++++
 .../src/backends/task-backend.load.test.ts         |  37 ++
 .../src/cli/run-cli.core.backend-sync.test.ts      |  59 ++++
 packages/agentplane/src/commands/backend.ts        |   4 +-
 packages/agentplane/src/shared/env.ts              |  35 +-
 5 files changed, 524 insertions(+), 3 deletions(-)
```

</details>
