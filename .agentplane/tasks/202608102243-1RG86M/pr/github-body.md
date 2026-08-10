Task: `202608102243-1RG86M`
Title: Make verification atomic and reusable across lifecycle-only drift
Canonical task record: `.agentplane/tasks/202608102243-1RG86M/README.md`

## Summary

Make verification atomic and reusable across lifecycle-only drift

Persist pass or rework, structured findings, tested input identity, and evidence references in one atomic verification transaction. Define freshness from content-addressed implementation and verification inputs rather than task README revision or lifecycle-only commits; reuse receipts after rebases or metadata-only changes when the relevant patch and declared inputs are identical; invalidate them when code, Verify Steps, configuration, dependencies, environment contract, or evidence changes. DONE tasks must remain terminal and must not route back to verification. Provide deterministic CLI reasons for reuse or invalidation and regression coverage for the ordering defect reproduced in AgentPlane 0.7.5.

## Scope

- In scope: Persist pass or rework, structured findings, tested input identity, and evidence references in one atomic verification transaction. Define freshness from content-addressed implementation and verification inputs rather than task README revision or lifecycle-only commits; reuse receipts after rebases or metadata-only changes when the relevant patch and declared inputs are identical; invalidate them when code, Verify Steps, configuration, dependencies, environment contract, or evidence changes. DONE tasks must remain terminal and must not route back to verification. Provide deterministic CLI reasons for reuse or invalidation and regression coverage for the ordering defect reproduced in AgentPlane 0.7.5.
- Out of scope: unrelated refactors not required for "Make verification atomic and reusable across lifecycle-only drift".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-10T22:44:13.062Z
- Branch: task/202608102243-1RG86M/make-verification-atomic-and-reusable-across-lif
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../evaluator/evaluator-run.command.test.ts        |   2 +-
 .../commands/shared/route-cleanup-probe.test.ts    |  79 +++++
 .../src/commands/shared/route-cleanup-probe.ts     |   4 -
 .../src/commands/shared/route-decision-blockers.ts |  44 ++-
 .../route-decision-blockers.worktree.test.ts       |  34 ++-
 .../shared/route-decision-verification-blocker.ts  |  33 +++
 .../commands/shared/route-decision-verification.ts |   8 +-
 .../src/commands/shared/route-decision.ts          |   1 -
 .../shared/task-verification-input.test.ts         | 157 ++++++++++
 .../src/commands/shared/task-verification-input.ts | 282 ++++++++++++++++++
 .../commands/shared/task-verification-records.ts   | 309 +++++++++++++++++---
 .../shared/task-verification-records.v2.test.ts    | 181 ++++++++++++
 .../src/commands/task/qualification-packet.ts      |   2 +-
 .../task/shared/workflow-transition-service.ts     |   3 +-
 .../src/commands/task/verify-record-execute.ts     | 322 +++++++++++----------
 .../task/verify-record.durability.unit.test.ts     |  44 ++-
 .../src/commands/workflow.verify-hooks.test.ts     |  39 +++
 17 files changed, 1318 insertions(+), 226 deletions(-)
```

</details>
