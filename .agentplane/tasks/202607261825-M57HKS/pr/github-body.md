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

- State: needs_rework
- Note:

```text
REWORK: full fast CI passed, but the branch has no runner implementation or regression-coverage
change. This classifies the prior failure as schedule-sensitive only; it does not prove the
prepared-to-running gate or fixture-cleanup ownership is repaired.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-26T18:29:17.808Z
- Branch: task/202607261825-M57HKS/stabilize-task-run-launch-under-concurrent-activ
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
No changes detected.
```

</details>
