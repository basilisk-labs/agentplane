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
- Note: Review fix passed schema contract tests, task-pack tests, task-harvest tests, agentplane typecheck, lint:core, and ci:contract; extraction-contract.json now declares and exemplifies every conditional new_entity_proposal field enforced by the validator.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-10T00:57:24.641Z
- Branch: task/202607100021-S11TCN/make-context-extraction-packs-compact-and-schema
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/policy/incidents.md                    |   1 +
 packages/agentplane/assets/policy/incidents.md     |   1 +
 .../commands/context/extraction-apply.unit.test.ts |  19 +-
 .../src/commands/context/harvest-tasks.test.ts     |  27 ++-
 .../src/commands/context/harvest-tasks.ts          |   6 +
 .../src/commands/context/release-readiness.test.ts |  51 ++---
 .../src/context/harvest-tasks-extraction.ts        |  97 +-------
 .../src/context/ingest-task-pack.test.ts           |  74 ++++++
 .../agentplane/src/context/ingest-task-pack.ts     | 254 ++++++++++++++++++---
 .../agentplane/src/context/ingest-task-prompt.ts   | 130 ++++-------
 .../agentplane/src/context/ingest-task.test.ts     |  10 +-
 packages/agentplane/src/context/ingest-task.ts     |  41 +---
 .../src/runtime/sgr/context-extraction-contract.ts | 173 ++++++++++++++
 .../src/runtime/sgr/context-extraction-payloads.ts | 165 +++++++++++++
 .../agentplane/src/runtime/sgr/contract-types.ts   |  57 ++++-
 .../agentplane/src/runtime/sgr/contracts.test.ts   | 105 ++++++++-
 packages/agentplane/src/runtime/sgr/contracts.ts   |  56 +++--
 packages/agentplane/src/runtime/sgr/index.ts       |   4 +
 18 files changed, 983 insertions(+), 288 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
