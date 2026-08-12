# PR Review

Created: 2026-08-12T06:44:59.797Z

## Task

- Task: `202608120643-75ZFHW`
- Title: Prevent worktree accumulation and clean obsolete task checkouts
- Status: DOING
- Branch: `task/202608120643-75ZFHW/prevent-worktree-accumulation-and-clean-obsolete`
- Canonical task record: `.agentplane/tasks/202608120643-75ZFHW/README.md`

## Verification

- State: ok
- Note: Implementation e7e76d785 passed focused worktree/cleanup/supervisor/authority/projection/CLI E2E coverage plus typecheck, build, lint, lifecycle invariants, policy routing, diff check, worktree prune dry-run, and real-repository cleanup readback.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
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
<!-- END AUTO SUMMARY -->
