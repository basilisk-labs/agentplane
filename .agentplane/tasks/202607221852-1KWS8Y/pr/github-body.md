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

- State: ok
- Note:

```text
RF-15 verification passed: source-query cache, no-op, delta equivalence, FTS continuity,
version/corruption recovery, and benchmark threshold are covered.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-30T08:43:27.463Z
- Branch: task/202607221852-1KWS8Y/batch-context-freshness-and-incrementally-update
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../context/reindex.incremental.unit.test.ts       | 172 ++++++++++
 packages/agentplane/src/commands/context/search.ts |  32 +-
 .../agentplane/src/context/reindex-projection.ts   |  40 ++-
 packages/agentplane/src/context/reindex.ts         | 365 +++++++++++++++++----
 .../agentplane/src/context/search-freshness.ts     |  59 ++++
 .../src/context/search-freshness.unit.test.ts      |  49 +++
 packages/agentplane/src/context/sqlite.ts          | 286 +++++++++++++---
 scripts/baselines/knip-baseline.json               |  14 +-
 scripts/bench/context-incremental-reindex.mts      | 138 ++++++++
 9 files changed, 982 insertions(+), 173 deletions(-)
```

</details>
