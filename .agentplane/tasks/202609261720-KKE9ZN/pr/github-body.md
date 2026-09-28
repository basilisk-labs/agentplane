Task: `202609261720-KKE9ZN`
Title: Implement and qualify AgentPlane 0.7.12 planning reuse for PL-01 through PL-12
Canonical task record: `.agentplane/tasks/202609261720-KKE9ZN/README.md`

## Summary

Implement and qualify AgentPlane 0.7.12 planning reuse for PL-01 through PL-12

User authorizes all necessary work to implement and release 0.7.12 without repeated permission requests. Use agentplane-roadmap-r2/tasks/PL-01.md through PL-12.md and EXECUTION-CHARTER.md as the scope contract. Inspect current main and accepted LC-24 evidence, preserve one Kernel and coordinator, reuse compact Plan proposal normalization, retain approval and EVALUATOR floors, implement managed and external planning reuse and recovery, run installed-package and release-critical qualification, record M04 measurement with honest unknown accounting, and document observed behavior. Use sequential independently verifiable WorkItems. Include bootstrap lockfile workspace version reconciliation. Release publication follows exact-SHA release checks in a subsequent release task. Do not implement 0.7.13 or 0.7.14.

## Scope

- In scope: User authorizes all necessary work to implement and release 0.7.12 without repeated permission requests. Use agentplane-roadmap-r2/tasks/PL-01.md through PL-12.md and EXECUTION-CHARTER.md as the scope contract. Inspect current main and accepted LC-24 evidence, preserve one Kernel and coordinator, reuse compact Plan proposal normalization, retain approval and EVALUATOR floors, implement managed and external planning reuse and recovery, run installed-package and release-critical qualification, record M04 measurement with honest unknown accounting, and document observed behavior. Use sequential independently verifiable WorkItems. Include bootstrap lockfile workspace version reconciliation. Release publication follows exact-SHA release checks in a subsequent release task. Do not implement 0.7.13 or 0.7.14.
- Out of scope: unrelated refactors not required for "Implement and qualify AgentPlane 0.7.12 planning reuse for PL-01 through PL-12".

## Verification

- State: ok
- Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-28T14:27:10.809Z
- Branch: task/202609261720-KKE9ZN/implement-and-qualify-agentplane-0-7-12-planning
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 bun.lock                                           |   6 +-
 docs/developer/incident-archive.mdx                |  10 +
 docs/releases/planning-0.7.12-handoff.md           |  59 ++++
 .../planning-0.7.12-integrated-qualification.md    | 219 +++++++++++++++
 docs/releases/v0.7.12-m04.md                       |  87 ++++++
 docs/user/agent-bootstrap.generated.mdx            |   6 +-
 docs/user/cli-reference.generated.mdx              |   1 +
 docs/user/task-lifecycle.mdx                       |  63 ++++-
 docs/user/workflow.mdx                             |  75 +++--
 .../task-backend/kernel-backend-adapter.ts         |  10 +-
 .../src/adapters/task-backend/kernel-documents.ts  |  18 ++
 packages/agentplane/src/cli/bootstrap-guide.ts     |   6 +-
 packages/agentplane/src/cli/cli-smoke.test.ts      |   4 +-
 packages/agentplane/src/cli/command-guide.test.ts  |   5 +
 .../src/cli/run-cli.core.kernel-transport.test.ts  |   9 +-
 ...core.task-advance.roadmap-supplied-plan.test.ts |  88 ++++++
 ...i.core.task-advance.worktree-resolution.test.ts |  27 +-
 .../src/cli/run-cli.core.task-hosted-close.test.ts |   6 +-
 .../agentplane/src/cli/supplied-plan.testkit.ts    |  56 ++++
 packages/agentplane/src/commands/acr/generate.ts   |   6 +
 .../commands/branch/work-resume-planning-base.ts   |  36 +++
 .../evaluator-execute-subprocess.testkit.ts        | 161 ++++++++++-
 .../evaluator/evaluator-execute-supervisor.ts      |  13 +
 .../evaluator/evaluator-execute.command.test.ts    | 223 +++++----------
 .../shared/canonical-pre-merge-evidence.ts         |  28 +-
 .../src/commands/task/advance-task-step.ts         |   3 +
 .../agentplane/src/commands/task/brief.command.ts  |   2 +-
 .../src/commands/task/create-plan-input.test.ts    | 307 +++++++++++++++++++++
 .../src/commands/task/create-plan-input.testkit.ts |  32 +++
 .../src/commands/task/create-plan-input.ts         |  81 ++++++
 .../src/commands/task/create-plan-proposal.ts      |  99 +++++++
 .../agentplane/src/commands/task/create.command.ts |  31 ++-
 .../direct-task-verification.sequence.cases.ts     |  24 ++
 .../src/commands/task/direct-task-verification.ts  |   2 +
 .../agentplane/src/commands/task/finish-execute.ts |  12 +-
 .../task/finish.canonical-closure.unit.test.ts     | 170 ++++++++++++
 .../agentplane/src/commands/task/kernel-create.ts  |  17 +-
 .../src/commands/task/kernel-inspection.ts         |  20 +-
 .../src/commands/task/kernel-plan-proposal.ts      |  20 ++
 .../task/kernel-plan-supplied-approval.test.ts     | 189 +++++++++++++
 .../agentplane/src/commands/task/kernel-plan.ts    |  61 ++--
 .../commands/task/kernel-planning-recovery.test.ts | 125 +++++++++
 .../src/commands/task/kernel-planning-view.test.ts | 234 ++++++++++++++++
 .../src/commands/task/kernel-planning-view.ts      | 197 +++++++++++++
 .../agentplane/src/commands/task/kernel-read.ts    |  20 +-
 .../src/commands/task/kernel-run.testkit.ts        |  13 +-
 .../src/commands/task/kernel-semantic-result.ts    |   6 +
 .../src/commands/task/kernel-supplied-plan.ts      |  60 ++++
 .../src/commands/task/kernel-work-order.ts         |  14 +-
 packages/agentplane/src/commands/task/new.ts       |   3 +-
 .../src/commands/task/next-action.command.ts       |   2 +-
 .../src/commands/task/planning-capabilities.ts     |   1 +
 packages/agentplane/src/commands/task/ready.ts     |   2 +-
 .../roadmap-inline-plan-materialization.test.ts    | 151 ++++++++++
 .../src/commands/task/run-required-planner.test.ts | 158 +++++++++++
 .../src/commands/task/run-supplied-plan.test.ts    |  93 +++++++
 .../src/commands/task/show-kernel.test.ts          |   3 +
 packages/agentplane/src/commands/task/show.ts      |   2 +
 .../agentplane/src/commands/task/status.command.ts |   2 +-
 .../commands/task/task-centric-external-result.ts  |   2 +-
 .../src/runner/usecases/kernel-task-lifecycle.ts   |  21 +-
 .../src/runner/usecases/task-run-authority.ts      |  28 ++
 packages/core/src/runner/agent-work-order.ts       |   4 +-
 packages/core/src/tasks/index.ts                   |   3 +
 packages/core/src/tasks/kernel-semantic.ts         |   7 +-
 .../tasks/task-centric/planning-obligation.test.ts | 102 +++++++
 packages/core/src/tasks/task-centric/policy.ts     |  55 ++++
 packages/core/src/tasks/task-centric/schema.ts     |  38 +++
 schemas/agent-semantic-result.schema.json          |  12 +
 .../baselines/v0.7-compatibility-candidate.json    |  29 +-
 scripts/checks/check-agent-onboarding-scenario.mjs |  21 +-
 .../check-compatibility-contract-baseline.mjs      |  15 +
 scripts/lib/installed-migration-matrix.mjs         |  25 +-
 scripts/lib/installed-planning-matrix.mjs          | 216 +++++++++++++++
 scripts/lib/test-route-registry.mjs                |  10 +
 scripts/lib/test-route-registry.test.mjs           |  41 ++-
 .../check-packaged-mixed-scope-lifecycle.mjs       |   4 +
 .../release/check-local-tarball-install-smoke.mjs  |  24 +-
 website/static/llms-full.txt                       | 138 +++++++--
 79 files changed, 3833 insertions(+), 340 deletions(-)
```

</details>
