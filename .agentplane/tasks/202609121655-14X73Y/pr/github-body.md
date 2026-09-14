Task: `202609121655-14X73Y`
Title: Fix exact WorkItem-only scope extension when the global contract is already satisfied
Canonical task record: `.agentplane/tasks/202609121655-14X73Y/README.md`

## Summary

Fix exact WorkItem-only scope extension when the global contract is already satisfied

Supersedes blocked task 202609121643-1PV2X7. Preserve exact pending work_item_id, require a real missing WorkItem root in a schedulable state, keep no-op and ambiguity rejection fail-closed, and include focused regression tests. This unblocks release task 202609121423-9WPTCW ST-03.

## Scope

- In scope: Supersedes blocked task 202609121643-1PV2X7. Preserve exact pending work_item_id, require a real missing WorkItem root in a schedulable state, keep no-op and ambiguity rejection fail-closed, and include focused regression tests. This unblocks release task 202609121423-9WPTCW ST-03.
- Out of scope: unrelated refactors not required for "Fix exact WorkItem-only scope extension when the global contract is already satisfied".

## Verification

- State: ok
- Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-12T16:58:32.061Z
- Branch: task/202609121655-14X73Y/fix-exact-workitem-only-scope-extension-when-the
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/task/scope-extend.command.test.ts |  95 +++++++++++
 .../src/commands/task/scope-extend.test.ts         | 188 ++++++++++-----------
 .../agentplane/src/commands/task/scope-extend.ts   |  37 +++-
 3 files changed, 224 insertions(+), 96 deletions(-)
```

</details>
