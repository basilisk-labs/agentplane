Task: `202607251433-75Q4J6`
Title: Restore shared guard invariant after KnowledgeRef merge
Canonical task record: `.agentplane/tasks/202607251433-75Q4J6/README.md`

## Summary

Restore shared guard invariant after KnowledgeRef merge

Replace the inherited local isRecord helper in KnowledgeRef with the canonical shared guard so guards:check passes on main before RF06b integration.

## Scope

- In scope: Replace the inherited local isRecord helper in KnowledgeRef with the canonical shared guard so guards:check passes on main before RF06b integration.
- Out of scope: unrelated refactors not required for "Restore shared guard invariant after KnowledgeRef merge".

## Verification

- State: ok
- Note:

```text
Exact head 1a41d3bd7: guards:check passed; KnowledgeRef core 38/38 and agentplane 10/10 passed;
typecheck, lint:core, critical 72/72, knip, hotspots, format, routing, and doctor passed.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-25T14:38:29.835Z
- Branch: task/202607251433-75Q4J6/restore-shared-guard-invariant-after-knowledgere
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 packages/agentplane/src/context/knowledge-ref.ts | 4 +---
 1 file changed, 1 insertion(+), 3 deletions(-)
```

</details>
