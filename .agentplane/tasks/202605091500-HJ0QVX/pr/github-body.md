Task: `202605091500-HJ0QVX`
Title: Deduplicate agentplane utility guards
Canonical task record: `.agentplane/tasks/202605091500-HJ0QVX/README.md`

## Summary

Deduplicate agentplane utility guards

Replace a first low-risk batch of local agentplane isRecord helpers with the canonical shared guard without changing behavior.

## Scope

- In scope: Replace a first low-risk batch of local agentplane isRecord helpers with the canonical shared guard without changing behavior.
- Out of scope: unrelated refactors not required for "Deduplicate agentplane utility guards".

## Verification

- State: ok
- Note: Agentplane shared guard batch verified.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-09T15:03:08.276Z
- Branch: task/202605091500-HJ0QVX/agentplane-guards
- Head: 554dab2c72bd

```text
 .../blueprint/resolved-snapshot.json               | 496 +++++++++++++++++++++
 packages/agentplane/src/backends/task-index.ts     |   5 +-
 packages/agentplane/src/blueprints/snapshot.ts     |   5 +-
 .../agentplane/src/commands/blueprints/catalog.ts  |   5 +-
 packages/agentplane/src/runner/result-manifest.ts  |   5 +-
 .../src/runtime/prompt-fragments/json.ts           |   5 +-
 6 files changed, 501 insertions(+), 20 deletions(-)
```

</details>
