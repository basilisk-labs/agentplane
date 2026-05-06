Task: `202605061609-P86BJS`
Title: Preview blueprint route during task creation
Canonical task record: `.agentplane/tasks/202605061609-P86BJS/README.md`

## Summary

Preview blueprint route during task creation

Add an opt-in task new flag that prints the resolved blueprint route after task creation without changing the default stdout task-id contract.

## Scope

- In scope: Add an opt-in task new flag that prints the resolved blueprint route after task creation without changing the default stdout task-id contract.
- Out of scope: unrelated refactors not required for "Preview blueprint route during task creation".

## Verification

- State: ok
- Note: Preview flag verified: task new keeps stdout as the generated id and emits resolved blueprint route details to stderr when --show-blueprint is passed.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-06T16:11:45.394Z
- Branch: task/202605061609-P86BJS/blueprint-task-new-preview
- Head: 8dac6d76b4ca

```text
No changes detected.
```

</details>
