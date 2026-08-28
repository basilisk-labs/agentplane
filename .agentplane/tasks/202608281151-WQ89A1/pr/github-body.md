Task: `202608281151-WQ89A1`
Title: Recover evidence rework after execution-base provenance hydration
Canonical task record: `.agentplane/tasks/202608281151-WQ89A1/README.md`

## Summary

Recover evidence rework after execution-base provenance hydration

On integrated main 2b0760edea02ef80eecc61e82d47fa2a21c691fc, PCBY2N is merged and terminal, but the immutable received task-level evidence rework result for 202608280529-59VB06 still fails with Completed implementation result produced no supervisor-observed workspace change. Read-only comparison proves the remaining mismatch: the implementation README records task_execution_context.source=creation_checkout, while verify-record-execute.ts removes source when persisting the same schema_version, base_ref, base_sha and repository_identity. Removing only that field in an in-memory comparison makes both HEAD and working README preserve the recovery contract; no files were changed. Close this bounded recovery gap with a real-Git regression that starts from an actual creation-checkout context and exercises verification persistence, completed WorkItems, evaluator documentation rework, interruption/retry and the next fresh evaluator transition. Normalize only proved equivalent execution-base provenance in recovery; preserve exact base ref, SHA, repository identity, approved plan/grant/scope, immutable original result and proof, required fresh checks and no false DONE. Reject changed identity, unknown provenance/fields and invalid context. Do not blindly strip execution context, reuse old verification or verdicts, edit task/journal state, change CI, or extend release/Core architecture. Scope is external-agent-implementation-recovery.ts, its unit tests and run-cli.core.task-advance.evidence-rework.test.ts. Keep 59VB06 and DVS5NN intact and prioritize their integration after the fix. Findings and Verify Steps must be populated before implementation review through supported operator routes. This is a demonstrated required integration-path blocker, not a new release criterion.

## Scope

- In scope: On integrated main 2b0760edea02ef80eecc61e82d47fa2a21c691fc, PCBY2N is merged and terminal, but the immutable received task-level evidence rework result for 202608280529-59VB06 still fails with Completed implementation result produced no supervisor-observed workspace change. Read-only comparison proves the remaining mismatch: the implementation README records task_execution_context.source=creation_checkout, while verify-record-execute.ts removes source when persisting the same schema_version, base_ref, base_sha and repository_identity. Removing only that field in an in-memory comparison makes both HEAD and working README preserve the recovery contract; no files were changed. Close this bounded recovery gap with a real-Git regression that starts from an actual creation-checkout context and exercises verification persistence, completed WorkItems, evaluator documentation rework, interruption/retry and the next fresh evaluator transition. Normalize only proved equivalent execution-base provenance in recovery; preserve exact base ref, SHA, repository identity, approved plan/grant/scope, immutable original result and proof, required fresh checks and no false DONE. Reject changed identity, unknown provenance/fields and invalid context. Do not blindly strip execution context, reuse old verification or verdicts, edit task/journal state, change CI, or extend release/Core architecture. Scope is external-agent-implementation-recovery.ts, its unit tests and run-cli.core.task-advance.evidence-rework.test.ts. Keep 59VB06 and DVS5NN intact and prioritize their integration after the fix. Findings and Verify Steps must be populated before implementation review through supported operator routes. This is a demonstrated required integration-path blocker, not a new release criterion.
- Out of scope: unrelated refactors not required for "Recover evidence rework after execution-base provenance hydration".

## Verification

- State: ok
- Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-28T15:05:55.654Z
- Branch: task/202608281151-WQ89A1/recover-evidence-rework-after-execution-base-pro
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...n-cli.core.task-advance.evidence-rework.test.ts | 69 +++++++++++++-------
 .../external-agent-implementation-recovery.test.ts | 76 ++++++++++++++++++++++
 .../task/external-agent-implementation-recovery.ts | 25 +++++++
 3 files changed, 147 insertions(+), 23 deletions(-)
```

</details>
