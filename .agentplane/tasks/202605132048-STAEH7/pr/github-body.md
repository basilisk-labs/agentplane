Task: `202605132048-STAEH7`
Title: Fix branch_pr hosted sync credential resolution
Canonical task record: `.agentplane/tasks/202605132048-STAEH7/README.md`

## Summary

Fix branch_pr hosted sync credential resolution

GitHub issue: https://github.com/basilisk-labs/agentplane/issues/3654 (#3654)

Problem: `ap backend sync cloud --direction push` fails from branch_pr worktrees because credentials/env are not resolved from canonical repo root.

Acceptance:
- branch_pr worktrees can run hosted sync without manual token export
- missing-token diagnostic points to canonical root/env resolution
- avoid pushing stale projections over canonical task README metadata
- add focused regression coverage for env loading + stale projection push behavior

## Scope

- In scope: GitHub issue: https://github.com/basilisk-labs/agentplane/issues/3654 (#3654) Problem: `ap backend sync cloud --direction push` fails from branch_pr worktrees because credentials/env are not resolved from canonical repo root. Acceptance: - branch_pr worktrees can run hosted sync without manual token export - missing-token diagnostic points to canonical root/env resolution - avoid pushing stale projections over canonical task README metadata - add focused regression coverage for env loading + stale projection push behavior.
- Out of scope: unrelated refactors not required for "Fix branch_pr hosted sync credential resolution".

## Verification

- State: ok
- Note: Verified: bun test packages/agentplane/src/backends/task-backend.load.test.ts packages/agentplane/src/cli/run-cli.core.backend-sync.test.ts passed (31 tests); node .agentplane/policy/check-routing.mjs passed; ./node_modules/.bin/eslint packages/agentplane/src/shared/env.ts packages/agentplane/src/backends/task-backend/cloud-backend.ts packages/agentplane/src/backends/task-backend.load.test.ts passed; bunx prettier --check touched files passed; bun run hotspots:check passed after keeping cloud-backend.ts at the 600-line hotspot threshold; ap doctor previously OK with one pre-existing branch_pr closure warning for 202605111603-XQM14A.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-13T21:08:31.539Z
- Branch: task/202605132048-STAEH7/hosted-sync-credentials
- Head: 796fc2f100b5

```text
 .../blueprint/resolved-snapshot.json               | 392 +++++++++++++++++++++
 .../src/backends/task-backend.load.test.ts         |  47 +++
 .../src/backends/task-backend/cloud-backend.ts     |  25 +-
 packages/agentplane/src/shared/env.ts              |  14 +-
 4 files changed, 472 insertions(+), 6 deletions(-)
```

</details>
