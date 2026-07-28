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

- State: ok
- Note:

```text
The cancellation-intent regression, impacted runner files, typecheck, formatting, and diff checks
pass. The local all-project fast run failed only in unrelated parallel teardown timeouts; hosted CI
remains the merge gate.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-28T09:51:06.067Z
- Branch: task/202607280948-N3XC7M/retry-transient-runner-cancellation-intent-reads
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/runner/adapters/execution-control.test.ts  | 69 +++++++++++++++++++++-
 .../src/runner/adapters/execution-control.ts       | 40 +++++++++----
 2 files changed, 97 insertions(+), 12 deletions(-)
```

</details>
