Task: `202607221118-0BZKB6`
Title: Compile atomic linked wiki during context assimilation
Canonical task record: `.agentplane/tasks/202607221118-0BZKB6/README.md`

## Summary

Compile atomic linked wiki during context assimilation

Implement a deterministic maximum-assimilation wiki compiler based on the persistent LLM Wiki pattern: keep raw sources immutable; treat SGR as the typed intermediate representation; atomically materialize formal artifacts and managed wiki blocks; upsert stable atomic claims into existing canonical pages; preserve human-authored prose; maintain entity links, provenance, contradictions, a content-oriented index, and append-only context/wiki/log.md; validate idempotency, raw-deletion resilience, and human/agent usability. Do not touch agentplane-loops. Release/version work is a separate dependent task.

## Scope

- In scope: Implement a deterministic maximum-assimilation wiki compiler based on the persistent LLM Wiki pattern: keep raw sources immutable; treat SGR as the typed intermediate representation; atomically materialize formal artifacts and managed wiki blocks; upsert stable atomic claims into existing canonical pages; preserve human-authored prose; maintain entity links, provenance, contradictions, a content-oriented index, and append-only context/wiki/log.md; validate idempotency, raw-deletion resilience, and human/agent usability. Do not touch agentplane-loops. Release/version work is a separate dependent task.
- Out of scope: unrelated refactors not required for "Compile atomic linked wiki during context assimilation".

## Verification

- State: ok
- Note: Review fixes verified: focused synthesis 8/8, full project 1930/1930, typecheck, hotspot and local smoke pass.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-22T12:41:46.571Z
- Branch: task/202607221118-0BZKB6/compile-atomic-linked-wiki-during-context-assimi
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/tasks/202607211645-TQ70WD/README.md    |  22 +-
 .../tasks/202607211645-TQ70WD/pr/diffstat.txt      |   4 +-
 .../tasks/202607211645-TQ70WD/pr/github-body.md    |   4 +-
 .agentplane/tasks/202607211645-TQ70WD/pr/meta.json |   2 +-
 .agentplane/tasks/202607211645-TQ70WD/pr/review.md |   4 +-
 .../evaluator-opinion.md                           |  21 +
 .../evaluator-prompt.md                            |  74 +++
 .../quality-report.json                            |  23 +
 .../src/commands/context/context-runner.ts         |   2 +-
 .../src/commands/context/context.spec.ts           |  13 +-
 .../agentplane/src/commands/context/extraction.ts  |   6 +-
 .../src/commands/context/wiki-frontmatter.ts       |  35 +-
 .../src/commands/context/wiki-index.unit.test.ts   |   2 +
 packages/agentplane/src/commands/context/wiki.ts   | 110 +----
 .../src/context/extraction-transaction.test.ts     |  22 +
 .../src/context/extraction-transaction.ts          |  20 +-
 .../agentplane/src/context/extraction-writer.ts    |  26 +-
 .../agentplane/src/context/ingest-task-pack.ts     |   3 +-
 .../agentplane/src/context/ingest-task-prompt.ts   |   5 +-
 packages/agentplane/src/context/ingest-task.ts     |   2 +-
 ...m-assimilation-artifacts-validation-ontology.ts |   1 +
 .../agentplane/src/context/wiki-index-builder.ts   | 146 ++++++
 .../agentplane/src/context/wiki-synthesis-pages.ts | 138 ++++++
 .../agentplane/src/context/wiki-synthesis.test.ts  | 322 +++++++++++++
 packages/agentplane/src/context/wiki-synthesis.ts  | 499 +++++++++++++++++++++
 .../src/shared/builtin-assets.generated.ts         |  44 +-
 26 files changed, 1385 insertions(+), 165 deletions(-)
```

</details>
