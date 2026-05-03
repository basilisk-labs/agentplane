Task: `202605031524-10ZC1E`
Title: Add branch_pr batch drift diagnostics and recovery

## Summary

Add branch_pr batch drift diagnostics and recovery

Extend doctor and normalize so merged primary PRs with included tasks cannot leave verified leaf tasks open silently, and provide scoped recovery commands with tests.

## Scope

- In scope: Extend doctor and normalize so merged primary PRs with included tasks cannot leave verified leaf tasks open silently, and provide scoped recovery commands with tests.
- Out of scope: unrelated refactors not required for "Add branch_pr batch drift diagnostics and recovery".

## Verification

- State: ok
- Note: doctor now reports branch_pr batch included-task closure drift.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-03T16:15:31.953Z
- Branch: task/202605031524-10ZC1E/batch-drift-diagnostics
- Head: e373a956f6d4

```text
 packages/agentplane/src/commands/doctor.run.ts     |  2 +
 .../agentplane/src/commands/doctor/branch-pr.ts    | 69 ++++++++++++++++++++++
 2 files changed, 71 insertions(+)
```

</details>
