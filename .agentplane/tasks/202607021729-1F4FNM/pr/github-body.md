Task: `202607021729-1F4FNM`
Title: Add SGR v2 typed context extraction writer
Canonical task record: `.agentplane/tasks/202607021729-1F4FNM/README.md`

## Summary

Add SGR v2 typed context extraction writer

Phase 2 from the Context Maximum Assimilation PRD. Add SGR schema v2 typed context extraction records, span_refs, confidence_vector, entity_resolution/page_creation/topology_decision payloads, and writer routing for claims, ontology, sources, wiki-derived artifacts while preserving v1 compatibility.

## Scope

- In scope: Phase 2 from the Context Maximum Assimilation PRD. Add SGR schema v2 typed context extraction records, span_refs, confidence_vector, entity_resolution/page_creation/topology_decision payloads, and writer routing for claims, ontology, sources, wiki-derived artifacts while preserving v1 compatibility.
- Out of scope: unrelated refactors not required for "Add SGR v2 typed context extraction writer".

## Verification

- State: ok
- Note: Verified current implementation head 26c0d113 after review fixes.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-02T19:02:06.221Z
- Branch: task/202607021729-1F4FNM/add-sgr-v2-typed-context-extraction-writer
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../commands/context/extraction-apply.unit.test.ts | 134 +++++++++++-
 .../agentplane/src/commands/context/extraction.ts  |   4 +
 .../src/commands/context/release-readiness.test.ts |   5 +-
 .../src/context/extraction-writer.test.ts          | 140 +++++++++++++
 .../agentplane/src/context/extraction-writer.ts    | 233 ++++++++++++++++++---
 .../src/context/harvest-tasks-extraction.ts        |  26 ++-
 .../agentplane/src/context/ingest-task-pack.ts     |  10 +-
 .../agentplane/src/context/ingest-task-prompt.ts   |  10 +-
 .../agentplane/src/runtime/sgr/contract-types.ts   |  62 +++++-
 .../agentplane/src/runtime/sgr/contracts.test.ts   | 112 +++++++++-
 packages/agentplane/src/runtime/sgr/contracts.ts   | 140 +++++++++++--
 packages/agentplane/src/runtime/sgr/index.ts       |   1 +
 12 files changed, 809 insertions(+), 68 deletions(-)
```

</details>
