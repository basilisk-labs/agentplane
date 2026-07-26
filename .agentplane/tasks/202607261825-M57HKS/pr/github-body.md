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

- State: ok
- Note:

```text
PASS: M57 publishes running state before bounded process-identity enrichment; identity observation
cannot rewrite terminal state; active claims remain fail-closed while identity is absent.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-26T18:29:17.808Z
- Branch: task/202607261825-M57HKS/stabilize-task-run-launch-under-concurrent-activ
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/runner/process-supervision/run.ts          |  63 +++++--
 .../src/runner/process-supervision/signals.test.ts |  17 +-
 .../src/runner/process-supervision/signals.ts      |   7 +-
 .../task-run-active-claim-concurrency.test.ts      | 201 +++++++++++++++++++--
 .../usecases/task-run-lifecycle-cancel.test.ts     | 136 +++++---------
 ...task-run-process-identity-serialization.test.ts | 123 +++++++++++++
 6 files changed, 412 insertions(+), 135 deletions(-)
```

</details>
