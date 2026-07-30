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

- State: ok
- Note:

```text
Verified SQLite FTS5/BM25 retrieval: 32 focused context tests, typecheck, compatibility ratchet,
benchmark, and the 12-chunk critical CLI suite passed.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-30T07:51:52.760Z
- Branch: task/202607221852-ADC3A5/query-context-projections-with-sqlite-fts5-and-b
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/context/issue-gates.unit.test.ts  |  10 +
 .../agentplane/src/commands/context/reindex.ts     |   6 +-
 .../src/commands/context/release-readiness.test.ts |  39 ++++
 packages/agentplane/src/commands/context/search.ts | 212 ++++++++++++++-------
 packages/agentplane/src/commands/context/sqlite.ts |   1 +
 .../src/commands/context/sqlite.unit.test.ts       |  89 ++++++++-
 packages/agentplane/src/context/reindex.ts         |  31 ++-
 packages/agentplane/src/context/sqlite.ts          | 140 ++++++++++++++
 scripts/bench/context-fts5-bm25.mts                | 130 +++++++++++++
 9 files changed, 590 insertions(+), 68 deletions(-)
```

</details>
