Task: `202607221848-1HWR0R`
Title: Return typed task mutation results
Canonical task record: `.agentplane/tasks/202607221848-1HWR0R/README.md`

## Summary

Return typed task mutation results

RF-07: make create and mutation use cases return exact task id, revision, backend identity, artifact paths, and recovery data instead of list-before/list-after discovery.

## Scope

- In scope: typed results for task creation and relevant mutations, local/backend parity, context ingest and batch harvesting callers, concurrency tests, and partial-failure recovery identifiers.
- Out of scope: changing task identity format or introducing cross-system distributed transactions.

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-26T08:11:00.143Z
- Branch: task/202607221848-1HWR0R/return-typed-task-mutation-results
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
No changes detected.
```

</details>
