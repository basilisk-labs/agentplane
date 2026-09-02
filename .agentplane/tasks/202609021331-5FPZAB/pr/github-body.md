Task: `202609021331-5FPZAB`
Title: Repair lifecycle projection integrity after M3 cutover
Canonical task record: `.agentplane/tasks/202609021331-5FPZAB/README.md`

## Summary

Repair lifecycle projection integrity after M3 cutover

After M3 is integrated, repair the demonstrated lifecycle projection-integrity gaps without release work or MPXQBK. Deliver five sequential WorkItems: (1) authoritative-worktree task identity; (2) atomic lifecycle projection reconciliation after set-status, hosted close, and merge; (3) invalidation of stale WorkItem and route projections; (4) convergence of completed branch_pr cleanup; (5) an Arkady Factory stale-DONE end-to-end regression. Reuse existing code and tests before adding new code. Prefer deletion or consolidation over compatibility layers. Treat the current compatibility-import edges and line count as a measured baseline, not a hard cap; any necessary expansion must be explicit in the allowlist and covered by a focused regression so growth remains fail-closed. Keep all changes bounded to projection integrity and lifecycle cleanup. Do not include release/version/publish work or MPXQBK.

## Scope

- In scope: After M3 is integrated, repair the demonstrated lifecycle projection-integrity gaps without release work or MPXQBK. Deliver five sequential WorkItems: (1) authoritative-worktree task identity; (2) atomic lifecycle projection reconciliation after set-status, hosted close, and merge; (3) invalidation of stale WorkItem and route projections; (4) convergence of completed branch_pr cleanup; (5) an Arkady Factory stale-DONE end-to-end regression. Reuse existing code and tests before adding new code. Prefer deletion or consolidation over compatibility layers. Treat the current compatibility-import edges and line count as a measured baseline, not a hard cap; any necessary expansion must be explicit in the allowlist and covered by a focused regression so growth remains fail-closed. Keep all changes bounded to projection integrity and lifecycle cleanup. Do not include release/version/publish work or MPXQBK.
- Out of scope: unrelated refactors not required for "Repair lifecycle projection integrity after M3 cutover".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-02T15:35:26.605Z
- Branch: task/202609021331-5FPZAB/repair-lifecycle-projection-integrity-after-m3-c
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../commands/shared/route-decision-workspace.ts    |   2 +-
 .../shared/task-backend-branch-snapshot.ts         | 122 ++++++++++++++++++++-
 .../task-backend-branch-snapshot.unit.test.ts      |  78 ++++++++++++-
 .../src/commands/shared/task-backend.test.ts       |  33 +++---
 .../agentplane/src/commands/shared/task-backend.ts |  51 +++++----
 5 files changed, 245 insertions(+), 41 deletions(-)
```

</details>
