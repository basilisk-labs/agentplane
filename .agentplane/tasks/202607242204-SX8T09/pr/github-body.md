Task: `202607242204-SX8T09`
Title: Persist typed runner effect operations before execution
Canonical task record: `.agentplane/tasks/202607242204-SX8T09/README.md`

## Summary

Persist typed runner effect operations before execution

Define strict versioned runner effect operation and journal contracts, persist operation identity, idempotency, authority, StateFingerprint and expected postconditions before adapter execution, and make crash/restart/replay refuse a second spawn for the same operation key.

## Scope

- In scope: strict versioned RunnerEffectOperation and RunnerEffectJournal contracts with canonical digests, operation identity, idempotency key, authority reference/digest, precondition StateFingerprint digest, claim generation, expected postconditions and observed evidence.
- Persist the immutable operation/journal and a downgrade-resistant preparation marker before the first adapter execution; update phases atomically without trusting event-log order as authority.
- Make run, retry, replay, resume and restart paths recognize the operation key and refuse a second supervisor spawn when the prior effect is started, unknown or post-state-unknown.
- Treat two independent supervisor processes racing on the same operation key and claim generation as one concurrency domain: an atomic journal/claim transition elects one winner and only that winner may spawn the adapter.
- Preserve bounded legacy read compatibility without adding required artifact-path fields that invalidate existing runs.
- Define enforcement truthfully as supervisor_single_spawn unless an adapter/provider proves that the idempotency key is forwarded.
- Out of scope: operator verdict capture, effect resolution lease, claim retirement and semantic selection of applied versus not_applied; task 202607242158-QV09NA owns those.

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-27T02:12:20.863Z
- Branch: task/202607242204-SX8T09/persist-typed-runner-effect-operations-before-ex
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
No changes detected.
```

</details>
