Task: `202607221555-JSEZ5E`
Title: Delegate semantic entity reconciliation to the context executor
Canonical task record: `.agentplane/tasks/202607221555-JSEZ5E/README.md`

## Summary

Make context ingestion generate an executor-ready semantic reconciliation contract. CURATOR—not deterministic code—must decide whether source terms denote an existing canonical entity, an alias, a distinct entity, or an unresolved possible match. AgentPlane prepares complete evidence surfaces, validates the decision record, and applies canonical identifiers without inventing semantic equivalence.

## Scope

In scope: context-ingest task metadata and task pack; a task-bound canonical entity catalog with aliases, provenance, wiki targets, and graph neighborhoods; CURATOR prompt and role guidance; SGR entity-resolution schema and validation; maximum-assimilation verification; focused user documentation and tests. Acceptance requires semantic decisions to carry candidate comparisons, positive/negative evidence, rationale, confidence, and explicit unresolved state. Out of scope: embeddings or model calls inside deterministic CLI code, automatic semantic decisions, unrelated context search ranking, release publication, and agentplane-loops.

## Verification

- State: ok
- Note:

```text
Verified HEAD 03985dd3622c: empty-catalog new_entity_proposal regression passes; complete
ci:local:fast passes 370 files/2186 tests plus critical CLI E2E.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-22T16:41:16.428Z
- Branch: task/202607221555-JSEZ5E/delegate-semantic-entity-reconciliation-to-the-c
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/agents/CURATOR.json                    |   8 +-
 .agentplane/agents/EVALUATOR.json                  |   2 +-
 .agentplane/tasks/202607221344-D9JTEY/README.md    |  18 +--
 .../tasks/202607221344-D9JTEY/pr/diffstat.txt      |   3 +-
 .../tasks/202607221344-D9JTEY/pr/github-body.md    |   3 +-
 .agentplane/tasks/202607221344-D9JTEY/pr/meta.json |   2 +-
 .agentplane/tasks/202607221344-D9JTEY/pr/review.md |   3 +-
 .../evaluator-opinion.md                           |  19 +++
 .../evaluator-prompt.md                            |  74 ++++++++++
 .../quality-report.json                            |  23 +++
 docs/context/agent-guide.mdx                       |  22 +++
 docs/context/modes.mdx                             |  18 ++-
 docs/context/review.mdx                            |   4 +
 packages/agentplane/assets/agents/CURATOR.json     |   8 +-
 packages/agentplane/assets/agents/EVALUATOR.json   |   2 +-
 .../src/blueprints/context-maximum-assimilation.ts |  24 +++
 .../commands/context/extraction-apply.unit.test.ts |  30 ++++
 .../src/commands/context/release-readiness.test.ts |  18 ++-
 .../verify-task.maximum-assimilation.test.ts       |  22 ++-
 .../verify-task.maximum-assimilation.unit.test.ts  |  22 ++-
 packages/agentplane/src/commands/task/new.ts       |   9 +-
 .../src/context/extraction-writer.test.ts          |  68 +++++++++
 .../agentplane/src/context/extraction-writer.ts    |  21 +++
 .../src/context/ingest-task-pack.test.ts           |  86 ++++++++++-
 .../agentplane/src/context/ingest-task-pack.ts     | 162 ++++++++++++++++++++-
 .../agentplane/src/context/ingest-task-prompt.ts   |  26 ++--
 packages/agentplane/src/context/ingest-task.ts     |  39 ++++-
 ...imilation-artifacts-validation-ontology.test.ts | 116 +++++++++++++++
 ...m-assimilation-artifacts-validation-ontology.ts |  81 ++++++++++-
 .../src/runtime/sgr/context-extraction-contract.ts |  41 +++++-
 .../src/runtime/sgr/context-extraction-payloads.ts |  80 ++++++++--
 .../agentplane/src/runtime/sgr/contract-types.ts   |  20 ++-
 .../agentplane/src/runtime/sgr/contracts.test.ts   | 104 +++++++++++++
 33 files changed, 1094 insertions(+), 84 deletions(-)
```

</details>
