Task: `202608291505-F5AN0W`
Title: Keep evaluator verification target aligned with the semantic quality-review target across framework-owned task-artifa...
Canonical task record: `.agentplane/tasks/202608291505-F5AN0W/README.md`

## Summary

Keep evaluator verification target aligned with the semantic quality-review target across framework-owned task-artifact tail commits. Fix the confirmed bootstrap blocker where task verification correctly targets the latest reviewable commit but evaluator preparation prefers an older extensions.implementation_commit and rejects the current record as verification_implementation_changed. Preserve qualification-packet pinning. Add focused regression coverage proving task-artifact tail commits do not invalidate evaluator preparation.

Keep evaluator verification target aligned with the semantic quality-review target across framework-owned task-artifact tail commits. Fix the confirmed bootstrap blocker where task verification correctly targets the latest reviewable commit but evaluator preparation prefers an older extensions.implementation_commit and rejects the current record as verification_implementation_changed. Preserve qualification-packet pinning. Add focused regression coverage proving task-artifact tail commits do not invalidate evaluator preparation.

## Scope

- In scope: Keep evaluator verification target aligned with the semantic quality-review target across framework-owned task-artifact tail commits. Fix the confirmed bootstrap blocker where task verification correctly targets the latest reviewable commit but evaluator preparation prefers an older extensions.implementation_commit and rejects the current record as verification_implementation_changed. Preserve qualification-packet pinning. Add focused regression coverage proving task-artifact tail commits do not invalidate evaluator preparation.
- Out of scope: unrelated refactors not required for "Keep evaluator verification target aligned with the semantic quality-review target across framework-owned task-artifact tail commits. Fix the confirmed bootstrap blocker where task verification correctly targets the latest reviewable commit but evaluator preparation prefers an older extensions.implementation_commit and rejects the current record as verification_implementation_changed. Preserve qualification-packet pinning. Add focused regression coverage proving task-artifact tail commits do not invalidate evaluator preparation.".

## Verification

- State: ok
- Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-29T15:16:59.589Z
- Branch: task/202608291505-F5AN0W/keep-evaluator-verification-target-aligned-with
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/evaluator/evaluator-review-usecase.ts  |  4 ++--
 .../evaluator/evaluator-runtime-evidence.test.ts        | 17 ++++++++++++++++-
 2 files changed, 18 insertions(+), 3 deletions(-)
```

</details>
