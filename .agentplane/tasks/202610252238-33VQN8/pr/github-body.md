Task: `202610252238-33VQN8`
Title: Repair canonical no-executable-check verification contracts and recovery for issue #6927
Canonical task record: `.agentplane/tasks/202610252238-33VQN8/README.md`

## Summary

Repair canonical no-executable-check verification contracts and recovery for issue #6927

Make empty executable-check handling policy-aware at canonical plan admission, final validation and verification projection. Add authorized recovery for already approved affected tasks with all WorkItems complete, preserving immutable contracts, failed evidence and freshness. Cover code/analysis/report contracts, implicit checks, repeated resume and negative authority cases.

## Scope

- In scope: Make empty executable-check handling policy-aware at canonical plan admission, final validation and verification projection. Add authorized recovery for already approved affected tasks with all WorkItems complete, preserving immutable contracts, failed evidence and freshness. Cover code/analysis/report contracts, implicit checks, repeated resume and negative authority cases.
- Out of scope: unrelated refactors not required for "Repair canonical no-executable-check verification contracts and recovery for issue #6927".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-26T08:19:23.922Z
- Branch: task/202610252238-33VQN8/repair-canonical-no-executable-check-verificatio
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../shared/task-verification-records.test.ts       |  86 +++++++++-
 .../commands/shared/task-verification-records.ts   |  55 ++++++-
 .../commands/shared/verification-details.test.ts   |  18 +-
 .../src/commands/shared/verification-details.ts    |  19 +++
 .../src/commands/task/create-plan-proposal.test.ts |   3 +
 .../src/commands/task/create-plan-proposal.ts      |  16 +-
 .../task/direct-task-verification-checks.ts        |   9 +
 .../task/direct-task-verification-empty.test.ts    |  43 +++++
 .../commands/task/direct-task-verification.test.ts |   1 +
 .../src/commands/task/direct-task-verification.ts  |   8 +-
 .../commands/task/kernel-final-validation.test.ts  | 183 +++++++++++++++++++++
 .../src/commands/task/kernel-final-validation.ts   | 166 +++++++++++++++++--
 .../task/kernel-inspection-validation.test.ts      |  18 ++
 .../commands/task/kernel-inspection-validation.ts  |   7 +-
 .../src/commands/task/kernel-inspection.test.ts    |   5 +-
 .../src/commands/task/kernel-inspection.ts         |   5 +
 .../src/commands/task/kernel-no-check-policy.ts    |  29 ++++
 .../commands/task/kernel-no-check-recovery.test.ts | 120 ++++++++++++++
 .../commands/task/kernel-plan-authority.test.ts    |  92 +++++++++++
 .../src/commands/task/kernel-plan-authority.ts     |  60 ++++++-
 .../agentplane/src/commands/task/kernel-plan.ts    |   6 +-
 .../src/commands/task/kernel-planning-view.test.ts |   2 +-
 .../src/commands/task/kernel-semantic-result.ts    |   6 +-
 .../task/verify-record.durability.unit.test.ts     |   1 +
 .../task/verify-record.no-check-durability.test.ts | 182 ++++++++++++++++++++
 25 files changed, 1103 insertions(+), 37 deletions(-)
```

</details>
