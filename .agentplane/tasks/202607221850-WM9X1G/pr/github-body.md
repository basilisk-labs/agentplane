Task: `202607221850-WM9X1G`
Title: Journal resumable context-ingestion phases
Canonical task record: `.agentplane/tasks/202607221850-WM9X1G/README.md`

## Summary

Journal resumable context-ingestion phases

RF-18: persist an idempotent assimilation run journal so task creation, manifest, pack, semantic apply, reindex, validation, evaluation, and finalize phases can safely resume or repair.

## Scope

- In scope: versioned run journal, exact task/run identity, phase fingerprints and idempotency keys, crash injection, retry/resume/repair, divergence diagnosis, lock ownership, and context doctor visibility.
- Out of scope: a fake distributed transaction across task backend and filesystem.

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-28T08:13:34.859Z
- Branch: task/202607221850-WM9X1G/journal-resumable-context-ingestion-phases
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/context/check.unit.test.ts        |  40 ++
 .../commands/context/extraction-apply.unit.test.ts |  36 +-
 .../agentplane/src/commands/context/extraction.ts  |  13 +
 .../agentplane/src/commands/context/finalize.ts    |   5 +
 packages/agentplane/src/context/doctor.ts          |   5 +
 .../agentplane/src/context/ingest-run-journal.ts   | 526 +++++++++++++++++++++
 .../src/context/ingest-task-pack.test.ts           | 290 +++++++++++-
 packages/agentplane/src/context/ingest.ts          | 174 ++++++-
 8 files changed, 1066 insertions(+), 23 deletions(-)
```

</details>
