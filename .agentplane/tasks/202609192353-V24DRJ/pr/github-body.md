Task: `202609192353-V24DRJ`
Title: Fix canonical final-validation recovery loops before 0.7.10 release
Canonical task record: `.agentplane/tasks/202609192353-V24DRJ/README.md`

## Summary

Fix canonical final-validation recovery loops before 0.7.10 release

Productize two defects observed while integrating PR #5976: managed task/review artifact commits must not invalidate an otherwise unchanged verified implementation identity, and evaluator compatibility recording must project canonical task state without a runtime-only patch. Add focused regression coverage for the exact FINAL_VALIDATION -> evaluator -> pre-merge closure path. Preserve fail-closed source/tree/authority checks. This is release-blocking for 0.7.10.

## Scope

- In scope: Productize two defects observed while integrating PR #5976: managed task/review artifact commits must not invalidate an otherwise unchanged verified implementation identity, and evaluator compatibility recording must project canonical task state without a runtime-only patch. Add focused regression coverage for the exact FINAL_VALIDATION -> evaluator -> pre-merge closure path. Preserve fail-closed source/tree/authority checks. This is release-blocking for 0.7.10.
- Out of scope: unrelated refactors not required for "Fix canonical final-validation recovery loops before 0.7.10 release".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-20T00:19:00.343Z
- Branch: task/202609192353-V24DRJ/canonical-v24drj
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../evaluator/evaluator-review-apply.test.ts       | 14 +++++
 .../commands/evaluator/evaluator-review-apply.ts   |  8 +++
 .../agentplane/src/commands/task/kernel-advance.ts |  6 +-
 .../commands/task/kernel-final-validation.test.ts  | 56 ++++++++++++++++++
 .../src/commands/task/kernel-final-validation.ts   | 68 +++++++++++++++++++---
 5 files changed, 143 insertions(+), 9 deletions(-)
```

</details>
