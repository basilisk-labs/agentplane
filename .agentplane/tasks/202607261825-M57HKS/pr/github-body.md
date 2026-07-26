Task: `202607261825-M57HKS`
Title: Stabilize task-run launch under concurrent active claims
Canonical task record: `.agentplane/tasks/202607261825-M57HKS/README.md`

## Summary

Stabilize task-run launch under concurrent active claims

Repair the reproducible runner lifecycle failure where active-claim concurrency and cancellation tests stall before running, leaving run state prepared and cascading into temporary-run-directory cleanup errors. Instrument and fix the prepared-to-running gate and cleanup ownership; keep DX3 cleanup scope unchanged; prove the focused runner matrix and full fast CI.

## Scope

- In scope: Repair the reproducible runner lifecycle failure where active-claim concurrency and cancellation tests stall before running, leaving run state prepared and cascading into temporary-run-directory cleanup errors. Instrument and fix the prepared-to-running gate and cleanup ownership; keep DX3 cleanup scope unchanged; prove the focused runner matrix and full fast CI.
- Out of scope: unrelated refactors not required for "Stabilize task-run launch under concurrent active claims".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-26T18:27:35.535Z
- Branch: task/202607261825-M57HKS/stabilize-task-run-launch-under-concurrent-activ
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
No changes detected.
```

</details>
