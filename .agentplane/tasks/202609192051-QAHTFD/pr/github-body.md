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

- State: ok
- Note: Verified: canonical Task Kernel final checks passed.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-19T20:59:01.339Z
- Branch: task/202609192051-QAHTFD/canonical-qahtfd
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/pr/integrate/internal/prepare.ts  |   1 +
 .../shared/canonical-pre-merge-evidence.test.ts    | 118 +++++++++++++++++
 .../shared/canonical-pre-merge-evidence.ts         |   3 +-
 .../commands/shared/quality-review-target.test.ts  |  46 +++++++
 .../src/commands/shared/quality-review-target.ts   |  24 +++-
 .../src/commands/shared/route-decision-blockers.ts |   1 +
 .../src/commands/shared/workflow-step-branch.ts    |  49 +++----
 .../src/commands/shared/workflow-step.test.ts      |  24 ++++
 .../commands/task/direct-task-finalization.test.ts |  47 ++++++-
 .../src/commands/task/direct-task-finalization.ts  |   8 +-
 .../commands/task/direct-task-verification.test.ts |  79 +++++++++++
 .../src/commands/task/direct-task-verification.ts  |  80 +++++++++++-
 .../commands/task/hosted-close-premerge.test.ts    |  78 ++++++++++-
 .../src/commands/task/hosted-close-premerge.ts     |  50 ++++++-
 .../src/commands/task/kernel-advance.test.ts       |  97 +++++++++++++-
 .../agentplane/src/commands/task/kernel-advance.ts | 145 +++++++++++++++++++++
 .../task/kernel-repository-coordinator.test.ts     |  28 +++-
 .../commands/task/kernel-repository-coordinator.ts |   5 +-
 18 files changed, 828 insertions(+), 55 deletions(-)
```

</details>
