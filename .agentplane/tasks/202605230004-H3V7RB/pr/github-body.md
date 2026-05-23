Task: `202605230004-H3V7RB`
Title: Remove unused pr flow status exported types
Canonical task record: `.agentplane/tasks/202605230004-H3V7RB/README.md`

## Summary

Remove unused pr flow status exported types

Knip baseline flags exported status-report types from the hosted lifecycle report as unused. Make those helper types internal so verify-static passes without widening the public type surface.

## Scope

- In scope: Knip baseline flags exported status-report types from the hosted lifecycle report as unused. Make those helper types internal so verify-static passes without widening the public type surface.
- Out of scope: unrelated refactors not required for "Remove unused pr flow status exported types".

## Verification

- State: ok
- Note:

```text
Evaluator pass: scope is limited to removing unused exported helper types, and verification evidence
covers the knip failure plus focused behavior and style checks.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-23T00:04:30.082Z
- Branch: task/202605230004-H3V7RB/pr-flow-status-knip-cleanup
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 packages/agentplane/src/commands/pr/flow-status.ts | 8 ++++----
 1 file changed, 4 insertions(+), 4 deletions(-)
```

</details>
