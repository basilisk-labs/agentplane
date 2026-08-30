# PR Review

Created: 2026-08-26T13:12:22.036Z

## Task

- Task: `202608261249-BXQZ97`
- Title: Add a digest-bound provider update-branch recovery transition for stale hosted PR heads
- Status: DONE
- Branch: `task/202608261249-BXQZ97/add-provider-update-branch-recovery`
- Canonical task record: `.agentplane/tasks/202608261249-BXQZ97/README.md`

## Verification

- State: ok
- Note: Compatibility recovery: exact implementation 1b7267416 passes the task-focused suite, Knip, and one complete local full gate; two later supervisor-only aggregate retries failed in unrelated prompt mocks that pass 16/16 in isolation. Fresh hosted exact-head qualification remains mandatory.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-26T18:49:20.384Z
- Branch: task/202608261249-BXQZ97/add-provider-update-branch-recovery
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/pr/provider-update-branch.test.ts | 230 +++++++++++++
 .../src/commands/pr/provider-update-branch.ts      | 368 +++++++++++++++++++++
 .../shared/provider-update-branch-route.ts         |  68 ++++
 .../route-decision-blockers.quality-review.test.ts |  91 +++++
 .../src/commands/shared/route-decision-blockers.ts |   5 +
 .../src/commands/shared/route-gate-priority.ts     |   3 +-
 .../agentplane/src/commands/shared/route-oracle.ts |   1 +
 .../commands/shared/side-effect-authority.test.ts  |   4 +
 .../src/commands/shared/side-effect-authority.ts   |   1 +
 .../commands/shared/workflow-operation-effects.ts  |   1 +
 .../commands/shared/workflow-operation-prefix.ts   |   1 +
 .../workflow-operation-projection.registry.test.ts |  49 +++
 .../shared/workflow-operation-projection.ts        |  33 ++
 .../src/commands/shared/workflow-postconditions.ts |   6 +
 .../src/commands/shared/workflow-step-branch.ts    |   9 +-
 ...rkflow-step-projections.conflict-rework.test.ts | 112 +++++++
 .../workflow-step-provider-update-branch-spec.ts   |  22 ++
 .../shared/workflow-step-provider-update-branch.ts |  20 ++
 .../src/commands/shared/workflow-step.ts           |   6 +
 .../task/branch-task-supervisor-operations.test.ts | 107 ++++++
 .../task/branch-task-supervisor-operations.ts      |  33 ++
 .../src/commands/task/configured-authority.test.ts |   1 +
 22 files changed, 1166 insertions(+), 5 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
