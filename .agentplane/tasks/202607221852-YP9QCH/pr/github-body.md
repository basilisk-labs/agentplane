Task: `202607221852-YP9QCH`
Title: Build source-driven canonical reconciliation candidates
Canonical task record: `.agentplane/tasks/202607221852-YP9QCH/README.md`

## Summary

Build source-driven canonical reconciliation candidates

RF-17: replace arbitrary alphabetical first-50 reconciliation slices with reproducible source terms, FTS matches, glossary aliases, graph neighbours, page families, scores, reasons, and index digest.

## Scope

- In scope: source-derived query terms, candidate fusion from FTS/aliases/graph/page families, deterministic scoring/reasons, bounded additional search, index digest, full-catalog compatibility, and entity-resolution fixture metrics.
- Out of scope: deciding semantic identity in CLI; CURATOR remains authoritative.

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-30T09:44:58.527Z
- Branch: task/202607221852-YP9QCH/build-source-driven-canonical-reconciliation-can
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/context/release-readiness.test.ts |   4 +-
 .../src/context/ingest-task-pack.test.ts           | 215 ++++++++-
 .../agentplane/src/context/ingest-task-pack.ts     |  78 +--
 .../agentplane/src/context/ingest-task-prompt.ts   |   5 +-
 packages/agentplane/src/context/ingest-task.ts     |   5 +-
 .../src/context/reconciliation-candidates.ts       | 526 +++++++++++++++++++++
 6 files changed, 765 insertions(+), 68 deletions(-)
```

</details>
