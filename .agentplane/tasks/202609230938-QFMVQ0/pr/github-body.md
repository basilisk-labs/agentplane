Task: `202609230938-QFMVQ0`
Title: Recover the same AgentPlane task after a planner result fails instead of requiring a new top-level task
Canonical task record: `.agentplane/tasks/202609230938-QFMVQ0/README.md`

## Summary

Recover the same AgentPlane task after a planner result fails instead of requiring a new top-level task

Reproduce the failure path reported for task 202609230716-YVCJN6, identify why a malformed or rejected planning result becomes terminal or disappears, and make task advance return a bounded retry or replanning route for the same task while preserving task identity and authority.

## Scope

- In scope: Reproduce the failure path reported for task 202609230716-YVCJN6, identify why a malformed or rejected planning result becomes terminal or disappears, and make task advance return a bounded retry or replanning route for the same task while preserving task identity and authority.
- Out of scope: unrelated refactors not required for "Recover the same AgentPlane task after a planner result fails instead of requiring a new top-level task".

## Verification

- State: pending
- Note: Invalidated by USER-approved execution scope extension.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-23T10:27:16.458Z
- Branch: task/202609230938-QFMVQ0/recover-the-same-agentplane-task-after-a-planner
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/shared/branch-identity.ts         | 13 +++++
 .../src/commands/shared/branch-pr-context.test.ts  | 18 ++++++
 .../src/commands/shared/branch-pr-context.ts       |  3 +-
 .../shared/route-decision-workspace.test.ts        | 67 ++++++++++++++++++++++
 .../commands/shared/route-decision-workspace.ts    | 14 ++++-
 5 files changed, 111 insertions(+), 4 deletions(-)
```

</details>
