Task: `202605141005-HNXBJ4`
Title: Fix context search JSONL row freshness
Canonical task record: `.agentplane/tasks/202605141005-HNXBJ4/README.md`

## Summary

Fix context search JSONL row freshness

Context search marks fresh JSONL facts and graph projection rows as stale because row-level projection hashes are compared to whole-file hashes. Fix row-level freshness and cover it with regression tests so empty-folder semantic assimilation search reports fresh derived rows.

## Scope

- In scope: Context search marks fresh JSONL facts and graph projection rows as stale because row-level projection hashes are compared to whole-file hashes. Fix row-level freshness and cover it with regression tests so empty-folder semantic assimilation search reports fresh derived rows.
- Out of scope: unrelated refactors not required for "Fix context search JSONL row freshness".

## Verification

- State: ok
- Note:

```text
Fixed context search JSONL row freshness, including non-string row ids found in review. Verified
focused context tests, eslint/prettier, release/docs gates, platform-critical, and empty-folder
semantic assimilation smoke with no stale search rows.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-14T10:10:43.519Z
- Branch: task/202605141005-HNXBJ4/context-jsonl-freshness
- Head: b9a6042a9ccc

```text
 .../src/commands/context/release-readiness.test.ts | 55 ++++++++++++++++++++++
 packages/agentplane/src/commands/context/search.ts | 33 +++++++++++++
 2 files changed, 88 insertions(+)
```

</details>
