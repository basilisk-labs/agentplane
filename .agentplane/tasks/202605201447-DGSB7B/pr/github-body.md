Task: `202605201447-DGSB7B`
Title: Enforce maximum assimilation wiki gates
Canonical task record: `.agentplane/tasks/202605201447-DGSB7B/README.md`

## Summary

Enforce maximum assimilation wiki gates

Add deterministic verification gates for context.maximum_assimilation so source-shaped topology, glossary, Obsidian wikilinks, coverage, and entity-first evidence are not only prompt guidance.

## Scope

- In scope: Add deterministic verification gates for context.maximum_assimilation so source-shaped topology, glossary, Obsidian wikilinks, coverage, and entity-first evidence are not only prompt guidance.
- Out of scope: unrelated refactors not required for "Enforce maximum assimilation wiki gates".

## Verification

- State: ok
- Note:

```text
Quality review: max-mode verification now fails closed on missing root glossary, missing
source-shaped topology artifact, missing coverage artifact, missing graph entity/relation rows with
line refs, and missing semantic Obsidian wikilinks on changed content wiki pages. Focused regression
tests cover the positive path and glossary failure path.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-20T14:56:59.833Z
- Branch: task/202605201447-DGSB7B/max-assimilation-gates
- Head: abdc3746f1ec

```text
 .../src/commands/context/release-readiness.test.ts | 248 +++++++++++++++++++++
 packages/agentplane/src/context/verify-task.ts     | 147 +++++++++++-
 2 files changed, 392 insertions(+), 3 deletions(-)
```

</details>
