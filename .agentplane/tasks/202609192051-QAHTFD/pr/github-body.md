Task: `202609192051-QAHTFD`
Title: Productize release-blocking AgentPlane controller fixes for 0.7.10
Canonical task record: `.agentplane/tasks/202609192051-QAHTFD/README.md`

## Summary

Productize release-blocking AgentPlane controller fixes for 0.7.10

Integrate and regression-test the temporary runtime fixes required to complete branch_pr publication: canonical task worktree recovery, hook-retry staging refresh, rewritten managed-artifact commit identity, canonical pre-merge evidence compatibility, hosted-close closure basis, and exact-HEAD release qualification. Preserve fail-closed authority and scope checks. Then take the change through PR integration as the final prerequisite for release 0.7.10.

## Scope

- In scope: Integrate and regression-test the temporary runtime fixes required to complete branch_pr publication: canonical task worktree recovery, hook-retry staging refresh, rewritten managed-artifact commit identity, canonical pre-merge evidence compatibility, hosted-close closure basis, and exact-HEAD release qualification. Preserve fail-closed authority and scope checks. Then take the change through PR integration as the final prerequisite for release 0.7.10.
- Out of scope: unrelated refactors not required for "Productize release-blocking AgentPlane controller fixes for 0.7.10".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-19T20:59:01.339Z
- Branch: task/202609192051-QAHTFD/canonical-qahtfd
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/pr/integrate/internal/prepare.ts  |   1 +
 .../shared/canonical-pre-merge-evidence.ts         |   3 +-
 .../src/commands/shared/quality-review-target.ts   |  22 +++-
 .../src/commands/shared/route-decision-blockers.ts |   1 +
 .../src/commands/shared/workflow-step-branch.ts    |  49 +++----
 .../src/commands/task/direct-task-verification.ts  |  59 ++++++++-
 .../src/commands/task/hosted-close-premerge.ts     |  42 +++++-
 .../agentplane/src/commands/task/kernel-advance.ts | 145 +++++++++++++++++++++
 .../commands/task/kernel-repository-coordinator.ts |   3 +
 9 files changed, 283 insertions(+), 42 deletions(-)
```

</details>
