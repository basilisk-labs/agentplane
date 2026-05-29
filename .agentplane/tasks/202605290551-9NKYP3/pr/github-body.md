Task: `202605290551-9NKYP3`
Title: Workflow transition service decomposition
Canonical task record: `.agentplane/tasks/202605290551-9NKYP3/README.md`

## Summary

Workflow transition service decomposition

Extract focused verification rendering helpers from packages/agentplane/src/commands/task/shared/workflow-transition-service.ts to reduce the runtime hotspot below the warning threshold without changing task status or verification transition behavior.

## Scope

- In scope: Extract focused verification rendering helpers from packages/agentplane/src/commands/task/shared/workflow-transition-service.ts to reduce the runtime hotspot below the warning threshold without changing task status or verification transition behavior.
- Out of scope: unrelated refactors not required for "Workflow transition service decomposition".

## Verification

- State: ok
- Note:

```text
Workflow transition verification rendering/hash helpers extracted into
workflow-transition-verification.ts; workflow-transition-service.ts reduced to 353 lines while
preserving transition APIs.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-29T05:52:16.598Z
- Branch: task/202605290551-9NKYP3/workflow-transition-service-decomposition
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../task/shared/workflow-transition-service.ts     | 81 ++--------------------
 .../shared/workflow-transition-verification.ts     | 74 ++++++++++++++++++++
 2 files changed, 80 insertions(+), 75 deletions(-)
```

</details>
