Task: `202607280948-N3XC7M`
Title: Retry transient runner cancellation intent reads
Canonical task record: `.agentplane/tasks/202607280948-N3XC7M/README.md`

## Summary

Retry transient runner cancellation intent reads

Fix the CI-proven race where an atomically published runner cancellation intent changes during a stable read and is treated as a fatal execution error. Retry only transient immutable-publication collisions, preserve fail-closed behavior for malformed or unsafe records, and add deterministic regression coverage.

## Scope

- In scope: Fix the CI-proven race where an atomically published runner cancellation intent changes during a stable read and is treated as a fatal execution error. Retry only transient immutable-publication collisions, preserve fail-closed behavior for malformed or unsafe records, and add deterministic regression coverage.
- Out of scope: unrelated refactors not required for "Retry transient runner cancellation intent reads".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-28T09:49:46.757Z
- Branch: task/202607280948-N3XC7M/retry-transient-runner-cancellation-intent-reads
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
No changes detected.
```

</details>
