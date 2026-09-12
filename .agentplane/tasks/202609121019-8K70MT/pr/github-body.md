Task: `202609121019-8K70MT`
Title: Make verification rework exhaustion atomically project BLOCKED into the task-centric aggregate, with focused regressi...
Canonical task record: `.agentplane/tasks/202609121019-8K70MT/README.md`

## Summary

Make verification rework exhaustion atomically project BLOCKED into the task-centric aggregate, with focused regression coverage, so supervisor verification failures cannot leave a partial task-centric projection

When a needs_rework verification exceeds evaluator.max_rework_attempts, compatibility mutation currently sets the legacy task status to BLOCKED while leaving the canonical task-centric lifecycle ACTIVE, triggering task_centric_projection_mismatch and preventing recovery. Preserve normal ACTIVE rework behavior, atomically project terminal exhaustion to BLOCKED, and cover the boundary with focused tests.

## Scope

- In scope: When a needs_rework verification exceeds evaluator.max_rework_attempts, compatibility mutation currently sets the legacy task status to BLOCKED while leaving the canonical task-centric lifecycle ACTIVE, triggering task_centric_projection_mismatch and preventing recovery. Preserve normal ACTIVE rework behavior, atomically project terminal exhaustion to BLOCKED, and cover the boundary with focused tests.
- Out of scope: unrelated refactors not required for "Make verification rework exhaustion atomically project BLOCKED into the task-centric aggregate, with focused regression coverage, so supervisor verification failures cannot leave a partial task-centric projection".

## Verification

- State: ok
- Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-12T10:32:20.538Z
- Branch: task/202609121019-8K70MT/make-verification-rework-exhaustion-atomically-p
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../task-centric-backend-projection.ts             | 12 +++-
 .../src/commands/shared/task-mutation.test.ts      | 76 ++++++++++++++++++++++
 2 files changed, 85 insertions(+), 3 deletions(-)
```

</details>
