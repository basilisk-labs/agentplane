Task: `202608120643-75ZFHW`
Title: Prevent worktree accumulation and clean obsolete task checkouts
Canonical task record: `.agentplane/tasks/202608120643-75ZFHW/README.md`

## Summary

Prevent worktree accumulation and clean obsolete task checkouts

Implement lifecycle-owned worktree hygiene before the verification optimization task. Preserve parallel development by allowing one authoritative worktree for each active branch_pr task, while preventing duplicate worktrees for the same task. Automatically finalize clean task worktrees and local task branches after hosted-close or proven merge, and make queue/supervisor progression own this cleanup without requiring the coding agent to infer it. Prevent recovery/control checkouts from recursively registering or restoring nested historical task worktrees. Add deterministic inventory/readback that classifies active, merged, dirty, recovery, detached, remote-only, and ambiguous refs; delete only provider-proven merged or explicitly obsolete clean state, preserving dirty, open-PR, active, blocked, stashed, release archive, and uniquely unassimilated work. Apply the command to the current repository, reconcile local and remote branches, and record before/after counts and retained reasons. Cover parallel active tasks, duplicate same-task worktree rejection, hosted-close cleanup, recovery non-resurrection, dirty preservation, and idempotent cleanup with focused and realistic E2E tests.

## Scope

- In scope: Implement lifecycle-owned worktree hygiene before the verification optimization task. Preserve parallel development by allowing one authoritative worktree for each active branch_pr task, while preventing duplicate worktrees for the same task. Automatically finalize clean task worktrees and local task branches after hosted-close or proven merge, and make queue/supervisor progression own this cleanup without requiring the coding agent to infer it. Prevent recovery/control checkouts from recursively registering or restoring nested historical task worktrees. Add deterministic inventory/readback that classifies active, merged, dirty, recovery, detached, remote-only, and ambiguous refs; delete only provider-proven merged or explicitly obsolete clean state, preserving dirty, open-PR, active, blocked, stashed, release archive, and uniquely unassimilated work. Apply the command to the current repository, reconcile local and remote branches, and record before/after counts and retained reasons. Cover parallel active tasks, duplicate same-task worktree rejection, hosted-close cleanup, recovery non-resurrection, dirty preservation, and idempotent cleanup with focused and realistic E2E tests.
- Out of scope: unrelated refactors not required for "Prevent worktree accumulation and clean obsolete task checkouts".

## Verification

- State: ok
- Note:

```text
Implementation e7e76d785 passed focused worktree/cleanup/supervisor/authority/projection/CLI E2E
coverage plus typecheck, build, lint, lifecycle invariants, policy routing, diff check, worktree
prune dry-run, and real-repository cleanup readback.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-12T06:44:59.797Z
- Branch: task/202608120643-75ZFHW/prevent-worktree-accumulation-and-clean-obsolete
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.pr-flow.test.ts           |  83 ++++++++++++
 .../branch/cleanup-merged.targeted.test.ts         |  61 ++++++++-
 .../src/commands/branch/cleanup-merged.ts          |  20 ++-
 .../agentplane/src/commands/branch/work-start.ts   |  13 ++
 packages/agentplane/src/commands/doctor.run.ts     |   2 +
 .../agentplane/src/commands/doctor/branch-pr.ts    |  73 +++++++++++
 .../commands/shared/side-effect-authority.test.ts  |   2 +-
 .../src/commands/shared/side-effect-authority.ts   |   9 +-
 .../workflow-operation-projection.registry.test.ts |   4 +
 .../shared/workflow-operation-projection.ts        |   2 +
 .../src/commands/shared/worktree-topology.test.ts  |  97 ++++++++++++++
 .../src/commands/shared/worktree-topology.ts       | 146 +++++++++++++++++++++
 .../task/branch-task-supervisor-operations.test.ts |  38 ++++++
 .../task/branch-task-supervisor-operations.ts      |   4 +-
 14 files changed, 544 insertions(+), 10 deletions(-)
```

</details>
