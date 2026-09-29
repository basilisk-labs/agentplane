Task: `202609271719-KR98XR`
Title: Qualify canonical final verification contract alignment for 0.7.12
Canonical task record: `.agentplane/tasks/202609271719-KR98XR/README.md`

## Summary

Qualify canonical final verification contract alignment for 0.7.12

Supersede legacy intake BET6F3 with explicit scope. Consolidate the reviewed source repair commit 9bcd4d494946a46624f641ae881769fd2ede06f8 without copying native artifacts. Fix kernel-final-validation.ts to resolve the branch_pr Verification Contract before executing checks and use that same contract for projection. Current full CI passes but projection rejects missing full_regression. Fix persistence ordering so a projection failure cannot leave reusable final validation. Add focused regression tests for actual contract strengthening, genuine full-suite attribution, rejection of narrow checks and safe retry after projection failure. Preserve all prior task artifacts and historical baselines. Run focused checks and native full CI. User explicitly authorizes code-fixable release blockers. Do not publish.

## Scope

- In scope: Supersede legacy intake BET6F3 with explicit scope. Consolidate the reviewed source repair commit 9bcd4d494946a46624f641ae881769fd2ede06f8 without copying native artifacts. Fix kernel-final-validation.ts to resolve the branch_pr Verification Contract before executing checks and use that same contract for projection. Current full CI passes but projection rejects missing full_regression. Fix persistence ordering so a projection failure cannot leave reusable final validation. Add focused regression tests for actual contract strengthening, genuine full-suite attribution, rejection of narrow checks and safe retry after projection failure. Preserve all prior task artifacts and historical baselines. Run focused checks and native full CI. User explicitly authorizes code-fixable release blockers. Do not publish.
- Out of scope: unrelated refactors not required for "Qualify canonical final verification contract alignment for 0.7.12".

## Verification

- State: ok
- Note: Verified: canonical Task Kernel final checks passed.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-27T18:47:24.980Z
- Branch: task/202609271719-KR98XR/qualify-canonical-final-verification-contract-al
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...-cli.critical.agent-efficiency-baseline.test.ts |   2 +-
 .../cli/run-cli/command-catalog/task-recovery.ts   |  20 ++
 .../src/cli/run-cli/command-catalog/task.ts        |  10 +-
 .../src/cli/run-cli/command-loaders/task.ts        |   4 +
 .../src/cli/verification-contract.test.ts          |   7 +-
 .../src/commands/shared/pr-meta/verify-log.test.ts |   8 +-
 .../src/commands/shared/pr-meta/verify-log.ts      |   2 +
 .../src/commands/shared/reconcile-check.test.ts    |  70 ++++--
 .../src/commands/shared/reconcile-check.ts         |   2 +-
 .../src/commands/task/advance-task-step.ts         |   8 +
 .../commands/task/direct-task-verification.test.ts |  10 +-
 .../src/commands/task/direct-task-verification.ts  |   2 +
 .../src/commands/task/kernel-exchange.ts           |   4 +-
 .../commands/task/kernel-final-validation.test.ts  | 205 +++++++++++++++++-
 .../src/commands/task/kernel-final-validation.ts   |  53 +++--
 .../commands/task/kernel-plan-authority.test.ts    |  87 +++++++-
 .../src/commands/task/kernel-plan-authority.ts     |  50 +++++
 .../commands/task/kernel-recovery-evidence.test.ts | 241 +++++++++++++++++++++
 .../src/commands/task/kernel-recovery-evidence.ts  | 145 +++++++++++++
 .../task/kernel-work-item-resume.command.ts        |  71 ++++++
 .../commands/task/kernel-work-item-resume.test.ts  | 180 +++++++++++++++
 .../src/commands/task/kernel-work-item-resume.ts   | 117 ++++++++++
 .../src/commands/task/plan-approve.command.ts      |  23 +-
 packages/core/src/git/base-branch.test.ts          |  13 ++
 packages/core/src/git/base-branch.ts               |   4 +-
 packages/core/src/tasks/task-readme-io.test.ts     |   4 +-
 .../baselines/v0.7-compatibility-candidate.json    | 100 ++++++++-
 .../check-compatibility-contract-baseline.mjs      |  57 +++++
 scripts/checks/run-local-ci-group.mjs              |   6 +
 29 files changed, 1419 insertions(+), 86 deletions(-)
```

</details>
