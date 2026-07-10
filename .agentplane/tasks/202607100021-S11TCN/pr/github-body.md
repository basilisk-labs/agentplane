Task: `202607100021-S11TCN`
Title: Make context extraction packs compact and schema-complete for v0.6.22
Canonical task record: `.agentplane/tasks/202607100021-S11TCN/README.md`

## Summary

Make context extraction packs compact and schema-complete for v0.6.22

Tighten the SGR v2 context_extraction contract for entity resolution, page creation, and topology decisions; generate a complete compact extraction contract; enrich canonical task snapshots with current surface counts/digests/candidates; reduce duplicated prompt prose while keeping generated CURATOR tasks portable and self-contained.

## Scope

- In scope: Tighten the SGR v2 context_extraction contract for entity resolution, page creation, and topology decisions; generate a complete compact extraction contract; enrich canonical task snapshots with current surface counts/digests/candidates; reduce duplicated prompt prose while keeping generated CURATOR tasks portable and self-contained.
- Out of scope: unrelated refactors not required for "Make context extraction packs compact and schema-complete for v0.6.22".

## Verification

- State: needs_rework
- Note:

```text
PR review found that extraction-contract.json omitted conditional new_entity_proposal requirements
enforced by the SGR v2 validator; update the contract/example and regression coverage before
integration.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-10T00:48:03.176Z
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
 18 files changed, 944 insertions(+), 288 deletions(-)
```

</details>
