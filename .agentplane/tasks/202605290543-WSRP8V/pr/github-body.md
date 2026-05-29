Task: `202605290543-WSRP8V`
Title: PR flow status render decomposition
Canonical task record: `.agentplane/tasks/202605290543-WSRP8V/README.md`

## Summary

PR flow status render decomposition

Extract text rendering helpers from packages/agentplane/src/commands/pr/flow-status.ts to reduce the runtime hotspot below the warning threshold without changing PR flow status resolution or output.

## Scope

- In scope: Extract text rendering helpers from packages/agentplane/src/commands/pr/flow-status.ts to reduce the runtime hotspot below the warning threshold without changing PR flow status resolution or output.
- Out of scope: unrelated refactors not required for "PR flow status render decomposition".

## Verification

- State: ok
- Note:

```text
PR flow status text rendering extracted into flow-status.render.ts; flow-status.ts reduced to 367
lines while preserving report resolution and output rows.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-29T05:43:31.527Z
- Branch: task/202605290543-WSRP8V/pr-flow-status-render-decomposition
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/pr/flow-status.render.ts          | 66 ++++++++++++++++++++++
 packages/agentplane/src/commands/pr/flow-status.ts | 59 +------------------
 2 files changed, 68 insertions(+), 57 deletions(-)
```

</details>
