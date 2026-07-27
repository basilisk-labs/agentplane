Task: `202607242158-QV09NA`
Title: Resolve durable runner effects in doubt without duplicate execution
Canonical task record: `.agentplane/tasks/202607242158-QV09NA/README.md`

## Summary

Resolve durable runner effects in doubt without duplicate execution

Consume the typed effect journal produced by 202607242204-SX8T09 and resolve it only through an authority-bound operator-supplied applied or not_applied verdict, resumable exclusive lease, durable evidence and exactly-once claim retirement without invoking the adapter.

## Scope

- In scope: consume the typed effect operation/journal from task 202607242204-SX8T09 and resolve an unresolved runner effect without invoking the adapter.
- Persist immutable resolution intent and final resolution records bound to operation/idempotency, authority, StateFingerprint, claim generation and content-digested evidence.
- Acquire an exclusive resumable generation lease for the same intent digest; conflicting verdicts or generations must fail closed.
- Accept only explicit typed operator verdicts applied or not_applied with actor, operator_supplied provenance, evidence references and observed time; the CLI must never choose a verdict.
- Attach the resolution to run state before claim retirement; restart after every durable phase must resume idempotently and retire at most once.
- Provide bounded human/JSON status and an explicit resolve-effect/resume surface; no timeout, reconcile, cancel or generic run path may release the claim automatically.
- Out of scope: effect journal creation, RF-13 authority policy itself, or provider-side exactly-once guarantees.

## Verification

- State: ok
- Note:

```text
Local verification passed: 65 focused resolution/operation/state tests, 32 unresolved-effect
cancel/reconcile/concurrency tests, critical CLI suite, lifecycle invariants, guards, typecheck,
compatibility baseline, formatter, and diff check. Concurrent identical intents converge;
conflicting verdicts reject without adapter execution.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-27T05:40:19.493Z
- Branch: task/202607242158-QV09NA/resolve-durable-runner-effects-in-doubt-without
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...-cli.critical.agent-efficiency-baseline.test.ts |   7 +-
 .../src/cli/run-cli/command-catalog/task.ts        |  14 +
 .../src/cli/run-cli/command-loaders/task.ts        |   8 +
 .../src/commands/shared/route-decision-blockers.ts |  11 +-
 .../route-decision-blockers.worktree.test.ts       |  28 +-
 .../shared/route-decision-next-action.test.ts      |   1 +
 .../src/commands/shared/route-decision.ts          |  14 +-
 .../src/commands/shared/workflow-step-branch.ts    |   7 +
 .../src/commands/shared/workflow-step-factory.ts   |  25 +
 .../workflow-step-projections-routing.test.ts      | 162 ++++++
 ...rkflow-step-projections.conflict-rework.test.ts |  13 +-
 .../shared/workflow-step-projections.test.ts       |  79 +--
 .../src/commands/shared/workflow-step.test.ts      |   8 +
 .../agentplane/src/commands/task/run-render.ts     |   7 +
 .../agentplane/src/commands/task/run.command.ts    |   7 +
 .../task/task-run-effect-resolution.command.ts     | 282 ++++++++++
 packages/agentplane/src/runner/effect-operation.ts |  47 +-
 .../agentplane/src/runner/run-state-validation.ts  |  29 +-
 packages/agentplane/src/runner/types/state.ts      |   7 +
 .../usecases/task-run-active-claim-authority.ts    |  16 +-
 .../usecases/task-run-active-claim-record.ts       |   8 +-
 .../src/runner/usecases/task-run-active-claim.ts   |   8 +-
 .../src/runner/usecases/task-run-effect-journal.ts |   3 +
 .../usecases/task-run-effect-resolution-claim.ts   | 142 +++++
 .../usecases/task-run-effect-resolution.test.ts    | 321 +++++++++++
 .../runner/usecases/task-run-effect-resolution.ts  | 594 +++++++++++++++++++++
 .../runner/usecases/task-run-lifecycle-replay.ts   |  48 ++
 .../runner/usecases/task-run-lifecycle-shared.ts   |   9 +-
 .../src/runner/usecases/task-run-lifecycle.ts      |   1 +
 .../src/runner/usecases/task-run-replay-anchor.ts  |   8 +-
 .../agentplane/src/runner/usecases/task-run.ts     |   8 +
 packages/core/src/index.ts                         |  23 +
 .../core/src/runner/runner-effect-operation.ts     | 263 ++++++++-
 .../src/runner/runner-effect-resolution.test.ts    |  75 +++
 packages/core/src/schemas/index.ts                 |  23 +
 .../baselines/v0.7-compatibility-candidate.json    | 376 ++++++++++++-
 .../check-compatibility-contract-baseline.mjs      | 184 +++++++
 37 files changed, 2783 insertions(+), 83 deletions(-)
```

</details>
