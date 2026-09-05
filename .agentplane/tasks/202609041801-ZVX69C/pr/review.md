# PR Review

Created: 2026-09-04T18:17:29.251Z

## Task

- Task: `202609041801-ZVX69C`
- Title: Repair post-integration Clean Core task-cycle regression and restore final release-readiness verification
- Status: DONE
- Branch: `task/202609041801-ZVX69C/repair-post-integration-clean-core-task-cycle-re`
- Canonical task record: `.agentplane/tasks/202609041801-ZVX69C/README.md`

## Verification

- State: ok
- Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-04T20:10:20.939Z
- Branch: task/202609041801-ZVX69C/repair-post-integration-clean-core-task-cycle-re
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../task-centric-backend-adapter.test.ts           |  39 ++
 .../task-backend/task-centric-backend-adapter.ts   |   6 +-
 .../task-backend/task-centric-backend-runtime.ts   |  78 ++++
 .../src/cli/release-critical-lifecycle.test.ts     |  14 +
 .../agentplane/src/cli/route-decision.testkit.ts   |  22 ++
 .../src/cli/run-cli.core.lifecycle.plan.test.ts    | 135 +++++--
 ...n-cli.core.pr-flow.integrate-validation.test.ts |   9 +-
 .../cli/run-cli.core.pr-flow.pr-validation.test.ts |   6 +-
 .../run-cli.core.route-decision.quality.test.ts    | 132 ++++---
 ...n-cli.core.task-advance.branch-worktree.test.ts |  83 +++-
 ...n-cli.core.task-advance.evidence-rework.test.ts | 105 ++++-
 .../src/cli/run-cli.critical.task-centric.test.ts  |  22 +-
 .../evaluator/evaluator-runtime-evidence.test.ts   |  11 +-
 .../commands/evaluator/evaluator-test-helpers.ts   |  11 +-
 .../commands/pr/conflict-rework-base-context.ts    |   7 +-
 .../pr/conflict-rework-route-eligibility.ts        |   6 +-
 .../src/commands/pr/conflict-rework.test.ts        |  44 +++
 .../agentplane/src/commands/pr/conflict-rework.ts  |  19 +-
 .../src/commands/shared/declared-check.test.ts     |   6 +-
 .../src/commands/shared/declared-check.ts          |  12 +-
 .../shared/task-scope-extension-request.ts         | 263 ++++++++++++-
 .../src/commands/shared/workflow-step-branch.ts    |   3 +-
 .../src/commands/shared/workflow-step-factory.ts   |   6 +-
 .../commands/shared/workflow-step-policy-scope.ts  |  16 +
 .../src/commands/shared/workflow-step.test.ts      |  88 +++++
 .../src/commands/task/direct-task-verification.ts  |  19 +-
 .../commands/task/evidence-only-rework-commit.ts   |  31 ++
 .../external-agent-implementation-recovery.test.ts |  85 ++++-
 .../task/external-agent-implementation-recovery.ts | 120 +++---
 .../agentplane/src/commands/task/plan-shared.ts    |   3 +-
 packages/agentplane/src/commands/task/plan.ts      |  35 +-
 .../agentplane/src/commands/task/plan.unit.test.ts |  93 +++++
 .../src/commands/task/scope-extend.test.ts         | 424 ++++++++++++++-------
 .../src/commands/task/set-status.unit.test.ts      | 118 +++---
 .../src/commands/task/shared.unit.test.ts          |   1 +
 .../src/commands/task/shared.verify-steps.test.ts  |   8 +
 .../agentplane/src/commands/task/shared/docs.ts    |   2 +
 .../task/shared/workflow-transition-service.ts     |  79 ++++
 .../task/verify-record.durability.unit.test.ts     |  11 +-
 packages/agentplane/src/commands/workflow.test.ts  |  10 +
 .../src/commands/workflow.verify-hooks.test.ts     |  12 +-
 .../src/runner/usecases/agent-work-order-build.ts  |  16 +-
 .../src/runner/usecases/agent-work-order.ts        |   1 +
 .../src/runner/usecases/task-run-authority.ts      |  46 ++-
 .../usecases/task-run-context.integration.test.ts  |   5 +-
 .../agentplane/src/runner/usecases/task-run.ts     |   1 +
 scripts/lib/installed-migration-matrix.mjs         |  16 +
 .../check-packaged-mixed-scope-lifecycle.mjs       |  17 +
 48 files changed, 1904 insertions(+), 392 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
