Task: `202607282157-FT85MC`
Title: Freeze complete branch evidence for evaluator review
Canonical task record: `.agentplane/tasks/202607282157-FT85MC/README.md`

## Summary

Freeze complete branch evidence for evaluator review

RF-QUALITY: evaluator review must freeze the complete task branch diff against its merge base, rather than only git show of the latest implementation commit. Include durable, machine-readable verification record evidence so EVALUATOR can assess the entire approved change and required checks without relying on narrative summaries. Keep the change generic, fail closed when the base cannot be resolved, and preserve no-change behavior.

## Scope

- In scope: RF-QUALITY: evaluator review must freeze the complete task branch diff against its merge base, rather than only git show of the latest implementation commit. Include durable, machine-readable verification record evidence so EVALUATOR can assess the entire approved change and required checks without relying on narrative summaries. Keep the change generic, fail closed when the base cannot be resolved, and preserve no-change behavior.
- Out of scope: unrelated refactors not required for "Freeze complete branch evidence for evaluator review".

## Verification

- State: ok
- Note: Rework verified with canonical, task-bound evaluator evidence.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-28T21:58:46.533Z
- Branch: task/202607282157-FT85MC/freeze-full-evaluator-evidence
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../commands/evaluator/evaluator-diff-evidence.ts  | 108 ++++++++++
 .../commands/evaluator/evaluator-review-apply.ts   |   6 +-
 .../commands/evaluator/evaluator-review-usecase.ts |  63 +++---
 .../evaluator/evaluator-run.command.test.ts        | 224 ++++++++++++++++++++-
 .../evaluator/evaluator-verification-records.ts    | 100 ++++++++-
 .../commands/shared/quality-review-target.test.ts  |  27 +++
 .../src/commands/shared/quality-review-target.ts   |   8 +-
 .../src/commands/task/verify-record-execute.ts     |  62 +++++-
 .../task/verify-record.durability.unit.test.ts     |  79 ++++++++
 .../src/commands/task/verify-record.unit.test.ts   |  10 +-
 .../src/commands/workflow.verify-hooks.test.ts     |  81 +++++++-
 11 files changed, 723 insertions(+), 45 deletions(-)
```

</details>
