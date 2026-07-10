# PR Review

Created: 2026-07-10T00:22:19.195Z

## Task

- Task: `202607100021-S11TCN`
- Title: Make context extraction packs compact and schema-complete for v0.6.22
- Status: DOING
- Branch: `task/202607100021-S11TCN/make-context-extraction-packs-compact-and-schema`
- Canonical task record: `.agentplane/tasks/202607100021-S11TCN/README.md`

## Verification

- State: ok
- Note: Focused extraction and release-readiness suite passed (65 tests); agentplane typecheck, lint:core, formatting, architecture, schemas, policy routing, Knip baseline, coverage thresholds, and ci:contract passed. Repository-wide lint:website remains an unchanged pre-existing baseline outside this diff and is recorded in Findings.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-10T00:43:13.248Z
- Branch: task/202607100021-S11TCN/make-context-extraction-packs-compact-and-schema
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../commands/context/extraction-apply.unit.test.ts |  19 +-
 .../src/commands/context/harvest-tasks.test.ts     |  27 ++-
 .../src/commands/context/harvest-tasks.ts          |   6 +
 .../src/commands/context/release-readiness.test.ts |  51 ++---
 .../src/context/harvest-tasks-extraction.ts        |  97 +-------
 .../src/context/ingest-task-pack.test.ts           |  62 +++++
 .../agentplane/src/context/ingest-task-pack.ts     | 254 ++++++++++++++++++---
 .../agentplane/src/context/ingest-task-prompt.ts   | 130 ++++-------
 .../agentplane/src/context/ingest-task.test.ts     |  10 +-
 packages/agentplane/src/context/ingest-task.ts     |  41 +---
 .../src/runtime/sgr/context-extraction-contract.ts | 153 +++++++++++++
 .../src/runtime/sgr/context-extraction-payloads.ts | 165 +++++++++++++
 .../agentplane/src/runtime/sgr/contract-types.ts   |  57 ++++-
 .../agentplane/src/runtime/sgr/contracts.test.ts   |  98 +++++++-
 packages/agentplane/src/runtime/sgr/contracts.ts   |  56 +++--
 packages/agentplane/src/runtime/sgr/index.ts       |   4 +
 16 files changed, 942 insertions(+), 288 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
