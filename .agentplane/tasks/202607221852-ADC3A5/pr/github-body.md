Task: `202607221852-ADC3A5`
Title: Query context projections with SQLite FTS5 and BM25
Canonical task record: `.agentplane/tasks/202607221852-ADC3A5/README.md`

## Summary

Query context projections with SQLite FTS5 and BM25

RF-14: use the existing FTS5 index for MATCH/BM25 search with filters, top-k, pagination, stable refs, snippets, truthful strategy output, and bounded live fallback.

## Scope

- In scope: SQLite search API, MATCH/BM25 ranking, path/scope/kind filters, stable pagination, snippets/highlights, canonical dedupe, adapter/strategy receipts, recall fixtures, and p95 benchmark.
- Out of scope: semantic ranking; live filesystem scan remains only a missing/stale-index fallback.

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-30T07:51:18.809Z
- Branch: task/202607221852-ADC3A5/query-context-projections-with-sqlite-fts5-and-b
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
No changes detected.
```

</details>
