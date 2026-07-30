Task: `202607221852-J910P6`
Title: Separate indexed search text from preview snippets
Canonical task record: `.agentplane/tasks/202607221852-J910P6/README.md`

## Summary

Separate indexed search text from preview snippets

RF-16: index complete section/window/row content while keeping bounded previews and precise source spans for markdown, JSONL, and structured context files.

## Scope

- In scope: versioned projection units, full search_text, bounded preview_text, markdown section/window splitting, JSONL row units, structured-field units, exact line/section/entity refs, and size/latency instrumentation.
- Out of scope: FTS query execution or incremental update logic.

## Verification

- State: ok
- Note:

```text
Verified projection schema v2 against all four task criteria: long markdown tail remains searchable
with bounded exact section preview; JSONL/JSON units retain stable refs and digests; metrics expose
source/search/preview bytes with explicit 20-line/2048-byte and <2000ms fixture budgets; focused
tests, typecheck, critical CLI suite, and ci:local:fast passed.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-30T07:17:13.019Z
- Branch: task/202607221852-J910P6/separate-indexed-search-text-from-preview-snippe
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../agentplane/src/commands/context/capability.ts  |   5 +-
 .../src/commands/context/release-readiness.test.ts |  48 ++++++++
 packages/agentplane/src/commands/context/search.ts |  51 ++------
 .../src/commands/context/sqlite.unit.test.ts       |  58 +++++++++-
 .../src/context/reindex-projection.test.ts         |  94 +++++++++++++++
 .../agentplane/src/context/reindex-projection.ts   | 128 +++++++++++++++------
 packages/agentplane/src/context/reindex.ts         |  33 +++++-
 packages/agentplane/src/context/sqlite.ts          |  47 ++++++--
 8 files changed, 367 insertions(+), 97 deletions(-)
```

</details>
