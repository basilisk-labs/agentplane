Task: `202608020016-TDXFVT`
Title: Preserve evaluator work units across base-sync merges
Canonical task record: `.agentplane/tasks/202608020016-TDXFVT/README.md`

## Summary

Preserve evaluator work units across base-sync merges

Fix branch_pr evaluator packet preparation so a merge of current main into a task branch preserves the committed task work unit, actual diff, and matching verification records instead of freezing an empty packet. Add focused regression coverage for merge-aware target selection.

## Scope

- In scope: make branch_pr semantic review target selection merge-aware for base-sync merges; preserve the actual task diff and current verification records; add focused regression tests.
- Out of scope: evaluator prompt/rubric changes, provider behavior changes, unrelated lifecycle refactors.

## Verification

- State: ok
- Note: Configured-base merge boundary and unrelated lifecycle-merge preservation pass the full local gate.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-02T00:24:39.694Z
- Branch: task/202608020016-TDXFVT/preserve-evaluator-work-units-across-base-sync-m
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../evaluator/evaluator-qualification-review.ts    |   1 +
 .../commands/evaluator/evaluator-review-usecase.ts |   1 +
 .../evaluator/evaluator-runtime-evidence.test.ts   |  93 +++++++++++
 .../evaluator/evaluator-verification-records.ts    |   2 +
 .../src/commands/pr/integrate/internal/prepare.ts  |   1 +
 .../commands/shared/quality-review-target.test.ts  | 171 +++++++++++++++++++++
 .../src/commands/shared/quality-review-target.ts   |  91 ++++++++++-
 .../src/commands/shared/route-decision-blockers.ts |   1 +
 .../src/commands/shared/route-decision.ts          |   1 +
 .../src/commands/task/verify-record-execute.ts     |   1 +
 10 files changed, 362 insertions(+), 1 deletion(-)
```

</details>
