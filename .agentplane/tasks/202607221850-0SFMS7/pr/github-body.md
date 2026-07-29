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

- State: needs_rework
- Note:

```text
Independent EVALUATOR returned rework: RC-001 finalization is journal-only, RC-002 verification
lacks declared-check evidence, RC-003 lacks golden-path metrics and stale-route coverage.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-29T01:36:05.310Z
- Branch: task/202607221850-0SFMS7/supervise-direct-task-execution-end-to-end
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../run-cli.core.direct-task-supervision.test.ts   |  68 +++
 ...cli.core.route-decision.direct-closeout.test.ts |  32 +-
 .../src/commands/shared/workflow-step-factory.ts   |  20 +-
 .../shared/workflow-step-projections.test.ts       |  16 +-
 .../commands/task/direct-task-finalization.test.ts | 154 +++++
 .../src/commands/task/direct-task-finalization.ts  | 186 ++++++
 .../task/direct-task-supervision-benchmark.test.ts |  97 ++++
 .../task/direct-task-supervision-benchmark.ts      |  65 +++
 .../task/direct-task-supervisor-closeout.test.ts   | 100 ++++
 .../task/direct-task-supervisor-closeout.ts        | 335 +++++++++++
 .../direct-task-supervisor-formal-operation.ts     | 101 ++++
 .../task/direct-task-supervisor-observation.ts     |  64 ++
 .../commands/task/direct-task-supervisor.test.ts   | 641 +++++++++++++++++++++
 .../src/commands/task/direct-task-supervisor.ts    | 586 +++++++++++++++++++
 .../commands/task/direct-task-verification.test.ts | 104 ++++
 .../src/commands/task/direct-task-verification.ts  | 131 +++++
 .../agentplane/src/commands/task/run.command.ts    |  44 +-
 .../runner/usecases/task-run-active-claim.test.ts  |  44 +-
 18 files changed, 2713 insertions(+), 75 deletions(-)
```

</details>
