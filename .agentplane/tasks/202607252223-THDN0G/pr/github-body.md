Task: `202607252223-THDN0G`
Title: Bound branch snapshot probes in task active
Canonical task record: `.agentplane/tasks/202607252223-THDN0G/README.md`

## Summary

Bound branch snapshot probes in task active

Prevent task active from spawning an unbounded local and remote branch probe per task route. Reuse one command-scoped branch inventory or apply a bounded concurrency strategy while preserving branch snapshot precedence and stale-base recovery.

## Scope

In scope: task-active route evaluation, shared branch-snapshot inventory helpers, focused regression tests, and the alpha.2 roadmap/fan-in record needed to make this v0.7 regression release-blocking. Preserve branch snapshot source priority and existing task route semantics. Out of scope: changing task lifecycle policy, removing snapshot recovery, or broad task-list redesign.

## Verification

- State: ok
- Note:

```text
Independent verification passed at 6f538546b276d4fa6db3b3d901084cadc0cb3457: 41 focused
active/branch-snapshot/runner-claim tests, typecheck, lint:core, lifecycle invariants, routing, diff
check, and built task active JSON behavior are green.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-25T22:57:41.166Z
- Branch: task/202607252223-THDN0G/bound-branch-snapshot-probes-in-task-active
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/tasks/202607221908-9M2FBQ/README.md    |   2 +
 docs/internal/v0.7-refactor-plan.md                |  17 ++--
 .../src/cli/run-cli.core.tasks.active.test.ts      |  49 ++++++++++
 .../shared/task-backend-branch-snapshot.ts         |  17 +++-
 .../task-backend-branch-snapshot.unit.test.ts      |  70 ++++++++++++++
 .../agentplane/src/commands/shared/task-backend.ts |   4 +
 .../agentplane/src/commands/task/active.command.ts | 105 +++++++++++----------
 .../src/commands/task/active.command.unit.test.ts  |  76 +++++++++++++++
 .../runner/usecases/task-run-active-claim.test.ts  |  31 ++++++
 .../src/runner/usecases/task-run-active-claim.ts   |  26 ++++-
 10 files changed, 335 insertions(+), 62 deletions(-)
```

</details>
