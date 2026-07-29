Task: `202607221850-0SFMS7`
Title: Supervise direct task execution end to end
Canonical task record: `.agentplane/tasks/202607221850-0SFMS7/README.md`

## Summary

Supervise direct task execution end to end

RF-10a: implement the direct golden path from approved state through safe pre-operations, EXECUTOR work order, observed receipt, evaluator, post-operations, and typed approval/wait/human stops.

## Scope

- In scope: direct workflow lifecycle automation, state refresh after each operation, zero EXECUTOR lifecycle calls, start/check/evaluate/finalize operations, retries, approvals, waits, human input, and golden scenario metrics.
- Out of scope: branch_pr provider/PR/merge integration.

## Verification

- State: ok
- Note:

```text
RF-10a closure target classification now preserves verified implementation evidence across lifecycle
artifacts; focused and full regression gates passed on 57637d153.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-29T01:36:05.310Z
- Branch: task/202607221850-0SFMS7/supervise-direct-task-execution-end-to-end
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../run-cli.core.direct-task-supervision.test.ts   |  68 ++
 ...cli.core.route-decision.direct-closeout.test.ts |  32 +-
 .../evaluator/evaluator-episode.stdin.test.ts      |  37 +-
 .../src/commands/evaluator/evaluator-episode.ts    |  26 +-
 .../evaluator/evaluator-review-artifacts.ts        | 153 ++++
 .../commands/evaluator/evaluator-review-shared.ts  |  28 +
 .../commands/evaluator/evaluator-review-usecase.ts | 191 +++--
 .../evaluator/evaluator-run.command.test.ts        |  43 ++
 .../evaluator/evaluator-runtime-evidence.test.ts   | 133 ++++
 .../evaluator/evaluator-verification-records.ts    |  80 +-
 .../commands/shared/quality-review-target.test.ts  |  27 +
 .../src/commands/shared/quality-review-target.ts   |  25 +-
 .../src/commands/shared/workflow-step-factory.ts   |  20 +-
 .../shared/workflow-step-projections.test.ts       |  16 +-
 .../commands/task/direct-task-finalization.test.ts | 238 ++++++
 .../src/commands/task/direct-task-finalization.ts  | 365 +++++++++
 .../task/direct-task-supervision-benchmark.test.ts |  94 +++
 .../task/direct-task-supervision-benchmark.ts      |  60 ++
 .../direct-task-supervision-measurement.test.ts    |  36 +
 .../task/direct-task-supervision-measurement.ts    |  76 ++
 .../task/direct-task-supervisor-closeout.test.ts   | 178 +++++
 .../task/direct-task-supervisor-closeout.ts        | 452 ++++++++++++
 .../task/direct-task-supervisor-evaluator.ts       |  73 ++
 ...direct-task-supervisor-formal-operation.test.ts | 147 ++++
 .../direct-task-supervisor-formal-operation.ts     | 116 +++
 .../task/direct-task-supervisor-implementation.ts  |  56 ++
 .../direct-task-supervisor-observation.test.ts     |  48 ++
 .../task/direct-task-supervisor-observation.ts     |  69 ++
 .../commands/task/direct-task-supervisor-result.ts | 140 ++++
 .../commands/task/direct-task-supervisor.test.ts   | 819 +++++++++++++++++++++
 .../src/commands/task/direct-task-supervisor.ts    | 522 +++++++++++++
 .../commands/task/direct-task-verification.test.ts | 138 ++++
 .../src/commands/task/direct-task-verification.ts  | 168 +++++
 .../agentplane/src/commands/task/run.command.ts    |  44 +-
 .../src/runner/context/task-context.test.ts        |   1 -
 .../agentplane/src/runner/context/task-context.ts  |  10 +-
 .../runner/usecases/task-run-active-claim.test.ts  |  44 +-
 .../task-run-bootstrap.result-examples.test.ts     |  14 +-
 .../src/runner/usecases/task-run-bootstrap.ts      |  11 +-
 .../usecases/task-run-context.integration.test.ts  |   3 +
 .../agentplane/src/runner/usecases/task-run.ts     |   6 -
 scripts/baselines/clone-baseline.json              |  24 +-
 42 files changed, 4610 insertions(+), 221 deletions(-)
```

</details>
