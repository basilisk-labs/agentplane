Task: `202608021534-YN84E1`
Title: Harden the v0.7.1 guided lifecycle and canonical help surface
Canonical task record: `.agentplane/tasks/202608021534-YN84E1/README.md`

## Summary

Harden the v0.7.1 guided lifecycle and canonical help surface

Make task begin stop at a real semantic planning boundary, make task complete fail closed without observed checks plus evaluator or explicit human receipt, keep compatibility flows advanced-only, and cap default help at 10-12 canonical operations centered on task advance and task run.

## Scope

- In scope: Make task begin stop at a real semantic planning boundary, make task complete fail closed without observed checks plus evaluator or explicit human receipt, keep compatibility flows advanced-only, and cap default help at 10-12 canonical operations centered on task advance and task run.
- Out of scope: unrelated refactors not required for "Harden the v0.7.1 guided lifecycle and canonical help surface".

## Verification

- State: ok
- Note:

```text
PASS after evaluator rework at 534adaa8862d: focused cli-core 41/41; typecheck, lint:core, docs
CLI/bootstrap/IA, routing, product contract, compatibility ratchet, and critical-cli 77/77 passed.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-02T20:12:03.264Z
- Branch: task/202608021534-YN84E1/harden-the-v0-7-1-guided-lifecycle-and-canonical
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 README.md                                          |   3 +-
 docs/user/cli-reference.generated.mdx              |   7 +-
 docs/user/commands.mdx                             |   7 +-
 docs/user/task-lifecycle.mdx                       |  30 ++-
 docs/user/workflow.mdx                             |   4 +
 .../run-cli.core.help-snap.test.ts.snap            | 205 +----------------
 packages/agentplane/src/cli/command-guide.ts       |   4 +-
 .../src/cli/run-cli.core.help-contract.test.ts     |  49 ++--
 .../src/cli/run-cli.core.task-advance.test.ts      |   9 +-
 .../src/cli/run-cli.core.task-guided.test.ts       | 251 +++++++++++++++++++--
 ...-cli.critical.agent-efficiency-baseline.test.ts |  11 +-
 packages/agentplane/src/cli/run-cli.ts             |   3 +-
 .../src/cli/run-cli/command-catalog-helpers.ts     |   7 +
 .../src/cli/run-cli/command-catalog-loader.ts      |   2 +
 .../run-cli/command-catalog/context-evaluator.ts   |   1 +
 .../src/cli/run-cli/command-catalog/core.ts        |   7 +-
 .../src/cli/run-cli/command-catalog/kernel.ts      |   5 +
 .../src/cli/run-cli/command-catalog/task.ts        |   6 +
 packages/agentplane/src/cli/spec/help.ts           |   6 +-
 .../src/commands/shared/route-execution-packet.ts  |   9 +-
 .../src/commands/shared/workflow-step-reducer.ts   |  29 +++
 .../src/commands/shared/workflow-step.ts           |   1 +
 .../src/commands/task/agent-action-packet.ts       |   3 +
 .../agentplane/src/commands/task/begin.command.ts  |  53 ++---
 .../src/commands/task/branch-task-supervisor.ts    |  13 ++
 packages/agentplane/src/commands/task/comment.ts   |  13 +-
 .../src/commands/task/complete.command.ts          |  87 +++++--
 .../commands/task/direct-task-supervisor-result.ts |  21 +-
 .../agentplane/src/commands/task/doc-template.ts   |  25 +-
 .../agentplane/src/commands/task/plan-shared.ts    |  14 ++
 .../agentplane/src/commands/task/run.command.ts    |   1 +
 packages/agentplane/src/commands/task/run.spec.ts  |   1 +
 .../agentplane/src/commands/task/task.command.ts   |   5 +-
 .../src/runner/usecases/agent-work-order-build.ts  |   2 +-
 .../baselines/v0.7-compatibility-candidate.json    |  29 ++-
 .../check-compatibility-contract-baseline.mjs      |  17 +-
 .../check-v0.7.1-product-contract.mjs              |  71 ++++++
 scripts/release/generate-cli-help-catalog.mjs      |   1 +
 38 files changed, 651 insertions(+), 361 deletions(-)
```

</details>
