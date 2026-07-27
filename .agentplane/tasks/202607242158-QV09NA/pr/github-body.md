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

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-27T05:40:19.493Z
- Branch: task/202607242158-QV09NA/resolve-durable-runner-effects-in-doubt-without
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/shared/route-decision-blockers.ts | 11 +++-
 .../route-decision-blockers.worktree.test.ts       | 28 ++++++++-
 .../src/commands/shared/route-decision.ts          |  9 ---
 .../src/commands/shared/workflow-step-branch.ts    |  7 +++
 .../src/commands/shared/workflow-step-factory.ts   | 25 ++++++++
 .../shared/workflow-step-projections.test.ts       | 69 +++++++++++++++++++++-
 6 files changed, 134 insertions(+), 15 deletions(-)
```

</details>
