Task: `202605041618-E011A7`
Title: Improve doctor performance and progress

## Summary

Improve agentplane doctor performance and progress behavior on large local task archives without changing the diagnostic contract.

## Scope

In scope: doctor command internals, branch_pr drift-check performance, focused tests, and verification evidence. Out of scope: unrelated asset changes, release publishing, task archive cleanup, and public docs copy.

## Verification

- State: ok
- Note: Focused doctor tests, typecheck, formatting, routing, and live doctor check passed; live doctor completed in 10.90s with phase progress output.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-04T16:25:11.596Z
- Branch: task/202605041618-E011A7/doctor-progress-perf
- Head: 48ad79ac9d70

```text
 .../src/commands/doctor.command.open-pr.test.ts    | 25 ++++++++++++++++++
 packages/agentplane/src/commands/doctor.run.ts     | 30 ++++++++++++++++------
 .../agentplane/src/commands/doctor/branch-pr.ts    | 12 ++++++---
 .../agentplane/src/commands/shared/task-backend.ts |  7 +++++
 .../task/hosted-merge-sync/local-branch.ts         | 10 ++++----
 5 files changed, 67 insertions(+), 17 deletions(-)
```

</details>
