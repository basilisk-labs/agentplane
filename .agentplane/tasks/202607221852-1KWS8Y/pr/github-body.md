Task: `202607221852-1KWS8Y`
Title: Batch context freshness and incrementally update projections
Canonical task record: `.agentplane/tasks/202607221852-1KWS8Y/README.md`

## Summary

Batch context freshness and incrementally update projections

RF-15: compute freshness once per source/query, dedupe canonical refs, upsert changed paths, delete removed paths, preserve unchanged rows, and recover corruption with a controlled full rebuild.

## Scope

- In scope: per-query stat/hash/parse cache, canonical dedupe, changed/removed/unchanged detection, transactional incremental upsert/delete, projection-version migrations, equivalence tests, no-change behavior, corruption repair, and benchmarks.
- Out of scope: semantic decisions or hidden stale reuse.

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-30T08:43:03.527Z
- Branch: task/202607221852-1KWS8Y/batch-context-freshness-and-incrementally-update
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
No changes detected.
```

</details>
