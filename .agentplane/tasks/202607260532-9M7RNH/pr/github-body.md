Task: `202607260532-9M7RNH`
Title: Recover stale protected-PR conflict-base context
Canonical task record: `.agentplane/tasks/202607260532-9M7RNH/README.md`

## Summary

Recover stale protected-PR conflict-base context

Close the liveness gap for legacy protected PR conflicts whose provider-reported conflict base is an ancestor of current main. Prepare a bounded read-only reconciliation packet carrying provider conflict-base, current base, ancestry, local conflict probe, and freshness; preserve fail-closed behavior and prohibit CLI rebase, merge, push, queue, or cleanup mutations.

## Scope

- In scope: Close the liveness gap for legacy protected PR conflicts whose provider-reported conflict base is an ancestor of current main. Prepare a bounded read-only reconciliation packet carrying provider conflict-base, current base, ancestry, local conflict probe, and freshness; preserve fail-closed behavior and prohibit CLI rebase, merge, push, queue, or cleanup mutations.
- Out of scope: unrelated refactors not required for "Recover stale protected-PR conflict-base context".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-26T05:34:29.033Z
- Branch: task/202607260532-9M7RNH/recover-stale-protected-pr-conflict-base-context
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
No changes detected.
```

</details>
