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
- Note: Final implementation 5e7636a06 passed the complete fast unit suite, the full-fast local CI route, and focused worktree/cleanup lifecycle tests.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-12T07:51:13.755Z
- Branch: task/202608120643-75ZFHW/prevent-worktree-accumulation-and-clean-obsolete
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.pr-flow.test.ts           |  83 ++++++++++++
 .../commands/branch/cleanup-merged.batch.test.ts   |  92 +++++++++++++
 .../src/commands/branch/cleanup-merged.ts          |  20 ++-
 .../agentplane/src/commands/branch/work-start.ts   |  13 ++
 packages/agentplane/src/commands/doctor.run.ts     |   2 +
 .../agentplane/src/commands/doctor/branch-pr.ts    |  73 +++++++++++
 .../shared/route-decision-next-action.test.ts      |   3 +-
 .../src/commands/shared/route-guidance.test.ts     |  20 ++-
 .../commands/shared/side-effect-authority.test.ts  |   2 +-
 .../src/commands/shared/side-effect-authority.ts   |   9 +-
 .../workflow-operation-projection.registry.test.ts |   4 +
 .../shared/workflow-operation-projection.ts        |   2 +
 .../src/commands/shared/worktree-topology.test.ts  |  97 ++++++++++++++
 .../src/commands/shared/worktree-topology.ts       | 146 +++++++++++++++++++++
 .../task/branch-task-supervisor-operations.test.ts |  38 ++++++
 .../task/branch-task-supervisor-operations.ts      |   4 +-
 16 files changed, 591 insertions(+), 17 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
