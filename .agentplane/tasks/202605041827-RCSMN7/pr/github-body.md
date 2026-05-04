Task: `202605041827-RCSMN7`
Title: Add fast doctor tier for large task archives

## Batch Tasks

- Primary: `202605041827-RCSMN7`
- Closure policy: `all_or_fail`
- Included: `202605041827-N44VNX`
- Included: `202605041828-1XBD16`
- Included: `202605041828-P4V1R1`

## Summary

Add fast doctor tier for large task archives

Introduce a cheaper default doctor path that skips archive-wide task body drift checks unless explicitly requested, while preserving deep diagnostics behind flags.

## Scope

- In scope: Introduce a cheaper default doctor path that skips archive-wide task body drift checks unless explicitly requested, while preserving deep diagnostics behind flags.
- Out of scope: unrelated refactors not required for "Add fast doctor tier for large task archives".

## Verification

- State: ok
- Note: Focused doctor tests passed; typecheck, live doctor, and policy routing passed for fast/default doctor behavior.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-04T18:41:20.175Z
- Branch: task/202605041827-RCSMN7/cli-performance-doctor
- Head: c2291d7c89df

```text
 .agentplane/tasks/202605041827-N44VNX/README.md    | 125 ++++++++++++++++++++
 .agentplane/tasks/202605041828-1XBD16/README.md    | 126 +++++++++++++++++++++
 .agentplane/tasks/202605041828-P4V1R1/README.md    | 126 +++++++++++++++++++++
 .../src/backends/task-backend.local.test.ts        |  25 ++++
 .../backends/task-backend/local-backend-read.ts    |   4 +-
 .../src/backends/task-backend/local-backend.ts     |   4 +-
 .../src/commands/doctor.command.task-docs.test.ts  |  60 +++++++++-
 packages/agentplane/src/commands/doctor.run.ts     |   4 +-
 packages/agentplane/src/commands/doctor.spec.ts    |  12 ++
 .../agentplane/src/commands/doctor/workspace.ts    |   4 +-
 .../task/hosted-merge-sync/local-branch.ts         |  55 ++++++---
 scripts/cli-benchmark-runner.mjs                   |  39 ++++++-
 scripts/cli-benchmark-suites.json                  |  23 ++++
 13 files changed, 585 insertions(+), 22 deletions(-)
```

</details>
