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
Rebased onto current origin/main, resolved maximum-assimilation gate conflicts by combining checks,
and reran focused context tests, typecheck, build, doctor, and routing checks successfully.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-20T15:09:17.405Z
- Branch: task/202605201447-DGSB7B/max-assimilation-gates
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../verify-task.maximum-assimilation.test.ts       | 268 +++++++++++++++++++++
 packages/agentplane/src/context/verify-task.ts     | 145 ++++++++++-
 2 files changed, 410 insertions(+), 3 deletions(-)
```

</details>
