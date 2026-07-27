Task: `202607271814-E1ZTTV`
Title: Stabilize concurrent recovery-lease reads
Canonical task record: `.agentplane/tasks/202607271814-E1ZTTV/README.md`

## Summary

Stabilize concurrent recovery-lease reads

Prevent transient read-stability races from failing concurrent runner effect-resolution and active-claim retry flows; preserve strict file-integrity checks and verify repeatability.

## Scope

- In scope: Prevent transient read-stability races from failing concurrent runner effect-resolution and active-claim retry flows; preserve strict file-integrity checks and verify repeatability.
- Out of scope: unrelated refactors not required for "Stabilize concurrent recovery-lease reads".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-27T18:54:44.324Z
- Branch: task/202607271814-E1ZTTV/stabilize-concurrent-recovery-lease-reads
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../task-run-active-claim-concurrency.test.ts      | 40 ++++++++++++
 .../task-run-active-claim-recovery-lease.ts        | 72 ++++++++++++++--------
 .../usecases/task-run-active-claim.testkit.ts      |  4 +-
 .../usecases/task-run-lifecycle-cancel.testkit.ts  |  4 +-
 4 files changed, 92 insertions(+), 28 deletions(-)
```

</details>
