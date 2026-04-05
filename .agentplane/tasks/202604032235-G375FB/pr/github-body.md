## Summary

Fix branch_pr stale cleanup and reconcile hanging lifecycle tails

Repair local branch_pr cleanup so merged task/task-close leftovers are detected and removable, add regressions, then clean the current repository's stale local branches/worktrees and reconcile any hanging lifecycle state exposed by the audit.

## Scope

- In scope: Repair local branch_pr cleanup so merged task/task-close leftovers are detected and removable, add regressions, then clean the current repository's stale local branches/worktrees and reconcile any hanging lifecycle state exposed by the audit.
- Out of scope: unrelated refactors not required for "Fix branch_pr stale cleanup and reconcile hanging lifecycle tails".

## Verification

### Plan

1. Run the focused branch_pr cleanup CLI tests. Expected: merged task branches with refreshed PR artifacts and task-close branches are listed as cleanup candidates and deleted successfully. 2. Run a targeted build or test command on the touched agentplane package. Expected: the updated cleanup resolution code compiles and the touched suites pass. 3. Audit local branch/worktree state after running the fixed cleanup flow. Expected: the safe stale local branches/worktrees created by earlier completed tasks are gone, while active branches remain untouched.

### Current Status

- State: ok
- Note: Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts && bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build. Result: pass. Evidence: 17 cleanup-merged CLI tests passed, both core and agentplane builds passed, stale local branches/worktrees for AQRVW4, DA1JVW, WARBCX, and P771ZK were reconciled in the main checkout, and P771ZK was backfilled to DONE via deterministic close commit 4c345ef2525a. Scope: branch_pr cleanup candidate resolution, task-close cleanup coverage, and repository stale-lifecycle tail audit.

## Risks

- Risk level: not recorded
- Breaking change: no

### Rollback

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-05T07:39:15.191Z
- Branch: task/202604032235-G375FB/cleanup-lifecycle-tails
- Head: 32390c360f84

```text
 .agentplane/tasks/202604032235-G375FB/README.md    | 103 ++++++++++++
 .../run-cli.core.pr-flow.cleanup-merged.test.ts    | 175 +++++++++++++++++++++
 .../src/commands/branch/cleanup-merged.ts          | 133 +++++++++++++---
 packages/agentplane/src/commands/shared/git-ops.ts |  18 +++
 .../agentplane/src/commands/shared/git-worktree.ts |  29 +++-
 5 files changed, 432 insertions(+), 26 deletions(-)
```

</details>
