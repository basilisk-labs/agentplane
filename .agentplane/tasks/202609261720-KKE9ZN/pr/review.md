# PR Review

Created: 2026-09-27T19:16:20.496Z

## Task

- Task: `202609261720-KKE9ZN`
- Title: Implement and qualify AgentPlane 0.7.12 planning reuse for PL-01 through PL-12
- Status: DOING
- Branch: `task/202609261720-KKE9ZN/implement-and-qualify-agentplane-0-7-12-planning`
- Canonical task record: `.agentplane/tasks/202609261720-KKE9ZN/README.md`

## Verification

- State: ok
- Note: Canonical validation sha256:5dd197e110bdc7f9da6def8e00d6cb750262e3a84ca44254bf23d29bf3d9141f
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-27T19:16:20.496Z
- Branch: task/202609261720-KKE9ZN/implement-and-qualify-agentplane-0-7-12-planning
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 bun.lock                                           |   6 +-
 docs/releases/planning-0.7.12-handoff.md           |  59 ++++
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
 .../agentplane/src/cli/supplied-plan.testkit.ts    |  56 ++++
 packages/agentplane/src/commands/acr/generate.ts   |   6 +
 .../commands/branch/work-resume-planning-base.ts   |  36 +++
 .../src/commands/task/advance-task-step.ts         |   3 +
 .../agentplane/src/commands/task/brief.command.ts  |   2 +-
 .../src/commands/task/create-plan-input.test.ts    | 307 +++++++++++++++++++++
 .../src/commands/task/create-plan-input.testkit.ts |  32 +++
 .../src/commands/task/create-plan-input.ts         |  81 ++++++
 .../src/commands/task/create-plan-proposal.ts      |  99 +++++++
 .../agentplane/src/commands/task/create.command.ts |  31 ++-
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
 scripts/checks/check-agent-onboarding-scenario.mjs |  21 +-
 scripts/lib/installed-migration-matrix.mjs         |  25 +-
 scripts/lib/installed-planning-matrix.mjs          | 216 +++++++++++++++
 scripts/lib/test-route-registry.mjs                |   7 +
 .../release/check-local-tarball-install-smoke.mjs  |  24 +-
 website/static/llms-full.txt                       | 138 +++++++--
 64 files changed, 3051 insertions(+), 162 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
