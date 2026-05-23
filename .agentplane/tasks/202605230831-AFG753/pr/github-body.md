Task: `202605230831-AFG753`
Title: Strict release task registry hidden artifact scan
Canonical task record: `.agentplane/tasks/202605230831-AFG753/README.md`

## Summary

Strict release task registry hidden artifact scan

Make release readiness fail when task directories exist without README artifacts so hidden active tasks cannot bypass task list.

## Scope

- In scope: Make release readiness fail when task directories exist without README artifacts so hidden active tasks cannot bypass task list.
- Out of scope: unrelated refactors not required for "Strict release task registry hidden artifact scan".

## Verification

- State: ok
- Note:

```text
Commands: bun test packages/agentplane/src/commands/release/task-state-script.test.ts; bun run
lint:core. Result: pass. Evidence: task-state script test 1 pass; lint clean. Scope: release task
registry hidden README artifact detection.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-23T08:54:53.944Z
- Branch: task/202605230831-AFG753/strict-release-task-registry
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/release/task-state-script.test.ts | 44 ++++++++++++++++++++++
 scripts/checks/check-task-state.mjs                |  6 ++-
 2 files changed, 49 insertions(+), 1 deletion(-)
```

</details>
