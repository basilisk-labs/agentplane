## Summary

Migrate task command paths onto backend capability facade

Route task show and task mutation command helpers through capability-aware service helpers so command logic no longer special-cases the local backend directly.

## Scope

- In scope: Route task show and task mutation command helpers through capability-aware service helpers so command logic no longer special-cases the local backend directly.
- Out of scope: unrelated refactors not required for "Migrate task command paths onto backend capability facade".

## Verification

- State: ok
- Note: branch_pr drift detection and hosted merge sync now route through backend capabilities with backward-safe fallback for older backend doubles; targeted tests, typecheck, and lint passed.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-18T07:45:43.084Z
- Branch: task/202604180617-8RSXN9/task-command-capabilities
- Head: ea3e28ca4af7

```text
 packages/agentplane/src/commands/doctor/branch-pr.ts | 10 +++++++---
 .../src/commands/shared/reconcile-check.ts           |  3 ++-
 .../agentplane/src/commands/shared/task-backend.ts   | 20 +++++++++++++++++++-
 .../src/commands/task/hosted-merge-sync.ts           |  9 +++++----
 4 files changed, 33 insertions(+), 9 deletions(-)
```

</details>
