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

- State: needs_rework
- Note:

```text
Rework: hosted compatibility ratchet fails because the approved v0.7 candidate predates RF-17's
additive task-bound context contract. Preserve immutable v0.6.24 baseline; update only the reviewed
candidate, strict candidate checker, and its pin test.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-30T09:44:58.527Z
- Branch: task/202607221852-YP9QCH/build-source-driven-canonical-reconciliation-can
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...-cli.critical.agent-efficiency-baseline.test.ts |  37 +-
 .../src/commands/context/release-readiness.test.ts |   4 +-
 .../src/context/ingest-task-pack.test.ts           | 239 +++++++++-
 .../agentplane/src/context/ingest-task-pack.ts     |  78 +--
 .../agentplane/src/context/ingest-task-prompt.ts   |   5 +-
 packages/agentplane/src/context/ingest-task.ts     |   5 +-
 .../src/context/reconciliation-candidates.ts       | 526 +++++++++++++++++++++
 .../baselines/v0.7-compatibility-candidate.json    |  38 +-
 .../check-compatibility-contract-baseline.mjs      |  39 +-
 9 files changed, 885 insertions(+), 86 deletions(-)
```

</details>
